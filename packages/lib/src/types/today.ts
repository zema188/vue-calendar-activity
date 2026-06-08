export type TodayStyle = 'ring' | 'fill'

export interface TodayOptions {
  color?: string
  style?: TodayStyle
  size?: number
}

export type TodayProp = boolean | TodayOptions
