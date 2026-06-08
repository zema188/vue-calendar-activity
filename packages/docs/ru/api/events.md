# События

Каждое событие получает полный объект `HeatmapDay` плюс исходный `MouseEvent`.

## `cell-click`

Срабатывает при клике по ячейке дня.

```ts
(day: HeatmapDay, event: MouseEvent) => void
```

## `cell-mouseenter`

Срабатывает, когда курсор входит в ячейку дня.

```ts
(day: HeatmapDay, event: MouseEvent) => void
```

## `cell-mouseleave`

Срабатывает, когда курсор покидает ячейку дня.

```ts
(day: HeatmapDay, event: MouseEvent) => void
```

## Тип `HeatmapDay`

```ts
interface HeatmapDay {
  date:  string  // 'YYYY-MM-DD'
  value: number  // исходное значение из ваших данных
  level: number  // вычисленный 0–N (0 = нет данных)
}
```

## Пример

```vue
<script setup lang="ts">
import type { HeatmapDay } from 'vue-calendar-activity'

function onCellClick(day: HeatmapDay, event: MouseEvent) {
  console.log(`Клик ${day.date}: ${day.value} (уровень ${day.level})`)
}
</script>

<template>
  <CalendarHeatmap
    :data="data"
    @cell-click="onCellClick"
    @cell-mouseenter="(day) => console.log('вход', day.date)"
    @cell-mouseleave="(day) => console.log('выход', day.date)"
  />
</template>
```
