# DS 4.0 — Build Memory

Last updated: 2026-06-17

## System decisions (locked)
- Border-radius: 4px across all components
- Icon size: 20px (production-confirmed, overrides 16px spec)
- EXCEPTION: menu-row icons 16px (contextual menus, not nav/buttons)
- EXCEPTION: read-only field value icons 16px (display context)
- EXCEPTION: table cell icons 16px (Actions cell, Date cell)
- EXCEPTION: column header icons 16px (sort/filter)
- EXCEPTION: column header label 10px uppercase (table-header meta — raw value, no style)
- EXCEPTION: Modal title 18px Semi Bold 600 (sits between Title Small 16 and Title Medium 20 — raw value)
- Typography scale: 14px minimum for component labels (accessibility)
- EXCEPTION: Menu Section headers + Read-only Field labels + table meta-text use 12px Caption (non-interactive)
- Spacing grid: 8-unit tokens (xs:2, sm:4, md:8, lg:12, xl:16, 2xl:20, 3xl:24, 4xl:32)
- Tokenization: zero hardcoded values in any component
- Button M label: Body Bold 14px
- Process Status chip padding: 12px H (lg token)
- Overlay containers (Dropdown, Toast, Modal): r8 exception to 4px default

## New tokens added 2026-06-17
- color/bg/overlay = rgba(17,24,39,0.45) — modal/dialog scrim (535:2, Semantic collection)
- shadow-lg effect style = 0 8px 24px rgba(0,22,78,0.15) — modal/dialog elevation

## Components built

### Buttons & Actions — 2026-06-10
- 159 variants, 7 types: Filled, Outline, Text, Link, Icon, Round, Split
- All fills, strokes, labels bound to semantic tokens
- Boolean props: Icon, Disclosure
- Page: Buttons & Actions

### Forms & Inputs — rebuilt 2026-06-15 (DS 3.0 audit-driven)
- Page: Forms & Inputs. Source: _Source Components 157:1256. Doc: 157:1257.
- **Checkbox** (179:420): State × Status = 12 variants.
- **Radio** (179:435): State × Selected = 8 variants.
- **Input** (157:1255): 7 Type × 5 State × 2 Size (M 40 / Small 32) = 70 variants.
- **Switch** (179:452): 5 states including Loading.
- **Filter chip** (430:487): State × Icon × Badge = 16 variants. Pill 32px r=16.
- **Phone Input** (10 variants): country-selector (flag+chevron+dial+clear). M 40 / Small 32.
- **Country dropdown**: row set 440:450 + panel 441:437 (280w, r8, DROP_SHADOW).
- **Masked field** (453:800): State × Size = 12 variants. Lock + eye + spinner.
- **Multi-select** (469:1283): State × Size = 10 variants. Dropdown standalone 470:1047. Tag chip 24px r2 brand-subtle. NO_WRAP.
- **File row** (489:1280): 5 variants M only. Badge stand-ins (PDF=Danger, DOC=Brand, IMG=Success). FLAG: commission real file-type icons.
- **File Upload Field** (493:1401): 9 states M only. Upload icon 180:1224. Spinner from 453:553.
- **Dropdown Menu**: Menu Item 510:1825 (52 variants) + Menu Section 512:1668 + Menu Search 512:1670 + container 513:1669. Source DS 3.0 "new" 19752:7977. 16px icons. Pressed dropped. v2: user-rows, file-rows.
- **Read-only Field** (520:1872): Type(12) × State(Filled/Empty) = 24 variants. Label 12px Caption. Reuses Badge 238:208.
- **Table Cell** (529:94): 7 types, 52px. Entity=avatar 32px+name bold+meta caption. Status=Badge. Number right-aligned.
- **Table Row** (530:132): Default/Hover/Selected, 52px. surface/default·muted·brand-subtle. Divider border/subtle.
- **Table Column Header** (530:3400): Sort(None/Asc/Desc) × Filter = 6 variants, 40px. 16px icons.
- Plugin gotchas: (1) variable-bound paint needs resolved raw fallback. (2) resize() after AUTO re-locks to FIXED. (3) recolorSafe: IMAGE-fill icons flood on fill replace. (4) Badge instances don't re-hug after text override — set WIDTH_AND_HEIGHT + HUG. (5) throwing inside use_figma rolls back all. (6) screenshot backend lags fresh nodes.
- Clonable icons: Eye 180:2119 · Download 180:1214 · Trashcan 180:1131 · Lock 180:2099 · Refresh 180:1206 · Close 180:1200 · Upload 180:1224 · Search 180:1637 · Check 180:1264 · Edit 180:1053 · Chevron-down 179:272 · Calendar 180:2253 · Envelope 180:1527 · Sort 180:945 · Filter 180:1633 · Chevron-up 180:907 · Dots/Kebab 180:1710.

### Process Status — 2026-06-11
- 8 variants: New/In Progress/Completed/Review/Draft/Approved/Duplicate/Inactive. Height 24px, r4.
- Page: Data Display

### Badge — 2026-06-11
- 48 variants: Size(S/M) × Type(Default/Filled) × Color(Neutral/Brand/Success/Warning/Danger/Info) × Icon.
- Page: Data Display

### Toast — rebuilt 2026-06-12
- 20 variants: Type × Dismiss × Action. Set 330:727, doc 337:62. 430px, r8, icon circle 32×32.
- FLAG: Error+Warning share Warning triangle — no alert-circle icon.

### Alert Banner — rebuilt 2026-06-12
- 32 variants: Type × Icon × Dismiss × Action. Set 360:761, doc 364:97. 480px, r4, 4px LEFT border accent.
- FLAG: Error uses Warning triangle.

### Nav bar — 2026-06-11
- 20 variants: State × Expanded × Badge. Icon 20px (Menu/Hamburger 180:1643). Body Bold 14px.
- Page: Navigation

### Modal — 2026-06-17
- Component set 536:144 — Size(S 400/M 520/L 640) × Type(Default/Destructive) = 6 variants.
- Page: Feedback & Overlay. Source: 278:6. Doc: 537:2 (x=4800).
- Anatomy: Header (title 18px Semi Bold text/primary + Close glyph 180:1200 in 32px r4 hit-area) / Body (scrollable content slot, Body 14 text/secondary) / Footer (right-aligned: Outline Cancel 113:447 + Filled Save 113:230; Destructive swaps primary → Filled Destructive Delete).
- Container: VERTICAL auto-layout, surface/default, r8, shadow-lg effect style, height hugs.
- New tokens: color/bg/overlay 535:2 (scrim rgba(17,24,39,0.45)) + shadow-lg effect style.
- Scrim: doc-composition only (not a standalone component). Backdrop = full-bleed rect with color/bg/overlay.
- Deviation: Close uses cloned glyph pattern (not Icon Button component) — Icon Button's 12/16px glyph was poor fit.
- DS 3.0→4.0: unified two divergent DS 3.0 dialogs; added Body slot + Size/Type variants; fully tokenized (DS 3.0 was 100% hardcoded); footer uses DS 4.0 Button sets.

## Session log — 2026-06-17 (Modal + Catalyst DS 4.0 ZIP)
- Modal built (536:144, 6 variants), doc frame 537:2. New tokens: color/bg/overlay 535:2, shadow-lg effect style.
- Catalyst DS 4.0 ZIP generated: updated colors_and_type.css (brand #1B4FD8, slate neutrals, WCAG-compliant warning #D97706), component CSS for all DS 4.0 components, README with full DS 3.0→4.0 audit, SKILL.md.
- Sidebar confirmed from production inspector: background-color = var(--colors-neutral-200) = #F8F9F9 (light, not dark). Corrected in Catalyst 4.0 ZIP.

## Session log — 2026-06-16 (full day)
- Multi-select, File Upload (File row + Field), Dropdown Menu, Read-only Field, Table Row (Cell+Row+Header) all built and screenshot-verified.
- Doc showcases added to Forms & Inputs 157:1257. _Source Components 157:1256 grew to 10028+ tall.
- Claude Design DS "Certa DS 4.0 — WIP" configured and published on Certa account.

## Session log — 2026-06-15 (Forms audit + rebuild)
- Full DS 3.0 audit. Built: Checkbox, Radio, Input, Switch, Filter chip, Phone, Country dropdown, Masked field.
- Env: GitHub MCP scoped to christiancalvino/certa_app only. User pushes CLAUDE.md manually.

## Session log — 2026-06-12 (Feedback/Nav/Buttons fixes)
- Toast + Alert Banner doc fixes. Nav icon → Menu/Hamburger. Toast icon instances replaced.
- Working note: `loadAllPagesAsync` unsupported — use `figma.root.children` + `page.loadAsync()`. Throwing inside use_figma rolls back all changes.

## Open decisions — pending design lead
- FLAG (Avatar): no component — Table Entity cell uses tokenized stand-in. Commission Avatar set.
- FLAG (Table column header label): 10px below 12px meta-text floor. Confirmed exception, pending formal sign-off.
- FLAG (Table placement): currently in Forms & Inputs. Candidate to move to Data Display page.
- FLAG (Nav icon): Menu/Hamburger. Confirm or specify per-item icons.
- FLAG (Toast/Alert): Error+Warning share Warning triangle. Commission alert-circle icon.
- FLAG (Filter chip): light/brand model (no dark-neutral bg token). Confirm or commission tokens.
- FLAG (Phone): emoji flag cross-platform; dropdown shadow not tokenized; 6 sample countries; static.
- FLAG (focus ring): Checkbox CENTER vs Radio OUTSIDE — standardize in polish pass.
- FLAG (Masked field): no eye-off icon. Commission eye-slash icon.
- FLAG (File Upload): file-type badge stand-ins. Commission real file-type icon set.
- FLAG (Dropdown Menu): Pressed token not canonical. Add in polish pass.
- FLAG (Modal): shadow-lg + color/bg/overlay are first effect-style and overlay token in file — formalize full elevation scale in a future pass. Close uses cloned glyph (not Icon Button).
- RESOLVED 2026-06-17: Modal complete (6 variants, 2 new tokens, full doc).
- RESOLVED 2026-06-16: Multi-select, File Upload, Dropdown Menu, Read-only Field, Table Row all complete.
- Forms backlog remaining: RAG/Visualization fields, Toggle H/V, Cascader, Slider.

## Pending components
High priority: Tabs, Pagination, Date picker, Empty state
Medium priority: Dashboard widget, Avatar component
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-17)
- Color: ~96%
- Spacing: ~65%
- Typography: 100%
- Overall: ~88%
