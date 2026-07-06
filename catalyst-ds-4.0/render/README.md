# Offline renderer — 1:1 screens from the kit

Turns a kit page that relies on **CDN React + in-browser Babel** (`index.html`,
`gallery.html`, or any HTML that loads the kit via `<script type="text/babel">`)
into **one self-contained `.html` file** with zero external requests:

- React 18 bundled from npm (no `unpkg`),
- every `.jsx` pre-transpiled with esbuild (no in-browser Babel),
- `styles.css` + its `@import` + the Inter web fonts inlined as `data:` URIs.

The output renders identically offline **and** can be published as a claude.ai
Artifact (strict CSP blocks all CDNs).

## Why this exists

A claude.ai **prototype** *interprets* the design system — it is never 1:1. A
screen **coded against the kit** (`Primitives.jsx` via `kit.global.jsx`) is 1:1
*by construction*, because it renders the real components. This tool just makes
that screen viewable without a toolchain, and proves it renders (`--shot`).

So the reliable path to a pixel-faithful prototype is: **code the screen with
the kit → render it here → share the HTML**, not "generate and hope".

## Setup

```bash
cd catalyst-ds-4.0/render
npm install            # esbuild + react + react-dom (+ optional playwright)
```

## Use

```bash
node render.mjs                     # bundle ../index.html   -> dist/index.html
node render.mjs ../gallery.html     # bundle any kit page
node render.mjs --shot              # also screenshot        -> dist/index.png
node render.mjs ../index.html --shot dist/app.png
node render.mjs --no-build-kit      # skip regenerating kit.global.jsx first
```

`--shot` launches headless Chromium, screenshots the result full-page, reports
any runtime errors, and **fails if `#root` is empty** — a blind-render safety net
(it uses the pre-installed browser at `$PLAYWRIGHT_BROWSERS_PATH`, default
`/opt/pw-browsers`). Then open `dist/<page>.html` or publish it as an Artifact.

## How it works

1. Runs `ui_kits/certa-studio/build_kit.py` so `kit.global.jsx` is fresh from
   `Primitives.jsx` (source of truth). Skip with `--no-build-kit`.
2. Parses the page for local `<link rel=stylesheet>` and ordered
   `<script type="text/babel" src>` files; drops CDN `<script>`/font links.
3. **Dedupes**: any source that `build_kit.py` already concatenates into
   `kit.global.jsx` (e.g. `Icons.jsx`) is *not* loaded again — a second
   top-level `const I` is a `SyntaxError` that would silently kill the kit.
4. Inlines CSS (`@import` resolved recursively, fonts → base64), bundles React,
   transpiles each JSX to its own top-level `<script>` (global scope preserved,
   exactly as `index.html` loads them). Uncaught errors render their stack
   on-page instead of a blank screen.

## New screens

Write a screen the same way the app screens do (global-scope function,
`React.useState`, kit components as globals — see
`ui_kits/certa-studio/VendorsList.jsx`), add it to a page's `text/babel` script
list, and render that page. Composition patterns live in
`ui_kits/certa-studio/TEMPLATES.md`.

## Notes

- `dist/` and `node_modules/` are git-ignored — outputs are build artifacts.
- Self-contained pages are large (~2.5 MB) because both Inter font weights are
  embedded. That is the price of zero external requests / Artifact-safe output.
