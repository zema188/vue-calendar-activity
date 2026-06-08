import { defineConfig } from 'vitepress'
import { resolve } from 'path'

// ⚠️ Поменяй на реальный домен после деплоя (нужно для sitemap + hreflang).
const hostname = process.env.DOCS_HOSTNAME ?? 'https://zema188.github.io/vue-calendar-activity'

export default defineConfig({
  title: 'vue-calendar-activity',
  description: 'Modern GitHub-style calendar heatmap for Vue 3',
  // VITE_BASE нужен для GitHub Pages без кастомного домена.
  // Задай в GitHub → Settings → Variables: DOCS_BASE = /vue-calendar-activity/
  // С кастомным доменом оставь пустым (будет '/').
  base: process.env.VITE_BASE ?? '/',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: { hostname },

  // ─── i18n: en (root) + ru ──────────────────────────────────────────────────
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      description: 'Modern GitHub-style calendar heatmap for Vue 3',
      themeConfig: {
        nav: [
          { text: 'Guide',      link: '/guide/getting-started' },
          { text: 'API',        link: '/api/props' },
          { text: 'Playground', link: '/playground/' },
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'Theming',         link: '/guide/theming' },
              { text: 'Recipes',         link: '/guide/recipes' },
            ],
          },
          {
            text: 'API Reference',
            items: [
              { text: 'Props',  link: '/api/props' },
              { text: 'Events', link: '/api/events' },
              { text: 'Slots',  link: '/api/slots' },
            ],
          },
        ],
      },
    },

    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      description: 'Современный календарь-хитмап в стиле GitHub для Vue 3',
      themeConfig: {
        nav: [
          { text: 'Руководство', link: '/ru/guide/getting-started' },
          { text: 'API',         link: '/ru/api/props' },
          { text: 'Песочница',   link: '/ru/playground/' },
        ],
        sidebar: [
          {
            text: 'Руководство',
            items: [
              { text: 'Быстрый старт', link: '/ru/guide/getting-started' },
              { text: 'Темизация',     link: '/ru/guide/theming' },
              { text: 'Рецепты',       link: '/ru/guide/recipes' },
            ],
          },
          {
            text: 'Справочник API',
            items: [
              { text: 'Пропсы',  link: '/ru/api/props' },
              { text: 'События', link: '/ru/api/events' },
              { text: 'Слоты',   link: '/ru/api/slots' },
            ],
          },
        ],
        docFooter:    { prev: 'Назад', next: 'Далее' },
        outline:      { label: 'На этой странице' },
        lastUpdated:  { text: 'Обновлено' },
        returnToTopLabel:  'Наверх',
        sidebarMenuLabel:  'Меню',
        darkModeSwitchLabel: 'Тема',
        langMenuLabel:     'Сменить язык',
      },
    },
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zema188/vue-calendar-activity' },
      { icon: 'npm',    link: 'https://npmjs.com/package/vue-calendar-activity' },
    ],
  },

  // ─── SEO: canonical + hreflang для каждой страницы ──────────────────────────
  transformHead({ pageData }) {
    const rel  = pageData.relativePath          // 'guide/x.md' | 'ru/guide/x.md'
    const isRu = rel.startsWith('ru/')
    const base = isRu ? rel.slice(3) : rel
    const clean = base.replace(/index\.md$/, '').replace(/\.md$/, '')
    const enUrl = `${hostname}/${clean}`
    const ruUrl = `${hostname}/ru/${clean}`
    return [
      ['link', { rel: 'canonical', href: isRu ? ruUrl : enUrl }],
      ['link', { rel: 'alternate', hreflang: 'en', href: enUrl }],
      ['link', { rel: 'alternate', hreflang: 'ru', href: ruUrl }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: enUrl }],
    ]
  },

  vite: {
    resolve: {
      alias: {
        'vue-calendar-activity': resolve(__dirname, '../../lib/src/index.ts'),
      },
    },
    optimizeDeps: {
      exclude: ['vue-calendar-activity'],
    },
  },
})
