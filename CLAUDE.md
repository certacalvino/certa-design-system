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
- EXCEPTION: Modal title 18px Semi Bold 600 (sits between Title Small 16 and Title Medium 20)
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

## Workflow — Code push instructions
After each build, Code must: commit CLAUDE.md + push directly to main on certacalvino/certa-design-system (not to a new branch, no PR needed). Use the certacalvino token already available in scope.

## Components built

### Buttons & Actions — 2026-06-10
- 159 variants, 7 types: Filled, Outline, Text, Link, Icon, Round, Split
- Page: Buttons & Actions

### Forms & Inputs — rebuilt 2026-06-15
- Page: Forms & Inputs. Source: _Source Components 157:1256. Doc: 157:1257.
- **Checkbox** (179:420): State × Status = 12 variants.
- **Radio** (179:435): State × Selected = 8 variants.
- **Input** (157:1255): 7 Type × 5 State × 2 Size = 70 variants.
- **Switch** (179:452): 5 states including Loading.
- **Filter chip** (430:487): State × Icon × Badge = 16 variants. Pill 32px r=16.
- **Phone Input**: country-selector (flag+chevron+dial+clear). M 40 / Small 32.
- **Country dropdown**: row set 440:450 + panel 441:437 (280w, r8, DROP_SHADOW).
- **Masked field** (453:800): State × Size = 12 variants.
- **Multi-select** (469:1283): State × Size = 10 variants. Dropdown 470:1047. Tag chip 24px r2 brand-subtle. NO_WRAP.
- **File row** (489:1280): 5 variants M only. Badge stand-ins. FLAG: commission real file-type icons.
- **File Upload Field** (493:1401): 9 states M only. Upload icon 180:1224.
- **Dropdown Menu**: Menu Item 510:1825 (52 variants) + Menu Section 512:1668 + Menu Search 512:1670 + container 513:1669.
- **Read-only Field** (520:1872): Type(12) × State(Filled/Empty) = 24 variants.
- **Table Cell** (529:94): 7 types, 52px.
- **Table Row** (530:132): Default/Hover/Selected, 52px.
- **Table Column Header** (530:3400): Sort × Filter = 6 variants, 40px.
- Plugin gotchas: (1) variable-bound paint needs resolved raw fallback. (2) resize() after AUTO re-locks. (3) recolorSafe: IMAGE-fill icons flood. (4) Badge instances don't re-hug — set WIDTH_AND_HEIGHT + HUG. (5) throwing rolls back all. (6) screenshot backend lags fresh nodes.
- Clonable icons: Eye 180:2119 · Download 180:1214 · Trashcan 180:1131 · Lock 180:2099 · Refresh 180:1206 · Close 180:1200 · Upload 180:1224 · Search 180:1637 · Check 180:1264 · Edit 180:1053 · Chevron-down 179:272 · Calendar 180:2253 · Envelope 180:1527 · Sort 180:945 · Filter 180:1633 · Chevron-up 180:907 · Dots/Kebab 180:1710 · Chart 180:1657.

### Process Status — 2026-06-11
- 8 variants. Height 24px, r4. Page: Data Display.

### Badge — 2026-06-11
- 48 variants: Size(S/M) × Type(Default/Filled) × Color × Icon. Page: Data Display.

### Toast — rebuilt 2026-06-12
- 20 variants. Set 330:727, doc 337:62. 430px, r8. FLAG: Error+Warning share Warning triangle.

### Alert Banner — rebuilt 2026-06-12
- 32 variants. Set 360:761, doc 364:97. 480px, r4, 4px LEFT border accent.

### Nav bar — 2026-06-11
- 20 variants: State × Expanded × Badge. Icon 20px. Body Bold 14px. Page: Navigation.

### Modal — 2026-06-17
- Set 536:144 — Size(S 400/M 520/L 640) × Type(Default/Destructive) = 6 variants.
- Page: Feedback & Overlay. Source: 278:6. Doc: 537:2 (x=4800).
- Anatomy: Header (title 18px Semi Bold + Close 32px hit-area) / Body (scrollable) / Footer (Outline Cancel + Filled Save; Destructive swaps → Delete).
- New tokens: color/bg/overlay 535:2 + shadow-lg effect style.
- Scrim: doc-composition only.

### Tabs — 2026-06-17
- Tab item set 542:83 — State(Unselected/Hover/Selected/Focused/Disabled) × Badge × Icon = 20 variants.
- Tab container 543:2 — full-width 1px border/subtle baseline, itemSpacing=0, 4 composed items (Overview active + Activity + Files·12 + Settings).
- Page: Navigation. Source: 282:2. Doc: 544:2 (x=1620).
- Item: 40px, padding lg(12) H, gap md(8), icon 20px recolored per state, Badge 238:64 Neutral/S.
- States: Unselected=text/secondary · Hover=surface/muted fill r4 top corners · Selected=text/primary Bold + 2px text/link bottom indicator · Focused=2px border/focused ring r4 · Disabled=text/disabled @40% opacity.
- DS 3.0→4.0: label 12→14px, height 32→40, icon 16→20, tokenized (all hex removed), fixed disabled, normalized padding, added full-width baseline + brand indicator, Badge → 238:64.
- Dropped "Focus & Selected" combined state (DS 3.0 had it) — focus is transient, 20 variants cleaner.

### Empty State — 2026-06-17 (greenfield — no DS 3.0 port)
- Set 549:50 — Context(Page/Card/Table) × Action(bool) = 6 variants. Page: Data Display. Source: 252:93. Doc section in 198:44 (showcase 551:6 + specs + tokens).
- Anatomy (VERTICAL, centered): icon (text/disabled) + title (Body Bold 14 text/primary) + description (Body 14 text/secondary, wraps) + optional Action button.
- Page: icon 32px · gap xl(16) · width 400 · Filled M button (113:50). Card: icon 24px · gap md(8) · width 320 · Filled S (113:14). Table: icon 24px · gap md(8) · width 640 (spans table body) · Filled S (113:14).
- Icon-led, no illustrations. Default glyph Search 180:1637 (component → instanced, recolored text/disabled), swappable. 14px minimum all contexts.
- Sample copy: Page "No results found" / Card "Nothing here yet" / Table "No data found".
- DS 3.0 had NO Empty State component — only in-context table mockups ("NO DATA FOUND" 10px + "Add" CTA) inside Table-page explorations. Built from scratch.
- Gotcha: cloning a COMPONENT (180:1637) into a component errors ("component inside component") — use createInstance() when node is COMPONENT. WRAP showcase frame needs primaryAxisSizingMode=FIXED + counterAxisSizingMode=AUTO (set FIXED before resize, else width re-hugs). Component-set node with WRAP renders 1×1 from screenshot backend — instances render fine.

## Session log — 2026-06-17
- Modal (536:144, 6 variants) + 2 new tokens (color/bg/overlay 535:2, shadow-lg effect style).
- Tabs (542:83 item set 20 variants + 543:2 container). Doc 544:2 on Navigation page.
- Empty State (549:50, 6 variants Context×Action) — greenfield, no DS 3.0 port. Doc section in Data Display 198:44.
- Catalyst DS 4.0 ZIP generated with 34 previews + JSX + UI Patterns section in README. Uploaded to Claude Design "Certa DS 4.0 — WIP".
- Sidebar confirmed from production inspector: background = var(--colors-neutral-200) = light. Corrected in Catalyst 4.0.
- Claude Design comparison: DS 4.0 uses correct status vocabulary and brand tokens. DS 3.0 generates invented states ("Blocked", "Pending") not in Certa vocabulary.

## Open decisions — pending design lead
- FLAG (Avatar): no component — stand-in in Table Entity. Commission Avatar set.
- FLAG (Table column header): 10px below 12px floor. Confirmed exception pending formal sign-off.
- FLAG (Table placement): currently in Forms & Inputs. Candidate for Data Display page.
- FLAG (Nav icon): Menu/Hamburger. Confirm or specify per-item icons.
- FLAG (Toast/Alert): Error+Warning share Warning triangle. Commission alert-circle icon.
- FLAG (Filter chip): light/brand model. Confirm or commission dark-neutral tokens.
- FLAG (Phone): emoji flag cross-platform; shadow not tokenized; 6 sample countries; static.
- FLAG (focus ring): Checkbox CENTER vs Radio OUTSIDE — standardize in polish pass.
- FLAG (Masked field): no eye-off icon. Commission eye-slash icon.
- FLAG (File Upload): file-type badge stand-ins. Commission real icons.
- FLAG (Dropdown Menu): Pressed token not canonical. Add in polish pass.
- FLAG (Modal): shadow-lg + overlay are first effect-style/overlay tokens — formalize elevation scale later. Close uses cloned glyph not Icon Button.
- FLAG (Tabs): no tab panel/content region (out of scope). Dropped Focus+Selected combo — add back if needed.
- FLAG (Empty State): icon-led, no illustration library exists — commission spot-art/illustration set for a richer variant later. Default glyph Search; swap per use case (Files/Table/etc).
- RESOLVED 2026-06-17: Modal, Tabs, Empty State complete.
- RESOLVED 2026-06-16: Multi-select, File Upload, Dropdown Menu, Read-only Field, Table Row.
- Forms backlog: RAG/Visualization fields, Toggle H/V, Cascader, Slider.

## Pending components
High priority: Pagination, Date picker (Empty State — DONE 2026-06-17)
Medium priority: Dashboard widget, Avatar component
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-17)
- Color: ~96%
- Spacing: ~65%
- Typography: 100%
- Overall: ~89%
