import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { HeatmapDay, WeekColumn, MonthPosition, HeatmapDataMap } from '../types/data'
import type { WeekStart } from '../types/theme'
import { addDays, startOfWeek, toDateString, parseLocalDate } from '../utils/date'

interface UseCalendarOptions {
  start:     ComputedRef<Date>
  end:       ComputedRef<Date>
  weekStart: ComputedRef<WeekStart>
  dataMap:   ComputedRef<HeatmapDataMap>
  maxValue:  ComputedRef<number>
  levels:    ComputedRef<number>
}

interface UseCalendarReturn {
  weeks:           ComputedRef<WeekColumn[]>
  monthPositions:  ComputedRef<MonthPosition[]>
}

export function useCalendar(opts: UseCalendarOptions): UseCalendarReturn {
  const { start, end, weekStart, dataMap, maxValue, levels } = opts

  const weeks = computed<WeekColumn[]>(() => {
    const result: WeekColumn[] = []
    const firstWeekStart = startOfWeek(start.value, weekStart.value)
    let cursor = new Date(firstWeekStart)

    while (cursor <= end.value) {
      const days: (HeatmapDay | null)[] = []

      for (let d = 0; d < 7; d++) {
        const day = addDays(cursor, d)

        if (day < start.value || day > end.value) {
          days.push(null)
        } else {
          const dateStr = toDateString(day)
          const value   = dataMap.value[dateStr] ?? 0
          const level   = computeLevel(value, maxValue.value, levels.value)
          days.push({ date: dateStr, value, level })
        }
      }

      result.push({ days })
      cursor = addDays(cursor, 7)
    }

    return result
  })

  const monthPositions = computed<MonthPosition[]>(() => {
    const positions: MonthPosition[] = []
    let lastMonth = -1

    weeks.value.forEach((week, weekIndex) => {
      const firstDay = week.days.find(d => d !== null)
      if (!firstDay) return

      const date  = parseLocalDate(firstDay.date)
      const month = date.getMonth()

      if (month !== lastMonth) {
        positions.push({ month, year: date.getFullYear(), weekIndex })
        lastMonth = month
      }
    })

    return positions
  })

  return { weeks, monthPositions }
}

function computeLevel(value: number, max: number, levels: number): number {
  if (value <= 0 || max <= 0) return 0
  return Math.min(Math.ceil((value / max) * (levels - 1)), levels - 1)
}
