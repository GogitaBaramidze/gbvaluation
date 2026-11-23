import type { Locale } from "@/i18n/config";

export const articleNavLabels: Record<Locale, string> = {
  ka: "სტატიები", en: "Articles (KA)", ru: "Статьи (KA)",
  ja: "記事 (KA)", tr: "Makaleler (KA)", ar: "مقالات (KA)",
};

export function localizedPathname(pathname: string, target: Locale) {
  const suffix = pathname.split("/").slice(2).join("/");
  const georgianOnly = suffix === "articles" || suffix.startsWith("articles/") ||
    /^(services\/(property-measurement|business-valuation))\/?$/.test(suffix);
  if (georgianOnly && target !== "ka") return `/${target}`;
  return `/${target}${suffix ? `/${suffix}` : ""}`;
}
