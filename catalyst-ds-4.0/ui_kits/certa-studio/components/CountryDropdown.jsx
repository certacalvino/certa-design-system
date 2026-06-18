/* ============================================================================
   Certa DS 4.0 — CountryDropdown  (row set 440:450 + panel 441:437)
   280w overlay, r8, shadow. Search input + scrollable rows (flag + name + dial).
   Selected row = surface/selected. Used standalone or inside PhoneInput.
   ============================================================================ */
import React, { useState } from "react";

export const SAMPLE_COUNTRIES = [
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
];

function CountryRow({ c, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(c.code)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
        width: "100%",
        height: 40,
        padding: "0 var(--space-lg)",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        borderRadius: "var(--radius-sm)",
        background: selected ? "var(--color-surface-selected)" : "transparent",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-family-base)",
        fontSize: "var(--font-body-size)",
      }}
    >
      <span aria-hidden>{c.flag}</span>
      <span style={{ flex: 1 }}>{c.name}</span>
      <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-caption-size)" }}>{c.dial}</span>
    </button>
  );
}

export function CountryDropdown({
  countries = SAMPLE_COUNTRIES,
  value = null,
  onSelect = () => {},
  searchable = true,
}) {
  const [q, setQ] = useState("");
  const rows = countries.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.dial.includes(q));
  return (
    <div
      style={{
        width: 280,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border-default)",
        boxShadow: "var(--shadow-lg)",
        background: "var(--color-bg-page)",
        padding: "var(--space-sm)",
      }}
    >
      {searchable && (
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search country"
          style={{
            width: "100%",
            height: "var(--control-height-s)",
            padding: "0 var(--space-lg)",
            marginBottom: "var(--space-sm)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border-default)",
            fontFamily: "var(--font-family-base)",
            fontSize: "var(--font-body-size)",
            outline: "none",
          }}
        />
      )}
      <div style={{ maxHeight: 240, overflow: "auto" }}>
        {rows.map((c) => (
          <CountryRow key={c.code} c={c} selected={c.code === value} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default CountryDropdown;
