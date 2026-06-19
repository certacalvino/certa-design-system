/* ============================================================================
   Certa DS 4.0 — ReadOnlyField  (Figma set 520:1872)
   Type(12) × State(Filled/Empty) = 24 variants. Display-context field.
   Label = 12px Caption (non-interactive exception). Value = Body 14 text/primary.
   Empty = em-dash placeholder in text/disabled. Optional 16px value icon.
   Pill value types (Boolean/Select/Multi) render as Badge pills carrying a
   1px border/subtle stroke so they read as bounded chips on white (2026-06-18).
   ============================================================================ */
import React from "react";

/** Badge pill with a 1px border/subtle stroke (Boolean/Select/Multi values). */
function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 24,
        padding: "0 var(--space-md)",
        borderRadius: "var(--radius-xs)",
        background: "var(--color-bg-muted)",
        border: "1px solid var(--color-border-subtle)",   /* visible boundary on white */
        color: "var(--color-text-secondary)",
        fontSize: "var(--font-caption-size)",
        fontWeight: "var(--font-weight-semibold)",
      }}
    >
      {children}
    </span>
  );
}

export function ReadOnlyField({ label, value = null, icon = null, emptyText = "—", pills = null }) {
  const hasPills = Array.isArray(pills) && pills.length > 0;
  const isEmpty = !hasPills && (value == null || value === "");
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
      {hasPills ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)" }}>
          {pills.map((p, i) => <Pill key={i}>{p}</Pill>)}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default ReadOnlyField;
