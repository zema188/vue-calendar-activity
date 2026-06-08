<script setup lang="ts">
import { CalendarHeatmap } from 'vue-calendar-activity'

const props = defineProps<{ locale?: string }>()

function generateData() {
  const result: Record<string, number> = {}
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

<template>
  <div class="home-demo-wrap">
    <div class="home-demo">
      <div class="home-demo__label">{{ locale === 'ru' ? 'Живой пример' : 'Live preview' }}</div>
      <div class="home-demo__scroll">
        <CalendarHeatmap :data="data" range="year" :locale="locale ?? 'en'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-demo-wrap {
  padding: 0 24px 64px;
  margin-top: 48px;
}
.home-demo {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.home-demo__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.home-demo__scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
