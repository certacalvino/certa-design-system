# DS 4.0 — Build Memory

Last updated: 2026-06-16

## System decisions (locked)
- Border-radius: 4px across all components
- Icon size: 20px (production-confirmed, overrides 16px spec)
- EXCEPTION: menu-row icons are 16px — deliberate exception for contextual menus (not nav/buttons)
- EXCEPTION: read-only field value icons (Date, Envelope) are 16px — display context, not interactive
- Typography scale: 14px minimum for component labels (accessibility)
- EXCEPTION: Menu Section headers + Read-only Field labels (non-interactive meta-text) use 12px Caption uppercase
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
- Clonable icon instances confirmed: Eye 180:2119 · Download 180:1214 · Trashcan 180:1131 · Lock 180:2099 · Refresh 180:1206 · Close 180:1200 · Upload 180:1224 · Search 180:1637 · Check 180:1264 · Edit 180:1053 · Chevron-down 179:272 · Date/Calendar 180:2253 · Envelope 180:1527.

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

### Nav bar — 2026-06-11
- 20 variants: State(Default/Hover/Active/Focused/Disabled) × Expanded(bool) × Badge(bool)
- Individual nav item (composable) — not full sidebar frame
- Icon size: 20px (production-confirmed)
- Typography: Body Bold 14px (upgraded from DS 3.0 12px)
- Page: Navigation
- 2026-06-12 (Fix round 3): icon = MENU/HAMBURGER (Icons page, main 180:1643). Per-state color bound to all fills; badge dots preserved.

## Session log — 2026-06-16 (Multi-select + File Upload + Dropdown Menu + Read-only Field)
- **Multi-select**: field set 469:1283 (10 variants) + open dropdown 470:1047. Standalone, fixed single row NO_WRAP, Checkbox rows in dropdown.
- **File row**: set 489:1280 (5 variants, M only).
- **File Upload Field**: set 493:1401 (9 variants, M only). Native Upload icon 180:1224. Spinner from 453:553.
- **Dropdown Menu**: Menu Item 510:1825 (52 variants) + Menu Section 512:1668 + Menu Search 512:1670 + container 513:1669. Ported from DS 3.0 "new". 16px icon exception. Pressed dropped.
- **Read-only Field**: set 520:1872 (24 variants = 12 Type × Filled/Empty). Badge 238:208 reused for pills. Lightweight File treatment. 12px label exception.
- All doc showcases added to Forms & Inputs 157:1257. _Source Components 157:1256 grew to 8754 tall. Footer re-dated 2026-06-16.

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
- RESOLVED 2026-06-16: Multi-select, File Upload, Dropdown Menu, Read-only Field all built and verified.
- Forms backlog (DS 3.0 not yet ported): RAG/Visualization fields, Horizontal/Vertical toggle, Cascader, Slider.
- Nav bar full sidebar composition pending.
- 6 provisional status tokens pending primitives or confirmation.

## Pending components (from production audit)
High priority: Table rows, Pagination, Date picker
Medium priority: Modal, Tabs, Empty state, Dashboard widget
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-16)
- Color: ~95%
- Spacing: ~65%
- Typography: 100%
- Overall: ~87%
