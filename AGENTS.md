# DailyOpsStudio Agent Instructions

## Project goal

Build a fast, accessible and maintainable Nuxt website for DailyOpsStudio.

DailyOpsStudio is a general digital-product brand offering practical templates for:

- Business operations
- Home organization
- Personal planning
- Vehicle management
- Events and everyday life

The website must not be designed only around restaurant products.

## Technology

- Nuxt 4
- Vue 3
- TypeScript
- Nuxt Content
- Nuxt Image
- Static-site generation
- Cloudflare Pages
- Plain CSS with reusable design tokens

## Architecture rules

- Use reusable Vue components.
- Keep page components small.
- Store products and articles as Markdown content.
- Avoid unnecessary dependencies.
- Do not add authentication, a database or checkout.
- Product purchase buttons must link to Etsy.
- Use semantic HTML.
- Follow accessibility best practices.
- Use responsive, mobile-first CSS.
- Do not rewrite unrelated files.
- Complete one task at a time.
- Run validation after every feature.

## Brand direction

Style:

- Clean
- Calm
- Modern
- Practical
- Trustworthy
- Minimal

Suggested colors:

- Primary: #2F5D50
- Primary dark: #23473D
- Background: #F8F7F3
- Surface: #FFFFFF
- Text: #202522
- Muted text: #66706B
- Border: #DDE3DF

Main message:

"Practical templates for work, business and everyday life."

## Initial navigation

- Home
- Shop
- Categories
- About
- Blog
- Contact

## Required commands

Before finishing a task, run:

npm run typecheck
npm run build

Fix errors before marking the task complete.
