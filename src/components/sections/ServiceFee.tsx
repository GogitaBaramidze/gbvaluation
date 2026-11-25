import type { Locale } from "@/i18n/config";

const copy: Record<Locale, { label: string; value: string }> = {
  ka: { label: "მომსახურების ფასი", value: "ინდივიდუალური შეთავაზებით" },
  en: { label: "Service fee", value: "Individual quotation" },
  ru: { label: "Стоимость услуги", value: "Индивидуальное предложение" },
  tr: { label: "Hizmet ücreti", value: "İşe özel fiyat teklifi" },
  ja: { label: "サービス料金", value: "ご依頼内容に応じた個別見積もり" },
  ar: { label: "أتعاب الخدمة", value: "عرض سعر حسب المهمة" },
};

export default function ServiceFee({ lang, dark = false }: { lang: Locale; dark?: boolean }) {
  const text = copy[lang];
  return <p data-service-fee="quotation" className={`my-5 text-sm leading-7 ${dark ? "text-slate-200" : "text-slate-600"}`}><span className="font-semibold">{text.label}: </span>{text.value}</p>;
}
