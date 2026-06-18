/* ============================================================================
   Certa DS 4.0 — PhoneInput  (Forms & Inputs)
   Country selector (flag + dial + chevron) joined to the number field, with a
   clear affordance. Sizes M 40 / S 32. Opens CountryDropdown (440:450/441:437).
   ============================================================================ */
import React, { useState } from "react";
import { CountryDropdown, SAMPLE_COUNTRIES } from "./CountryDropdown.jsx";

export function PhoneInput({
  size = "m",
  countries = SAMPLE_COUNTRIES,
  countryCode = "US",
  value = "",
  onChange = () => {},
  onCountryChange = () => {},
  disabled = false,
  error = false,
}) {
  const [open, setOpen] = useState(false);
  const h = size === "s" ? "var(--control-height-s)" : "var(--control-height-m)";
  const country = countries.find((c) => c.code === countryCode) || countries[0];
  const borderColor = error ? "var(--color-border-error)" : "var(--color-border-default)";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ display: "inline-flex", height: h, minWidth: 320 }}>
        {/* country selector */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            padding: "0 var(--space-md)",
            border: `1px solid ${borderColor}`,
            borderRight: "none",
            borderTopLeftRadius: "var(--radius-sm)",
            borderBottomLeftRadius: "var(--radius-sm)",
            background: disabled ? "var(--color-bg-muted)" : "var(--color-bg-page)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-body-size)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <span aria-hidden>{country.flag}</span>
          <span>{country.dial}</span>
          <span aria-hidden style={{ color: "var(--color-text-tertiary)" }}>▾</span>
        </button>
        {/* number field */}
        <input
          type="tel"
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="(415) 555-0142"
          style={{
            flex: 1,
            minWidth: 0,
            padding: "0 var(--space-lg)",
            border: `1px solid ${borderColor}`,
            borderTopRightRadius: "var(--radius-sm)",
            borderBottomRightRadius: "var(--radius-sm)",
            background: disabled ? "var(--color-bg-muted)" : "var(--color-bg-page)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-body-size)",
            outline: "none",
          }}
        />
      </div>
      {open && !disabled && (
        <div style={{ position: "absolute", top: "calc(100% + var(--space-sm))", left: 0, zIndex: 10 }}>
          <CountryDropdown
            countries={countries}
            value={countryCode}
            onSelect={(code) => { onCountryChange(code); setOpen(false); }}
          />
        </div>
      )}
    </div>
  );
}

export default PhoneInput;
