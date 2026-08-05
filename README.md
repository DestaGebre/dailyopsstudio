# DailyOpsStudio

Static Nuxt website for DailyOpsStudio, a digital-product brand offering practical templates for work, business, and everyday life.

## Technology

- Nuxt 4 and Vue 3
- TypeScript
- Nuxt Content
- Nuxt Image
- Static generation for Cloudflare Pages
- Plain CSS with reusable design tokens

## Local development

Use Node.js 22 or a compatible current LTS release.

```bash
npm install
npm run dev
```

The local site is available at `http://localhost:3000`.

## Quality checks

Run the complete pre-deployment suite:

```bash
npm run quality
```

It checks formatting, ESLint, content metadata, TypeScript, the production build, and links in the generated site.

Individual commands:

```bash
npm run format
npm run format:check
npm run lint
npm run check:content
npm run typecheck
npm run build
npm run check:links
```

`check:links` expects a completed production build in `.output/public`.

## Content

- Products: `content/products/*.md`
- Articles: `content/blog/*.md`
- Collection validation: `content.config.ts`

Draft and archived content is excluded from public listings and direct content routes. See [the publishing guide](docs/publishing.md) before adding or publishing content.

## Environment variables

Copy `.env.example` to `.env` for local overrides. Production variables are configured in Cloudflare Pages.

Important public variables:

- `NUXT_PUBLIC_SITE_URL`
- `NUXT_PUBLIC_ETSY_URL`
- `NUXT_PUBLIC_INSTAGRAM_URL`
- `NUXT_PUBLIC_TIKTOK_URL`
- `NUXT_PUBLIC_PINTEREST_URL`
- `NUXT_PUBLIC_YOUTUBE_URL`
- `NUXT_PUBLIC_CONTACT_EMAIL`

The site includes brand defaults so social and Etsy links remain available when an optional override is missing.

## Deployment

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `.output/public`
- Node version: 22

Before deployment, run `npm run quality` and verify any new Etsy URLs in a browser.

## Legal pages

Privacy and Terms currently remain `noindex` and excluded from the sitemap until the operator's legal identity, address, jurisdiction, and any required registration information are added and reviewed.
