import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { siteName, siteUrl } from "@/lib/site";
import { contactEmail, phoneE164 } from "@/lib/contact";
import { valuationCertificateNumber } from "@/lib/credentials";
import { serviceKeys, serviceSlugs } from "@/lib/services";
import { getAdditionalServices } from "@/content/additional-services";
import { facebookUrl, googleMapsUrl } from "@/lib/profiles";

export const businessId = `${siteUrl}/#business`;

export function homeStructuredData(lang: Locale, dict: Dictionary) {
  const url = `${siteUrl}/${lang}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": businessId, name: siteName,
        url: siteUrl, description: dict.meta.description,
        sameAs: [facebookUrl, googleMapsUrl],
        telephone: phoneE164, email: contactEmail, logo: `${siteUrl}/icon-512.png`,
        areaServed: { "@type": "Country", name: "Georgia" },
        location: { "@type": "Place", name: "Batumi, Georgia" },
        contactPoint: { "@type": "ContactPoint", telephone: phoneE164, email: contactEmail, contactType: "customer service" },
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: dict.services.label,
          itemListElement: [...serviceKeys.map((key) => ({
            "@type": "Offer", itemOffered: {
              "@type": "Service", name: dict.services.items[key].title,
              url: `${url}/services/${serviceSlugs[key]}`,
              provider: { "@id": businessId },
            },
          })), ...getAdditionalServices(lang).map((service) => ({
            "@type": "Offer", itemOffered: {
              "@type": "Service", name: service.cardTitle, description: service.description,
              url: `${url}/services/${service.slug}`, provider: { "@id": businessId },
            },
          }))],
        },
      },
      {
        "@type": "Person", "@id": `${siteUrl}/#valuer`,
        name: dict.expert.name, jobTitle: dict.expert.role, url: `${url}#expert`,
        worksFor: { "@id": businessId },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: `${dict.conversion.accreditation.certificateLabel} ${valuationCertificateNumber}`,
          identifier: valuationCertificateNumber,
          credentialCategory: "Professional certification",
          recognizedBy: { "@type": "Organization", name: dict.conversion.accreditation.bodyName },
        },
      },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: siteName, publisher: { "@id": businessId } },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: dict.meta.title,
        description: dict.meta.description, inLanguage: lang,
        isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": businessId },
      },
    ],
  };
}
