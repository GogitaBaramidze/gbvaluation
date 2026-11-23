import { notFound } from "next/navigation";
import AdditionalServicePage, { additionalServiceMetadata } from "@/components/sections/AdditionalServicePage";
import { getAdditionalService } from "@/content/additional-services";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (lang !== "ka") notFound();
  return additionalServiceMetadata(getAdditionalService("business-valuation"));
}

export default async function BusinessValuationPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "ka") notFound();
  return <AdditionalServicePage service={getAdditionalService("business-valuation")} />;
}
