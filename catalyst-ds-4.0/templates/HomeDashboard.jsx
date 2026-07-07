/* Home Dashboard — DETERMINISTIC reference template, composed 1:1 from the kit.
   No emoji (dates use I.Calendar), risk distribution = horizontal bar meters
   (NOT CircularProgress/Gauge), every KPIStatCard carries a delta (+invertDelta
   for risk). Global-scope (window kit) — bundled by render/ and /design-sync. */

const RAG = { low: "var(--color-rag-low-base)", medium: "var(--color-rag-medium-base)", high: "var(--color-rag-high-base)" };

const ACTIVITY = [
  { id: 1, name: "Acme Corporation", tone: "brand", action: "Assessment approved", status: "Approved", date: "2h ago" },
  { id: 2, name: "Umbrella Logistics", tone: "orange", action: "Flagged for review", status: "Action Needed", date: "5h ago" },
  { id: 3, name: "Globex Industries", tone: "teal", action: "Questionnaire submitted", status: "In Review", date: "Yesterday" },
  { id: 4, name: "Initech Systems", tone: "green", action: "Contract renewed", status: "Approved", date: "2 days ago" },
  { id: 5, name: "Hooli Cloud", tone: "brand", action: "Onboarding started", status: "In Progress", date: "3 days ago" },
];

function BarMeter({ label, level, count, pct }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-body-size)" }}>
        <span style={{ color: "var(--color-text-primary)" }}>{label}</span>
        <span style={{ color: "var(--color-text-secondary)", fontWeight: "var(--font-weight-semibold)" }}>{count}</span>
      </div>
      <span style={{ height: 8, borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", overflow: "hidden" }}>
        <span style={{ display: "block", width: pct + "%", height: "100%", background: RAG[level] }} />
      </span>
    </div>
  );
}

function Renewal({ name, date }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
      <span style={{ color: "var(--color-text-secondary)", display: "inline-flex" }}><I.Calendar /></span>
      <span style={{ flex: 1, fontSize: "var(--font-body-size)", color: "var(--color-text-primary)", fontWeight: "var(--font-weight-medium)" }}>{name}</span>
      <span style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>{date}</span>
    </div>
  );
}

function HomeDashboardTemplate() {
  const cols = [
    { key: "name", label: "Vendor", render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)" }}>
        <Avatar name={r.name} tone={r.tone} size="s" /><span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{r.name}</span>
      </span>) },
    { key: "action", label: "Activity", render: (r) => <span style={{ color: "var(--color-text-secondary)" }}>{r.action}</span> },
    { key: "status", label: "Status", render: (r) => <ProcessStatus status={r.status} /> },
    { key: "date", label: "When", align: "right", render: (r) => <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-caption-size)" }}>{r.date}</span> },
  ];
  return (
    <div style={{ padding: "var(--space-3xl)", display: "flex", flexDirection: "column", gap: "var(--space-3xl)", background: "var(--color-bg-page)", fontFamily: "var(--font-family-base)", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <span className="t-title-m" style={{ color: "var(--color-text-primary)" }}>Risk overview</span>
        <div style={{ flex: 1 }} />
        <Button variant="outline" iconLeft={<I.Calendar />} iconRight={<I.Caret />}>Last 30 days</Button>
      </div>

      <div style={{ display: "flex", gap: "var(--space-lg)" }}>
        <KPIStatCard title="Total vendors" value="248" delta="6" sub="vs last quarter" />
        <KPIStatCard title="High risk" value="9" delta="2" invertDelta sub="needs attention" />
        <KPIStatCard title="Pending review" value="12" delta="-4" invertDelta sub="down this week" />
        <KPIStatCard title="Compliance" value="87%" delta="5" sub="controls passing" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-3xl)", alignItems: "start" }}>
        <Card title="Recent activity" action={<Button variant="text" size="s">View all</Button>} padded={false}>
          <Table columns={cols} rows={ACTIVITY} rowKey="id" />
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3xl)" }}>
          <Card title="Risk distribution">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
              <BarMeter label="Low" level="low" count={182} pct={73} />
              <BarMeter label="Medium" level="medium" count={57} pct={23} />
              <BarMeter label="High" level="high" count={9} pct={4} />
            </div>
          </Card>
          <Card title="Upcoming renewals">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
              <Renewal name="Acme Corporation" date="Dec 31, 2026" />
              <Renewal name="Stark Manufacturing" date="Jan 15, 2027" />
              <Renewal name="Initech Systems" date="Feb 02, 2027" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<HomeDashboardTemplate />);
