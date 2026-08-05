<script setup lang="ts">
import { useSiteNavigation } from '~/composables/useSiteNavigation'
import { useSiteLinks } from '~/composables/useSiteLinks'

const route = useRoute()
const navItems = useSiteNavigation()
const { etsyUrl } = useSiteLinks()

const isCurrentRoute = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <details class="mobile-nav">
    <summary>Menu</summary>
    <nav aria-label="Primary mobile">
      <ul class="mobile-nav__list">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink :to="item.to" class="mobile-nav__link" :aria-current="isCurrentRoute(item.to) ? 'page' : undefined">
            {{ item.label }}
          </NuxtLink>
        </li>
        <li v-if="etsyUrl">
          <a class="mobile-nav__link mobile-nav__link--cta" :href="etsyUrl" target="_blank" rel="noopener noreferrer">
            Shop on Etsy
          </a>
        </li>
      </ul>
    </nav>
  </details>
</template>
