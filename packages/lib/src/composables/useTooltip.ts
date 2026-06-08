import { ref } from 'vue'
import type { Ref } from 'vue'
import type { HeatmapDay } from '../types/data'

interface TooltipPosition {
  x: number
  y: number
}

interface UseTooltipReturn {
  visible:  Ref<boolean>
  activeDay: Ref<HeatmapDay | null>
  position: Ref<TooltipPosition>
  show:     (day: HeatmapDay, event: MouseEvent) => void
  hide:     () => void
}

export function useTooltip(): UseTooltipReturn {
  const visible   = ref(false)
  const activeDay = ref<HeatmapDay | null>(null)
  const position  = ref<TooltipPosition>({ x: 0, y: 0 })

  function show(day: HeatmapDay, event: MouseEvent): void {
    activeDay.value = day
    position.value  = { x: event.clientX, y: event.clientY }
    visible.value   = true
  }

  function hide(): void {
    visible.value   = false
    activeDay.value = null
  }

  return { visible, activeDay, position, show, hide }
}
