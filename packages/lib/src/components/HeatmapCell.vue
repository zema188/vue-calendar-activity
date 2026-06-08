<script setup lang="ts">
import type { HeatmapDay } from '../types/data'

interface Props {
  day:        HeatmapDay
  cellStyle:  Record<string, string>
  cellClass:  string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click:      [day: HeatmapDay, event: MouseEvent]
  mouseenter: [day: HeatmapDay, event: MouseEvent]
  mouseleave: [day: HeatmapDay, event: MouseEvent]
}>()
</script>

<template>
  <div
    class="ch-cell"
    :class="props.cellClass"
    :style="props.cellStyle"
    :aria-label="`${props.day.date}: ${props.day.value}`"
    role="gridcell"
    @click="emit('click', props.day, $event)"
    @mouseenter="emit('mouseenter', props.day, $event)"
    @mouseleave="emit('mouseleave', props.day, $event)"
  />
</template>
