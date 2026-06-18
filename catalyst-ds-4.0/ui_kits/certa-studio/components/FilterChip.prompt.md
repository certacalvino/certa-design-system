# FilterChip — Certa DS 4.0

**Figma:** set `430:487` · **Page:** Forms & Inputs · **Variants:** State × Icon × Badge = 16

## Intent
A toggleable filter pill for narrowing a list/table. Light/brand model: unselected
chips read as quiet outlines; the selected chip fills with brand-subtle.

## Anatomy
`[ optional 16px icon ][ label ][ optional count badge ]` inside a pill.

- Height **32px** (`--control-height-s`), radius **r-full** (`--radius-full`).
- Padding `0 var(--space-lg)`; internal gap `var(--space-md)`.
- 1px border.

## Tokens (no hardcoded values)
| Part | Unselected | Selected |
| --- | --- | --- |
| background | `--color-bg-page` | `--color-bg-brand-subtle` |
| label color | `--color-text-secondary` | `--color-text-link` |
| border | `--color-border-default` | `--color-border-focused` |
| count badge bg | `--color-bg-muted` | `--color-bg-page` |
| count badge fg | `--color-text-secondary` | `--color-text-link` |

- Disabled: `opacity: 0.4`, `cursor: not-allowed`.
- Label is **Body 14 / Medium** (≥14px interactive floor).

## Props
- `selected?: boolean` — toggled (active) state.
- `disabled?: boolean`
- `icon?: ReactNode` — rendered in a 16px box.
- `count?: number` — trailing badge (e.g. result count).
- `onClick?: () => void`
- `children` — the label.

## Usage
```jsx
<FilterChip selected>All</FilterChip>
<FilterChip icon="✓">Approved</FilterChip>
<FilterChip count={7}>Expiring</FilterChip>
```

## A11y
- Renders a `<button aria-pressed>`; the selected state is conveyed via both
  color and `aria-pressed`, not color alone.

## Flags
- Light/brand model only (no dark-neutral variant) — pending design-lead confirm.
