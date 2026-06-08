import type { ResolvedLocale, LangCode } from '../types/locale'
import type { ColorPreset } from '../types/theme'

export const DEFAULT_LEVELS = 5

export const DEFAULT_COLORS: string[] = [
  '#ebedf0',
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39',
]

export const DEFAULT_COLORS_DARK: string[] = [
  '#161b22',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
]

export const DEFAULT_COLOR_FROM = '#9be9a8'
export const DEFAULT_COLOR_TO   = '#216e39'

export const COLOR_PRESETS: Record<ColorPreset, { light: string[]; dark: string[] }> = {
  github: {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark:  ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  },
  blue: {
    light: ['#eff6ff', '#bfdbfe', '#60a5fa', '#2563eb', '#1e3a8a'],
    dark:  ['#0a1628', '#0c2a5e', '#1d4ed8', '#3b82f6', '#93c5fd'],
  },
  orange: {
    light: ['#fff7ed', '#fed7aa', '#fb923c', '#ea580c', '#9a3412'],
    dark:  ['#1c0a00', '#431a00', '#9a3412', '#ea580c', '#fdba74'],
  },
  red: {
    light: ['#fff1f2', '#fecdd3', '#fb7185', '#e11d48', '#881337'],
    dark:  ['#1a0008', '#430015', '#881337', '#e11d48', '#fda4af'],
  },
  purple: {
    light: ['#faf5ff', '#e9d5ff', '#c084fc', '#9333ea', '#6b21a8'],
    dark:  ['#0f0020', '#2e0060', '#6b21a8', '#9333ea', '#d8b4fe'],
  },
  teal: {
    light: ['#f0fdfa', '#99f6e4', '#2dd4bf', '#0d9488', '#115e59'],
    dark:  ['#00201c', '#004d45', '#115e59', '#0d9488', '#5eead4'],
  },
}

export const DEFAULT_LOCALE: ResolvedLocale = {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
  monthsShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  weekdays:      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  noDataLabel:   'No activity',
  on:            'on',
  formatDate:    (date: string) => date,
}

export const LOCALE_RU: ResolvedLocale = {
  months: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
  ],
  monthsShort: [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',
  ],
  weekdays:      ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  noDataLabel:   'Нет активности',
  on:            '',
  formatDate:    (date: string) => date,
}

export const LOCALES: Record<LangCode, ResolvedLocale> = {
  en: DEFAULT_LOCALE,
  ru: LOCALE_RU,
}
