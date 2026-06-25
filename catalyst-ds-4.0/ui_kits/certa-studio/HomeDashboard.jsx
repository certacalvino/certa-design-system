// Page: Vendor Risk Overview (TPRM dashboard)

function HomeDashboard() {
  const activity = [
    { vendor: 'Acme Logistics, Inc.', tone: 'brand',   action: 'Risk assessment approved',       status: 'approved', date: '2h ago' },
    { vendor: 'Bluebird Cloud Services', tone: 'teal',  action: 'SOC 2 verification requested',    status: 'review',   date: 'Yesterday' },
    { vendor: 'Northwind Parts Co.', tone: 'orange',    action: 'Onboarding rejected — findings',  status: 'rejected', date: 'Mar 24' },
    { vendor: 'Sunrise Diagnostics', tone: 'green',     action: 'Annual review started',           status: 'review',   date: 'Mar 22' },
    { vendor: 'Helio Energy Co.', tone: 'neutral',      action: 'Added to vendor register',        status: 'draft',    date: 'Mar 21' },
  ];
  const statusTag = (s) => ({
    approved: <Tag color="success" dot>Approved</Tag>,
    review:   <Tag color="warning" dot>In review</Tag>,
    rejected: <Tag color="danger" dot>Rejected</Tag>,
    draft:    <Tag color="info" dot>Draft</Tag>,
  }[s]);

  return (
    <div className="ck-page">
      <div className="ck-page-head">
        <div>
          <h1 className="ck-page-title">Vendor Risk Overview</h1>
          <div className="ck-page-sub">Monitor third-party risk across your supplier base.</div>
        </div>
        <div className="ck-page-actions">
          <Button variant="outline" tone="neutral" leadingIcon={<I.Calendar />}>Last 30 days</Button>
        </div>
      </div>

      <div className="ck-stats">
        <div className="ck-stat"><div className="ck-stat-label">Total Vendors</div><div className="ck-stat-value">248</div><div className="ck-stat-delta up">▲ 12 this month</div></div>
        <div className="ck-stat"><div className="ck-stat-label">High Risk</div><div className="ck-stat-value" style={{ color: 'var(--color-status-danger-fg)' }}>3</div><div className="ck-stat-delta bad">▲ 1 new</div></div>
        <div className="ck-stat"><div className="ck-stat-label">Pending Reviews</div><div className="ck-stat-value">17</div><div className="ck-stat-delta good">▼ 4 vs last week</div></div>
        <div className="ck-stat"><div className="ck-stat-label">Compliance Score</div><div className="ck-stat-value">92%</div><div className="ck-stat-delta up">▲ 1 pt</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card title="Recent vendor activity" action={<Button variant="text" tone="brand" size="sm">View all</Button>} padded={false}>
          <table className="ck-table">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Activity</th>
                <th style={{ minWidth: 110 }}>Status</th>
                <th style={{ textAlign: 'right' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((a, i) => (
                <tr key={i} style={{ cursor: 'default' }}>
                  <td>
                    <div className="ck-vendor-cell">
                      <span className={`ck-avatar ck-avatar-sm ck-avatar-${a.tone}`}>{a.vendor.slice(0, 1)}</span>
                      <span className="ck-name">{a.vendor}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{a.action}</td>
                  <td>{statusTag(a.status)}</td>
                  <td style={{ textAlign: 'right', color: 'var(--color-text-secondary)', fontSize: 12 }}>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card title="Risk distribution">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Low', count: 198, pct: 80, tone: 'low' },
                { label: 'Medium', count: 47, pct: 19, tone: 'medium' },
                { label: 'High', count: 3, pct: 1, tone: 'high' },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    <span>{r.label}</span><span>{r.count}</span>
                  </div>
                  <div className="ck-meter" style={{ marginTop: 4 }}>
                    <div className={`ck-meter-fill ck-risk-${r.tone}`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Upcoming renewals">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              {[
                { v: 'Parker & Sons Mfg.', d: 'Apr 7, 2026' },
                { v: 'Sunrise Diagnostics', d: 'Apr 14, 2026' },
                { v: 'Acme Logistics', d: 'Apr 22, 2026' },
              ].map(r => (
                <div key={r.v} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <I.Calendar style={{ color: 'var(--color-text-secondary)' }} />
                  <span style={{ flex: 1 }}>{r.v}</span>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{r.d}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

window.HomeDashboard = HomeDashboard;
