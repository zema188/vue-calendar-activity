---
title: Рецепты
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

# Рецепты

## Данные

### Объект-карта (рекомендуется)

<div class="demo-preview">
<CalendarHeatmap :data="{ '2025-01-14': 3, '2025-01-15': 7, '2025-03-22': 1 }" range="month" locale="ru" />
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

### Массив `{ date, value }`

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

## Диапазон дат

### Пресеты диапазона

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" range="year" />
<CalendarHeatmap :data="data" range="6months" />
<CalendarHeatmap :data="data" range="3months" />
<CalendarHeatmap :data="data" range="month" />
```

### Произвольный диапазон

<div class="demo-preview">
<CalendarHeatmap :data="data" start-date="2025-01-01" end-date="2025-06-30" locale="ru" />
</div>

```vue
<CalendarHeatmap
  :data="data"
  start-date="2025-01-01"
  end-date="2025-06-30"
/>
```

---

## Цвета

### Встроенные пресеты

<div class="demo-preview demo-stack">
<CalendarHeatmap :data="data" range="3months" color-preset="github" locale="ru" />
<CalendarHeatmap :data="data" range="3months" color-preset="blue" locale="ru" />
<CalendarHeatmap :data="data" range="3months" color-preset="orange" locale="ru" />
<CalendarHeatmap :data="data" range="3months" color-preset="red" locale="ru" />
<CalendarHeatmap :data="data" range="3months" color-preset="purple" locale="ru" />
<CalendarHeatmap :data="data" range="3months" color-preset="teal" locale="ru" />
</div>

```vue
<!-- github (по умолчанию), blue, orange, red, purple, teal -->
<CalendarHeatmap :data="data" color-preset="blue" />
<CalendarHeatmap :data="data" color-preset="purple" />
<CalendarHeatmap :data="data" color-preset="teal" />
```

### Авто-палитра из одного цвета

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" color-to="#0ea5e9" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" color-to="#0ea5e9" />
```

### Градиентная шкала

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" scale-mode="gradient" color-from="#fef9c3" color-to="#854d0e" locale="ru" />
</div>

```vue
<CalendarHeatmap
  :data="data"
  scale-mode="gradient"
  color-from="#fef9c3"
  color-to="#854d0e"
/>
```

### Явные цвета для каждого уровня

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" :colors="['#f1f5f9','#bae6fd','#38bdf8','#0284c7','#0c4a6e']" locale="ru" />
</div>

```vue
<!-- индекс 0 = пустой день -->
<CalendarHeatmap
  :data="data"
  :colors="['#f1f5f9', '#bae6fd', '#38bdf8', '#0284c7', '#0c4a6e']"
/>
```

### Свой цвет пустого дня

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" color-preset="blue" empty-color="#f0fdf4" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" color-preset="blue" empty-color="#f8fafc" />
```

### Больше или меньше уровней

<div class="demo-preview demo-stack">
<CalendarHeatmap :data="data" range="3months" :levels="3" locale="ru" />
<CalendarHeatmap :data="data" range="3months" :levels="8" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" :levels="3" />
<CalendarHeatmap :data="data" :levels="8" />
```

---

## Внешний вид

### Вертикальная ориентация

<div class="demo-preview">
<CalendarHeatmap :data="data" orientation="vertical" range="3months" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" orientation="vertical" range="3months" />
```

### Размер и отступ ячеек

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" :cell-size="16" :cell-gap="4" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" :cell-size="16" :cell-gap="4" />
```

### Круглые ячейки (в стиле Duolingo)

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" :cell-size="14" :cell-gap="4" :cell-radius="50" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" :cell-size="14" :cell-gap="4" :cell-radius="50" />
```

### Тёмная тема

<div class="demo-preview demo-dark">
<CalendarHeatmap :data="data" range="3months" theme="dark" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" theme="dark" />
```

### Без подписей и легенды

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

### Неделя начинается с воскресенья

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" :week-start="0" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" :week-start="0" />
```

---

## Локализация

### Встроенный русский язык

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" locale="ru" />
</div>

```vue
<CalendarHeatmap :data="data" locale="ru" />
```

### Произвольная локаль (французский)

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

### Свой формат даты в тултипе

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" date-format="DD.MM.YYYY" locale="ru" />
</div>

```vue
<!-- токены: YYYY, MM, DD -->
<CalendarHeatmap :data="data" date-format="DD.MM.YYYY" />
```

---

## Взаимодействие

### Клик по дню

<div class="demo-preview">
<CalendarHeatmap :data="data" range="3months" locale="ru" @cell-click="(day) => selected = day" />
<p v-if="selected" class="demo-selected">{{ selected.date }} — {{ selected.value }} активностей</p>
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

### Реактивные данные

<div class="demo-preview">
<CalendarHeatmap :data="liveData" range="month" locale="ru" />
<button class="demo-btn" @click="addToday">+1 сегодня</button>
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
  <button @click="addToday">+1 сегодня</button>
</template>
```

---

## Тултип

### Свой текст (проп)

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" locale="ru" :tooltip-formatter="(day) => day.value === 0 ? `Нет активности — ${day.date}` : `${day.value} действий — ${day.date}`" />
</div>

```vue
<script setup lang="ts">
import type { HeatmapDay } from 'vue-calendar-activity'

function formatter(day: HeatmapDay): string {
  if (day.value === 0) return `Нет активности — ${day.date}`
  return `${day.value} действий — ${day.date}`
}
</script>
<template>
  <CalendarHeatmap :data="data" :tooltip-formatter="formatter" />
</template>
```

### Кастомный слот (полный HTML)

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" locale="ru">
  <template #tooltip="{ day }">
    <div style="text-align:center;line-height:1.6">
      <strong>{{ day.date }}</strong><br/>
      <span>{{ day.value }} активностей</span>
    </div>
  </template>
</CalendarHeatmap>
</div>

```vue
<CalendarHeatmap :data="data">
  <template #tooltip="{ day }">
    <div style="text-align:center">
      <strong>{{ day.date }}</strong><br />
      <span>{{ day.value }} активностей</span>
    </div>
  </template>
</CalendarHeatmap>
```

---

## Легенда

### С подписью

<div class="demo-preview">
<CalendarHeatmap :data="data" range="month" locale="ru" :show-legend="true" legend-label="Коммиты" />
</div>

```vue
<CalendarHeatmap :data="data" :show-legend="true" legend-label="Коммиты" />
```

---

## Шкала

### Общий максимум для нескольких графиков

<div class="demo-preview demo-stack">
<CalendarHeatmap :data="data" range="3months" :max-value="10" locale="ru" legend-label="Команда А" />
<CalendarHeatmap :data="data" range="3months" :max-value="10" color-preset="blue" locale="ru" legend-label="Команда Б" />
</div>

```vue
<!-- оба графика используют одну шкалу -->
<CalendarHeatmap :data="teamA" :max-value="100" legend-label="Команда А" />
<CalendarHeatmap :data="teamB" :max-value="100" legend-label="Команда Б" />
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
