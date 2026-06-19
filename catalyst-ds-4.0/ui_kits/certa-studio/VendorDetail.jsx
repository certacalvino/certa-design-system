// Page: Vendor detail with tabs, activity, documents, workflow stepper.

function VendorDetail({ vendor, onBack, onApprove }) {
  const v = vendor || { name: 'Acme Logistics, Inc.', region: 'North America', tier: 'Tier 1', status: 'review' };
  const [tab, setTab] = React.useState('overview');

  return (
    <div className="ck-page">
      <div className="ck-page-head">
        <div>
          <div className="ck-breadcrumb">
            <a href="#" onClick={(e) => { e.preventDefault(); onBack?.(); }}>Vendors</a>
            <span className="sep">/</span>
            <span>{v.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 className="ck-page-title">{v.name}</h1>
            <Tag tone="orange" dot>In review</Tag>
            <Tag tone="purple">{v.tier}</Tag>
          </div>
          <div className="ck-page-sub">{v.region} · ID VND-2041 · Onboarded Jan 2026</div>
        </div>
        <div className="ck-page-actions">
          <Button variant="outline" tone="neutral">Request docs</Button>
          <Button variant="outline" tone="red">Reject</Button>
          <Button variant="filled" tone="brand" onClick={onApprove}>Approve</Button>
        </div>
      </div>

      <Alert tone="warning" icon={<I.Warn style={{ color: 'var(--color-status-warning-fg)' }} />}>
        <strong>3 documents</strong> are due within 7 days — SOC 2 attestation expires Apr 7, 2026.
        <span style={{ marginLeft: 8 }}><Button variant="text" tone="brand" size="sm">Review</Button></span>
      </Alert>

      <div style={{ marginTop: 20 }}>
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { id: 'overview', label: 'Overview' },
            { id: 'documents', label: 'Documents', count: 12 },
            { id: 'risks', label: 'Risks', count: 3 },
            { id: 'activity', label: 'Activity' },
            { id: 'settings', label: 'Settings' },
          ]}
        />
      </div>

      {tab === 'overview' && (
        <div className="ck-detail-grid" style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Workflow progress">
              <div className="ck-stepper">
                <div className="ck-step done"><span className="ck-step-bullet">✓</span><span className="ck-step-label">Submitted</span></div>
                <div className="ck-step-line done" />
                <div className="ck-step done"><span className="ck-step-bullet">✓</span><span className="ck-step-label">Documents</span></div>
                <div className="ck-step-line done" />
                <div className="ck-step active"><span className="ck-step-bullet">3</span><span className="ck-step-label">Risk assessment</span></div>
                <div className="ck-step-line" />
                <div className="ck-step todo"><span className="ck-step-bullet">4</span><span className="ck-step-label">Approval</span></div>
                <div className="ck-step-line" />
                <div className="ck-step todo"><span className="ck-step-bullet">5</span><span className="ck-step-label">Onboarded</span></div>
              </div>
            </Card>

            <Card title="Recent activity" action={<Button variant="text" tone="brand" size="sm">View all</Button>}>
              <div className="ck-activity">
                <div className="ck-activity-item">
                  <Avatar initials="PR" size="sm" />
                  <div>
                    <div className="ck-activity-text"><strong>Priya Rao</strong> uploaded <strong>Vendor agreement v3.2</strong></div>
                    <div className="ck-activity-time">2 hours ago</div>
                  </div>
                </div>
                <div className="ck-activity-item">
                  <Avatar initials="MK" size="sm" tone="teal" />
                  <div>
                    <div className="ck-activity-text"><strong>Michael Kim</strong> assigned risk owner: <strong>Compliance team</strong></div>
                    <div className="ck-activity-time">Yesterday at 4:12 PM</div>
                  </div>
                </div>
                <div className="ck-activity-item">
                  <span className="ck-avatar ck-avatar-sm" style={{ background: 'var(--color-status-success-fg)' }}><I.Check style={{ color: '#fff', width: 12, height: 12 }} /></span>
                  <div>
                    <div className="ck-activity-text">SOC 2 Type II attestation <strong>verified</strong></div>
                    <div className="ck-activity-time">Mar 24</div>
                  </div>
                </div>
                <div className="ck-activity-item">
                  <Avatar initials="AS" size="sm" tone="orange" />
                  <div>
                    <div className="ck-activity-text"><strong>Alex Singh</strong> commented on <strong>Risk question 12</strong></div>
                    <div className="ck-activity-time">Mar 23</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Required documents" action={<Button variant="outline" tone="brand" size="sm" leadingIcon={<I.Upload />}>Upload</Button>}>
              <div className="ck-doc-row">
                <span className="ck-doc-icon"><I.Doc /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>SOC 2 Type II Report.pdf</div>
                  <div className="ck-doc-meta">Verified · 4.2 MB · Uploaded by Priya Rao</div>
                </div>
                <Tag tone="green" dot>Verified</Tag>
                <IconButton label="More"><I.More /></IconButton>
              </div>
              <div className="ck-doc-row">
                <span className="ck-doc-icon"><I.Doc /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>ISO 27001 Certificate.pdf</div>
                  <div className="ck-doc-meta">Pending review · 1.1 MB</div>
                </div>
                <Tag tone="orange" dot>Pending</Tag>
                <IconButton label="More"><I.More /></IconButton>
              </div>
              <div className="ck-doc-row">
                <span className="ck-doc-icon" style={{ background: 'var(--color-status-danger-bg)', color: 'var(--color-status-danger-fg)' }}><I.Doc /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>Cyber insurance certificate</div>
                  <div className="ck-doc-meta" style={{ color: 'var(--color-status-danger-fg)' }}>Expired Mar 12, 2026 — request renewal</div>
                </div>
                <Tag tone="red" dot>Expired</Tag>
                <IconButton label="More"><I.More /></IconButton>
              </div>
            </Card>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Risk score">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>76</span>
                <Tag tone="orange">Medium</Tag>
              </div>
              <div className="ck-meter" style={{ marginTop: 12 }}>
                <div className="ck-meter-fill ck-risk-medium" style={{ width: '76%' }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 8 }}>
                Last assessed Mar 18, 2026 by Michael Kim
              </div>
            </Card>

            <Card title="Details">
              <div className="ck-meta-row"><div className="ck-meta-label">Vendor ID</div><div className="ck-meta-value">VND-2041</div></div>
              <div className="ck-meta-row"><div className="ck-meta-label">Category</div><div className="ck-meta-value">Logistics & shipping</div></div>
              <div className="ck-meta-row"><div className="ck-meta-label">HQ</div><div className="ck-meta-value">Boston, MA · USA</div></div>
              <div className="ck-meta-row"><div className="ck-meta-label">Spend YTD</div><div className="ck-meta-value">$2.4M</div></div>
              <div className="ck-meta-row"><div className="ck-meta-label">Renewal</div><div className="ck-meta-value">Jan 14, 2027</div></div>
              <div className="ck-meta-row"><div className="ck-meta-label">Owner</div>
                <div className="ck-meta-value" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Avatar initials="PR" size="sm" /> Priya Rao
                </div>
              </div>
            </Card>

            <Card title="Reviewers">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar initials="MK" size="sm" tone="teal" />
                  <div style={{ flex: 1, fontSize: 13 }}>Michael Kim<div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Compliance lead</div></div>
                  <Tag tone="green" dot>Approved</Tag>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar initials="AS" size="sm" tone="orange" />
                  <div style={{ flex: 1, fontSize: 13 }}>Alex Singh<div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Security</div></div>
                  <Tag tone="orange" dot>Pending</Tag>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar initials="EL" size="sm" tone="green" />
                  <div style={{ flex: 1, fontSize: 13 }}>Elena Lopez<div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Procurement</div></div>
                  <Tag tone="neutral" dot>Not started</Tag>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      )}

      {tab === 'documents' && (
        <Card style={{ marginTop: 20 }} title="All documents" action={<Button variant="filled" tone="brand" size="sm" leadingIcon={<I.Upload />}>Upload</Button>}>
          <div className="ck-empty">
            <div className="ck-empty-title">12 documents on file</div>
            <div className="ck-empty-desc">Switch to the Overview tab to see required documents at a glance.</div>
          </div>
        </Card>
      )}
      {tab === 'risks' && (
        <Card style={{ marginTop: 20 }} title="Risk findings">
          <div className="ck-empty">
            <div className="ck-empty-title">3 open risks</div>
            <div className="ck-empty-desc">Risk detail view connects to your assessment workflow.</div>
          </div>
        </Card>
      )}
      {tab === 'activity' && (
        <Card style={{ marginTop: 20 }} title="Activity timeline">
          <div className="ck-empty">
            <div className="ck-empty-title">Full activity log</div>
            <div className="ck-empty-desc">Filter by user, action, or document.</div>
          </div>
        </Card>
      )}
      {tab === 'settings' && (
        <Card style={{ marginTop: 20 }} title="Vendor settings">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Switch checked label="Auto-renew documents 30 days before expiry" />
            <Switch label="Notify owner on risk score change" />
            <Switch checked label="Include in quarterly board report" />
          </div>
        </Card>
      )}
    </div>
  );
}

window.VendorDetail = VendorDetail;
