// Top-level app: routes between Home, Vendors list, Vendor detail; click-thru prototype.

function App() {
  const [route, setRoute] = React.useState({ name: 'dashboard' });
  const [active, setActive] = React.useState('dashboard');
  const [addOpen, setAddOpen] = React.useState(false);
  const [approveOpen, setApproveOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const LABELS = { workflows: 'Workflows', records: 'Records', changes: 'Change Requests' };
  const onNav = (id) => {
    setActive(id);
    if (id === 'dashboard') setRoute({ name: 'dashboard' });
    else if (id === 'vendors') setRoute({ name: 'vendors' });
    else setRoute({ name: 'placeholder', label: LABELS[id] || id });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  return (
    <AppShell active={active} onNav={onNav} user={{ initials: 'JS', name: 'Jamie Souza' }}>
      {route.name === 'dashboard' && <HomeDashboard />}
      {route.name === 'vendors' && (
        <VendorsList
          onOpenVendor={(v) => setRoute({ name: 'vendor', vendor: v })}
          onAddVendor={() => setAddOpen(true)}
        />
      )}
      {route.name === 'vendor' && (
        <VendorDetail
          vendor={route.vendor}
          onBack={() => setRoute({ name: 'vendors' })}
          onApprove={() => setApproveOpen(true)}
        />
      )}
      {route.name === 'placeholder' && (
        <div className="ck-page">
          <h1 className="ck-page-title" style={{ textTransform: 'capitalize' }}>{route.label}</h1>
          <Card style={{ marginTop: 20 }}>
            <div className="ck-empty">
              <div className="ck-empty-title">This surface is not part of the kit yet</div>
              <div className="ck-empty-desc">Use Dashboard or Vendors to see the click-thru prototype.</div>
            </div>
          </Card>
        </div>
      )}

      <Dialog
        open={addOpen}
        title="Add new vendor"
        description="Enter the vendor's basic information. You can complete onboarding details later."
        onClose={() => setAddOpen(false)}
        secondary={<Button variant="text" tone="neutral" onClick={() => setAddOpen(false)}>Cancel</Button>}
        primary={<Button variant="filled" tone="brand" onClick={() => { setAddOpen(false); showToast('Vendor draft created.'); }}>Create draft</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Legal name</div>
            <Field placeholder="e.g. Acme Logistics, Inc." style={{ width: '100%' }} />
          </label>
          <label>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Primary contact email</div>
            <Field placeholder="contact@vendor.com" style={{ width: '100%' }} />
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Tier</div>
              <Field placeholder="Tier 2" style={{ width: '100%' }} trailingIcon={<I.Caret />} />
            </label>
            <label>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 4 }}>Region</div>
              <Field placeholder="North America" style={{ width: '100%' }} trailingIcon={<I.Caret />} />
            </label>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={approveOpen}
        title="Approve this vendor?"
        description="The requester will be notified and the workflow will advance to onboarding."
        onClose={() => setApproveOpen(false)}
        secondary={<Button variant="text" tone="neutral" onClick={() => setApproveOpen(false)}>Cancel</Button>}
        primary={<Button variant="filled" tone="brand" onClick={() => { setApproveOpen(false); showToast('Vendor approved.'); }}>Approve</Button>}
      >
        <p style={{ margin: 0 }}>
          A confirmation email will be sent to <strong>jamie@certa.com</strong>. You can revoke approval within 24 hours.
        </p>
      </Dialog>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--color-bg-success-subtle)', border: '1px solid var(--color-status-success-fg)', color: 'var(--color-status-success-fg)', padding: '12px 16px', borderRadius: 8, boxShadow: 'var(--shadow-md)', fontSize: 13, fontWeight: 500 }}>
            <I.Check /> {toast}
          </div>
        </div>
      )}
    </AppShell>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
