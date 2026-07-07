/* Vendors List — DETERMINISTIC reference template, composed 1:1 from the kit.
   KPIStatCard row (invertDelta on risk), Tabs+counts, Input search + FilterChips,
   multi-select Table (Avatar/Tag/ProcessStatus/risk meter/owner), Pagination.
   No emoji, no hand-rolled divs. Global-scope (window kit). */

const RAG = { low: "var(--color-rag-low-base)", medium: "var(--color-rag-medium-base)", high: "var(--color-rag-high-base)" };
const VENDORS = [
  { id: 1, name: "Acme Corporation", region: "United States", tier: "Critical", tierColor: "danger", status: "Approved", score: 4.2, level: "high", owner: "Dana Whitfield", tone: "brand", updated: "2 days ago" },
  { id: 2, name: "Globex Industries", region: "Germany", tier: "High", tierColor: "warning", status: "In Review", score: 3.1, level: "medium", owner: "Marcus Lee", tone: "teal", updated: "5 hours ago" },
  { id: 3, name: "Initech Systems", region: "United Kingdom", tier: "Medium", tierColor: "info", status: "Approved", score: 1.8, level: "low", owner: "Priya Nair", tone: "green", updated: "1 week ago" },
  { id: 4, name: "Umbrella Logistics", region: "France", tier: "Critical", tierColor: "danger", status: "Action Needed", score: 4.7, level: "high", owner: "Tomás Vidal", tone: "orange", updated: "Yesterday" },
  { id: 5, name: "Soylent Foods", region: "Spain", tier: "Low", tierColor: "neutral", status: "Draft", score: 1.2, level: "low", owner: "Aisha Karim", tone: "neutral", updated: "3 weeks ago" },
];

function RiskMeter({ score, level }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)" }}>
      <span style={{ width: 64, height: 6, borderRadius: "var(--radius-full)", background: "var(--color-bg-muted)", overflow: "hidden", display: "inline-block" }}>
        <span style={{ display: "block", width: (score / 5 * 100) + "%", height: "100%", background: RAG[level] }} />
      </span>
      <span style={{ fontSize: "var(--font-body-size)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{score.toFixed(1)}</span>
    </span>
  );
}

function VendorsListTemplate() {
  const selected = [2, 4];
  const cols = [
    { key: "sel", width: 44, label: <Checkbox checked={false} indeterminate onChange={() => {}} />, render: (r) => <Checkbox checked={selected.includes(r.id)} onChange={() => {}} /> },
    { key: "vendor", label: "Vendor", render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-lg)" }}>
        <Avatar name={r.name} tone={r.tone} size="m" />
        <span style={{ display: "inline-flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{r.name}</span>
          <span style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>{r.region}</span>
        </span>
      </span>) },
    { key: "tier", label: "Tier", render: (r) => <Tag color={r.tierColor} dot>{r.tier}</Tag> },
    { key: "status", label: "Status", render: (r) => <ProcessStatus status={r.status} /> },
    { key: "risk", label: "Risk score", width: 160, render: (r) => <RiskMeter score={r.score} level={r.level} /> },
    { key: "owner", label: "Owner", render: (r) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-md)" }}>
        <Avatar name={r.owner} tone={r.tone} size="s" /><span style={{ color: "var(--color-text-primary)" }}>{r.owner}</span>
      </span>) },
    { key: "updated", label: "Updated", align: "right", render: (r) => <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-caption-size)" }}>{r.updated}</span> },
  ];
  return (
    <div style={{ padding: "var(--space-3xl)", display: "flex", flexDirection: "column", gap: "var(--space-3xl)", background: "var(--color-bg-page)", fontFamily: "var(--font-family-base)", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-lg)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <span style={{ fontSize: "var(--font-caption-size)", color: "var(--color-text-secondary)" }}>Vendors</span>
          <span className="t-title-m" style={{ color: "var(--color-text-primary)" }}>All vendors</span>
        </div>
        <div style={{ flex: 1 }} />
        <Button variant="outline" iconLeft={<I.Download />}>Export</Button>
        <Button variant="filled" iconLeft={<I.Plus />}>Add vendor</Button>
      </div>

      <div style={{ display: "flex", gap: "var(--space-lg)" }}>
        <KPIStatCard title="Active vendors" value="248" delta="6" sub="vs last quarter" />
        <KPIStatCard title="Pending review" value="12" delta="-4" invertDelta sub="down this week" />
        <KPIStatCard title="High-risk" value="9" delta="2" invertDelta sub="needs attention" />
        <KPIStatCard title="Avg risk score" value="2.7" delta="-0.3" invertDelta sub="improving" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
        <Tabs value="all" onChange={() => {}} items={[
          { id: "all", label: "All", count: 248 }, { id: "review", label: "In review", count: 12 },
          { id: "approved", label: "Approved", count: 221 }, { id: "drafts", label: "Drafts", count: 15 },
        ]} />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
          <div style={{ width: 280 }}><Input leadingIcon={<I.Search />} placeholder="Filter vendors…" size="s" /></div>
          <FilterChip icon={<I.Caret />}>Region</FilterChip>
          <FilterChip icon={<I.Caret />} selected count={2}>Tier</FilterChip>
          <div style={{ flex: 1 }} />
          <Button variant="outline" size="s" iconLeft={<I.Sort />}>Sort</Button>
        </div>
        <Table columns={cols} rows={VENDORS} rowKey="id" selectedKeys={selected} />
        <Pagination type="numbered" page={1} pageSize={5} total={248} onPage={() => {}} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<VendorsListTemplate />);
