import type { HeatmapData, HeatmapDataMap } from '../types/data'
import { toDateString } from './date'

export function normalizeData(data: HeatmapData): HeatmapDataMap {
  if (Array.isArray(data)) {
    const map: HeatmapDataMap = {}
    for (const item of data) {
      map[toDateString(item.date)] = item.value
    }
    return map
  }
  return data
}

export function computeMaxValue(dataMap: HeatmapDataMap): number {
  const values = Object.values(dataMap)
  if (values.length === 0) return 1
  return Math.max(...values, 1)
}
