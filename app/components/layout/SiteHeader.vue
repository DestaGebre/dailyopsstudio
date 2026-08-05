<script setup lang="ts">
import MainNavigation from '~/components/layout/MainNavigation.vue'
import MobileNavigation from '~/components/layout/MobileNavigation.vue'
import SiteContainer from '~/components/layout/SiteContainer.vue'
import { useSiteLinks } from '~/composables/useSiteLinks'

const { etsyUrl, socialLinks } = useSiteLinks()
const headerSocialLinks = socialLinks.slice(0, 2)
</script>

<template>
  <header class="site-header">
    <SiteContainer>
      <div class="site-header__inner">
        <NuxtLink class="site-brand" to="/" aria-label="DailyOpsStudio home">
          <NuxtImg
            class="site-brand__logo"
            src="/images/dailyops/logo-primary.png"
            alt="DailyOpsStudio main logo"
            width="240"
            height="96"
            loading="eager"
            fetchpriority="high"
          />
        </NuxtLink>
        <MainNavigation />
        <ul v-if="headerSocialLinks.length" class="site-header__social" aria-label="Social media links">
          <li v-for="socialLink in headerSocialLinks" :key="socialLink.label">
            <a :href="socialLink.url" target="_blank" rel="noopener noreferrer">{{ socialLink.label }}</a>
          </li>
        </ul>
        <a v-if="etsyUrl" class="site-header__cta" :href="etsyUrl" target="_blank" rel="noopener noreferrer">
          Shop on Etsy
        </a>
        <MobileNavigation />
      </div>
    </SiteContainer>
  </header>
</template>
