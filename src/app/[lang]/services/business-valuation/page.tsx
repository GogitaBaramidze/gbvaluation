import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import AdditionalServicePage, { additionalServiceMetadata } from "@/components/sections/AdditionalServicePage";
import { getAdditionalService } from "@/content/additional-services";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return additionalServiceMetadata(getAdditionalService("business-valuation", lang), lang);
}

export default async function BusinessValuationPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <AdditionalServicePage service={getAdditionalService("business-valuation", lang)} lang={lang} />;
}
