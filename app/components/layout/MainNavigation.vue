<script setup lang="ts">
import { useSiteNavigation } from '~/composables/useSiteNavigation'

const route = useRoute()
const navItems = useSiteNavigation()

const isCurrentRoute = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <nav aria-label="Primary" class="main-nav">
    <ul class="main-nav__list">
      <li v-for="item in navItems" :key="item.to">
        <NuxtLink :to="item.to" class="main-nav__link" :aria-current="isCurrentRoute(item.to) ? 'page' : undefined">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
