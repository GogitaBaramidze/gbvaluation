import {
  Home,
  Building2,
  Warehouse,
  Briefcase,
  Scale,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import CardCarousel from "@/components/ui/CardCarousel";

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
  dict: Dictionary["services"];
};

export default function Services({ dict }: ServicesProps) {
  const cards = services.map(({ icon: Icon, key }) => {
    const item = dict.items[key];
    return (
      <div
        key={key}
        className="group relative h-full rounded-2xl border border-zinc-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_16px_40px_-12px_rgba(7,30,61,0.18)]"
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

        <h3 className="mb-2.5 text-lg font-bold text-brand-900">{item.title}</h3>
        <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
      </div>
    );
  });

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 lg:py-32">
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

        {/* Cards — swipe carousel on mobile, grid from sm up */}
        <CardCarousel slides={cards} className="sm:hidden" />
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards}
        </div>

      </div>
    </section>
  );
}
