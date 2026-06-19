// Page: Vendors list (table view)

function VendorsList({ onOpenVendor, onAddVendor }) {
  const [tab, setTab] = React.useState('all');
  const [selected, setSelected] = React.useState(new Set());
  const [filter, setFilter] = React.useState('');

  const vendors = [
    { id: 'acme',   name: 'Acme Logistics, Inc.',   region: 'North America', tier: 'Tier 1', status: 'approved',  risk: 'low',    riskScore: 94, owner: 'PR', updated: '2h ago' },
    { id: 'blue',   name: 'Bluebird Cloud Services', region: 'EU',            tier: 'Tier 2', status: 'review',    risk: 'medium', riskScore: 76, owner: 'MK', updated: 'Yesterday' },
    { id: 'north',  name: 'Northwind Parts Co.',    region: 'North America', tier: 'Tier 1', status: 'rejected',  risk: 'high',   riskScore: 42, owner: 'AS', updated: 'Mar 24' },
    { id: 'helio',  name: 'Helio Energy Co.',       region: 'APAC',          tier: 'Tier 3', status: 'draft',     risk: 'low',    riskScore: 88, owner: 'EL', updated: 'Mar 22' },
    { id: 'parker', name: 'Parker & Sons Mfg.',     region: 'North America', tier: 'Tier 2', status: 'approved',  risk: 'medium', riskScore: 71, owner: 'DC', updated: 'Mar 21' },
    { id: 'sunrise',name: 'Sunrise Diagnostics',    region: 'EU',            tier: 'Tier 1', status: 'review',    risk: 'low',    riskScore: 90, owner: 'RM', updated: 'Mar 20' },
  ];

  const filtered = vendors.filter(v => {
    if (tab !== 'all' && v.status !== tab) return false;
    if (filter && !v.name.toLowerCase().includes(filter.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: vendors.length,
    approved: vendors.filter(v => v.status === 'approved').length,
    review: vendors.filter(v => v.status === 'review').length,
    draft: vendors.filter(v => v.status === 'draft').length,
  };

  const statusTag = (s) => ({
    approved: <Tag tone="green" dot>Approved</Tag>,
    review:   <Tag tone="orange" dot>In review</Tag>,
    rejected: <Tag tone="red" dot>Rejected</Tag>,
    draft:    <Tag tone="teal" dot>Draft</Tag>,
  }[s]);

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(v => v.id)));
  };
  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  return (
    <div className="ck-page ck-page-wide">
      <div className="ck-page-head">
        <div>
          <div className="ck-breadcrumb">
            <a href="#">Home</a><span className="sep">/</span><span>Vendors</span>
          </div>
          <h1 className="ck-page-title">Vendors</h1>
          <div className="ck-page-sub">Onboard, review, and manage your supplier base.</div>
        </div>
        <div className="ck-page-actions">
          <Button variant="outline" tone="neutral" leadingIcon={<I.Download />}>Export</Button>
          <Button variant="filled" tone="brand" leadingIcon={<I.Plus />} onClick={onAddVendor}>Add vendor</Button>
        </div>
      </div>

      <div className="ck-stats">
        <div className="ck-stat">
          <div className="ck-stat-label">Active vendors</div>
          <div className="ck-stat-value">248</div>
          <div className="ck-stat-delta up">▲ 12 this month</div>
        </div>
        <div className="ck-stat">
          <div className="ck-stat-label">Pending review</div>
          <div className="ck-stat-value">17</div>
          <div className="ck-stat-delta down">▼ 4 vs last week</div>
        </div>
        <div className="ck-stat">
          <div className="ck-stat-label">High-risk</div>
          <div className="ck-stat-value" style={{ color: 'var(--color-status-danger-fg)' }}>3</div>
          <div className="ck-stat-delta up">▲ 1 new</div>
        </div>
        <div className="ck-stat">
          <div className="ck-stat-label">Avg. risk score</div>
          <div className="ck-stat-value">81</div>
          <div className="ck-stat-delta up">▲ 2 pts</div>
        </div>
      </div>

      <Card padded={false}>
        <div style={{ padding: '0 20px' }}>
          <Tabs
            value={tab}
            onChange={setTab}
            items={[
              { id: 'all', label: 'All vendors', count: counts.all },
              { id: 'review', label: 'In review', count: counts.review },
              { id: 'approved', label: 'Approved', count: counts.approved },
              { id: 'draft', label: 'Drafts', count: counts.draft },
            ]}
          />
        </div>
        <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Field
            value={filter}
            onChange={setFilter}
            placeholder="Search vendors…"
            leadingIcon={<I.Search style={{ color: 'var(--color-text-secondary)' }} />}
            style={{ width: 280 }}
          />
          <Button variant="outline" tone="neutral" size="sm" leadingIcon={<I.Filter />}>Region: All</Button>
          <Button variant="outline" tone="neutral" size="sm" leadingIcon={<I.Filter />}>Tier: All</Button>
          <Button variant="text" tone="brand" size="sm">Clear filters</Button>
          <div style={{ flex: 1 }} />
          {selected.size > 0 && (
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {selected.size} selected · <a href="#" onClick={(e) => { e.preventDefault(); setSelected(new Set()); }}>Clear</a>
            </span>
          )}
        </div>
        <table className="ck-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <Checkbox
                  checked={selected.size > 0 && selected.size === filtered.length}
                  indeterminate={selected.size > 0 && selected.size < filtered.length}
                  onChange={toggleAll}
                />
              </th>
              <th>Vendor</th>
              <th style={{ minWidth: 90 }}>Tier</th>
              <th style={{ minWidth: 110 }}>Status</th>
              <th style={{ minWidth: 140 }}>Risk</th>
              <th>Owner</th>
              <th style={{ textAlign: 'right' }}>Updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => (
              <tr
                key={v.id}
                className={selected.has(v.id) ? 'selected' : ''}
                onClick={() => onOpenVendor?.(v)}
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={selected.has(v.id)} onChange={() => toggleOne(v.id)} />
                </td>
                <td>
                  <div className="ck-vendor-cell">
                    <span className={`ck-avatar ck-avatar-${['brand','teal','green','orange','neutral'][v.id.charCodeAt(0) % 5]}`}>{v.name.slice(0,1)}</span>
                    <div>
                      <div className="ck-name">{v.name}</div>
                      <div className="ck-sub">{v.region}</div>
                    </div>
                  </div>
                </td>
                <td><Tag tone={v.tier === 'Tier 1' ? 'purple' : v.tier === 'Tier 2' ? 'blueberry' : 'neutral'}>{v.tier}</Tag></td>
                <td>{statusTag(v.status)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
                    <div className="ck-meter"><div className={`ck-meter-fill ck-risk-${v.risk}`} style={{ width: `${v.riskScore}%` }} /></div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>{v.riskScore}</span>
                  </div>
                </td>
                <td><Avatar initials={v.owner} size="sm" tone={['brand','teal','green','orange','neutral'][v.owner.charCodeAt(0) % 5]} /></td>
                <td style={{ textAlign: 'right', color: 'var(--color-text-secondary)', fontSize: 12 }}>{v.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-bg-muted)', display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--color-text-secondary)' }}>
          <span>Showing {filtered.length} of {vendors.length}</span>
          <div style={{ flex: 1 }} />
          <Button variant="text" tone="neutral" size="sm">Previous</Button>
          <Button variant="text" tone="neutral" size="sm">Next</Button>
        </div>
      </Card>
    </div>
  );
}

window.VendorsList = VendorsList;
