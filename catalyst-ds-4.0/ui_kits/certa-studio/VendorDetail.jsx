// Page: Vendor detail — Overview / Documents / Assessment (DS 4.0 TPRM).

function RiskBadge({ level }) {
  const map = { high: 'High risk', medium: 'Medium risk', low: 'Low risk' };
  const lvl = map[level] ? level : 'high';
  return <span className={`ck-riskbadge ck-riskbadge-${lvl}`}>{map[lvl]}</span>;
}

function RoField({ label, value }) {
  return (
    <div className="ck-ro-field">
      <span className="ck-ro-label">{label}</span>
      <span className="ck-ro-value">{value}</span>
    </div>
  );
}

function SplitButton({ children, onClick }) {
  return (
    <span className="ck-split">
      <button className="ck-split-main" onClick={onClick}>{children}</button>
      <button className="ck-split-trigger" aria-label="More save options"><I.Caret /></button>
    </span>
  );
}

function VendorDetail({ vendor, onBack, onApprove }) {
  const v = vendor || { name: 'Acme Logistics, Inc.', region: 'North America', tier: 'Tier 1', status: 'review', risk: 'high' };
  const [tab, setTab] = React.useState('overview');

  const statusTag = ({
    approved: <Tag tone="green" dot>Approved</Tag>,
    review:   <Tag tone="orange" dot>In review</Tag>,
    rejected: <Tag tone="red" dot>Rejected</Tag>,
    draft:    <Tag tone="teal" dot>Draft</Tag>,
  })[v.status] || <Tag tone="orange" dot>In review</Tag>;

  return (
    <div className="ck-page">
      <div className="ck-page-head">
        <div>
          <div className="ck-breadcrumb">
            <a href="#" onClick={(e) => { e.preventDefault(); onBack?.(); }}>Home</a>
            <span className="sep">/</span>
            <a href="#" onClick={(e) => { e.preventDefault(); onBack?.(); }}>Vendors</a>
            <span className="sep">/</span>
            <span>{v.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 className="ck-page-title">{v.name}</h1>
            <RiskBadge level={v.risk} />
            {statusTag}
          </div>
          <div className="ck-page-sub">{v.region} · ID VND-2041 · Onboarded Jan 2026</div>
        </div>
        <div className="ck-page-actions">
          <Button variant="outline" tone="neutral">Request docs</Button>
          <SplitButton onClick={() => {}}>Save draft</SplitButton>
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
            { id: 'assessment', label: 'Assessment' },
          ]}
        />
      </div>

      {tab === 'overview' && (
        <div className="ck-detail-grid" style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Company profile">
              <div className="ck-ro-grid">
                <RoField label="Company name" value={v.name} />
                <RoField label="Website" value="acmelogistics.com" />
                <RoField label="Country" value="United States" />
                <RoField label="Business type" value="Logistics & shipping" />
              </div>
              <div style={{ marginTop: 20 }}>
                <div className="ck-ro-label" style={{ marginBottom: 8 }}>Certifications</div>
                <div className="ck-pills">
                  <span className="ck-pill">ISO 27001</span>
                  <span className="ck-pill">SOC 2 Type II</span>
                  <span className="ck-pill">GDPR</span>
                  <span className="ck-pill">PCI DSS</span>
                </div>
              </div>
            </Card>

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
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Risk score">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>76</span>
                <RiskBadge level={v.risk} />
              </div>
              <div className="ck-meter" style={{ marginTop: 12 }}>
                <div className={`ck-meter-fill ck-risk-${v.risk || 'high'}`} style={{ width: '76%' }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 8 }}>
                Last assessed Mar 18, 2026 by Michael Kim
              </div>
            </Card>

            <Card title="Details">
              <div className="ck-meta-row"><div className="ck-meta-label">Vendor ID</div><div className="ck-meta-value">VND-2041</div></div>
              <div className="ck-meta-row"><div className="ck-meta-label">Tier</div><div className="ck-meta-value">{v.tier}</div></div>
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
        <Card style={{ marginTop: 20 }} title="Documents" action={<Button variant="outline" tone="brand" size="sm" leadingIcon={<I.Upload />}>Upload</Button>}>
          <div className="ck-dropzone" style={{ marginBottom: 16 }}>
            <I.Upload style={{ color: 'var(--color-text-secondary)' }} />
            <div className="ck-dz-title">Drag files here or <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--color-action-primary)' }}>browse</a></div>
            <div className="ck-dz-meta">PDF, DOCX up to 25 MB</div>
          </div>
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
      )}

      {tab === 'assessment' && (
        <Card style={{ marginTop: 20 }} title="Risk assessment" action={<Button variant="text" tone="brand" size="sm">View all</Button>}>
          <div className="ck-activity">
            <div className="ck-activity-item">
              <Avatar initials="MK" size="sm" tone="teal" />
              <div>
                <div className="ck-activity-text"><strong>Michael Kim</strong> scored <strong>Security &amp; access</strong> — 18 / 20</div>
                <div className="ck-activity-time">Mar 18, 2026</div>
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
                <div className="ck-activity-text"><strong>Alex Singh</strong> flagged <strong>Risk question 12</strong> for follow-up</div>
                <div className="ck-activity-time">Mar 23</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

window.VendorDetail = VendorDetail;
