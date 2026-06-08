<script setup lang="ts">
import { computed } from 'vue'
import type { MonthPosition } from '../types/data'
import type { Orientation } from '../types/theme'

interface Props {
  positions:   MonthPosition[]
  monthNames:  string[]
  weekCount:   number
  cellSize:    number
  cellGap:     number
  orientation: Orientation
}

const props = defineProps<Props>()

const isVertical = computed(() => props.orientation === 'vertical')

function labelFor(pos: MonthPosition): string {
  return props.monthNames[pos.month] ?? ''
}

function slotStyle(i: number): Record<string, string> {
  const last = i === props.weekCount - 1
  // Vertical: months run down the left axis (one slot per week-row).
  // Horizontal: months run along the top axis (one slot per week-column).
  return isVertical.value
    ? { height: props.cellSize + 'px', marginBottom: last ? '0' : props.cellGap + 'px' }
    : { width:  props.cellSize + 'px', marginRight:  last ? '0' : props.cellGap + 'px' }
}
</script>

<template>
  <div
    class="ch-month-labels"
    :class="{ 'ch-month-labels--vertical': isVertical }"
    aria-hidden="true"
  >
    <div
      v-for="(_, i) in props.weekCount"
      :key="i"
      class="ch-month-slot"
      :style="slotStyle(i)"
    >
      <span
        v-if="positions.some(p => p.weekIndex === i)"
        class="ch-month-label"
      >
        {{ labelFor(positions.find(p => p.weekIndex === i)!) }}
      </span>
    </div>
  </div>
</template>
