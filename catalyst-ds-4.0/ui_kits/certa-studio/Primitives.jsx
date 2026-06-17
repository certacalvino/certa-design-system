/* ============================================================================
   Certa DS 4.0 — Primitives.jsx
   Atomic, token-driven React primitives. Every screen composes from these.
   No hardcoded colors/spacing — all values resolve to colors_and_type.css vars.
   ============================================================================ */
import React from "react";

/* --- design tokens surfaced to JS (mirror of colors_and_type.css) --------- */
export const tokens = {
  brand: "var(--color-action-primary)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textLink: "var(--color-text-link)",
  textError: "var(--color-text-error)",
  border: "var(--color-border-default)",
  radius: "var(--radius-sm)",
  radiusLg: "var(--radius-lg)",
  space: (k) => `var(--space-${k})`,
};

/* ---------------------------------------------------------------------------
   Button — Filled / Outline / Text / Link · M(40) / S(32) · Body Bold 14
   --------------------------------------------------------------------------- */
export function Button({
  variant = "filled",
  size = "m",
  destructive = false,
  iconLeft = null,
  iconRight = null,
  children,
  ...rest
}) {
  const height = size === "s" ? "var(--control-height-s)" : "var(--control-height-m)";
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-md)",
    height,
    padding: `0 var(--space-xl)`,
    borderRadius: "var(--radius-sm)",
    fontFamily: "var(--font-family-base)",
    fontSize: "var(--font-body-bold-size)",
    fontWeight: "var(--font-weight-bold)",
    lineHeight: "var(--font-body-bold-lh)",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "background .12s ease, border-color .12s ease",
  };
  const accent = destructive ? "var(--color-status-danger-fg)" : "var(--color-action-primary)";
  const variants = {
    filled:  { background: accent, color: "var(--color-text-inverse)" },
    outline: { background: "transparent", color: accent, borderColor: "var(--color-border-strong)" },
    text:    { background: "transparent", color: accent },
    link:    { background: "transparent", color: "var(--color-text-link)", textDecoration: "underline", padding: 0, height: "auto" },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

/* ---------------------------------------------------------------------------
   Icon — 20px default (16 for menu/table/read-only/header contexts)
   --------------------------------------------------------------------------- */
export function Icon({ glyph = "•", size = 20, color = "currentColor", label }) {
  return (
    <span
      role="img"
      aria-label={label}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        fontSize: size - 2,
        color,
        lineHeight: 1,
      }}
    >
      {glyph}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Badge — Neutral / Info / Success / Warning / Danger · S / M
   --------------------------------------------------------------------------- */
export function Badge({ color = "neutral", size = "s", icon = null, children }) {
  const map = {
    neutral: ["--color-status-neutral-bg", "--color-status-neutral-fg"],
    info:    ["--color-status-info-bg", "--color-status-info-fg"],
    success: ["--color-status-success-bg", "--color-status-success-fg"],
    warning: ["--color-status-warning-bg", "--color-status-warning-fg"],
    danger:  ["--color-status-danger-bg", "--color-status-danger-fg"],
  };
  const [bg, fg] = map[color];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-sm)",
        background: `var(${bg})`,
        color: `var(${fg})`,
        borderRadius: "var(--radius-sm)",
        padding: size === "m" ? "2px var(--space-md)" : "1px var(--space-sm)",
        fontSize: size === "m" ? "var(--font-body-size)" : "var(--font-caption-size)",
        fontWeight: "var(--font-weight-semibold)",
        lineHeight: "var(--font-caption-lh)",
      }}
    >
      {icon}
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   ProcessStatus — 24px chip, r4, status color mapping (CLAUDE.md vocab)
   Maps Certa status vocabulary → semantic color. No invented states.
   --------------------------------------------------------------------------- */
export const STATUS_COLOR = {
  Approved: "success",
  Active: "success",
  Completed: "success",
  "In Review": "info",
  "In Progress": "info",
  Draft: "neutral",
  Archived: "neutral",
  Expiring: "warning",
  "Action Needed": "warning",
  Rejected: "danger",
  Expired: "danger",
};
export function ProcessStatus({ status = "Draft" }) {
  const color = STATUS_COLOR[status] || "neutral";
  return (
    <Badge color={color} size="m">
      <Dot color={color} />
      {status}
    </Badge>
  );
}
function Dot({ color }) {
  const fg = {
    neutral: "--color-status-neutral-fg",
    info: "--color-status-info-fg",
    success: "--color-status-success-fg",
    warning: "--color-status-warning-fg",
    danger: "--color-status-danger-fg",
  }[color];
  return <span style={{ width: 6, height: 6, borderRadius: "var(--radius-full)", background: `var(${fg})` }} />;
}

/* ---------------------------------------------------------------------------
   Field — label + required asterisk (text/error) + input + help/error
   UI PATTERN: required asterisk is always color-text-error.
   --------------------------------------------------------------------------- */
export function Field({ label, required = false, error = null, help = null, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      {label && (
        <span style={{ fontSize: "var(--font-body-size)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>
          {label}
          {required && <span style={{ color: "var(--color-text-error)", marginLeft: 2 }}>*</span>}
        </span>
      )}
      {children}
      {error && <span style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-error)" }}>{error}</span>}
      {help && !error && <span className="t-caption">{help}</span>}
    </label>
  );
}

/* ---------------------------------------------------------------------------
   Input — M(40) / S(32), tokenized states (default/focus/error/disabled)
   --------------------------------------------------------------------------- */
export function Input({ size = "m", error = false, disabled = false, ...rest }) {
  return (
    <input
      disabled={disabled}
      style={{
        height: size === "s" ? "var(--control-height-s)" : "var(--control-height-m)",
        padding: "0 var(--space-lg)",
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${error ? "var(--color-border-error)" : "var(--color-border-default)"}`,
        background: disabled ? "var(--color-bg-muted)" : "var(--color-bg-page)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-family-base)",
        fontSize: "var(--font-body-size)",
        outline: "none",
      }}
      {...rest}
    />
  );
}

/* ---------------------------------------------------------------------------
   Checkbox pill — UI PATTERN: certifications as multi-select checkbox pills
   --------------------------------------------------------------------------- */
export function CheckboxPill({ checked = false, onChange, children }) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-md)",
        height: "var(--control-height-s)",
        padding: "0 var(--space-lg)",
        borderRadius: "var(--radius-full)",
        border: `1px solid ${checked ? "var(--color-border-focused)" : "var(--color-border-default)"}`,
        background: checked ? "var(--color-bg-brand-subtle)" : "var(--color-bg-page)",
        color: checked ? "var(--color-text-link)" : "var(--color-text-secondary)",
        fontSize: "var(--font-body-size)",
        fontWeight: "var(--font-weight-medium)",
        cursor: "pointer",
      }}
    >
      <span aria-hidden>{checked ? "✓" : "+"}</span>
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------------
   Card / Surface
   --------------------------------------------------------------------------- */
export function Card({ children, style }) {
  return (
    <div
      style={{
        background: "var(--color-bg-page)",
        border: "1px solid var(--color-border-default)",
        borderRadius: "var(--radius-sm)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SectionHeader — UI PATTERN: section headers use text/primary, never link
   --------------------------------------------------------------------------- */
export function SectionHeader({ children, action = null }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-lg)" }}>
      <h2 className="t-title-s" style={{ margin: 0, color: "var(--color-text-primary)" }}>{children}</h2>
      {action}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   EmptyState — UI PATTERN: icon + title + body + primary action
   --------------------------------------------------------------------------- */
export function EmptyState({ icon = "📭", title, body, action = null }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "var(--space-4xl)", gap: "var(--space-md)" }}>
      <div style={{ fontSize: 40, opacity: 0.6 }}>{icon}</div>
      <div className="t-title-s">{title}</div>
      <div className="t-body text-secondary" style={{ maxWidth: 360 }}>{body}</div>
      {action && <div style={{ marginTop: "var(--space-md)" }}>{action}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   ProgressSteps — UI PATTERN: multi-step progress indicator
   --------------------------------------------------------------------------- */
export function ProgressSteps({ steps = [], current = 0 }) {
  return (
    <ol style={{ display: "flex", gap: "var(--space-md)", listStyle: "none", margin: 0, padding: 0 }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const fg = done || active ? "var(--color-text-inverse)" : "var(--color-text-tertiary)";
        const bg = done
          ? "var(--color-status-success-fg)"
          : active
          ? "var(--color-action-primary)"
          : "var(--color-bg-muted)";
        return (
          <li key={label} style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
            <span style={{ width: 24, height: 24, borderRadius: "var(--radius-full)", background: bg, color: fg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
              {done ? "✓" : i + 1}
            </span>
            <span style={{ fontSize: "var(--font-body-size)", fontWeight: active ? 700 : 400, color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>{label}</span>
            {i < steps.length - 1 && <span style={{ width: 32, height: 1, background: "var(--color-border-default)" }} />}
          </li>
        );
      })}
    </ol>
  );
}

export default {
  Button, Icon, Badge, ProcessStatus, Field, Input,
  CheckboxPill, Card, SectionHeader, EmptyState, ProgressSteps, tokens, STATUS_COLOR,
};
