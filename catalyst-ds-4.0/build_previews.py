#!/usr/bin/env python3
"""Generate the 34 Certa DS 4.0 component preview pages.

Each page is a standalone HTML file that links ../colors_and_type.css so every
rendered swatch resolves to the real semantic tokens. Pure markup — no JS deps.
"""
import os

OUT = os.path.join(os.path.dirname(__file__), "preview")
os.makedirs(OUT, exist_ok=True)

# --- shared shell ----------------------------------------------------------
def page(slug, title, blurb, body):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Certa DS 4.0 — {title}</title>
<link rel="stylesheet" href="../colors_and_type.css">
<style>
  body {{ padding: var(--space-4xl); background: var(--color-bg-subtle); }}
  .pv-head {{ margin-bottom: var(--space-3xl); }}
  .pv-head h1 {{ margin: 0 0 var(--space-sm); }}
  .pv-head p {{ margin: 0; max-width: 640px; color: var(--color-text-secondary); }}
  .pv-section {{ background: var(--color-bg-page); border: 1px solid var(--color-border-default);
    border-radius: var(--radius-sm); padding: var(--space-3xl); margin-bottom: var(--space-xl); }}
  .pv-section > h2 {{ margin: 0 0 var(--space-xl); font-size: var(--font-title-small-size);
    font-weight: var(--font-weight-semibold); }}
  .row {{ display: flex; flex-wrap: wrap; gap: var(--space-lg); align-items: center; }}
  .col {{ display: flex; flex-direction: column; gap: var(--space-lg); }}
  .lbl {{ font-size: var(--font-caption-size); color: var(--color-text-tertiary);
    text-transform: uppercase; letter-spacing: .04em; margin-bottom: var(--space-sm); }}

  /* component helpers ---------------------------------------------------- */
  .btn {{ display:inline-flex; align-items:center; gap:var(--space-md); height:var(--control-height-m);
    padding:0 var(--space-xl); border-radius:var(--radius-sm); border:1px solid transparent;
    font:700 var(--font-body-bold-size)/var(--font-body-bold-lh) var(--font-family-base); cursor:pointer; }}
  .btn--s {{ height:var(--control-height-s); padding:0 var(--space-lg); }}
  .btn--filled {{ background:var(--color-action-primary); color:var(--color-text-inverse); }}
  .btn--outline {{ background:transparent; color:var(--color-action-primary); border-color:var(--color-border-strong); }}
  .btn--text {{ background:transparent; color:var(--color-action-primary); }}
  .btn--link {{ background:transparent; color:var(--color-text-link); text-decoration:underline; padding:0; height:auto; }}
  .btn--danger {{ background:var(--color-status-danger-fg); color:#fff; }}
  .btn--disabled {{ background:var(--color-action-disabled-bg); color:var(--color-action-disabled-text); cursor:not-allowed; }}

  .input {{ height:var(--control-height-m); padding:0 var(--space-lg); border-radius:var(--radius-sm);
    border:1px solid var(--color-border-default); font:400 var(--font-body-size) var(--font-family-base);
    color:var(--color-text-primary); min-width:240px; }}
  .input:focus {{ outline:none; border-color:var(--color-border-focused); box-shadow:0 0 0 3px var(--brand-100); }}
  .input--error {{ border-color:var(--color-border-error); }}
  .input--disabled {{ background:var(--color-bg-muted); color:var(--color-text-disabled); }}

  .badge {{ display:inline-flex; align-items:center; gap:var(--space-sm); border-radius:var(--radius-sm);
    padding:1px var(--space-sm); font:600 var(--font-caption-size)/var(--font-caption-lh) var(--font-family-base); }}
  .badge--m {{ padding:2px var(--space-md); font-size:var(--font-body-size); }}
  .badge--neutral {{ background:var(--color-status-neutral-bg); color:var(--color-status-neutral-fg); }}
  .badge--info {{ background:var(--color-status-info-bg); color:var(--color-status-info-fg); }}
  .badge--success {{ background:var(--color-status-success-bg); color:var(--color-status-success-fg); }}
  .badge--warning {{ background:var(--color-status-warning-bg); color:var(--color-status-warning-fg); }}
  .badge--danger {{ background:var(--color-status-danger-bg); color:var(--color-status-danger-fg); }}
  .dot {{ width:6px; height:6px; border-radius:var(--radius-full); }}

  .chip {{ display:inline-flex; align-items:center; gap:var(--space-md); height:32px; padding:0 var(--space-lg);
    border-radius:var(--radius-full); border:1px solid var(--color-border-default); background:var(--color-bg-page);
    color:var(--color-text-secondary); font:500 var(--font-body-size) var(--font-family-base); cursor:pointer; }}
  .chip--active {{ border-color:var(--color-border-focused); background:var(--color-bg-brand-subtle); color:var(--color-text-link); }}

  table {{ width:100%; border-collapse:collapse; }}
  th {{ text-align:left; height:40px; padding:0 var(--space-lg); border-bottom:1px solid var(--color-border-default);
    font:600 var(--font-meta-size)/var(--font-meta-lh) var(--font-family-base); text-transform:uppercase;
    letter-spacing:.04em; color:var(--color-text-tertiary); }}
  td {{ height:52px; padding:0 var(--space-lg); border-bottom:1px solid var(--color-border-subtle);
    font-size:var(--font-body-size); }}

  .overlay {{ border:1px solid var(--color-border-default); border-radius:var(--radius-lg);
    box-shadow:var(--shadow-lg); background:var(--color-bg-page); }}
</style>
</head>
<body>
  <header class="pv-head">
    <h1 class="t-title-m">{title}</h1>
    <p class="t-body">{blurb}</p>
  </header>
  {body}
</body>
</html>
"""

def section(title, inner):
    return f'<section class="pv-section"><h2>{title}</h2>{inner}</section>'

# --- status helpers --------------------------------------------------------
STATUS = {
    "Approved":"success","Active":"success","Completed":"success",
    "In Review":"info","In Progress":"info","Draft":"neutral","Archived":"neutral",
    "Expiring":"warning","Action Needed":"warning","Rejected":"danger","Expired":"danger",
}
def status_chip(name):
    c = STATUS[name]
    return (f'<span class="badge badge--m badge--{c}">'
            f'<span class="dot" style="background:var(--color-status-{c}-fg)"></span>{name}</span>')

def badge(color, text, size="s", icon=""):
    ic = f'<span>{icon}</span>' if icon else ''
    return f'<span class="badge badge--{size} badge--{color}">{ic}{text}</span>'

# ===========================================================================
# COMPONENT PAGES
# ===========================================================================
pages = []

# 01 tokens -----------------------------------------------------------------
def swatch(var, name):
    return (f'<div class="col" style="gap:var(--space-sm); width:140px">'
            f'<div style="height:56px;border-radius:var(--radius-sm);border:1px solid var(--color-border-subtle);'
            f'background:var({var})"></div><div style="font-size:var(--font-caption-size)">'
            f'<div style="font-weight:600">{name}</div><code style="color:var(--color-text-tertiary)">{var}</code></div></div>')
tok = section("Brand & status", '<div class="row">' + "".join([
    swatch("--color-action-primary","Brand 500"), swatch("--color-bg-brand-subtle","Brand subtle"),
    swatch("--color-status-success-fg","Success"), swatch("--color-status-warning-fg","Warning"),
    swatch("--color-status-danger-fg","Danger"), swatch("--color-status-info-fg","Info"),
]) + '</div>')
tok += section("Neutrals (slate)", '<div class="row">' + "".join([
    swatch("--color-text-primary","Text primary"), swatch("--color-text-secondary","Text secondary"),
    swatch("--color-text-tertiary","Text tertiary"), swatch("--color-border-default","Border"),
    swatch("--color-bg-muted","BG muted"), swatch("--color-bg-sidebar","Sidebar"),
]) + '</div>')
tok += section("Type scale", '<div class="col">' +
    '<div class="t-title-m">Title Medium · 20 / Semibold</div>'
    '<div class="t-modal">Modal Title · 18 / Semibold (exception)</div>'
    '<div class="t-title-s">Title Small · 16 / Semibold</div>'
    '<div class="t-body-bold">Body Bold · 14 / Bold — button & nav labels</div>'
    '<div class="t-body">Body · 14 / Regular — default</div>'
    '<div class="t-caption">Caption · 12 — non-interactive labels only</div>'
    '<div class="t-meta">Meta · 10 uppercase — table headers (exception)</div>' + '</div>')
pages.append(("01-tokens.html","Tokens & Type","Brand #1B4FD8, slate neutrals, WCAG-AA status palette and the full type ramp. Every other preview consumes these same semantic variables.",tok))

# 02 buttons ----------------------------------------------------------------
b = section("Variants (M / 40px)", '<div class="row">'
    '<button class="btn btn--filled">Save</button>'
    '<button class="btn btn--outline">Cancel</button>'
    '<button class="btn btn--text">Skip</button>'
    '<button class="btn btn--link">Learn more</button>'
    '<button class="btn btn--danger">Delete</button>'
    '<button class="btn btn--disabled" disabled>Disabled</button></div>')
b += section("Small (S / 32px)", '<div class="row">'
    '<button class="btn btn--s btn--filled">Save</button>'
    '<button class="btn btn--s btn--outline">Cancel</button>'
    '<button class="btn btn--s btn--text">Skip</button></div>')
b += section("With icons", '<div class="row">'
    '<button class="btn btn--filled"><span>+</span>New vendor</button>'
    '<button class="btn btn--outline"><span>↧</span>Export</button>'
    '<button class="btn btn--filled">Continue<span>→</span></button></div>')
pages.append(("02-buttons.html","Buttons","Filled / Outline / Text / Link / Destructive across M (40) and S (32). Label is Body Bold 14, radius 4, icons 20px.",b))

# 03 icon-buttons -----------------------------------------------------------
def iconbtn(g): return (f'<button class="btn btn--outline" style="width:40px;height:40px;padding:0;'
    f'justify-content:center">{g}</button>')
ib = section("Icon button (M)", '<div class="row">'+ "".join(iconbtn(g) for g in ["✎","↧","🗑","⋯","⚙"]) +'</div>')
ib += section("Round", '<div class="row">'+ "".join(
    f'<button class="btn btn--filled" style="width:40px;height:40px;padding:0;border-radius:var(--radius-full);justify-content:center">{g}</button>'
    for g in ["+","✓","→"]) +'</div>')
ib += section("Split", '<div class="row"><div style="display:inline-flex">'
    '<button class="btn btn--filled" style="border-top-right-radius:0;border-bottom-right-radius:0">Save</button>'
    '<button class="btn btn--filled" style="border-top-left-radius:0;border-bottom-left-radius:0;'
    'border-left:1px solid rgba(255,255,255,.3);padding:0 var(--space-md)">▾</button></div></div>')
pages.append(("03-icon-buttons.html","Icon · Round · Split","Icon-only (40px hit area, 20px glyph), round FAB-style, and split action buttons.",ib))

# 04 checkbox ---------------------------------------------------------------
def cb(checked, label, disabled=False, err=False):
    bg = "var(--color-action-primary)" if checked else "var(--color-bg-page)"
    bd = "var(--color-border-error)" if err else ("var(--color-action-primary)" if checked else "var(--color-border-strong)")
    op = "opacity:.4;" if disabled else ""
    mark = '<span style="color:#fff;font-size:13px;line-height:1">✓</span>' if checked else ''
    return (f'<label style="display:inline-flex;align-items:center;gap:var(--space-md);{op}">'
            f'<span style="width:18px;height:18px;border-radius:var(--radius-xs);background:{bg};'
            f'border:1.5px solid {bd};display:inline-flex;align-items:center;justify-content:center">{mark}</span>'
            f'<span style="font-size:var(--font-body-size)">{label}</span></label>')
c = section("States", '<div class="row" style="gap:var(--space-3xl)">'
    + cb(False,"Unchecked") + cb(True,"Checked") + cb(False,"Disabled",disabled=True)
    + cb(True,"Disabled checked",disabled=True) + cb(False,"Error",err=True) + '</div>')
pages.append(("04-checkbox.html","Checkbox","State × Status. 18px box, radius 2, brand fill when checked. Label 14px (interactive floor).",c))

# 05 radio ------------------------------------------------------------------
def rb(sel, label, disabled=False):
    op = "opacity:.4;" if disabled else ""
    inner = '<span style="width:8px;height:8px;border-radius:var(--radius-full);background:var(--color-action-primary)"></span>' if sel else ''
    bd = "var(--color-action-primary)" if sel else "var(--color-border-strong)"
    return (f'<label style="display:inline-flex;align-items:center;gap:var(--space-md);{op}">'
            f'<span style="width:18px;height:18px;border-radius:var(--radius-full);border:1.5px solid {bd};'
            f'display:inline-flex;align-items:center;justify-content:center">{inner}</span>'
            f'<span style="font-size:var(--font-body-size)">{label}</span></label>')
r = section("States", '<div class="row" style="gap:var(--space-3xl)">'
    + rb(False,"Unselected") + rb(True,"Selected") + rb(False,"Disabled",disabled=True)
    + rb(True,"Disabled selected",disabled=True) + '</div>')
pages.append(("05-radio.html","Radio","State × Selected. Outer focus ring model (vs Checkbox center) — flagged for polish-pass standardization.",r))

# 06 switch -----------------------------------------------------------------
def sw(on, label, loading=False, disabled=False):
    op="opacity:.4;" if disabled else ""
    bg="var(--color-action-primary)" if on else "var(--color-border-strong)"
    x="22px" if on else "2px"
    knob = '⟳' if loading else ''
    return (f'<label style="display:inline-flex;align-items:center;gap:var(--space-md);{op}">'
            f'<span style="position:relative;width:40px;height:22px;border-radius:var(--radius-full);background:{bg}">'
            f'<span style="position:absolute;top:2px;left:{x};width:18px;height:18px;border-radius:var(--radius-full);'
            f'background:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--color-text-tertiary)">{knob}</span>'
            f'</span><span style="font-size:var(--font-body-size)">{label}</span></label>')
s = section("States", '<div class="row" style="gap:var(--space-3xl)">'
    + sw(False,"Off") + sw(True,"On") + sw(True,"Loading",loading=True)
    + sw(False,"Disabled",disabled=True) + sw(True,"Disabled on",disabled=True) + '</div>')
pages.append(("06-switch.html","Switch","5 states including Loading. Track 40×22, brand when on.",s))

# 07 input ------------------------------------------------------------------
i = section("States (M)", '<div class="col" style="max-width:280px">'
    '<input class="input" placeholder="Default">'
    '<input class="input" value="Filled value">'
    '<input class="input input--error" value="Invalid email">'
    '<div style="font-size:var(--font-caption-size);color:var(--color-text-error)">Enter a valid email address</div>'
    '<input class="input input--disabled" value="Disabled" disabled></div>')
i += section("Small (32)", '<div class="col" style="max-width:280px">'
    '<input class="input" style="height:var(--control-height-s)" placeholder="Search…"></div>')
pages.append(("07-input.html","Input","7 Type × 5 State × 2 Size. Radius 4, brand focus ring, error border + caption.",i))

# 08 masked -----------------------------------------------------------------
m = section("Masked field", '<div class="col" style="max-width:320px">'
    '<label class="lbl">SSN</label>'
    '<div style="position:relative"><input class="input" value="•••-••-4821" style="width:100%">'
    '<span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:var(--color-text-tertiary)">👁</span></div>'
    '<div style="font-size:var(--font-caption-size);color:var(--color-text-tertiary)">FLAG: eye-slash icon pending commission</div></div>')
pages.append(("08-masked-field.html","Masked Field","State × Size. Reveal toggle (eye). Eye-slash icon flagged pending.",m))

# 09 phone ------------------------------------------------------------------
ph = section("Phone input (M)", '<div class="col" style="max-width:360px">'
    '<div style="display:flex"><button class="btn btn--outline" style="border-top-right-radius:0;border-bottom-right-radius:0;border-right:none">🇺🇸 +1 ▾</button>'
    '<input class="input" value="(415) 555-0142" style="border-top-left-radius:0;border-bottom-left-radius:0;flex:1;min-width:0"></div></div>')
pages.append(("09-phone-input.html","Phone Input","Country selector (flag + dial + chevron) joined to number field. M 40 / S 32.",ph))

# 10 multi-select -----------------------------------------------------------
def tag(t): return (f'<span style="display:inline-flex;align-items:center;gap:var(--space-sm);height:24px;'
    f'padding:0 var(--space-md);border-radius:var(--radius-xs);background:var(--color-bg-brand-subtle);'
    f'color:var(--color-text-link);font-size:var(--font-caption-size);white-space:nowrap">{t} ×</span>')
ms = section("Multi-select", '<div class="col" style="max-width:420px">'
    '<div class="input" style="height:auto;min-height:var(--control-height-m);display:flex;flex-wrap:wrap;'
    'gap:var(--space-sm);align-items:center;padding:var(--space-sm) var(--space-lg)">'
    + tag("ISO 27001") + tag("SOC 2") + tag("GDPR") + '<span style="color:var(--color-text-tertiary)">Add…</span></div></div>')
pages.append(("10-multi-select.html","Multi-select","State × Size. Tag chip 24px r2 brand-subtle, NO_WRAP labels. Use for long option lists.",ms))

# 11 country dropdown -------------------------------------------------------
def crow(flag, name, dial, sel=False):
    bg="background:var(--color-surface-selected);" if sel else ""
    return (f'<div style="display:flex;align-items:center;gap:var(--space-md);height:40px;padding:0 var(--space-lg);{bg}'
            f'border-radius:var(--radius-sm)"><span>{flag}</span><span style="flex:1;font-size:var(--font-body-size)">{name}</span>'
            f'<span style="color:var(--color-text-tertiary);font-size:var(--font-caption-size)">{dial}</span></div>')
cd = section("Country panel (280w, r8)", '<div class="overlay" style="width:280px;padding:var(--space-sm)">'
    '<input class="input" placeholder="Search country" style="width:100%;margin-bottom:var(--space-sm)">'
    + crow("🇺🇸","United States","+1",sel=True) + crow("🇬🇧","United Kingdom","+44")
    + crow("🇩🇪","Germany","+49") + crow("🇮🇳","India","+91") + crow("🇧🇷","Brazil","+55") + '</div>')
pages.append(("11-country-dropdown.html","Country Dropdown","Row set + 280w r8 panel with search. 6 sample countries (static).",cd))

# 12 filter chip ------------------------------------------------------------
fc = section("Filter chips", '<div class="row">'
    '<button class="chip chip--active">All</button>'
    '<button class="chip">Approved ✓</button>'
    '<button class="chip">In Review</button>'
    '<button class="chip">Expiring <span class="badge badge--neutral">7</span></button></div>')
pages.append(("12-filter-chip.html","Filter Chip","State × Icon × Badge. Pill 32px r-full, brand-subtle active. Light/brand model (flagged).",fc))

# 13 dropdown menu ----------------------------------------------------------
def mrow(g,t,danger=False):
    col="color:var(--color-text-error);" if danger else ""
    return (f'<div style="display:flex;align-items:center;gap:var(--space-md);height:36px;padding:0 var(--space-lg);'
            f'border-radius:var(--radius-sm);{col}font-size:var(--font-body-size)"><span style="width:16px">{g}</span>{t}</div>')
dm = section("Menu", '<div class="overlay" style="width:220px;padding:var(--space-sm)">'
    '<div class="t-meta" style="padding:var(--space-sm) var(--space-lg)">Actions</div>'
    + mrow("✎","Edit") + mrow("⧉","Duplicate") + mrow("↧","Export")
    + '<div style="height:1px;background:var(--color-border-subtle);margin:var(--space-sm) 0"></div>'
    + mrow("🗑","Delete",danger=True) + '</div>')
pages.append(("13-dropdown-menu.html","Dropdown Menu","Menu item (16px icons) + section header + search + r8 container. Pressed token flagged.",dm))

# 14 read-only --------------------------------------------------------------
def ro(label,val):
    return (f'<div class="col" style="gap:2px"><span class="t-caption">{label}</span>'
            f'<span style="font-size:var(--font-body-size);font-weight:500">{val}</span></div>')
rof = section("Read-only field (Filled)", '<div class="row" style="gap:var(--space-4xl)">'
    + ro("Vendor ID","VND-00842") + ro("Category","Manufacturing") + ro("Owner","A. Singh") + '</div>')
rof += section("Empty", '<div class="row">' + ro("Tax ID","<span style=\'color:var(--color-text-disabled)\'>—</span>") + '</div>')
pages.append(("14-read-only-field.html","Read-only Field","Type(12) × State(Filled/Empty). Label 12px caption (non-interactive), value 14px.",rof))

# 15 file row ---------------------------------------------------------------
def filerow(badge_txt,bg,fg,name,meta):
    return (f'<div style="display:flex;align-items:center;gap:var(--space-md);padding:var(--space-md) var(--space-lg);'
            f'border:1px solid var(--color-border-default);border-radius:var(--radius-sm)">'
            f'<span style="width:32px;height:32px;border-radius:var(--radius-sm);background:{bg};color:{fg};'
            f'display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">{badge_txt}</span>'
            f'<div style="flex:1"><div style="font-weight:600;font-size:var(--font-body-size)">{name}</div>'
            f'<div class="t-caption">{meta}</div></div><span style="color:var(--color-text-tertiary)">↧</span>'
            f'<span style="color:var(--color-text-tertiary)">🗑</span></div>')
fr = section("File rows", '<div class="col" style="max-width:480px">'
    + filerow("PDF","var(--color-bg-danger-subtle)","var(--color-text-error)","SOC2-Type-II.pdf","2.4 MB")
    + filerow("DOC","var(--color-bg-brand-subtle)","var(--color-text-link)","Contract-v3.docx","880 KB")
    + filerow("XLS","var(--color-bg-success-subtle)","var(--color-text-success)","Scope-matrix.xlsx","1.1 MB") + '</div>')
pages.append(("15-file-row.html","File Row","5 variants (M). File-type badge stand-ins — real icons flagged for commission.",fr))

# 16 file upload ------------------------------------------------------------
fu = section("Upload field", '<div style="max-width:480px">'
    '<div style="border:1px dashed var(--color-border-strong);border-radius:var(--radius-sm);'
    'padding:var(--space-4xl);text-align:center"><div style="font-size:28px">↥</div>'
    '<div style="font-weight:600;margin-top:var(--space-md)">Drag files here or <span class="text-link">browse</span></div>'
    '<div class="t-caption">PDF, DOCX up to 25 MB</div></div></div>')
pages.append(("16-file-upload.html","File Upload Field","9 states (M). Dropzone + browse, then renders File Rows on upload.",fu))

# 17 table cell -------------------------------------------------------------
tc = section("Cell types (52px)", '<table><tbody>'
    '<tr><td>Text cell</td><td style="color:var(--color-text-secondary)">Secondary</td>'
    '<td>'+status_chip("Approved")+'</td><td>'+badge("info","Type")+'</td>'
    '<td style="color:var(--color-text-tertiary)"><span style="font-size:16px">📅</span> Jun 17</td>'
    '<td style="text-align:right"><span style="font-size:16px">✎</span> <span style="font-size:16px">⋯</span></td></tr>'
    '</tbody></table>')
pages.append(("17-table-cell.html","Table Cell","7 types, 52px row height. Cell icons 16px (Actions, Date — exception to 20px).",tc))

# 18 table row --------------------------------------------------------------
trr = section("Row states", '<table><tbody>'
    '<tr><td>Default row</td><td>'+status_chip("Draft")+'</td></tr>'
    '<tr style="background:var(--color-surface-hover)"><td>Hover row</td><td>'+status_chip("In Review")+'</td></tr>'
    '<tr style="background:var(--color-surface-selected)"><td>Selected row</td><td>'+status_chip("Approved")+'</td></tr>'
    '</tbody></table>')
pages.append(("18-table-row.html","Table Row","Default / Hover / Selected at 52px. Row actions reveal on hover (see Table preview).",trr))

# 19 column header ----------------------------------------------------------
chh = section("Column headers (40px)", '<table><thead><tr>'
    '<th>Vendor <span style="font-size:16px">↕</span></th><th>Category</th>'
    '<th>Status <span style="font-size:16px">▾</span></th><th>Updated <span style="font-size:16px">↕</span></th>'
    '</tr></thead></table>')
pages.append(("19-table-column-header.html","Table Column Header","Sort × Filter = 6 variants, 40px. Label 10px uppercase meta, icons 16px (exceptions).",chh))

# 20 table (composed) -------------------------------------------------------
def vrow(name,cat,owner,st,upd):
    init="".join(w[0] for w in name.split()[:2])
    return (f'<tr><td><div style="display:flex;align-items:center;gap:var(--space-md)">'
            f'<span style="width:28px;height:28px;border-radius:var(--radius-full);background:var(--color-bg-muted);'
            f'display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;'
            f'color:var(--color-text-secondary)">{init}</span><span style="font-weight:600">{name}</span></div></td>'
            f'<td style="color:var(--color-text-secondary)">{cat}</td>'
            f'<td style="color:var(--color-text-secondary)">{owner}</td><td>{status_chip(st)}</td>'
            f'<td style="color:var(--color-text-tertiary)">{upd}</td>'
            f'<td style="text-align:right;color:var(--color-text-tertiary)">✎ ⋯</td></tr>')
tbl = section("Vendors table", '<table><thead><tr>'
    '<th>Vendor</th><th>Category</th><th>Owner</th><th>Status</th><th>Updated</th><th></th></tr></thead><tbody>'
    + vrow("Acme Logistics","Transportation","M. Reyes","Approved","2d ago")
    + vrow("Northwind Cloud","SaaS","J. Park","In Review","5h ago")
    + vrow("Globex Materials","Manufacturing","A. Singh","Expiring","1d ago")
    + vrow("Initech Audit Co.","Professional Svc.","M. Reyes","Rejected","3d ago") + '</tbody></table>')
pages.append(("20-table.html","Table (composed)","Headers + rows + status mapping. Demonstrates the full data-table composition.",tbl))

# 21 process status ---------------------------------------------------------
ps = section("Status vocabulary → color", '<div class="row">'
    + "".join(status_chip(s) for s in ["Approved","In Review","Draft","Expiring","Action Needed","Rejected","Expired","Archived"])
    + '</div>')
pages.append(("21-process-status.html","Process Status","8 variants, 24px chip r4. Certa status vocabulary only — no invented states.",ps))

# 22 badge ------------------------------------------------------------------
bd = section("Default (S)", '<div class="row">'
    + "".join(badge(c,c.title()) for c in ["neutral","info","success","warning","danger"]) + '</div>')
bd += section("With count & icon (M)", '<div class="row">'
    + badge("neutral","24","m") + badge("info","New","m","●") + badge("success","Verified","m","✓")
    + badge("danger","3","m") + '</div>')
pages.append(("22-badge.html","Badge","48 variants: Size(S/M) × Type × Color × Icon. r4, semibold.",bd))

# 23 toast ------------------------------------------------------------------
def toast(color,icon,title,msg):
    return (f'<div class="overlay" style="width:430px;display:flex;gap:var(--space-md);padding:var(--space-lg);'
            f'border-left:4px solid var(--color-status-{color}-fg)"><span style="color:var(--color-status-{color}-fg)">{icon}</span>'
            f'<div style="flex:1"><div style="font-weight:700;font-size:var(--font-body-size)">{title}</div>'
            f'<div class="t-caption">{msg}</div></div><span style="color:var(--color-text-tertiary)">✕</span></div>')
to = section("Toasts (430px, r8)", '<div class="col">'
    + toast("success","✓","Vendor approved","Northwind Cloud is now active.")
    + toast("info","ℹ","Export ready","Your report finished downloading.")
    + toast("warning","△","Certification expiring","ISO 27001 expires in 9 days.")
    + toast("danger","△","Upload failed","File exceeds the 25 MB limit.") + '</div>')
pages.append(("23-toast.html","Toast","20 variants. 430px r8. FLAG: Error+Warning currently share the warning triangle.",to))

# 24 alert banner -----------------------------------------------------------
def alert(color,icon,title,msg):
    return (f'<div style="width:480px;display:flex;gap:var(--space-md);padding:var(--space-lg);border-radius:var(--radius-sm);'
            f'background:var(--color-status-{color}-bg);border-left:4px solid var(--color-status-{color}-fg)">'
            f'<span style="color:var(--color-status-{color}-fg)">{icon}</span>'
            f'<div style="flex:1"><div style="font-weight:700;font-size:var(--font-body-size)">{title}</div>'
            f'<div style="font-size:var(--font-caption-size);color:var(--color-text-secondary)">{msg}</div></div></div>')
ab = section("Alert banners (480px, r4)", '<div class="col">'
    + alert("info","ℹ","Heads up","Assessment templates were updated this week.")
    + alert("success","✓","All clear","No certifications expire in the next 30 days.")
    + alert("warning","△","Action needed","4 vendors require document review.")
    + alert("danger","△","Critical","2 vendors failed their latest assessment.") + '</div>')
pages.append(("24-alert-banner.html","Alert Banner","32 variants. 480px r4, 4px left accent border.",ab))

# 25 nav bar ----------------------------------------------------------------
def navitem(g,t,active=False,badge_n=None):
    bg="background:var(--color-bg-brand-subtle);" if active else ""
    col="color:var(--color-text-link);font-weight:700;" if active else "color:var(--color-text-secondary);font-weight:500;"
    ind = '<span style="position:absolute;left:0;top:8px;bottom:8px;width:2px;border-radius:var(--radius-full);background:var(--color-action-primary)"></span>' if active else ''
    b = f'<span class="badge badge--neutral">{badge_n}</span>' if badge_n else ''
    return (f'<div style="position:relative;display:flex;align-items:center;gap:var(--space-md);height:40px;'
            f'padding:0 var(--space-lg);border-radius:var(--radius-sm);{bg}{col}font-size:var(--font-body-size)">'
            f'{ind}<span>{g}</span><span style="flex:1">{t}</span>{b}</div>')
nb = section("Sidebar nav (light #F7F8FA)", '<div style="width:248px;background:var(--color-bg-sidebar);'
    'border:1px solid var(--color-border-default);border-radius:var(--radius-sm);padding:var(--space-lg)">'
    + navitem("▦","Home",active=True) + navitem("❏","Vendors",badge_n="24") + navitem("✓","Assessments")
    + navitem("▤","Documents") + navitem("⚙","Settings") + '</div>')
pages.append(("25-nav-bar.html","Nav Bar","State × Expanded × Badge. Active = brand-subtle fill + 2px left indicator + text/link bold.",nb))

# 26 modal ------------------------------------------------------------------
md = section("Modal (M / 520, r8, shadow-lg)", '<div style="background:var(--color-bg-overlay);padding:var(--space-4xl);border-radius:var(--radius-sm)">'
    '<div class="overlay" style="width:520px;margin:0 auto;padding:var(--space-3xl)">'
    '<div style="display:flex;justify-content:space-between;align-items:flex-start">'
    '<h3 class="t-modal" style="margin:0">Delete vendor?</h3><span style="color:var(--color-text-tertiary)">✕</span></div>'
    '<p class="t-body text-secondary">This permanently removes Globex Materials and all associated documents. This action cannot be undone.</p>'
    '<div style="display:flex;justify-content:flex-end;gap:var(--space-md);margin-top:var(--space-xl)">'
    '<button class="btn btn--outline">Cancel</button><button class="btn btn--danger">Delete</button></div></div></div>')
pages.append(("26-modal.html","Modal","Size(S/M/L) × Type(Default/Destructive). Title 18/600, scrim overlay token, shadow-lg.",md))

# 27 tabs -------------------------------------------------------------------
def tabitem(t,active=False,badge_n=None):
    col="color:var(--color-text-primary);font-weight:700;" if active else "color:var(--color-text-secondary);font-weight:500;"
    ind='<span style="position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--color-text-link)"></span>' if active else ''
    b=f' <span class="badge badge--neutral">{badge_n}</span>' if badge_n else ''
    return (f'<div style="position:relative;height:40px;padding:0 var(--space-lg);display:inline-flex;align-items:center;'
            f'{col}font-size:var(--font-body-size)">{t}{b}{ind}</div>')
tb = section("Tab container (full-width baseline)", '<div style="display:flex;border-bottom:1px solid var(--color-border-default)">'
    + tabitem("Overview",active=True) + tabitem("Activity") + tabitem("Files",badge_n="12") + tabitem("Settings") + '</div>')
pages.append(("27-tabs.html","Tabs","20 variants: State × Badge × Icon. Selected = bold text/primary + 2px text/link indicator.",tb))

# 28 pagination -------------------------------------------------------------
def pg(n,active=False):
    bg="background:var(--color-bg-brand-subtle);color:var(--color-text-link);" if active else "color:var(--color-text-secondary);"
    return f'<button class="btn btn--text" style="width:36px;height:36px;padding:0;justify-content:center;{bg}font-weight:600">{n}</button>'
pgn = section("Pagination", '<div class="row" style="gap:var(--space-sm)">'
    '<button class="btn btn--outline btn--s">← Prev</button>'
    + pg("1",active=True) + pg("2") + pg("3") + '<span style="color:var(--color-text-tertiary)">…</span>' + pg("9")
    + '<button class="btn btn--outline btn--s">Next →</button></div>')
pages.append(("28-pagination.html","Pagination","High-priority pending component — first DS 4.0 pass. Active page = brand-subtle.",pgn))

# 29 empty state ------------------------------------------------------------
es = section("Empty state", '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;'
    'padding:var(--space-4xl);gap:var(--space-md)"><div style="font-size:40px;opacity:.6">❏</div>'
    '<div class="t-title-s">No vendors yet</div>'
    '<div class="t-body text-secondary" style="max-width:360px">Add your first vendor to start tracking '
    'certifications, assessments, and compliance status.</div>'
    '<button class="btn btn--filled" style="margin-top:var(--space-md)"><span>+</span>New vendor</button></div>')
pages.append(("29-empty-state.html","Empty State","Icon + title + supporting body + primary action. High-priority pending.",es))

# 30 date picker ------------------------------------------------------------
def day(n,active=False,muted=False):
    s="background:var(--color-action-primary);color:#fff;" if active else ("color:var(--color-text-disabled);" if muted else "")
    return f'<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius-sm);font-size:var(--font-body-size);{s}">{n}</div>'
cells="".join(day(d) for d in range(1,15)) + day(15,active=True) + "".join(day(d) for d in range(16,31))
dp = section("Date picker", '<div class="overlay" style="width:300px;padding:var(--space-lg)">'
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md)">'
    '<span style="color:var(--color-text-tertiary)">‹</span><span style="font-weight:600">June 2026</span>'
    '<span style="color:var(--color-text-tertiary)">›</span></div>'
    '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">'
    + "".join(f'<div class="t-meta" style="text-align:center">{d}</div>' for d in ["S","M","T","W","T","F","S"])
    + cells + '</div></div>')
pages.append(("30-date-picker.html","Date Picker","High-priority pending component — first DS 4.0 pass. Selected day = brand fill.",dp))

# 31 avatar -----------------------------------------------------------------
def av(txt,size,bg="var(--color-bg-brand)",col="#fff"):
    return (f'<span style="width:{size}px;height:{size}px;border-radius:var(--radius-full);background:{bg};color:{col};'
            f'display:inline-flex;align-items:center;justify-content:center;font-weight:700;'
            f'font-size:{int(size*0.4)}px">{txt}</span>')
avp = section("Avatar (stand-in — FLAG: commission set)", '<div class="row">'
    + av("CC",48) + av("JP",40) + av("AS",32,bg="var(--color-bg-muted)",col="var(--color-text-secondary)")
    + av("MR",24,bg="var(--color-status-success-bg)",col="var(--color-status-success-fg)") + '</div>')
pages.append(("31-avatar.html","Avatar","Stand-in only — no real component yet (flagged for commission). Initials, brand fill, sizes 24–48.",avp))

# 32 progress steps ---------------------------------------------------------
def step(n,label,state):
    if state=="done": bg,fg="var(--color-status-success-fg)","#fff"; mk="✓"
    elif state=="active": bg,fg="var(--color-action-primary)","#fff"; mk=str(n)
    else: bg,fg="var(--color-bg-muted)","var(--color-text-tertiary)"; mk=str(n)
    fw="700" if state=="active" else "400"
    tcol="var(--color-text-primary)" if state=="active" else "var(--color-text-secondary)"
    return (f'<div style="display:flex;align-items:center;gap:var(--space-md)">'
            f'<span style="width:24px;height:24px;border-radius:var(--radius-full);background:{bg};color:{fg};'
            f'display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700">{mk}</span>'
            f'<span style="font-weight:{fw};color:{tcol}">{label}</span></div>')
sep='<span style="width:32px;height:1px;background:var(--color-border-default)"></span>'
prs = section("Multi-step progress indicator", '<div class="row">'
    + step(1,"Profile","done") + sep + step(2,"Certifications","done") + sep
    + step(3,"Assessment","active") + sep + step(4,"Approval","todo") + '</div>')
pages.append(("32-progress-steps.html","Progress Steps","UI pattern: onboarding/multi-step indicator. Done=success ✓, active=brand, todo=muted.",prs))

# 33 form section -----------------------------------------------------------
fs = section("Form section layout", '<div style="max-width:480px">'
    '<h2 class="t-title-s" style="margin:0 0 var(--space-xs)">Company profile</h2>'
    '<p class="t-caption" style="margin:0 0 var(--space-xl)">Section header is text/primary — never text/link.</p>'
    '<div class="col">'
    '<label class="col" style="gap:var(--space-sm)"><span style="font-weight:500;font-size:var(--font-body-size)">Legal name <span class="text-error">*</span></span><input class="input"></label>'
    '<label class="col" style="gap:var(--space-sm)"><span style="font-weight:500;font-size:var(--font-body-size)">Contact email <span class="text-error">*</span></span><input class="input"><span class="t-caption">Used for assessment notifications</span></label>'
    '<label class="col" style="gap:var(--space-sm)"><span style="font-weight:500;font-size:var(--font-body-size)">Tax ID</span><input class="input" placeholder="Optional"></label>'
    '</div></div>')
pages.append(("33-form-section.html","Form Section","UI pattern: grouped fields, section header in text/primary, required asterisk in text/error.",fs))

# 34 certifications ---------------------------------------------------------
def pill(t,checked=False):
    if checked: return (f'<button class="chip chip--active">✓ {t}</button>')
    return f'<button class="chip">+ {t}</button>'
cf = section("Certifications as checkbox pills", '<div class="row">'
    + pill("ISO 27001",checked=True) + pill("SOC 2 Type II",checked=True) + pill("GDPR")
    + pill("HIPAA") + pill("PCI DSS") + pill("ISO 9001") + '</div>'
    + '<p class="t-caption" style="margin-top:var(--space-lg)">Use pills for small, finite sets. '
      'Switch to a multi-select dropdown when the option list is long.</p>')
pages.append(("34-certifications.html","Certifications Pills","UI pattern: small finite multi-select as checkbox pills vs dropdown. Active = brand-subtle.",cf))

# --- write -----------------------------------------------------------------
for fn, title, blurb, body in pages:
    with open(os.path.join(OUT, fn), "w") as f:
        f.write(page(fn[:-5], title, blurb, body))

print(f"Wrote {len(pages)} preview files to {OUT}")
for fn,_,_,_ in pages: print("  "+fn)
