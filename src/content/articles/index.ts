import content from "./ka.json";
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

export const articles = content as Article[];
export const articlesPath = "/ka/articles";
export const articlesTitle = "სტატიები ქონების შეფასებაზე, ბიზნესსა და აზომვაზე";
export const articlesDescription = "ბინის შეფასება, ბიზნესის ღირებულება, მიწის შეფასება და ბინის აზომვა: პრაქტიკული გზამკვლევები GB Valuation-ისგან საქართველოში.";

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articlePath(article: Pick<Article, "slug">) {
  return `${articlesPath}/${article.slug}`;
}

export function articleDate(date: string) {
  return new Intl.DateTimeFormat("ka-GE", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Tbilisi",
  }).format(new Date(`${date}T12:00:00+04:00`));
}
