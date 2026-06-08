# Slots

## `#tooltip`

Replaces the tooltip content entirely. Receives the hovered day as scope.

**Scope:** `{ day: HeatmapDay }`

```vue
<CalendarHeatmap :data="data">
  <template #tooltip="{ day }">
    <div class="my-tooltip">
      <strong>{{ day.date }}</strong>
      <br />
      {{ day.value }} contributions
    </div>
  </template>
</CalendarHeatmap>
```

::: tip
The tooltip container (positioning, background, border-radius) is still rendered by the library. Use this slot to customize only the inner content. To replace the entire tooltip element, use CSS overrides on `.ch-tooltip`.
:::

## `#day-label`

Customize individual weekday labels on the left axis.

**Scope:** `{ weekday: number; label: string }`

```vue
<CalendarHeatmap :data="data">
  <template #day-label="{ label }">
    <em>{{ label }}</em>
  </template>
</CalendarHeatmap>
```

## `#month-label`

Customize individual month labels on the top axis.

**Scope:** `{ month: number; year: number; label: string }`

```vue
<CalendarHeatmap :data="data">
  <template #month-label="{ label, year }">
    {{ label }} {{ year }}
  </template>
</CalendarHeatmap>
```
