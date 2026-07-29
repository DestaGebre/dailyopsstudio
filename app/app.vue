<script setup lang="ts">
import { seoConfig } from '~/config/seo'

useHead({
  htmlAttrs: { lang: seoConfig.language },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: seoConfig.themeColor },
    { name: 'keywords', content: seoConfig.keywords },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', href: '/images/dailyops/favicon.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ]
})

usePageSeo()
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
