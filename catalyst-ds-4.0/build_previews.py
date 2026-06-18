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
# Real control (set 179:420): 16px square, r4, 2px border. Pure CSS box + inline
# SVG mark — NO catalog icon. Checked = white check path; Indeterminate = white dash.
CHECK_SVG = ('<svg width="12" height="12" viewBox="0 0 16 16">'
    '<path d="M3.5 8.5 L6.5 11.5 L12.5 5" fill="none" stroke="#fff" stroke-width="2" '
    'stroke-linecap="round" stroke-linejoin="round"/></svg>')
DASH_SVG = ('<svg width="12" height="12" viewBox="0 0 16 16">'
    '<line x1="4" y1="8" x2="12" y2="8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>')
def cbox(state="unchecked", err=False):
    on = state in ("checked","indeterminate")
    bg = "var(--color-action-primary)" if on else "var(--color-bg-page)"
    bd = "var(--color-border-error)" if err else ("var(--color-action-primary)" if on else "var(--color-border-strong)")
    mark = CHECK_SVG if state=="checked" else (DASH_SVG if state=="indeterminate" else "")
    return (f'<span style="width:16px;height:16px;flex-shrink:0;border-radius:var(--radius-sm);background:{bg};'
            f'border:2px solid {bd};display:inline-flex;align-items:center;justify-content:center">{mark}</span>')
def cb(state, label, disabled=False, err=False):
    op = "opacity:.4;" if disabled else ""
    return (f'<label style="display:inline-flex;align-items:center;gap:var(--space-md);{op}">'
            f'{cbox(state,err)}<span style="font-size:var(--font-body-size)">{label}</span></label>')
c = section("States", '<div class="row" style="gap:var(--space-3xl)">'
    + cb("unchecked","Unchecked") + cb("checked","Checked") + cb("indeterminate","Indeterminate")
    + cb("unchecked","Disabled",disabled=True) + cb("checked","Disabled checked",disabled=True)
    + cb("unchecked","Error",err=True) + '</div>')
pages.append(("04-checkbox.html","Checkbox","Set 179:420 — 16px square, radius 4, 2px border. Unchecked = border/default on white; Checked = brand bg + white check (SVG); Indeterminate = brand bg + white dash. Pure CSS/SVG control — no catalog icon. Label 14px (interactive floor).",c))

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
def msrow(label, sel):
    # selected row shows a real checked Checkbox (cbox), not a glyph icon
    bg = "background:var(--color-surface-selected);" if sel else ""
    return (f'<div style="display:flex;align-items:center;gap:var(--space-md);height:36px;padding:0 var(--space-md);'
            f'border-radius:var(--radius-sm);{bg}">{cbox("checked" if sel else "unchecked")}'
            f'<span style="font-size:var(--font-body-size)">{label}</span></div>')
ms = section("Field (tag chips)", '<div style="width:320px">'
    '<div class="input" style="height:auto;min-height:var(--control-height-m);display:flex;flex-wrap:wrap;'
    'gap:var(--space-sm);align-items:center;padding:var(--space-sm) var(--space-lg)">'
    + tag("ISO 27001") + tag("SOC 2") + '<span style="color:var(--color-text-tertiary)">Add…</span></div></div>')
ms += section("Open dropdown — selected rows show a checked Checkbox",
    '<div class="overlay" style="width:320px;padding:var(--space-sm)">'
    + msrow("ISO 27001", True) + msrow("SOC 2 Type II", True) + msrow("GDPR", False)
    + msrow("HIPAA", False) + msrow("PCI DSS", False) + '</div>')
pages.append(("10-multi-select.html","Multi-select","Tag chips (24px r2 brand-subtle, NO_WRAP) in the field; dropdown rows carry a real Checkbox (brand fill + white check) for the selected state — matches the Checkbox control, no glyph icon. Use for long option lists.",ms))

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
# Size(S 400 / M 520 / L 640) × Type(Default/Destructive). Header 18/600 title +
# 32px Close hit-area / Body / Footer (Outline Cancel + Filled Save|Delete). r8 + shadow-lg.
def modal(w, dest, title, body):
    save = ('<button class="btn btn--danger">Delete</button>' if dest
            else '<button class="btn btn--filled">Save</button>')
    return (f'<div class="overlay" style="width:{w}px;padding:0;overflow:hidden">'
            f'<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:var(--space-xl) var(--space-3xl)">'
            f'<h3 class="t-modal" style="margin:0">{title}</h3>'
            f'<span style="width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;'
            f'color:var(--color-text-tertiary);cursor:pointer">✕</span></div>'
            f'<div style="padding:0 var(--space-3xl) var(--space-xl)"><p class="t-body text-secondary" style="margin:0">{body}</p></div>'
            f'<div style="display:flex;justify-content:flex-end;gap:var(--space-md);padding:var(--space-lg) var(--space-3xl);'
            f'border-top:1px solid var(--color-border-subtle)">'
            f'<button class="btn btn--outline">Cancel</button>{save}</div></div>')
md = section("Default — Size S 400 / M 520 / L 640 (r8, shadow-lg)",
    '<div class="col" style="gap:var(--space-xl)">'
    + modal(400,False,"Add vendor","Enter the vendor's legal name and primary contact to create a record.")
    + modal(520,False,"Edit profile","Update the company profile. Changes are saved to the vendor record immediately.")
    + modal(640,False,"Assessment details","Review the full assessment scope, responses, and supporting documents before approving.")
    + '</div>')
md += section("Destructive — footer swaps Save → Delete",
    modal(520,True,"Delete vendor?","This permanently removes Globex Materials and all associated documents. This action cannot be undone."))
md += section("With scrim (color/bg/overlay)",
    '<div style="background:var(--color-bg-overlay);padding:var(--space-4xl);border-radius:var(--radius-sm)">'
    + modal(520,False,"On scrim","The overlay token (rgba 17,24,39,.45) dims the page behind the dialog.") + '</div>')
pages.append(("26-modal.html","Modal","Size(S 400 / M 520 / L 640) × Type(Default/Destructive) = 6 variants. Header 18/600 title + 32px Close, scrollable Body, Footer (Outline Cancel + Filled Save; Destructive → Delete). r8, shadow-lg, color/bg/overlay scrim.",md))

# 27 tabs -------------------------------------------------------------------
# State(Unselected/Hover/Selected/Focused/Disabled) × Badge × Icon. 40px, icon 20px,
# padding lg H, gap md. Selected=text/primary Bold + 2px text/link indicator.
def tabitem(t,state="unselected",icon=None,badge_n=None):
    base="position:relative;height:40px;padding:0 var(--space-lg);display:inline-flex;align-items:center;gap:var(--space-md);font-size:var(--font-body-size);"
    col="color:var(--color-text-secondary);font-weight:500;"; extra=""; ind=""
    if state=="selected": col="color:var(--color-text-primary);font-weight:700;"; ind='<span style="position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--color-text-link)"></span>'
    elif state=="hover": extra="background:var(--color-surface-hover);border-radius:var(--radius-sm) var(--radius-sm) 0 0;"
    elif state=="focused": extra="box-shadow:inset 0 0 0 2px var(--color-border-focused);border-radius:var(--radius-sm);"
    elif state=="disabled": col="color:var(--color-text-disabled);font-weight:500;opacity:.4;"
    ic=f'<span style="font-size:20px">{icon}</span>' if icon else ''
    b=f'<span class="badge badge--neutral">{badge_n}</span>' if badge_n else ''
    return f'<div style="{base}{col}{extra}">{ic}{t}{b}{ind}</div>'
tb = section("Item states", '<div class="row" style="gap:var(--space-xl);align-items:flex-end">'
    + tabitem("Unselected") + tabitem("Hover",state="hover") + tabitem("Selected",state="selected")
    + tabitem("Focused",state="focused") + tabitem("Disabled",state="disabled") + '</div>')
tb += section("With icon + badge", '<div class="row" style="gap:var(--space-xl)">'
    + tabitem("Overview",state="selected",icon="▦") + tabitem("Files",icon="▤",badge_n="12") + '</div>')
tb += section("Container — full-width baseline (border/subtle)",
    '<div style="display:flex;border-bottom:1px solid var(--color-border-subtle)">'
    + tabitem("Overview",state="selected") + tabitem("Activity") + tabitem("Files",badge_n="12") + tabitem("Settings") + '</div>')
pages.append(("27-tabs.html","Tabs","Item set 542:83 — State(Unselected/Hover/Selected/Focused/Disabled) × Badge × Icon = 20 variants. 40px, icon 20px. Selected = text/primary Bold + 2px text/link indicator. Container 543:2 = full-width 1px border/subtle baseline.",tb))

# 28 pagination -------------------------------------------------------------
# Simple (range + First/Prev/Next/Last) + Numbered (range + Prev + page buttons + Next).
# Arrows = Icon Button M 32px; page button 32×32 r4 Default/Hover/Selected; range 12px Caption.
def iconarrow(g,disabled=False):
    col="var(--color-text-disabled)" if disabled else "var(--color-text-secondary)"
    cur="not-allowed" if disabled else "pointer"
    return (f'<button style="width:32px;height:32px;border-radius:var(--radius-sm);border:1px solid var(--color-border-default);'
            f'background:var(--color-bg-page);color:{col};cursor:{cur};display:inline-flex;align-items:center;justify-content:center;font-size:14px">{g}</button>')
def pg(n,state="default"):
    if state=="selected": s="background:var(--color-bg-brand);color:var(--color-text-inverse);font-weight:700;border:none;"
    elif state=="hover": s="background:var(--color-surface-hover);color:var(--color-text-primary);border:none;"
    else: s="background:transparent;color:var(--color-text-secondary);border:none;"
    return f'<button style="width:32px;height:32px;border-radius:var(--radius-sm);cursor:pointer;{s}">{n}</button>'
rng='<span class="t-caption">1–10 of 100</span>'
pgn = section("Simple",
    '<div class="row" style="justify-content:space-between;max-width:480px">' + rng
    + '<div class="row" style="gap:var(--space-sm)">' + iconarrow("«") + iconarrow("‹") + iconarrow("›") + iconarrow("»") + '</div></div>')
pgn += section("Numbered",
    '<div class="row" style="justify-content:space-between;max-width:520px">' + rng
    + '<div class="row" style="gap:var(--space-xs)">' + iconarrow("‹")
    + pg("1",state="selected") + pg("2") + pg("3") + '<span style="color:var(--color-text-tertiary);padding:0 4px">…</span>' + pg("10")
    + iconarrow("›") + '</div></div>')
pgn += section("Page-button states", '<div class="row" style="gap:var(--space-lg)">'
    + '<div class="col" style="gap:var(--space-sm);align-items:center">'+pg("2")+'<span class="t-caption">Default</span></div>'
    + '<div class="col" style="gap:var(--space-sm);align-items:center">'+pg("2",state="hover")+'<span class="t-caption">Hover</span></div>'
    + '<div class="col" style="gap:var(--space-sm);align-items:center">'+pg("2",state="selected")+'<span class="t-caption">Selected</span></div>' + '</div>')
pgn += section("Disabled edges (page 1)", '<div class="row" style="gap:var(--space-sm)">'
    + iconarrow("«",disabled=True) + iconarrow("‹",disabled=True) + iconarrow("›") + iconarrow("»") + '</div>')
pages.append(("28-pagination.html","Pagination","Type(Simple/Numbered). Simple = range ↔ First/Prev/Next/Last (Icon Button M 32px). Numbered = range ↔ Prev + page buttons + Next. Page button 32×32 r4: Default/Hover/Selected(bg/brand). Range 12px Caption text/secondary. Disabled edges greyed on first/last page.",pgn))

# 29 empty state ------------------------------------------------------------
# Context(Page/Card/Table) × Action(bool). icon text/disabled + Body Bold 14 title
# + Body 14 desc + optional Filled button. Page: icon 32/gap xl/w400/M btn. Card/Table: icon 24/gap md/S btn.
def empty(icon_px, gap, w, title, desc, btn=None):
    b = f'<button class="btn {btn}" style="margin-top:var(--space-md)"><span>+</span>Add</button>' if btn else ''
    return (f'<div style="display:flex;flex-direction:column;align-items:center;text-align:center;'
            f'gap:{gap};width:{w}px;max-width:100%;padding:var(--space-3xl) 0;margin:0 auto">'
            f'<div style="font-size:{icon_px}px;color:var(--color-text-disabled)">🔍</div>'
            f'<div class="t-body-bold">{title}</div>'
            f'<div class="t-body text-secondary">{desc}</div>{b}</div>')
es = section("Page (icon 32, gap xl, 400w, Filled M)",
    empty(32,"var(--space-xl)",400,"No results found","Try adjusting your filters or search terms to find what you're looking for.",btn="btn--filled"))
es += section("Card (icon 24, gap md, 320w, Filled S)",
    '<div class="pv-section" style="margin:0">'
    + empty(24,"var(--space-md)",320,"Nothing here yet","Items you add will show up in this card.",btn="btn--filled btn--s") + '</div>')
es += section("Table (icon 24, gap md, spans body, Filled S) — no action",
    '<table><tbody><tr><td colspan="3" style="height:auto">'
    + empty(24,"var(--space-md)",640,"No data found","No records match the current view.") + '</td></tr></tbody></table>')
pages.append(("29-empty-state.html","Empty State","Context(Page/Card/Table) × Action(bool) = 6 variants. Icon-led (text/disabled), Body Bold 14 title + Body 14 desc + optional Filled button. Page: icon 32 / 400w / M button. Card+Table: icon 24 / S button. 14px floor.",es))

# 30 date picker (v2 — range) ----------------------------------------------
# Cell 40×40, day# 12px. States: Default/Hover/Today/Selected/Muted/Disabled + In-Range.
# Today = 1px border/focused ring (no fill). Range band: start/end brand fill (per-corner
# radius), in-range brand-subtle + text/link, flush (r0) → continuous.
def day(n,state="default",radius="var(--radius-sm)"):
    base=f"width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:var(--font-caption-size);border-radius:{radius};"
    s="color:var(--color-text-primary);"
    if state=="selected": s="background:var(--color-action-primary);color:var(--color-text-inverse);font-weight:700;"
    elif state=="in-range": s="background:var(--color-bg-brand-subtle);color:var(--color-text-link);"
    elif state=="today": s="color:var(--color-text-primary);box-shadow:inset 0 0 0 1px var(--color-border-focused);"
    elif state=="hover": s="background:var(--color-surface-hover);color:var(--color-text-primary);"
    elif state=="muted": s="color:var(--color-text-disabled);"
    elif state=="disabled": s="color:var(--color-text-disabled);opacity:.4;text-decoration:line-through;"
    return f'<div style="{base}{s}">{n}</div>'
def panel(grid):
    return ('<div class="overlay" style="width:280px;padding:var(--space-lg)">'
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md)">'
        '<span style="width:32px;height:32px;border:1px solid var(--color-border-default);border-radius:var(--radius-sm);'
        'display:inline-flex;align-items:center;justify-content:center;color:var(--color-text-secondary)">‹</span>'
        '<span class="t-body-bold">June 2026</span>'
        '<span style="width:32px;height:32px;border:1px solid var(--color-border-default);border-radius:var(--radius-sm);'
        'display:inline-flex;align-items:center;justify-content:center;color:var(--color-text-secondary)">›</span></div>'
        '<div style="display:grid;grid-template-columns:repeat(7,1fr)">'
        + "".join(f'<div class="t-caption" style="text-align:center;height:32px;line-height:32px">{d}</div>' for d in ["SUN","MON","TUE","WED","THU","FRI","SAT"])
        + grid + '</div>'
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-md);padding-top:var(--space-md);border-top:1px solid var(--color-border-subtle)">'
        '<button class="btn btn--link">Today</button><button class="btn btn--text btn--s">Clear</button></div></div>')
dp = section("Cell states (40×40, day# 12px)", '<div class="row" style="gap:var(--space-md)">'
    + "".join(f'<div class="col" style="gap:var(--space-sm);align-items:center">{day(15,state=s)}<span class="t-caption">{lbl}</span></div>'
        for s,lbl in [("default","Default"),("hover","Hover"),("today","Today"),("selected","Selected"),("in-range","In-range"),("muted","Muted"),("disabled","Disabled")]) + '</div>')
single = "".join(day(d,state="muted") for d in range(1,8)) + day(8) + day(9) + day(10) + day(11) + day(12,state="today") + day(13) + day(14) \
    + day(15,state="selected") + "".join(day(d) for d in range(16,30))
dp += section("Single selection", panel(single))
# range: start=18 (TL+BL r4), in-range 19–21, end=22 (TR+BR r4)
LR="var(--radius-sm) 0 0 var(--radius-sm)"; RR="0 var(--radius-sm) var(--radius-sm) 0"
rangecells = "".join(day(d) for d in range(1,18)) \
    + day(18,state="selected",radius=LR) + day(19,state="in-range",radius="0") + day(20,state="in-range",radius="0") \
    + day(21,state="in-range",radius="0") + day(22,state="selected",radius=RR) \
    + "".join(day(d) for d in range(23,31))
dp += section("Range selection (v2 — start / in-range / end)", panel(rangecells))
pages.append(("30-date-picker.html","Date Picker v2","Cell 40×40 (day# 12px): Default/Hover/Today/Selected/Muted/Disabled + In-Range. Today = 1px border/focused ring (no fill). Panel 280w r8 + shadow-lg, SUN-first weekday row, Today/Clear footer. v2 range: start/end brand fill + per-corner radii, in-range brand-subtle + text/link, flush → continuous band.",dp))

# 31 avatar -----------------------------------------------------------------
AV_SIZES = [("S",24),("M",32),("L",40),("XL",56)]
AV_TONES = ["brand","teal","green","orange","red","neutral"]
def av(txt,size,tone):
    return (f'<span style="width:{size}px;height:{size}px;border-radius:var(--radius-full);'
            f'background:var(--color-avatar-{tone}-bg);color:var(--color-avatar-{tone}-fg);display:inline-flex;'
            f'align-items:center;justify-content:center;font-weight:600;font-size:{int(size*0.4)}px;flex-shrink:0">{txt}</span>')
# tone × size matrix (24 variants)
av_rows = ""
for tone in AV_TONES:
    cells = "".join(f'<td style="padding:var(--space-md) var(--space-lg)">{av("AB",px,tone)}</td>' for _,px in AV_SIZES)
    av_rows += (f'<tr><td style="padding:0 var(--space-lg)"><span class="badge badge--neutral">{tone}</span></td>{cells}</tr>')
avp = section("Tone × Size (24 variants)",
    '<table style="border-collapse:separate"><thead><tr><th>Tone</th>'
    + "".join(f'<th>{lbl} · {px}px</th>' for lbl,px in AV_SIZES) + '</tr></thead><tbody>'
    + av_rows + '</tbody></table>')
avp += section("In context", '<div class="row">'
    + av("CC",40,"brand") + av("JP",40,"teal") + av("AS",40,"green")
    + av("MR",40,"orange") + av("LC",40,"red") + av("DK",40,"neutral") + '</div>')
pages.append(("31-avatar.html","Avatar","Size(S 24 / M 32 / L 40 / XL 56) × Tone(Brand/Teal/Green/Orange/Red/Neutral) = 24 variants. Full-circle, light tint bg + saturated Semi-Bold initials (matches Figma set 572:50).",avp))

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

# 35 toggle -----------------------------------------------------------------
def toggle(opts, sel, vertical=False):
    seg = ""
    h = "var(--control-height-m)" if vertical else "var(--control-height-s)"
    for o in opts:
        on = o == sel
        bg = "background:var(--color-bg-brand-subtle);" if on else "background:transparent;"
        col = "color:var(--color-text-link);font-weight:700;" if on else "color:var(--color-text-secondary);font-weight:500;"
        ta = "text-align:left;flex:0 0 auto;" if vertical else "text-align:center;"
        seg += (f'<button style="height:{h};padding:0 var(--space-lg);border:none;'
                f'border-radius:var(--radius-sm);cursor:pointer;font:14px var(--font-family-base);{bg}{col}{ta}">{o}</button>')
    dirn = "column" if vertical else "row"
    w = "width:220px;" if vertical else ""
    return (f'<div role="group" style="display:inline-flex;flex-direction:{dirn};{w}overflow:hidden;'
            f'background:var(--color-bg-subtle);border:1px solid var(--color-border-subtle);'
            f'border-radius:var(--radius-sm)">{seg}</div>')
tg = section("Horizontal (item 32px hug)", '<div class="col">'
    + toggle(["List","Board","Calendar"], "Board")
    + toggle(["Day","Week","Month","Year"], "Week") + '</div>')
tg += section("Vertical (220w, item 40px fill)", toggle(["Overview","Activity","Documents","Settings"], "Activity", vertical=True))
pages.append(("35-toggle.html","Toggle","Segmented control — horizontal & vertical (Figma 574:62 / 575:2 / 575:9). Track on surface/subtle + 1px border/subtle, items flush. Selected = brand-subtle fill + text/link Body Bold.",tg))

# 36 RAG field --------------------------------------------------------------
# Figma 577:23: 240×40 r4 field, tinted bg (RAG L3) + value (Body 14 text/primary)
# + 24px full-height colored right-tab (RAG base) with rotated vertical label.
# A11y: HIGH+LOW label white (text/on-brand); MED dark (Orange/D2).
RAG_TAB={"Low":"LOW","Medium":"MED","High":"HIGH"}
def rag(label, level, value):
    key={"Low":"low","Medium":"medium","High":"high"}[level]
    return (f'<div class="col" style="gap:var(--space-sm)"><span class="t-caption">{label}</span>'
            f'<div style="position:relative;width:240px;height:40px;border-radius:var(--radius-sm);'
            f'background:var(--color-rag-{key}-bg);overflow:hidden;display:flex;align-items:center">'
            f'<span style="flex:1;padding:0 var(--space-lg);font-size:var(--font-body-size);color:var(--color-text-primary)">{value}</span>'
            f'<span style="width:24px;height:100%;background:var(--color-rag-{key}-base);display:flex;align-items:center;justify-content:center">'
            f'<span style="transform:rotate(-90deg);font-size:10px;font-weight:700;letter-spacing:.04em;'
            f'color:var(--color-rag-{key}-label);white-space:nowrap">{RAG_TAB[level]}</span></span></div></div>')
rg = section("RAG risk field (240×40, colored right-tab)", '<div class="row" style="gap:var(--space-4xl)">'
    + rag("Inherent risk","Low","Low — 1.5") + rag("Residual risk","Medium","Medium — 2.5") + rag("Overall risk","High","High — 4.5") + '</div>')
rg += section("Tab label contrast — HIGH+LOW white, MED dark (Orange/D2)", '<div class="row" style="gap:var(--space-4xl)">'
    + rag("Financial","Low","Low") + rag("Operational","Medium","Medium") + rag("Cybersecurity","High","High") + '</div>'
    + '<p class="t-caption" style="margin-top:var(--space-lg)">White on Orange/base fails WCAG AA, so the MED tab label uses Orange/D2 (dark). '
      'HIGH (Red/base) and LOW (Green/base) carry white labels.</p>')
pages.append(("36-rag-field.html","RAG Field","Figma 577:23 — RAG(Red/Amber/Green) = 3 variants. 240×40 r4 field, tinted bg (RAG L3) + value (Body 14 text/primary) + 24px colored right-tab (RAG base) with rotated vertical label. Red→HIGH / Orange→MED / Green→LOW. A11y: HIGH+LOW labels white, MED dark (Orange/D2).",rg))

# 37 KPI / Stat Card --------------------------------------------------------
# Set 595:4282 — Icon(bool) × Delta(bool) = 4 variants. 200w card, surface/default
# + r4 + 1px border/subtle + shadow-xs, padding xl, gap md. Value Display 28.
def kpi(title, value, icon=None, delta=None):
    up = delta and not str(delta).startswith("-")
    ic = f'<span style="font-size:24px;color:var(--color-text-disabled)">{icon}</span>' if icon else ''
    d = ''
    if delta is not None:
        col = "var(--color-text-success)" if up else "var(--color-text-error)"
        d = f'<span style="font-size:var(--font-body-size);font-weight:600;color:{col}">{"▲" if up else "▼"} {str(delta).lstrip("-")}</span>'
    return (f'<div style="width:200px;display:flex;flex-direction:column;gap:var(--space-md);background:var(--color-bg-page);'
            f'border:1px solid var(--color-border-subtle);border-radius:var(--radius-sm);box-shadow:var(--shadow-xs);padding:var(--space-xl)">'
            f'{ic}<span class="t-meta" style="color:var(--color-text-secondary)">{title}</span>'
            f'<span class="t-display">{value}</span>{d}</div>')
kp = section("Icon × Delta (4 variants)", '<div class="row" style="gap:var(--space-xl);align-items:stretch">'
    + kpi("Active vendors","124",icon="📊",delta="6%")
    + kpi("Pending review","18",delta="3%")
    + kpi("Expiring soon","7",icon="📊",delta="-2%")
    + kpi("Total spend","$1.2M") + '</div>')
pages.append(("37-kpi-stat-card.html","KPI / Stat Card","Set 595:4282 — Icon(bool) × Delta(bool) = 4 variants. 200w card, surface/default + r4 + 1px border/subtle + shadow-xs. Title Caption uppercase + value Display 28 + optional icon 24px (text/disabled) + delta ▲ text/success / ▼ text/error. Delta direction is a content swap.",kp))

# 38 gauge ------------------------------------------------------------------
# Set 598:32 — RAG(Low/Medium/High). 140px 270° arc (no needle/dot), surface/muted track.
import math
def gauge(level, score, size=140):
    base={"Low":"var(--color-rag-low-base)","Medium":"var(--color-rag-medium-base)","High":"var(--color-rag-high-base)"}[level]
    r=size/2-12; c=size/2; sweep=270; start=135
    def polar(deg):
        rad=math.radians(deg-90); return (c+r*math.cos(rad), c+r*math.sin(rad))
    def arc(a,b):
        x1,y1=polar(a); x2,y2=polar(b); large=1 if (b-a)>180 else 0
        return f'M {x1:.2f} {y1:.2f} A {r:.2f} {r:.2f} 0 {large} 1 {x2:.2f} {y2:.2f}'
    val=start+(max(0,min(5,score))/5)*sweep
    sweeparc=f'<path d="{arc(start,val)}" fill="none" stroke="{base}" stroke-width="{size*0.13:.0f}"/>' if score>0 else ''
    return (f'<div class="col" style="align-items:center;gap:var(--space-md)">'
            f'<div style="position:relative;width:{size}px;height:{size}px">'
            f'<svg width="{size}" height="{size}" style="display:block">'
            f'<path d="{arc(start,start+sweep)}" fill="none" stroke="var(--color-bg-muted)" stroke-width="{size*0.13:.0f}"/>{sweeparc}</svg>'
            f'<span class="t-display" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">{score}</span></div>'
            f'<span class="t-caption">Risk</span></div>')
gg = section("RAG gauges — arc only, no needle (270° sweep, score 0–5)", '<div class="row" style="gap:var(--space-4xl)">'
    + gauge("Low",1.5) + gauge("Medium",2.5) + gauge("High",4.5) + '</div>')
pages.append(("38-gauge.html","Gauge","Set 598:32 — RAG(Low/Medium/High) = 3 variants. 140px, 270° arc (start 135°, gap at bottom). Track = surface/muted; colored sweep = score/5 × 270° in RAG base. NO needle / NO dot — the arc communicates the value. Center = value only (Display 28). 'Risk' caption below.",gg))

# 39 circular progress ------------------------------------------------------
# Set 609:116 — Size(S 40 / L 80) × Progress(0/25/50/75/100) × State(Default/Success/Error) = 30.
def circ(progress, state="Default", size="l"):
    px=40 if size=="s" else 80; sw=px*0.11; r=(px-sw)/2; c=px/2; circ_len=2*math.pi*r
    col={"Default":"var(--color-action-primary)","Success":"var(--color-text-success)","Error":"var(--color-text-error)"}[state]
    arc=f'<circle cx="{c}" cy="{c}" r="{r:.2f}" fill="none" stroke="{col}" stroke-width="{sw:.1f}" stroke-dasharray="{circ_len:.2f}" stroke-dashoffset="{circ_len*(1-progress/100):.2f}"/>' if progress>0 else ''
    fs="var(--font-caption-size)" if size=="s" else "var(--font-body-bold-size)"
    fw="400" if size=="s" else "700"
    return (f'<div style="position:relative;width:{px}px;height:{px}px">'
            f'<svg width="{px}" height="{px}" style="transform:rotate(-90deg)">'
            f'<circle cx="{c}" cy="{c}" r="{r:.2f}" fill="none" stroke="var(--color-bg-muted)" stroke-width="{sw:.1f}"/>{arc}</svg>'
            f'<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:{fs};font-weight:{fw}">{progress}%</span></div>')
cpv = section("Default — Progress 0 / 25 / 50 / 75 / 100 (L 80)", '<div class="row" style="gap:var(--space-xl)">'
    + "".join(circ(p) for p in [0,25,50,75,100]) + '</div>')
cpv += section("State — Success / Error (L)", '<div class="row" style="gap:var(--space-xl)">'
    + circ(75,"Success") + circ(40,"Error") + '</div>')
cpv += section("Size S (40)", '<div class="row" style="gap:var(--space-xl)">'
    + "".join(circ(p,"Default","s") for p in [25,50,100]) + circ(60,"Success","s") + '</div>')
pages.append(("39-circular-progress.html","Circular Progress","Set 609:116 — Size(S 40 / L 80) × Progress(0/25/50/75/100) × State(Default/Success/Error) = 30 variants. 360° ring, track surface/muted, arc from top clockwise. Default bg/brand · Success text/success · Error text/error. Center % (Caption S / Body Bold L). Flat caps.",cpv))

# --- write -----------------------------------------------------------------
for fn, title, blurb, body in pages:
    with open(os.path.join(OUT, fn), "w") as f:
        f.write(page(fn[:-5], title, blurb, body))

print(f"Wrote {len(pages)} preview files to {OUT}")
for fn,_,_,_ in pages: print("  "+fn)
