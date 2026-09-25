import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { siteName, siteUrl } from "@/lib/site";

const ogLocale: Record<Locale, string> = {
  en: "en_US", ka: "ka_GE", ru: "ru_RU", ja: "ja_JP", tr: "tr_TR", ar: "ar_AR",
};

export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(locales.map((lang) => [lang, `${siteUrl}/${lang}${path}`])),
    "x-default": `${siteUrl}/${defaultLocale}${path}`,
  };
}

export function pageMetadata(lang: Locale, title: string, description: string, path = ""): Metadata {
  const url = `${siteUrl}/${lang}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website", url, title, description, siteName,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((locale) => locale !== lang).map((locale) => ogLocale[locale]),
      images: [{ url: `${siteUrl}/${lang}/opengraph-image`, width: 1200, height: 630, alt: siteName }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/${lang}/opengraph-image`] },
  };
}
