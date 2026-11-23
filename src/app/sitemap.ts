import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/seo";
import { serviceSlugs } from "@/lib/services";
import { articles, articlesPath, articlePath } from "@/content/articles";
import { additionalServiceSlugs } from "@/content/additional-services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...Object.values(serviceSlugs).map((slug) => `/services/${slug}`)];
  // Omit lastModified until actual per-page editorial dates are maintained.
  const localizedPages = paths.flatMap((path) => locales.map((lang) => ({
    url: `${siteUrl}/${lang}${path}`,
    alternates: { languages: languageAlternates(path) },
  })));
  const georgianPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}${articlesPath}`, lastModified: articles.reduce((latest, article) => article.publishedAt > latest ? article.publishedAt : latest, "2026-11-23") },
    ...articles.map((article) => ({ url: `${siteUrl}${articlePath(article)}`, lastModified: article.publishedAt })),
    ...additionalServiceSlugs.map((slug) => ({ url: `${siteUrl}/ka/services/${slug}` })),
  ].map((page) => ({ ...page, alternates: { languages: { ka: page.url } } }));
  return [...localizedPages, ...georgianPages];
}
