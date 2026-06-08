export interface HeatmapDay {
  date: string   // 'YYYY-MM-DD'
  value: number
  level: number  // 0 = no data, 1..N = computed activity level
}

export interface WeekColumn {
  days: (HeatmapDay | null)[]
}

export interface MonthPosition {
  month: number  // 0–11
  year: number
  weekIndex: number
}

export type HeatmapDataArray = Array<{ date: string | Date; value: number }>
export type HeatmapDataMap   = Record<string, number>
export type HeatmapData      = HeatmapDataArray | HeatmapDataMap
