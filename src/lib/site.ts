// Canonical site origin, used for metadata, sitemap and robots.
// Set NEXT_PUBLIC_SITE_URL in the production environment.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gbvaluation.ge"
).replace(/\/$/, "");

export const siteName = "GB Valuation";
