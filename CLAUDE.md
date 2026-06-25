# DS 4.0 — Build Memory

Last updated: 2026-06-24

## Naming
- Design system: **Certa Platform DS 4.0** (not "Certa Studio" — Studio is a separate product)
- Catalyst bundle: catalyst-ds-4.0/ in certacalvino/certa-design-system
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
