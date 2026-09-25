import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ChevronRight, FileText, Phone, ShieldCheck } from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";
import StructuredData from "@/components/seo/StructuredData";
import { getServiceContent } from "@/content/services";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { phoneDisplay, phoneE164 } from "@/lib/contact";
import { valuationCertificateNumber } from "@/lib/credentials";
import { pageMetadata } from "@/lib/seo";
import { serviceKeys, serviceKeyFromSlug, serviceSlugs } from "@/lib/services";
import { siteName, siteUrl } from "@/lib/site";
import { businessId } from "@/lib/structured-data";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(serviceSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const key = serviceKeyFromSlug(slug);
  if (!isLocale(lang) || !key) notFound();
  const { services } = await getServiceContent(lang);
  return pageMetadata(lang, `${services[key].title} | ${siteName}`, services[key].description, `/services/${slug}`);
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  const key = serviceKeyFromSlug(slug);
  if (!isLocale(lang) || !key) notFound();
  const [dict, content] = await Promise.all([getDictionary(lang), getServiceContent(lang)]);
  const service = content.services[key];
  const labels = content.labels;
  const url = `${siteUrl}/${lang}/services/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", "@id": `${url}#service`, url,
        name: service.title, description: service.description,
        serviceType: dict.services.items[key].title,
        provider: { "@type": "Organization", "@id": businessId, name: siteName, url: siteUrl, telephone: phoneE164 },
        areaServed: { "@type": "Country", name: "Georgia" },
        mainEntityOfPage: { "@id": `${url}#webpage` },
      },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url,
        name: service.title, description: service.description, inLanguage: lang,
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: siteName },
        mainEntity: { "@id": `${url}#service` }, breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.footer.links.home, item: `${siteUrl}/${lang}` },
          { "@type": "ListItem", position: 2, name: service.title, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <StructuredData data={jsonLd} />
      <section className="bg-brand-950 px-6 pt-36 pb-12 text-white sm:pt-40 lg:px-10 lg:pb-16" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl">
          <nav aria-label={dict.footer.navHeading} className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs leading-relaxed text-slate-300">
              <li><a href={`/${lang}`} className="underline-offset-4 hover:underline">{dict.footer.links.home}</a></li>
              <li aria-hidden="true"><ChevronRight size={14} className="rtl:rotate-180" /></li>
              <li aria-current="page">{dict.services.items[key].title}</li>
            </ol>
          </nav>
          <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium text-brand-300">{dict.conversion.location}</p>
              <h1 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{service.title}</h1>
              <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-slate-300">{service.intro}</p>
            </div>
            <aside className="rounded-2xl border border-white/15 bg-white/5 p-6" data-contact-source={`service_page_${key}`}>
              <h2 className="text-lg font-bold">{labels.quote}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{labels.quoteText}</p>
              <ContactButton source={`service_page_${key}`} className="btn-action mt-6 min-h-12 w-full px-4 text-sm">{dict.conversion.serviceCta}<ArrowUpRight size={18} className="shrink-0" aria-hidden="true" /></ContactButton>
              <a href={`tel:${phoneE164}`} className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-4 text-sm font-semibold hover:bg-white/10"><Phone size={16} aria-hidden="true" /><span dir="ltr">{phoneDisplay}</span></a>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-bold text-brand-900">{labels.scope}</h2>
            <ul className="mt-6 space-y-4">
              {service.factors.map((factor) => <li key={factor} className="flex gap-3 text-sm leading-7 text-slate-600"><Check size={19} className="mt-1 shrink-0 text-brand-600" aria-hidden="true" />{factor}</li>)}
            </ul>
            <h2 className="mt-10 text-2xl font-bold text-brand-900">{labels.approach}</h2>
            <p className="mt-5 text-sm leading-8 text-slate-600">{service.approach}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <FileText size={27} className="mb-4 text-brand-600" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-brand-900">{labels.documents}</h2>
            <ol className="mt-6 list-decimal space-y-4 ps-5 text-sm leading-7 text-slate-600 marker:font-bold marker:text-brand-600">
              {service.documents.map((document) => <li key={document} className="ps-2">{document}</li>)}
            </ol>
            <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">{labels.preparationNote}</p>
          </div>
        </div>
        <div className="mt-12 grid gap-8 border-t border-slate-200 pt-10 lg:grid-cols-2 lg:gap-14">
          <div><h2 className="text-2xl font-bold text-brand-900">{labels.report}</h2><p className="mt-5 text-sm leading-8 text-slate-600">{labels.reportText}</p><p className="mt-4 text-sm leading-7 text-slate-600">{labels.coverage}</p></div>
          <div className="rounded-2xl bg-brand-900 p-6 text-white sm:p-8">
            <ShieldCheck size={27} className="mb-4 text-brand-300" aria-hidden="true" />
            <p className="text-lg font-bold">{dict.expert.name}</p>
            <p className="mt-2 text-sm text-brand-300">{dict.conversion.accreditation.subtitle} · <span dir="ltr">{valuationCertificateNumber}</span></p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{dict.conversion.accreditation.description}</p>
            <a href={`/${lang}#expert`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4">{dict.conversion.accreditation.link}<ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-brand-900">{labels.related}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceKeys.filter((other) => other !== key).map((other) => <a key={other} href={`/${lang}/services/${serviceSlugs[other]}`} className="flex min-h-16 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold leading-relaxed text-brand-900 transition-colors hover:border-brand-400">{dict.services.items[other].title}<ArrowUpRight size={17} className="shrink-0 text-brand-600" aria-hidden="true" /></a>)}
          </div>
        </div>
      </section>
    </main>
  );
}
