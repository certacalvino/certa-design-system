// Atomic UI primitives: Button, Tag, Badge, Field, Avatar, Tabs, Card, Alert, Dialog.

function Button({ variant = 'filled', tone = 'brand', size = 'md', children, leadingIcon, trailingIcon, disabled, onClick, style }) {
  const cls = [
    'ck-btn',
    `ck-btn-${variant}`,
    `ck-btn-${tone}`,
    size === 'sm' ? 'ck-btn-sm' : '',
    disabled ? 'ck-btn-disabled' : '',
  ].join(' ');
  return (
    <button className={cls} disabled={disabled} onClick={onClick} style={style}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}

function IconButton({ children, onClick, label }) {
  return <button className="ck-icon-btn" onClick={onClick} aria-label={label}>{children}</button>;
}

function Tag({ tone = 'neutral', children, dot }) {
  return (
    <span className={`ck-tag ck-tag-${tone}`}>
      {dot ? <span className="ck-tag-dot" /> : null}
      {children}
    </span>
  );
}

function Badge({ tone = 'red', children, pill }) {
  return <span className={`ck-badge ${pill ? 'ck-badge-pill' : ''} ck-badge-${tone}`}>{children}</span>;
}

function Field({ value, onChange, placeholder, leadingIcon, trailingIcon, error, disabled, type = 'text', style }) {
  return (
    <div className={`ck-field ${error ? 'ck-field-error' : ''} ${disabled ? 'ck-field-disabled' : ''}`} style={style}>
      {leadingIcon}
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
      {trailingIcon}
    </div>
  );
}

function Avatar({ initials, size = 'md', tone = 'brand' }) {
  return <span className={`ck-avatar ck-avatar-${size} ck-avatar-${tone}`}>{initials}</span>;
}

function Tabs({ items, value, onChange }) {
  return (
    <div className="ck-tabs">
      {items.map((it) => (
        <button
          key={it.id}
          className={`ck-tab ${value === it.id ? 'active' : ''}`}
          onClick={() => onChange?.(it.id)}
        >
          {it.label}
          {typeof it.count === 'number' ? <span className="ck-tab-count">{it.count}</span> : null}
        </button>
      ))}
    </div>
  );
}

function Card({ title, action, footer, children, padded = true, style }) {
  return (
    <section className="ck-card" style={style}>
      {title || action ? (
        <header className="ck-card-header">
          {typeof title === 'string' ? <h3 className="ck-card-title">{title}</h3> : title}
          <div className="ck-card-action">{action}</div>
        </header>
      ) : null}
      <div className={padded ? 'ck-card-body' : 'ck-card-body-flush'}>{children}</div>
      {footer ? <footer className="ck-card-footer">{footer}</footer> : null}
    </section>
  );
}

function Alert({ tone = 'info', icon, children, action, onDismiss }) {
  return (
    <div className={`ck-alert ck-alert-${tone}`}>
      {icon ? <span className="ck-alert-icon">{icon}</span> : null}
      <div className="ck-alert-body">{children}</div>
      {action ? <span className="ck-alert-action">{action}</span> : null}
      {onDismiss ? <button className="ck-alert-close" onClick={onDismiss} aria-label="Dismiss"><I.Close /></button> : null}
    </div>
  );
}

function Dialog({ open, title, description, children, primary, secondary, onClose }) {
  if (!open) return null;
  return (
    <div className="ck-scrim" onClick={onClose}>
      <div className="ck-dialog" onClick={(e) => e.stopPropagation()}>
        <header className="ck-dialog-header">
          <div>
            <h2 className="ck-dialog-title">{title}</h2>
            {description ? <p className="ck-dialog-desc">{description}</p> : null}
          </div>
          <button className="ck-icon-btn" onClick={onClose} aria-label="Close"><I.Close /></button>
        </header>
        {children ? <div className="ck-dialog-body">{children}</div> : null}
        <footer className="ck-dialog-footer">
          {secondary}
          {primary}
        </footer>
      </div>
    </div>
  );
}

function Switch({ checked, onChange, label }) {
  return (
    <label className="ck-switch-row">
      <span className={`ck-switch ${checked ? 'on' : ''}`} onClick={() => onChange?.(!checked)} />
      {label ? <span className="ck-switch-label">{label}</span> : null}
    </label>
  );
}

function Checkbox({ checked, onChange, label, indeterminate }) {
  return (
    <label className="ck-cb-row">
      <span
        className={`ck-cb ${checked ? 'checked' : ''} ${indeterminate ? 'indeterminate' : ''}`}
        onClick={() => onChange?.(!checked)}
      />
      {label ? <span className="ck-cb-label">{label}</span> : null}
    </label>
  );
}

Object.assign(window, { Button, IconButton, Tag, Badge, Field, Avatar, Tabs, Card, Alert, Dialog, Switch, Checkbox });
