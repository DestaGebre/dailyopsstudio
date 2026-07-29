<script setup lang="ts">
import BlogPreview from '~/components/home/BlogPreview.vue'
import CallToAction from '~/components/home/CallToAction.vue'
import CategoryGrid from '~/components/home/CategoryGrid.vue'
import FeatureGrid from '~/components/home/FeatureGrid.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import HowItWorks from '~/components/home/HowItWorks.vue'
import ProductGrid from '~/components/home/ProductGrid.vue'

useSeoMeta({
  title: 'Home',
  description: 'Professional digital templates for operations, organization, planning and everyday life.',
  ogTitle: 'DailyOpsStudio | Practical Digital Templates',
  ogDescription: 'Discover practical templates for work, business and everyday life.',
  twitterTitle: 'DailyOpsStudio | Practical Digital Templates',
  twitterDescription: 'Discover practical templates for work, business and everyday life.'
})
</script>

<template>
  <HeroSection />
  <CategoryGrid />
  <ProductGrid />
  <FeatureGrid />
  <HowItWorks />
  <BlogPreview />
  <CallToAction />
</template>
