<script setup>
function generateDemoData() {
  const result = {}
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (Math.random() > 0.55) {
      result[d.toISOString().slice(0, 10)] = Math.ceil(Math.random() * 9)
    }
  }
  return result
}

const quickStartData = generateDemoData()

const basicData = [
  { date: '2024-06-15', value: 4 },
  { date: '2024-09-20', value: 2 },
  { date: '2024-12-10', value: 7 },
]
</script>

# Getting Started

## Quick Start

Get up and running in 3 steps:

**1. Install**

::: code-group
```sh [pnpm]
pnpm add vue-calendar-activity
```
```sh [npm]
npm install vue-calendar-activity
```
```sh [yarn]
yarn add vue-calendar-activity
```
:::

**2. Add to your component**

```vue
<script setup lang="ts">
import { CalendarHeatmap } from 'vue-calendar-activity'
import 'vue-calendar-activity/style.css'

const data = {
  '2024-03-10': 3,
  '2024-05-22': 8,
  '2024-07-04': 5,
  '2024-09-18': 2,
  '2024-11-30': 9,
}
</script>

<template>
  <CalendarHeatmap :data="data" />
</template>
```

**3. Result**

<div style="padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px; margin: 16px 0; overflow-x: auto;">
  <CalendarHeatmap :data="quickStartData" />
</div>

::: tip
`data` accepts both an **object map** `{ 'YYYY-MM-DD': value }` and an **array** `[{ date, value }]`.
See [Data formats](#data-formats) below.
:::

---

## Installation

::: code-group
```sh [pnpm]
pnpm add vue-calendar-activity
```
```sh [npm]
npm install vue-calendar-activity
```
```sh [yarn]
yarn add vue-calendar-activity
```
:::

## Basic usage

Import the component and its styles, then pass your data:

```vue
<script setup lang="ts">
import { CalendarHeatmap } from 'vue-calendar-activity'
import 'vue-calendar-activity/style.css'

const data = [
  { date: '2024-06-15', value: 4 },
  { date: '2024-09-20', value: 2 },
  { date: '2024-12-10', value: 7 },
]
</script>

<template>
  <CalendarHeatmap :data="data" start-date="2024-01-01" end-date="2024-12-31" />
</template>
```

<CalendarHeatmap :data="basicData" start-date="2024-01-01" end-date="2024-12-31" />

## Data formats

The component accepts two formats — use whichever fits your backend:

```ts
// Array of objects
const data = [
  { date: '2024-01-15', value: 5 },
  { date: '2024-01-16', value: 2 },
]

// Object map  { 'YYYY-MM-DD': value }
const data = {
  '2024-01-15': 5,
  '2024-01-16': 2,
}
```

## Date range

Use `range` for common presets, or `startDate`/`endDate` for full control:

```vue
<!-- Last year (default) -->
<CalendarHeatmap :data="data" range="year" />

<!-- Current month only -->
<CalendarHeatmap :data="data" range="month" />

<!-- Custom range -->
<CalendarHeatmap
  :data="data"
  start-date="2023-01-01"
  end-date="2023-12-31"
/>
```

## Listening to events

```vue
<script setup lang="ts">
import type { HeatmapDay } from 'vue-calendar-activity'

function onDayClick(day: HeatmapDay, event: MouseEvent) {
  console.log(day.date, day.value)
}
</script>

<template>
  <CalendarHeatmap :data="data" @cell-click="onDayClick" />
</template>
```
