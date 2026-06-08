<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  swatches?: string[]
}>(), {
  swatches: () => [
    '#216e39', '#2563eb', '#ea580c', '#e11d48', '#9333ea', '#0d9488',
    '#db2777', '#ca8a04', '#0891b2', '#475569', '#15803d', '#1e293b',
  ],
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

// ─── colour conversions ─────────────────────────────────────────────────────

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim())
  if (!m) return null
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0'))
    .join('')
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r)      h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else                h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  const s = max === 0 ? 0 : d / max
  return [h, s, max]
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r = 0, g = 0, b = 0
  if      (h < 60)  { r = c; g = x; b = 0 }
  else if (h < 120) { r = x; g = c; b = 0 }
  else if (h < 180) { r = 0; g = c; b = x }
  else if (h < 240) { r = 0; g = x; b = c }
  else if (h < 300) { r = x; g = 0; b = c }
  else              { r = c; g = 0; b = x }
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255]
}

// ─── internal HSV state ─────────────────────────────────────────────────────

const h = ref(0)
const s = ref(0)
const v = ref(0)
const hexInput = ref(props.modelValue)

function syncFromHex(hex: string): void {
  const rgb = hexToRgb(hex)
  if (!rgb) return
  const [nh, ns, nv] = rgbToHsv(rgb[0], rgb[1], rgb[2])
  h.value = nh; s.value = ns; v.value = nv
}

syncFromHex(props.modelValue)

const currentHex = computed(() => {
  const [r, g, b] = hsvToRgb(h.value, s.value, v.value)
  return rgbToHex(r, g, b)
})

function emitColor(): void {
  hexInput.value = currentHex.value
  emit('update:modelValue', currentHex.value)
}

// external changes → sync (skip while user drags)
const dragging = ref(false)
watch(() => props.modelValue, val => {
  if (dragging.value) return
  if (val.toLowerCase() !== currentHex.value.toLowerCase()) {
    syncFromHex(val)
    hexInput.value = val
  }
})

// ─── popover open/close ─────────────────────────────────────────────────────

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function onDocClick(e: MouseEvent): void {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false
}

onMounted(()       => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

// ─── SV square drag ─────────────────────────────────────────────────────────

const svArea = ref<HTMLElement | null>(null)

function updateSV(e: PointerEvent): void {
  const el = svArea.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  s.value = clamp((e.clientX - rect.left) / rect.width, 0, 1)
  v.value = clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1)
  emitColor()
}

function onSvDown(e: PointerEvent): void {
  dragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  updateSV(e)
}
function onSvMove(e: PointerEvent): void { if (dragging.value) updateSV(e) }
function onSvUp(e: PointerEvent): void {
  dragging.value = false
  ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
}

// ─── hue slider drag ────────────────────────────────────────────────────────

const hueBar = ref<HTMLElement | null>(null)

function updateHue(e: PointerEvent): void {
  const el = hueBar.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  h.value = clamp((e.clientX - rect.left) / rect.width, 0, 1) * 360
  emitColor()
}

function onHueDown(e: PointerEvent): void {
  dragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  updateHue(e)
}
function onHueMove(e: PointerEvent): void { if (dragging.value) updateHue(e) }
function onHueUp(e: PointerEvent): void {
  dragging.value = false
  ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
}

// ─── hex input ──────────────────────────────────────────────────────────────

function commitHex(): void {
  const rgb = hexToRgb(hexInput.value)
  if (rgb) {
    syncFromHex(hexInput.value)
    emitColor()
  } else {
    hexInput.value = currentHex.value
  }
}

function pickSwatch(c: string): void {
  syncFromHex(c)
  emitColor()
}

const hueColor   = computed(() => rgbToHex(...hsvToRgb(h.value, 1, 1)))
const svKnobX    = computed(() => `${s.value * 100}%`)
const svKnobY    = computed(() => `${(1 - v.value) * 100}%`)
const hueKnobX   = computed(() => `${(h.value / 360) * 100}%`)
</script>

<template>
  <div ref="root" class="cp">
    <button
      type="button"
      class="cp-trigger"
      @click.stop="open = !open"
    >
      <span class="cp-trigger-swatch" :style="{ background: currentHex }" />
      <span class="cp-trigger-hex">{{ currentHex }}</span>
    </button>

    <div v-if="open" class="cp-panel" @click.stop>
      <div
        ref="svArea"
        class="cp-sv"
        :style="{ background: hueColor }"
        @pointerdown="onSvDown"
        @pointermove="onSvMove"
        @pointerup="onSvUp"
      >
        <div class="cp-sv-white" />
        <div class="cp-sv-black" />
        <div class="cp-sv-knob" :style="{ left: svKnobX, top: svKnobY, background: currentHex }" />
      </div>

      <div
        ref="hueBar"
        class="cp-hue"
        @pointerdown="onHueDown"
        @pointermove="onHueMove"
        @pointerup="onHueUp"
      >
        <div class="cp-hue-knob" :style="{ left: hueKnobX }" />
      </div>

      <div class="cp-hexrow">
        <span class="cp-preview" :style="{ background: currentHex }" />
        <input
          class="cp-hex"
          v-model="hexInput"
          spellcheck="false"
          @keydown.enter="commitHex"
          @blur="commitHex"
        />
      </div>

      <div class="cp-swatches">
        <button
          v-for="c in props.swatches"
          :key="c"
          type="button"
          class="cp-swatch"
          :style="{ background: c }"
          :title="c"
          @click="pickSwatch(c)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cp {
  position: relative;
  display: inline-block;
  width: 100%;
}
.cp-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
}
.cp-trigger-swatch {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}
.cp-trigger-hex {
  font-family: monospace;
  font-size: 12px;
  color: var(--vp-c-text-1);
}
.cp-panel {
  position: absolute;
  z-index: 50;
  top: calc(100% + 6px);
  left: 0;
  width: 220px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cp-sv {
  position: relative;
  width: 100%;
  height: 130px;
  border-radius: 6px;
  cursor: crosshair;
  touch-action: none;
  overflow: hidden;
}
.cp-sv-white,
.cp-sv-black {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.cp-sv-white { background: linear-gradient(to right, #fff, rgba(255,255,255,0)); }
.cp-sv-black { background: linear-gradient(to top, #000, rgba(0,0,0,0)); }
.cp-sv-knob {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.cp-hue {
  position: relative;
  width: 100%;
  height: 14px;
  border-radius: 7px;
  cursor: pointer;
  touch-action: none;
  background: linear-gradient(
    to right,
    #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%
  );
}
.cp-hue-knob {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
  background: transparent;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.cp-hexrow {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cp-preview {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}
.cp-hex {
  flex: 1;
  min-width: 0;
  padding: 5px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-family: monospace;
  font-size: 13px;
}
.cp-swatches {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 6px;
}
.cp-swatch {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 5px;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  padding: 0;
}
.cp-swatch:hover {
  transform: scale(1.12);
}
</style>
