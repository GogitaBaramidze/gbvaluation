# GB Valuation

Marketing site for GB Valuation — a multilingual (EN/KA/RU/JA/TR/AR), single-page
Next.js App Router site.

## Stack

- **Next.js 16** (App Router, Turbopack) with locale routing under `/[lang]`
- **Tailwind CSS v4** — design tokens live in [`src/app/globals.css`](src/app/globals.css)
- **lucide-react** for icons

## Develop

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to a locale
npm run build    # production build
npm run lint
```

## Structure

- `src/app/[lang]/` — localized layout + homepage
- `src/components/sections/` — Hero, Services, ValuationNeeds, Expert
- `src/components/layout/` — Navbar, Footer
- `src/i18n/` + `src/dictionaries/` — locale config and translations
- `src/proxy.ts` — locale-detection redirect (Next 16 "proxy" middleware)

## Design system

All brand colours are defined once as `--color-brand-*` tokens in `globals.css`,
exposed as both Tailwind utilities (`bg-brand-900`, `text-brand-600`) and CSS
variables (used by the section gradients). Change a token there to update the
whole site. Reusable button styles: `.btn-primary`, `.btn-outline-navy`.

## Production config

Set the canonical origin so metadata, `sitemap.xml`, and `robots.txt` resolve correctly:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Placeholder contact details (phone, email, social links) in `Navbar` and `Footer`
should be replaced with the real ones before launch.
