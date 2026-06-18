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

export function Avatar({ name = "", tone = "brand", size = "m" }) {
  const px = AVATAR_SIZE[size] || AVATAR_SIZE.m;
  return (
    <span
      role="img"
      aria-label={name}
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
      {initials(name)}
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
export function KPIStatCard({ icon = null, title, value, delta = null }) {
  const up = delta && !String(delta).trim().startsWith("-");
  return (
    <div
      style={{
        width: 200,
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
        <span style={{ fontSize: "var(--font-body-size)", fontWeight: "var(--font-weight-semibold)", color: up ? "var(--color-text-success)" : "var(--color-text-error)" }}>
          {up ? "▲" : "▼"} {String(delta).replace(/^-/, "")}
        </span>
      )}
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

export default {
  Button, Icon, Badge, ProcessStatus, Field, Input,
  Checkbox, CheckboxPill, MultiSelect, Card, SectionHeader, EmptyState, ProgressSteps,
  Avatar, Toggle, RAGField, KPIStatCard, Gauge, CircularProgress,
  tokens, STATUS_COLOR, AVATAR_SIZE, AVATAR_TONES, RAG_LEVELS,
};
