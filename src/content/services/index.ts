import "server-only";
import type { Locale } from "@/i18n/config";

const content = {
  ka: () => import("./ka.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
  ru: () => import("./ru.json").then((m) => m.default),
  ar: () => import("./ar.json").then((m) => m.default),
  tr: () => import("./tr.json").then((m) => m.default),
  ja: () => import("./ja.json").then((m) => m.default),
};
export const getServiceContent = (lang: Locale) => content[lang]();
