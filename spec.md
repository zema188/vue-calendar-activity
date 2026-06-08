# vue-calendar-activity

## Overview

A modern, fully-featured Vue 3 calendar heatmap component published as an npm library (`vue-calendar-activity`). GitHub-style activity grid with flexible date ranges, dual color-scale modes, theming support, SSR compatibility, and full TypeScript types. Ships alongside a VitePress documentation site hosted on a private VPS.

---

## Requirements

### Functional Requirements

- Render a GitHub-style heatmap: columns = weeks (left → right), rows = days (Mon–Sun or configurable), labels above for months, labels left for week days.
- Accept arbitrary start/end date range via props; provide convenient shorthand presets.
- Accept both data formats: array of objects and object-map; auto-detect.
- Support two color-scale modes: fixed levels (N steps) and continuous gradient.
- Built-in light + dark themes; full CSS-variable override for any color/size.
- Tooltip on hover — built-in (string formatter) + named slot for custom HTML.
- Emit `cell-click`, `cell-mouseenter`, `cell-mouseleave` on interaction.
- Full localization: month names, weekday names, date format, empty-day label — all overridable.
- Configurable cell size, gap, border-radius (square ↔ rounded).
- SSR-safe: no `window`/`document` access at import or setup time; all DOM access inside `onMounted`.
- Basic a11y: `role="grid"` on container, `aria-label` on each cell (date + value).

### Non-Functional Requirements

- Vue 3 + TypeScript; `<script setup>` throughout.
- **Strict TypeScript — zero `any`.** `tsconfig.json` with `"strict": true`, `"noImplicitAny": true`. Every prop, emit, slot scope, composable return, and utility function is fully typed.
- Zero runtime dependencies beyond Vue.
- Tree-shakeable ESM build + CJS fallback.
- Shipped with `.d.ts` type declarations (via `vite-plugin-dts`).
- Package name: `vue-calendar-activity`.
- pnpm monorepo: `packages/lib` (the library) + `packages/docs` (VitePress site).
- Docs site deployed to own VPS.
- Manual `npm publish` workflow (no CI auto-publish).

---

## Technical Design

### Monorepo Structure

```
vue-calendar-activity/               ← repo root
├── packages/
│   ├── lib/                         ← npm package
│   │   ├── src/
│   │   │   ├── types/               ← ALL shared types, no logic
│   │   │   │   ├── data.ts          ← HeatmapData, HeatmapDay, HeatmapDataArray, HeatmapDataMap
│   │   │   │   ├── props.ts         ← CalendarHeatmapProps (typed prop definitions)
│   │   │   │   ├── emits.ts         ← CalendarHeatmapEmits
│   │   │   │   ├── locale.ts        ← HeatmapLocale
│   │   │   │   ├── theme.ts         ← Theme, ScaleMode, ColorConfig
│   │   │   │   └── index.ts         ← re-exports everything from types/
│   │   │   ├── components/
│   │   │   │   ├── CalendarHeatmap.vue   ← root component, thin orchestrator
│   │   │   │   ├── HeatmapGrid.vue       ← renders the week columns grid
│   │   │   │   ├── HeatmapCell.vue       ← single day cell
│   │   │   │   ├── HeatmapTooltip.vue    ← tooltip wrapper + positioning
│   │   │   │   ├── HeatmapLegend.vue     ← color scale legend
│   │   │   │   ├── MonthLabels.vue       ← top month axis
│   │   │   │   └── WeekdayLabels.vue     ← left weekday axis
│   │   │   ├── composables/
│   │   │   │   ├── useCalendar.ts        ← grid generation, week grouping, date math
│   │   │   │   ├── useColorScale.ts      ← level/gradient resolution → cell color
│   │   │   │   ├── useTooltip.ts         ← tooltip visibility + positioning logic
│   │   │   │   └── useLocale.ts          ← merge user locale with defaults
│   │   │   ├── utils/
│   │   │   │   ├── date.ts               ← parse, format, range helpers (no DOM)
│   │   │   │   ├── data.ts               ← normalizeData() array↔map unification
│   │   │   │   └── color.ts              ← hex/rgb interpolation for gradient mode
│   │   │   ├── constants/
│   │   │   │   ├── defaults.ts           ← DEFAULT_LOCALE, DEFAULT_COLORS, default props values
│   │   │   │   └── tokens.ts             ← CSS variable names as string constants
│   │   │   └── index.ts                  ← public API: component + all types re-exported
│   │   ├── tsconfig.json                 ← strict: true, noImplicitAny: true
│   │   ├── vite.config.ts
│   │   └── package.json
│   └── docs/                        ← VitePress site
│       ├── .vitepress/
│       │   ├── config.ts
│       │   └── theme/               ← custom theme overrides if needed
│       ├── guide/
│       │   ├── getting-started.md
│       │   ├── theming.md
│       │   └── recipes.md
│       ├── api/
│       │   ├── props.md
│       │   ├── events.md
│       │   └── slots.md
│       └── playground/
│           └── index.md             ← interactive demo page (Vue component embedded)
├── pnpm-workspace.yaml
└── package.json
```

### Type layer rules

- `types/` contains **only interfaces, type aliases, and enums** — zero logic, zero imports from `utils/` or `composables/`.
- `components/` import from `types/` and `composables/` only — never from sibling components' internals.
- `composables/` import from `types/` and `utils/` only — never from `components/`.
- `utils/` import from `types/` only — pure functions, no Vue reactivity.
- `constants/` import from `types/` only — static values.
- Circular imports are forbidden; enforced by keeping the layer hierarchy strict.

### Key type contracts

```typescript
// types/data.ts
export interface HeatmapDay {
  date: string          // 'YYYY-MM-DD'
  value: number
  level: number         // 0 = no data, 1..N = computed
}
export type HeatmapDataArray = Array<{ date: string | Date; value: number }>
export type HeatmapDataMap   = Record<string, number>
export type HeatmapData      = HeatmapDataArray | HeatmapDataMap

// types/theme.ts
export type ScaleMode  = 'levels' | 'gradient'
export type ThemeMode  = 'light' | 'dark' | 'auto'
export type WeekStart  = 0 | 1 | 2 | 3 | 4 | 5 | 6

// types/locale.ts
export interface HeatmapLocale {
  months?: [string, string, string, string, string, string,
            string, string, string, string, string, string]
  monthsShort?: [string,string,string,string,string,string,
                 string,string,string,string,string,string]
  weekdays?: [string,string,string,string,string,string,string]
  weekdaysShort?: [string,string,string,string,string,string,string]
  noDataLabel?: string
  formatDate?: (date: string) => string
}

// types/props.ts  (mirrors component props for external consumers)
export interface CalendarHeatmapProps {
  data: HeatmapData
  startDate?: string | Date
  endDate?: string | Date
  range?: 'year' | 'month' | '3months' | '6months'
  scaleMode?: ScaleMode
  levels?: number
  colors?: string[]
  colorFrom?: string
  colorTo?: string
  maxValue?: number
  theme?: ThemeMode
  cellSize?: number | string
  cellGap?: number | string
  cellRadius?: number | string
  weekStart?: WeekStart
  showWeekdays?: boolean
  showMonths?: boolean
  showLegend?: boolean
  legendLabel?: string
  tooltipEnabled?: boolean
  tooltipFormatter?: (day: HeatmapDay) => string
  locale?: HeatmapLocale
  dateFormat?: string | ((date: string) => string)
  emptyColor?: string
}

// types/emits.ts
export interface CalendarHeatmapEmits {
  (e: 'cell-click',      day: HeatmapDay, event: MouseEvent): void
  (e: 'cell-mouseenter', day: HeatmapDay, event: MouseEvent): void
  (e: 'cell-mouseleave', day: HeatmapDay, event: MouseEvent): void
}
```

### Library Build

- Tool: Vite lib mode + `vite-plugin-dts`.
- Outputs: `dist/vue-calendar-activity.es.js` (ESM) + `dist/vue-calendar-activity.cjs.js` (CJS).
- Types: `dist/index.d.ts`.
- `vue` is `external` (peer dependency, not bundled).
- CSS: single `dist/style.css` extracted by Vite; users must import it or override with their own.

### Data Model

```typescript
// Input types
type HeatmapDataArray = Array<{ date: string | Date; value: number }>
type HeatmapDataMap   = Record<string, number>          // key: 'YYYY-MM-DD'
type HeatmapData      = HeatmapDataArray | HeatmapDataMap

// Internal normalized cell
interface HeatmapDay {
  date: string    // always 'YYYY-MM-DD'
  value: number   // raw value (0 if missing)
  level: number   // computed 0–N (0 = no data)
}

// Locale
interface HeatmapLocale {
  months?: string[]         // 12 full month names
  monthsShort?: string[]    // 12 short month names
  weekdays?: string[]       // 7 full day names (index 0 = Sunday)
  weekdaysShort?: string[]  // 7 short day names
  noDataLabel?: string      // text for value=0 cells
  formatDate?: (date: string) => string  // override date display in tooltip
}
```

**Auto-detection of input format**: if `data` is an `Array` → treat as `HeatmapDataArray`; otherwise treat as `HeatmapDataMap`.

### Grid Generation (`useCalendar`)

1. Resolve `startDate` / `endDate` from props (see date range props below).
2. Enumerate every day in `[startDate, endDate]`, group into ISO weeks.
3. Each week is a column of up to 7 cells; partial weeks at edges are padded with `null` cells (rendered as empty, no aria-label).
4. `weekStart` prop (0=Sun, 1=Mon, default 1) controls row order and week boundaries.

### Color Scale (`useColorScale`)

Two modes controlled by `scaleMode` prop:

| `scaleMode` | Behavior |
|---|---|
| `'levels'` | Divide `[0, maxValue]` into `levels` equal buckets. Cell gets CSS class `level-0` … `level-N`. Colors defined by theme CSS vars or `colors` prop array. |
| `'gradient'` | Interpolate linearly between `colorFrom` and `colorTo` based on `value / maxValue`. Applied as `style="background: ..."`. |

When `maxValue` is not passed, it is computed as `Math.max(...allValues)`.

---

## Component API

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `HeatmapData` | `[]` | Input data (array or map). |
| `startDate` | `string \| Date` | 1 year ago | Start of visible range. |
| `endDate` | `string \| Date` | today | End of visible range. |
| `range` | `'year' \| 'month' \| '3months' \| '6months'` | — | Shorthand; overrides startDate/endDate when provided. |
| `scaleMode` | `'levels' \| 'gradient'` | `'levels'` | Color scale mode. |
| `levels` | `number` | `5` | Number of color levels (mode: levels). |
| `colors` | `string[]` | theme default | Array of `levels` hex/rgb colors (index 0 = empty). |
| `colorFrom` | `string` | theme default | Start color for gradient mode. |
| `colorTo` | `string` | theme default | End color for gradient mode. |
| `maxValue` | `number` | auto | Max value for scale; auto-computed if omitted. |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Built-in theme. |
| `cellSize` | `number \| string` | `12` | Cell size in px (number) or CSS string (`'1rem'`). |
| `cellGap` | `number \| string` | `3` | Gap between cells. |
| `cellRadius` | `number \| string` | `2` | Border radius. |
| `weekStart` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | First day of week (0=Sun, 1=Mon…). |
| `showWeekdays` | `boolean` | `true` | Show day-of-week labels on left. |
| `showMonths` | `boolean` | `true` | Show month labels on top. |
| `showLegend` | `boolean` | `true` | Show color-scale legend below grid. |
| `legendLabel` | `string` | `''` | Optional label next to legend. |
| `tooltipEnabled` | `boolean` | `true` | Enable hover tooltip. |
| `tooltipFormatter` | `(day: HeatmapDay) => string` | built-in | Custom string for tooltip. |
| `locale` | `HeatmapLocale` | en defaults | Localization overrides. |
| `dateFormat` | `string \| ((date: string) => string)` | `'YYYY-MM-DD'` | Display format for dates (in tooltips, aria-labels). String tokens: YYYY/MM/DD. |
| `emptyColor` | `string` | theme default | Background color for days with no data. |

### Emits

```typescript
interface CalendarHeatmapEmits {
  'cell-click':       (day: HeatmapDay, event: MouseEvent) => void
  'cell-mouseenter':  (day: HeatmapDay, event: MouseEvent) => void
  'cell-mouseleave':  (day: HeatmapDay, event: MouseEvent) => void
}
```

### Slots

| Slot | Scope | Description |
|---|---|---|
| `tooltip` | `{ day: HeatmapDay }` | Replaces tooltip content entirely with custom HTML. |
| `day-label` | `{ weekday: number; label: string }` | Custom weekday label. |
| `month-label` | `{ month: number; label: string; year: number }` | Custom month label. |

### Public API (exposed via `defineExpose`)

```typescript
// access via template ref
interface CalendarHeatmapExpose {
  getDay: (date: string) => HeatmapDay | undefined
  // future: selectedRange, highlightDays, etc.
}
```

---

## Theming

### CSS Custom Properties (set on `.calendar-heatmap` root or `:root`)

```css
--ch-color-empty:      #ebedf0;
--ch-color-level-1:    #9be9a8;
--ch-color-level-2:    #40c463;
--ch-color-level-3:    #30a14e;
--ch-color-level-4:    #216e39;
/* gradient mode */
--ch-color-gradient-from: #9be9a8;
--ch-color-gradient-to:   #216e39;
/* structure */
--ch-cell-size:   12px;
--ch-cell-gap:    3px;
--ch-cell-radius: 2px;
--ch-font-size:   11px;
--ch-font-color:  #57606a;
/* dark overrides applied automatically when [data-theme="dark"] or prefers-color-scheme: dark */
```

The `theme` prop adds `data-theme="light|dark"` on the root element; `auto` uses CSS `prefers-color-scheme`. Users can override any variable in their own CSS or via the `colors` prop.

---

## Documentation Site (VitePress)

### Sections

| Section | Content |
|---|---|
| **Guide / Getting Started** | Install, basic usage, quick examples. |
| **Guide / Theming** | CSS vars table, dark mode, custom colors. |
| **Guide / Recipes** | GitHub-clone, heatmap with sidebar legend, calendar year picker. |
| **API / Props** | Full props table with types and defaults. |
| **API / Events** | All emits with payload types. |
| **API / Slots** | All slots with scope types. |
| **Playground** | Interactive prop controls (built-in); StackBlitz link opens full project. |

### Playground architecture

- VitePress page imports `CalendarHeatmap` directly from `packages/lib/src`.
- Prop controls rendered with plain `<input>`, `<select>` — no UI library.
- StackBlitz integration: "Open in StackBlitz" button links to a pre-configured project (maintained separately or generated via `@stackblitz/sdk`).
- Designed so either part can be added/expanded independently without breaking the other.

---

## Edge Cases & Error Handling

| Case | Handling |
|---|---|
| Empty `data` | Grid renders, all cells show empty color; no crash. |
| All values = 0 | Renders as all-empty; `maxValue` falls back to 1 to avoid division by zero. |
| Single day range | Grid renders one column with one cell. |
| `startDate > endDate` | Swap silently or emit a warning via `console.warn` in dev mode. |
| Invalid date string | `console.warn` in dev mode, cell skipped. |
| `levels < 2` | Clamp to 2 with warning. |
| Very large dataset (10k+ days) | HTML/CSS renderer with `v-for` should handle it; no virtual scrolling in v1, but composition is modular to add it later. |
| Date format collision | If both `dateFormat` string and `locale.formatDate` are set, `locale.formatDate` wins. |
| SSR | No `window`/`document` at module level. Tooltip positioning uses `onMounted`. Grid layout is pure computed state — renders fine on server. |

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| npm name `vue-calendar-activity` already taken | Check before publish; if taken, use scoped `@artm/vue-calendar-activity`. |
| CSS specificity conflicts in user apps | All selectors scoped under `.calendar-heatmap`; no global resets. |
| Tooltip overflow on edge cells | Position tooltip dynamically (flip left/right/top based on viewport). |
| `dateFormat` string token ambiguity | Document supported tokens (YYYY, MM, DD only); use a tiny internal formatter, no external dependency. |
| IE/old browser compatibility | Not a goal. Target: last 2 versions of evergreen browsers. State this clearly in README. |

---

## Tradeoffs & Decisions

| Decision | Rationale |
|---|---|
| HTML div renderer over SVG | SSR-friendly, easier CSS theming, no serialization issues. Performance acceptable for ≤2 years of data. |
| Both data formats | Reduce friction for adopters who have different backend shapes; auto-detection keeps API clean. |
| CSS custom properties over JS theming API | Lets users style from CSS without needing Vue component config; composable with any CSS framework. |
| Levels + gradient both in v1 | These are the two most common heatmap paradigms; implementing both upfront prevents a breaking API change later. |
| No external dependencies | Keeps bundle size minimal and avoids version conflicts in user projects. |
| pnpm monorepo | Clean separation of lib and docs concerns; easy to share types; standard for Vue ecosystem libs. |

---

## Acceptance Criteria

- [ ] `npm install vue-calendar-activity` + import + use in Vue 3 app renders a heatmap with no errors.
- [ ] Both data formats produce identical visual output for the same dataset.
- [ ] `range="month"` renders current month only.
- [ ] `scaleMode="gradient"` interpolates colors continuously.
- [ ] `theme="dark"` activates dark palette; `theme="auto"` follows `prefers-color-scheme`.
- [ ] CSS variable overrides on `.calendar-heatmap` take effect without `!important`.
- [ ] `cell-click` emits correct `HeatmapDay` payload with right date and value.
- [ ] `tooltip` slot renders custom HTML inside tooltip container.
- [ ] French locale (custom `locale` prop) shows French month/day names.
- [ ] No hydration mismatch in a Nuxt 3 project.
- [ ] TypeScript: props, emits, slot scopes, and exposed API are fully typed with no `any`.
- [ ] Docs site loads at VPS domain; all sections render; playground works live.

---

## Open Questions

1. **Custom date format tokens** — support only `YYYY/MM/DD` or also `Do` (ordinal), `ddd`, etc.? Keep minimal for v1, expand in v2.
2. **Legend position** — below only, or support `top`/`left`/`right` via prop? Punt to v2.
3. **`range` prop + explicit dates coexistence** — if user passes both `range` and `startDate`, which wins? Decision: `range` takes precedence, log a warning.
4. **StackBlitz project** — needs a separate hosted example project; URL TBD.
5. **VPS deploy mechanism** — rsync, Docker, or something else; to be decided when VPS is set up.
