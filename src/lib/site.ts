// Canonical site origin, used for metadata, sitemap and robots.
// Set NEXT_PUBLIC_SITE_URL in the production environment.
const configuredUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.gbvaluation.ge"
);
// Production redirects the apex to www. Keep older environment settings from
// publishing redirecting canonical, hreflang and sitemap URLs.
if (["gbvaluation.ge", "www.gbvaluation.ge"].includes(configuredUrl.hostname)) {
  configuredUrl.hostname = "www.gbvaluation.ge";
  configuredUrl.protocol = "https:";
}
export const siteUrl = configuredUrl.origin;

export const siteName = "GB Valuation";
