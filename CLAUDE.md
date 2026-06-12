# DS 4.0 — Build Memory

Last updated: 2026-06-12

## System decisions (locked)
- Border-radius: 4px across all components
- Icon size: 20px (production-confirmed, overrides 16px spec)
- Typography scale: 14px minimum for component labels (accessibility)
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

### Forms & Inputs — 2026-06-10
- 6 components: Input, Textarea, Select, Checkbox, Radio, Switch
- Border-radius: 4px confirmed
- All states: Default, Focused, Filled, Error, Disabled
- Page: Forms & Inputs

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
- Token mapping: bg→color/bg/{type}-subtle, border→color/border/{type}-subtle, icon circle bg→color/text/{type}, icon fill→color/text/on-brand
- 2026-06-12 (Fix round 3): all 16 non-Default variants confirmed to have 32×32 icon circle; all variants & doc-showcase instances confirmed 430px; body text UPGRADED 12px Medium → 14px Regular/20px (resolves accessibility flag; doc spec + component now match); variants reflowed.
- FLAG (open): Error and Warning both use Warning triangle icon (180:1244) — no distinct Error/exclamation icon in library
- Previous DS 4.0 Toast (single-line, flat icons, no icon circle) deleted and replaced

### Alert Banner — rebuilt 2026-06-12 (DS 3.0 structure + DS 4.0 visual decisions)
- 32 variants: Type(Info/Success/Warning/Error) × Icon(bool) × Dismiss(bool) × Action(bool) = 4×2×2×2
- Component set id=360:761 (4-col×8-row grid in Source Components 278:6); doc frame id=364:97 (x=1556)
- Rebuilt to match DS 3.0 STRUCTURE: inline banner = icon + message + optional "Learn more" link + optional × close
- DECISIONS (design lead, 2026-06-12): border kept as 4px LEFT accent (NOT DS 3.0 full border); typography 14px (NOT DS 3.0 12px); Error reuses Warning triangle
- Structure: 480px wide, HORIZONTAL gap=12, pad=12V/16H, radius 4px; strokeLeft=4 → color/border/{type}-subtle; bg → color/bg/{type}-subtle; message 14px Regular + action "Learn more" 14px Medium underline + close "×" 16px Medium — all color/text/{type}
- Icon BOOLEAN added: Icon=true shows 16×16 type icon (Check 180:1264 / Warning 180:1244 / Info 180:1250), color/text/{type}; Icon=false = text only
- Grey type dropped (use Default Toast); DS 3.0 Link/Hover/Focus states collapsed into Action boolean
- All colors bound to semantic tokens — zero hardcoded values
- FLAG: Error uses Warning triangle (no distinct exclamation/error-circle icon in DS 4.0 library) — same gap as Toast
- Previous 16-variant Alert Banner (filled-dot icons) deleted and replaced

### Nav bar — 2026-06-11
- 20 variants: State(Default/Hover/Active/Focused/Disabled) × Expanded(bool) × Badge(bool)
- Individual nav item (composable) — not full sidebar frame
- Icon size: 20px (production-confirmed)
- Typography: Body Bold 14px (upgraded from DS 3.0 12px)
- Page: Navigation
- 2026-06-12: icon-placeholder replaced in all 20 variants with "House" icon (Icons page, component 180:2435) at 20×20. Per-state icon color VARIABLE bindings preserved (color/text/secondary for Default/Hover/Focused, color/text/on-brand for Active, color/text/disabled for Disabled) — no hardcoded colours
- 2026-06-12 (Fix round 2):
  - Icon swapped House→Sidebar OUTLINE icon (Icons page, main 180:1749) — House was too heavy/filled. 20×20, per-state color bound to BOTH the rectangle stroke and inner fill (rect-based icon, not vector).
  - Badge dots (8px, color/text/error) re-added to all 10 Badge=true variants — they had lived inside the icon frame and were removed during the icon swap; restored as `badge-dot` ellipse top-right (x=13,y=-1), icon frame clipsContent=false.
- 2026-06-12 (Fix round 3): icon swapped Sidebar→MENU/HAMBURGER icon (Icons page, main 180:1643) across all 20 variants — Sidebar read as a rectangle/window, not "navigation". Menu = 3 horizontal lines (Union of 3 rects, fill-based), reads unambiguously as menu. Per-state color bound to all fills; badge dots preserved (only the INSTANCE removed during swap, not badge-dot).
  - Doc frame (283:70) overlap fixed: long body text nodes (283:106, 283:108) had fixed 24px height → set textAutoResize=HEIGHT on all text; frame primaryAxisSizingMode=AUTO, itemSpacing=16. Specifications / DS 3.0→4.0 Changes now stack cleanly.
  - Source Components (282:83) reorganized from single vertical column → 4×5 grid (cols: Exp/Badge-, Exp/Badge+, Col/Badge-, Col/Badge+; rows: Default/Hover/Active/Focused/Disabled). layoutMode=NONE + manual placement; collapsed variants now align under expanded counterparts, all 20 visible & separated. Parent frame hugs both axes.

## Session log — 2026-06-12 (Feedback/Nav/Buttons fixes)
- Fix 1 (Feedback & Overlay): removed text overlap in Toast + Alert Banner doc frames; added missing Alert Banner variant showcase above its token table; set 96px gap between the two doc frames (Toast left, Alert right). Source-components frame untouched.
- Fix 2 (Navigation): replaced grey/red icon placeholders with real House icon in all 20 Nav bar variants; per-state colour tokens preserved.
- Fix 3 (Buttons & Actions): footer "Last updated" date 2026-06-09 → 2026-06-11.
- Fix 4 (Toast icons): replaced icon-placeholder ellipses in all 16 non-Default Toast variants with real icon instances; color variable bound via setBoundVariableForPaint on VECTOR children — no hardcoded colours.
- Working note: in this MCP/plugin environment, `loadAllPagesAsync` is unsupported but `figma.root.children` exposes pages directly; `page.findAll` requires the page to be current/loaded (`setCurrentPageAsync`) within each call.
- Working note: throwing inside use_figma rolls back all changes (use for read-only queries only); persistent edits must complete without throwing.

## Open decisions — pending design lead
- FLAG (Nav icon): now "Menu/Hamburger" icon (House→Sidebar→Menu progression). Reads clearly as navigation. Confirm acceptable, or specify per-item icons.
- FLAG (Toast icon): Error & Warning share the Warning triangle — no distinct Error/exclamation icon in library. Recommend commissioning an alert-circle icon.
- FLAG (Fix 1): Alert Banner doc frame is now auto-layout while Toast doc is still free-form/manually reflowed. Recommend standardising both doc frames to auto-layout for maintainability.
- FLAG (Fix 1): Alert Banner showcase displays only the Action+Dismiss=true variant per type (4 of 16). Confirm if additional states should be shown.
- Nav bar full sidebar composition: individual items need to be composed into a full sidebar component
- 6 provisional status tokens: need primitives or confirmation
- Process Status interactive states: needed if chips are clickable
- Spacing token gaps: Button S/M some values rounded to nearest token

## Pending components (from production audit)
High priority: Table rows, Pagination, Date picker, File upload
Medium priority: Modal, Tabs, Empty state, Dashboard widget
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-12)
- Color: ~95%
- Spacing: ~65%
- Typography: 100%
- Overall: ~85%
