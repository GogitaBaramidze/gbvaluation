import "server-only";
import type { Locale } from "@/i18n/config";

// Each dictionary is lazily imported so only the requested locale's JSON
// is loaded on the server for a given request.
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ka: () => import("@/dictionaries/ka.json").then((m) => m.default),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
  ja: () => import("@/dictionaries/ja.json").then((m) => m.default),
  tr: () => import("@/dictionaries/tr.json").then((m) => m.default),
  ar: () => import("@/dictionaries/ar.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

// The English dictionary is the source of truth for the shape of all
// translations. Components import slices of this type via `Dictionary[...]`.
export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;
