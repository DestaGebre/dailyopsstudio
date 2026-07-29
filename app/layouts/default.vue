<script setup lang="ts">
import SiteContainer from '~/components/layout/SiteContainer.vue'
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/layout/SiteHeader.vue'
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main>
      <SiteContainer>
        <slot />
      </SiteContainer>
    </main>
    <SiteFooter />
  </div>
</template>
