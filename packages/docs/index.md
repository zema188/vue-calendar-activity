---
layout: home
hero:
  name: vue-calendar-activity
  text: GitHub-style heatmap for Vue 3
  tagline: Flexible, fully-typed, SSR-ready calendar heatmap component
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Playground
      link: /playground/
features:
  - title: Flexible date ranges
    details: Pass start/end dates or use built-in presets — year, month, 3 months, 6 months.
  - title: Dual color modes
    details: Fixed levels (GitHub-style) or smooth gradient. Both fully customizable.
  - title: TypeScript-first
    details: All props, emits, slots, and composable APIs are strictly typed — zero any.
  - title: SSR-ready
    details: No window/document access at import time. Works out of the box with Nuxt.
  - title: Themeable
    details: Light/dark/auto themes. Override any color via CSS custom properties or props.
  - title: Localizable
    details: Month names, weekday names, date format — everything overridable via locale prop.
---

<script setup>
function generateData() {
  const result = {}
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (Math.random() > 0.35)
      result[d.toISOString().slice(0, 10)] = Math.ceil(Math.random() * 10)
  }
  return result
}
const data = generateData()
</script>

<div class="home-demo">
  <div class="home-demo__label">Live preview</div>
  <CalendarHeatmap :data="data" range="year" />
</div>

<style>
.home-demo {
  max-width: 900px;
  margin: 0 auto 64px;
  padding: 32px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  overflow-x: auto;
}
.home-demo__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
</style>
