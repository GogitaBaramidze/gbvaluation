import Image from "next/image";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import ContactButton from "@/components/contact/ContactButton";

const statKeys = ["experience", "completed", "satisfaction"] as const;

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
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                {dict.label}
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-extrabold leading-snug text-brand-900">
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
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #e2e8f0, transparent)" }} />
              <div className="w-2 h-2 rounded-full bg-brand-600" />
              <div className="h-px flex-1" style={{ background: "linear-gradient(to left, #e2e8f0, transparent)" }} />
            </div>

            {/* Description */}
            <p className="text-slate-500 leading-relaxed text-[15px]">
              {dict.description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-0 mt-10 rounded-2xl overflow-hidden border border-zinc-200">
              {stats.map(({ value, label }, i) => (
                <div
                  key={value}
                  className={`flex flex-col items-center justify-center py-6 ${
                    i < 2 ? "border-r border-zinc-200" : ""
                  }`}
                  style={{ background: i === 1 ? "var(--gradient-ice)" : "white" }}
                >
                  <p className="text-3xl font-extrabold leading-none text-brand-900">
                    {value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1.5 text-center leading-snug whitespace-pre-line">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <ul className="mt-8 space-y-3">
              {dict.credentials.map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="shrink-0 text-brand-600" />
                  <span className="text-sm text-slate-600">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <ContactButton className="btn-primary mt-10 text-sm px-7 py-3 group">
              {dict.cta}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </ContactButton>
          </div>

          {/* ── Right — framed studio portrait ── */}
          <div className="relative flex items-end justify-center">

            {/* Offset accent frame behind the photo. The name card and
                credential badge are anchored here (not to the flex row
                above), so their position always tracks the photo's actual
                box instead of drifting on narrower mobile widths. */}
            <div className="relative">
              <div
                className="absolute -bottom-4 -end-4 start-8 top-8 rounded-3xl"
                style={{
                  background: "var(--gradient-ice)",
                  border: "1px solid var(--color-brand-100)",
                }}
              />
              {/* Card keeps the photo's native 6:5 shape so it is never
                  upscaled past the source resolution and stays sharp. */}
              <div className="relative w-72 lg:w-95 aspect-6/5 overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/valuer.webp"
                  alt={dict.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 288px, 380px"
                  className="object-cover"
                />
              </div>

              {/* Floating name card */}
              <div
                className="absolute bottom-6 start-0 lg:-start-6 max-w-[80%] rounded-2xl px-5 py-4 shadow-xl"
                style={{
                  background: "var(--gradient-card-dark)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-white font-bold text-sm">{dict.name}</p>
                <p className="text-xs font-medium mt-0.5 text-brand-300">
                  {dict.role}
                </p>
              </div>

              {/* Floating credential badge — sits above the frame's top
                  corner on mobile so it never covers the face; on large
                  screens it drops down and peeks out past the frame edge. */}
              <div
                className="absolute -top-6 end-0 lg:top-10 lg:-end-4 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
                style={{
                  background: "white",
                  border: "1px solid var(--color-brand-100)",
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-brand-100 shrink-0">
                  <ShieldCheck size={16} className="text-brand-600" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 font-medium">{dict.statusLabel}</p>
                  <p className="text-xs font-bold text-brand-900">{dict.statusValue}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
