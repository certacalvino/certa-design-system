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
- Avatar background in selected/active contexts: when an Avatar appears inside a Selected row, active card, or any surface using bg/brand-subtle, override the avatar fill to surface/default (white) so it remains visible. This applies to Table Row Selected state and any future component where an avatar sits on a brand-subtle background. If an avatar appears on surface/muted or darker backgrounds in any future component, use surface/default (white) avatar fill. (Measured: brand-subtle #ecf2ff vs surface/muted #f4f5f5 = 1.03:1, below 3:1 → Table Row Hover avatar switched to white; note neither light fill reaches 3:1 on near-white greys, so the 1px white ring + initials carry separation.)

## New tokens added 2026-06-17
- color/bg/overlay = rgba(17,24,39,0.45) — modal/dialog scrim (535:2, Semantic collection)
- shadow-lg effect style = 0 8px 24px rgba(0,22,78,0.15) — modal/dialog elevation
- shadow-xs effect style = 0 1px 2px rgba(0,22,78,0.06) — card elevation (KPI Stat Card)
- Display 28 text style = Inter Bold 28 / 34 line-height — large metric/stat values

## Workflow — Code push instructions
After each build, Code must: commit CLAUDE.md + push directly to main on certacalvino/certa-design-system (not to a new branch, no PR needed). Use the certacalvino token already available in scope.

## Components built

### Buttons & Actions — 2026-06-10
- 159 variants, 7 types: Filled, Outline, Text, Link, Icon, Round, Split
- Page: Buttons & Actions
- Split Button (113:792) Size=M fix 2026-06-18: the 6 M variants read as two separate buttons (parent itemSpacing 4 + parent padding R12/L12 inset the two sub-sections inside a transparent shell). Fixed all 6 (Enabled/Hover/Pressed/Focused/Loading/Disabled): parent gap→0 + parent padding→0 (sections flush, outer r8+clip), primaryAxisSizingMode→AUTO; label section pad 16px H (xl, same as other M buttons) + 1px text/on-brand divider on its right edge; chevron section hug + 4px H pad (sm, matches S). Size=S untouched.

### Forms & Inputs — rebuilt 2026-06-15
- Page: Forms & Inputs. Source: _Source Components 157:1256. Doc: 157:1257.
- **Checkbox** (179:420): State × Status = 12 variants. Checked mark FIX 2026-06-18: the four Status=Checked variants (Enabled/Hover/Focused/Disabled) rendered an L-shaped/return-arrow glyph (two un-rotated white rectangles 9×2 + 2×5) — replaced with the catalog Check icon 180:1264 (12px, 2px inset in the 16px box, vector recolored color/text/on-brand 3:64 white). Indeterminate variants keep their 8×2 white dash rectangle (correct, untouched).
- **Radio** (179:435): State × Selected = 8 variants.
- **Input** (157:1255): 7 Type × 5 State × 2 Size = 70 variants.
- **Switch** (179:452): 5 states including Loading.
- **Filter chip** (430:487): State × Icon × Badge = 16 variants. Pill 32px r=16.
- **Phone Input**: country-selector (flag+chevron+dial+clear). M 40 / Small 32.
- **Country dropdown**: row set 440:450 + panel 441:437 (280w, r8, DROP_SHADOW).
- **Masked field** (453:800): State × Size = 12 variants.
- **Multi-select** (469:1283): State × Size = 10 variants. Dropdown 470:1047. Tag chip 24px r2 brand-subtle. NO_WRAP.
- **File row** (489:1280): 5 variants M only. Badge stand-ins. FLAG: commission real file-type icons.
- **File Upload Field** (493:1401): 9 states M only. Upload icon 180:1224. Doc showcase (498:130) = 3×3 grid (HORIZONTAL WRAP, 3 cols) of all 9 states: Empty · Empty·Disabled · Hover / Default · Processing · Encrypted / Error·single · Error·post-submit · Dragging. RESOLVED 2026-06-18: Hover dropzone (493:1244) = 2px DASHED border/focused + bg/brand-subtle fill (was 1px dashed border/default + surface-subtle, ≈Empty) — now distinct.
- **Dropdown Menu**: Menu Item 510:1825 (52 variants) + Menu Section 512:1668 + Menu Search 512:1670 + container 513:1669. Menu Item states showcase (515:1698) = aligned 5×2 grid (was layout NONE / misaligned): cells VERTICAL auto-layout (label above item, MIN-align, gap 8), parent HORIZONTAL WRAP gap 24, width 1096 → 5/row. VERIFIED: Menu Item icon+label row counterAxisAlignItems=CENTER on all 52 variants; live geometry icon-center = text-center = row-mid (18/18 M, 16/16 Small) — no MIN bug. Apparent "icon sits high" on Leading-icon/Small was the Edit pencil glyph (mark fills top 13px of the 16px box, thin 2px underline at bottom → box-centered but top-heavy), not a layout issue. RESOLVED: swapped the Leading-icon + Small demo icons to Star (180:2267, vertically balanced mid=8) via instance-level override on the two showcase cells only — Edit glyph + Menu Item source component untouched. Composed example (513:1669) cleaned 2026-06-17: removed ACTIONS + DANGER ZONE section headers; structure = Search → Edit → Duplicate → Move to… → Mark as default → 1px border/subtle divider → Delete (red destructive communicates danger w/o label). All item icons 16px (contextual-menu exception). Duplicate item icon swapped Edit→Duplicate glyph (main 180:1089). Catalog HAS dedicated Copy (180:1058) + Duplicate (180:1089) icons in Actions category — no commission needed.
- **Read-only Field** (520:1872): Type(12) × State(Filled/Empty) = 24 variants. Pill value types (Boolean/Select/Multi, Filled) carry a 1px border/subtle stroke on the Badge pills so they have a visible boundary on white (added 2026-06-18).
- **Table Cell** (529:94): 7 types, 52px. Entity avatar has 1px surface/default (white) ring (INSIDE) — clean separation from any row bg (Default/Hover/Selected); propagates to Table Row. Selected (530:94) AND Hover (530:56) row variants override the avatar FILL to surface/default (white) — Selected on brand-subtle, Hover on surface/muted (brand-subtle vs muted = 1.03:1 < 3:1). Only Default keeps brand-subtle fill. See Avatar-on-brand-subtle/muted system rule. Status badge bg is token-bound + opaque, holds across all row states (not overridden by row bg).
- **Table Row** (530:132): Default/Hover/Selected, 52px.
- **Table Column Header** (530:3400): Sort × Filter = 6 variants, 40px.
- **Toggle** (item set 574:62): Orientation(Horizontal/Vertical) × State(Unselected/Hover/Selected/Focused/Disabled) × Icon = 20 variants. Containers: Toggle — Horizontal 575:2 (segmented track surface/subtle + 1px border/subtle r4, items flush) + Toggle — Vertical 575:9 (stacked rows, 220w, gap sm). H item 32px hug; V item 40px FILL. Selected=brand-subtle+text/link Body Bold; Hover=surface/muted; Focused=2px border/focused; Disabled @40%. Ported/unified from DS 3.0 Horizontal toggle (18v) + Vertical Toggle (20v). Doc section in 157:1257.
- **RAG Field** (577:23): RAG(Red/Amber/Green) = 3 variants. Risk status field for Certa TPRM. 240×40 r4 field, tinted bg (RAG L3) + value (Body 14 text/primary) + 24px full-height colored right-tab (RAG base) with vertical label (Inter Bold 10 white, rotated 90° via relativeTransform — Figma rotation pivots origin not center, use matrix [[0,-1,12+H/2],[1,0,20-W/2]] to center in 24×40). Red→HIGH/Orange→MED/Green→LOW. Label "Inherent risk" above. Ported from DS 3.0 Rag Field (r8→r4, tokenized to primitive hue scales). Doc section in 157:1257. A11y: HIGH+LOW tab labels = text/on-brand (3:64, #ffffff white); MED = Orange/D2 (3:37, dark) — white on Orange/base fails WCAG AA. GOTCHA: Neutral/0 (3:13) resolves to BLACK in this file (not white) — use color/text/on-brand 3:64 for white-on-color.
- **Date Picker** (v1 + v2 range — 2026-06-17): Date cell set 582:14 (State: Default/Hover/Today/Selected/Muted/Disabled + In-Range [v2: bg/brand-subtle 3:77 + text/link 3:66], 40×40 r4, day# 12px grid-meta) + Date Picker panel 583:14 (280 grid, r8+shadow-lg overlay, header Icon Button prev/next chevron 180:893/899 + month Body Bold 14, weekday row 12 Caption text/secondary SUN-first, Today Link + Clear Text-S footer) + Date Field set 585:71 (State Empty/Filled = Input 157:1255 + overlaid trailing Calendar 180:2253 / Clear 180:1200). Single-selection. Today = 1px border/focused ring (no fill). Doc section in 157:1257. GOTCHA: Input set has NO Type=Date (types Text/Email/Password/URL/Search/Number/Phone) and instance trailing-icon is a non-swappable placeholder frame — realized date field by hiding placeholder ellipses (visible=false) + overlaying the real glyph positioned via absoluteBoundingBox. v2 (2026-06-17): RANGE selection added — In-Range cell variant (610:2) + range example panel 611:2 in doc 157:1257 (start/end = Selected brand fill, in-range = brand-subtle + text/link). Range example built by instancing panel 583:14 + overriding cell State props (setProperties keeps text-override layer; re-set chars to be safe). Connected band: start cell per-corner radius L-only (TL+BL r4, R r0), end cell R-only, in-range cells r0 (rows flush itemSpacing 0 → continuous; wraps naturally across week rows). Per-corner radii set as instance overrides (topLeftRadius etc.). v2 date-time/time (2026-06-18): panel 583:14 converted to a SET "Date Picker" 632:100 with Mode(Date 583:14 / Date-time 632:2 / Time 632:76). Time row = two number boxes (HH 56×40 r4 border/subtle + ":" + MM) + AM/PM segmented toggle (surface/subtle track, AM=brand-subtle+text/link), top 1px border/subtle divider. Date-time = calendar + time row before footer; Time = panel shell + time row + footer (Today→"Now"). Doc example row added to showcase 586:6 (633:2). Zero hardcoded values. v2 COMPLETE. Layout fix 2026-06-18: all 3 Mode variants share the panel shell (surface/default fill + 1px border/subtle + r8 + shadow-lg, 296w); set 632:100 repositioned in source 157:1256 below Date Field 585:71 (abs y 11831, 40px gap) — was overlapping Input; source frame height extended to 12304. Time-only polish 2026-06-18: shell 296w fixed + 16px padding all sides + gap lg(12); time row (HH:MM + AM/PM) fills 264w and centers horizontally, stray top divider removed; footer (Now/Clear, SPACE_BETWEEN Link+Text) carries a 1px border/subtle top divider — matches the Date panel footer pattern. Fix 2026-06-18b: Date-time 632:2 set to hug height (primaryAxisSizingMode=AUTO) so footer no longer clips; Time-only 632:76 width pinned 296; time row in BOTH variants — HH/MM fields + AM/PM toggle all 40px tall (toggle = segments 36 + 2/2 pad), row counterAxisAlignItems=CENTER so they share one baseline. Fix 2026-06-18c: Date-time 632:2 paddingBottom=16 (xl) so the Today/Clear footer has breathing room above the bottom border (h 368→376); Time-only 632:76 shell re-asserted — complete 1px border/subtle on all 4 sides + shadow-lg effect style. Fix 2026-06-18d: Date-time 632:2 time row was clipping — the Time row frame (and Footer) were counterAxisSizingMode=FIXED h40 with clip=true, but the time row content (40px inputs/AM-PM toggle + 12/4 top/bottom padding) needs 56px → bottom clipped. Set Time row + Footer counterAxisSizingMode=AUTO (hug); time row now 56, footer 36, shell hugs to 388, nothing clips. (Shell already AUTO; the culprit was FIXED-height child frames.)
- Plugin gotchas: (1) variable-bound paint needs resolved raw fallback. (2) resize() after AUTO re-locks. (3) recolorSafe: IMAGE-fill icons flood. (4) Badge instances don't re-hug — set WIDTH_AND_HEIGHT + HUG. (5) throwing rolls back all. (6) screenshot backend lags fresh nodes.
- Clonable icons: Eye 180:2119 · Download 180:1214 · Trashcan 180:1131 · Lock 180:2099 · Refresh 180:1206 · Close 180:1200 · Upload 180:1224 · Search 180:1637 · Check 180:1264 · Edit 180:1053 · Chevron-down 179:272 · Calendar 180:2253 · Envelope 180:1527 · Sort 180:945 · Filter 180:1633 · Chevron-up 180:907 · Dots/Kebab 180:1710 · Chart 180:1657.

### Process Status — 2026-06-11
- 8 variants. Height 24px, r4. Page: Data Display.

### Badge — 2026-06-11
- 48 variants: Size(S/M) × Type(Default/Filled) × Color × Icon. Page: Data Display.

### Gauge — 2026-06-17 (ported from DS 3.0 Visualisation Field Gauge)
- Set 598:32 — RAG(Low/Medium/High) = 3 variants. Page: Data Display. Source: 252:93. Doc section in 198:44 (showcase 598:37).
- 140×140 gauge: 270° arc (start 135°, gap at bottom) via ELLIPSE arcData {startingAngle,endingAngle,innerRadius:0.74}. Track = surface/muted (3:74, #f4f5f5); colored arc sweep = value/5 × 270° in RAG base (Low Green/base 3:41 · Med Orange/base 3:35 · High Red/base 3:53). NO needle, NO dot (redesigned 2026-06-17) — the arc alone communicates the value. Center text = value only (Display 28 text/primary, number e.g. "1.5"); no "/ 5". "Risk" Caption 12 text/secondary below the gauge.
- Sample scores: Low 1.5 / Med 2.5 / High 4.5. RAG mapping matches RAG Field 577:23. Zero hardcoded values.

### Circular Progress — 2026-06-17 (ported/generalized from DS 3.0 11522:10378)
- Set 609:116 — Size(S 40/L 80) × Progress(0/25/50/75/100) × State(Default/Success/Error) = 30 variants. Page: Data Display. Source: 252:93. Doc section in 198:44 (showcase 609:4427).
- Full 360° ring via ELLIPSE arcData {0,2π,innerRadius:0.78}. Track = surface/muted (3:74). Progress arc from top (start 1.5π) clockwise, sweep = progress/100 × 2π; 0% = track only (no arc node), 100% = full ring. Arc color: Default bg/brand (3:76) · Success text/success (3:69) · Error text/error (3:68). Center % text/primary: Caption 12 (S) / Body Bold 14 (L), centered in NONE-layout frame.
- Generalized from DS 3.0: dropped workflow Status (Delayed / About-to-be-delayed). Flat arc caps (arcData has no rounded caps). Zero hardcoded values.

### KPI / Stat Card — 2026-06-17 (greenfield)
- Set 595:4282 — Icon(bool) × Delta(bool) = 4 variants. Page: Data Display. Source: 252:93. Doc section in 198:44 (showcase 596:6).
- Card: 200w (height hugs), VERTICAL, surface/default + r4 + 1px border/subtle + shadow-xs, padding xl(16), gap md(8). Content: optional icon 24px text/disabled (Chart 180:1657, swappable) + title (Caption 12 uppercase text/secondary) + value (Display 28, text/primary) + optional delta (Body 14, ▲ text/success / ▼ text/error + %, unicode triangle in text run).
- Delta direction is a content swap (not a variant). No text/danger token in file → negative uses color/text/error (3:68).
- New styles created this build: shadow-xs effect + Display 28 text. Zero hardcoded values.

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
- KPI / Stat Card (595:4282, 4 variants Icon×Delta) — greenfield dashboard widget. Doc section in Data Display 198:44. New shadow-xs + Display 28 styles. DS 3.0 had only risk-specific Gauge/Widget (no generic KPI card).
- Gauge (598:32, 3 RAG variants) — ported from DS 3.0 Visualisation Field Gauge. Radial arc (arcData), value-only center (no needle/dot). Doc section in Data Display 198:44.
- Circular Progress (609:116, 30 variants Size×Progress×State) — ported/generalized from DS 3.0 (workflow statuses dropped). Doc section in Data Display 198:44.
- Contrast/polish fixes 2026-06-17: RAG tabs → HIGH/LOW white (text/on-brand 3:64), MED dark (Orange/D2) for AA; Table Cell Entity avatar → 1px surface/default white ring; verified Status badge bg holds across row states. (Neutral/0 3:13 = black here — used 3:64 for white.)
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
High priority: (all done) — Empty State · Pagination · Date Picker v1+v2 (DONE 2026-06-17/18: range + date-time/time-only). Polish 2026-06-18: File Upload Hover dropzone, Read-only Field pill borders, Menu Item Star swap (verified).
Medium priority: (clear) — Avatar · KPI Stat Card · Gauge · Circular Progress all DONE 2026-06-17.
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-17)
- Color: ~96%
- Spacing: ~65%
- Typography: 100%
- Overall: ~89%
