import {
  Home,
  Building2,
  Warehouse,
  Briefcase,
  Scale,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import ContactButton from "@/components/contact/ContactButton";
import type { Locale } from "@/i18n/config";
import { serviceSlugs } from "@/lib/services";

type ServiceKey =
  | "residential"
  | "commercial"
  | "industrial"
  | "land"
  | "business"
  | "legal";

const services: { icon: LucideIcon; key: ServiceKey }[] = [
  { icon: Home, key: "residential" },
  { icon: Building2, key: "commercial" },
  { icon: Warehouse, key: "industrial" },
  { icon: MapPin, key: "land" },
  { icon: Briefcase, key: "business" },
  { icon: Scale, key: "legal" },
];

type ServicesProps = {
  lang: Locale;
  dict: Dictionary["services"];
  cta: string;
  detailsLabel: string;
};

export default function Services({ lang, dict, cta, detailsLabel }: ServicesProps) {
  const cards = services.map(({ icon: Icon, key }) => {
    const item = dict.items[key];
    return (
      <div
        key={key}
        className="group relative flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_16px_40px_-12px_rgba(7,30,61,0.18)]"
      >
        {/* Top accent line, revealed on hover */}
        <span
          className="pointer-events-none absolute inset-x-7 top-0 h-0.75 origin-center scale-x-0 rounded-b-full transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: "var(--gradient-accent-line)" }}
        />

        {/* Icon tile */}
        <div
          className="mb-6 flex h-13 w-13 items-center justify-center rounded-xl shadow-[0_8px_20px_-6px_rgba(10,46,85,0.45)] transition-transform duration-300 group-hover:scale-105"
          style={{ background: "var(--gradient-card-dark)" }}
        >
          <Icon size={22} className="text-brand-300" strokeWidth={1.7} />
        </div>

        <h3 className="mb-2.5 text-lg font-bold text-brand-900"><a href={`/${lang}/services/${serviceSlugs[key]}`} className="hover:text-brand-600">{item.title}</a></h3>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">{item.desc}</p>
        <a href={`/${lang}/services/${serviceSlugs[key]}`} className="mt-auto flex min-h-11 items-center justify-between gap-3 text-sm font-semibold text-brand-700">{detailsLabel}<ArrowUpRight size={18} className="shrink-0" aria-hidden="true" /></a>
        <ContactButton source={`service_${key}`} className="mt-3 flex min-h-11 items-center gap-3 border-t border-slate-100 pt-3 text-start text-sm font-semibold text-brand-700">{cta}</ContactButton>
      </div>
    );
  });

  return (
    <section id="services" className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              {dict.label}
            </p>
          </div>
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-brand-900 lg:text-4xl">
            {dict.headingPre}{" "}
            <span className="text-brand-600">{dict.headingHighlight}</span>
          </h2>
          <p className="mt-5 text-pretty text-[15px] leading-relaxed text-slate-500">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards}
        </div>

      </div>
    </section>
  );
}
