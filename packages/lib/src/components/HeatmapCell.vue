<script setup lang="ts">
import { computed } from 'vue'
import type { HeatmapDay } from '../types/data'
import type { TodayOptions } from '../types/today'

interface Props {
  day:          HeatmapDay
  cellStyle:    Record<string, string>
  cellClass:    string
  isToday:      boolean
  todayOptions: TodayOptions | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click:      [day: HeatmapDay, event: MouseEvent]
  mouseenter: [day: HeatmapDay, event: MouseEvent]
  mouseleave: [day: HeatmapDay, event: MouseEvent]
}>()

const todayStyle = computed((): Record<string, string> => {
  if (!props.isToday || !props.todayOptions) return {}
  const { color = '#0969da', size = 2 } = props.todayOptions
  return {
    '--ch-today-color': color,
    '--ch-today-size': `${size}px`,
  }
})

const todayClass = computed(() => {
  if (!props.isToday || !props.todayOptions) return ''
  const style = props.todayOptions.style ?? 'ring'
  return `ch-cell--today ch-cell--today-${style}`
})
</script>

<template>
  <div
    class="ch-cell"
    :class="[props.cellClass, todayClass]"
    :style="{ ...props.cellStyle, ...todayStyle }"
    :aria-label="`${props.day.date}: ${props.day.value}`"
    :aria-current="props.isToday ? 'date' : undefined"
    role="gridcell"
    @click="emit('click', props.day, $event)"
    @mouseenter="emit('mouseenter', props.day, $event)"
    @mouseleave="emit('mouseleave', props.day, $event)"
  />
</template>
