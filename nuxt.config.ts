// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = import.meta.env.NUXT_PUBLIC_SITE_URL || import.meta.env.DOMAIN || 'https://dailyopsstudio.com'
const defaultOgImage = '/images/dailyops/social-banner.png'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl: import.meta.env.NUXT_PUBLIC_SITE_URL || import.meta.env.DOMAIN || '',
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
      titleTemplate: '%s | DailyOpsStudio',
      link: [{ rel: 'icon', type: 'image/png', href: '/images/dailyops/favicon.png' }],
      meta: [
        {
          name: 'description',
          content: 'Practical templates for work, business and everyday life.'
        },
        {
          property: 'og:image',
          content: `${siteUrl}${defaultOgImage}`
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:image',
          content: `${siteUrl}${defaultOgImage}`
        }
      ]
    }
  },
  site: {
    url: 'https://dailyopsstudio.com',
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
  robots: {},
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
