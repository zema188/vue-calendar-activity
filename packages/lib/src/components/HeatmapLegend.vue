<script setup lang="ts">
interface Props {
  colors: string[]
  label?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="ch-legend" aria-hidden="true">
    <span v-if="props.label" class="ch-legend-label">{{ props.label }}</span>
    <div class="ch-legend-cells">
      <div
        v-for="(color, i) in props.colors"
        :key="i"
        class="ch-cell ch-legend-cell"
        :style="{ backgroundColor: color }"
      />
    </div>
  </div>
</template>
