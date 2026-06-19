// Page: Home dashboard

function HomeDashboard() {
  return (
    <div className="ck-page">
      <div className="ck-page-head">
        <div>
          <h1 className="ck-page-title">Good afternoon, Jamie</h1>
          <div className="ck-page-sub">You have 5 open tasks and 2 vendors awaiting your review.</div>
        </div>
        <div className="ck-page-actions">
          <Button variant="outline" tone="neutral" leadingIcon={<I.Calendar />}>Last 30 days</Button>
        </div>
      </div>

      <div className="ck-stats">
        <div className="ck-stat"><div className="ck-stat-label">Open tasks</div><div className="ck-stat-value">5</div><div className="ck-stat-delta down">▼ 3 since yesterday</div></div>
        <div className="ck-stat"><div className="ck-stat-label">Awaiting review</div><div className="ck-stat-value">2</div><div className="ck-stat-delta up">▲ 1 new today</div></div>
        <div className="ck-stat"><div className="ck-stat-label">SLA compliance</div><div className="ck-stat-value">98%</div><div className="ck-stat-delta up">▲ 1 pt</div></div>
        <div className="ck-stat"><div className="ck-stat-label">Spend reviewed</div><div className="ck-stat-value">$8.2M</div><div className="ck-stat-delta up">▲ $1.1M</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <Card title="Your tasks" action={<Button variant="text" tone="brand" size="sm">View all</Button>}>
          <div className="ck-activity">
            {[
              { vendor: 'Acme Logistics, Inc.', task: 'Approve risk assessment', due: 'Due today', tone: 'orange' },
              { vendor: 'Bluebird Cloud Services', task: 'Verify SOC 2 attestation', due: 'Due tomorrow', tone: 'orange' },
              { vendor: 'Northwind Parts Co.', task: 'Re-onboard after rejection', due: 'In 3 days', tone: 'neutral' },
              { vendor: 'Sunrise Diagnostics', task: 'Annual review', due: 'In 7 days', tone: 'neutral' },
              { vendor: 'Helio Energy Co.', task: 'Initial review', due: 'In 14 days', tone: 'neutral' },
            ].map((t, i) => (
              <div key={i} className="ck-activity-item" style={{ gridTemplateColumns: '24px 1fr auto' }}>
                <Checkbox />
                <div>
                  <div className="ck-activity-text"><strong>{t.task}</strong> · {t.vendor}</div>
                  <div className="ck-activity-time">Workflow: Vendor onboarding</div>
                </div>
                <Tag tone={t.tone} dot>{t.due}</Tag>
              </div>
            ))}
          </div>
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
