# CountryDropdown — Certa DS 4.0

**Figma:** row set `440:450` + panel `441:437` · **Page:** Forms & Inputs

## Intent
Country picker overlay — used standalone or as the popover for `PhoneInput`.
Search-filterable list of countries with flag, name, and dial code.

## Anatomy
```
┌ 280w, r8, shadow-lg ───────────────┐
│ [ Search country            ]      │  ← optional search (32px)
│ 🇺🇸 United States          +1      │  ← row 40px (selected = surface/selected)
│ 🇬🇧 United Kingdom         +44     │
│ …                                   │  ← scroll, max-height 240
└─────────────────────────────────────┘
```
- Panel width **280px**, radius **r8** (`--radius-lg`, overlay exception), `--shadow-lg`.
- Row 40px: `flag · name (flex) · dial (caption, text/tertiary)`.

## Tokens
| Part | Token |
| --- | --- |
| panel bg | `--color-bg-page` |
| panel radius | `--radius-lg` |
| panel shadow | `--shadow-lg` |
| row selected | `--color-surface-selected` |
| dial code | `--color-text-tertiary` (12px caption) |

## Props
- `countries?: Country[]` — `{ code, name, dial, flag }`; defaults to `SAMPLE_COUNTRIES`.
- `value?: string` — selected code.
- `onSelect?: (code) => void`
- `searchable?: boolean` — default true.

## Usage
```jsx
<CountryDropdown value="US" onSelect={setCode} />
```

## Flags
- Emoji flags (cross-platform rendering varies); 6 sample countries; static list.
  Wire to a real ISO country dataset for production.
