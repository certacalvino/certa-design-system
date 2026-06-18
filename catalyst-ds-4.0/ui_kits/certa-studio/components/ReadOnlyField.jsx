/* ============================================================================
   Certa DS 4.0 — ReadOnlyField  (Figma set 520:1872)
   Type(12) × State(Filled/Empty) = 24 variants. Display-context field.
   Label = 12px Caption (non-interactive exception). Value = Body 14 text/primary.
   Empty = em-dash placeholder in text/disabled. Optional 16px value icon.
   ============================================================================ */
import React from "react";

export function ReadOnlyField({ label, value = null, icon = null, emptyText = "—" }) {
  const isEmpty = value == null || value === "";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
      {label && (
        <span
          style={{
            fontSize: "var(--font-caption-size)",       /* 12px caption — non-interactive */
            lineHeight: "var(--font-caption-lh)",
            color: "var(--color-text-secondary)",
          }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          fontSize: "var(--font-body-size)",
          lineHeight: "var(--font-body-lh)",
          fontWeight: "var(--font-weight-medium)",
          color: isEmpty ? "var(--color-text-disabled)" : "var(--color-text-primary)",
        }}
      >
        {!isEmpty && icon && (
          <span style={{ display: "inline-flex", width: 16, height: 16, alignItems: "center", justifyContent: "center" }}>
            {icon}
          </span>
        )}
        {isEmpty ? emptyText : value}
      </span>
    </div>
  );
}

export default ReadOnlyField;
