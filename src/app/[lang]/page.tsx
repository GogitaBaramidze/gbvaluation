import { notFound } from "next/navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ValuationNeeds from "@/components/sections/ValuationNeeds";
import Expert from "@/components/sections/Expert";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/config";
import { siteUrl, siteName } from "@/lib/site";
import { contactEmail, phoneE164, telegramUrl } from "@/lib/contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  // Structured data: helps search engines show the business with
  // contact details, area served and service catalogue.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: siteName,
    description: dict.meta.description,
    url: `${siteUrl}/${lang}`,
    telephone: phoneE164,
    email: contactEmail,
    image: `${siteUrl}/${lang}/opengraph-image`,
    logo: `${siteUrl}/icon-512.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Batumi",
      addressRegion: "Adjara",
      addressCountry: "GE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.6168,
      longitude: 41.6367,
    },
    areaServed: { "@type": "Country", name: "Georgia" },
    founder: {
      "@type": "Person",
      name: "Gogita Baramidze",
      jobTitle: "Lead Valuer",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phoneE164,
      email: contactEmail,
      contactType: "customer service",
      availableLanguage: [...locales],
    },
    sameAs: [telegramUrl],
    availableLanguage: [...locales],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.label,
      itemListElement: Object.values(dict.services.items).map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.title },
      })),
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero dict={dict.hero} />
      <Services dict={dict.services} />
      <ValuationNeeds dict={dict.needs} />
      <Expert dict={dict.expert} />
    </main>
  );
}
