export const serviceSlugs = {
  residential: "residential-property-valuation",
  commercial: "commercial-property-valuation",
  industrial: "industrial-property-valuation",
  land: "land-valuation",
  business: "business-asset-valuation",
  legal: "valuation-for-legal-proceedings",
} as const;

export type ServiceKey = keyof typeof serviceSlugs;
export const serviceKeys = Object.keys(serviceSlugs) as ServiceKey[];

export function serviceKeyFromSlug(slug: string) {
  return serviceKeys.find((key) => serviceSlugs[key] === slug);
}
