# DS 4.0 — Build Memory

Last updated: 2026-06-17

## System decisions (locked)
- Border-radius: 4px across all components
- EXCEPTION: overlay containers (Toast, Dropdown Menu, Modal) use 8px — confirmed overlay-container exception
- EXCEPTION: Modal title uses 18px Semi Bold (raw, documented) — sits between Title Small 16 and Title Medium 20; no 18px style exists
- Icon size: 20px (production-confirmed, overrides 16px spec)
- EXCEPTION: menu-row icons are 16px — deliberate exception for contextual menus (not nav/buttons)
- EXCEPTION: read-only field value icons (Date, Envelope) are 16px — display context, not interactive
- Typography scale: 14px minimum for component labels (accessibility)
- EXCEPTION: Menu Section headers + Read-only Field labels (non-interactive meta-text) use 12px Caption uppercase
- EXCEPTION: Table Column Header labels use 10px uppercase (Inter Medium, +0.5 letterspacing) — table-header convention, below the 12px meta-text floor (no 10px style exists; raw value). FLAG for design-lead confirm.
- Spacing grid: 8-unit tokens (xs:2, sm:4, md:8, lg:12, xl:16, 2xl:20, 3xl:24, 4xl:32)
- Tokenization: zero hardcoded values in any component
- Button M label: Body Bold 14px
- Process Status chip padding: 12px H (lg token)

## Components built

### Buttons & Actions — 2026-06-10
- 159 variants, 7 types: Filled, Outline, Text, Link, Icon, Round, Split
- All fills, strokes, labels bound to semantic tokens
- Boolean props: Icon, Disclosure
- Page: Buttons & Actions
- 2026-06-12: footer date corrected 2026-06-09 → 2026-06-11

### Forms & Inputs — 2026-06-10, rebuilt 2026-06-15 (DS 3.0 audit-driven)
- 6 components + Filter chip (new). Border-radius 4px (2px checkbox per Spacing). Page: Forms & Inputs.
- Rebuild decisions (design lead 2026-06-15): restore Hover+Focus to Checkbox/Radio; Input 40px M + add 32px Small (Input only); keep HTML input types + add Phone; add Switch Loading; port Filter chip.
- **Checkbox** (set 179:420): 2 props — State(Enabled/Hover/Focused/Disabled) × Status(Unchecked/Checked/Indeterminate) = 12 variants. Hover: border/strong (unchecked), bg/brand-hover (checked/indet). Focused: 2px border/focused ring. Added Disabled Indeterminate. Grid cols=State, rows=Status.
- **Radio** (set 179:435): State(Enabled/Hover/Focused/Disabled) × Selected(False/True) = 8. Hover: border/strong / bg/brand-hover dot. Focused: 2px border/focused OUTSIDE halo. Cols=State, rows=Selected.
- **Input** (set 157:1255): added Size prop. 7 Type (Text/Email/Password/URL/Search/Number/Phone) × 5 State × 2 Size (M 40px, Small 32px) = 70 variants. Phone = plain field placeholder "(201) 555-0123". Spacing&Grid Input-height row reconciled to Small 32 / Default 40. Forms page description updated.
- **Switch** (set 179:452): added Loading (5th State) = surface/muted track + centered thumb + brand spinner arc (ellipse arcData 270°). 5 variants.
- **Filter chip** (NEW, set 430:487, on Forms page x=2720): State(Default/Hover/Selected/Disabled) × Icon × Badge = 16. Pill 32px r=16, pad 12h, gap md(8). Default/Hover badge = brand-subtle bg + link count; Selected = brand chip / white badge / link count; Disabled greyed. Fully tokenized.
- **Phone Input** — rebuilt 2026-06-15: the 10 Phone variants (set 157:1255) restructured from plain field → field = country-selector (🇺🇸 emoji flag 20px + Chevron-down instance, brand) + dial code "+1" (placeholder) / full number "+1 (123) 321 234" (filled, text/primary) + Clear ✕ (Close icon, filled only). Heights M 40 / Small 32 (DS 4.0, not DS 3.0's 36). Icons reused: Chevron down (Select's main), Close (180:1200). Focus = single border/focused (no DS 3.0 3px halo); Error = border/error (Red/D1, not DS 3.0 Red/D2). Doc-frame showcase (157:1257, VERTICAL auto-layout, itemSpacing 40) gained a 7th "Phone" row (448:2) showing all 5 states; footer date → 2026-06-15.
- **Country dropdown** (NEW): "Country row" set 440:450 (State=Default/Hover/Selected; flag+name+dial+check, 264×36 r4; Hover=surface/subtle, Selected=brand-subtle+link+Check icon). "Country dropdown" panel component 441:437 (280w, surface/default, border/subtle, r8, raw DROP_SHADOW matching Shadow 0-2-8) = search field (Search icon 180:1639 + placeholder) + 6 country rows (US/GB/CA/AU/DE/FR). On Forms page x=2720.
- **Masked field** (NEW standalone, set 453:800, Forms page x=3500): State(Masked/Loading/Revealed/Focused/Error/Disabled) × Size(M 40 / Small 32) = 12 variants. Anatomy = label + field + helper (cloned from Input Text base). Field: 🔒 Lock leading (180:2099) + masked "••••••••" / revealed "1234-5678-9012" + trailing eye (180:2119) / spinner (ellipse arcData 270°, Loading). Per-state: Masked/Loading bg surface/subtle + border/default; Revealed border/focused 1px; Focused border/focused 2px; Error border/error + "This field has an error"; Disabled surface/disabled. For sensitive values fetched async on reveal (vs the simple Password input type which is static dots).
- **Multi-select** (NEW standalone, set 469:1283): State(Default/Focused/Filled/Error/Disabled) × Size(M 40 / Small 32) = 10 variants. Open dropdown = standalone component 470:1047. Anatomy = label + field (chips/placeholder + chevron) + helper. Tag chip: 24px h, r2, bg/brand-subtle, label text/primary 12px, Close ✕ text/link. Fixed single row NO_WRAP — tags clip if overflow. Dropdown panel: search field + Checkbox rows (179:420) with Hover=surface/subtle, Selected=brand-subtle. Doc: state showcase 471:4 (5 M cells) + Open state composed 471:101 (field + dropdown below). Decisions: standalone (not Mode prop on Select); fixed single row; includes dropdown panel with Checkbox instances.
- **File row** (NEW standalone, set 489:1280): State(Default/Hover/Processing/Error/Encrypted) = 5 variants, M only (40px). Anatomy: file-type badge (32×32, r4) + name/size (flex-1) + trailing actions. Default: Eye+Download+Trashcan (secondary). Hover: bg/surface/muted, icons primary. Processing: spinner (cloned from 453:553) + Close. Error: red sub-text + "Try again" (Refresh+link). Encrypted: Lock+Download, "Encrypted · …". File-type badge stand-ins tokenized: PDF=bg/error-subtle+text/error, DOC=bg/brand-subtle+text/link, IMG=bg/success-subtle+text/success, generic=Neutral. FLAG: badge stand-ins are placeholders — commission real file-type icon set as follow-up.
- **File Upload Field** (NEW standalone, set 493:1401): State(Empty/Empty-Disabled/Hover/Default/Processing/Encrypted/Error-single/Error-post-submit/Dragging) = 9 variants, M only. Anatomy: label + area (drop zone OR file list + "Upload more files" link) + helper. Empty/Hover: dashed drop zone, surface/muted bg, Upload icon 180:1224. Dragging: bg/brand-subtle + 2px dashed border/focused, "Drop files to upload". Filled states compose File row instances. Error-post-submit: 2px dashed border/error + helper "Attachment is required". Doc: File row showcase 498:5 + Upload Field 3×3 state grid 498:130, both in Forms doc frame 157:1257; footer re-dated 2026-06-16.
- **Dropdown Menu** (NEW, ported from DS 3.0 "new" 19752:7977): 4 components on Forms & Inputs page.
  - Menu Item (set 510:1825): 52 variants — State(Default/Hover/Focused/Selected/Disabled) × Size(M 36/Small 32) × Type(Default/Destructive) × Icon(bool) × Disclosure(bool). Pruning: Selected excludes Disclosure; Destructive excludes Selected. Pressed state dropped (v1). Icons 16px (documented exception). Destructive = color/text/error. Selected = bg/brand-subtle + text/link + Check icon (subtle "new" treatment). Disclosure chevron = Chevron-down 179:272 rotated +90°.
  - Menu Section (512:1668): 12px Caption uppercase, text/secondary, surface/subtle bar. Non-interactive meta-text — 12px exception to 14px min documented.
  - Menu Search (512:1670): bordered 36px row, Search 180:1637 + placeholder.
  - Dropdown Menu container (513:1669): radius 8, dropdown drop-shadow (blur 8, y+2, navy@10%), pad 8, composes search + sections + Menu Item instances.
  - Doc (Forms & Inputs 157:1257): Menu Item matrix 515:1698 + composed example 515:1761. Source components in 157:1256 (grew to 2256×7854).
  - v2 backlog: user-rows (avatar+name) + file-rows deferred; File row already exists separately (489:1280).
- **Read-only Field** (NEW standalone, set 520:1872, ported from DS 3.0 "Read only fields - UPDATED" 23561:54): 24 variants = Type(12) × State(Filled/Empty). Architecture: wrapper = label (Caption 12, text/secondary) + value (Body 14, text/primary); Type prop drives value rendering. Empty state = "—" in text/secondary.
  - Types: String · Description (multiline) · Number · Currency · Date · Email · Link · Phone · Boolean · Single Select · Multi-select · File.
  - Value treatments: Date uses Date icon 16 (180:2253); Email uses Envelope icon 16 (180:1527); Email/Link use color/text/link; Phone uses emoji flag; Boolean/Select/Multi reuse Badge 238:208 (Neutral/M); File = lightweight read-only (filename link + Eye 180:2119 + Download 180:1214, no trash/badge).
  - Doc (Forms & Inputs 157:1257): type catalog 523:1780 (2-col, all 12 types) + empty-state row 523:1844.
  - Source components in _Source Components 157:1256 (grew to 8754 tall).
  - v2 backlog: Time-Series chart, RAG (→ RAG/Visualization backlog), Roll-up, Address.
- Token reuse for new states: color/bg/brand-hover (107:3), color/border/focused (3:85), color/border/strong (3:84).
- Plugin gotchas hit: (1) variable-bound paint needs raw fallback set to RESOLVED color or it renders black. (2) resize() after primaryAxisSizingMode=AUTO re-locks to FIXED — set AUTO again after resize. (3) recolorSafe: IMAGE-fill icons flood to solid square if you replace their fill — only replace fills when every existing fill is SOLID. (4) Badge/Tag instances do NOT re-hug after text override — must set inner label textAutoResize='WIDTH_AND_HEIGHT' AND instance.layoutSizingHorizontal='HUG'.
- Clonable icon instances confirmed: Eye 180:2119 · Download 180:1214 · Trashcan 180:1131 · Lock 180:2099 · Refresh 180:1206 · Close 180:1200 · Upload 180:1224 · Search 180:1637 · Check 180:1264 · Edit 180:1053 · Chevron-down 179:272 · Date/Calendar 180:2253 · Envelope 180:1527 · Sort 180:945 · Filter 180:1633 · Chevron up 180:907 · Chevron down (Data&UI) 180:911 · Dots/kebab 180:1710 · User 180:1426 · User Circle 180:1504.
- Icon catalog structure: Icons page 180:872 → frame 180:873 → category sub-frames (Navigation, Actions, Data & UI, People & Users, …). Each icon = FRAME(name) > INSTANCE(clonable) + TEXT(label). Non-current pages need `await page.loadAsync()` before findAll.

### Table Row — 2026-06-16
- Conceptually a Data Display component, but per locked decision built INTO the Forms & Inputs source/doc frames (source 157:1256 below Read-only Field; doc 157:1257). Flagged for possible later move to Data Display page.
- 3 component sets, all 52px row / 40px header, fully tokenized (color + spacing tokens; radius 4px raw):
  - **Table Cell** (set 529:94): Type(Entity/Text/Status/Number/Date/Link/Actions) = 7 variants. Each 52px tall, padding 16H (xl), gap md(8). Entity = 32px avatar stand-in (circle, bg/brand-subtle, initials Body Bold text/link) + VERTICAL(name Body Bold 14 text/primary + meta Caption 12 text/secondary). Text = Body 14 text/primary. Status = Badge instance 238:136 (Color=Success, re-hugged label). Number = Body 14 right-aligned (primaryAxisAlignItems MAX + textAlign RIGHT), 120w. Date = Calendar icon 16 (180:2253 clone) + Body 14. Link = Body 14 text/link. Actions = Eye 180:2119 + Edit 180:1053 + Trashcan 180:1131 (16px clones, gap lg). Cell widths: Entity 240/Text 200/Status 140/Number 120/Date 160/Link 200/Actions 120.
  - **Table Row** (set 530:132): State(Default/Hover/Selected) = 3 variants. HORIZONTAL, hugs to 1180w (sum of 7 cell instances), 52px, bottom border 1px border/subtle (strokeBottomWeight). Default=bg/surface/default, Hover=bg/surface/muted, Selected=bg/brand-subtle. Composes one instance of each Table Cell type.
  - **Table Column Header** (set 530:3400): Sort(None/Ascending/Descending) × Filter(bool) = 6 variants. 40px, bg/surface/subtle, bottom border 1px border/default, padding 16H, gap sm(4). Label 10px uppercase Inter Medium text/secondary +0.5 ls, layoutGrow=1 (pushes icons right). Sort None = Sort icon 180:945 @opacity 0.4; Ascending = Chevron up 180:907; Descending = Chevron down 180:911; Filter true appends Filter icon 180:1633. All icons 16px.
- Doc (Forms & Inputs 157:1257, inserted before footer): "Table Row" section = divider + title + description, then 3 showcases — Row state showcase (531:6), Column header 6-variant showcase (531:228), Composed table 531:277 (7 width-matched header instances over Default/Hover/Selected body rows, r4 + border/subtle).
- FLAG: no Avatar component in library — Entity avatar is a tokenized stand-in (like file-type badges). Commission real Avatar set.
- FLAG: 10px header label below 12px meta-text floor (raw, no style) — see System decisions exception.

### Process Status — 2026-06-11
- 8 variants: New, In Progress, Completed, Review, Draft, Approved, Duplicate, Inactive
- Height 24px, radius 4px, padding 12px H / 4px V
- 6 status tokens provisional (no primitive match): in-progress/bg, review/bg, review/text, approved/bg, inactive/bg, inactive/text
- Page: Data Display

### Badge — 2026-06-11
- 48 variants: Size(S/M) × Type(Default/Filled) × Color(Neutral/Brand/Success/Warning/Danger/Info) × Icon(bool)
- Warning Filled: Orange/D1 (#8b5800) confirmed
- Page: Data Display

### Toast — rebuilt 2026-06-12 to match DS 3.0 spec
- 20 variants: Type(Default/Success/Warning/Error/Info) × Dismiss(bool) × Action(bool)
- Component set id=330:727, doc frame id=337:62 (x=500, y=0), Feedback & Overlay page
- Structure: 430px fixed width, HORIZONTAL layout, 16px padding/gap; icon circle 32×32 r=16 full circle, 16×16 icon inside (color/text/on-brand); content VERTICAL gap=4; title 14px Medium (primary); body 14px Regular (secondary); action "Undo" 14px Medium link; dismiss "×" 16px secondary
- Default type: no icon circle, color/bg/surface/default bg, color/border/subtle border
- Border-radius: 8px (DS 3.0 spec — CONFIRMED by design lead 2026-06-12)
- All fills/strokes/text bound via semantic tokens — zero hardcoded values
- FLAG (open): Error and Warning both use Warning triangle icon (180:1244) — no distinct Error/exclamation icon in library
- Previous DS 4.0 Toast (single-line, flat icons, no icon circle) deleted and replaced

### Alert Banner — rebuilt 2026-06-12 (DS 3.0 structure + DS 4.0 visual decisions)
- 32 variants: Type(Info/Success/Warning/Error) × Icon(bool) × Dismiss(bool) × Action(bool) = 4×2×2×2
- Component set id=360:761; doc frame id=364:97 (x=1556)
- DECISIONS (design lead, 2026-06-12): border kept as 4px LEFT accent; typography 14px; Error reuses Warning triangle
- Structure: 480px wide, HORIZONTAL gap=12, pad=12V/16H, radius 4px; strokeLeft=4 → color/border/{type}-subtle; bg → color/bg/{type}-subtle
- All colors bound to semantic tokens — zero hardcoded values
- FLAG: Error uses Warning triangle (no distinct exclamation/error-circle icon in DS 4.0 library)
- Previous 16-variant Alert Banner deleted and replaced

### Modal — 2026-06-17 (ported/unified from DS 3.0 "Dialog")
- Component set id=536:144 (6 variants = Size(S/L/M) × Type(Default/Destructive)); doc frame "Modal — Documentation" id=537:2 (Feedback & Overlay page 1:17, x=4800). Source set built in _Source Components 278:6 (x=40, y=2912).
- Sizes: S 400 / M 520 / L 640 (width); height HUG. Container: VERTICAL auto-layout, fill color/bg/surface/default, radius 8 (overlay exception), shadow-lg effect style, clipsContent.
- Anatomy: Header (HORIZONTAL, pad 24/24/16/24, title 18 Semi Bold text/primary layoutGrow=1 + close) · Body (VERTICAL, pad 0/24, gap md, body text Body 14 text/secondary, FILL width + wrap, clipsContent = scroll-on-overflow slot) · Footer (HORIZONTAL, pad 16/24/24/24, gap md, right-aligned MAX).
- Footer reuses DS 4.0 Button sets: Outline Button 113:447 (Cancel, M/Enabled 113:267) + Filled Button 113:230 (Save, M/Enabled 113:50). Type=Destructive swaps primary → Filled Destructive ("Delete"). All paddings/gaps bound to spacing tokens (3xl/xl/md).
- Close = Close glyph 180:1200 cloned at 20px in a 32×32 r4 transparent hit-area (icon-cloning pattern, consistent with Table/File row). DECISION: did NOT use Icon Button component — its glyph (12px S / 16px M) and component-swap mechanics were a poorer fit. Close glyph left at native color (like other cloned icons).
- NEW tokens created this build: color/bg/overlay = rgba(17,24,39,0.45) (VariableID 535:2, Semantic collection) for the scrim; shadow-lg effect style = 0 8px 24px rgba(0,22,78,0.15).
- Scrim is doc-composition only (not part of the component) — backdrop showcase = M modal centered on a color/bg/overlay rectangle over surface/muted.
- Doc sections: Sizes (S/M/L), Types (Default/Destructive), Backdrop & scrim, Specifications, Semantic tokens, DS 3.0 → DS 4.0 changes.
- DS 3.0 source unified: legacy fixed-layout Dialog 11481:10127 + auto-layout Dialog 27811:275 (both header+footer only, no body, 100% hardcoded hex, button height mismatch 32/36, title color navy vs black). All resolved.
- Plugin note (hit again): resize() after primaryAxisSizingMode=AUTO re-locks primary axis to FIXED — doc frame stayed 400px tall until AUTO re-asserted post-build. Body text needed textAutoResize=HEIGHT + layoutSizingHorizontal=FILL to wrap (defaulted to WIDTH and clipped).

### Nav bar — 2026-06-11
- 20 variants: State(Default/Hover/Active/Focused/Disabled) × Expanded(bool) × Badge(bool)
- Individual nav item (composable) — not full sidebar frame
- Icon size: 20px (production-confirmed)
- Typography: Body Bold 14px (upgraded from DS 3.0 12px)
- Page: Navigation
- 2026-06-12 (Fix round 3): icon = MENU/HAMBURGER (Icons page, main 180:1643). Per-state color bound to all fills; badge dots preserved.

## Session log — 2026-06-17 (Modal)
- Audited DS 3.0 "Dialog" page (no "Modal" page exists): two divergent components (fixed-layout 11481:10127 + auto-layout 27811:275), both header+footer only, hardcoded hex, button height mismatch, separate Dimmer 11480:10088 = #000e33@15%.
- Built DS 4.0 Modal set 536:144 (6 variants Size×Type) in Feedback&Overlay source 278:6; doc frame 537:2 at x=4800.
- Created first-in-file overlay token color/bg/overlay 535:2 (rgba(17,24,39,0.45)) + first effect style shadow-lg (0 8 24 navy@15%).
- Footer reuses Button sets (Outline 113:267 Cancel + Filled 113:50 Save; Destructive → Filled Destructive). Title 18 raw exception. Close = 20px glyph 180:1200 in 32px hit-area (not Icon Button).
- Gotchas hit: resize() re-locked AUTO height (re-assert AUTO after build); body text needed FILL+autoresize HEIGHT to wrap.

## Session log — 2026-06-16 (Multi-select + File Upload + Dropdown Menu + Read-only Field)
- **Multi-select**: field set 469:1283 (10 variants) + open dropdown 470:1047. Standalone, fixed single row NO_WRAP, Checkbox rows in dropdown.
- **File row**: set 489:1280 (5 variants, M only).
- **File Upload Field**: set 493:1401 (9 variants, M only). Native Upload icon 180:1224. Spinner from 453:553.
- **Dropdown Menu**: Menu Item 510:1825 (52 variants) + Menu Section 512:1668 + Menu Search 512:1670 + container 513:1669. Ported from DS 3.0 "new". 16px icon exception. Pressed dropped.
- **Read-only Field**: set 520:1872 (24 variants = 12 Type × Filled/Empty). Badge 238:208 reused for pills. Lightweight File treatment. 12px label exception.
- All doc showcases added to Forms & Inputs 157:1257. _Source Components 157:1256 grew to 8754 tall. Footer re-dated 2026-06-16.

## Session log — 2026-06-16 (Table Row)
- Built 3 sets in Forms source 157:1256 (below Read-only Field): Table Cell 529:94 (7 types), Table Row 530:132 (3 states), Table Column Header 530:3400 (6 = Sort×Filter). Doc section added to 157:1257 before footer (row-states 531:6, header-variants 531:228, composed table 531:277). Source frame extended to ~10028 tall.
- New cloneable icons logged: Sort 180:945, Filter 180:1633, Chevron up 180:907 / down 180:911, Dots 180:1710, User/User Circle.
- Decisions held to: 52px row, 40px header, Badge 238:208 for Status, avatar stand-in (no Avatar comp), raw 10px header label.
- Plugin notes: `use_figma` returns values via top-level `return` (console.log not captured); a thrown error rolls back ALL writes in that call (a `paddingbottom` typo wiped a full build — re-ran clean). Screenshot render backend lags fresh nodes by a beat (returns 1×1 until propagated). Sandbox cannot curl Figma asset URLs — use `enableBase64Response:true`.

## Session log — 2026-06-16 (Forms source-frame reflow + doc showcase)
- Reflowed _Source Components frame 157:1256: all sets restacked, 40px gaps. Frame resized 1892×5364.
- Doc frame 157:1257 completed: Checkbox/Radio 4-state showcases, Switch Loading, Input Small (32px) section, Filter chip section.

## Session log — 2026-06-15 (Forms & Inputs audit + rebuild)
- Full DS 3.0 vs DS 4.0 audit. Built: Checkbox, Radio, Input, Switch (Loading), Filter chip, Phone Input, Country dropdown, Masked field.
- Env note: GitHub MCP scoped to christiancalvino/certa_app only — certacalvino/certa-design-system is out of scope (user pushes CLAUDE.md manually).

## Session log — 2026-06-12 (Feedback/Nav/Buttons fixes)
- Toast + Alert Banner doc fixes; Nav icon → Menu/Hamburger; Toast icon instances replaced.
- Working note: `loadAllPagesAsync` unsupported — use `figma.root.children`. Throwing inside use_figma rolls back all changes.

## Open decisions — pending design lead
- FLAG (Nav icon): Menu/Hamburger confirmed. Confirm acceptable or specify per-item icons.
- FLAG (Toast/Alert icon): Error & Warning share Warning triangle — no distinct error-circle icon. Commission alert-circle.
- FLAG (Filter chip): diverges from DS 3.0 dark-pill — no dark-neutral bg token. Confirm light/brand model or commission tokens.
- FLAG (Phone input): emoji flag renders inconsistently cross-platform; dropdown shadow not tokenized; 6 sample countries only; static (no open/close wiring).
- FLAG (focus ring): Checkbox CENTER vs Radio OUTSIDE halo — standardize in polish pass.
- FLAG (Masked field): no eye-off icon — Eye used for both states. Commission eye-slash icon.
- FLAG (File Upload): file-type badges are tokenized stand-ins. Commission real file-type icon set.
- FLAG (Dropdown Menu): Pressed token not canonical in DS 4.0 — dropped for v1. Add in polish pass.
- FLAG (Table Row): Entity avatar is a tokenized stand-in — no Avatar component exists. Commission Avatar set. Also confirm 10px column-header label and whether Table Row should move to the Data Display page.
- FLAG (Modal): scrim is doc-composition only, not a component — wire scrim+open/close in patterns pass. Close glyph left at native color (no token bind). shadow-lg + color/bg/overlay are the first Figma effect-style / overlay token in the file; consider formalizing a full elevation scale.
- RESOLVED 2026-06-16: Multi-select, File Upload, Dropdown Menu, Read-only Field, Table Row (Cell/Row/Column Header) all built and verified.
- RESOLVED 2026-06-17: Modal (Dialog) ported & unified from DS 3.0 — 6 variants, tokenized, new overlay token + shadow-lg style.
- Forms backlog (DS 3.0 not yet ported): RAG/Visualization fields, Horizontal/Vertical toggle, Cascader, Slider.
- Nav bar full sidebar composition pending.
- 6 provisional status tokens pending primitives or confirmation.

## Pending components (from production audit)
High priority: Pagination, Date picker (Table rows — DONE 2026-06-16)
Medium priority: Tabs, Empty state, Dashboard widget (Modal — DONE 2026-06-17)
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-17)
- Color: ~95%
- Spacing: ~65%
- Typography: 100%
- Overall: ~87%
