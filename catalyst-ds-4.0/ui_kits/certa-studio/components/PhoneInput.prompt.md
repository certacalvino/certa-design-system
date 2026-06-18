# PhoneInput — Certa DS 4.0

**Figma:** Forms & Inputs (composes CountryDropdown `440:450`/`441:437`)

## Intent
International phone entry: a country selector fused to the left of the number
field. Picking a country sets the dial code; the popover is `CountryDropdown`.

## Anatomy
```
[ 🇺🇸 +1 ▾ │ (415) 555-0142            ]
  country selector   number field (flex)
        └── opens CountryDropdown below ──┘
```
- Single control, height **M 40** / **S 32**.
- Selector and field share one rounded shell: selector has left radius + no right
  border; field has right radius. Radius `--radius-sm` (4px).

## Tokens
| Part | Token |
| --- | --- |
| border (default) | `--color-border-default` |
| border (error) | `--color-border-error` |
| bg (disabled) | `--color-bg-muted` |
| value / dial | `--color-text-primary` |
| chevron | `--color-text-tertiary` |

## Props
- `size?: "m" | "s"`
- `countries?: Country[]` — defaults to `SAMPLE_COUNTRIES`.
- `countryCode?: string` — selected code.
- `value?: string` — phone number.
- `onChange?(value)`, `onCountryChange?(code)`
- `disabled?: boolean`, `error?: boolean`

## Usage
```jsx
<PhoneInput countryCode="US" value={num}
  onChange={setNum} onCountryChange={setCode} />
```

## Flags
- Emoji flags render differently per platform; shadow on the popover comes from
  `--shadow-lg`. Sample country list is static (see CountryDropdown).
