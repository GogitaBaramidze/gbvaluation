import { ArrowUpRight, MessageCircle, ClipboardCheck, FileCheck2 } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import ContactButton from "@/components/contact/ContactButton";

const icons = [MessageCircle, ClipboardCheck, FileCheck2];
export default function Process({ dict }: { dict: Dictionary["conversion"] }) {
  return (
    <section className="border-y border-slate-200 bg-[#f5f8fb] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><p className="text-xs font-bold tracking-widest text-brand-600">{dict.processLabel}</p><h2 className="mt-3 text-balance text-2xl font-extrabold leading-snug text-brand-900 sm:text-3xl">{dict.processTitle}</h2></div>
          <ContactButton source="process" className="inline-flex min-h-12 items-center gap-2 self-start text-sm font-bold text-brand-700 lg:self-auto">{dict.consultation}<ArrowUpRight size={18} aria-hidden="true" /></ContactButton>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {dict.steps.map((step, index) => {
            const Icon = icons[index];
            return <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="mb-5 flex items-center justify-between"><Icon size={23} className="text-brand-600" aria-hidden="true" /><span className="text-sm font-semibold text-slate-400">0{index + 1}</span></div><h3 className="font-bold text-brand-900">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p></div>;
          })}
        </div>
      </div>
    </section>
  );
}
