/* ============================================================================
   Certa DS 4.0 — FilterChip  (Figma set 430:487)
   State × Icon × Badge = 16 variants. Pill 32px, r-full, light/brand model.
   Selected = bg/brand-subtle + text/link; rest = surface/default + text/secondary.
   ============================================================================ */
import React from "react";

export function FilterChip({
  selected = false,
  disabled = false,
  icon = null,
  count = null,
  onClick = () => {},
  children,
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-md)",
        height: "var(--control-height-s)",       /* 32px */
        padding: "0 var(--space-lg)",
        borderRadius: "var(--radius-full)",
        border: `1px solid ${selected ? "var(--color-border-focused)" : "var(--color-border-default)"}`,
        background: selected ? "var(--color-bg-brand-subtle)" : "var(--color-bg-page)",
        color: selected ? "var(--color-text-link)" : "var(--color-text-secondary)",
        fontFamily: "var(--font-family-base)",
        fontSize: "var(--font-body-size)",
        fontWeight: "var(--font-weight-medium)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {icon && <span style={{ display: "inline-flex", width: 16, height: 16, alignItems: "center", justifyContent: "center" }}>{icon}</span>}
      {children}
      {count != null && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 16,
            height: 16,
            padding: "0 4px",
            borderRadius: "var(--radius-sm)",
            background: selected ? "var(--color-action-primary)" : "var(--color-bg-muted)",
            color: selected ? "var(--color-text-inverse)" : "var(--color-text-secondary)",
            fontSize: "var(--font-caption-size)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export default FilterChip;
