// Locale configuration shared by both server and client code.
// Keep this file free of `server-only` imports so the language switcher
// (a Client Component) can use it too.

export const locales = ["en", "ka", "ru", "ja", "tr", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Short labels (kept for any compact UI).
export const localeNames: Record<Locale, string> = {
  en: "EN",
  ka: "KA",
  ru: "RU",
  ja: "JA",
  tr: "TR",
  ar: "AR",
};

// Native language names shown in the language dropdown.
export const localeNativeNames: Record<Locale, string> = {
  en: "English",
  ka: "ქართული",
  ru: "Русский",
  ja: "日本語",
  tr: "Türkçe",
  ar: "العربية",
};

// Text direction per locale — Arabic is right-to-left.
export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ka: "ltr",
  ru: "ltr",
  ja: "ltr",
  tr: "ltr",
  ar: "rtl",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
