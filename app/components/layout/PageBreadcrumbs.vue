<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

defineProps<{ items: BreadcrumbItem[] }>()
</script>

<template>
  <nav class="page-breadcrumbs" aria-label="Breadcrumb">
    <ol class="page-breadcrumbs__list">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="page-breadcrumbs__item">
        <NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
        <span v-else aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
