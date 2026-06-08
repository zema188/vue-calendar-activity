---
title: Playground
---

<script setup>
import { ref, computed } from 'vue'
import {
  generatePalette,
  buildLevelColors,
  interpolateColor,
  COLOR_PRESETS,
} from 'vue-calendar-activity'
import ColorPicker from '../.vitepress/theme/components/ColorPicker.vue'

function generateData(days = 365) {
  const result = {}
  const today = new Date()
  for (let i = days; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (Math.random() > 0.4)
      result[d.toISOString().slice(0, 10)] = Math.ceil(Math.random() * 10)
  }
  return result
}

const data = generateData()

const range          = ref('year')
const weekStart      = ref(1)
const orientation    = ref('horizontal')
const theme          = ref('auto')
const lang           = ref('en')
const cellSize       = ref(12)
const cellGap        = ref(3)
const cellRadius     = ref(2)
const levels         = ref(5)
const showMonths     = ref(true)
const showWeekdays   = ref(true)
const showLegend     = ref(true)
const tooltipEnabled = ref(true)
const stickyWeekdays = ref(true)

// ── today highlight ────────────────────────────────────
const todayEnabled = ref(false)
const todayStyle   = ref('ring')
const todayColor   = ref('#0969da')
const todaySize    = ref(2)

const resolvedToday = computed(() =>
  todayEnabled.value
    ? { style: todayStyle.value, color: todayColor.value, size: todaySize.value }
    : false
)

// ── color ──────────────────────────────────────────────
const colorMode   = ref('preset')   // 'preset' | 'single' | 'gradient'
const colorPreset = ref('github')
const colorTo     = ref('#216e39')
const colorFrom   = ref('#9be9a8')
const customEmpty = ref(true)
const emptyColor  = ref('#ffffff')

const isDark = computed(() => {
  if (theme.value === 'dark') return true
  if (theme.value === 'light') return false
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-color-scheme: dark)').matches
})

const resolvedEmpty     = computed(() => customEmpty.value ? emptyColor.value : undefined)
const resolvedPreset    = computed(() => colorMode.value === 'preset'   ? colorPreset.value : undefined)
const resolvedColorTo   = computed(() => colorMode.value !== 'preset'   ? colorTo.value     : undefined)
const resolvedColorFrom = computed(() => colorMode.value === 'gradient' ? colorFrom.value   : undefined)
const resolvedScaleMode = computed(() => colorMode.value === 'gradient' ? 'gradient'        : 'levels')

// live palette swatches — mirrors the component's own color resolution
const palettePreview = computed(() => {
  const n = levels.value
  if (colorMode.value === 'gradient') {
    return Array.from({ length: 5 }, (_, i) =>
      i === 0
        ? (resolvedEmpty.value ?? '#ebedf0')
        : interpolateColor(colorFrom.value, colorTo.value, (i - 1) / 3))
  }
  if (colorMode.value === 'single') {
    return generatePalette(colorTo.value, n, resolvedEmpty.value)
  }
  const base = isDark.value
    ? COLOR_PRESETS[colorPreset.value].dark
    : COLOR_PRESETS[colorPreset.value].light
  const p = buildLevelColors(base, n)
  if (resolvedEmpty.value) p[0] = resolvedEmpty.value
  return p
})
</script>

# Playground

<div class="pg-layout">
<div class="pg-preview">
<CalendarHeatmap
  :data="data"
  :range="range"
  :week-start="weekStart"
  :orientation="orientation"
  :theme="theme"
  :cell-size="cellSize"
  :cell-gap="cellGap"
  :cell-radius="cellRadius"
  :scale-mode="resolvedScaleMode"
  :levels="levels"
  :color-preset="resolvedPreset"
  :color-to="resolvedColorTo"
  :color-from="resolvedColorFrom"
  :empty-color="resolvedEmpty"
  :show-months="showMonths"
  :show-weekdays="showWeekdays"
  :show-legend="showLegend"
  :tooltip-enabled="tooltipEnabled"
  :sticky-weekdays="stickyWeekdays"
  :locale="lang"
  :today="resolvedToday"
/>
</div>
<div class="pg-controls">
<div class="pg-group">
<div class="pg-group-title">Locale &amp; Language</div>
<label class="pg-field">
<span>Language</span>
<select v-model="lang">
<option value="en">English</option>
<option value="ru">Русский</option>
</select>
</label>
</div>
<div class="pg-group">
<div class="pg-group-title">Date &amp; Range</div>
<label class="pg-field">
<span>Range</span>
<select v-model="range">
<option value="year">Last year</option>
<option value="6months">Last 6 months</option>
<option value="3months">Last 3 months</option>
<option value="month">This month</option>
</select>
</label>
<label class="pg-field">
<span>Week starts</span>
<select v-model.number="weekStart">
<option :value="1">Monday</option>
<option :value="0">Sunday</option>
</select>
</label>
<label class="pg-field">
<span>Orientation</span>
<select v-model="orientation">
<option value="horizontal">Horizontal</option>
<option value="vertical">Vertical</option>
</select>
</label>
</div>
<div class="pg-group">
<div class="pg-group-title">Appearance</div>
<label class="pg-field">
<span>Theme</span>
<select v-model="theme">
<option value="auto">Auto</option>
<option value="light">Light</option>
<option value="dark">Dark</option>
</select>
</label>
<label class="pg-field">
<span>Cell size — {{ cellSize }}px</span>
<input type="range" v-model.number="cellSize" min="8" max="24" step="1" />
</label>
<label class="pg-field">
<span>Cell gap — {{ cellGap }}px</span>
<input type="range" v-model.number="cellGap" min="1" max="8" step="1" />
</label>
<label class="pg-field">
<span>Border radius — {{ cellRadius }}px</span>
<input type="range" v-model.number="cellRadius" min="0" max="50" step="1" />
</label>
</div>
<div class="pg-group">
<div class="pg-group-title">Colors</div>
<label class="pg-field">
<span>Color mode</span>
<select v-model="colorMode">
<option value="preset">Preset</option>
<option value="single">Single color</option>
<option value="gradient">Gradient</option>
</select>
</label>
<label class="pg-field" v-if="colorMode === 'preset'">
<span>Preset</span>
<select v-model="colorPreset">
<option value="github">GitHub (green)</option>
<option value="blue">Blue</option>
<option value="orange">Orange</option>
<option value="red">Red</option>
<option value="purple">Purple</option>
<option value="teal">Teal</option>
</select>
</label>
<div class="pg-field" v-if="colorMode === 'gradient'">
<span>Color from</span>
<ColorPicker v-model="colorFrom" />
</div>
<div class="pg-field" v-if="colorMode !== 'preset'">
<span>{{ colorMode === 'gradient' ? 'Color to' : 'Target color' }}</span>
<ColorPicker v-model="colorTo" />
</div>
<label class="pg-field" v-if="colorMode !== 'gradient'">
<span>Levels — {{ levels }}</span>
<input type="range" v-model.number="levels" min="2" max="10" step="1" />
</label>
<label class="pg-check">
<input type="checkbox" v-model="customEmpty" />
<span>Custom empty (level 0) color</span>
</label>
<div class="pg-field" v-if="customEmpty">
<span>Empty color</span>
<ColorPicker v-model="emptyColor" />
</div>
<div class="pg-field">
<span>Palette preview</span>
<div class="pg-swatches">
<span
  v-for="(c, i) in palettePreview"
  :key="i"
  class="pg-swatch"
  :style="{ background: c }"
  :title="`Level ${i}: ${c}`"
/>
</div>
</div>
</div>
<div class="pg-group">
<div class="pg-group-title">Today Highlight</div>
<label class="pg-check">
<input type="checkbox" v-model="todayEnabled" />
<span>Highlight today</span>
</label>
<template v-if="todayEnabled">
<label class="pg-field">
<span>Style</span>
<select v-model="todayStyle">
<option value="ring">Ring</option>
<option value="fill">Fill</option>
</select>
</label>
<div class="pg-field">
<span>Color</span>
<ColorPicker v-model="todayColor" />
</div>
<label class="pg-field">
<span>Size — {{ todaySize }}px</span>
<input type="range" v-model.number="todaySize" min="1" max="6" step="1" />
</label>
</template>
</div>
<div class="pg-group">
<div class="pg-group-title">Labels &amp; Options</div>
<label class="pg-check">
<input type="checkbox" v-model="showMonths" />
<span>Month labels</span>
</label>
<label class="pg-check">
<input type="checkbox" v-model="showWeekdays" />
<span>Weekday labels</span>
</label>
<label class="pg-check">
<input type="checkbox" v-model="showLegend" />
<span>Legend</span>
</label>
<label class="pg-check">
<input type="checkbox" v-model="tooltipEnabled" />
<span>Tooltip</span>
</label>
<label class="pg-check" v-if="showWeekdays">
<input type="checkbox" v-model="stickyWeekdays" />
<span>Sticky weekdays on scroll</span>
</label>
</div>
</div>
</div>

<style>
.pg-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
}
.pg-preview {
  display: flex;
  padding: 24px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow-x: auto;
}
.pg-controls {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
.pg-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.pg-group-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-2);
  padding-bottom: 4px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.pg-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}
.pg-field > span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.pg-field select,
.pg-field input[type="range"] {
  width: 100%;
  accent-color: var(--vp-c-brand-1);
}
.pg-field select {
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  cursor: pointer;
}
.pg-color-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pg-color-row input[type="color"] {
  width: 36px;
  height: 28px;
  padding: 2px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  flex-shrink: 0;
}
.pg-color-val {
  font-size: 12px;
  font-family: monospace;
  color: var(--vp-c-text-2);
}
.pg-swatches {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.pg-swatch {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}
.pg-check {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.pg-check > span {
  font-size: 13px;
  color: var(--vp-c-text-1);
}
.pg-check input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: var(--vp-c-brand-1);
  cursor: pointer;
  flex-shrink: 0;
}
</style>
