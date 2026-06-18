# ReadOnlyField — Certa DS 4.0

**Figma:** set `520:1872` · **Page:** Forms & Inputs · **Variants:** Type(12) × State(Filled/Empty) = 24

## Intent
Displays a stored value in a record/detail view. Not an input — there is no
border, focus, or editing affordance. Pairs with editable `Field`/`Input` on
the same form when toggling between view and edit modes.

## Anatomy
```
Label            ← 12px Caption, text/secondary
[16px icon] Value ← Body 14, text/primary (medium)
```
- Vertical stack, gap `var(--space-xs)` (2px) between label and value.
- Optional leading **16px** value icon (display-context exception to the 20px default).

## Tokens
| Part | Token |
| --- | --- |
| label | `--font-caption-size` / `--color-text-secondary` |
| value (filled) | `--font-body-size` / `--color-text-primary` |
| value (empty) | `--color-text-disabled` |

## States
- **Filled** — shows `value` (+ optional icon).
- **Empty** — shows `emptyText` (default `—`) in `text/disabled`; the icon is hidden.

## Props
- `label?: string`
- `value?: ReactNode` — null/`""` → empty state.
- `icon?: ReactNode` — 16px, only shown when filled.
- `emptyText?: string` — default `"—"`.

## Usage
```jsx
<ReadOnlyField label="Vendor ID" value="VND-00842" />
<ReadOnlyField label="Owner" value="A. Singh" icon="👤" />
<ReadOnlyField label="Tax ID" />            {/* empty → "—" */}
```

## Rationale
The 12px Caption label is a deliberate exception to the 14px floor: it is
non-interactive metadata, consistent with Menu Section headers and table meta-text.
