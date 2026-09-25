import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/seo";
import { serviceSlugs } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...Object.values(serviceSlugs).map((slug) => `/services/${slug}`)];
  // Omit lastModified until actual per-page editorial dates are maintained.
  return paths.flatMap((path) => locales.map((lang) => ({
    url: `${siteUrl}/${lang}${path}`,
    alternates: { languages: languageAlternates(path) },
  })));
}
