---
layout: home
hero:
  name: vue-calendar-activity
  text: Календарь-хитмап в стиле GitHub для Vue 3
  tagline: Гибкий, полностью типизированный, SSR-готовый компонент календаря активности
  actions:
    - theme: brand
      text: Начать
      link: /ru/guide/getting-started
    - theme: alt
      text: Песочница
      link: /ru/playground/
features:
  - title: Гибкие диапазоны дат
    details: Передавайте даты начала/конца или используйте готовые пресеты — год, месяц, 3 месяца, 6 месяцев.
  - title: Два режима цвета
    details: Фиксированные уровни (как в GitHub) или плавный градиент. Оба полностью настраиваемые.
  - title: TypeScript в первую очередь
    details: Все пропсы, события, слоты и composable-API строго типизированы — ни одного any.
  - title: Готов к SSR
    details: Никакого обращения к window/document при импорте. Работает из коробки с Nuxt.
  - title: Темизация
    details: Светлая/тёмная/авто темы. Переопределяйте любой цвет через CSS-переменные или пропсы.
  - title: Локализация
    details: Названия месяцев, дней недели, формат даты — всё переопределяется через проп locale.
---

<script setup>
function generateData() {
  const result = {}
  const today = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (Math.random() > 0.35)
      result[d.toISOString().slice(0, 10)] = Math.ceil(Math.random() * 10)
  }
  return result
}
const data = generateData()
</script>

<div class="home-demo-wrap">
  <div class="home-demo">
    <div class="home-demo__label">Живой пример</div>
    <div class="home-demo__scroll">
      <CalendarHeatmap :data="data" range="year" locale="ru" />
    </div>
  </div>
</div>

<style>
.home-demo-wrap {
  padding: 0 24px 64px;
}
.home-demo {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.home-demo__label {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.home-demo__scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
