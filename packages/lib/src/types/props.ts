import type { HeatmapData, HeatmapDay } from './data'
import type { ScaleMode, ThemeMode, WeekStart, DateRange, ColorPreset, Orientation } from './theme'
import type { LocaleProp } from './locale'

export interface CalendarHeatmapProps {
  data?:             HeatmapData
  startDate?:        string | Date
  endDate?:          string | Date
  range?:            DateRange
  scaleMode?:        ScaleMode
  levels?:           number
  colorPreset?:      ColorPreset
  colors?:           string[]
  colorFrom?:        string
  colorTo?:          string
  maxValue?:         number
  theme?:            ThemeMode
  cellSize?:         number | string
  cellGap?:          number | string
  cellRadius?:       number | string
  weekStart?:        WeekStart
  orientation?:      Orientation
  showWeekdays?:     boolean
  showMonths?:       boolean
  showLegend?:       boolean
  legendLabel?:      string
  tooltipEnabled?:   boolean
  tooltipFormatter?: (day: HeatmapDay) => string
  locale?:           LocaleProp
  dateFormat?:       string | ((date: string) => string)
  emptyColor?:       string
  stickyWeekdays?:   boolean
}
