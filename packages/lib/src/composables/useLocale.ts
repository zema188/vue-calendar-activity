import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { HeatmapLocale, LocaleProp, ResolvedLocale } from '../types/locale'
import { DEFAULT_LOCALE, LOCALES } from '../constants/defaults'

export function useLocale(locale: ComputedRef<LocaleProp | undefined>): ComputedRef<ResolvedLocale> {
  return computed<ResolvedLocale>(() => {
    const l = locale.value
    if (!l || l === 'en') return DEFAULT_LOCALE
    if (typeof l === 'string') return LOCALES[l] ?? DEFAULT_LOCALE
    const obj = l as HeatmapLocale
    return {
      months:        obj.months        ?? DEFAULT_LOCALE.months,
      monthsShort:   obj.monthsShort   ?? DEFAULT_LOCALE.monthsShort,
      weekdays:      obj.weekdays       ?? DEFAULT_LOCALE.weekdays,
      weekdaysShort: obj.weekdaysShort  ?? DEFAULT_LOCALE.weekdaysShort,
      noDataLabel:   obj.noDataLabel   ?? DEFAULT_LOCALE.noDataLabel,
      on:            obj.on            ?? DEFAULT_LOCALE.on,
      formatDate:    obj.formatDate    ?? DEFAULT_LOCALE.formatDate,
    }
  })
}
