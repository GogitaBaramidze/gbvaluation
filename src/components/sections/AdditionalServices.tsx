import { Building2, Ruler, Landmark } from "lucide-react";
import ServiceFee from "@/components/sections/ServiceFee";
import ContactButton from "@/components/contact/ContactButton";
import type { Locale } from "@/i18n/config";
import { getArticleUI } from "@/content/articles";
import { getAdditionalServices } from "@/content/additional-services";

export default function AdditionalServices({ lang }: { lang: Locale }) {
  const additionalServices = getAdditionalServices(lang);
  const ui = getArticleUI(lang);
  return (
    <section id="additional-services" className="border-y border-slate-200 bg-brand-50 px-6 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-semibold text-brand-700">{ui.servicesEyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight text-brand-900 lg:text-4xl">{ui.servicesTitle}</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">{ui.servicesIntro}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {additionalServices.map((service) => {
            const Icon = service.slug === "business-valuation" ? Building2 : service.slug === "bank-mortgage-valuation" ? Landmark : Ruler;
            return (
              <article key={service.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-brand-900 text-brand-300"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></div>
                <h3 className="text-2xl font-bold leading-snug text-brand-900"><a href={`/${lang}/services/${service.slug}`} className="underline-offset-4 hover:underline">{service.cardTitle}</a></h3>
                <p className="mt-4 mb-6 text-base leading-8 text-slate-600">{service.description}</p>
                <ServiceFee lang={lang} />
                <div className="mt-auto flex flex-wrap gap-x-7 gap-y-3 border-t border-slate-100 pt-5">
                  <a href={`/${lang}/services/${service.slug}`} className="inline-flex min-h-11 items-center text-base font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4">{ui.serviceDetails}</a>
                  <ContactButton source={`additional_service_${service.slug}`} className="min-h-11 text-base font-semibold text-brand-700">{ui.serviceDiscuss}</ContactButton>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
