<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import type { CalendarHeatmapProps } from "../types/props";
import type { HeatmapDay } from "../types/data";
import { useCalendar } from "../composables/useCalendar";
import { useColorScale } from "../composables/useColorScale";
import { useLocale } from "../composables/useLocale";
import { useTooltip } from "../composables/useTooltip";
import { normalizeData, computeMaxValue } from "../utils/data";
import { resolveRange, parsePx, formatDateString } from "../utils/date";
import HeatmapGrid from "./HeatmapGrid.vue";
import MonthLabels from "./MonthLabels.vue";
import WeekdayLabels from "./WeekdayLabels.vue";
import HeatmapLegend from "./HeatmapLegend.vue";
import HeatmapTooltip from "./HeatmapTooltip.vue";

const props = withDefaults(defineProps<CalendarHeatmapProps>(), {
  data: () => [],
  startDate: undefined,
  endDate: undefined,
  range: undefined,
  scaleMode: "levels",
  levels: 5,
  colorPreset: undefined,
  colors: undefined,
  colorFrom: undefined,
  colorTo: undefined,
  maxValue: undefined,
  theme: "auto",
  cellSize: 12,
  cellGap: 3,
  cellRadius: 2,
  weekStart: 1,
  orientation: "horizontal",
  showWeekdays: true,
  showMonths: true,
  showLegend: true,
  legendLabel: "",
  tooltipEnabled: true,
  tooltipFormatter: undefined,
  locale: 'en',
  dateFormat: "YYYY-MM-DD",
  emptyColor: undefined,
  stickyWeekdays: true,
});

const emit = defineEmits<{
  "cell-click": [day: HeatmapDay, event: MouseEvent];
  "cell-mouseenter": [day: HeatmapDay, event: MouseEvent];
  "cell-mouseleave": [day: HeatmapDay, event: MouseEvent];
}>();

// ─── derived computeds ─────────────────────────────────────────────────────

const resolvedLocale = useLocale(computed(() => props.locale ?? 'en'));

const dataMap = computed(() => normalizeData(props.data ?? []));

const resolvedMaxValue = computed(
  () => props.maxValue ?? computeMaxValue(dataMap.value),
);

const resolvedLevels = computed(() =>
  Math.max(2, Math.min(props.levels ?? 5, 10)),
);

const dateRange = computed(() =>
  resolveRange(props.range, props.startDate, props.endDate),
);

// ─── calendar grid ─────────────────────────────────────────────────────────

const { weeks, monthPositions } = useCalendar({
  start: computed(() => dateRange.value.start),
  end: computed(() => dateRange.value.end),
  weekStart: computed(() => props.weekStart ?? 1),
  dataMap,
  maxValue: resolvedMaxValue,
  levels: resolvedLevels,
});

// ─── dark mode detection ───────────────────────────────────────────────────

const isDark = computed(() => {
  const t = props.theme ?? "auto";
  if (t === "dark") return true;
  if (t === "light") return false;
  if (typeof window !== "undefined")
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  return false;
});

// ─── color scale ───────────────────────────────────────────────────────────

const { legendColors, getCellStyle, getCellClass } = useColorScale({
  scaleMode: computed(() => props.scaleMode ?? "levels"),
  levels: resolvedLevels,
  colors: computed(() => props.colors),
  colorPreset: computed(() => props.colorPreset),
  colorFrom: computed(() => props.colorFrom),
  colorTo: computed(() => props.colorTo),
  emptyColor: computed(() => props.emptyColor),
  maxValue: resolvedMaxValue,
  isDark,
});

// ─── tooltip ───────────────────────────────────────────────────────────────

const tooltip = useTooltip();

function defaultFormatter(day: HeatmapDay): string {
  const locale = resolvedLocale.value;
  const dateStr = formatDateString(day.date, props.dateFormat ?? "YYYY-MM-DD");
  const sep = locale.on ? ` ${locale.on} ` : ' '
  if (day.value === 0) return `${locale.noDataLabel}${sep}${dateStr}`;
  return `${day.value}${sep}${dateStr}`;
}

const resolvedFormatter = computed(
  () => props.tooltipFormatter ?? defaultFormatter,
);

function handleMouseenter(day: HeatmapDay, event: MouseEvent): void {
  tooltip.show(day, event);
  emit("cell-mouseenter", day, event);
}

function handleMouseleave(day: HeatmapDay, event: MouseEvent): void {
  tooltip.hide();
  emit("cell-mouseleave", day, event);
}

function handleClick(day: HeatmapDay, event: MouseEvent): void {
  emit("cell-click", day, event);
}

// ─── weekday labels ────────────────────────────────────────────────────────

const weekdayLabels = computed<string[]>(() => {
  const ws = props.weekStart ?? 1;
  const shorts = resolvedLocale.value.weekdaysShort;
  return Array.from({ length: 7 }, (_, i) => shorts[(ws + i) % 7] ?? "");
});

// ─── orientation ───────────────────────────────────────────────────────────

const isVertical = computed(() => props.orientation === "vertical");

// Sticky left only makes sense in horizontal layout (left axis + horizontal scroll).
const stickyLeft = computed(() => props.stickyWeekdays && !isVertical.value);

// ─── sizing helpers ────────────────────────────────────────────────────────

const cellSizePx = computed(() => parsePx(props.cellSize, 12));
const cellGapPx = computed(() => parsePx(props.cellGap, 3));
const cellRadiusPx = computed(() => parsePx(props.cellRadius, 2));

// ─── root CSS vars ─────────────────────────────────────────────────────────

const rootStyle = computed(() => {
  const vars: Record<string, string> = {
    "--ch-cell-size": `${cellSizePx.value}px`,
    "--ch-cell-gap": `${cellGapPx.value}px`,
    "--ch-cell-radius": `${cellRadiusPx.value}px`,
  };

  return vars;
});

// ─── scroll tracking for sticky bg ────────────────────────────────────────

const scrollEl = ref<HTMLElement | null>(null);
const isScrolled = ref(false);

function onScroll(): void {
  isScrolled.value = (scrollEl.value?.scrollLeft ?? 0) > 0;
}

onMounted(() => {
  scrollEl.value?.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  scrollEl.value?.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <div
    class="calendar-heatmap"
    :data-theme="props.theme ?? 'auto'"
    :style="rootStyle"
    :aria-label="'Activity calendar'"
  >
    <div
      ref="scrollEl"
      class="ch-scroll"
      :class="{ 'ch-scrolled': isScrolled }"
    >
      <div
        class="ch-body"
        :class="{
          'ch-body--vertical': isVertical,
          'ch-body--no-weekdays': !props.showWeekdays,
          'ch-body--no-months': !props.showMonths,
        }"
      >
        <!-- corner + weekday labels both stick left so they move together -->
        <div
          v-if="props.showWeekdays && props.showMonths"
          class="ch-corner"
          :class="{ 'ch-sticky-left': stickyLeft }"
          aria-hidden="true"
        />

        <MonthLabels
          v-if="props.showMonths"
          :positions="monthPositions"
          :month-names="resolvedLocale.monthsShort"
          :week-count="weeks.length"
          :cell-size="cellSizePx"
          :cell-gap="cellGapPx"
          :orientation="props.orientation"
        />

        <WeekdayLabels
          v-if="props.showWeekdays"
          :labels="weekdayLabels"
          :cell-size="cellSizePx"
          :cell-gap="cellGapPx"
          :orientation="props.orientation"
          :class="{ 'ch-sticky-left': stickyLeft }"
        />

        <HeatmapGrid
          :weeks="weeks"
          :get-cell-style="getCellStyle"
          :get-cell-class="getCellClass"
          :orientation="props.orientation"
          @cell-click="handleClick"
          @cell-mouseenter="handleMouseenter"
          @cell-mouseleave="handleMouseleave"
        />
      </div>
    </div>

    <HeatmapLegend
      v-if="props.showLegend"
      :colors="legendColors"
      :label="props.legendLabel"
    />

    <HeatmapTooltip
      v-if="props.tooltipEnabled"
      :day="tooltip.activeDay.value"
      :visible="tooltip.visible.value"
      :x="tooltip.position.value.x"
      :y="tooltip.position.value.y"
      :formatter="resolvedFormatter"
    >
      <template v-if="$slots.tooltip" #default="slotProps">
        <slot name="tooltip" v-bind="slotProps" />
      </template>
    </HeatmapTooltip>
  </div>
</template>
