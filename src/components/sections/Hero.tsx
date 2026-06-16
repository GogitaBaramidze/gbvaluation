import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

// Language-neutral accreditation marks — no translation needed.
const certifications = ["NBG", "RICS", "IVS", "ECO"];

type HeroProps = {
  dict: Dictionary["hero"];
};

export default function Hero({ dict }: HeroProps) {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Subtle dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Contained cyan glow — vibrancy without hurting text contrast */}
      <div
        className="pointer-events-none absolute -z-10 -top-[15%] end-[-10%] aspect-square w-[65vw] max-w-[760px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,212,0.30) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-28 sm:pt-36 sm:pb-32 lg:px-10 lg:pt-40 lg:pb-44">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* ── Copy (below image on mobile, left on desktop) ── */}
          <div className="order-2 text-center lg:order-1 lg:text-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-300" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/90 sm:text-xs">
                {dict.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
              {dict.titleLine1}{" "}
              <span className="text-brand-300">{dict.titleLine2}</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0">
              {dict.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <a href="#contact" className="btn-primary group px-7 py-3.5 text-sm">
                {dict.ctaPrimary}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {dict.ctaSecondary}
              </a>
            </div>

            {/* Accreditations */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:justify-start">
              <ShieldCheck size={16} className="text-brand-300" />
              <div className="flex flex-wrap items-center gap-2">
                {certifications.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Image (above copy on mobile, right on desktop) ── */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative aspect-square w-[min(72vw,380px)] lg:w-[min(42vw,520px)]">
              {/* Outer dashed accent ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
              {/* Inner glass disc */}
              <div
                className="absolute inset-5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 38% 38%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              />
              <Image
                src="/banner-valuation.svg"
                alt={dict.imageAlt}
                fill
                sizes="(max-width: 1024px) 72vw, 42vw"
                className="object-contain p-9"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* White wave — seamless transition into the white Services section.
          Extends 1px past the section edge so sub-pixel rounding can't
          leave a dark hairline above the next section. */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px z-0 leading-[0]">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="block h-[55px] w-full sm:h-[80px]"
          fill="#ffffff"
        >
          <path d="M0,46 C320,104 1040,8 1440,58 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}
