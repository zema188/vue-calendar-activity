# Props

## Data

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `HeatmapData` | `[]` | Activity data. Accepts array `[{ date, value }]` or object map `{ 'YYYY-MM-DD': value }`. |

## Date Range

| Prop | Type | Default | Description |
|---|---|---|---|
| `range` | `'year' \| 'month' \| '3months' \| '6months'` | — | Shorthand range preset. Takes precedence over `startDate`/`endDate`. |
| `startDate` | `string \| Date` | 1 year ago | Start of visible range. |
| `endDate` | `string \| Date` | today | End of visible range. |

## Colors & Scale

| Prop | Type | Default | Description |
|---|---|---|---|
| `scaleMode` | `'levels' \| 'gradient'` | `'levels'` | Color scale mode. |
| `levels` | `number` | `5` | Number of color levels. Clamped to 2–10. |
| `colorPreset` | `'github' \| 'blue' \| 'orange' \| 'red' \| 'purple' \| 'teal'` | — | Built-in palette (light/dark aware). |
| `colors` | `string[]` | theme defaults | Colors for each level. Index 0 = empty day. |
| `colorFrom` | `string` | `'#9be9a8'` | Gradient start color (gradient mode). |
| `colorTo` | `string` | `'#216e39'` | Gradient end color, or target color for auto-generated palette. |
| `maxValue` | `number` | auto | Max value for scale. Auto-computed from data if omitted. |
| `emptyColor` | `string` | theme default | Background color for days with no data. |

## Appearance

| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Built-in color theme. |
| `cellSize` | `number \| string` | `12` | Cell size in px or CSS string (`'1rem'`). |
| `cellGap` | `number \| string` | `3` | Gap between cells. |
| `cellRadius` | `number \| string` | `2` | Cell border radius. Use `50` for circles. |
| `weekStart` | `0–6` | `1` | First day of week. 0 = Sunday, 1 = Monday. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction. Vertical stacks weeks top-to-bottom (weekdays on top, months on left). |
| `showWeekdays` | `boolean` | `true` | Show day-of-week labels. |
| `showMonths` | `boolean` | `true` | Show month labels. |
| `showLegend` | `boolean` | `true` | Show color-scale legend. |
| `legendLabel` | `string` | `''` | Text label shown next to the legend. |
| `stickyWeekdays` | `boolean` | `true` | Keep weekday labels pinned during horizontal scroll. |

## Today Highlight

| Prop | Type | Default | Description |
|---|---|---|---|
| `today` | `boolean \| TodayOptions` | `false` | Highlight today's cell. `true` uses defaults (ring, blue, 2px). |

### `TodayOptions` shape

```ts
interface TodayOptions {
  color?: string                          // highlight color (default: '#0969da' / '#58a6ff' in dark)
  style?: 'ring' | 'fill'  // visual style (default: 'ring')
  size?:  number           // thickness in px (default: 2)
}
```

| Style | Description |
|---|---|
| `ring` | Inset border around the cell |
| `fill` | Fills the cell with `color`, overriding the heat color |

## Tooltip

| Prop | Type | Default | Description |
|---|---|---|---|
| `tooltipEnabled` | `boolean` | `true` | Enable hover tooltip. |
| `tooltipFormatter` | `(day: HeatmapDay) => string` | built-in | Custom tooltip text. |

## Localization

| Prop | Type | Default | Description |
|---|---|---|---|
| `locale` | `HeatmapLocale` | English | Month names, weekday names, labels. |
| `dateFormat` | `string \| ((date: string) => string)` | `'YYYY-MM-DD'` | Date display format. Tokens: `YYYY`, `MM`, `DD`. |

### `HeatmapLocale` shape

```ts
interface HeatmapLocale {
  months?:        [string × 12]  // full month names
  monthsShort?:   [string × 12]  // abbreviated month names
  weekdays?:      [string × 7]   // full day names (index 0 = Sunday)
  weekdaysShort?: [string × 7]   // abbreviated day names
  noDataLabel?:   string          // label for empty days in tooltip
  formatDate?:    (date: string) => string  // custom date formatter
}
```
