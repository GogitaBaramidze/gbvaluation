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
    name: siteName,
    description: dict.meta.description,
    url: `${siteUrl}/${lang}`,
    telephone: phoneE164,
    email: contactEmail,
    image: `${siteUrl}/${lang}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Batumi",
      addressCountry: "GE",
    },
    areaServed: { "@type": "Country", name: "Georgia" },
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
