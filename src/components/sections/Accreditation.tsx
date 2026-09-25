import { ShieldCheck, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  valuationCertificateNumber,
  certificationBodyAccreditationNumber,
  personnelCertificationStandard,
} from "@/lib/credentials";

export default function Accreditation({ dict }: { dict: Dictionary["conversion"]["accreditation"] }) {
  return (
    <section aria-label={dict.title} className="border-b border-slate-200 bg-brand-50/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center lg:px-10">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-700"><ShieldCheck size={27} aria-hidden="true" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="text-base font-bold text-brand-900">{dict.title}</h2>
            <span className="inline-flex items-center gap-2 rounded-lg border border-brand-100 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700">{dict.certificateLabel}<span dir="ltr">№ {valuationCertificateNumber}</span></span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{dict.description}</p>
          <details className="mt-3 rounded-xl border border-brand-100 bg-white">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-brand-700">{dict.detailsLabel}</summary>
            <div className="border-t border-brand-100 px-4 py-4 text-sm leading-relaxed text-slate-600">
              <dl className="space-y-3">
                <div><dt className="font-semibold text-brand-900">{dict.bodyLabel}</dt><dd className="mt-1">{dict.bodyName}</dd></div>
                <div><dt className="font-semibold text-brand-900">{dict.bodyAccreditationLabel}</dt><dd className="mt-1">{dict.accreditationBody} · <bdi>№ {certificationBodyAccreditationNumber}</bdi></dd></div>
                <div><dt className="font-semibold text-brand-900">{dict.standardLabel}</dt><dd className="mt-1"><bdi>{personnelCertificationStandard}</bdi></dd></div>
              </dl>
              <p className="mt-4 border-t border-slate-100 pt-4">{dict.principles}</p>
            </div>
          </details>
        </div>
        <a href="#expert" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-brand-700">{dict.link}<ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
