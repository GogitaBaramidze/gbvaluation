import { notFound } from "next/navigation";
import AdditionalServicePage, { additionalServiceMetadata } from "@/components/sections/AdditionalServicePage";
import { getAdditionalService } from "@/content/additional-services";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (lang !== "ka") notFound();
  return additionalServiceMetadata(getAdditionalService("property-measurement"));
}

export default async function PropertyMeasurementPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "ka") notFound();
  return <AdditionalServicePage service={getAdditionalService("property-measurement")} />;
}
