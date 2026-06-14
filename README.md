# Driftwork

Static marketing site for **Driftwork**, a software studio. Built with Next.js 15
(App Router), React 19, Tailwind v4, Framer Motion, and Lenis smooth scroll.

No CMS, no database — all content is hardcoded in `src/data/`. An editorial +
"schematic/blueprint" design language on a mint-paper / forest-ink / coral palette.

## Stack

- **Next.js 15** (App Router, RSC) + **React 19**
- **Tailwind CSS v4** (theme tokens in `src/app/(frontend)/styles.css`)
- **Framer Motion** for reveals, parallax, and the hero conversation
- **Lenis** for smooth scrolling
- **lucide-react** for icons
- **libphonenumber-js** for the callback form's phone validation

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint
```

## Project structure

```
src/
  app/(frontend)/        # routes: / (landing) and /contact
    layout.tsx           # fonts, nav, footer, providers, metadata
    page.tsx             # landing page (composes the sections)
    contact/page.tsx     # contact page
    opengraph-image.tsx  # generated social card (next/og)
    styles.css           # Tailwind import + palette + decor utilities
  app/api/               # contact + callback form handlers (validate only)
  components/            # hero, sections, nav, footer, callback, etc.
  data/
    site.ts              # brand + contact constants
    content.ts           # projects, services, manifesto, faq, contact types
    types.ts             # content type definitions
  lib/, config/, utilities/
```

## Editing content

- **Brand / contact details** → `src/data/site.ts`
- **Projects, services, FAQ, manifesto, contact types** → `src/data/content.ts`
- **Palette** → the `@theme` block in `src/app/(frontend)/styles.css`

## Forms

`/api/contact` and `/api/callback` validate input, rate-limit, and acknowledge —
but **do not send email** in this static build. To deliver mail, plug a provider
(e.g. Resend) into the marked spots in each route handler. The email HTML
templates are ready in `src/lib/contactEmails.ts` and `src/app/api/callback/route.ts`.
# attic
