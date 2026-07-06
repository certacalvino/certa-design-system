# Certa DS 4.1 — Page composition templates (reference)

These are the **layout patterns** the local /design-sync agent should compose
from the kit components (window.CertaDS) and upload as template cards. They are
the lever for generation quality — prototype copies *density + composition* from
these, not just atoms.

**Density rules (all templates):** page padding `--space-3xl` (24) · section gap
`--space-3xl` · card padding `--space-xl` (16) · field gap `--space-lg` (12).
Only semantic tokens; no raw hex/px. Status vocab from the kit only.

## 0. HARD RULES — anti-patterns that keep breaking (READ FIRST)

These are the exact mistakes seen in generated template cards. Do NOT repeat them:

1. **NO emoji, ever.** Every icon comes from `window.I` (real SVGs). Dates/renewals
   use `<I.Calendar/>` — never 🗓/📅. Docs `<I.Doc/>`, bell `<I.Bell/>`, etc.
2. **Risk distribution = horizontal bar meters, NOT `CircularProgress` and NOT `Gauge`.**
   A distribution across Low/Med/High is 3 stacked rows, each `label · count · a thin
   horizontal bar` (`--color-bg-muted` track + RAG-colored fill %). `CircularProgress`
   is only for a single completion % (e.g. a due-diligence step); `Gauge` is only for a
   single residual-risk score.
3. **Every `KPIStatCard` MUST pass a `delta`** (and `invertDelta` for risk metrics so a
   rising bad number is red). Never render an empty stat card with only a number.
4. **KPIs use the `KPIStatCard` component**, tables use `Table`, status uses
   `ProcessStatus`, tier uses `Tag`/`Badge`, nav uses `Sidebar` — do not hand-roll divs.
5. **Fill the page.** No large empty bottom areas; the issues/activity table extends to
   fill remaining height.

---

## 1. Vendor Detail (dashboard) — the hero template
Page header → KPI row → tabs → 2-col overview → full-width issues table.

- **Header:** breadcrumb (Vendors / Acme Corp) · title `t-title-m` · actions:
  `Button variant="outline"` (Edit) + `Button variant="filled"` (Run Assessment).
- **KPI row:** 4 × `KPIStatCard`, stretch to fill (flex:1). Risk-rising deltas
  RED — Overall Risk Score 4.2 ▲ (bad/red), Open Issues 12, Last Assessment, Compliance 87% ▲ (green).
- **Tabs:** `Tabs` — Overview / Risk Assessment / Documents / Activity.
- **Overview grid (1fr 1fr):**
  - *Risk Profile* `Card`: `Gauge` (residual score) + `RAGField` (inherent tier). Don't double-encode.
  - *Due Diligence* `Card`: 3 × `CircularProgress` rows + cert chips (`Tag`/`Badge`).
  - **Record details:** grid of label/value (Category `Badge`, Region, Tier `Badge`, Owner `Avatar`+name, Status `ProcessStatus`).
- **Full-width Open Issues:** `Table` (severity `Badge`, title, owner `Avatar`, `ProcessStatus`, age) + `Pagination`. Fills the page — never bottom out into empty space.

## 2. Vendors List — data table screen
Header → stat row → tabs+toolbar → multi-select table → pagination.

- **Header:** breadcrumb + title + actions (`Button` Export outline, `Button` Add vendor filled).
- **Stat row:** 4 × `KPIStatCard` (Active vendors, Pending review ▼ good/green, High-risk ▲ bad/red, Avg score).
- **Toolbar:** `Tabs` (All / In review / Approved / Drafts with counts) + `Input` (search, leading icon) + `FilterChip`s (Region, Tier).
- **Table:** `Table` with columns [checkbox, Vendor (`Avatar`+name+region), Tier `Tag`, Status `ProcessStatus`, Risk (meter+score), Owner `Avatar`, Updated]. Selected rows = surface/selected.
- **Footer:** `Pagination` (Numbered).

## 3. Home Dashboard — overview
Header → KPI row → 2-col (activity table | side cards).

- **Header:** title `t-title-m` + `Button` (date range, outline).
- **KPI row:** 4 × `KPIStatCard` (Total Vendors, High Risk ▲ bad/red, Pending ▼ good, Compliance ▲ good).
- **Grid (2fr 1fr):**
  - *Recent activity* `Card` + `Table` (vendor `Avatar`+name, action, `ProcessStatus`, date).
  - Side column: *Risk distribution* `Card` — 3 **horizontal bar meters** (Low green / Med amber / High red), each row = label + count + thin bar (NOT `CircularProgress`, NOT `Gauge`). Then *Upcoming renewals* `Card` — list where each row is `<I.Calendar/>` + name + date (NO emoji).

---

### Notes for the sync agent
- Compose with the real kit components (window.CertaDS); use `var(--token)` for layout glue, never classes/hex/px.
- These upload as **template / UI-kit cards** (viewport ~1280×900), separate from the per-component cards.
- Verify each renders cleanly in the review sheet before upload (same grade loop as components).
