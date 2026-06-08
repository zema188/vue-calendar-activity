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

# Быстрый старт

## За 3 шага

Подключите компонент за три шага:

**1. Установка**

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

**2. Добавьте в свой компонент**

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

**3. Результат**

<div style="padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px; margin: 16px 0; overflow-x: auto;">
  <CalendarHeatmap :data="quickStartData" />
</div>

::: tip
`data` принимает и **объект-карту** `{ 'YYYY-MM-DD': значение }`, и **массив** `[{ date, value }]`.
См. [Форматы данных](#форматы-данных) ниже.
:::

---

## Установка

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

## Базовое использование

Импортируйте компонент и его стили, затем передайте данные:

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

## Форматы данных

Компонент принимает два формата — используйте тот, что удобнее вашему бэкенду:

```ts
// Массив объектов
const data = [
  { date: '2024-01-15', value: 5 },
  { date: '2024-01-16', value: 2 },
]

// Объект-карта  { 'YYYY-MM-DD': значение }
const data = {
  '2024-01-15': 5,
  '2024-01-16': 2,
}
```

## Диапазон дат

Используйте `range` для частых пресетов или `startDate`/`endDate` для полного контроля:

```vue
<!-- Последний год (по умолчанию) -->
<CalendarHeatmap :data="data" range="year" />

<!-- Только текущий месяц -->
<CalendarHeatmap :data="data" range="month" />

<!-- Произвольный диапазон -->
<CalendarHeatmap
  :data="data"
  start-date="2023-01-01"
  end-date="2023-12-31"
/>
```

## Обработка событий

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
