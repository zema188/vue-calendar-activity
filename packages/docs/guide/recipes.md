---
title: Recipes
---

<script setup>
import { ref } from 'vue'

function generateData(days = 365) {
  const result = {}
  const today = new Date()
  for (let i = days; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (Math.random() > 0.4)
      result[d.toISOString().slice(0, 10)] = Math.ceil(Math.random() * 10)
  }
  return result
}

const data = generateData()

const selected = ref(null)

const liveData = ref({})
function addToday() {
  const today = new Date().toISOString().slice(0, 10)
  liveData.value = { ...liveData.value, [today]: (liveData.value[today] ?? 0) + 1 }
}
</script>

# Recipes

## Data

### Object map (recommended)

<div class="demo-preview">
<CalendarHeatmap :data="{ '2025-01-14': 3, '2025-01-15': 7, '2025-03-22': 1 }" range="month" />
</div>

```vue
<script setup lang="ts">
const data = {
  '2025-01-14': 3,
  '2025-01-15': 7,
  '2025-03-22': 1,
}
</script>
<template>
  <CalendarHeatmap :data="data" />
</template>
```

### Array of `{ date, value }`

```vue
<script setup lang="ts">
import type { HeatmapDataArray } from 'vue-calendar-activity'

const data: HeatmapDataArray = [
  { date: '2025-01-14', value: 3 },
  { date: '2025-01-15', value: 7 },
]
</script>
<template>
  <CalendarHeatmap :data="data" />
</template>
```

---

## Date Range

### Range presets

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" />
</div>

```vue
<CalendarHeatmap :data="data" range="year" />
<CalendarHeatmap :data="data" range="6months" />
<CalendarHeatmap :data="data" range="3months" />
<CalendarHeatmap :data="data" range="month" />
```

### Custom start / end dates

<div class="demo-preview">
<CalendarHeatmap :data="data" start-date="2025-01-01" end-date="2025-06-30" />
</div>

```vue
<CalendarHeatmap
  :data="data"
  start-date="2025-01-01"
  end-date="2025-06-30"
/>
```

---

## Colors

### Built-in color presets

<div class="demo-preview demo-stack">
<CalendarHeatmap :data="data" range="3months" color-preset="github" />
<CalendarHeatmap :data="data" range="3months" color-preset="blue" />
<CalendarHeatmap :data="data" range="3months" color-preset="orange" />
<CalendarHeatmap :data="data" range="3months" color-preset="red" />
<CalendarHeatmap :data="data" range="3months" color-preset="purple" />
<CalendarHeatmap :data="data" range="3months" color-preset="teal" />
</div>

```vue
<!-- github (default), blue, orange, red, purple, teal -->
<CalendarHeatmap :data="data" color-preset="blue" />
<CalendarHeatmap :data="data" color-preset="purple" />
<CalendarHeatmap :data="data" color-preset="teal" />
```

### Auto-palette from one target color

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" color-to="#0ea5e9" />
</div>

```vue
<CalendarHeatmap :data="data" color-to="#0ea5e9" />
```

### Gradient scale

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" scale-mode="gradient" color-from="#fef9c3" color-to="#854d0e" />
</div>

```vue
<CalendarHeatmap
  :data="data"
  scale-mode="gradient"
  color-from="#fef9c3"
  color-to="#854d0e"
/>
```

### Explicit colors per level

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" :colors="['#f1f5f9','#bae6fd','#38bdf8','#0284c7','#0c4a6e']" />
</div>

```vue
<!-- index 0 = empty day -->
<CalendarHeatmap
  :data="data"
  :colors="['#f1f5f9', '#bae6fd', '#38bdf8', '#0284c7', '#0c4a6e']"
/>
```

### Custom empty (level 0) color

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" color-preset="blue" empty-color="#f0fdf4" />
</div>

```vue
<CalendarHeatmap :data="data" color-preset="blue" empty-color="#f8fafc" />
```

### More / fewer levels

<div class="demo-preview demo-stack">
<CalendarHeatmap :data="data" range="3months" :levels="3" />
<CalendarHeatmap :data="data" range="3months" :levels="8" />
</div>

```vue
<CalendarHeatmap :data="data" :levels="3" />
<CalendarHeatmap :data="data" :levels="8" />
```

---

## Layout & Style

### Vertical orientation

<div class="demo-preview">
<CalendarHeatmap :data="data" orientation="vertical" range="3months" />
</div>

```vue
<CalendarHeatmap :data="data" orientation="vertical" range="3months" />
```

### Cell size and gap

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" :cell-size="16" :cell-gap="4" />
</div>

```vue
<CalendarHeatmap :data="data" :cell-size="16" :cell-gap="4" />
```

### Circle cells (Duolingo-style)

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" :cell-size="14" :cell-gap="4" :cell-radius="50" />
</div>

```vue
<CalendarHeatmap :data="data" :cell-size="14" :cell-gap="4" :cell-radius="50" />
```

### Dark theme

<div class="demo-preview demo-dark">
<CalendarHeatmap :data="data" range="3months" theme="dark" />
</div>

```vue
<CalendarHeatmap :data="data" theme="dark" />
```

### Minimal — no labels, no legend

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" :show-months="false" :show-weekdays="false" :show-legend="false" :tooltip-enabled="false" />
</div>

```vue
<CalendarHeatmap
  :data="data"
  :show-months="false"
  :show-weekdays="false"
  :show-legend="false"
  :tooltip-enabled="false"
/>
```

### Week starts on Sunday

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" :week-start="0" />
</div>

```vue
<CalendarHeatmap :data="data" :week-start="0" />
```

---

## Locale

### Built-in Russian locale

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" locale="ru" />
```

### Custom locale (French)

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" :locale="{ monthsShort: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'], weekdaysShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'], noDataLabel: 'Aucune activité', on: 'le' }" :week-start="1" />
</div>

```vue
<script setup lang="ts">
import type { HeatmapLocale } from 'vue-calendar-activity'

const locale: HeatmapLocale = {
  monthsShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
                'Jul','Aoû','Sep','Oct','Nov','Déc'],
  weekdaysShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
  noDataLabel: 'Aucune activité',
  on: 'le',
}
</script>
<template>
  <CalendarHeatmap :data="data" :locale="locale" :week-start="1" />
</template>
```

### Custom date format in tooltip

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" date-format="DD.MM.YYYY" />
</div>

```vue
<!-- tokens: YYYY, MM, DD -->
<CalendarHeatmap :data="data" date-format="DD.MM.YYYY" />
```

---

## Interaction

### Click to select a day

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" @cell-click="(day) => selected = day" />
<p v-if="selected" class="demo-selected">{{ selected.date }} — {{ selected.value }} activity</p>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { HeatmapDay } from 'vue-calendar-activity'

const selected = ref<HeatmapDay | null>(null)
</script>
<template>
  <CalendarHeatmap :data="data" @cell-click="(day) => selected = day" />
  <p v-if="selected">{{ selected.date }} — {{ selected.value }}</p>
</template>
```

### Reactive / live-updating data

<div class="demo-preview">
<CalendarHeatmap :data="liveData" range="month" />
<button class="demo-btn" @click="addToday">+1 today</button>
</div>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const data = ref<Record<string, number>>({})

function addToday() {
  const today = new Date().toISOString().slice(0, 10)
  data.value = { ...data.value, [today]: (data.value[today] ?? 0) + 1 }
}
</script>
<template>
  <CalendarHeatmap :data="data" />
  <button @click="addToday">+1 today</button>
</template>
```

---

## Tooltip

### Custom tooltip text (prop)

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" :tooltip-formatter="(day) => day.value === 0 ? `No commits on ${day.date}` : `${day.value} commit${day.value !== 1 ? 's' : ''} on ${day.date}`" />
</div>

```vue
<script setup lang="ts">
import type { HeatmapDay } from 'vue-calendar-activity'

function formatter(day: HeatmapDay): string {
  if (day.value === 0) return `No commits on ${day.date}`
  return `${day.value} commit${day.value !== 1 ? 's' : ''} on ${day.date}`
}
</script>
<template>
  <CalendarHeatmap :data="data" :tooltip-formatter="formatter" />
</template>
```

### Custom tooltip slot (full HTML)

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month">
  <template #tooltip="{ day }">
    <div style="text-align:center;line-height:1.6">
      <strong>{{ day.date }}</strong><br/>
      <span>{{ day.value }} commits</span>
    </div>
  </template>
</CalendarHeatmap>
</div>

```vue
<CalendarHeatmap :data="data">
  <template #tooltip="{ day }">
    <div style="text-align:center">
      <strong>{{ day.date }}</strong><br />
      <span>{{ day.value }} commits</span>
    </div>
  </template>
</CalendarHeatmap>
```

---

## Today Highlight

### Default (ring)

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" today />
</div>

```vue
<CalendarHeatmap :data="data" today />
```

### Both styles

<div class="demo-preview demo-stack">
<CalendarHeatmap :data="data" range="month" :today="{ style: 'ring', color: '#0969da', size: 2 }" />
<CalendarHeatmap :data="data" range="month" :today="{ style: 'fill', color: '#0969da' }" />
</div>

```vue
<!-- ring — inset border -->
<CalendarHeatmap :data="data" :today="{ style: 'ring', color: '#0969da', size: 2 }" />

<!-- fill — overrides heat color -->
<CalendarHeatmap :data="data" :today="{ style: 'fill', color: '#0969da' }" />
```

### Custom color

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" :today="{ style: 'ring', color: '#f97316', size: 2 }" />
</div>

```vue
<CalendarHeatmap :data="data" :today="{ style: 'ring', color: '#f97316', size: 2 }" />
```

---

## Legend

### Legend with label

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" :show-legend="true" legend-label="Commits" />
</div>

```vue
<CalendarHeatmap :data="data" :show-legend="true" legend-label="Commits" />
```

---

## Scale

### Shared max value across multiple charts

<div class="demo-preview demo-stack">
<CalendarHeatmap :data="data" range="3months" :max-value="10" legend-label="Team A" />
<CalendarHeatmap :data="data" range="3months" :max-value="10" color-preset="blue" legend-label="Team B" />
</div>

```vue
<!-- both charts use the same scale -->
<CalendarHeatmap :data="teamA" :max-value="100" legend-label="Team A" />
<CalendarHeatmap :data="teamB" :max-value="100" legend-label="Team B" />
```

<style>
.demo-preview {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 12px 0;
  overflow-x: auto;
}
.demo-preview.demo-dark {
  background: #0d1117;
}
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-selected {
  margin-top: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.demo-btn {
  margin-top: 10px;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 13px;
}
.demo-btn:hover {
  background: var(--vp-c-bg-mute);
}
</style>
