// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = import.meta.env.NUXT_PUBLIC_SITE_URL || import.meta.env.DOMAIN || 'https://dailyopsstudio.com'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl,
      etsyUrl: import.meta.env.NUXT_PUBLIC_ETSY_URL || import.meta.env.ETSY || '',
      instagramUrl: import.meta.env.NUXT_PUBLIC_INSTAGRAM_URL || import.meta.env.INSTAGRAM || '',
      tiktokUrl: import.meta.env.NUXT_PUBLIC_TIKTOK_URL || import.meta.env.TIKTOK || '',
      pinterestUrl:
        import.meta.env.NUXT_PUBLIC_PINTEREST_URL ||
        import.meta.env.PININTEREST ||
        import.meta.env.PINTEREST ||
        '',
      youtubeUrl: import.meta.env.NUXT_PUBLIC_YOUTUBE_URL || import.meta.env.YOUTUBE || '',
      contactEmail: import.meta.env.NUXT_PUBLIC_CONTACT_EMAIL || import.meta.env.EMAIL || ''
    }
  },
  app: {
    head: {
      titleTemplate: '%s | DailyOpsStudio'
    }
  },
  site: {
    url: siteUrl,
    name: 'DailyOpsStudio'
  },
  nitro: {
    preset: 'static'
  },
  routeRules: {
    '/**': { prerender: true }
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 2,
          searchDepth: 2
        }
      }
    }
  },
  image: {
    quality: 82,
    format: ['webp']
  },
  robots: {
    groups: [{ userAgent: ['*'], allow: ['/'] }],
    sitemap: `${siteUrl}/sitemap.xml`
  },
  sitemap: {
    autoLastmod: true,
    zeroRuntime: true
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }
})
