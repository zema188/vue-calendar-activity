import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { ScaleMode, ColorPreset } from '../types/theme'
import { interpolateColor, buildLevelColors, generatePalette } from '../utils/color'
import { DEFAULT_COLORS, DEFAULT_COLORS_DARK, COLOR_PRESETS } from '../constants/defaults'

interface UseColorScaleOptions {
  scaleMode:   ComputedRef<ScaleMode>
  levels:      ComputedRef<number>
  colors:      ComputedRef<string[] | undefined>
  colorPreset: ComputedRef<ColorPreset | undefined>
  colorFrom:   ComputedRef<string | undefined>
  colorTo:     ComputedRef<string | undefined>
  emptyColor:  ComputedRef<string | undefined>
  maxValue:    ComputedRef<number>
  isDark:      ComputedRef<boolean>
}

type CellStyleFn = (value: number, level: number) => Record<string, string>

interface UseColorScaleReturn {
  levelColors:  ComputedRef<string[]>
  legendColors: ComputedRef<string[]>
  getCellStyle: ComputedRef<CellStyleFn>
  getCellClass: (level: number) => string
}

export function useColorScale(opts: UseColorScaleOptions): UseColorScaleReturn {
  const { scaleMode, levels, colors, colorPreset, colorFrom, colorTo, emptyColor, maxValue, isDark } = opts

  const levelColors = computed<string[]>(() => {
    const n = levels.value

    // Explicit emptyColor prop (may be undefined). Used where the user owns
    // level 0 (explicit colors / preset) — only overrides when provided.
    const explicitEmpty = emptyColor.value

    // Default empty colour for "generated" palettes (single / built-in default):
    // white on light/auto-light, a dark surface on dark — so empty cells
    // "just work" out of the box without passing emptyColor.
    const defaultEmpty = explicitEmpty ?? '#ffffff'

    // 1. Explicit colors array — highest priority (colors[0] = empty by contract)
    const explicit = colors.value
    if (explicit && explicit.length > 0) {
      const palette = buildLevelColors(explicit, n)
      if (explicitEmpty) palette[0] = explicitEmpty
      return palette
    }

    // 2. Named preset (light/dark aware, keeps its own designed empty)
    const preset = colorPreset.value
    if (preset && preset in COLOR_PRESETS) {
      const base = isDark.value ? COLOR_PRESETS[preset].dark : COLOR_PRESETS[preset].light
      const palette = buildLevelColors(base, n)
      if (explicitEmpty) palette[0] = explicitEmpty
      return palette
    }

    // 3. Single target color → generate palette (white empty by default)
    const to = colorTo.value
    if (to) {
      return generatePalette(to, n, defaultEmpty, colorFrom.value)
    }

    // 4. Default github (dark-aware) — white empty by default
    const def = isDark.value ? DEFAULT_COLORS_DARK : DEFAULT_COLORS
    const palette = buildLevelColors(def, n)
    palette[0] = defaultEmpty
    return palette
  })

  const legendColors = computed<string[]>(() => {
    if (scaleMode.value === 'gradient') {
      const colors = levelColors.value
      const from = colorFrom.value ?? colors[1] ?? '#9be9a8'
      const to   = colorTo.value   ?? colors[colors.length - 1] ?? '#216e39'
      return Array.from({ length: 5 }, (_, i) =>
        i === 0 ? (colors[0] ?? '#ebedf0') : interpolateColor(from, to, i / 4),
      )
    }
    return levelColors.value
  })

  // Computed so new function reference is created when levelColors changes.
  // HeatmapGrid receives a changed prop → re-renders automatically.
  const getCellStyle = computed<CellStyleFn>(() => {
    const palette  = levelColors.value
    const mode     = scaleMode.value
    const max      = maxValue.value
    const from     = colorFrom.value ?? palette[1] ?? '#9be9a8'
    const to       = colorTo.value   ?? palette[palette.length - 1] ?? '#216e39'
    const fallback = palette[0] ?? '#ebedf0'

    return (value: number, level: number): Record<string, string> => {
      if (mode === 'gradient') {
        if (value <= 0 || max <= 0) return { backgroundColor: fallback }
        const t = Math.min(value / max, 1)
        return { backgroundColor: interpolateColor(from, to, t) }
      }
      return { backgroundColor: palette[level] ?? fallback }
    }
  })

  function getCellClass(level: number): string {
    return `ch-level-${level}`
  }

  return { levelColors, legendColors, getCellStyle, getCellClass }
}

export { DEFAULT_COLORS, DEFAULT_COLORS_DARK, COLOR_PRESETS }
