import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";
import { languageAlternates } from "@/lib/seo";
import { serviceSlugs } from "@/lib/services";
import { getArticles } from "@/content/articles";
import { additionalServiceSlugs } from "@/content/additional-services";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles("ka");
  const paths = ["", ...Object.values(serviceSlugs).map((slug) => `/services/${slug}`),
    "/articles", ...articles.map((article) => `/articles/${article.slug}`),
    ...additionalServiceSlugs.map((slug) => `/services/${slug}`)];
  // Omit lastModified until actual per-page editorial dates are maintained.
  return paths.flatMap((path) => locales.map((lang) => {
    const article = getArticles(lang).find((item) => path === `/articles/${item.slug}`);
    return {
      url: `${siteUrl}/${lang}${path}`,
      ...(article ? { lastModified: article.publishedAt } : {}),
      alternates: { languages: languageAlternates(path) },
    };
  }));
}
