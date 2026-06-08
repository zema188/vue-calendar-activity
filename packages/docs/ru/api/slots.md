# Слоты

## `#tooltip`

Полностью заменяет содержимое тултипа. Получает наведённый день в scope.

**Scope:** `{ day: HeatmapDay }`

```vue
<CalendarHeatmap :data="data">
  <template #tooltip="{ day }">
    <div class="my-tooltip">
      <strong>{{ day.date }}</strong>
      <br />
      {{ day.value }} контрибуций
    </div>
  </template>
</CalendarHeatmap>
```

::: tip
Контейнер тултипа (позиционирование, фон, скругление) по-прежнему рисует библиотека. Этот слот меняет только внутреннее содержимое. Чтобы заменить весь элемент тултипа целиком, переопределите CSS на `.ch-tooltip`.
:::

## `#day-label`

Кастомизация отдельных подписей дней недели на левой оси.

**Scope:** `{ weekday: number; label: string }`

```vue
<CalendarHeatmap :data="data">
  <template #day-label="{ label }">
    <em>{{ label }}</em>
  </template>
</CalendarHeatmap>
```

## `#month-label`

Кастомизация отдельных подписей месяцев на верхней оси.

**Scope:** `{ month: number; year: number; label: string }`

```vue
<CalendarHeatmap :data="data">
  <template #month-label="{ label, year }">
    {{ label }} {{ year }}
  </template>
</CalendarHeatmap>
```
