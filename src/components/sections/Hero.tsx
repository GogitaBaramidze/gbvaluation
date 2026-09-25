import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Phone, MapPin } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import ContactButton from "@/components/contact/ContactButton";
import { WhatsAppIcon } from "@/components/ui/icons";
import { phoneE164, phoneDisplay, whatsAppUrl } from "@/lib/contact";

type HeroProps = { dict: Dictionary["hero"]; conversion: Dictionary["conversion"] };

export default function Hero({ dict, conversion }: HeroProps) {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-brand-950" data-contact-source="hero" style={{ background: "var(--gradient-hero)" }}>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      <div className="pointer-events-none absolute -top-40 -end-40 -z-10 h-[700px] w-[700px] rounded-full bg-brand-500/15 blur-[100px]" />
      <div className="mx-auto max-w-7xl px-6 pt-40 pb-10 sm:pt-44 sm:pb-14 lg:px-10 lg:pt-48 lg:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <p className="flex items-center gap-2.5 text-xs font-semibold leading-relaxed text-brand-300 sm:text-sm"><span className="h-2 w-2 shrink-0 rounded-full bg-brand-300" />{dict.badge}</p>
            <h1 className="mt-5 max-w-2xl text-balance text-[clamp(1.9rem,9vw,2.35rem)] font-extrabold leading-[1.18] tracking-tight text-white sm:text-5xl xl:text-[3.5rem]">
              {dict.titleLine1}{" "}<span className="text-brand-300">{dict.titleLine2}</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">{dict.subtitle}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ContactButton source="hero" className="btn-action min-h-14 px-6 text-sm">{conversion.consultation}<ArrowUpRight size={19} aria-hidden="true" /></ContactButton>
              <a href={`tel:${phoneE164}`} className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"><Phone size={17} aria-hidden="true" /><span dir="ltr">{phoneDisplay}</span></a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs leading-relaxed text-slate-300"><Check size={15} className="shrink-0 text-brand-300" aria-hidden="true" />{conversion.reassurance}</p>
            <a href="#services" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white">{dict.ctaSecondary}<ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.04] p-6">
              <div className="flex items-center justify-between text-[11px] font-medium tracking-widest text-white/60"><span>GB / VALUATION</span><span className="flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" />{conversion.location}</span></div>
              <div className="relative mx-auto aspect-[1.3] w-full"><Image src="/banner-valuation.svg" alt={dict.imageAlt} fill loading="eager" sizes="(min-width: 1024px) 440px, 1px" className="object-contain p-2" /></div>
              <div className="flex items-center justify-between gap-5 rounded-2xl bg-white p-5 shadow-xl">
                <div><p className="text-sm font-bold text-brand-900">{conversion.writeUs}</p><p className="mt-1 text-xs leading-relaxed text-slate-500">{conversion.messageHint}</p></div>
                <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100"><WhatsAppIcon size={25} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-3 lg:mt-14">
          {conversion.highlights.map((item) => <p key={item} className="flex items-center gap-2.5 text-xs font-medium leading-relaxed text-slate-200 sm:text-sm"><Check size={17} className="shrink-0 text-brand-300" aria-hidden="true" />{item}</p>)}
        </div>
      </div>
    </section>
  );
}
