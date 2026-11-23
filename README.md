# GB Valuation

Marketing site for GB Valuation — a multilingual (EN/KA/RU/JA/TR/AR)
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

- `src/app/[lang]/` — localized layout, homepage and six service detail pages
- `src/content/services/` — translated service details and homepage FAQs
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
NEXT_PUBLIC_SITE_URL=https://www.gbvaluation.ge
# Optional HTML verification token from Google Search Console:
GOOGLE_SITE_VERIFICATION=
```

Contact details are maintained in `src/lib/contact.ts`.

## Georgian guides and additional services

`/ka/articles` lists eight original Georgian guides with static, crawlable article
URLs. Edit their content and genuine publication dates in `src/content/articles/ka.json`.
Each article has its own canonical, Article/Open Graph metadata, visible publication
date, contents links, related reading and service/contact links. Authorship is the
GB Valuation organization; expert review is not asserted.

The Georgian homepage also links to full business/share valuation and property
measurement service pages. Measurement is carried out by a partner specialist.
These pages and the guides are Georgian only: hreflang includes only the actual
Georgian URL, and language switching leads to the selected locale's homepage.
The sitemap includes these pages alongside the existing 42 localized pages.

Facebook post text is editorial material in the article data; publication to a
social account is a separate action. No tracking pixel is enabled by this update.

## Search visibility

The production host redirects the apex domain to `www`. Canonical, sitemap,
hreflang, Open Graph and structured-data URLs use that final origin; legacy
apex environment values are normalized. Each of the 42 localized pages has its
own metadata and reciprocal language links. The existing Russian fallback is
also the `x-default`. Tracking parameters do not create separate canonicals.

Service pages cover residential, commercial, industrial, land, business assets
and legal-purpose valuation. Content is rendered in server HTML, with crawlable
links, visible breadcrumbs and Service/BreadcrumbList structured data. Homepages
describe the organization and the valuer's actual certificate. No invented office
coordinates, review scores or personal RICS/IVSC membership are published in schema.
FAQs are visible content; FAQ rich results are not promised for this business.
Share-image rendering falls back to an English brand card if a localized font
cannot be shaped by the image renderer, rather than returning a broken image.
The desktop-only hero illustration uses a media source so mobile visitors do
not download its 576 KB SVG.
Sitemap modification dates are omitted until real editorial dates are maintained.

Verify the production build in one terminal and audit it in another:

```bash
npm run build
npm run start -- --port 3100
npm run check:seo -- http://127.0.0.1:3100
# Or check the deployed pages:
npm run check:seo -- https://www.gbvaluation.ge
```

Owner/account work still required: verify the domain in Google Search Console
(DNS verification covers all protocols/subdomains; an optional HTML verification
token is supported above), submit `https://www.gbvaluation.ge/sitemap.xml`, and
inspect representative URLs after deployment. Link a verified Google Business
Profile once its public URL and genuine service-area/address details are supplied.
Keep the business name, contact details and location consistent. Add real project
examples and client reviews only with permission. Monitor Search Console clicks,
impressions, queries and indexing; deployed technical changes are not a guarantee
of indexing or rankings.

References: [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls),
[localized versions](https://developers.google.com/search/docs/crawling-indexing/localized-versions),
[structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

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
