// Certa Platform app shell: top app bar + left sidebar.

function Sidebar({ active, onNav }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', Icon: I.Home },
    { id: 'vendors', label: 'Vendors', Icon: I.Vendors },
    { id: 'workflows', label: 'Workflows', Icon: I.Workflow },
    { id: 'records', label: 'Records', Icon: I.Reports },
    { id: 'changes', label: 'Change Requests', Icon: I.Tasks },
  ];
  return (
    <aside className="ck-sidebar">
      <div className="ck-sidebar-section">
        {items.map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            className={`ck-nav-item ${active === id ? 'active' : ''}`}
            onClick={() => onNav?.(id)}
          >
            <Icon />
            <span className="ck-nav-label">{label}</span>
            {badge ? <span className="ck-nav-badge">{badge}</span> : null}
          </button>
        ))}
      </div>
      <div className="ck-sidebar-footer">
        <button className="ck-nav-item"><I.Settings /><span className="ck-nav-label">Settings</span></button>
        <button className="ck-nav-item"><I.Help /><span className="ck-nav-label">Help & support</span></button>
      </div>
    </aside>
  );
}

function TopBar({ user }) {
  return (
    <header className="ck-topbar">
      <div className="ck-topbar-brand">
        <I.Logo />
        <span className="ck-wordmark">Certa Platform</span>
      </div>
      <div className="ck-topbar-search">
        <div className="ck-field">
          <I.Search style={{ color: 'var(--color-text-secondary)' }} />
          <input placeholder="Search vendors, workflows, documents…" />
          <span className="ck-kbd">⌘K</span>
        </div>
      </div>
      <div className="ck-topbar-right">
        <button className="ck-icon-btn"><I.Help /></button>
        <button className="ck-icon-btn">
          <I.Bell />
          <span className="ck-icon-dot" />
        </button>
        <div className="ck-user">
          <span className="ck-avatar ck-avatar-brand">{user?.initials || 'JS'}</span>
          <span className="ck-user-name">{user?.name || 'Jamie Souza'}</span>
          <I.Caret style={{ color: 'var(--color-text-secondary)' }} />
        </div>
      </div>
    </header>
  );
}

function AppShell({ children, active, onNav, user }) {
  return (
    <div className="ck-app">
      <TopBar user={user} />
      <div className="ck-body">
        <Sidebar active={active} onNav={onNav} />
        <main className="ck-main">{children}</main>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, TopBar, AppShell });
