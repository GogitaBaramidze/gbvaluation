import {
  Handshake,
  Landmark,
  ShieldCheck,
  Scale,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import CardCarousel from "@/components/ui/CardCarousel";

type NeedKey =
  | "buySell"
  | "loan"
  | "insurance"
  | "court"
  | "inheritance"
  | "investment";

const needs: { icon: LucideIcon; key: NeedKey }[] = [
  { icon: Handshake, key: "buySell" },
  { icon: Landmark, key: "loan" },
  { icon: ShieldCheck, key: "insurance" },
  { icon: Scale, key: "court" },
  { icon: Users, key: "inheritance" },
  { icon: TrendingUp, key: "investment" },
];

type ValuationNeedsProps = {
  dict: Dictionary["needs"];
};

export default function ValuationNeeds({ dict }: ValuationNeedsProps) {
  const cards = needs.map(({ icon: Icon, key }) => {
    const item = dict.items[key];
    return (
      <div
        key={key}
        className="group relative h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Hover accent glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 0%, rgba(96,200,240,0.12) 0%, transparent 60%)",
            border: "1px solid rgba(96,200,240,0.35)",
          }}
        />

        <div className="relative">
          {/* Icon */}
          <div
            className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
            style={{
              background: "rgba(96,200,240,0.10)",
              border: "1px solid rgba(96,200,240,0.30)",
            }}
          >
            <Icon size={22} className="text-brand-300" strokeWidth={1.7} />
          </div>

          <h3 className="mb-2.5 text-lg font-bold text-white">{item.title}</h3>
          <p className="text-sm leading-relaxed text-white/55">{item.desc}</p>
        </div>
      </div>
    );
  });

  return (
    <section
      id="needs"
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-deep)" }}
    >
      {/* ── Dot grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-112.5 w-200 max-w-full -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(26,111,168,0.20) 0%, transparent 70%)",
        }}
      />

      {/* ── TOP white mountain terrain ──
           Overlays extend 1px past the section edge so sub-pixel rounding
           can't leave a dark hairline where they meet the white sections. */}
      <div
        className="pointer-events-none absolute -top-px right-0 left-0 h-30 bg-white"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 18%, 50% 100%, 0% 18%)",
        }}
      />

      {/* ── BOTTOM white mountain terrain ── */}
      <div
        className="pointer-events-none absolute right-0 -bottom-px left-0 h-30 bg-white"
        style={{
          clipPath: "polygon(0% 100%, 0% 82%, 50% 0%, 100% 82%, 100% 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-44 lg:px-10 lg:py-48">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-16">
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(96,200,240,0.08)",
              border: "1px solid rgba(96,200,240,0.25)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">
              {dict.label}
            </p>
          </div>
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-white lg:text-4xl">
            {dict.headingPre}{" "}
            <span className="text-brand-300">{dict.headingHighlight}</span>{" "}
            {dict.headingPost}
          </h2>
          <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/55">
            {dict.subtitle}
          </p>
        </div>

        {/* Cards — swipe carousel on mobile, grid from sm up */}
        <CardCarousel slides={cards} dark className="sm:hidden" />
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="mb-5 text-sm text-white/50">{dict.ctaText}</p>
          <a href="#contact" className="btn-primary group px-8 py-3.5 text-sm font-bold">
            {dict.ctaButton}
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
