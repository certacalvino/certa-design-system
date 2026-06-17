/* ============================================================================
   Certa DS 4.0 — AppShell.jsx
   Light sidebar (#F7F8FA) + topbar + content slot.
   UI PATTERN: nav active state — brand-subtle fill, text/link label, 2px
   left brand indicator. Inactive items use text/secondary.
   ============================================================================ */
import React from "react";
import { Icon, Badge } from "./Primitives.jsx";

const NAV = [
  { key: "home", label: "Home", glyph: "▦" },
  { key: "vendors", label: "Vendors", glyph: "❏", badge: "24" },
  { key: "assessments", label: "Assessments", glyph: "✓" },
  { key: "documents", label: "Documents", glyph: "▤" },
  { key: "reports", label: "Reports", glyph: "▥" },
  { key: "settings", label: "Settings", glyph: "⚙" },
];

function NavItem({ item, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
        width: "100%",
        height: 40,
        padding: "0 var(--space-lg)",
        border: "none",
        cursor: "pointer",
        borderRadius: "var(--radius-sm)",
        background: active ? "var(--color-bg-brand-subtle)" : "transparent",
        color: active ? "var(--color-text-link)" : "var(--color-text-secondary)",
        fontFamily: "var(--font-family-base)",
        fontSize: "var(--font-body-size)",
        fontWeight: active ? "var(--font-weight-bold)" : "var(--font-weight-medium)",
        textAlign: "left",
      }}
    >
      {active && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: 2,
            borderRadius: "var(--radius-full)",
            background: "var(--color-action-primary)",
          }}
        />
      )}
      <Icon glyph={item.glyph} size={20} color="currentColor" label={item.label} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge && <Badge color="neutral" size="s">{item.badge}</Badge>}
    </button>
  );
}

export default function AppShell({ active = "home", onNavigate = () => {}, title, actions = null, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg-subtle)" }}>
      {/* Sidebar -------------------------------------------------------------- */}
      <aside
        style={{
          width: 248,
          flexShrink: 0,
          background: "var(--color-bg-sidebar)",
          borderRight: "1px solid var(--color-border-default)",
          display: "flex",
          flexDirection: "column",
          padding: "var(--space-xl) var(--space-lg)",
          gap: "var(--space-3xl)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "0 var(--space-sm)" }}>
          <span style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", background: "var(--color-action-primary)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>C</span>
          <span style={{ fontWeight: "var(--font-weight-bold)", fontSize: 16, color: "var(--color-text-primary)" }}>Certa</span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
          {NAV.map((item) => (
            <NavItem key={item.key} item={item} active={active === item.key} onClick={() => onNavigate(item.key)} />
          ))}
        </nav>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-sm)" }}>
          <span style={{ width: 32, height: 32, borderRadius: "var(--radius-full)", background: "var(--color-bg-brand)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>CC</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "var(--font-body-size)", fontWeight: 600 }}>Christian C.</span>
            <span className="t-caption">Admin</span>
          </div>
        </div>
      </aside>

      {/* Main ---------------------------------------------------------------- */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header
          style={{
            height: 64,
            flexShrink: 0,
            background: "var(--color-bg-page)",
            borderBottom: "1px solid var(--color-border-default)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 var(--space-3xl)",
          }}
        >
          <h1 className="t-title-m" style={{ margin: 0 }}>{title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>{actions}</div>
        </header>
        <main style={{ flex: 1, padding: "var(--space-3xl)", overflow: "auto" }}>{children}</main>
      </div>
    </div>
  );
}

export { NAV };
