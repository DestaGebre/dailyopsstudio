# Content publishing guide

## Product workflow

Create one Markdown file in `content/products` for each product. Keep its filename stable because it becomes the public URL.

Required product metadata:

```yaml
---
title: 'Product name'
description: 'Clear summary for cards and search results.'
category: 'Business Operations'
collection: 'Restaurant Operations'
documentType: 'Checklist'
productId: 'P012'
status: 'draft'
featured: false
price: '4.99'
currency: 'EUR'
etsyUrl: 'https://www.etsy.com/listing/...'
image: '/images/products/example.png'
tags:
  - example
audience:
  - small business owners
frequency: 'Daily'
---
```

Use the statuses deliberately:

- `draft`: work in progress; absent from the generated website
- `published`: visible in the shop and available by direct URL
- `archived`: retained in source but absent from the website

Before changing a product to `published`:

1. Confirm its Etsy listing is live.
2. Add the direct HTTPS `etsyUrl`, not only the storefront URL.
3. Verify title, price, currency, description, and product image against Etsy.
4. Confirm the image exists under `public/images/products`.
5. Set `featured: true` only when it should appear on the homepage.
6. Run `npm run quality`.

## Blog workflow

Create articles under `content/blog`. The page template renders the article title, so the Markdown body must begin with introductory text or an `##` heading—not another `#` heading.

Required article metadata:

```yaml
---
title: 'Article title'
description: 'Search and card description.'
date: '2026-08-05'
dateModified: '2026-08-05'
category: 'Restaurant Operations'
author: 'DailyOpsStudio'
status: 'draft'
featured: false
tags:
  - restaurant-operations
image: '/images/products/example.png'
relatedProductId: 'P012'
---
```

`dateModified`, `image`, and `relatedProductId` are optional. A related-product callout appears only when the referenced product is published.

Exactly one published article should have `featured: true`. Publication dates should reflect the actual publication date; do not backdate content to simulate a longer history.

## Review checklist

- Use one descriptive page title.
- Keep descriptions specific and avoid repeated marketing language.
- Check facts and regulated claims before publishing.
- Link only to published products.
- Use genuine article or product imagery; do not use the logo as filler.
- Verify spelling, headings, lists, and link text.
- Run `npm run quality`.

## Publishing and rollback

Publishing is a metadata change from `draft` to `published`. To withdraw content without deleting its history, change its status to `archived` and rebuild the site.
