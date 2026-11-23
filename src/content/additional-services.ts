import type { Locale } from "@/i18n/config";
import ka from "./additional-services/ka.json";
import en from "./additional-services/en.json";
import ru from "./additional-services/ru.json";
import tr from "./additional-services/tr.json";
import ja from "./additional-services/ja.json";
import ar from "./additional-services/ar.json";
export type AdditionalServiceSection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
};

export type AdditionalService = {
  slug: "business-valuation" | "property-measurement";
  title: string;
  cardTitle: string;
  description: string;
  intro: string;
  serviceType: string;
  badge: string;
  purpose: string[];
  sections: AdditionalServiceSection[];
  documents: string[];
  deliverable: string;
  note: string;
  related: { href: string; label: string }[];
};


const content = {ka, en, ru, tr, ja, ar} as Record<Locale, AdditionalService[]>;
export const getAdditionalServices = (lang: Locale) => content[lang];
export const additionalServiceSlugs = ["business-valuation", "property-measurement"] as const;
export function getAdditionalService(slug: AdditionalService["slug"], lang: Locale = "ka") {
  return getAdditionalServices(lang).find((service) => service.slug === slug)!;
}
