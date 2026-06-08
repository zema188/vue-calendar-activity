type Tuple12<T> = [T, T, T, T, T, T, T, T, T, T, T, T]
type Tuple7<T>  = [T, T, T, T, T, T, T]

export type LangCode = 'en' | 'ru'

export interface HeatmapLocale {
  months?:        Tuple12<string>
  monthsShort?:   Tuple12<string>
  weekdays?:      Tuple7<string>
  weekdaysShort?: Tuple7<string>
  noDataLabel?:   string
  on?:            string
  formatDate?:    (date: string) => string
}

export type LocaleProp = LangCode | HeatmapLocale

export interface ResolvedLocale {
  months:        Tuple12<string>
  monthsShort:   Tuple12<string>
  weekdays:      Tuple7<string>
  weekdaysShort: Tuple7<string>
  noDataLabel:   string
  on:            string
  formatDate:    (date: string) => string
}
