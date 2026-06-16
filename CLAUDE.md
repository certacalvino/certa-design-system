# DS 4.0 — Build Memory

Last updated: 2026-06-16

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
- Token reuse for new states: color/bg/brand-hover (107:3), color/border/focused (3:85), color/border/strong (3:84).
- Plugin gotchas hit: (1) variable-bound paint needs raw fallback set to RESOLVED color or it renders black (bit the radio focus ring) — resolve alias chain then setBoundVariableForPaint on a paint with that rgb. (2) resize() after primaryAxisSizingMode=AUTO re-locks to FIXED (bit Filter chip width) — set AUTO again after resize.

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

## Session log — 2026-06-16 (Forms source-frame reflow + doc showcase)
- Reflowed _Source Components frame 157:1256: all 10 sets restacked top-to-bottom at x=40, 40px gaps, no overlaps (Input→Textarea→Select→Checkbox→Radio→Switch→Filter chip→Masked field→Country row→Country dropdown). Frame resized 1892×5364. Country row 440:450 + Country dropdown 441:437 moved inside.
- Doc frame 157:1257: Checkbox showcase (179:580) + Radio showcase (179:608) rebuilt to 4 labeled state cells each (Enabled/Hover/Focused/Disabled).

## Session log — 2026-06-15 (Forms & Inputs audit + rebuild)
- Full DS 3.0 vs DS 4.0 audit of Forms family. DS 3.0 form pages: Input (11426:7463), Checkbox (11455:8195), Radio (11477:10059), Switch (11646:8782), Form Components [NEW] (16406:15048), + standalone: Dropdown Menu, File Upload Field, Filter chip (27839:33637), Read-only fields, RAG fields, Horizontal/Vertical toggle, Cascader, Slider.
- Built 5: Checkbox, Radio, Input, Switch (Loading), Filter chip — all screenshot-verified, fully tokenized.
- Then: Phone Input full rebuild (country selector: flag+chevron+dial+clear) + Country dropdown panel (row set 440:450 + panel 441:437); added Phone as 7th row to Input doc showcase.
- Then: Masked field standalone component (set 453:800, 12 variants) + added Masked field section (6-state showcase) to doc frame 157:1257.
- Organization: moved Filter chip (430:487) + Masked field (453:800) sets INTO _Source Components frame 157:1256 (below Switch, y=3500/3772; frame extended to 1892×4044).
- Also: corrected color/text/disabled doc row on Color System page (Neutral/500/#D0D4DF → Neutral/600/#8892AC) to match live variable.
- Env note: network egress blocks www.figma.com → cannot curl screenshot URLs or push to out-of-scope repos; screenshots viewed via get_screenshot base64 inline. GitHub MCP scoped to christiancalvino/certa_app only — certacalvino/certa-design-system is out of scope (user pushes CLAUDE.md manually).

## Open decisions — pending design lead
- FLAG (Nav icon): now "Menu/Hamburger" icon (House→Sidebar→Menu progression). Reads clearly as navigation. Confirm acceptable, or specify per-item icons.
- FLAG (Toast icon): Error & Warning share the Warning triangle — no distinct Error/exclamation icon in library. Recommend commissioning an alert-circle icon.
- FLAG (Fix 1): Alert Banner doc frame is now auto-layout while Toast doc is still free-form/manually reflowed. Recommend standardising both doc frames to auto-layout for maintainability.
- FLAG (Fix 1): Alert Banner showcase displays only the Action+Dismiss=true variant per type (4 of 16). Confirm if additional states should be shown.
- FLAG (Filter chip): DS 4.0 build diverges from DS 3.0 dark-pill styling (Neutral/750 fill) — no dark-neutral bg semantic token exists. Built as light/brand-selected model instead. Confirm, or commission dark-neutral bg tokens for the literal port.
- FLAG (Phone input): now full country-selector build (flag+chevron+dial+clear) + Country dropdown panel. Caveats: (a) flag = OS emoji (🇺🇸) — renders inconsistently across Win/Mac/Linux; (b) dropdown shadow is a raw DROP_SHADOW (no shadow effect-style/variable exists in file — not tokenized); (c) country/dial data is illustrative (6 sample countries), not a full dataset; (d) dropdown is static (no interactive open/close wiring).
- FLAG (focus ring): Checkbox focus = 2px border/focused CENTER; Radio focus = OUTSIDE halo. Standardize focus-ring treatment across all controls in a polish pass.
- FLAG (Masked field): no eye-off icon in library — Eye (180:2119) used for both show & hide (state differentiates). Recommend commissioning an eye-off/eye-slash icon. Also overlaps the simple Password input type — Masked = async-reveal sensitive values, Password = static dots; keep both or consolidate (design lead).
- FLAG (Forms doc showcase): Phone row, Masked field section, and Checkbox/Radio 4-state showcases now added to doc 157:1257. Still pending: showcase rows for Switch Loading state, Input Small size, and a Filter chip section.
- RESOLVED 2026-06-16 (Input set overlap): source frame 157:1256 reflowed — all sets stacked with 40px gaps, no overlaps.
- RESOLVED 2026-06-16 (Phone country components): Country row 440:450 + Country dropdown 441:437 moved into _Source Components frame.
- Forms backlog (DS 3.0 not yet ported): Multi-select, Dropdown Menu, File Upload Field, Read-only fields, RAG/Visualization fields, Horizontal/Vertical toggle, Cascader, Slider.
- Nav bar full sidebar composition: individual items need to be composed into a full sidebar component
- 6 provisional status tokens: need primitives or confirmation
- Process Status interactive states: needed if chips are clickable
- Spacing token gaps: Button S/M some values rounded to nearest token

## Pending components (from production audit)
High priority: Table rows, Pagination, Date picker, File upload
Medium priority: Modal, Tabs, Empty state, Dashboard widget
Post-presentation: Full sidebar composition, Motion specs, Theming

## Tokenization state (as of 2026-06-16)
- Color: ~95%
- Spacing: ~65%
- Typography: 100%
- Overall: ~85%
