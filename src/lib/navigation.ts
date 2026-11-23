import type { Locale } from "@/i18n/config";

export const articleNavLabels: Record<Locale, string> = {
  ka: "სტატიები", en: "Articles", ru: "Статьи",
  ja: "記事", tr: "Makaleler", ar: "مقالات",
};

export function localizedPathname(pathname: string, target: Locale) {
  const suffix = pathname.split("/").slice(2).join("/");
  return `/${target}${suffix ? `/${suffix}` : ""}`;
}
