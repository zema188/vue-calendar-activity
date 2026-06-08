import type { DateRange, WeekStart } from '../types/theme'

export function toDateString(date: string | Date): string {
  if (typeof date === 'string') return date.slice(0, 10)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function startOfWeek(date: Date, weekStart: WeekStart): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day - weekStart + 7) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function formatDateString(
  dateStr: string,
  format: string | ((date: string) => string),
): string {
  if (typeof format === 'function') return format(dateStr)
  const [y = '', m = '', d = ''] = dateStr.split('-')
  return format.replace('YYYY', y).replace('MM', m).replace('DD', d)
}

export function parsePx(val: number | string | undefined, fallback: number): number {
  if (val === undefined) return fallback
  if (typeof val === 'number') return val
  const n = parseFloat(val)
  return isNaN(n) ? fallback : n
}

export function resolveRange(
  range: DateRange | undefined,
  startDate: string | Date | undefined,
  endDate: string | Date | undefined,
): { start: Date; end: Date } {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (range !== undefined) {
    const end = new Date(today)
    let start: Date
    switch (range) {
      case 'month':
        start = new Date(today.getFullYear(), today.getMonth(), 1)
        break
      case '3months':
        start = addDays(today, -91)
        break
      case '6months':
        start = addDays(today, -182)
        break
      default:
        start = addDays(today, -364)
    }
    return { start, end }
  }

  const start = startDate ? parseLocalDate(toDateString(startDate)) : addDays(today, -364)
  const end   = endDate   ? parseLocalDate(toDateString(endDate))   : today

  if (start > end) {
    console.warn('[vue-calendar-activity] startDate is after endDate — values were swapped.')
    return { start: end, end: start }
  }

  return { start, end }
}
