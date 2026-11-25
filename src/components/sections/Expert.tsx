import Image from "next/image";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import ContactButton from "@/components/contact/ContactButton";
import { valuationCertificateNumber } from "@/lib/credentials";

const statKeys = ["certificate", "coverage", "languages"] as const;

type ExpertProps = {
  dict: Dictionary["expert"];
};

export default function Expert({ dict }: ExpertProps) {
  const stats = statKeys.map((key) => dict.stats[key]);

  return (
    <section id="expert" className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Left — content ── */}
          <div className="min-w-0">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                {dict.label}
              </p>
            </div>

            {/* Heading */}
            <h2 className="break-words text-[clamp(1.5rem,7vw,1.875rem)] lg:text-4xl font-extrabold leading-snug text-brand-900">
              {dict.headingLine1}
              <br />
              <span className="relative inline-block text-brand-600">
                {dict.headingLine2}
                {/* underline accent */}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.75 rounded-full"
                  style={{ background: "var(--gradient-accent-line)" }}
                />
              </span>
            </h2>

            {/* Separator */}
            <div className="flex items-center gap-3 mt-8 mb-8">
              <div
                className="h-px flex-1"
                style={{
                  background: "linear-gradient(to right, #e2e8f0, transparent)",
                }}
              />
              <div className="w-2 h-2 rounded-full bg-brand-600" />
              <div
                className="h-px flex-1"
                style={{
                  background: "linear-gradient(to left, #e2e8f0, transparent)",
                }}
              />
            </div>

            {/* Description */}
            <p className="text-slate-500 leading-relaxed text-[15px]">
              {dict.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-1 gap-0 mt-10 rounded-2xl overflow-hidden border border-zinc-200 sm:grid-cols-3">
              {stats.map(({ value, label }, i) => (
                <div
                  key={statKeys[i]}
                  className={`flex min-w-0 flex-col items-center justify-center px-3 py-5 text-center ${
                    i < 2 ? "border-b border-zinc-200 sm:border-b-0 sm:border-e" : ""
                  }`}
                  style={{
                    background: i === 1 ? "var(--gradient-ice)" : "white",
                  }}
                >
                  <p className="max-w-full break-words text-base font-extrabold leading-snug text-brand-900 sm:text-lg">
                    {value}
                  </p>
                  <p className="max-w-full break-words text-sm text-slate-600 mt-1.5 leading-snug whitespace-pre-line">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-3">
                <ShieldCheck size={16} className="shrink-0 text-brand-600" aria-hidden="true" />
                <span className="text-sm font-bold text-brand-900">{dict.certificateLabel} <span dir="ltr">№ {valuationCertificateNumber}</span></span>
              </li>
              {dict.credentials.map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="shrink-0 text-brand-600" />
                  <span className="text-sm text-slate-600">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <ContactButton source="expert" className="btn-action min-h-14 mt-10 text-sm px-7 py-3 group">
              {dict.cta}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </ContactButton>
          </div>

          {/* Captions stay below the image at every width and text direction. */}
          <div className="flex min-w-0 justify-center">
            <figure className="w-full max-w-95 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="relative aspect-6/5 w-full bg-slate-100">
                <Image
                  src="/valuer.webp"
                  alt={dict.imageAlt}
                  fill
                  sizes="(max-width: 428px) calc(100vw - 48px), 380px"
                  className="object-contain"
                />
              </div>
              <figcaption>
                <div className="px-6 py-5" style={{ background: "var(--gradient-card-dark)" }}>
                  <p className="text-base font-bold text-white">{dict.name}</p>
                  <p className="mt-1 text-sm font-medium text-brand-300">{dict.role}</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <ShieldCheck size={21} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-brand-900">{dict.statusValue}</p>
                    <p className="mt-1 text-xs font-medium text-slate-600">{dict.certificateLabel} <bdi>№ {valuationCertificateNumber}</bdi></p>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
