# DS 4.0 — Build Memory

Last updated: 2026-07-06

## Naming
- Design system: **Certa Platform DS** (not "Certa Studio" — Studio is a separate product)
- Versions: **4.0** = first build/testing (Figma + first bundle; had derived palette: brand #1B4FD8, Tailwind status). **4.1** = re-synced 1:1 from Figma (brand #1f5eff, Certa palette, real assets) — the faithful one. Name the Claude Design DS "Certa DS 4.1".
- Catalyst bundle: catalyst-ds-4.0/ in certacalvino/certa-design-system (folder name kept as a path; the DS it ships is versioned 4.1)
- App shell demo: "Certa Platform" (renamed from "Certa Studio" on 2026-06-19)

## Workflow rules (mandatory)
- After each build, push CLAUDE.md directly to main on certacalvino/certa-design-system (no branch, no PR)
- Screenshots before approving any change — design lead reviews all visual output
- Zero hardcoded values in any component

## System decisions (locked)
- Border-radius: 4px across all components (8px for overlays: Modal, Dropdown, Country dropdown)
- Icon size: 20px default (16px exception: contextual menus, table headers, read-only fields, column headers)
- Typography scale: 14px minimum for interactive labels (12px exception: meta-text — section headers, column headers, table day numbers, range text)
- Spacing grid: 8-unit tokens (xs:2, sm:4, md:8, lg:12, xl:16, 2xl:20, 3xl:24, 4xl:32)
- Tokenization: zero hardcoded values in any component
- Button M label: Body Bold 14px
- Process Status chip padding: 12px H (lg token)
- Shadow tiers: shadow-xs (0 1px 2px rgba(0,22,78,0.06)) for cards; shadow-lg (0 8px 24px rgba(0,22,78,0.15)) for overlays
- Neutral/0 (3:13) = black in this file — use text/on-brand (3:64) for white text on colored backgrounds
- Checkbox checked mark: catalog Check icon 180:1264 (white, 12px inside 16px box) — NOT L-shape rectangles
- Avatar background in selected/active contexts: override to surface/default (white) when avatar sits on bg/brand-subtle

## Figma files
- DS 4.0 (build target): https://www.figma.com/design/X0G6UNPGB8MjsDXnIvlPhe
- DS 3.0 (reference): https://www.figma.com/design/h6ZML0jUOPU8MZ0bLBBOPE/Design-Sytem-3.0
- GitHub: certacalvino/certa-design-system

## Components built

### Buttons & Actions — 2026-06-10, rebuilt Split 2026-06-19
- 159 variants, 7 types: Filled, Outline, Text, Link, Icon, Round, Split
- **Split Button**: rebuilt 2026-06-19 from filled-brand → outline (surface/default bg, border/default 1px, r4, text/primary label, chevron-down 179:272 16px, 1px vertical divider). S=32px / M=36px. S vertical padding = 6px raw (no 6px token in 8-grid — flagged).
- Page: Buttons & Actions

### Forms & Inputs — 2026-06-10, rebuilt 2026-06-15
- Page: Forms & Inputs. Source: 157:1256. Doc: 157:1257.
- **Checkbox** (179:420): 12 variants. Checked mark = Check icon 180:1264 (white 12px). Fixed 2026-06-19 from L-shape rectangles. Indeterminate = 8×2 white dash.
- **Radio** (179:435): 8 variants.
- **Input** (157:1255): 70 variants (7 Type × 5 State × 2 Size M/S). No Type=Date — realized via Input + trailing Calendar icon overlay.
- **Switch** (179:452): 5 variants including Loading.
- **Filter chip** (430:487): 16 variants. Pill 32px r=16.
- **Phone Input**: 10 variants. Country selector + dial code + number.
- **Country dropdown** (440:450 row set + 441:437 panel): 280w, r8, shadow raw DROP_SHADOW.
- **Masked field** (453:800): 12 variants (State × Size M/S).
- **Multi-select** (469:1283): 10 variants (State × Size M/S). Open dropdown: 470:1047.
- **File row** (489:1280): 5 variants M only.
- **File Upload Field** (493:1401): 9 variants M only. Hover = 2px dashed border/focused + brand-subtle fill. Doc: 498:130.
- **Dropdown Menu**: Menu Item (510:1825, 52 variants). Composed example (513:1669): Search → Edit → Duplicate → Move to... → Mark as default → divider → Delete. Icons 16px. Duplicate glyph: 180:1089. Menu Item showcase (515:1698): Star icon 180:2267 in Leading icon + Small cells (optical centering fix).
- **Read-only Field** (520:1872): 24 variants (12 Type × 2 State). Pills (Boolean/Select/Multi) have 1px border/subtle stroke. Label 12px Caption.
- **Date Picker v1** (582:14 cell set, 583:14 panel, 585:71 field): Single selection. 6 day cell states. Footer: Today + Clear.
- **Date Picker v2** (632:100 panel set): Mode=Date/Date-time/Time-only. Range selection (7th cell state In-Range). Time row: HH/MM 56×40 r4 + AM/PM toggle 40px. Date-time paddingBottom=16, time row AUTO height 56px. Time-only: 296w complete shell.

### Process Status — 2026-06-11
- 8 variants. 24px, r4, padding 12px H. Page: Data Display.

### Badge — 2026-06-11
- 48 variants. Page: Data Display.

### Toast — 2026-06-12
- 20 variants. 430px, r8. Set: 330:727. Page: Feedback & Overlay.

### Alert Banner — 2026-06-12
- 32 variants. 480px, 4px left accent. Set: 360:761. Page: Feedback & Overlay.

### Nav bar — 2026-06-11
- 20 variants. Icon: Menu/Hamburger 180:1643 at 20px. Page: Navigation.

### Tabs — 2026-06-17
- 20 variants. 40px, 2px text/link indicator, full-width border/subtle baseline. Page: Navigation.

### Modal — 2026-06-17
- 6 variants (Size S/M/L × Type Default/Destructive). r8, shadow-lg, color/bg/overlay scrim. Title 18px Semi Bold. New tokens: color/bg/overlay (535:2) + shadow-lg effect style. Set: 536:144. Page: Feedback & Overlay.

### Tooltip — 2026-06-24
- Greenfield. CSS-only: 4 positions (top/bottom/left/right), 6px arrow, fade+scale, hover+focus-within, prefers-reduced-motion. bg = text/primary, text = text/inverse, 12px caption, r4 (radius-sm), shadow-sm. disabled prop renders children unwrapped. max-width 200px. Zero hardcoded values. Page: Feedback & Overlay. Code: .ck-tip / .ck-tip-{pos} / .ck-tip-bubble in styles.css + export function Tooltip in Primitives.jsx + preview/40-tooltip.html.

### Empty State — 2026-06-17
- 6 variants (Context Page/Card/Table × Action bool). Icon-led. Set: 549:50. Page: Data Display.

### Pagination — 2026-06-17
- Type(Simple/Numbered). Range text 12px Caption. Page: Data Display.

### Table Cell / Row / Header — 2026-06-16
- Table Cell (529:94): 7 types. 52px rows.
- Table Row (530:132): 3 states. Entity cell avatar: white ring + white fill on Selected.
- Table Column Header (530:3400): 6 variants. 10px label, 16px icons.
- Page: Forms & Inputs.

### Avatar — 2026-06-17
- 24 variants (Size S/M/L/XL × Tone Brand/Teal/Green/Orange/Red/Neutral). Light tint bg + saturated Semi Bold initials. Set: 572:50. Page: Data Display.

### Toggle H/V — 2026-06-17
- Set: 574:62. Page: Forms & Inputs.

### RAG Field — 2026-06-17
- 3 variants. HIGH+LOW = white (text/on-brand). MED = dark Orange/D2 (#7f5209) — WCAG AA. Set: 577:23. Page: Forms & Inputs.

### KPI / Stat Card — 2026-06-17
- 4 variants (Icon × Delta). 200w, shadow-xs, Display 28. New tokens: shadow-xs + Display 28 text style. Set: 595:4282. Page: Data Display.

### Gauge — 2026-06-17
- 3 variants (RAG). 140×140, 270° arc, surface/muted track, no needle. Set: 598:32. Page: Data Display.

### Circular Progress — 2026-06-17
- 30 variants (Size S/L × Progress 0/25/50/75/100 × State Default/Success/Error). Set: 609:116. Page: Data Display.

## Catalyst DS 4.0 bundle (certacalvino/certa-design-system)
- 40 preview HTMLs + Primitives.jsx + components/ + app shell
- App shell: "Certa Platform" (renamed 2026-06-19 from "Certa Studio")
- AppKit.jsx deleted 2026-06-19 — app now consumes canonical Primitives.jsx via kit.global.jsx
- build_kit.py generates kit.global.jsx from canonical ESM sources (single source of truth)
- Page background: surface/subtle (#F7F8FA). Card surfaces: surface/default (white) + border/subtle 1px.
- Components in components/: FilterChip, ReadOnlyField, MaskedField, CountryDropdown, PhoneInput, SplitButton
- preview/40-tooltip.html: 6-cell showcase (4 positions + long copy + focus)

## Clonable icon instances (confirmed)
180:1058 Copy · 180:1089 Duplicate · 180:1131 Trashcan · 180:1200 Close · 180:1206 Refresh · 180:1214 Download · 180:1224 Upload · 180:1244 Warning · 180:1250 Info · 180:1264 Check · 180:1633 Filter · 180:1637 Search · 180:1643 Menu · 180:1657 Chart · 180:1710 Dots/Kebab · 180:1749 Sidebar · 180:2099 Lock · 180:2119 Eye · 180:2253 Calendar/Date · 180:2267 Star · 180:2435 House · 180:907 Chevron-up · 180:911 Chevron-down · 180:945 Sort · 179:272 Chevron-down (Select) · 180:1053 Edit · 180:881 Caret

## Open flags
- FLAG: Toast/Alert Banner Error and Warning share Warning triangle — no distinct error-circle icon.
- FLAG: Avatar stand-in in Table Row Entity cell — commission real Avatar set.
- FLAG: Checkbox focus CENTER vs Radio focus OUTSIDE — standardize in polish pass.
- FLAG: Masked field no eye-off icon — Eye 180:2119 used for both show/hide.
- FLAG: File-type badges in File row are stand-ins — commission real file-type icons.
- FLAG: DS 3.0 not yet ported: Cascader, Slider.
- FLAG: Country dropdown shadow is raw DROP_SHADOW (not tokenized).
- FLAG: Split Button S vertical padding = 6px raw (no 6px token in 8-grid).
- FLAG: 10px column header label is below 12px meta-text floor — table-header exception.

## Session log — 2026-06-24
- Tooltip (Overlay, greenfield). CSS-only fade+scale, 4 positions + 6px arrow, hover+focus-within, prefers-reduced-motion. bg = text/primary, text/inverse, 12px caption, r4, shadow-sm. disabled unwraps. max-width 200px. Zero hardcoded values. Catalyst: styles.css .ck-tip block + Primitives.jsx Tooltip export + preview/40-tooltip.html. Figma (Claude Design): components/overlay/Tooltip.jsx + tooltip.card.html, 43 components 32 cards after collision cleanup.

## Session log — 2026-06-19
- Checkbox fix: Checked mark rebuilt from L-shape rectangles → Check icon 180:1264 (white 12px).
- Split Button rebuild: filled-brand → outline. Doc showcase repositioned with 24px column gaps.
- Date Picker v2: panel 583:14 → set 632:100 (Mode=Date/Date-time/Time-only). Time row: HH/MM 56×40 + AM/PM 40px.
- File Upload Hover: 2px dashed border/focused + brand-subtle fill (distinct from Empty).
- Read-only Field pills: 1px border/subtle stroke on Boolean/Select/Multi badge instances.
- Menu Item showcase (515:1698): Star icon 180:2267 for optical centering (Leading icon + Small cells).
- RAG Field LOW: → text/on-brand (white). MED stays Orange/D2.
- Avatar ring in Table Row: border/subtle → surface/default (white ring).
- Avatar fill on Selected row: overridden to surface/default — system-wide rule.
- Dropdown Menu composed: removed ACTIONS + DANGER ZONE headers, kept divider before Delete.
- Catalyst: AppKit.jsx deleted, app unified on canonical kit.global.jsx from Primitives.jsx.
- Catalyst: renamed "Certa Studio" → "Certa Platform" throughout bundle.
- Catalyst: page bg → surface/subtle, cards → white + border/subtle.
- Catalyst: Checkbox SVG fix applied at root via canonical Primitives.jsx.

## Tokenization state (as of 2026-06-24)
- Color: ~95%
- Spacing: ~70%
- Typography: 100%
- Overall: ~88%

## Catalyst app — risk-semantics fixes — 2026-06-25
- Stat-card deltas were colored by arrow direction (.ck-stat-delta up=green/down=red), so risk metrics read backwards: "High Risk ▲1" green, "Pending Reviews ▼4" red. Added sentiment classes .ck-stat-delta.good/.bad (styles.css) and switched the risk cards in HomeDashboard + VendorsList (High Risk→bad/red, Pending→good/green). Arrows unchanged; only color now reflects good/bad. up/down kept for neutral-growth metrics (Total Vendors, Compliance, Avg score).
- Risk-score scale was self-contradictory: list treats higher score = safer (94=low, 42=high) but VendorDetail hardcoded "76" + "High risk" + red bar. Wired VendorDetail to v.riskScore/v.risk (carried from the clicked row) and made the default coherent (medium/76, amber). Number, meter width+color, and RiskBadge now agree across list↔detail.
- Still open (from review, not yet done): ~50 hardcoded px in app screens vs tokens; off-scale type (22px page title, 40px risk number); Gauge/CircularProgress unused in the app (uses .ck-meter); KPIStatCard(kit) vs .ck-stat(app) divergence + no invertDelta; "Pending"/"Not started" tags vs README pattern #7.

## Catalyst app — spacing/type tokenization pass — 2026-06-25
- Tokenized the 3 app screens (HomeDashboard/VendorsList/VendorDetail) to remove hardcoded values Claude would copy. Spacing: gap/marginTop/marginBottom/padding literals → var(--space-*) (1:1, zero pixel change for 4/8/12/16/20; snapped off-grid 6→md8, 10→lg12 per the 8-grid rule). Type to scale: fontSize 12→--font-caption-size, 13→--font-body-size (was off-scale), 11→--font-caption-size (was below the 12px floor), 40→--font-display-size (28, now consistent with .ck-stat-value). VISUAL deltas to eyeball in the demo: risk number 40→28, small labels 11→12 and 13→14; everything else pixel-identical.
- Left as layout (not spacing-grid, intentionally bare): table column widths (minWidth/width), icon sizes (width/height 12). styles.css app-chrome still has raw px (22px page title, etc.) — separate pass.
- Still open: meter→Gauge/CircularProgress demo, KPIStatCard(kit) vs .ck-stat unify + invertDelta, "Pending"/"Not started" vocab vs README #7, styles.css raw px.

## Catalyst bundle — re-synced FROM FIGMA (source of truth) — 2026-06-26
- KEY FINDING: the bundle's whole token palette was a generic (Tailwind-style) APPROXIMATION, not Certa/Figma values. Brand was #1B4FD8 (Figma is #1f5eff = Brand/400); status ramps were #16A34A/#DC2626/#D97706 (Figma is #0f6b1a/#cc0e24/#8b5800); text was slate #1F2937 (Figma #202730). This is why generated UI looked "less Certa".
- Extracted all 141 Figma Variables + 11 text styles from file X0G6UNPGB8MjsDXnIvlPhe (the SoT) and rewrote catalyst-ds-4.0/colors_and_type.css 1:1 with Figma: brand ramp (50 #f8faff → 400 #1f5eff primary → 700 #113691), neutrals (text #202730 / #5d6880 / #8892ac, borders #d0d4df/#eeefef/#5d6880), greens/oranges/reds/teal, status + avatar + RAG all from Figma. Kept all --color-*/--space-* NAMES so components don't break; re-pointed brand aliases from brand-500→brand-400 (Figma primary is 400, not 500). Type scale tops at Display 28 (Figma has no 38/30).
- Brought REAL assets from the Catalyst 3.0 Claude-Design export: 6 status icons (assets/icons/) + Inter TTFs (fonts/) + @font-face. Logo + non-status icons still pending (Lucide stand-ins / placeholder).
- Strategy locked: Figma = source of truth → derive token layer (this) → feed Claude Design via "Create using Claude Code" (BEST FIDELITY) pointed at this repo. Sync = re-run the Figma→tokens extraction when Figma changes.
- Pending: type/radius/shadow not yet Figma Variables (sourced from locked decisions — tokenize in Figma to close); component CSS still references the (now Figma-correct) semantic names.

## Closing the Figma↔code gap (for next /design-sync batch) — 2026-06-26
- DS 4.1 pilot (7 components) is live in Claude Design ("Certa DS 4.1 — WIP", user's org). Full ~33-component sync running locally. /design-sync uploads from CODE (the bundle), not Figma directly — so Figma components must be coded in the kit to appear.
- Gap (in Figma, not yet in the code kit), priority for TPRM: 🔴 Table, Date Picker, Pagination, Dropdown Menu · 🟡 Toast, Radio, Nav bar (standalone), Round Button · 🟢 File row.
- Coded so far (this session) into Primitives.jsx + registered in build_kit.py names + kit.global.jsx: **Pagination** (Simple/Numbered, caption range, brand-subtle active) + **Table** (declarative columns/rows, meta-10px uppercase header on bg-subtle, 52px rows, surface/selected). Verified: balanced JSX, present in kit.global window assign.
- Still to code from Figma: Date Picker, Dropdown Menu (next), then the 🟡/🟢. Local agent grades/render-checks them on next sync (safety net for blind-coding).
- Batch A coded (this session): Radio (16px, brand dot, error/disabled), Toast (430px r8 shadow-lg, success/error/warning/info status badge + close), DropdownMenu (r8 overlay, 36px rows, 16px icons, hover surface-hover, destructive=text/error). All in Primitives.jsx + build_kit names + kit.global.jsx (verified: in window assign, balanced, no export/hook leaks). Remaining gap: Date Picker (complex), Nav bar standalone, Round Button, File row.
- DatePicker coded (this session): single-date calendar panel 296w r8 shadow-lg, ‹Month YYYY› nav, SUN-first weekday caption row, 6×7 grid (40px cells, today=focused ring, selected=brand fill, muted=tertiary, hover=surface-hover), Today/Clear footer. React.useState (build_kit rewrite-safe). All 🔴 gap now coded (Table, DatePicker, Pagination, DropdownMenu) + Radio/Toast. Remaining: Nav bar standalone, Round Button, File row (minor).
- Batch A done (minor parity): RoundButton (circular icon-only, filled/outline/ghost, M/S), FileRow (type badge + name + meta + download/remove), NavBar (vertical sidebar, brand-subtle active + 2px accent + badge). All in Primitives.jsx + build_kit + kit.global.jsx (window, balanced). Kit now covers all Figma components except Date Picker v2 date-time (DatePicker single + TimeField compose it). Next: B = page-composition reference templates (VendorDetail/VendorsList/Dashboard using the kit components) — the real lever for generation quality; local agent uploads them as template cards on next sync.

## Session pause — 2026-06-26 (state + where to resume)
- DS 4.1 LIVE in Claude Design: "Certa DS 4.1 — WIP" (user's high-token org), 45 cards = 42 components + 3 page templates (Templates section). URL: claude.ai/design/p/f0e7c286-896e-4111-b2b3-69ac4928f91d
- Repo (catalyst-ds-4.0/) = source of truth derived FROM Figma: tokens 1:1 (brand #1f5eff, Certa palette, #202730 text), 9 gap components coded (Pagination/Table/Radio/Toast/DropdownMenu/DatePicker/RoundButton/FileRow/NavBar), TEMPLATES.md spec for the 3 reference pages. /design-sync uploads from CODE; refresh = clone main → copy Primitives.jsx+build_kit.py (keep .design-sync/) → build_kit → /design-sync.
- Direction feedback: user likes 4.1's SIZE CONTRAST (Display 28 vs body) but "still doesn't connect with the DS — maybe it's the window [Claude Design cards view]." Hypothesis: the per-component card gallery doesn't convey the *system*; the DS only "feels right" seen IN USE (a real screen), not as loose pieces.
- Comparison built (Artifact, 3.0 vs 4.1 toggle of the Vendor Detail): 4.1 = slate/Display28/8px/shadow/airier; 3.0(Catalyst in use) = navy #00164e/≤20px/4px/chrome-light/denser. Brand #1f5eff identical in both.
- OPEN to resume: (1) see 4.1 IN USE — generate real screens in prototype, not the card gallery (the "connect" gap); (2) get real product screenshots to calibrate density vs the live product; (3) decide final direction — 4.1 as-is vs a denser hybrid (slate+Display28 composition but ≤20–24 type / 4px corners, closer to the in-use 3.0); (4) add invertDelta+sub to KPIStatCard (risk ▲ red) so templates stop omitting deltas; (5) re-sync the dense VendorDetail composition once direction is locked.

## "no emoji / doesn't respect components" fix — 2026-06-26
- ROOT CAUSE of prototype using emoji icons: Icons.jsx (24 real SVG icons, window.I) was NOT in build_kit SOURCES → never shipped in kit.global.jsx → prototype had no icon set → fell back to emoji. FIX: added Icons.jsx to SOURCES + "I" to the window names list; kit.global now exposes window.I (24 icons). Also KPIStatCard got invertDelta+sub+flex (prior commit).
- README UI Patterns: added rule "#0 Use the kit components — do not improvise (READ FIRST)": no emoji (use window.I), Tables=Table+headers+Checkbox+Pagination, Tier=Tag, Status=ProcessStatus, nav=NavBar, risk KPIs=KPIStatCard invertDelta, pages follow TEMPLATES.md.
- These ship on next /design-sync refresh. Combined with an anchored generation prompt (name the components explicitly), prototype should stop improvising. NOTE: prototype still interprets — the kit + conventions + anchored prompt raise fidelity but don't guarantee 100%; the lever that helped most is the icon set actually being present.

## 1:1 prototypes — offline renderer (`catalyst-ds-4.0/render/`) — 2026-07-06
- KEY INSIGHT (answers "cómo logramos prototipos 1:1 fieles al DS"): a Claude Design *prototype* INTERPRETS the DS and is never 1:1. A screen CODED against the kit (Primitives.jsx via kit.global.jsx) is 1:1 BY CONSTRUCTION — it renders the real components. The reliable path is: code the screen with the kit → render it → share the HTML. Not "generate and hope".
- Built `render/render.mjs` (Node + esbuild): bundles any CDN-React/Babel kit page (index.html, gallery.html, or any HTML loading the kit via `<script type="text/babel">`) into ONE self-contained .html with zero external requests — React 18 bundled from npm, every JSX pre-transpiled (jsxFactory React.createElement), styles.css + @import + Inter fonts inlined as data: URIs. Renders offline AND as a claude.ai Artifact (strict CSP blocks CDNs). `--shot` screenshots headless (pre-installed Chromium at $PLAYWRIGHT_BROWSERS_PATH) and FAILS if #root is empty — blind-render safety net.
- Pipeline steps: (1) run build_kit.py so kit.global.jsx is fresh from Primitives (source of truth); (2) parse page for local CSS + ordered text/babel srcs, drop CDN scripts/font links; (3) DEDUPE any source build_kit already concatenates into kit.global.jsx (e.g. Icons.jsx) — else a 2nd top-level `const I` is a SyntaxError that silently kills the whole kit script (this exact bug cascaded to "Dialog is not defined"); (4) inline CSS, bundle React, transpile each JSX to its own top-level <script> (global scope preserved as index.html loads them); uncaught errors render their stack on-page.
- Verified: the REAL click-through app (index.html + AppShell + HomeDashboard/VendorsList/VendorDetail + app.jsx) renders offline CDN-free, faithful (brand #1f5eff, Certa palette, real SVG icons, KPIs, risk meters, status). Also composed 3 reference screens (Home/Vendors/Vendor Detail) purely from the kit as Artifacts to show the DS "in use".
- render/ ships package.json (esbuild+react+react-dom, playwright optional) + react-entry.js + README (the 1:1 rationale). dist/ + node_modules/ git-ignored. Docs: bundle README "Render offline / as a shareable Artifact (1:1)" section + Structure tree.
- Self-contained output ~2.5MB (both Inter weights embedded = price of zero external requests). Branch: claude/dreamy-cray-2pdrwa.

## Figma audit + DS-vs-code fidelity fixes — 2026-07-06
- FIGMA AUDIT (3.0→4.0 gap): only 2 components pending — **Slider** + **Cascader** (both in "Design Sytem 3.0" library lk-bc33, absent from 4.0; both low TPRM priority). 4.0 inventory otherwise complete. Verified via search_design_system. NOTE: get_metadata top-level page enumeration is buggy (returned only "Cover"); real page list came from `figma.root.children` via use_figma (Buttons&Actions=1:15, Forms=1:16, Feedback=1:17, Nav=1:18, Data Display=1:19). 4.0 file publishes NO "4.0" library — components are LOCAL nodes (e.g. Modal 536:144), so search only surfaces the linked 3.0 lib.
- TOKEN-VARIABLE gap: color+spacing ARE Figma Variables; type=Text Styles, shadow=Effect Style (exist, not Variables); **radius was the only hard gap** (raw r4/r8). FIXED: created **Radius** variable collection in Figma (X0G6, collection 724:2, mode "Value") — xs=2 sm=4 lg=8 full=9999, FLOAT, scope CORNER_RADIUS, matching code --radius-* 1:1. Rebinding component corner radii to these vars = separate visual-review pass (not done).
- OUTLINE BUTTON "black borders" = CODE DRIFT (Figma was correct). Figma outline: normal border=color/border/default #d0d4df + text brand; destructive border=#e01030 + text #cc0e24 (verified on 113:267 / 113:375). Code used --color-border-strong (#5d6880) for ALL outline. FIXED Primitives.jsx Button.outline → borderColor destructive? --color-border-error : --color-border-default (tone-matched). Verified via render/ tool.
- ROUND BUTTON decentered icon = NOT a Figma bug (Figma set 113:731 chevron is centered). Cause: Claude Design card uses a non-kit glyph (emoji/pencil) that baseline-aligns instead of optically centering; **window.I has no Edit/pencil icon**. Fix (pending): add an Edit SVG to Icons.jsx so showcases use a centered kit icon.
- More DS-vs-Figma fidelity fixes incoming from user — batch into commits, single /design-sync re-sync at end (design-sync runs locally, not in remote env).

## DS-vs-Figma fidelity batch 2 — 2026-07-06
- Added SVG icons Edit/Trash/Duplicate/ArrowRight to Icons.jsx (window.I) — kit lacked them so generated cards fell back to emoji (off-center pencil/trash). SplitButton chevron glyph then to inline SVG. Alert width:100%+maxWidth 480 (Figma=480). FilterChip selected count then action-primary bg + inverse text. Button outline border strong then default/error ("black borders", batch 1). All verified via render harness.
- Radius Variable collection created in Figma (X0G6 coll 724:2, Value mode): xs2 sm4 lg8 full9999, CORNER_RADIUS. Figma audit: only Cascader+Slider pending 3.0 to 4.0 (low TPRM). Deferred (user-flagged independent): Table row contrast (locked surface-selected), NavBar rebuild, templates polish.

## NavBar selected style — Figma synced to code — 2026-07-06
- Decided (design lead): NavBar/Sidebar selected item = subtle gray (DS 3.0 style), NOT the blue fill 4.0 Figma originally had. Code: surface-hover bg + text-primary semibold.
- Synced Figma to match: rebound the 4 Active nav-item variants (282:35/39/44/47) in X0G6 — frame fill bg/brand->bg/subtle-hover (107:8), icon+label text/on-brand->text/primary (3:59). Source of truth now consistent with code (blue will not reappear on next Figma sync).
- Also built full Sidebar component (kit): logo+wordmark, Search, items w/ counts, footer (Studio/Language, new Cube+Globe icons), user profile, Expanded/Collapsed. Closes the "4.0 only had the bare nav item / burger" gap vs 3.0.

## Full Nav bar added to Figma — 2026-07-06
- REVERTED the gray selected-state change (design lead prefers BLUE): NavBar/Sidebar code back to bg/brand + text-inverse; Figma 4 Active variants (282:35/39/44/47) rebound back to bg/brand + text/on-brand. Code+Figma consistent on BLUE.
- Built the FULL Nav bar in Figma (was missing — 4.0 only had the bare nav item 282:83). New frame "Nav bar - Full (Expanded)" (739:149) on Navigation page 1:18: logo+Certa wordmark, Search field, 5 nav-item INSTANCES (Home/Records/Dashboards/Tasks active+badge/Notifications badge) with label overrides, flex spacer, footer (Studio/Language), user profile (JC/John Ceras). Chrome = native nodes (raw colors, reference frame); nav rows = real component instances.
- KNOWN LIMITATION: all nav rows show the Menu (hamburger) icon — the 4.0 nav-item component has a fixed Menu icon, no INSTANCE_SWAP icon property. To vary icons per item, add an icon swap property to the component (follow-up). Collapsed full-nav variant not built yet (offer).

## Full Nav bar — icon swap + page tidy — 2026-07-06
- ICON SWAP (full-nav frame 739:149): swapped each row Menu icon to a distinct icon component with state recolor (rebind swapped icon fills/strokes to text/on-brand on the active row, text/secondary otherwise). Home->House(180:2435), Records->Duplicate(180:1089), Dashboards->Chart(180:1657), Tasks->Check(180:1264, active=white on blue), Notifications->Info(180:1250). Active Tasks check renders WHITE on blue (recolor confirmed).
- TIDY: moved "Nav bar - Full (Expanded)" from x880/y24 (overlapping the "Nav bar - Documentation" frame 283:70) to x600/y850 (below its doc, clear of overlaps). Doc frame now renders clean.
- LIMITATION: 4.0 Figma icon library lacks nav-ideal icons (no Bell, Database, Cube, Globe) so Records/Notifications/footer use approximations; footer (Studio/Language) still show Menu. Follow-up: add Bell/Database/Cube/Globe to the Figma icon set, and add an INSTANCE_SWAP icon property to the nav-item component so icons vary without manual per-instance swaps.

## Full Nav bar — real library icons — 2026-07-06
- KEY: 4.0 HAS a full icon library (167 icons / 13 families) inside the "Icons" frame (180:873) on the Icons page — they are INSTANCE nodes inside family frames (e.g. Database frame 180:1666 > instance 180:1673), which is why findAllWithCriteria(COMPONENT) returned 0 at page level. Resolve real icon via instance.getMainComponentAsync().
- Re-swapped full-nav (739:149) icons to REAL library icons: Records->Database(180:1673), Tasks->Tasks(180:2003, active=white), Notifications->Bell(180:1541); Home->House(180:2435) + Dashboards->Chart(180:1657) kept. Footer Studio->Cube, Language->Globe. Deleted my earlier duplicate Database/Bell/Clipboard components; Cube+Globe were genuinely missing so kept them and moved onto the Icons page.
- STILL PENDING vs 3.0 (user-flagged): (a) LOGO — 4.0 nav uses a flat "C" square; 3.0 has the real certa gradient logo (pull from 3.0 file). (b) STATES + DENSITY — 3.0 nav is a full SET (Rest/Hover/Selected/Focus x Expanded/Collapsed); 4.0 full-nav is a single selected+expanded frame. Build the state/density matrix.
