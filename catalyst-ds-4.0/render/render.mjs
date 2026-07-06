#!/usr/bin/env node
/* ============================================================================
   Certa DS 4.1 — offline renderer  (catalyst-ds-4.0/render/render.mjs)

   Turns a Babel-in-browser, CDN-React page (index.html or any HTML that loads
   the kit via <script type="text/babel">) into ONE self-contained .html file
   with no external requests: React bundled from npm, every JSX pre-transpiled,
   CSS + @import + web fonts inlined as data URIs. The output renders identically
   offline and can be published as a claude.ai Artifact (strict CSP, no CDN).

   Why this exists: a claude.ai *prototype* interprets the DS and is never 1:1.
   A screen coded against the kit IS 1:1 by construction — this tool just makes
   that screen viewable without a toolchain, and verifies it renders (--shot).

   Usage:
     node render.mjs                      # bundles ../index.html  -> dist/index.html
     node render.mjs ../gallery.html      # bundle any kit HTML page
     node render.mjs --shot               # also screenshot -> dist/index.png (needs playwright)
     node render.mjs <page.html> --shot dist/out.png
     node render.mjs --no-build-kit       # skip regenerating kit.global.jsx

   Setup:  npm install     (in this render/ folder)
   ========================================================================== */
import { build, transform } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { dirname, resolve, basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");                       // catalyst-ds-4.0/
const CS = resolve(ROOT, "ui_kits/certa-studio");       // kit + build_kit.py
const DIST = resolve(HERE, "dist");

// ---- args ----------------------------------------------------------------
const argv = process.argv.slice(2);
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const positional = argv.filter((a) => !a.startsWith("--"));
const pageArg = positional.find((a) => a.endsWith(".html")) || resolve(ROOT, "index.html");
const pagePath = resolve(process.cwd(), pageArg);
const shotOut = (() => {
  const i = argv.indexOf("--shot");
  const next = i >= 0 ? argv[i + 1] : null;
  return next && !next.startsWith("--") && next.endsWith(".png") ? resolve(process.cwd(), next) : null;
})();

if (!existsSync(pagePath)) {
  console.error(`✗ page not found: ${pagePath}`);
  process.exit(1);
}
mkdirSync(DIST, { recursive: true });

// ---- 1. regenerate kit.global.jsx from Primitives.jsx (source of truth) ---
if (!flags.has("--no-build-kit")) {
  try {
    execFileSync("python3", ["build_kit.py"], { cwd: CS, stdio: "pipe" });
    console.log("• kit.global.jsx regenerated from Primitives.jsx");
  } catch (e) {
    console.warn("• build_kit.py skipped (python3 unavailable?) — using existing kit.global.jsx");
  }
}

// ---- 2. parse the HTML page for local CSS + ordered JSX sources -----------
const pageDir = dirname(pagePath);
const html = readFileSync(pagePath, "utf8");

const cssHrefs = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)]
  .map((m) => (m[0].match(/href=["']([^"']+)["']/) || [])[1])
  .filter((h) => h && !/^https?:/i.test(h));                 // drop CDN stylesheets (Google Fonts)

const inlineStyles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/gi)].map((m) => m[1]);

let jsxSrcs = [...html.matchAll(/<script[^>]+type=["']text\/babel["'][^>]*>/gi)]
  .map((m) => (m[0].match(/src=["']([^"']+)["']/) || [])[1])
  .filter(Boolean);

// Dedupe: build_kit.py already concatenates its SOURCES (Icons.jsx, Primitives,
// components/*) into kit.global.jsx. If the page also loads one of those on its
// own, we'd redeclare its top-level consts (e.g. `const I`) — a SyntaxError that
// silently kills the whole kit script. Drop any source the kit already bundles.
let bundled = [];
try {
  const bk = readFileSync(resolve(CS, "build_kit.py"), "utf8");
  const block = (bk.match(/SOURCES\s*=\s*\[([\s\S]*?)\]/) || [])[1] || "";
  bundled = [...block.matchAll(/["']([^"']+)["']/g)].map((m) => basename(m[1]));
} catch { /* no build_kit.py — nothing to dedupe */ }
jsxSrcs = jsxSrcs.filter((rel) => {
  if (basename(rel) === "kit.global.jsx") return true;      // the bundle itself
  if (bundled.includes(basename(rel))) {
    console.log(`  · skip ${rel} (already bundled inside kit.global.jsx)`);
    return false;
  }
  return true;
});

console.log(`• page: ${basename(pagePath)}  (${cssHrefs.length} css, ${jsxSrcs.length} jsx sources)`);

// ---- 3. inline CSS: resolve @import + embed @font-face fonts as data URIs --
const FONT_MIME = { ".ttf": "font/ttf", ".otf": "font/otf", ".woff": "font/woff", ".woff2": "font/woff2" };
function inlineCss(cssPath, seen = new Set()) {
  const abs = resolve(cssPath);
  if (seen.has(abs)) return "";
  seen.add(abs);
  const dir = dirname(abs);
  let css = readFileSync(abs, "utf8");
  // resolve @import url("..."); / @import "...";  (recursively)
  css = css.replace(/@import\s+(?:url\()?["']([^"')]+)["']\)?\s*;/g, (whole, href) => {
    if (/^https?:/i.test(href)) return "";                   // never fetch remote @imports
    return "\n" + inlineCss(resolve(dir, href), seen) + "\n";
  });
  // embed local font url(...) as base64 data URIs
  css = css.replace(/url\((["']?)([^"')]+\.(?:ttf|otf|woff2?|))\1\)/g, (whole, q, href) => {
    if (/^https?:|^data:/i.test(href) || !href) return whole;
    const fp = resolve(dir, href);
    if (!existsSync(fp)) return whole;
    const mime = FONT_MIME[extname(fp).toLowerCase()] || "application/octet-stream";
    const b64 = readFileSync(fp).toString("base64");
    return `url(data:${mime};base64,${b64})`;
  });
  return css;
}
const combinedCss =
  cssHrefs.map((h) => inlineCss(resolve(pageDir, h))).join("\n") + "\n" + inlineStyles.join("\n");

// ---- 4. bundle React from npm into window.React / window.ReactDOM ----------
const reactBundle = (
  await build({
    entryPoints: [resolve(HERE, "react-entry.js")],
    bundle: true,
    format: "iife",
    write: false,
    minify: true,
    define: { "process.env.NODE_ENV": '"production"' },
  })
).outputFiles[0].text;

// ---- 5. transpile each JSX source (global-scope, keep window/React refs) ---
async function jsx(file) {
  const src = readFileSync(file, "utf8");
  const { code } = await transform(src, {
    loader: "jsx",
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  });
  return code;
}
const transpiled = [];
for (const rel of jsxSrcs) {
  const fp = resolve(pageDir, rel);
  if (!existsSync(fp)) {
    console.warn(`  ! missing jsx source, skipped: ${rel}`);
    continue;
  }
  transpiled.push({ rel, code: await jsx(fp) });
}

// ---- 6. assemble the self-contained page ----------------------------------
// Each transpiled file is its OWN top-level <script> (global scope, exactly as
// index.html loads them). Uncaught errors surface on-page via a global handler,
// so a bad screen shows its stack instead of a blank page.
const escClose = (s) => s.replace(/<\/script>/gi, "<\\/script>");
const scripts = transpiled
  .map(({ rel, code }) => `<!-- ${rel} -->\n<script>\n${escClose(code)}\n</script>`)
  .join("\n");

const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "Certa DS 4.1";
const out = `<title>${title}</title>
<style>
${combinedCss}
html, body { margin: 0; }
#root { min-height: 100vh; }
</style>
<div id="root"></div>
<script>${reactBundle}</script>
<script>
window.__RENDER_ERR__ = (e) => {
  document.getElementById('root').innerHTML =
    '<pre style="padding:24px;color:#cc0e24;font:13px/1.5 monospace;white-space:pre-wrap">'
    + (e && (e.stack || e.message) ? (e.stack || e.message) : String(e)) + '</pre>';
};
window.addEventListener('error', (ev) => window.__RENDER_ERR__(ev.error || ev.message));
</script>
${scripts}
`;

const outName = basename(pagePath, ".html") + ".html";
const outPath = resolve(DIST, outName);
writeFileSync(outPath, out);
const kb = (Buffer.byteLength(out) / 1024).toFixed(0);
console.log(`✓ wrote ${outPath}  (${kb} KB, self-contained)`);

// ---- 7. optional: render headless + screenshot to prove it renders --------
if (flags.has("--shot")) {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.warn("• --shot needs playwright: run `npm install playwright` in render/. Skipped.");
    process.exit(0);
  }
  // find a chromium executable (browsers are pre-installed in this env)
  const findChrome = () => {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
    if (!existsSync(base)) return undefined;
    for (const d of readdirSync(base)) {
      if (!d.startsWith("chromium-")) continue;
      const p = join(base, d, "chrome-linux", "chrome");
      if (existsSync(p)) return p;
    }
    return undefined;
  };
  const browser = await chromium.launch({ executablePath: findChrome() });
  const page = await browser.newPage({ viewport: { width: 1320, height: 1000 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("file://" + outPath, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const png = shotOut || resolve(DIST, basename(pagePath, ".html") + ".png");
  await page.screenshot({ path: png, fullPage: true });
  const rootLen = await page.evaluate(() => (document.getElementById("root")?.innerText || "").length);
  await browser.close();
  console.log(`✓ screenshot ${png}`);
  console.log(errors.length ? `✗ page errors:\n  ${errors.join("\n  ")}` : "✓ no runtime errors");
  if (rootLen < 20) {
    console.error(`✗ #root looks empty (${rootLen} chars rendered) — check the screenshot`);
    process.exit(2);
  }
}
