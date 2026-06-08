<script setup lang="ts">
import { computed } from 'vue'
import type { WeekColumn, HeatmapDay } from '../types/data'
import type { Orientation } from '../types/theme'
import HeatmapCell from './HeatmapCell.vue'

interface Props {
  weeks:        WeekColumn[]
  getCellStyle: (value: number, level: number) => Record<string, string>
  getCellClass: (level: number) => string
  orientation:  Orientation
}

const props = defineProps<Props>()

const isVertical = computed(() => props.orientation === 'vertical')

const emit = defineEmits<{
  'cell-click':      [day: HeatmapDay, event: MouseEvent]
  'cell-mouseenter': [day: HeatmapDay, event: MouseEvent]
  'cell-mouseleave': [day: HeatmapDay, event: MouseEvent]
}>()
</script>

<template>
  <div class="ch-grid" :class="{ 'ch-grid--vertical': isVertical }" role="grid">
    <div
      v-for="(week, wi) in props.weeks"
      :key="wi"
      class="ch-week"
      role="row"
    >
      <template v-for="(day, di) in week.days" :key="di">
        <HeatmapCell
          v-if="day !== null"
          :day="day"
          :cell-style="props.getCellStyle(day.value, day.level)"
          :cell-class="props.getCellClass(day.level)"
          @click="(d, e) => emit('cell-click', d, e)"
          @mouseenter="(d, e) => emit('cell-mouseenter', d, e)"
          @mouseleave="(d, e) => emit('cell-mouseleave', d, e)"
        />
        <div v-else class="ch-cell ch-cell--empty" role="gridcell" aria-hidden="true" />
      </template>
    </div>
  </div>
</template>
