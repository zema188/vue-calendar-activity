import DefaultTheme from 'vitepress/theme'
import { CalendarHeatmap } from 'vue-calendar-activity'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CalendarHeatmap', CalendarHeatmap)
  },
} satisfies Theme
