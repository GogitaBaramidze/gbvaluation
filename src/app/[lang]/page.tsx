import { notFound } from "next/navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ValuationNeeds from "@/components/sections/ValuationNeeds";
import Expert from "@/components/sections/Expert";
import Process from "@/components/sections/Process";
import Accreditation from "@/components/sections/Accreditation";
import FAQ from "@/components/sections/FAQ";
import ArticlesPreview from "@/components/sections/ArticlesPreview";
import AdditionalServices from "@/components/sections/AdditionalServices";
import StructuredData from "@/components/seo/StructuredData";
import { getDictionary } from "@/i18n/dictionaries";
import { getServiceContent } from "@/content/services";
import { isLocale, localeDir } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { homeStructuredData } from "@/lib/structured-data";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return pageMetadata(lang, dict.meta.title, dict.meta.description);
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [dict, content] = await Promise.all([getDictionary(lang), getServiceContent(lang)]);

  return (
    <main>
      <StructuredData data={homeStructuredData(lang, dict)} />
      <Hero dict={dict.hero} conversion={dict.conversion} />
      <Accreditation dict={dict.conversion.accreditation} />
      <Services lang={lang} dict={dict.services} cta={dict.conversion.serviceCta} detailsLabel={content.labels.details} />
      {lang === "ka" && <AdditionalServices />}
      <Process dict={dict.conversion} />
      <ValuationNeeds dict={dict.needs} dir={localeDir[lang]} />
      <Expert dict={dict.expert} />
      <FAQ title={content.labels.faq} items={content.faq} />
      {lang === "ka" && <ArticlesPreview />}
    </main>
  );
}
