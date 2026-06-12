# Deck v1.2 — CLAUDE.md

Pointer document para Claude Code. Leer primero, luego leer los MDs referenciados.

---

## Proyecto

Dashboard de rendimiento deportivo para natación de élite.
Coach: Ezequiel Valdez (Club Once Unidos, Mar del Plata).
Dev: Chris Calvino.

**Producción:** deck.chriscalvino.com (pass: aurora) — rama `main`  
**Preview v1.2:** deck-git-v12-christiancalvino-8430s-projects.vercel.app — rama `v1.2`

---

## Stack

- React + Vite + Chart.js (frontend)
- Vercel serverless (backend, `/api/`)
- Neon PostgreSQL sa-east-1 (DB)
- Claude API — Haiku para parsing, Sonnet para análisis
- Resend (email)

---

## Worktrees

```
~/Downloads/deck-v1.1  →  rama main  →  producción
~/Downloads/deck-v1.2  →  rama v1.2  →  preview
```

**SIEMPRE verificar rama antes de trabajar:**
```
git branch --show-current
```

---

## Workflow

1. Trabajo en local — sin push hasta aprobación de Chris
2. `npm run dev` en puerto 5174 (frontend)
3. `vercel dev` en puerto 3000 (API)
4. Build limpio antes de cualquier commit: `npm run build`
5. Push solo cuando Chris confirma que se ve bien

---

## Reglas globales de diseño

- **Brand color CTAs:** `#1B4FD8` — NUNCA teal `#1D9E75` en botones o focus
- **Teal `#1D9E75`:** SOLO para estados positivos (✓ Guardado, readiness atleta)
- **Headers de panel:** `height: 48px` fijo — todos los niveles
- **CTAs:** Siempre sticky al fondo de paneles
- **Sidebar:** 240px desktop, 200px tablet, drawer mobile
- **Panel lateral:** Solo visible >1400px. Tablet usa drawer.
- **Formularios:** border #E2E8F0, radius 7px, focus #1B4FD8

---

## Archivos de diseño

```
deck-design/
  TOKENS.md        — colores, tipografía, spacing del sistema
  TOPBAR.md        — topbar, datepicker S2▾, stats
  PANEL.md         — todos los estados del panel lateral
  PIZARRA.md       — grilla semanal, cards, ghosts
  MOBILE.md        — breakpoints, SesionMobilePage
  SIDEBAR.md       — sidebar dark navy
  decisions.md     — historial de decisiones con razonamiento
  deck_layout_v2.html — referencia visual aprobada (fuente de verdad)
```

**Ante cualquier duda de diseño: leer `decisions.md` primero.**

---

## Estado actual

Ver `SPRINT.md` en la raíz del repo para el estado detallado del sprint.

---

## Componentes clave

```
AppShell.jsx           — shell, Panel(), topbar, sidebar, datepicker
  Panel()              — 5 estados: default/pool/gym/addPool/addGym
  EjsList()            — lista ejercicios pool/gym (independiente)
  DefaultPanelContent()— atletas hoy + progreso semanal
  AddPoolForm()        — formulario nueva sesión pileta
  AddGymForm()         — formulario nueva sesión carga
PizarraSemanal.jsx     — grilla 7 cols × grupos
SesionMobilePage.jsx   — mobile /dashboard/pizarra/sesion
PizarraModal.jsx       — drawer tablet (panelMode)
PizarraPanel.jsx       — panel sesión pileta
FisicoPanel.jsx        — panel sesión fuerza
EjercicioModal.jsx     — editor ejercicio pileta
EjercicioFuerzaForm.jsx— editor ejercicio fuerza
```

---

## Patrones importantes

### addTick (trigger padre→hijo sin refs)
```jsx
// Padre
const [addTick, setAddTick] = useState(0)
const addEjercicio = () => setAddTick(t => t + 1)
<Panel addTick={addTick} />

// Hijo
useEffect(() => {
  if (addTick > 0) setEditor('new')
}, [addTick])
```

### Ghost gym → addGym
```jsx
// En handleCellClick, celda vacía de gym:
handleCellClick(fecha, 'fisico', grupo, null, null, true) // isGhostGym=true
```

### showFooter en mobile
```jsx
// SesionMobilePage pasa showFooter=false a los paneles
// El footer lo maneja la página, no el panel
<FisicoPanel showFooter={false} addTick={addTick} />
```

---

## Neon — tipo mismatch

`coach.id` llega como string desde Neon. Manejar con:
```js
WHERE coach_id = ${coachId} -- puede necesitar ::integer cast
```

## Vercel Hobby limits

- Máximo 12 funciones serverless (las extras se dropean silenciosamente)
- Body size máximo 4.5MB — parsear Excel client-side, enviar solo JSON
