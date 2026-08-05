// https://nuxt.com/docs/api/configuration/nuxt-config
const env =
  (
    globalThis as typeof globalThis & {
      process?: {
        env?: Record<string, string | undefined>
      }
    }
  ).process?.env ?? {}

const readEnv = (...keys: string[]) => {
  for (const key of keys) {
    const value = env[key]?.trim()

    if (value) {
      return value
    }
  }

  return ''
}

const siteUrl = readEnv('NUXT_PUBLIC_SITE_URL', 'DOMAIN') || 'https://dailyopsstudio.com'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', '@vueuse/nuxt', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl,
      etsyUrl: readEnv('NUXT_PUBLIC_ETSY_URL', 'ETSY') || 'https://www.etsy.com/shop/DailyOpsStudio',
      instagramUrl: readEnv('NUXT_PUBLIC_INSTAGRAM_URL', 'INSTAGRAM') || 'https://www.instagram.com/dailyopsstudio/',
      tiktokUrl: readEnv('NUXT_PUBLIC_TIKTOK_URL', 'TIKTOK') || 'https://www.tiktok.com/@dailyopsstudio',
      pinterestUrl:
        readEnv('NUXT_PUBLIC_PINTEREST_URL', 'PININTEREST', 'PINTEREST') || 'https://www.pinterest.com/dailyopsstudio/',
      youtubeUrl: readEnv('NUXT_PUBLIC_YOUTUBE_URL', 'YOUTUBE') || 'https://www.youtube.com/@DailyOpsStudio',
      contactEmail: readEnv('NUXT_PUBLIC_CONTACT_EMAIL', 'EMAIL') || 'dailyopsstudio@gmail.com'
    }
  },
  app: {
    head: {
      titleTemplate: '%s | DailyOpsStudio',
      meta: [{ name: 'p:domain_verify', content: '4daa5fd072243220340a3c079d8f949a' }]
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
    zeroRuntime: true,
    exclude: ['/privacy', '/terms']
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false }
})
