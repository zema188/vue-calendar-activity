# Theming

## Built-in themes

The `theme` prop switches between light, dark, and auto (follows `prefers-color-scheme`):

```vue
<CalendarHeatmap :data="data" theme="dark" />
<CalendarHeatmap :data="data" theme="light" />
<CalendarHeatmap :data="data" theme="auto" />  <!-- default -->
```

## Custom colors via props

Pass an array of colors for each level (index 0 = empty day):

```vue
<CalendarHeatmap
  :data="data"
  :colors="['#f0f0f0', '#c6e7ff', '#82cfff', '#33aaff', '#0066cc']"
/>
```

For gradient mode, set `color-from` and `color-to`:

```vue
<CalendarHeatmap
  :data="data"
  scale-mode="gradient"
  color-from="#ffecb3"
  color-to="#e65100"
/>
```

## CSS custom properties

Override any CSS variable on `.calendar-heatmap` or your own wrapper:

```css
.my-heatmap {
  --ch-color-level-0: #f5f5f5;
  --ch-color-level-1: #ffd6e0;
  --ch-color-level-2: #ffb3c1;
  --ch-color-level-3: #ff85a1;
  --ch-color-level-4: #c9184a;
  --ch-cell-size: 14px;
  --ch-cell-gap: 4px;
  --ch-cell-radius: 50%;   /* circles! */
  --ch-font-color: #333;
}
```

### All available variables

| Variable | Default (light) | Description |
|---|---|---|
| `--ch-cell-size` | `12px` | Cell width and height |
| `--ch-cell-gap` | `3px` | Gap between cells |
| `--ch-cell-radius` | `2px` | Cell border radius |
| `--ch-font-size` | `11px` | Label font size |
| `--ch-font-color` | `#57606a` | Label text color |
| `--ch-color-level-0` | `#ebedf0` | Empty day color |
| `--ch-color-level-1` | `#9be9a8` | Level 1 color |
| `--ch-color-level-2` | `#40c463` | Level 2 color |
| `--ch-color-level-3` | `#30a14e` | Level 3 color |
| `--ch-color-level-4` | `#216e39` | Level 4 color |
| `--ch-color-gradient-from` | `#9be9a8` | Gradient start |
| `--ch-color-gradient-to` | `#216e39` | Gradient end |
| `--ch-tooltip-bg` | `#1b1f24` | Tooltip background |
| `--ch-tooltip-color` | `#ffffff` | Tooltip text color |

## Cell shape

```vue
<!-- Square (default) -->
<CalendarHeatmap :data="data" :cell-radius="2" />

<!-- Fully rounded -->
<CalendarHeatmap :data="data" :cell-radius="50" />
```
