import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getArticleUI } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";
import { Check, FileText, Phone } from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";
import ServiceFee from "@/components/sections/ServiceFee";
import StructuredData from "@/components/seo/StructuredData";
import type { AdditionalService } from "@/content/additional-services";
import { phoneDisplay, phoneE164, whatsAppUrl } from "@/lib/contact";
import { siteName, siteUrl } from "@/lib/site";
import { businessId } from "@/lib/structured-data";

export function additionalServiceMetadata(service: AdditionalService, lang: Locale): Metadata {
  const url = `${siteUrl}/${lang}/services/${service.slug}`;
  const title = `${service.title} | ${siteName}`;
  return {
    title: { absolute: title },
    description: service.description,
    authors: [{ name: siteName }],
    alternates: pageMetadata(lang, title, service.description, `/services/${service.slug}`).alternates,
    openGraph: {
      type: "website", url, title, description: service.description,
      siteName, locale: ({ka:"ka_GE",en:"en_US",ru:"ru_RU",ja:"ja_JP",tr:"tr_TR",ar:"ar_AR"})[lang],
      images: [{ url: `${siteUrl}/${lang}/opengraph-image`, width: 1200, height: 630, alt: siteName }],
    },
    twitter: { card: "summary_large_image", title, description: service.description, images: [`${siteUrl}/${lang}/opengraph-image`] },
  };
}

export default function AdditionalServicePage({ service, lang }: { service: AdditionalService; lang: Locale }) {
  const ui = getArticleUI(lang);
  const url = `${siteUrl}/${lang}/services/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", "@id": `${url}#service`, url,
        name: service.title, description: service.description, serviceType: service.serviceType,
        provider: { "@type": "Organization", "@id": businessId, name: siteName, url: siteUrl, telephone: phoneE164 },
        areaServed: { "@type": "Country", name: "Georgia" },
        mainEntityOfPage: { "@id": `${url}#webpage` },
      },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url,
        name: service.title, description: service.description, inLanguage: lang,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${url}#service` }, breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.home, item: `${siteUrl}/${lang}` },
          { "@type": "ListItem", position: 2, name: service.cardTitle, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <StructuredData data={jsonLd} />
      <section className="bg-brand-950 px-6 pt-36 pb-12 text-white sm:pt-40 lg:px-10 lg:pb-16" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl">
          <nav aria-label={ui.breadcrumbLabel} className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-relaxed text-slate-300">
              <li><a href={`/${lang}`} className="underline-offset-4 hover:underline">{ui.home}</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{service.cardTitle}</li>
            </ol>
          </nav>
          <div className="grid items-start gap-9 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold leading-7 text-brand-300">{service.badge}</p>
              <h1 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{service.title}</h1>
              <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-slate-200">{service.intro}</p>
            </div>
            <aside className="rounded-2xl border border-white/20 bg-white/5 p-6 sm:p-7">
              <h2 className="text-xl font-bold">{ui.serviceDiscuss}</h2>
              <p className="mt-4 text-base leading-8 text-slate-200">{ui.serviceQuoteText}</p>
              <ServiceFee lang={lang} dark />
              <ContactButton source={`service_page_${service.slug}`} className="btn-action mt-6 min-h-12 w-full px-4 py-3 text-base">{ui.contactUs}</ContactButton>
              <a href={`tel:${phoneE164}`} className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-base font-semibold hover:bg-white/10"><Phone size={18} aria-hidden="true" /><span dir="ltr">{phoneDisplay}</span></a>
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-12 items-center justify-center rounded-xl border border-brand-300/40 px-4 py-3 text-base font-semibold text-brand-300 hover:bg-white/10">{ui.whatsapp}</a>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-brand-900">{ui.whenNeeded}</h2>
          <ul className="mt-6 space-y-4">
            {service.purpose.map((item) => <li key={item} className="flex gap-3 text-base leading-8 text-slate-600"><Check size={20} className="mt-1.5 shrink-0 text-brand-600" aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
        </div>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="space-y-10">
            {service.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold leading-snug text-brand-900">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-8 text-slate-600">{paragraph}</p>)}
                {section.items && <ul className="mt-5 list-disc space-y-3 ps-6 text-base leading-8 text-slate-600 marker:text-brand-600">{section.items.map((item) => <li key={item} className="ps-1">{item}</li>)}</ul>}
              </section>
            ))}
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <FileText size={28} className="mb-4 text-brand-600" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-brand-900">{ui.documentsTitle}</h2>
            <ul className="mt-6 list-disc space-y-4 ps-5 text-base leading-8 text-slate-600 marker:text-brand-600">
              {service.documents.map((document) => <li key={document} className="ps-1">{document}</li>)}
            </ul>
            <p className="mt-6 border-t border-slate-200 pt-5 text-base leading-8 text-slate-600">{ui.documentsNote}</p>
          </aside>
        </div>
        <div className="mt-12 rounded-2xl bg-brand-900 p-6 text-white sm:p-9">
          <h2 className="text-2xl font-bold">{ui.deliverableTitle}</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-200">{service.deliverable}</p>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-200">{service.note}</p>
          <ContactButton source={`service_bottom_${service.slug}`} className="btn-action mt-7 min-h-12 px-6 py-3 text-base">{ui.agreeService}</ContactButton>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-brand-900">{ui.relatedServices}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {service.related.map((item) => <a key={item.href} href={item.href} className="flex min-h-20 items-center rounded-xl border border-slate-200 bg-white px-5 py-4 text-base font-semibold leading-7 text-brand-900 underline-offset-4 hover:border-brand-400 hover:underline">{item.label}</a>)}
          </div>
          <a href={`/${lang}#services`} className="mt-6 inline-flex min-h-11 items-center text-base font-semibold text-brand-700 underline underline-offset-4">{ui.allServices}</a>
        </div>
      </section>
    </main>
  );
}
