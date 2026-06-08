<script setup lang="ts">
import { computed } from 'vue'
import type { Orientation } from '../types/theme'

interface Props {
  labels:      string[]  // 7 labels ordered by weekStart
  cellSize:    number
  cellGap:     number
  orientation: Orientation
}

const props = defineProps<Props>()

const isVertical = computed(() => props.orientation === 'vertical')

function slotStyle(i: number): Record<string, string> {
  const last = i === props.labels.length - 1
  // Vertical: weekday labels run along the top axis (a horizontal row).
  // Horizontal: weekday labels run down the left axis (a vertical column).
  return isVertical.value
    ? { width:  props.cellSize + 'px', marginRight:  last ? '0' : props.cellGap + 'px' }
    : { height: props.cellSize + 'px', marginBottom: last ? '0' : props.cellGap + 'px' }
}
</script>

<template>
  <div
    class="ch-weekday-labels"
    :class="{ 'ch-weekday-labels--row': isVertical }"
  >
    <div
      v-for="(label, i) in props.labels"
      :key="i"
      class="ch-weekday-label"
      :style="slotStyle(i)"
    >
      {{ label }}
    </div>
  </div>
</template>
