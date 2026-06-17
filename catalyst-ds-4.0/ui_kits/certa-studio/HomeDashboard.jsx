/* ============================================================================
   Certa DS 4.0 — HomeDashboard.jsx
   Landing dashboard: stat widgets, activity feed, attention queue.
   Demonstrates status badge color mapping and section-header pattern.
   ============================================================================ */
import React from "react";
import AppShell from "./AppShell.jsx";
import { Button, Icon, Card, SectionHeader, ProcessStatus, Badge } from "./Primitives.jsx";

const STATS = [
  { label: "Active vendors", value: "124", delta: "+6", tone: "success" },
  { label: "Pending review", value: "18", delta: "+3", tone: "info" },
  { label: "Expiring soon", value: "7", delta: "−2", tone: "warning" },
  { label: "Action needed", value: "4", delta: "+1", tone: "danger" },
];

const ATTENTION = [
  { name: "Globex Materials", reason: "ISO 27001 expires in 9 days", status: "Expiring" },
  { name: "Initech Audit Co.", reason: "Assessment returned with findings", status: "Rejected" },
  { name: "Umbrella Pharma", reason: "Awaiting initial documents", status: "Draft" },
];

const ACTIVITY = [
  { who: "J. Park", what: "approved Northwind Cloud", when: "5h ago" },
  { who: "A. Singh", what: "uploaded SOC 2 report for Globex", when: "1d ago" },
  { who: "M. Reyes", what: "requested re-assessment of Initech", when: "3d ago" },
];

function Stat({ s }) {
  const toneFg = {
    success: "var(--color-text-success)",
    info: "var(--color-text-link)",
    warning: "var(--color-text-warning)",
    danger: "var(--color-text-error)",
  }[s.tone];
  return (
    <Card style={{ padding: "var(--space-xl)", flex: 1, minWidth: 0 }}>
      <div className="t-caption">{s.label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-md)", marginTop: "var(--space-sm)" }}>
        <span className="t-title-m" style={{ fontWeight: 700 }}>{s.value}</span>
        <span style={{ fontSize: "var(--font-caption-size)", fontWeight: 700, color: toneFg }}>{s.delta}</span>
      </div>
    </Card>
  );
}

export default function HomeDashboard({ onNavigate }) {
  return (
    <AppShell
      active="home"
      onNavigate={onNavigate}
      title="Home"
      actions={<Button variant="outline" iconLeft={<Icon glyph="↧" size={20} />}>Export</Button>}
    >
      {/* Stat widgets */}
      <div style={{ display: "flex", gap: "var(--space-xl)", marginBottom: "var(--space-3xl)" }}>
        {STATS.map((s) => <Stat key={s.label} s={s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-3xl)" }}>
        {/* Attention queue */}
        <Card style={{ padding: "var(--space-xl)" }}>
          <SectionHeader action={<Button variant="link">View all</Button>}>Needs attention</SectionHeader>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ATTENTION.map((a, i) => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-md) 0", borderTop: i ? "1px solid var(--color-border-subtle)" : "none" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{a.name}</div>
                  <div className="t-caption">{a.reason}</div>
                </div>
                <ProcessStatus status={a.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Activity feed */}
        <Card style={{ padding: "var(--space-xl)" }}>
          <SectionHeader>Recent activity</SectionHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: "var(--space-md)" }}>
                <span style={{ width: 28, height: 28, borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--color-text-secondary)" }}>
                  {a.who.replace(/[^A-Z]/g, "")}
                </span>
                <div style={{ fontSize: "var(--font-body-size)" }}>
                  <span style={{ fontWeight: 600 }}>{a.who}</span> <span className="text-secondary">{a.what}</span>
                  <div className="t-caption">{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
