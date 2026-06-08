# vue-calendar-activity

Modern GitHub-style calendar heatmap for Vue 3.

[![npm](https://img.shields.io/npm/v/vue-calendar-activity)](https://www.npmjs.com/package/vue-calendar-activity)
[![license](https://img.shields.io/npm/l/vue-calendar-activity)](./LICENSE)

**[Documentation](https://vue-calendar-activity.vercel.app)** · **[Playground](https://vue-calendar-activity.vercel.app/playground/)**

---

## Features

- Color presets (GitHub, blue, orange, red, purple, teal) with light/dark variants
- Single-color auto-palette, custom colors array, gradient mode
- Horizontal & vertical orientation
- Built-in locales: `en`, `ru` — or pass any custom locale object
- Dark / light / auto theme
- Custom cell size, gap, border radius (circles!)
- Sticky weekday labels on scroll
- Tooltip with formatter prop or fully custom slot
- Click / hover events
- Reactive — updates live when data changes
- TypeScript types included, zero dependencies

## Install

```sh
npm install vue-calendar-activity
# or
pnpm add vue-calendar-activity
# or
yarn add vue-calendar-activity
```

## Usage

```vue
<script setup lang="ts">
import { CalendarHeatmap } from 'vue-calendar-activity'
import 'vue-calendar-activity/style.css'

const data = {
  '2025-01-15': 3,
  '2025-03-22': 7,
  '2025-06-10': 5,
}
</script>

<template>
  <CalendarHeatmap :data="data" />
</template>
```

## Global registration (optional)

```ts
// main.ts
import { createApp } from 'vue'
import { CalendarHeatmap } from 'vue-calendar-activity'
import 'vue-calendar-activity/style.css'

const app = createApp(App)
app.component('CalendarHeatmap', CalendarHeatmap)
```

## Examples

```vue
<!-- Color preset -->
<CalendarHeatmap :data="data" color-preset="blue" />

<!-- Gradient scale -->
<CalendarHeatmap :data="data" scale-mode="gradient" color-from="#fef9c3" color-to="#854d0e" />

<!-- Vertical layout -->
<CalendarHeatmap :data="data" orientation="vertical" range="3months" />

<!-- Russian locale -->
<CalendarHeatmap :data="data" locale="ru" />

<!-- Dark theme -->
<CalendarHeatmap :data="data" theme="dark" />

<!-- Circle cells -->
<CalendarHeatmap :data="data" :cell-size="14" :cell-gap="4" :cell-radius="50" />

<!-- Custom tooltip -->
<CalendarHeatmap :data="data" :tooltip-formatter="(day) => `${day.value} commits on ${day.date}`" />

<!-- Click event -->
<CalendarHeatmap :data="data" @cell-click="(day) => console.log(day)" />
```

## Key props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `HeatmapData` | `[]` | Activity data: object map or array |
| `range` | `'year' \| 'month' \| '3months' \| '6months'` | — | Date range preset |
| `colorPreset` | `'github' \| 'blue' \| 'orange' \| 'red' \| 'purple' \| 'teal'` | — | Built-in palette |
| `colors` | `string[]` | — | Explicit colors per level (index 0 = empty) |
| `colorTo` | `string` | — | Target color for auto-palette |
| `scaleMode` | `'levels' \| 'gradient'` | `'levels'` | Color scale mode |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Color theme |
| `locale` | `'en' \| 'ru' \| HeatmapLocale` | `'en'` | Language / custom locale |
| `cellSize` | `number` | `12` | Cell size in px |
| `levels` | `number` | `5` | Number of color levels (2–10) |

Full API: [vue-calendar-activity.vercel.app/api/props](https://vue-calendar-activity.vercel.app/api/props)

## CSS variable overrides

```css
.calendar-heatmap {
  --ch-bg:           #ffffff;   /* sticky label background */
  --ch-font-color:   #57606a;
  --ch-cell-size:    12px;
  --ch-cell-gap:     3px;
  --ch-cell-radius:  2px;
  --ch-tooltip-bg:   #1b1f24;
}
```

## License

MIT © Artem Zimin
