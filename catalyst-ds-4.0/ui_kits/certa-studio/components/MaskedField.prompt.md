# MaskedField — Certa DS 4.0

**Figma:** set `453:800` · **Page:** Forms & Inputs · **Variants:** State × Size = 12

## Intent
Displays a sensitive value (SSN, tax ID, account number) masked by default, with
a reveal toggle. Built on the same field shell as `Input`.

## Anatomy
```
[ •••-••-4821                    👁 ]
  masked value (flex)      reveal toggle (16px)
```
- Height **M 40** (`--control-height-m`) / **S 32** (`--control-height-s`).
- Radius `--radius-sm` (4px); 1px border; padding `0 md 0 lg`.
- Masked text uses `letter-spacing: 0.12em` for legible dot groups; revealed text is normal.

## Tokens
| Part | Token |
| --- | --- |
| border (default) | `--color-border-default` |
| border (error) | `--color-border-error` |
| bg (disabled) | `--color-bg-muted` |
| value | `--color-text-primary` (disabled → `--color-text-disabled`) |
| toggle icon | `--color-text-tertiary` |

## States (× M/S = 12)
`default · filled · focus · error · disabled` — error swaps the border to
`border/error`; disabled greys the field and locks the toggle.

## Props
- `value?: string` — masked unless revealed.
- `size?: "m" | "s"`
- `state?: "default" | "filled" | "focus" | "error" | "disabled"`
- `maskChar?: string` — default `"•"`.
- `defaultRevealed?: boolean`
- `onToggleReveal?: (revealed) => void` — makes the component controlled.

## Usage
```jsx
<MaskedField value="123-45-4821" />
<MaskedField value="123-45-4821" size="s" state="error" />
```

## A11y / Flags
- Toggle is a `<button aria-pressed aria-label="Reveal value">`.
- **FLAG:** no eye-slash glyph in the catalog yet — the same eye icon is used for
  both hidden/revealed. Commission an eye-slash to distinguish states.
