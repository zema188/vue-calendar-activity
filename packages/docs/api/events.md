# Events

All events receive the full `HeatmapDay` object plus the original `MouseEvent`.

## `cell-click`

Fired when the user clicks a day cell.

```ts
(day: HeatmapDay, event: MouseEvent) => void
```

## `cell-mouseenter`

Fired when the cursor enters a day cell.

```ts
(day: HeatmapDay, event: MouseEvent) => void
```

## `cell-mouseleave`

Fired when the cursor leaves a day cell.

```ts
(day: HeatmapDay, event: MouseEvent) => void
```

## `HeatmapDay` type

```ts
interface HeatmapDay {
  date:  string  // 'YYYY-MM-DD'
  value: number  // raw value from your data
  level: number  // computed 0–N (0 = no data)
}
```

## Example

```vue
<script setup lang="ts">
import type { HeatmapDay } from 'vue-calendar-activity'

function onCellClick(day: HeatmapDay, event: MouseEvent) {
  console.log(`Clicked ${day.date}: ${day.value} (level ${day.level})`)
}
</script>

<template>
  <CalendarHeatmap
    :data="data"
    @cell-click="onCellClick"
    @cell-mouseenter="(day) => console.log('enter', day.date)"
    @cell-mouseleave="(day) => console.log('leave', day.date)"
  />
</template>
```
