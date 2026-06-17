/* ============================================================================
   Certa DS 4.0 — VendorDetail.jsx
   Vendor record screen. Concentrates the form UI patterns:
   - Tabs (Overview / Assessment / Documents / Settings)
   - Multi-step progress indicator (onboarding)
   - Form section layout (grouped fields, section header in text/primary)
   - Required field asterisk (text/error)
   - Certifications as checkbox pills (vs a dropdown — see README)
   - File upload field with file row
   - Read-only field display (12px caption label)
   ============================================================================ */
import React, { useState } from "react";
import AppShell from "./AppShell.jsx";
import {
  Button, Icon, Card, SectionHeader, Field, Input, CheckboxPill,
  ProgressSteps, ProcessStatus, Badge,
} from "./Primitives.jsx";

const TABS = ["Overview", "Assessment", "Documents", "Settings"];
const CERTS = ["ISO 27001", "SOC 2 Type II", "GDPR", "HIPAA", "PCI DSS", "ISO 9001"];

function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--color-border-default)", marginBottom: "var(--space-3xl)" }}>
      {tabs.map((t) => {
        const on = t === active;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            style={{
              position: "relative",
              height: 40,
              padding: "0 var(--space-lg)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "var(--font-body-size)",
              fontWeight: on ? "var(--font-weight-bold)" : "var(--font-weight-medium)",
              color: on ? "var(--color-text-primary)" : "var(--color-text-secondary)",
            }}
          >
            {t}
            {on && <span aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "var(--color-text-link)" }} />}
          </button>
        );
      })}
    </div>
  );
}

function ReadOnly({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span className="t-caption">{label}</span>
      <span style={{ fontSize: "var(--font-body-size)", color: "var(--color-text-primary)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function FileRow({ name, meta }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-md) var(--space-lg)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-sm)" }}>
      <span style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--color-bg-danger-subtle)", color: "var(--color-text-error)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>PDF</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "var(--font-body-size)", fontWeight: 600 }}>{name}</div>
        <div className="t-caption">{meta}</div>
      </div>
      <button type="button" aria-label="Download" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--color-text-secondary)" }}><Icon glyph="↧" size={16} /></button>
      <button type="button" aria-label="Remove" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--color-text-secondary)" }}><Icon glyph="🗑" size={16} /></button>
    </div>
  );
}

export default function VendorDetail({ onNavigate }) {
  const [tab, setTab] = useState("Overview");
  const [certs, setCerts] = useState(["ISO 27001", "SOC 2 Type II"]);
  const toggle = (c) => setCerts((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  return (
    <AppShell
      active="vendors"
      onNavigate={onNavigate}
      title="Globex Materials"
      actions={
        <>
          <ProcessStatus status="Expiring" />
          <Button variant="outline">Edit</Button>
          <Button variant="filled">Save</Button>
        </>
      }
    >
      {/* Onboarding progress */}
      <Card style={{ padding: "var(--space-xl)", marginBottom: "var(--space-3xl)" }}>
        <ProgressSteps steps={["Profile", "Certifications", "Assessment", "Approval"]} current={2} />
      </Card>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3xl)" }}>
          {/* Form section: company profile */}
          <Card style={{ padding: "var(--space-xl)" }}>
            <SectionHeader>Company profile</SectionHeader>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
              <Field label="Legal name" required><Input defaultValue="Globex Materials Inc." /></Field>
              <Field label="Primary contact email" required help="Used for assessment notifications">
                <Input type="email" defaultValue="compliance@globex.com" />
              </Field>
              <Field label="Tax ID"><Input defaultValue="" placeholder="Optional" /></Field>
            </div>
          </Card>

          {/* Read-only summary */}
          <Card style={{ padding: "var(--space-xl)" }}>
            <SectionHeader>Record</SectionHeader>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)" }}>
              <ReadOnly label="Vendor ID" value="VND-00842" />
              <ReadOnly label="Category" value="Manufacturing" />
              <ReadOnly label="Owner" value="A. Singh" />
              <ReadOnly label="Created" value="Mar 14, 2026" />
            </div>
          </Card>

          {/* Certifications — checkbox pills */}
          <Card style={{ padding: "var(--space-xl)", gridColumn: "1 / -1" }}>
            <SectionHeader>Certifications</SectionHeader>
            <p className="t-body text-secondary" style={{ marginTop: 0 }}>
              Select all that apply. Use pills when the set is small and finite ({CERTS.length} options) — multi-select dropdown is reserved for long lists.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-md)" }}>
              {CERTS.map((c) => (
                <CheckboxPill key={c} checked={certs.includes(c)} onChange={() => toggle(c)}>{c}</CheckboxPill>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "Documents" && (
        <Card style={{ padding: "var(--space-xl)" }}>
          <SectionHeader>Documents</SectionHeader>
          {/* File upload field */}
          <div style={{ border: "1px dashed var(--color-border-strong)", borderRadius: "var(--radius-sm)", padding: "var(--space-3xl)", textAlign: "center", marginBottom: "var(--space-xl)" }}>
            <div style={{ fontSize: 28 }}><Icon glyph="↥" size={28} /></div>
            <div style={{ fontWeight: 600, marginTop: "var(--space-md)" }}>Drag files here or <span className="text-link">browse</span></div>
            <div className="t-caption">PDF, DOCX up to 25 MB</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            <FileRow name="SOC2-Type-II-2026.pdf" meta="2.4 MB · uploaded 1d ago" />
            <FileRow name="ISO-27001-cert.pdf" meta="880 KB · uploaded 1d ago" />
          </div>
        </Card>
      )}

      {(tab === "Assessment" || tab === "Settings") && (
        <Card style={{ padding: "var(--space-4xl)", textAlign: "center" }}>
          <div className="t-title-s">{tab}</div>
          <p className="t-body text-secondary">Section content for {tab} composes the same primitives.</p>
        </Card>
      )}
    </AppShell>
  );
}
