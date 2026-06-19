/* ============================================================================
   Certa Studio — Catalyst DS 4.0 click-through demo (app.jsx)
   Self-contained (no bundler): runs in-browser via React UMD + Babel standalone.
   Components below mirror the canonical APIs in ui_kits/certa-studio/Primitives.jsx
   and ui_kits/certa-studio/components/ — same token vocabulary, anatomy, and names
   (Avatar, Badge, Button, SplitButton, FilterChip, KPIStatCard, ReadOnlyField,
   FileDropzone, Tabs, NavItem). Zero hardcoded colors — everything resolves to
   colors_and_type.css semantic tokens.
   ============================================================================ */
const { useState } = React;

/* --- atoms ---------------------------------------------------------------- */
function Avatar({ name = "", tone = "brand", size = 32 }) {
  const initials = name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span style={{
      width: size, height: size, flexShrink: 0, borderRadius: "var(--radius-full)",
      background: `var(--color-avatar-${tone}-bg)`, color: `var(--color-avatar-${tone}-fg)`,
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontWeight: "var(--font-weight-semibold)", fontSize: Math.round(size * 0.4),
    }}>{initials}</span>
  );
}

const STATUS_COLOR = {
  Approved: "success", Active: "success", Completed: "success",
  "In Review": "info", "In Progress": "info", Draft: "neutral", Archived: "neutral",
  Expiring: "warning", "Action Needed": "warning", Rejected: "danger", Expired: "danger",
};
function Badge({ color = "neutral", dot = false, children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "var(--space-sm)",
      background: `var(--color-status-${color}-bg)`, color: `var(--color-status-${color}-fg)`,
      borderRadius: "var(--radius-sm)", padding: "2px var(--space-md)",
      fontSize: "var(--font-caption-size)", fontWeight: "var(--font-weight-semibold)",
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "var(--radius-full)", background: `var(--color-status-${color}-fg)` }} />}
      {children}
    </span>
  );
}
function StatusBadge({ status }) {
  return <Badge color={STATUS_COLOR[status] || "neutral"} dot>{status}</Badge>;
}
/* risk mapping: Low→success · Medium→warning · High→danger */
const RISK_COLOR = { Low: "success", Medium: "warning", High: "danger" };
function RiskBadge({ level }) {
  return <Badge color={RISK_COLOR[level]} dot>{level}</Badge>;
}

function Button({ variant = "filled", size = "m", onClick, children }) {
  const v = {
    filled: { background: "var(--color-action-primary)", color: "var(--color-text-inverse)", border: "1px solid transparent" },
    outline: { background: "transparent", color: "var(--color-action-primary)", border: "1px solid var(--color-border-strong)" },
  }[variant];
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: "var(--space-md)",
      height: size === "s" ? "var(--control-height-s)" : "var(--control-height-m)",
      padding: "0 var(--space-xl)", borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-bold-size)",
      fontWeight: "var(--font-weight-bold)", cursor: "pointer", ...v,
    }}>{children}</button>
  );
}

/* SplitButton — outline, full-height divider (113:792) */
function SplitButton({ size = "m", onClick = () => {}, onTrigger = () => {}, children }) {
  const h = size === "s" ? 32 : 36;
  return (
    <div style={{ display: "inline-flex", height: h, border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--color-bg-page)" }}>
      <button onClick={onClick} style={{
        display: "inline-flex", alignItems: "center", padding: "0 var(--space-xl)", border: "none",
        background: "transparent", cursor: "pointer", fontFamily: "var(--font-family-base)",
        fontSize: "var(--font-body-bold-size)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)",
      }}>{children}</button>
      <button onClick={onTrigger} aria-label="More" style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 var(--space-md)",
        border: "none", borderLeft: "1px solid var(--color-border-default)", background: "transparent",
        cursor: "pointer", color: "var(--color-text-secondary)", fontSize: 16,
      }}>▾</button>
    </div>
  );
}

function FilterChip({ selected = false, count = null, onClick, children }) {
  return (
    <button onClick={onClick} aria-pressed={selected} style={{
      display: "inline-flex", alignItems: "center", gap: "var(--space-md)",
      height: "var(--control-height-s)", padding: "0 var(--space-lg)", borderRadius: "var(--radius-full)",
      border: `1px solid ${selected ? "var(--color-border-focused)" : "var(--color-border-default)"}`,
      background: selected ? "var(--color-bg-brand-subtle)" : "var(--color-bg-page)",
      color: selected ? "var(--color-text-link)" : "var(--color-text-secondary)",
      fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)",
      fontWeight: "var(--font-weight-medium)", cursor: "pointer",
    }}>
      {children}
      {count != null && <span style={{ minWidth: 16, height: 16, padding: "0 4px", borderRadius: "var(--radius-sm)", background: "var(--color-bg-muted)", fontSize: "var(--font-caption-size)", fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
    </button>
  );
}

function KPIStatCard({ icon, title, value, delta }) {
  const up = delta && !String(delta).startsWith("-");
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--space-md)", background: "var(--color-bg-page)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-xs)", padding: "var(--space-xl)" }}>
      {icon && <span style={{ fontSize: 24, color: "var(--color-text-disabled)" }}>{icon}</span>}
      <span className="t-meta" style={{ color: "var(--color-text-secondary)" }}>{title}</span>
      <span className="t-display">{value}</span>
      {delta != null && <span style={{ fontSize: "var(--font-body-size)", fontWeight: 600, color: up ? "var(--color-text-success)" : "var(--color-text-error)" }}>{up ? "▲" : "▼"} {String(delta).replace(/^-/, "")}</span>}
    </div>
  );
}

function ReadOnlyField({ label, value, pills }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
      <span className="t-caption">{label}</span>
      {pills ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)" }}>
          {pills.map((p, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", height: 24, padding: "0 var(--space-md)", borderRadius: "var(--radius-xs)", background: "var(--color-bg-muted)", border: "1px solid var(--color-border-subtle)", color: "var(--color-text-secondary)", fontSize: "var(--font-caption-size)", fontWeight: 600 }}>{p}</span>
          ))}
        </div>
      ) : (
        <span style={{ fontSize: "var(--font-body-size)", fontWeight: 500, color: value ? "var(--color-text-primary)" : "var(--color-text-disabled)" }}>{value || "—"}</span>
      )}
    </div>
  );
}

function FileDropzone({ hover = false }) {
  return (
    <div style={{ border: hover ? "2px dashed var(--color-border-focused)" : "1px dashed var(--color-border-default)", background: hover ? "var(--color-bg-brand-subtle)" : "var(--color-bg-page)", borderRadius: "var(--radius-sm)", padding: "var(--space-4xl)", textAlign: "center" }}>
      <div style={{ fontSize: 28 }}>↥</div>
      <div style={{ fontWeight: 600, marginTop: "var(--space-md)" }}>Drag files here or <span className="text-link">browse</span></div>
      <div className="t-caption">{hover ? "Drop to upload" : "PDF, DOCX up to 25 MB"}</div>
    </div>
  );
}
function FileRow({ kind, name, meta }) {
  const tone = { PDF: ["danger", "error"], DOC: ["info", "link"], XLS: ["success", "success"] }[kind] || ["neutral", "secondary"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-md) var(--space-lg)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-sm)" }}>
      <span style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: `var(--color-bg-${tone[0]}-subtle)`, color: `var(--color-text-${tone[1]})`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{kind}</span>
      <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: "var(--font-body-size)" }}>{name}</div><div className="t-caption">{meta}</div></div>
      <span style={{ color: "var(--color-text-tertiary)" }}>↧</span>
      <span style={{ color: "var(--color-text-tertiary)" }}>🗑</span>
    </div>
  );
}

function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--color-border-subtle)", marginBottom: "var(--space-3xl)" }}>
      {tabs.map((t) => {
        const on = t === active;
        return (
          <button key={t} onClick={() => onChange(t)} style={{
            position: "relative", height: 40, padding: "0 var(--space-lg)", border: "none", background: "transparent",
            cursor: "pointer", fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)",
            fontWeight: on ? "var(--font-weight-bold)" : "var(--font-weight-medium)",
            color: on ? "var(--color-text-primary)" : "var(--color-text-secondary)",
          }}>
            {t}
            {on && <span style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: "var(--color-text-link)" }} />}
          </button>
        );
      })}
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: "var(--color-bg-page)", border: "1px solid var(--color-border-default)", borderRadius: "var(--radius-sm)", ...style }}>{children}</div>;
}
function SectionHeader({ children, action }) {
  return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-lg)" }}><h2 className="t-title-s" style={{ margin: 0 }}>{children}</h2>{action}</div>;
}
function AlertBanner({ color = "warning", title, body }) {
  return (
    <div style={{ display: "flex", gap: "var(--space-md)", padding: "var(--space-lg)", borderRadius: "var(--radius-sm)", background: `var(--color-status-${color}-bg)`, borderLeft: `4px solid var(--color-status-${color}-fg)` }}>
      <span style={{ color: `var(--color-status-${color}-fg)` }}>△</span>
      <div><div style={{ fontWeight: 700, fontSize: "var(--font-body-size)" }}>{title}</div><div className="t-body text-secondary">{body}</div></div>
    </div>
  );
}

/* --- app shell ------------------------------------------------------------ */
const NAV = [
  { key: "dashboard", label: "Dashboard", glyph: "▦" },
  { key: "vendors", label: "Vendors", glyph: "❏" },
  { key: "workflows", label: "Workflows", glyph: "⇄" },
  { key: "records", label: "Records", glyph: "▤" },
  { key: "changes", label: "Change Requests", glyph: "✎" },
];
function NavItem({ item, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", display: "flex", alignItems: "center", gap: "var(--space-md)", width: "100%",
      height: 40, padding: "0 var(--space-lg)", border: "none", cursor: "pointer", borderRadius: "var(--radius-sm)",
      background: active ? "var(--color-bg-brand-subtle)" : "transparent",
      color: active ? "var(--color-text-link)" : "var(--color-text-secondary)",
      fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)",
      fontWeight: active ? "var(--font-weight-bold)" : "var(--font-weight-medium)", textAlign: "left",
    }}>
      {active && <span style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 2, borderRadius: "var(--radius-full)", background: "var(--color-action-primary)" }} />}
      <span style={{ width: 20, textAlign: "center", fontSize: 16 }}>{item.glyph}</span>
      <span>{item.label}</span>
    </button>
  );
}

function Shell({ active, onNavigate, title, actions, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg-subtle)" }}>
      <aside style={{ width: 248, flexShrink: 0, background: "var(--color-bg-sidebar)", borderRight: "1px solid var(--color-border-default)", display: "flex", flexDirection: "column", padding: "var(--space-xl) var(--space-lg)", gap: "var(--space-3xl)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "0 var(--space-sm)" }}>
          <span style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", background: "var(--color-action-primary)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>C</span>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Certa Studio</span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
          {NAV.map((item) => <NavItem key={item.key} item={item} active={active === item.key} onClick={() => onNavigate(item.key)} />)}
        </nav>
      </aside>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ height: 64, flexShrink: 0, background: "var(--color-bg-page)", borderBottom: "1px solid var(--color-border-default)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--space-3xl)", gap: "var(--space-xl)" }}>
          <h1 className="t-title-m" style={{ margin: 0 }}>{title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)", flex: 1, justifyContent: "flex-end" }}>
            <input placeholder="Search…" style={{ height: 36, width: 240, maxWidth: "40%", padding: "0 var(--space-lg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border-default)", fontFamily: "var(--font-family-base)", fontSize: "var(--font-body-size)", outline: "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
              {actions}
              <Avatar name="Christian C" tone="brand" size={32} />
            </div>
          </div>
        </header>
        <main style={{ flex: 1, padding: "var(--space-3xl)", overflow: "auto" }}>{children}</main>
      </div>
    </div>
  );
}

/* --- data ----------------------------------------------------------------- */
const VENDORS = [
  { id: 1, name: "Acme Logistics", tone: "brand", date: "Mar 14, 2026", risk: "Low", status: "Approved" },
  { id: 2, name: "Northwind Cloud", tone: "teal", date: "Jun 02, 2026", risk: "Medium", status: "In Review" },
  { id: 3, name: "Globex Materials", tone: "orange", date: "Jan 28, 2026", risk: "High", status: "Expiring" },
  { id: 4, name: "Initech Audit Co.", tone: "red", date: "Feb 19, 2026", risk: "High", status: "Rejected" },
  { id: 5, name: "Umbrella Pharma", tone: "green", date: "Jun 17, 2026", risk: "Low", status: "Draft" },
];
const ACTIVITY = [
  { who: "J. Park", tone: "teal", what: "approved Northwind Cloud", status: "Approved" },
  { who: "A. Singh", tone: "orange", what: "uploaded SOC 2 for Globex", status: "In Review" },
  { who: "M. Reyes", tone: "brand", what: "requested re-assessment of Initech", status: "Action Needed" },
  { who: "L. Chen", tone: "green", what: "created Umbrella Pharma", status: "Draft" },
];

const thStyle = { textAlign: "left", height: 40, padding: "0 var(--space-lg)", borderBottom: "1px solid var(--color-border-default)" };
const tdStyle = { height: 52, padding: "0 var(--space-lg)", borderBottom: "1px solid var(--color-border-subtle)", fontSize: "var(--font-body-size)" };

/* --- screens -------------------------------------------------------------- */
function HomeDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3xl)" }}>
      <div style={{ display: "flex", gap: "var(--space-xl)" }}>
        <KPIStatCard icon="❏" title="Total Vendors" value="124" delta="6%" />
        <KPIStatCard icon="△" title="High Risk" value="7" delta="-2%" />
        <KPIStatCard icon="✓" title="Pending Reviews" value="18" delta="3%" />
        <KPIStatCard icon="◷" title="Compliance Score" value="92%" delta="1%" />
      </div>
      <AlertBanner color="warning" title="4 vendors need attention" body="Certifications expiring within 30 days or assessments returned with findings." />
      <Card style={{ padding: "var(--space-xl)" }}>
        <SectionHeader action={<Button variant="outline" size="s">View all</Button>}>Recent activity</SectionHeader>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th className="t-meta" style={thStyle}>User</th><th className="t-meta" style={thStyle}>Activity</th><th className="t-meta" style={thStyle}>Status</th></tr></thead>
          <tbody>
            {ACTIVITY.map((a, i) => (
              <tr key={i}>
                <td style={tdStyle}><div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}><Avatar name={a.who} tone={a.tone} size={28} /><span style={{ fontWeight: 600 }}>{a.who}</span></div></td>
                <td style={{ ...tdStyle, color: "var(--color-text-secondary)" }}>{a.what}</td>
                <td style={tdStyle}><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function VendorList({ onOpen }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Low", "Medium", "High"];
  const rows = filter === "All" ? VENDORS : VENDORS.filter((v) => v.risk === filter);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          {filters.map((f) => <FilterChip key={f} selected={filter === f} onClick={() => setFilter(f)}>{f}</FilterChip>)}
        </div>
        <SplitButton>Export</SplitButton>
      </div>
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th className="t-meta" style={thStyle}>Vendor</th><th className="t-meta" style={thStyle}>Risk</th><th className="t-meta" style={thStyle}>Status</th></tr></thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.id} onClick={() => onOpen(v)} style={{ cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                {/* Entity cell: avatar + name + date */}
                <td style={tdStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                    <Avatar name={v.name} tone={v.tone} size={32} />
                    <div><div style={{ fontWeight: 600 }}>{v.name}</div><div className="t-caption">Onboarded {v.date}</div></div>
                  </div>
                </td>
                <td style={tdStyle}><RiskBadge level={v.risk} /></td>
                <td style={tdStyle}><StatusBadge status={v.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function VendorDetail({ vendor, onBack }) {
  const [tab, setTab] = useState("Overview");
  return (
    <div>
      <button onClick={onBack} style={{ border: "none", background: "transparent", color: "var(--color-text-link)", cursor: "pointer", fontSize: "var(--font-body-size)", fontWeight: 600, marginBottom: "var(--space-lg)", padding: 0 }}>← Back to Vendors</button>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", marginBottom: "var(--space-3xl)" }}>
        <Avatar name={vendor.name} tone={vendor.tone} size={40} />
        <h2 className="t-title-m" style={{ margin: 0 }}>{vendor.name}</h2>
        <RiskBadge level={vendor.risk} />
        <div style={{ marginLeft: "auto" }}><SplitButton>Save draft</SplitButton></div>
      </div>
      <Tabs tabs={["Overview", "Documents", "Assessment"]} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <Card style={{ padding: "var(--space-xl)" }}>
          <SectionHeader>Company profile</SectionHeader>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)" }}>
            <ReadOnlyField label="Company name" value={vendor.name} />
            <ReadOnlyField label="Website" value="globex.com" />
            <ReadOnlyField label="Country" value="United States" />
            <ReadOnlyField label="Business type" value="Manufacturing" />
            <div style={{ gridColumn: "1 / -1" }}>
              <ReadOnlyField label="Certifications" pills={["ISO 27001", "SOC 2 Type II", "GDPR"]} />
            </div>
          </div>
        </Card>
      )}
      {tab === "Documents" && (
        <Card style={{ padding: "var(--space-xl)" }}>
          <SectionHeader>Documents</SectionHeader>
          <div style={{ marginBottom: "var(--space-xl)" }}><FileDropzone /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            <FileRow kind="PDF" name="SOC2-Type-II-2026.pdf" meta="2.4 MB · uploaded 1d ago" />
            <FileRow kind="DOC" name="MSA-contract-v3.docx" meta="880 KB · uploaded 2d ago" />
          </div>
        </Card>
      )}
      {tab === "Assessment" && (
        <Card style={{ padding: "var(--space-4xl)", textAlign: "center" }}>
          <div className="t-title-s">Assessment</div>
          <p className="t-body text-secondary">Risk assessment responses compose the same DS 4.0 primitives.</p>
        </Card>
      )}
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <Card style={{ padding: "var(--space-4xl)", textAlign: "center" }}>
      <div style={{ fontSize: 40, color: "var(--color-text-disabled)" }}>🔍</div>
      <div className="t-body-bold" style={{ marginTop: "var(--space-md)" }}>{title}</div>
      <div className="t-body text-secondary">This area is a stub in the click-through demo.</div>
    </Card>
  );
}

/* --- root ----------------------------------------------------------------- */
function App() {
  const [screen, setScreen] = useState("dashboard");
  const [vendor, setVendor] = useState(null);

  const nav = (key) => { setVendor(null); setScreen(key); };
  const titles = { dashboard: "Dashboard", vendors: "Vendors", workflows: "Workflows", records: "Records", changes: "Change Requests" };
  const detail = vendor != null;
  const activeNav = detail ? "vendors" : screen;

  let body, title;
  if (detail) { body = <VendorDetail vendor={vendor} onBack={() => setVendor(null)} />; title = vendor.name; }
  else if (screen === "dashboard") { body = <HomeDashboard />; title = titles.dashboard; }
  else if (screen === "vendors") { body = <VendorList onOpen={setVendor} />; title = titles.vendors; }
  else { body = <Placeholder title={titles[screen]} />; title = titles[screen]; }

  const actions = screen === "vendors" && !detail ? <Button onClick={() => {}}>+ New vendor</Button> : null;
  return <Shell active={activeNav} onNavigate={nav} title={title} actions={actions}>{body}</Shell>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
