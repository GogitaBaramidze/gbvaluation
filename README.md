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

Contact details are maintained in `src/lib/contact.ts`.

## Contact design and analytics

The landing page includes a primary consultation action, direct phone links,
a persistent phone/WhatsApp dock, per-service contact actions and a keyboard-accessible
contact dialog. New content is translated into all six supported languages.
Certification details are supplied by the business owner. A-1777 identifies the
valuer's certificate; GAC-PC-0010 identifies the issuing certification body's
accreditation. These references and the national personnel-certification standard
are maintained in `src/lib/credentials.ts`. The expandable certification details
name the issuer and accreditation body. No accreditation of GB Valuation itself
or IVSC/RICS membership of the company or valuer is asserted.
The expert's name and certificate appear below the portrait, with no text overlay.

Meta Pixel activation is deferred at the owner's request (25 September 2026).
Events Manager showed the GB Valuation portfolio as restricted. The previous
hardcoded ID `1056343837348588` identifies a mobile app named Test APP, not a
verified website pixel. It has been removed from the integration.

After that restriction is resolved, set `NEXT_PUBLIC_META_PIXEL_ID` to the verified
**website pixel/dataset ID**, then rebuild and deploy. The value is public and
embedded at build time. Leaving it unset or empty disables this integration,
including contact-click tracking, in development and production.

Prepared events:

- `PageView`: one per full page load (locale switching performs a full navigation).
- `ContactOptionsOpened`: opening the contact dialog, with the button placement.
- `Contact`: clicking phone, WhatsApp, Telegram or email, with channel and placement.

`Contact` measures an attempted contact, not a completed call, sent message or
qualified lead. No `Lead` event is sent. No visitor-entered fields are collected.
Before enabling it, verify PageView and each channel in Meta Test Events and check
that repeated dialog opens do not produce Contact events. Local QA should keep the
pixel disabled so test interactions do not enter production reporting.
