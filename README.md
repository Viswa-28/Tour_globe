# Tourglobe

Marketing site for Tourglobe, a travel counselling and consultancy firm in
Madurai, Tamil Nadu. Next.js 15 (App Router), Tailwind CSS v4, GSAP + Motion +
Lenis. Full project rules live in [claude.md](./claude.md) — read it before
changing anything.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY etc.
npm run dev
```

```bash
npm run build   # production build — all pages static, /api/enquiry is a function
npm run lint
```

## Where things live

- `app/` — routes: home, `/product/[category]`, `/product/[category]/[place]`,
  `/api/enquiry`, sitemap, robots
- `components/` — page sections and shared UI
- `lib/site.ts` — **verified company facts only** (see claude.md non-negotiables)
- `lib/data.ts` — local content layer shaped like the Sanity schemas;
  contains SAMPLE places and PLACEHOLDER theme/commitment copy flagged
  `TODO(client)`
- `sanity/schemas/` — Sanity document schemas, ready to drop into a Studio
  once the client's Sanity project exists (the `sanity` package is not
  installed here)

## Before deploy

Work through the checklists at the bottom of [claude.md](./claude.md).
Grep for `TODO(client)` — nothing may ship while any remain in rendered copy.
