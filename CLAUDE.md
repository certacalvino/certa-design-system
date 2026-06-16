# DS 4.0 — Build Memory

Last updated: 2026-06-16

## System decisions (locked)
- Border-radius: 4px across all components
- Icon size: 20px (production-confirmed, overrides 16px spec)
- EXCEPTION: menu-row icons 16px (contextual menus, not nav/buttons)
- EXCEPTION: read-only field value icons 16px (display context)
- EXCEPTION: table cell icons 16px (Actions cell, Date cell)
- EXCEPTION: column header icons 16px (sort/filter)
- EXCEPTION: column header label 10px uppercase (table-header meta, below 12px floor — raw value, no style)
- Typography scale: 14px minimum for component labels (accessibility)
- EXCEPTION: Menu Section headers + Read-only Field labels + table meta-text use 12px Caption (non-interactive)
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

### Forms & Inputs — rebuilt 2026-06-15 (DS 3.0 audit-driven)
- Page: Forms & Inputs. Source components: _Source Components frame 157:1256. Doc: 157:1257 (VERTICAL auto-layout, itemSpacing 40).
- **Checkbox** (set 179:420): State(Enabled/Hover/Focused/Disabled) × Status(Unchecked/Checked/Indeterminate) = 12 variants.
- **Radio** (set 179:435): State(Enabled/Hover/Focused/Disabled) × Selected(False/True) = 8 variants.
- **Input** (set 157:1255): 7 Type × 5 State × 2 Size (M 40px / Small 32px) = 70 variants.
- **Switch** (set 179:452): 5 states including Loading (spinner arc 270°).
- **Filter chip** (set 430:487): State × Icon × Badge = 16 variants. Pill 32px r=16.
- **Phone Input** (10 variants in 157:1255): country-selector (flag+chevron+dial+clear). Heights M 40 / Small 32.
- **Country dropdown**: Country row set 440:450 (Default/Hover/Selected) + panel 441:437 (280w, r8, DROP_SHADOW, 6 sample countries).
- **Masked field** (set 453:800): State(Masked/Loading/Revealed/Focused/Error/Disabled) × Size(M/Small) = 12 variants. Lock leading + eye trailing + spinner.
- **Multi-select** (set 469:1283): State(Default/Focused/Filled/Error/Disabled) × Size(M/Small) = 10 variants. Open dropdown standalone 470:1047. Tag chip 24px r2 brand-subtle. Fixed single row NO_WRAP.
- **File row** (set 489:1280): State(Default/Hover/Processing/Error/Encrypted) = 5 variants, M only. File-type badge stand-ins (PDF=Danger, DOC=Brand, IMG=Success, Neutral=generic). FLAG: commission real file-type icons.
- **File Upload Field** (set 493:1401): 9 states, M only. Upload icon 180:1224. Spinner from 453:553. Dragging=brand-subtle+dashed border/focused.
- **Dropdown Menu** (ported from DS 3.0 "new" 19752:7977):
  - Menu Item (set 510:1825): 52 variants — State(Default/Hover/Focused/Selected/Disabled) × Size(M 36/Small 32) × Type(Default/Destructive) × Icon × Disclosure. Pressed dropped.
  - Menu Section (512:1668): 12px Caption uppercase, text/secondary.
  - Menu Search (512:1670): 36px, Search 180:1637.
  - Dropdown Menu container (513:1669): r8, dropdown shadow, composes search+sections+items.
- **Read-only Field** (set 520:1872): Type(12) × State(Filled/Empty) = 24 variants. Label 12px Caption. Value Body 14px. Types: String/Description/Number/Currency/Date/Email/Link/Phone/Boolean/Single Select/Multi-select/File. Reuses Badge 238:208 for pills. File = lightweight (link+Eye+Download, no trash).
- **Table Cell** (set 529:94): Type(Entity/Text/Status/Number/Date/Link/Actions) = 7 variants, 52px. Entity = avatar stand-in 32px + name Body Bold 14 + meta Caption 12. Status reuses Badge 238:136. Number right-aligned. Date = Calendar 180:2253 + text. Actions = Eye+Edit+Trashcan 16px.
- **Table Row** (set 530:132): State(Default/Hover/Selected) = 3 variants, 52px. Default=surface/default, Hover=surface/muted, Selected=brand-subtle. Bottom divider border/subtle. Composes all 7 cell types.
- **Table Column Header** (set 530:3400): Sort(None/Asc/Desc) × Filter(bool) = 6 variants, 40px. Label 10px uppercase (raw, no style). Sort icon 180:945, Filter 180:1633, Chevrons 180:907/911. 16px icons.
- Plugin gotchas: (1) variable-bound paint needs resolved raw fallback or renders black. (2) resize() after AUTO re-locks to FIXED — set AUTO again. (3) recolorSafe: IMAGE-fill icons flood to solid on fill replace. (4) Badge instances don't re-hug after text override — set inner label WIDTH_AND_HEIGHT + instance HUG. (5) throwing inside use_figma rolls back all changes. (6) screenshot backend lags freshly-created nodes (returns 1×1 until propagated).
- Clonable icons: Eye 180:2119 · Download 180:1214 · Trashcan 180:1131 · Lock 180:2099 · Refresh 180:1206 · Close 180:1200 · Upload 180:1224 · Search 180:1637 · Check 180:1264 · Edit 180:1053 · Chevron-down 179:272 · Calendar 180:2253 · Envelope 180:1527 · Sort 180:945 · Filter 180:1633 · Chevron-up 180:907 · Dots/Kebab 180:1710.

### Process Status — 2026-06-11
- 8 variants: New/In Progress/Completed/Review/Draft/Approved/Duplicate/Inactive
- Height 24px, r4, padding 12px H / 4px V. 6 provisional status tokens.
- Page: Data Display

### Badge — 2026-06-11
- 48 variants: Size(S/M) × Type(Default/Filled) × Color(Neutral/Brand/Success/Warning/Danger/Info) × Icon(bool)
- Page: Data Display

### Toast — rebuilt 2026-06-12
- 20 variants: Type(Default/Success/Warning/Error/Info) × Dismiss × Action. Set 330:727, doc 337:62.
- 430px fixed, r8, icon circle 32×32, body 14px Regular. All semantic tokens.
- FLAG: Error+Warning share Warning triangle — no alert-circle icon.

### Alert Banner — rebuilt 2026-06-12
- 32 variants: Type(Info/Success/Warning/Error) × Icon × Dismiss × Action. Set 360:761, doc 364:97.
- 480px, r4, 4px LEFT border accent, 14px typography. All semantic tokens.
- FLAG: Error uses Warning triangle.

### Nav bar — 2026-06-11
- 20 variants: State(Default/Hover/Active/Focused/Disabled) × Expanded × Badge. Page: Navigation.
- Icon 20px (Menu/Hamburger 180:1643). Body Bold 14px. Badge dot 8px error.

## Session log — 2026-06-16 (full day)
- Multi-select, File Upload (File row + Field), Dropdown Menu, Read-only Field, Table Row (Cell+Row+Header) all built and screenshot-verified.
- Doc showcases added to Forms & Inputs 157:1257 for all components. Footer re-dated 2026-06-16.
- _Source Components 157:1256 grew to 10028+ tall.
- Table Row branch (claude/dreamy-cray-2pdrwa) merged to main.
- Avatar: no Avatar component exists — Table Entity cell uses tokenized stand-in (brand-subtle circle + initials). FLAG: commission Avatar component set.

## Session log — 2026-06-16 (Forms source-frame reflow)
- _Source Components 157:1256 reflowed: all sets stacked 40px gaps. Frame resized 1892×5364.
- Doc 157:1257: Checkbox/Radio 4-state showcases rebuilt, Switch Loading appended, Input Small section added, Filter chip section added.

## Session log — 2026-06-15 (Forms audit + rebuild)
- Full DS 3.0 audit. Built: Checkbox, Radio, Input, Switch, Filter chip, Phone, Country dropdown, Masked field.
- Env: GitHub MCP scoped to christiancalvino/certa_app only. User pushes CLAUDE.md manually to certacalvino/certa-design-system.

## Session log — 2026-06-12 (Feedback/Nav/Buttons fixes)
- Toast + Alert Banner doc fixes. Nav icon → Menu/Hamburger. Toast icon instances replaced.
- Working note: `loadAllPagesAsync` unsupported — use `figma.root.children` + `page.loadAsync()`.

## Open decisions — pending design lead
- FLAG (Avatar): no component — stand-in in Table Entity cell. Commission Avatar set.
- FLAG (Table column header label): 10px raw value — below 12px meta-text floor. Confirm or align to 12px.
- FLAG (Table placement): currently in Forms & Inputs source/doc frames. Candidate to move to Data Display page later.
- FLAG (Nav icon): Menu/Hamburger confirmed. Specify per-item icons when ready.
- FLAG (Toast/Alert): Error+Warning share Warning triangle. Commission alert-circle icon.
- FLAG (Filter chip): light/brand model (no dark-neutral bg token). Confirm or commission tokens.
- FLAG (Phone): emoji flag cross-platform inconsistency; dropdown shadow not tokenized; 6 sample countries only.
- FLAG (focus ring): Checkbox CENTER vs Radio OUTSIDE — standardize in polish pass.
- FLAG (Masked field): no eye-off icon. Commission eye-slash icon.
- FLAG (File Upload): file-type badge stand-ins. Commission real file-type icon set.
- FLAG (Dropdown Menu): Pressed token not canonical. Add in polish pass.
- RESOLVED 2026-06-16: Multi-select, File Upload, Dropdown Menu, Read-only Field, Table Row all complete.
- Forms backlog remaining: RAG/Visualization fields, Toggle H/V, Cascader, Slider.

## Pending components
High priority: Pagination, Date picker, Modal
Medium priority: Tabs, Empty state, Dashboard widget
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-16)
- Color: ~95%
- Spacing: ~65%
- Typography: 100%
- Overall: ~87%
