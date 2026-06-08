import DefaultTheme from 'vitepress/theme'
import { CalendarHeatmap } from 'vue-calendar-activity'
import HomeDemo from './components/HomeDemo.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CalendarHeatmap', CalendarHeatmap)
    app.component('HomeDemo', HomeDemo)
  },
} satisfies Theme
