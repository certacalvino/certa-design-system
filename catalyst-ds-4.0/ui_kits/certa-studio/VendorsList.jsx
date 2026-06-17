/* ============================================================================
   Certa DS 4.0 — VendorsList.jsx
   Data table screen. Demonstrates:
   - UI PATTERN: status badge color mapping (ProcessStatus / STATUS_COLOR)
   - UI PATTERN: table row actions revealed on hover
   - UI PATTERN: empty state structure
   - UI PATTERN: column header meta (10px uppercase) + filter chips
   ============================================================================ */
import React, { useState } from "react";
import AppShell from "./AppShell.jsx";
import { Button, Icon, ProcessStatus, Card, EmptyState } from "./Primitives.jsx";

const VENDORS = [
  { id: 1, name: "Acme Logistics", category: "Transportation", owner: "M. Reyes", status: "Approved", updated: "2d ago" },
  { id: 2, name: "Northwind Cloud", category: "SaaS", owner: "J. Park", status: "In Review", updated: "5h ago" },
  { id: 3, name: "Globex Materials", category: "Manufacturing", owner: "A. Singh", status: "Expiring", updated: "1d ago" },
  { id: 4, name: "Initech Audit Co.", category: "Professional Svc.", owner: "M. Reyes", status: "Rejected", updated: "3d ago" },
  { id: 5, name: "Umbrella Pharma", category: "Healthcare", owner: "L. Chen", status: "Draft", updated: "just now" },
];

const COLS = ["Vendor", "Category", "Owner", "Status", "Updated", ""];

function Row({ v }) {
  const [hover, setHover] = useState(false);
  const cell = { padding: "0 var(--space-lg)", height: 52, verticalAlign: "middle", borderBottom: "1px solid var(--color-border-subtle)", fontSize: "var(--font-body-size)" };
  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? "var(--color-surface-hover)" : "transparent" }}
    >
      <td style={{ ...cell, fontWeight: 600, color: "var(--color-text-primary)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
          <span style={{ width: 28, height: 28, borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--color-text-secondary)" }}>
            {v.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </span>
          {v.name}
        </div>
      </td>
      <td style={{ ...cell, color: "var(--color-text-secondary)" }}>{v.category}</td>
      <td style={{ ...cell, color: "var(--color-text-secondary)" }}>{v.owner}</td>
      <td style={cell}><ProcessStatus status={v.status} /></td>
      <td style={{ ...cell, color: "var(--color-text-tertiary)" }}>{v.updated}</td>
      <td style={{ ...cell, width: 96, textAlign: "right" }}>
        {/* Row actions appear on hover only */}
        <div style={{ display: "flex", gap: "var(--space-sm)", justifyContent: "flex-end", visibility: hover ? "visible" : "hidden" }}>
          <IconBtn glyph="✎" label="Edit" />
          <IconBtn glyph="⋯" label="More" />
        </div>
      </td>
    </tr>
  );
}

function IconBtn({ glyph, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-default)", background: "var(--color-bg-page)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-secondary)" }}
    >
      <Icon glyph={glyph} size={16} label={label} />
    </button>
  );
}

export default function VendorsList({ onNavigate, empty = false }) {
  const headCell = { textAlign: "left", padding: "0 var(--space-lg)", height: 40, borderBottom: "1px solid var(--color-border-default)" };
  return (
    <AppShell
      active="vendors"
      onNavigate={onNavigate}
      title="Vendors"
      actions={<Button variant="filled" iconLeft={<Icon glyph="+" size={20} />}>New vendor</Button>}
    >
      {/* Filter row */}
      <div style={{ display: "flex", gap: "var(--space-md)", marginBottom: "var(--space-xl)" }}>
        <FilterChip active>All</FilterChip>
        <FilterChip>Approved</FilterChip>
        <FilterChip>In Review</FilterChip>
        <FilterChip>Expiring</FilterChip>
      </div>

      <Card>
        {empty ? (
          <EmptyState
            icon="❏"
            title="No vendors yet"
            body="Add your first vendor to start tracking certifications, assessments, and compliance status."
            action={<Button variant="filled" iconLeft={<Icon glyph="+" size={20} />}>New vendor</Button>}
          />
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {COLS.map((c, i) => (
                  <th key={i} style={headCell} className="t-meta">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VENDORS.map((v) => <Row key={v.id} v={v} />)}
            </tbody>
          </table>
        )}
      </Card>
    </AppShell>
  );
}

function FilterChip({ active = false, children }) {
  return (
    <button
      type="button"
      style={{
        height: 32,
        padding: "0 var(--space-lg)",
        borderRadius: "var(--radius-full)",
        border: `1px solid ${active ? "var(--color-border-focused)" : "var(--color-border-default)"}`,
        background: active ? "var(--color-bg-brand-subtle)" : "var(--color-bg-page)",
        color: active ? "var(--color-text-link)" : "var(--color-text-secondary)",
        fontSize: "var(--font-body-size)",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
