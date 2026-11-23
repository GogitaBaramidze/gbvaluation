import ka from "./ka.json";
import en from "./en.json";
import ru from "./ru.json";
import tr from "./tr.json";
import ja from "./ja.json";
import ar from "./ar.json";
import uiKa from "./ui-ka.json";
import uiEn from "./ui-en.json";
import uiRu from "./ui-ru.json";
import uiTr from "./ui-tr.json";
import uiJa from "./ui-ja.json";
import uiAr from "./ui-ar.json";
import type { Locale } from "@/i18n/config";
import type { ServiceKey } from "@/lib/services";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
  intro: string;
  sections: { id: string; title: string; paragraphs: string[]; bullets?: string[] }[];
  takeaway: string;
  serviceKey: ServiceKey;
  extraServiceSlug?: "property-measurement" | "business-valuation";
  relatedSlugs: string[];
  facebookPost: string;
};

const content: Record<Locale, Article[]> = { ka, en, ru, tr, ja, ar } as Record<Locale, Article[]>;
export type ArticleUI = typeof uiKa;
const labels: Record<Locale, ArticleUI> = { ka: uiKa, en: uiEn, ru: uiRu, tr: uiTr, ja: uiJa, ar: uiAr };
export const getArticles = (lang: Locale) => content[lang];
export const getArticleUI = (lang: Locale) => labels[lang];
export const articles = getArticles("ka");
export const articlesPath = (lang: Locale) => `/${lang}/articles`;

export function getArticle(slug: string, lang: Locale = "ka") {
  return getArticles(lang).find((article) => article.slug === slug);
}

export function articlePath(article: Pick<Article, "slug">, lang: Locale = "ka") {
  return `${articlesPath(lang)}/${article.slug}`;
}

export function articleDate(date: string, lang: Locale = "ka") {
  return new Intl.DateTimeFormat(lang, {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Tbilisi",
  }).format(new Date(`${date}T12:00:00+04:00`));
}
