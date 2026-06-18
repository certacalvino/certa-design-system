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
- **Toggle** (item set 574:62): Orientation(Horizontal/Vertical) × State(Unselected/Hover/Selected/Focused/Disabled) × Icon = 20 variants. Containers: Toggle — Horizontal 575:2 (segmented track surface/subtle + 1px border/subtle r4, items flush) + Toggle — Vertical 575:9 (stacked rows, 220w, gap sm). H item 32px hug; V item 40px FILL. Selected=brand-subtle+text/link Body Bold; Hover=surface/muted; Focused=2px border/focused; Disabled @40%. Ported/unified from DS 3.0 Horizontal toggle (18v) + Vertical Toggle (20v). Doc section in 157:1257.
- **RAG Field** (577:23): RAG(Red/Amber/Green) = 3 variants. Risk status field for Certa TPRM. 240×40 r4 field, tinted bg (RAG L3) + value (Body 14 text/primary) + 24px full-height colored right-tab (RAG base) with vertical label (Inter Bold 10 white, rotated 90° via relativeTransform — Figma rotation pivots origin not center, use matrix [[0,-1,12+H/2],[1,0,20-W/2]] to center in 24×40). Red→HIGH/Orange→MED/Green→LOW. Label "Inherent risk" above. Ported from DS 3.0 Rag Field (r8→r4, tokenized to primitive hue scales). Doc section in 157:1257.
- **Date Picker** (v1 — 2026-06-17): Date cell set 582:14 (State: Default/Hover/Today/Selected/Muted/Disabled, 40×40 r4, day# 12px grid-meta) + Date Picker panel 583:14 (280 grid, r8+shadow-lg overlay, header Icon Button prev/next chevron 180:893/899 + month Body Bold 14, weekday row 12 Caption text/secondary SUN-first, Today Link + Clear Text-S footer) + Date Field set 585:71 (State Empty/Filled = Input 157:1255 + overlaid trailing Calendar 180:2253 / Clear 180:1200). Single-selection. Today = 1px border/focused ring (no fill). Doc section in 157:1257. GOTCHA: Input set has NO Type=Date (types Text/Email/Password/URL/Search/Number/Phone) and instance trailing-icon is a non-swappable placeholder frame — realized date field by hiding placeholder ellipses (visible=false) + overlaying the real glyph positioned via absoluteBoundingBox. v2 backlog: range selection + date-time/time row.
- Plugin gotchas: (1) variable-bound paint needs resolved raw fallback. (2) resize() after AUTO re-locks. (3) recolorSafe: IMAGE-fill icons flood. (4) Badge instances don't re-hug — set WIDTH_AND_HEIGHT + HUG. (5) throwing rolls back all. (6) screenshot backend lags fresh nodes.
- Clonable icons: Eye 180:2119 · Download 180:1214 · Trashcan 180:1131 · Lock 180:2099 · Refresh 180:1206 · Close 180:1200 · Upload 180:1224 · Search 180:1637 · Check 180:1264 · Edit 180:1053 · Chevron-down 179:272 · Calendar 180:2253 · Envelope 180:1527 · Sort 180:945 · Filter 180:1633 · Chevron-up 180:907 · Dots/Kebab 180:1710 · Chart 180:1657.

### Process Status — 2026-06-11
- 8 variants. Height 24px, r4. Page: Data Display.

### Badge — 2026-06-11
- 48 variants: Size(S/M) × Type(Default/Filled) × Color × Icon. Page: Data Display.

### Avatar — 2026-06-17 (greenfield)
- Set 572:50 — Size(S 24/M 32/L 40/XL 56) × Tone(Brand/Teal/Green/Orange/Red/Neutral) = 24 variants. Page: Data Display. Source: 252:93. Doc section in 198:44 (showcase 573:6).
- Circle (r = Ø/2), light tint bg + saturated "AB" initials (Inter Semi Bold, raw 10/12/14/20 scaled to Ø — decorative, below 14px floor at S/M).
- Tones bound to primitive hue scales: Brand 100/700 · Teal/Green/Orange/Red L3(bg)/D2(initials) · Neutral 200/700. Zero hardcoded values.
- Resolves the Table Entity avatar stand-in flag — swap the stand-in for this component in a polish pass.

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

### Pagination — 2026-06-17 (ported/unified from DS 3.0)
- Pagination set 563:60 — Type(Simple/Numbered) = 2 variants. Pagination Number (page button) set 562:8 — State(Default/Hover/Selected) = 3 variants. Page: Data Display. Source: 252:93. Doc section in 198:44 (showcase 566:6 + specs + tokens).
- Simple: range text (left) ↔ First/Prev/Next/Last arrows (right). Numbered: range (left) ↔ Prev + "1 2 3 … 10" page buttons (one Selected) + Next.
- Arrows = Icon Button M 113:710 (32px), glyphs swapped: First=Double Chevron Left 180:978 (rotated 180° — see gotcha) / Prev=Chevron Left 180:893 / Next=Chevron Right 180:899 / Last=Double Chevron Right 180:986. Glyph ~14px (Icon Button M native slot — DECISION: accepted native over forced 16px, since Icon Button reuse takes precedence).
- Range text: 12px Caption color/text/secondary ("1–10 of 100"). Page button 32×32 r4: Default(transparent/text-secondary) · Hover(surface/muted/text-primary) · Selected(bg/brand/text-on-brand Body Bold).
- Disabled edges: First+Prev = Icon Button Disabled (glyph recolored text/disabled #8892ac) on page 1; Next+Last on last page. Shown in doc, not a main-set variant.
- DS 3.0 source: single Pagination 11452:8244 (range + 4 arrows, no variants, hardcoded hex, arrows built on Disabled icon-button variant, 14px icons). Unified + tokenized; added Numbered type + page-button states.
- GOTCHA: DS 4.0 catalog "Double Chevron Left" (180:978/981) AND "Double Chevron Right" (180:986/989) BOTH render right-pointing (left one mislabeled) — no left double chevron exists. Fix: rotate the whole First Icon Button 180° (chevrons vertically symmetric → clean «). Nested glyph rotation is locked inside an instance; rotate the button instead.

## Session log — 2026-06-17
- Modal (536:144, 6 variants) + 2 new tokens (color/bg/overlay 535:2, shadow-lg effect style).
- Tabs (542:83 item set 20 variants + 543:2 container). Doc 544:2 on Navigation page.
- Empty State (549:50, 6 variants Context×Action) — greenfield, no DS 3.0 port. Doc section in Data Display 198:44.
- Pagination (563:60 Simple/Numbered + 562:8 page-button states). Doc section in Data Display 198:44. Reuses Icon Button 113:710 + Badge brand tokens.
- Avatar (572:50, 24 variants Size×Tone) — greenfield. Doc section in Data Display 198:44. Resolves Table Entity stand-in flag.
- Toggle (item set 574:62, 20 variants + H container 575:2 + V container 575:9). Ported from DS 3.0 H/V toggles. Doc section in Forms & Inputs 157:1257.
- RAG Field (577:23, 3 variants Red/Amber/Green) — TPRM risk status field. Ported from DS 3.0 Rag Field. Doc section in Forms & Inputs 157:1257.
- Sprint 2026-06-17: Avatar + Toggle + RAG Field built back-to-back, each pushed to main.
- Date Picker v1 (582:14 cell + 583:14 panel + 585:71 field). Ported from DS 3.0 Date Picker. Doc section in Forms & Inputs 157:1257. Single-selection; range + datetime = v2.
- Catalyst DS 4.0 ZIP generated with 34 previews + JSX + UI Patterns section in README. Uploaded to Claude Design "Certa DS 4.0 — WIP".
- Catalyst bundle committed to repo at catalyst-ds-4.0/ (+ catalyst-ds-4.0.zip). colors_and_type.css = full semantic token layer (primitives→semantic→type/space/effects); ui_kits/certa-studio/ = Primitives + AppShell + VendorsList + HomeDashboard + VendorDetail; preview/ = 34 standalone token-linked HTML files; index.html gallery; README UI Patterns documents all 10 composition rules. build_previews.py regenerates previews (excluded from zip). NOTE: programmatic upload to Claude Design unavailable from remote env — zip committed for manual upload.
- Sidebar confirmed from production inspector: background = var(--colors-neutral-200) = light. Corrected in Catalyst 4.0.
- Claude Design comparison: DS 4.0 uses correct status vocabulary and brand tokens. DS 3.0 generates invented states ("Blocked", "Pending") not in Certa vocabulary.

## Open decisions — pending design lead
- RESOLVED (Avatar): built 572:50 (24 variants). Table Entity stand-in still in place — swap to Avatar component in polish pass.
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
- FLAG (Pagination): "Double Chevron Left" icon (180:978/981) is mislabeled — points right; First arrow uses a 180°-rotated button as a workaround. Commission a true left double-chevron glyph. Arrows render at Icon Button M native ~14px (not 16px) — accepted; revisit if a 16px arrow control is wanted.
- RESOLVED 2026-06-17: Modal, Tabs, Empty State, Pagination complete.
- RESOLVED 2026-06-16: Multi-select, File Upload, Dropdown Menu, Read-only Field, Table Row.
- Forms backlog: Visualization fields (Gauge/Widget), Cascader, Slider (Toggle H/V — DONE 2026-06-17 · RAG Field — DONE 2026-06-17).

## Pending components
High priority: (all done) — Empty State · Pagination · Date Picker v1 (DONE 2026-06-17). Date Picker v2 backlog: range selection + date-time/time row.
Medium priority: Dashboard widget (Avatar — DONE 2026-06-17)
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-17)
- Color: ~96%
- Spacing: ~65%
- Typography: 100%
- Overall: ~89%
