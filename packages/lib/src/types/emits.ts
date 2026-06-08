import type { HeatmapDay } from './data'

export interface CalendarHeatmapEmits {
  (e: 'cell-click',      day: HeatmapDay, event: MouseEvent): void
  (e: 'cell-mouseenter', day: HeatmapDay, event: MouseEvent): void
  (e: 'cell-mouseleave', day: HeatmapDay, event: MouseEvent): void
}
