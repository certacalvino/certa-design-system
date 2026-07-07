/* Vendor Detail — DETERMINISTIC reference template, composed 1:1 from the kit.
   Header + KPI row (invertDelta), Tabs, 2-col overview (Gauge+RAGField /
   CircularProgress due-diligence + cert Tags), Record details grid, Open Issues
   Table + Pagination. No emoji, no hand-rolled divs. Global-scope (window kit). */

const ISSUES = [
  { id: 1, sev: "Critical", sevColor: "danger", title: "SOC 2 report expired", owner: "Dana Whitfield", tone: "brand", status: "Action Needed", age: "3 days" },
  { id: 2, sev: "High", sevColor: "warning", title: "Missing data processing agreement", owner: "Marcus Lee", tone: "teal", status: "In Review", age: "1 week" },
  { id: 3, sev: "Medium", sevColor: "info", title: "Incomplete security questionnaire", owner: "Priya Nair", tone: "green", status: "In Progress", age: "2 weeks" },
];

function Detail({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <span className="t-caption">{label}</span>
      <span style={{ fontSize: "var(--font-body-size)", color: "var(--color-text-primary)", display: "inline-flex", alignItems: "center", gap: "var(--space-md)" }}>{children}</span>
    </div>
  );
}
function DD({ label, progress, state }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
      <CircularProgress size="s" progress={progress} state={state} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "var(--font-body-size)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{label}</span>
        <span style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>{progress}% complete</span>
      </div>
    </div>
  );
}

function VendorDetailTemplate() {
  const cols = [
    { key: "sev", label: "Severity", width: 120, render: (r) => <Badge color={r.sevColor} size="m">{r.sev}</Badge> },
    { key: "title", label: "Issue", render: (r) => <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{r.title}</span> },
    { key: "owner", label: "Owner", render: (r) => (<span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)" }}><Avatar name={r.owner} tone={r.tone} size="s" /><span>{r.owner}</span></span>) },
    { key: "status", label: "Status", render: (r) => <ProcessStatus status={r.status} /> },
    { key: "age", label: "Age", align: "right", render: (r) => <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-caption-size)" }}>{r.age}</span> },
  ];
  return (
    <div style={{ padding: "var(--space-3xl)", display: "flex", flexDirection: "column", gap: "var(--space-3xl)", background: "var(--color-bg-page)", fontFamily: "var(--font-family-base)", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-lg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
          <Avatar name="Acme Corporation" tone="brand" size="l" />
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            <span style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>Vendors / Acme Corporation</span>
            <span className="t-title-m" style={{ color: "var(--color-text-primary)" }}>Acme Corporation</span>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <Button variant="outline">Edit</Button>
        <Button variant="filled" iconLeft={<I.Workflow />}>Run assessment</Button>
      </div>

      <div style={{ display: "flex", gap: "var(--space-lg)" }}>
        <KPIStatCard title="Overall risk score" value="4.2" delta="0.4" invertDelta sub="rose this quarter" />
        <KPIStatCard title="Open issues" value="12" sub="4 critical" />
        <KPIStatCard title="Last assessment" value="Mar 14" sub="quarterly cadence" />
        <KPIStatCard title="Compliance" value="87%" delta="5" sub="controls passing" />
      </div>

      <Tabs value="overview" onChange={() => {}} items={[
        { id: "overview", label: "Overview" }, { id: "risk", label: "Risk assessment" },
        { id: "docs", label: "Documents", count: 18 }, { id: "activity", label: "Activity" },
      ]} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3xl)" }}>
        <Card title="Risk profile">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: "var(--space-2xl)", flexWrap: "wrap" }}>
            <Gauge level="High" score={4.2} />
            <RAGField label="Inherent risk" level="High" value="High risk" />
          </div>
        </Card>
        <Card title="Due diligence">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
            <DD label="Security review" progress={100} state="Success" />
            <DD label="Financial review" progress={75} state="Default" />
            <DD label="Compliance check" progress={40} state="Error" />
            <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap", marginTop: "var(--space-sm)" }}>
              <Tag color="success" dot>SOC 2</Tag><Tag color="success" dot>ISO 27001</Tag><Tag color="warning" dot>GDPR pending</Tag>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Record details">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-2xl)" }}>
          <Detail label="Category"><Badge color="info" size="m">Cloud services</Badge></Detail>
          <Detail label="Region">United States</Detail>
          <Detail label="Tier"><Badge color="danger" size="m">Critical</Badge></Detail>
          <Detail label="Status"><ProcessStatus status="Approved" /></Detail>
          <Detail label="Owner"><Avatar name="Dana Whitfield" tone="brand" size="s" /> Dana Whitfield</Detail>
          <Detail label="Contract value">$1.2M / year</Detail>
          <Detail label="Renewal">Dec 31, 2026</Detail>
          <Detail label="Contact">security@acme.com</Detail>
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <SectionHeader action={<Button variant="text" size="s">View all</Button>}>Open issues</SectionHeader>
        <Table columns={cols} rows={ISSUES} rowKey="id" />
        <Pagination type="simple" page={1} pageSize={3} total={12} onPage={() => {}} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<VendorDetailTemplate />);
