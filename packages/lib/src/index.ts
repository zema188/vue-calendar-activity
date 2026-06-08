import './style.css'

export { default as CalendarHeatmap } from './components/CalendarHeatmap.vue'

// color helpers — build palettes outside the component (legend previews, swatches)
export { generatePalette, buildLevelColors, interpolateColor } from './utils/color'
export { COLOR_PRESETS, DEFAULT_COLORS, DEFAULT_COLORS_DARK, DEFAULT_LOCALE, LOCALE_RU, LOCALES } from './constants/defaults'

// types — consumers can import them directly
export type {
  HeatmapDay,
  HeatmapData,
  HeatmapDataArray,
  HeatmapDataMap,
  WeekColumn,
  MonthPosition,
  CalendarHeatmapProps,
  CalendarHeatmapEmits,
  HeatmapLocale,
  ResolvedLocale,
  ScaleMode,
  ThemeMode,
  WeekStart,
  DateRange,
  ColorPreset,
  Orientation,
} from './types'
