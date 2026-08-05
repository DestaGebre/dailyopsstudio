# Cloudflare Pages deployment

## Build configuration

- Framework preset: Nuxt
- Build command: `npm run build`
- Build output directory: `.output/public`
- Node.js version: 22

The Nuxt Nitro preset is `static`, and all public routes are prerendered.

## Production configuration

Configure the `NUXT_PUBLIC_*` variables documented in `.env.example` when production values differ from repository defaults. Never commit secrets to public runtime variables.

## Release checklist

1. Pull the intended revision and install with `npm ci`.
2. Run `npm run quality`.
3. Confirm only published product directories exist in `.output/public/products`.
4. Inspect `.output/public/sitemap.xml` for unexpected routes.
5. Deploy `.output/public` through Cloudflare Pages.
6. Test the homepage, shop, one product, one article, Etsy navigation, social links, and the mobile menu on the production domain.

## Troubleshooting

- A missing content page usually means its `status` is not `published` or its frontmatter failed validation.
- `npm run check:content` reports missing metadata and asset paths.
- `npm run check:links` must run after `npm run build`.
- Nuxt may emit console timing-label warnings during concurrent prerendering; use the process exit code and final build result to distinguish warnings from build failures.
