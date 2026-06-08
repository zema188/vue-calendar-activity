<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { HeatmapDay } from '../types/data'

interface Props {
  day:       HeatmapDay | null
  visible:   boolean
  x:         number
  y:         number
  formatter: (day: HeatmapDay) => string
}

const props  = defineProps<Props>()
const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

const OFFSET = 12

const style = computed(() => ({
  left: `${props.x + OFFSET}px`,
  top:  `${props.y + OFFSET}px`,
}))

const text = computed(() =>
  props.day ? props.formatter(props.day) : '',
)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isMounted && props.visible && props.day"
      class="ch-tooltip"
      :style="style"
      role="tooltip"
    >
      <slot :day="props.day">{{ text }}</slot>
    </div>
  </Teleport>
</template>
