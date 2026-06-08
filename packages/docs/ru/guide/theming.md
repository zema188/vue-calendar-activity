# Темизация

## Встроенные темы

Проп `theme` переключает светлую, тёмную и авто-тему (следует за `prefers-color-scheme`):

```vue
<CalendarHeatmap :data="data" theme="dark" />
<CalendarHeatmap :data="data" theme="light" />
<CalendarHeatmap :data="data" theme="auto" />  <!-- по умолчанию -->
```

## Свои цвета через пропсы

Передайте массив цветов для каждого уровня (индекс 0 = пустой день):

```vue
<CalendarHeatmap
  :data="data"
  :colors="['#f0f0f0', '#c6e7ff', '#82cfff', '#33aaff', '#0066cc']"
/>
```

Для режима градиента задайте `color-from` и `color-to`:

```vue
<CalendarHeatmap
  :data="data"
  scale-mode="gradient"
  color-from="#ffecb3"
  color-to="#e65100"
/>
```

## Готовые цветовые пресеты

Проп `color-preset` даёт готовую палитру (учитывает светлую/тёмную тему):

```vue
<CalendarHeatmap :data="data" color-preset="blue" />
<CalendarHeatmap :data="data" color-preset="purple" />
```

Доступные пресеты: `github`, `blue`, `orange`, `red`, `purple`, `teal`.

## Один цвет → авто-палитра

Передайте только `color-to` — палитра уровней сгенерируется автоматически от светлого оттенка к указанному цвету:

```vue
<CalendarHeatmap :data="data" color-to="#9333ea" :levels="6" />
```

## CSS-переменные

Переопределяйте любую CSS-переменную на `.calendar-heatmap` или своей обёртке:

```css
.my-heatmap {
  --ch-color-level-0: #f5f5f5;
  --ch-color-level-1: #ffd6e0;
  --ch-color-level-2: #ffb3c1;
  --ch-color-level-3: #ff85a1;
  --ch-color-level-4: #c9184a;
  --ch-cell-size: 14px;
  --ch-cell-gap: 4px;
  --ch-cell-radius: 50%;   /* круги! */
  --ch-font-color: #333;
}
```

### Все доступные переменные

| Переменная | По умолчанию (светлая) | Описание |
|---|---|---|
| `--ch-cell-size` | `12px` | Ширина и высота ячейки |
| `--ch-cell-gap` | `3px` | Отступ между ячейками |
| `--ch-cell-radius` | `2px` | Скругление углов ячейки |
| `--ch-font-size` | `11px` | Размер шрифта подписей |
| `--ch-font-color` | `#57606a` | Цвет текста подписей |
| `--ch-color-level-0` | `#ebedf0` | Цвет пустого дня |
| `--ch-color-level-1` | `#9be9a8` | Цвет уровня 1 |
| `--ch-color-level-2` | `#40c463` | Цвет уровня 2 |
| `--ch-color-level-3` | `#30a14e` | Цвет уровня 3 |
| `--ch-color-level-4` | `#216e39` | Цвет уровня 4 |
| `--ch-color-gradient-from` | `#9be9a8` | Начало градиента |
| `--ch-color-gradient-to` | `#216e39` | Конец градиента |
| `--ch-tooltip-bg` | `#1b1f24` | Фон тултипа |
| `--ch-tooltip-color` | `#ffffff` | Цвет текста тултипа |

## Форма ячейки

```vue
<!-- Квадрат (по умолчанию) -->
<CalendarHeatmap :data="data" :cell-radius="2" />

<!-- Полностью круглые -->
<CalendarHeatmap :data="data" :cell-radius="50" />
```
