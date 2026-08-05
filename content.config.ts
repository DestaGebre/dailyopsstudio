import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'page',
      source: 'products/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        collection: z.string(),
        documentType: z.string(),
        productId: z.string(),
        status: z.enum(['draft', 'published', 'archived']),
        featured: z.boolean().default(false),
        price: z.string(),
        currency: z.string().default('EUR'),
        etsyUrl: z.string().url().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).default([]),
        audience: z.array(z.string()).default([]),
        frequency: z.string().optional()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        dateModified: z.string().optional(),
        category: z.string(),
        author: z.string().default('DailyOpsStudio'),
        status: z.enum(['draft', 'published', 'archived']),
        featured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        relatedProductId: z.string().optional()
      })
    })
  }
})
