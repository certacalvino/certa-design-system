# Certa Design System 4.0 — Catalyst Bundle (WIP)

A self-contained reference bundle for **Certa DS 4.0**. It ships the semantic
token layer, the React UI-kit primitives + app screens, and 34 standalone
component previews — everything an engineer or designer needs to consume the
system without a Figma seat.

> Last synced: **2026-06-17**. Token decisions are sourced from
> [`CLAUDE.md`](../CLAUDE.md) ("System decisions (locked)") in
> [certacalvino/certa-design-system](https://github.com/certacalvino/certa-design-system).

---

## What changed from DS 3.0 → 4.0

| Area | DS 3.0 | DS 4.0 |
| --- | --- | --- |
| Brand | mixed blues | **`#1B4FD8`** (single source) |
| Neutrals | cool gray | **slate** (text `#1F2937`) |
| Warning | `#F59E0B` (fails AA) | **`#D97706`** (AA on white) |
| Danger | `#EF4444` | **`#DC2626`** (AA) |
| Success | `#22C55E` | **`#16A34A`** (AA) |
| Sidebar | dark | **light `#F7F8FA`** (production-confirmed) |
| Radius | 6–8px ad hoc | **4px default**, 8px overlays only |
| Icons | 16px | **20px** (16px in menu/table/read-only/header) |
| Type floor | 12px labels | **14px** interactive floor |
| Tokenization | partial | **zero hardcoded values** in components |

The status palette is now WCAG-AA compliant against white, and the brand,
neutral, and status ramps all resolve through a single semantic layer.

---

## Structure

```
catalyst-ds-4.0/
├── colors_and_type.css         # primitives → semantic tokens → type/space/effects
├── README.md                   # this file
├── build_previews.py           # regenerates preview/*.html from token data
├── ui_kits/certa-studio/
│   ├── Primitives.jsx          # Button, Icon, Badge, ProcessStatus, Field, Input,
│   │                           #   CheckboxPill, Card, SectionHeader, EmptyState, ProgressSteps
│   ├── AppShell.jsx            # light sidebar + topbar + nav active-state pattern
│   ├── VendorsList.jsx         # data table: status mapping, hover row actions, empty state
│   ├── HomeDashboard.jsx       # stat widgets + attention queue + activity feed
│   └── VendorDetail.jsx        # tabs + multi-step progress + form sections + cert pills + upload
└── preview/                    # 34 standalone HTML previews (open any in a browser)
    ├── 01-tokens.html               18-table-row.html
    ├── 02-buttons.html              19-table-column-header.html
    ├── 03-icon-buttons.html         20-table.html
    ├── 04-checkbox.html             21-process-status.html
    ├── 05-radio.html                22-badge.html
    ├── 06-switch.html               23-toast.html
    ├── 07-input.html                24-alert-banner.html
    ├── 08-masked-field.html         25-nav-bar.html
    ├── 09-phone-input.html          26-modal.html
    ├── 10-multi-select.html         27-tabs.html
    ├── 11-country-dropdown.html     28-pagination.html
    ├── 12-filter-chip.html          29-empty-state.html
    ├── 13-dropdown-menu.html        30-date-picker.html
    ├── 14-read-only-field.html      31-avatar.html
    ├── 15-file-row.html             32-progress-steps.html
    ├── 16-file-upload.html          33-form-section.html
    └── 17-table-cell.html           34-certifications.html
```

Every preview links `../colors_and_type.css`, so swatches render with the real
tokens. Regenerate them with `python3 build_previews.py`.

---

## UI Patterns

Composition rules that aren't captured by any single component. These are the
decisions that keep Certa screens consistent — follow them when assembling
pages from the primitives.

### 1. Section headers use `text/primary`, never `text/link`
A section header (`SectionHeader`, `<h2 class="t-title-s">`) is a label, not a
navigation target. Render it in `--color-text-primary` at Title Small (16/600).
Reserve `--color-text-link` (`#1B4FD8`) for things that are actually clickable.
A blue heading reads as a broken link.

### 2. Required field asterisk in `text/error`
Mark required fields with a trailing `*` in `--color-text-error` (`#DC2626`),
2px after the label text. Never color the whole label red — only the asterisk
carries the signal. Optional fields get a quiet `placeholder="Optional"` or a
caption, not a "(optional)" suffix on the label.

### 3. Multi-step progress indicator
For onboarding / wizard flows use `ProgressSteps`. Three step states:
- **done** — success fill (`#16A34A`) + `✓`
- **active** — brand fill (`#1B4FD8`) + number, label bold `text/primary`
- **todo** — `bg/muted` + number, label `text/secondary`

Connector lines are 1px `border/default`. Keep the step row above tabs/content
so the user always knows where they are in the flow.

### 4. Form section layout
Group related fields inside a `Card` under one `SectionHeader`. Stack fields
vertically with `--space-lg` (12px) between them; label → control gap is
`--space-sm` (4px). Two-column grids only for short, paired fields
(e.g. City / State). Help text sits below the control as 12px caption; an error
message replaces the help text (don't show both).

### 5. Certifications as checkbox pills vs dropdown
When the option set is **small and finite** (≈3–8 items, e.g. certifications)
render them as `CheckboxPill`s — all options visible, single tap to toggle,
selected state = brand-subtle fill + check. When the list is **long or
open-ended**, use the Multi-select dropdown with tag chips instead. The
deciding factor is scannability, not data type.

### 6. File upload with file row
The upload field is a dashed dropzone ("Drag files here or **browse**", with
accepted types + size limit as caption). On upload, each file renders as a
**File Row**: file-type badge + name + meta (size · time) + download + remove.
Don't stack raw filenames as plain text — always promote to File Rows.

### 7. Status badge color mapping
Status → color is fixed and lives in `STATUS_COLOR` (`Primitives.jsx`). Never
pick a status color ad hoc.

| Status | Color |
| --- | --- |
| Approved · Active · Completed | success (green) |
| In Review · In Progress | info (brand) |
| Draft · Archived | neutral (slate) |
| Expiring · Action Needed | warning (amber) |
| Rejected · Expired | danger (red) |

Only Certa's status vocabulary is valid. Do **not** invent states like
"Blocked" or "Pending" — DS 3.0 generated those; 4.0 does not.

### 8. Table row actions on hover
Row-level actions (edit, more) are hidden by default and revealed on row hover
(`visibility: hidden → visible`), right-aligned in the last cell. The row also
shifts to `surface/hover` on hover. This keeps dense tables scannable while
actions stay one motion away. Action icons are 16px (table exception). Never
show a full button column at rest.

### 9. Empty state structure
Every empty collection gets: centered icon (≈40px, 60% opacity) → Title Small →
supporting body (`text/secondary`, max ~360px) → single primary action. The
action is the same one the user would reach for in the populated view (e.g.
"New vendor"), so the empty state teaches the next step.

### 10. Nav active state
The active sidebar item gets three coordinated signals: `bg/brand-subtle` fill,
label in `text/link` **bold**, and a 2px brand indicator pinned to the left
edge (inset 8px top/bottom, pill-rounded). Inactive items are `text/secondary`
medium with no fill. Only one item is active at a time; hover on inactive items
uses `surface/hover`.

---

## Consuming the tokens

```jsx
import { Button, ProcessStatus } from "./ui_kits/certa-studio/Primitives.jsx";

<Button variant="filled">Save</Button>
<ProcessStatus status="Expiring" />   // auto-maps to warning per pattern #7
```

In plain CSS/HTML, reference the semantic variables directly — never the
primitives:

```css
.cta { background: var(--color-action-primary); border-radius: var(--radius-sm); }
```

---

## Known flags (pending design-lead sign-off)

Carried over from `CLAUDE.md` "Open decisions":

- **Avatar** — stand-in only; commission a real set.
- **Table column header** — 10px label is below the 12px floor (confirmed exception).
- **Error + Warning icon** — Toast/Alert share the warning triangle; commission an alert-circle.
- **Masked field** — no eye-slash icon yet.
- **File-type icons** — File Row uses badge stand-ins (PDF/DOC/XLS).
- **Focus ring** — Checkbox (center) vs Radio (outside) not yet standardized.
- **Elevation** — `shadow-lg` + `bg/overlay` are the first effect/overlay tokens; formalize a full elevation scale later.
