# vue-calendar-activity

GitHub-style calendar heatmap component for Vue 3.

[![npm](https://img.shields.io/npm/v/vue-calendar-activity)](https://www.npmjs.com/package/vue-calendar-activity)
[![npm downloads](https://img.shields.io/npm/dm/vue-calendar-activity)](https://www.npmjs.com/package/vue-calendar-activity)
[![license](https://img.shields.io/npm/l/vue-calendar-activity)](./LICENSE)

**[Documentation](https://zema188.github.io/vue-calendar-activity)** · **[Playground](https://zema188.github.io/vue-calendar-activity/playground/)**

<p align="center">
  <img src="https://zema188.github.io/vue-calendar-activity/screenshot.png" alt="vue-calendar-activity preview" />
</p>

---

## Install

```sh
npm install vue-calendar-activity
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

## Features

- Color presets: GitHub, blue, orange, red, purple, teal (light + dark variants)
- Gradient mode, custom colors array, single-color auto-palette
- Horizontal & vertical orientation
- Built-in locales: `en`, `ru` — or any custom locale object
- Dark / light / auto theme
- Custom cell size, gap, border radius (circles!)
- Sticky weekday labels on scroll
- Tooltip — formatter prop or fully custom slot
- Click / hover events (`cell-click`, `cell-mouseenter`, `cell-mouseleave`)
- Reactive — live updates when data changes
- TypeScript types included, zero dependencies

## Examples

```vue
<!-- Color preset -->
<CalendarHeatmap :data="data" color-preset="blue" />

<!-- Gradient scale -->
<CalendarHeatmap :data="data" scale-mode="gradient" color-from="#fef9c3" color-to="#854d0e" />

<!-- Vertical layout -->
<CalendarHeatmap :data="data" orientation="vertical" range="3months" />

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

Full API → [docs](https://zema188.github.io/vue-calendar-activity/api/props)

## CSS variable overrides

```css
.calendar-heatmap {
  --ch-bg:           #ffffff;
  --ch-font-color:   #57606a;
  --ch-cell-size:    12px;
  --ch-cell-gap:     3px;
  --ch-cell-radius:  2px;
  --ch-tooltip-bg:   #1b1f24;
}
```

## License

MIT © Artem Zimin
