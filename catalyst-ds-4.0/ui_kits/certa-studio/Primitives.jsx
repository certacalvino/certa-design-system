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
  tone = null,              /* back-compat: tone="red" → destructive */
  iconLeft = null,
  iconRight = null,
  leadingIcon = null,       /* back-compat aliases */
  trailingIcon = null,
  children,
  ...rest
}) {
  if (tone === "red") destructive = true;
  iconLeft = iconLeft || leadingIcon;
  iconRight = iconRight || trailingIcon;
  if (size === "sm") size = "s";
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
    outline: { background: "transparent", color: accent, borderColor: destructive ? "var(--color-border-error)" : "var(--color-border-default)" },
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
export function Badge({ color = "neutral", size = "s", icon = null, dot = false, children }) {
  const map = {
    neutral: ["--color-status-neutral-bg", "--color-status-neutral-fg"],
    info:    ["--color-status-info-bg", "--color-status-info-fg"],
    brand:   ["--color-bg-brand-subtle", "--color-text-link"],
    success: ["--color-status-success-bg", "--color-status-success-fg"],
    warning: ["--color-status-warning-bg", "--color-status-warning-fg"],
    danger:  ["--color-status-danger-bg", "--color-status-danger-fg"],
  };
  const [bg, fg] = map[color] || map.neutral;
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
      {dot && <span style={{ width: 6, height: 6, borderRadius: "var(--radius-full)", background: `var(${fg})` }} />}
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
export function Input({ size = "m", error = false, disabled = false, leadingIcon = null, trailingIcon = null, style, ...rest }) {
  const h = size === "s" ? "var(--control-height-s)" : "var(--control-height-m)";
  const border = `1px solid ${error ? "var(--color-border-error)" : "var(--color-border-default)"}`;
  const bg = disabled ? "var(--color-bg-muted)" : "var(--color-bg-page)";
  if (!leadingIcon && !trailingIcon) {
    return (
      <input
        disabled={disabled}
        style={{ height: h, padding: "0 var(--space-lg)", borderRadius: "var(--radius-sm)", border, background: bg, color: "var(--color-text-primary)", fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)", outline: "none", ...style }}
        {...rest}
      />
    );
  }
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)", height: h, padding: "0 var(--space-lg)", borderRadius: "var(--radius-sm)", border, background: bg, ...style }}>
      {leadingIcon}
      <input disabled={disabled} style={{ flex: 1, minWidth: 0, height: "100%", border: "none", background: "transparent", color: "var(--color-text-primary)", fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)", outline: "none" }} {...rest} />
      {trailingIcon}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Checkbox — real control (set 179:420). 16px square, r4, 2px border.
   Unchecked: border/default on white. Checked: brand bg + white SVG check.
   Indeterminate: brand bg + white SVG dash. Pure CSS/SVG — no catalog icon.
   --------------------------------------------------------------------------- */
export function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  error = false,
  label,
  onChange = () => {},
}) {
  const on = checked || indeterminate;
  const borderColor = error
    ? "var(--color-border-error)"
    : on
    ? "var(--color-action-primary)"
    : "var(--color-border-strong)";
  const box = (
    <span
      aria-hidden
      style={{
        width: 16,
        height: 16,
        flexShrink: 0,
        borderRadius: "var(--radius-sm)",
        border: `2px solid ${borderColor}`,
        background: on ? "var(--color-action-primary)" : "var(--color-bg-page)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background .12s ease, border-color .12s ease",
      }}
    >
      {indeterminate ? (
        <svg width="12" height="12" viewBox="0 0 16 16">
          <line x1="4" y1="8" x2="12" y2="8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : checked ? (
        <svg width="12" height="12" viewBox="0 0 16 16">
          <path d="M3.5 8.5 L6.5 11.5 L12.5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  );
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        ref={(el) => el && (el.indeterminate = indeterminate)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      {box}
      {label && <span style={{ fontSize: "var(--font-body-size)" }}>{label}</span>}
    </label>
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
      {/* real 16px checkbox box (brand fill + white SVG check) — not a ✓/+ glyph */}
      <span
        aria-hidden
        style={{
          width: 16,
          height: 16,
          flexShrink: 0,
          borderRadius: "var(--radius-sm)",
          border: `2px solid ${checked ? "var(--color-action-primary)" : "var(--color-border-strong)"}`,
          background: checked ? "var(--color-action-primary)" : "var(--color-bg-page)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path d="M3.5 8.5 L6.5 11.5 L12.5 5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------------
   Card / Surface
   --------------------------------------------------------------------------- */
export function Card({ children, style, title = null, action = null, footer = null, padded = true }) {
  const hasHeader = title != null || action != null;
  return (
    <div
      style={{
        background: "var(--color-surface-default)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-sm)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {hasHeader && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "14px var(--space-2xl)", borderBottom: "1px solid var(--color-border-subtle)" }}>
          {typeof title === "string" ? <h3 style={{ margin: 0, fontSize: "var(--font-title-small-size)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{title}</h3> : title}
          {action && <div style={{ marginLeft: "auto", display: "flex", gap: "var(--space-md)", alignItems: "center" }}>{action}</div>}
        </div>
      )}
      <div style={{ padding: padded ? "var(--space-2xl)" : 0 }}>{children}</div>
      {footer && <div style={{ padding: "var(--space-lg) var(--space-2xl)", borderTop: "1px solid var(--color-border-subtle)", display: "flex", justifyContent: "flex-end", gap: "var(--space-md)" }}>{footer}</div>}
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

/* ---------------------------------------------------------------------------
   Avatar — Size(S 24 / M 32 / L 40 / XL 56) × Tone(brand/teal/green/orange/
   red/neutral) = 24 variants. Full-circle, light tint bg + saturated
   Semi-Bold initials (matches Figma set 572:50). Initials are decorative,
   so the scaled font size may fall below the 14px interactive floor at S/M.
   --------------------------------------------------------------------------- */
export const AVATAR_SIZE = { s: 24, m: 32, l: 40, xl: 56 };
export const AVATAR_TONES = ["brand", "teal", "green", "orange", "red", "neutral"];

function initials(name = "") {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export function Avatar({ name = "", initials: initialsProp = null, tone = "brand", size = "m" }) {
  const sizeAlias = { sm: "s", md: "m", lg: "l" };
  const px = AVATAR_SIZE[size] || AVATAR_SIZE[sizeAlias[size]] || AVATAR_SIZE.m;
  const label = initialsProp != null ? initialsProp : initials(name);
  return (
    <span
      role="img"
      aria-label={name || label}
      style={{
        width: px,
        height: px,
        borderRadius: "var(--radius-full)",
        background: `var(--color-avatar-${tone}-bg)`,
        color: `var(--color-avatar-${tone}-fg)`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-family-base)",
        fontWeight: "var(--font-weight-semibold)",
        fontSize: Math.round(px * 0.4),
        lineHeight: 1,
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Toggle — segmented control. orientation="horizontal" | "vertical".
   Matches Figma set 574:62 + containers 575:2/575:9: track on surface/subtle
   with a 1px border/subtle, r4, items flush (no gap). Selected = brand-subtle
   fill + text/link Body Bold. H item 32px hug; V item 40px FILL.
   --------------------------------------------------------------------------- */
export function Toggle({ options = [], value, onChange = () => {}, orientation = "horizontal" }) {
  const vertical = orientation === "vertical";
  return (
    <div
      role="group"
      style={{
        display: "inline-flex",
        flexDirection: vertical ? "column" : "row",
        width: vertical ? 220 : "auto",
        background: "var(--color-bg-subtle)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
      }}
    >
      {options.map((opt) => {
        const v = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        const on = v === value;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(v)}
            style={{
              height: vertical ? "var(--control-height-m)" : "var(--control-height-s)",
              flex: vertical ? "0 0 auto" : "0 1 auto",
              padding: "0 var(--space-lg)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              textAlign: vertical ? "left" : "center",
              background: on ? "var(--color-bg-brand-subtle)" : "transparent",
              color: on ? "var(--color-text-link)" : "var(--color-text-secondary)",
              fontFamily: "var(--font-family-base)",
              fontSize: "var(--font-body-size)",
              fontWeight: on ? "var(--font-weight-bold)" : "var(--font-weight-medium)",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   RAGField — Low / Medium / High risk status display (Red/Amber/Green).
   Label (12px caption) + colored dot + risk level. Read-only display.
   --------------------------------------------------------------------------- */
export const RAG_LEVELS = {
  Low: "low",
  Medium: "medium",
  High: "high",
};
const RAG_TAB_TEXT = { Low: "LOW", Medium: "MED", High: "HIGH" };
export function RAGField({ label = "Inherent risk", level = "Low", value }) {
  const key = RAG_LEVELS[level] || "low";
  const text = value != null ? value : `${level} risk`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      {label && <span className="t-caption">{label}</span>}
      {/* 240×40 r4 field: tinted bg + value, 24px saturated right-tab w/ vertical label */}
      <div
        style={{
          position: "relative",
          width: 240,
          height: 40,
          borderRadius: "var(--radius-sm)",
          background: `var(--color-rag-${key}-bg)`,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ flex: 1, padding: "0 var(--space-lg)", fontSize: "var(--font-body-size)", color: "var(--color-text-primary)" }}>
          {text}
        </span>
        {/* colored tab — label rotated 90°. HIGH+LOW white, MED dark (Orange/D2). */}
        <span
          style={{
            width: 24,
            height: "100%",
            background: `var(--color-rag-${key}-base)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              transform: "rotate(-90deg)",
              fontSize: 10,
              fontWeight: "var(--font-weight-bold)",
              letterSpacing: "0.04em",
              color: `var(--color-rag-${key}-label)`,
              whiteSpace: "nowrap",
            }}
          >
            {RAG_TAB_TEXT[level]}
          </span>
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   KPIStatCard — Icon(bool) × Delta(bool). 200w card, surface/default + r4 +
   1px border/subtle + shadow-xs. Value = Display 28; delta ▲ success / ▼ error.
   Matches Figma set 595:4282.
   --------------------------------------------------------------------------- */
export function KPIStatCard({ icon = null, title, value, delta = null, invertDelta = false, sub = null }) {
  const up = delta && !String(delta).trim().startsWith("-");
  // invertDelta: risk metrics where a rising value is BAD (▲ red). Default ▲ green.
  const good = invertDelta ? !up : up;
  return (
    <div
      style={{
        flex: "1 1 0",
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        background: "var(--color-bg-page)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-xs)",
        padding: "var(--space-xl)",
      }}
    >
      {icon && <Icon glyph={icon} size={24} color="var(--color-text-disabled)" />}
      <span className="t-meta" style={{ color: "var(--color-text-secondary)" }}>{title}</span>
      <span className="t-display" style={{ color: "var(--color-text-primary)" }}>{value}</span>
      {delta != null && (
        <span style={{ fontSize: "var(--font-body-size)", fontWeight: "var(--font-weight-semibold)", color: good ? "var(--color-text-success)" : "var(--color-text-error)" }}>
          {up ? "▲" : "▼"} {String(delta).replace(/^-/, "")}
        </span>
      )}
      {sub && <span className="t-caption">{sub}</span>}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Gauge — RAG(Low/Medium/High). 140px, 270° arc (no needle/dot), surface/muted
   track. Value-only center (Display 28). Matches Figma set 598:32. score 0–5.
   --------------------------------------------------------------------------- */
const GAUGE_BASE = { Low: "var(--color-rag-low-base)", Medium: "var(--color-rag-medium-base)", High: "var(--color-rag-high-base)" };
export function Gauge({ level = "Low", score = 1.5, size = 140 }) {
  const sweep = 270;
  const r = size / 2 - 10;
  const c = size / 2;
  // 270° arc starting at 135° (gap at bottom)
  const polar = (deg) => {
    const rad = (deg - 90) * Math.PI / 180;
    return [c + r * Math.cos(rad), c + r * Math.sin(rad)];
  };
  const arcPath = (fromDeg, toDeg) => {
    const [x1, y1] = polar(fromDeg);
    const [x2, y2] = polar(toDeg);
    const large = toDeg - fromDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  const start = 135, end = 135 + sweep;
  const valEnd = 135 + (Math.max(0, Math.min(5, score)) / 5) * sweep;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-md)" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ display: "block" }}>
          <path d={arcPath(start, end)} fill="none" stroke="var(--color-bg-muted)" strokeWidth={size * 0.13} />
          {score > 0 && <path d={arcPath(start, valEnd)} fill="none" stroke={GAUGE_BASE[level]} strokeWidth={size * 0.13} />}
        </svg>
        <span className="t-display" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-primary)" }}>
          {score}
        </span>
      </div>
      <span className="t-caption">Risk</span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   CircularProgress — Size(S 40 / L 80) × Progress(0/25/50/75/100) ×
   State(Default/Success/Error). 360° ring, surface/muted track, arc from top.
   Matches Figma set 609:116.
   --------------------------------------------------------------------------- */
const CP_STATE = { Default: "var(--color-action-primary)", Success: "var(--color-text-success)", Error: "var(--color-text-error)" };
export function CircularProgress({ size = "l", progress = 50, state = "Default" }) {
  const px = size === "s" ? 40 : 80;
  const sw = px * 0.11;
  const r = (px - sw) / 2;
  const circ = 2 * Math.PI * r;
  const c = px / 2;
  return (
    <div style={{ position: "relative", width: px, height: px }}>
      <svg width={px} height={px} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-bg-muted)" strokeWidth={sw} />
        {progress > 0 && (
          <circle
            cx={c} cy={c} r={r} fill="none" stroke={CP_STATE[state]} strokeWidth={sw}
            strokeDasharray={circ} strokeDashoffset={circ * (1 - progress / 100)}
          />
        )}
      </svg>
      <span
        style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--color-text-primary)",
          fontSize: size === "s" ? "var(--font-caption-size)" : "var(--font-body-bold-size)",
          fontWeight: size === "s" ? "var(--font-weight-regular)" : "var(--font-weight-bold)",
        }}
      >
        {progress}%
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   MultiSelect — tag chips in the field + dropdown panel whose rows carry a
   real Checkbox. Selected rows show the brand fill + white check (no glyph
   icon). Matches Multi-select 469:1283 + dropdown 470:1047.
   --------------------------------------------------------------------------- */
export function MultiSelect({ options = [], value = [], onChange = () => {}, open = true }) {
  const toggle = (o) => onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  return (
    <div style={{ position: "relative", width: 320 }}>
      {/* field with tag chips */}
      <div
        style={{
          minHeight: "var(--control-height-m)",
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-sm)",
          alignItems: "center",
          padding: "var(--space-sm) var(--space-lg)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-bg-page)",
        }}
      >
        {value.length === 0 && <span style={{ color: "var(--color-text-tertiary)" }}>Select…</span>}
        {value.map((t) => (
          <span
            key={t}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-sm)",
              height: 24,
              padding: "0 var(--space-md)",
              borderRadius: "var(--radius-xs)",
              background: "var(--color-bg-brand-subtle)",
              color: "var(--color-text-link)",
              fontSize: "var(--font-caption-size)",
              whiteSpace: "nowrap",
            }}
          >
            {t}
            <span aria-hidden style={{ cursor: "pointer" }} onClick={() => toggle(t)}>×</span>
          </span>
        ))}
      </div>
      {/* dropdown panel */}
      {open && (
        <div
          style={{
            marginTop: "var(--space-sm)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            background: "var(--color-bg-page)",
            padding: "var(--space-sm)",
          }}
        >
          {options.map((o) => {
            const sel = value.includes(o);
            return (
              <div
                key={o}
                onClick={() => toggle(o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  height: 36,
                  padding: "0 var(--space-md)",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  background: sel ? "var(--color-surface-selected)" : "transparent",
                }}
              >
                <Checkbox checked={sel} onChange={() => toggle(o)} />
                <span style={{ fontSize: "var(--font-body-size)" }}>{o}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SplitButton — outline (DS 3.0 pattern, Figma 113:792, rebuilt 2026-06-18).
   surface/default bg + 1px border/default + r4 (clipped). text/primary label
   section and chevron section share ONE full-height 1px border/default divider —
   no gap/channel. Heights S 32 / M 36; chevron-down 16px text/secondary.
   --------------------------------------------------------------------------- */
export function SplitButton({ size = "m", state = "default", onClick = () => {}, onTrigger = () => {}, children }) {
  const height = size === "s" ? 32 : 36;
  const padV = size === "s" ? "6px" : "var(--space-md)";   // S 6 is the one raw value (no 6px token)
  const padH = size === "s" ? "var(--space-lg)" : "var(--space-xl)";
  const bg = state === "hover" ? "var(--color-bg-subtle)" : state === "pressed" ? "var(--color-bg-muted)" : "var(--color-bg-page)";
  const border = state === "focused" ? "2px solid var(--color-border-focused)" : "1px solid var(--color-border-default)";
  return (
    <div style={{ display: "inline-flex", height, border, borderRadius: "var(--radius-sm)", overflow: "hidden", background: bg }}>
      <button
        type="button"
        onClick={onClick}
        style={{
          display: "inline-flex", alignItems: "center", padding: `${padV} ${padH}`,
          border: "none", background: "transparent", cursor: "pointer",
          fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-bold-size)",
          fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)",
        }}
      >
        {children}
      </button>
      <button
        type="button"
        aria-label="More actions"
        onClick={onTrigger}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          padding: "0 var(--space-md)", border: "none",
          borderLeft: "1px solid var(--color-border-default)",   /* full-height divider, no channel */
          background: "transparent", cursor: "pointer", color: "var(--color-text-secondary)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Open menu"><path d="M4 6l4 4 4-4" /></svg>
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   TimeField — Date Picker v2 time row (632:2 / 632:76). HH 56×40 r4
   border/subtle + ':' + MM + AM/PM segmented toggle (AM selected = brand-subtle
   + text/link). Used inside the date-time and time-only panels.
   --------------------------------------------------------------------------- */
export function TimeField({ hh = "09", mm = "30", meridiem = "AM", onChange = () => {} }) {
  const field = (v) => (
    <span style={{ width: 56, height: 40, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "var(--font-body-size)", color: "var(--color-text-primary)" }}>{v}</span>
  );
  const seg = (t) => {
    const on = t === meridiem;
    return (
      <button type="button" onClick={() => onChange({ hh, mm, meridiem: t })}
        style={{ height: 36, padding: "0 var(--space-md)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)", fontWeight: on ? "var(--font-weight-bold)" : "var(--font-weight-medium)", background: on ? "var(--color-bg-brand-subtle)" : "transparent", color: on ? "var(--color-text-link)" : "var(--color-text-secondary)" }}>{t}</button>
    );
  };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-md)" }}>
      {field(hh)}
      <span style={{ color: "var(--color-text-secondary)" }}>:</span>
      {field(mm)}
      <span style={{ display: "inline-flex", background: "var(--color-bg-subtle)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-sm)", padding: "var(--space-xs)" }}>
        {seg("AM")}{seg("PM")}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   FileDropzone — upload field (Figma 493:1401). Hover (493:1244) = 2px dashed
   border/focused + bg/brand-subtle fill, distinct from the Empty 1px dashed
   border/default dropzone.
   --------------------------------------------------------------------------- */
export function FileDropzone({ hover = false, caption = "PDF, DOCX up to 25 MB" }) {
  return (
    <div
      style={{
        border: hover ? "2px dashed var(--color-border-focused)" : "1px dashed var(--color-border-default)",
        background: hover ? "var(--color-bg-brand-subtle)" : "var(--color-bg-page)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-4xl)",
        textAlign: "center",
      }}
    >
      <Icon glyph="↥" size={28} label="Upload" />
      <div style={{ fontWeight: "var(--font-weight-semibold)", marginTop: "var(--space-md)" }}>
        Drag files here or <span className="text-link">browse</span>
      </div>
      <div className="t-caption">{hover ? "Drop to upload" : caption}</div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Tag — soft status/category chip (color + optional leading dot). Thin wrapper
   over Badge so the kit has a single chip implementation.
   --------------------------------------------------------------------------- */
export function Tag({ color = "neutral", dot = false, children }) {
  return <Badge color={color} dot={dot}>{children}</Badge>;
}

/* ---------------------------------------------------------------------------
   IconButton — 32px square ghost button for a single icon.
   --------------------------------------------------------------------------- */
export function IconButton({ children, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: 32, height: 32, borderRadius: "var(--radius-sm)",
        background: "transparent", border: "none", cursor: "pointer",
        color: "var(--color-text-secondary)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------------
   Tabs — underline tabs (40px). Selected = text/primary bold + 2px text/link
   indicator; full-width border/subtle baseline. Matches Tabs spec (542:83).
   --------------------------------------------------------------------------- */
export function Tabs({ items = [], value, onChange = () => {} }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--color-border-subtle)" }}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => onChange(it.id)}
            style={{
              position: "relative", height: 40, padding: "0 var(--space-lg)",
              border: "none", background: "transparent", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: "var(--space-md)",
              fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)",
              fontWeight: on ? "var(--font-weight-bold)" : "var(--font-weight-medium)",
              color: on ? "var(--color-text-primary)" : "var(--color-text-secondary)",
            }}
          >
            {it.label}
            {typeof it.count === "number" && (
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 20, height: 18, padding: "0 6px", borderRadius: "var(--radius-full)", fontSize: "var(--font-caption-size)", background: on ? "var(--color-bg-brand-subtle)" : "var(--color-bg-muted)", color: on ? "var(--color-text-link)" : "var(--color-text-secondary)" }}>{it.count}</span>
            )}
            {on && <span style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "var(--color-text-link)" }} />}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Alert — inline banner. tone info/success/warning/danger, 4px left accent.
   --------------------------------------------------------------------------- */
export function Alert({ tone = "info", icon = null, children, action = null, onDismiss = null }) {
  const c = tone === "error" ? "danger" : tone;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", width: "100%", maxWidth: 480, padding: "var(--space-md) var(--space-lg)", borderRadius: "var(--radius-sm)", background: `var(--color-status-${c}-bg)`, color: `var(--color-status-${c}-fg)`, fontSize: "var(--font-body-size)", lineHeight: "var(--font-body-lh)" }}>
      {icon && <span style={{ flexShrink: 0, display: "inline-flex" }}>{icon}</span>}
      <div style={{ flex: 1, color: "var(--color-text-primary)" }}>{children}</div>
      {action && <span>{action}</span>}
      {onDismiss && <button onClick={onDismiss} aria-label="Dismiss" style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit", padding: 4, display: "inline-flex" }}>✕</button>}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Switch — on/off toggle (track 28×16, brand when on).
   --------------------------------------------------------------------------- */
export function Switch({ checked = false, onChange = () => {}, label = null }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)", cursor: "pointer" }}>
      <span
        onClick={() => onChange(!checked)}
        style={{ position: "relative", width: 28, height: 16, borderRadius: "var(--radius-full)", background: checked ? "var(--color-action-primary)" : "var(--color-border-strong)", transition: "background .15s", flexShrink: 0 }}
      >
        <span style={{ position: "absolute", top: 2, left: checked ? 14 : 2, width: 12, height: 12, borderRadius: "var(--radius-full)", background: "var(--color-bg-page)", transition: "left .15s" }} />
      </span>
      {label && <span style={{ fontSize: "var(--font-body-size)", color: "var(--color-text-primary)" }}>{label}</span>}
    </label>
  );
}

/* ---------------------------------------------------------------------------
   Dialog — modal (scrim = bg/overlay, r8, shadow-lg). Title 18/600 + Close,
   body, footer (secondary + primary). Matches Modal spec (536:144).
   --------------------------------------------------------------------------- */
export function Dialog({ open = false, title, description = null, children, primary = null, secondary = null, onClose = () => {} }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "var(--color-bg-overlay)", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-3xl)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--color-bg-page)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", width: "100%", maxWidth: 520, maxHeight: "86vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)", padding: "var(--space-2xl) var(--space-2xl) var(--space-lg)" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: "var(--font-modal-title-size)", lineHeight: "var(--font-modal-title-lh)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{title}</h2>
            {description && <p style={{ margin: "var(--space-sm) 0 0", fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>{description}</p>}
          </div>
          <IconButton label="Close" onClick={onClose}>✕</IconButton>
        </div>
        {children && <div style={{ padding: "0 var(--space-2xl) var(--space-xl)", flex: 1, overflow: "auto", fontSize: "var(--font-body-size)", color: "var(--color-text-primary)" }}>{children}</div>}
        <div style={{ padding: "var(--space-lg) var(--space-2xl) var(--space-2xl)", display: "flex", justifyContent: "flex-end", gap: "var(--space-md)" }}>
          {secondary}
          {primary}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Tooltip — overlay (DS 4.0, 2026-06-24). text/primary bg, white 12px caption,
   r4, shadow-sm, 4 positions + 6px CSS arrow, hover+focus-within, fade+scale.
   disabled prop renders children unwrapped. Zero hardcoded values.
   Needs .ck-tip / .ck-tip-{position} / .ck-tip-bubble CSS from styles.css.
   --------------------------------------------------------------------------- */
export function Tooltip({ content, position = "top", disabled = false, children }) {
  if (disabled) return React.createElement(React.Fragment, null, children);
  return (
    <span className={`ck-tip ck-tip-${position}`}>
      {children}
      <span className="ck-tip-bubble" role="tooltip">{content}</span>
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Pagination — Type(Simple / Numbered). Range text = Caption (meta). r4 controls.
   Matches Figma Pagination (Data Display). 32px controls, brand-subtle active.
   --------------------------------------------------------------------------- */
export function Pagination({ type = "simple", page = 1, pageSize = 10, total = 0, onPage = () => {} }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  const ctrl = (label, disabled, onClick, active = false) => (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        minWidth: 32, height: 32, padding: "0 var(--space-md)",
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${active ? "var(--color-border-focused)" : "var(--color-border-default)"}`,
        background: active ? "var(--color-bg-brand-subtle)" : "var(--color-surface-default)",
        color: disabled ? "var(--color-text-disabled)" : active ? "var(--color-text-link)" : "var(--color-text-primary)",
        fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)",
        fontWeight: active ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
      <span style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>
        {from}–{to} of {total}
      </span>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        {type === "numbered" ? (
          <>
            {ctrl("‹", page <= 1, () => onPage(page - 1))}
            {Array.from({ length: pages }, (_, i) => i + 1).slice(0, 7).map((p) =>
              ctrl(String(p), false, () => onPage(p), p === page))}
            {ctrl("›", page >= pages, () => onPage(page + 1))}
          </>
        ) : (
          <>
            {ctrl("Previous", page <= 1, () => onPage(page - 1))}
            {ctrl("Next", page >= pages, () => onPage(page + 1))}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Table — declarative columns + rows. Column header = meta 10px uppercase on
   surface/subtle; rows 52px; selected = surface/selected. Matches Figma Table
   Cell (529:94) / Row (530:132) / Column Header (530:3400). Data Display.
   columns: [{ key, label, width, align, render(row) }]. rows: [{...}].
   --------------------------------------------------------------------------- */
export function Table({ columns = [], rows = [], selectedKeys = [], onRowClick = null, rowKey = "id" }) {
  return (
    <div style={{ border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--color-surface-default)" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontFamily: "var(--font-family-base)" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{
                textAlign: c.align || "left", padding: "var(--space-md) var(--space-lg)",
                background: "var(--color-bg-subtle)", borderBottom: "1px solid var(--color-border-default)",
                fontSize: "var(--font-meta-size)", textTransform: "uppercase", letterSpacing: "0.04em",
                fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-secondary)",
                whiteSpace: "nowrap", ...(c.width ? { width: c.width } : {}),
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const k = r[rowKey] != null ? r[rowKey] : i;
            const selected = selectedKeys.includes(k);
            return (
              <tr key={k} onClick={onRowClick ? () => onRowClick(r) : undefined}
                style={{ cursor: onRowClick ? "pointer" : "default", background: selected ? "var(--color-surface-selected)" : "transparent" }}>
                {columns.map((c) => (
                  <td key={c.key} style={{
                    textAlign: c.align || "left", padding: "0 var(--space-lg)", height: 52,
                    borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--color-border-subtle)",
                    fontSize: "var(--font-body-size)", color: "var(--color-text-primary)", verticalAlign: "middle",
                  }}>{c.render ? c.render(r) : r[c.key]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Radio — 16px circle, brand dot when checked. States default/checked/error/
   disabled. Matches Figma Radio (179:435). Label = Body 14 text/primary.
   --------------------------------------------------------------------------- */
export function Radio({ checked = false, label = null, name, value, error = false, disabled = false, onChange = () => {} }) {
  const borderColor = error ? "var(--color-border-error)" : checked ? "var(--color-border-focused)" : "var(--color-border-strong)";
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, position: "relative" }}>
      <span style={{
        width: 16, height: 16, flexShrink: 0, borderRadius: "var(--radius-full)",
        border: `1px solid ${borderColor}`, background: "var(--color-surface-default)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        {checked && <span style={{ width: 8, height: 8, borderRadius: "var(--radius-full)", background: "var(--color-bg-brand)" }} />}
      </span>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      {label && <span style={{ fontSize: "var(--font-body-size)", color: "var(--color-text-primary)" }}>{label}</span>}
    </label>
  );
}

/* ---------------------------------------------------------------------------
   Toast — 430px, r8 (radius-lg) + shadow-lg. type success/error/warning/info.
   Status badge + title + message + close. Matches Figma Toast (330:727).
   --------------------------------------------------------------------------- */
const TOAST_ICON = { success: "✓", error: "!", warning: "!", info: "i" };
const TOAST_FG = { success: "var(--color-status-success-fg)", error: "var(--color-status-danger-fg)", warning: "var(--color-status-warning-fg)", info: "var(--color-status-info-fg)" };
const TOAST_BG = { success: "var(--color-bg-success-subtle)", error: "var(--color-bg-danger-subtle)", warning: "var(--color-bg-warning-subtle)", info: "var(--color-status-info-bg)" };
export function Toast({ type = "info", title, message = null, onClose = null }) {
  return (
    <div style={{
      width: 430, maxWidth: "100%", display: "flex", gap: "var(--space-md)", alignItems: "flex-start",
      padding: "var(--space-lg)", borderRadius: "var(--radius-lg)", background: "var(--color-surface-default)",
      border: "1px solid var(--color-border-subtle)", boxShadow: "var(--shadow-lg)", fontFamily: "var(--font-family-base)",
    }}>
      <span style={{
        flexShrink: 0, width: 20, height: 20, borderRadius: "var(--radius-full)", background: TOAST_BG[type],
        color: TOAST_FG[type], display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: "var(--font-caption-size)", fontWeight: "var(--font-weight-bold)",
      }}>{TOAST_ICON[type]}</span>
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontSize: "var(--font-body-bold-size)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{title}</div>}
        {message && <div style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)", marginTop: "var(--space-xs)" }}>{message}</div>}
      </div>
      {onClose && <button type="button" onClick={onClose} aria-label="Close" style={{ border: "none", background: "none", cursor: "pointer", color: "var(--color-text-secondary)", fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   DropdownMenu — overlay menu. items: [{label, icon, onClick, destructive, divider}].
   r8 + shadow-lg, 36px rows, 16px icons, hover = surface-hover, destructive = text/error.
   Matches Figma Dropdown Menu (513:1669 / Menu Item 510:1825).
   --------------------------------------------------------------------------- */
export function DropdownMenu({ items = [], width = 240 }) {
  return (
    <div style={{
      width, background: "var(--color-surface-default)", border: "1px solid var(--color-border-subtle)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", padding: "var(--space-sm)", fontFamily: "var(--font-family-base)",
    }}>
      {items.map((it, i) =>
        it.divider ? (
          <div key={`d${i}`} style={{ height: 1, background: "var(--color-border-subtle)", margin: "var(--space-sm) 0" }} />
        ) : (
          <button key={i} type="button" onClick={it.onClick}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-surface-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            style={{
              display: "flex", alignItems: "center", gap: "var(--space-md)", width: "100%", height: 36,
              padding: "0 var(--space-md)", border: "none", background: "transparent", cursor: "pointer",
              borderRadius: "var(--radius-sm)", textAlign: "left", fontFamily: "var(--font-family-base)",
              fontSize: "var(--font-body-size)", color: it.destructive ? "var(--color-text-error)" : "var(--color-text-primary)",
            }}>
            {it.icon && <Icon glyph={it.icon} size={16} color="currentColor" />}
            <span style={{ flex: 1 }}>{it.label}</span>
          </button>
        )
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   DatePicker — single-date calendar panel. 296w, r8 (radius-lg) + shadow-lg.
   Header (‹ Month YYYY ›) · weekday row (Caption, SUN-first) · 6×7 day grid
   (40px cells r4: today = border/focused ring, selected = brand fill + inverse,
   muted = tertiary, hover = surface-hover) · Today / Clear footer.
   Matches Figma Date Picker v1 (cell 582:14 / panel 583:14 / field 585:71).
   --------------------------------------------------------------------------- */
const DP_WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DP_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function dpSameDay(a, b) { return !!(a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()); }
export function DatePicker({ value = null, onChange = () => {}, onClear = null }) {
  const today = new Date();
  const init = value || today;
  const [view, setView] = React.useState({ y: init.getFullYear(), m: init.getMonth() });
  const first = new Date(view.y, view.m, 1).getDay();
  const start = new Date(view.y, view.m, 1 - first);
  const cells = Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  const go = (delta) => { const d = new Date(view.y, view.m + delta, 1); setView({ y: d.getFullYear(), m: d.getMonth() }); };
  const navBtn = (label, onClick) => (
    <button type="button" onClick={onClick} aria-label={label} style={{ width: 28, height: 28, border: "none", background: "transparent", cursor: "pointer", borderRadius: "var(--radius-sm)", color: "var(--color-text-secondary)", fontSize: 16, lineHeight: 1 }}>{label}</button>
  );
  return (
    <div style={{ width: 296, boxSizing: "border-box", background: "var(--color-surface-default)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", padding: "var(--space-md)", fontFamily: "var(--font-family-base)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--space-sm)", marginBottom: "var(--space-sm)" }}>
        {navBtn("‹", () => go(-1))}
        <span style={{ fontSize: "var(--font-body-bold-size)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)" }}>{DP_MONTHS[view.m]} {view.y}</span>
        {navBtn("›", () => go(1))}
      </div>
      <div style={{ display: "flex" }}>
        {DP_WEEKDAYS.map((w) => (
          <span key={w} style={{ flex: 1, textAlign: "center", height: 32, lineHeight: "32px", fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>{w}</span>
        ))}
      </div>
      {Array.from({ length: 6 }, (_, r) => (
        <div key={r} style={{ display: "flex" }}>
          {cells.slice(r * 7, r * 7 + 7).map((d, i) => {
            const muted = d.getMonth() !== view.m;
            const isToday = dpSameDay(d, today);
            const isSel = dpSameDay(d, value);
            return (
              <button key={i} type="button" onClick={() => onChange(d)}
                onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = "var(--color-surface-hover)"; }}
                onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = "transparent"; }}
                style={{
                  flex: 1, height: 40, borderRadius: "var(--radius-sm)", cursor: "pointer", fontFamily: "var(--font-family-base)",
                  border: isToday && !isSel ? "1px solid var(--color-border-focused)" : "1px solid transparent",
                  fontSize: "var(--font-caption-size)",
                  background: isSel ? "var(--color-bg-brand)" : "transparent",
                  color: isSel ? "var(--color-text-inverse)" : muted ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
                  fontWeight: isSel ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
                }}>{d.getDate()}</button>
            );
          })}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "var(--space-sm)", marginTop: "var(--space-sm)", borderTop: "1px solid var(--color-border-subtle)" }}>
        <button type="button" onClick={() => { setView({ y: today.getFullYear(), m: today.getMonth() }); onChange(today); }} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--color-text-link)", fontSize: "var(--font-body-size)", fontWeight: "var(--font-weight-medium)", padding: 0 }}>Today</button>
        {onClear && <button type="button" onClick={onClear} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--color-text-secondary)", fontSize: "var(--font-body-size)", padding: 0 }}>Clear</button>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   RoundButton — circular icon-only. variant filled/outline/ghost · M(40)/S(32).
   Matches Figma Round Button (Buttons & Actions).
   --------------------------------------------------------------------------- */
export function RoundButton({ icon = null, variant = "filled", size = "m", disabled = false, label, onClick = () => {} }) {
  const px = size === "s" ? 32 : 40;
  const variants = {
    filled: { background: "var(--color-bg-brand)", color: "var(--color-text-inverse)" },
    outline: { background: "var(--color-surface-default)", color: "var(--color-action-primary)", borderColor: "var(--color-border-default)" },
    ghost: { background: "transparent", color: "var(--color-text-secondary)" },
  };
  return (
    <button type="button" aria-label={label} disabled={disabled} onClick={onClick} style={{
      width: px, height: px, borderRadius: "var(--radius-full)", display: "inline-flex", alignItems: "center",
      justifyContent: "center", cursor: disabled ? "not-allowed" : "pointer", border: "1px solid transparent",
      opacity: disabled ? 0.4 : 1, ...variants[variant],
    }}>
      {icon && <Icon glyph={icon} size={size === "s" ? 16 : 20} color="currentColor" />}
    </button>
  );
}

/* ---------------------------------------------------------------------------
   FileRow — uploaded file: type badge + name + meta + download/remove. r4.
   Matches Figma File row (489:1280). M only.
   --------------------------------------------------------------------------- */
export function FileRow({ name, meta = null, type = "PDF", onDownload = null, onRemove = null }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-md) var(--space-lg)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-sm)", background: "var(--color-surface-default)", fontFamily: "var(--font-family-base)" }}>
      <span style={{ width: 32, height: 32, flexShrink: 0, borderRadius: "var(--radius-sm)", background: "var(--color-bg-danger-subtle)", color: "var(--color-status-danger-fg)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "var(--font-weight-bold)" }}>{type}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--font-body-size)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
        {meta && <div style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>{meta}</div>}
      </div>
      {onDownload && <button type="button" aria-label="Download" onClick={onDownload} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--color-text-secondary)" }}><Icon glyph="↓" size={16} /></button>}
      {onRemove && <button type="button" aria-label="Remove" onClick={onRemove} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--color-text-secondary)" }}><Icon glyph="✕" size={16} /></button>}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   NavBar — vertical sidebar nav. items: [{key, label, icon, badge}]. Active =
   bg/brand-subtle + text/link + 2px brand left accent. Matches Figma Nav bar.
   --------------------------------------------------------------------------- */
export function NavBar({ items = [], active = null, onSelect = () => {} }) {
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", width: 240, padding: "var(--space-md)", background: "var(--color-bg-sidebar)", fontFamily: "var(--font-family-base)" }}>
      {items.map((it) => {
        const on = it.key === active;
        return (
          <button key={it.key} type="button" onClick={() => onSelect(it.key)}
            onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = "var(--color-surface-hover)"; }}
            onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = "transparent"; }}
            style={{
              position: "relative", display: "flex", alignItems: "center", gap: "var(--space-md)", width: "100%", height: 40,
              padding: "0 var(--space-lg)", border: "none", cursor: "pointer", borderRadius: "var(--radius-sm)", textAlign: "left",
              background: on ? "var(--color-bg-brand)" : "transparent",
              color: on ? "var(--color-text-inverse)" : "var(--color-text-secondary)",
              fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)",
              fontWeight: "var(--font-weight-medium)",
            }}>
            {it.icon && <Icon glyph={it.icon} size={20} color="currentColor" />}
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.badge != null && <Badge color="neutral" size="s">{it.badge}</Badge>}
          </button>
        );
      })}
    </nav>
  );
}

export default {
  Button, Pagination, Table, Radio, Toast, DropdownMenu, DatePicker, RoundButton, FileRow, NavBar, Icon, Badge, Tag, ProcessStatus, Field, Input, IconButton,
  Checkbox, CheckboxPill, MultiSelect, Card, SectionHeader, EmptyState, ProgressSteps,
  Avatar, Toggle, Tabs, Alert, Switch, Dialog, RAGField, KPIStatCard, Gauge, CircularProgress,
  SplitButton, TimeField, FileDropzone, Tooltip,
  tokens, STATUS_COLOR, AVATAR_SIZE, AVATAR_TONES, RAG_LEVELS,
};
