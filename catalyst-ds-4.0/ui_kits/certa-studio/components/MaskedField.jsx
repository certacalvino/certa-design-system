/* ============================================================================
   Certa DS 4.0 — MaskedField  (Figma set 453:800)
   State × Size = 12 variants. Masked value (•) with a reveal toggle (eye).
   Sizes M 40 / S 32. States: default / filled / focus / error / disabled.
   FLAG: eye-slash icon pending commission — reveal uses eye glyph for both.
   ============================================================================ */
import React, { useState } from "react";

export function MaskedField({
  value = "",
  size = "m",
  state = "default",
  maskChar = "•",
  defaultRevealed = false,
  onToggleReveal,
}) {
  const [internal, setInternal] = useState(defaultRevealed);
  const revealed = onToggleReveal ? defaultRevealed : internal;
  const disabled = state === "disabled";
  const error = state === "error";
  const masked = revealed ? value : maskChar.repeat(Math.max(value.length, 0));
  const toggle = () => (onToggleReveal ? onToggleReveal(!revealed) : setInternal((v) => !v));

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: size === "s" ? "var(--control-height-s)" : "var(--control-height-m)",
        padding: "0 var(--space-md) 0 var(--space-lg)",
        gap: "var(--space-md)",
        minWidth: 240,
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${error ? "var(--color-border-error)" : "var(--color-border-default)"}`,
        background: disabled ? "var(--color-bg-muted)" : "var(--color-bg-page)",
      }}
    >
      <span
        style={{
          flex: 1,
          fontSize: "var(--font-body-size)",
          letterSpacing: revealed ? "normal" : "0.12em",
          color: disabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
          fontFamily: "var(--font-family-base)",
        }}
      >
        {masked || (revealed ? "" : maskChar.repeat(6))}
      </span>
      <button
        type="button"
        aria-label={revealed ? "Hide value" : "Reveal value"}
        aria-pressed={revealed}
        disabled={disabled}
        onClick={toggle}
        style={{
          width: 16,
          height: 16,
          border: "none",
          background: "transparent",
          padding: 0,
          cursor: disabled ? "not-allowed" : "pointer",
          color: "var(--color-text-tertiary)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* FLAG: no eye-slash glyph yet — eye used for both states */}
        👁
      </button>
    </div>
  );
}

export default MaskedField;
