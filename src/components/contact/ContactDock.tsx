import { Phone, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { phoneE164, whatsAppUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";
import ContactButton from "./ContactButton";

export default function ContactDock({ dict }: { dict: Dictionary["conversion"] }) {
  return (
    <aside className="contact-dock fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-3 shadow-[0_-8px_32px_rgba(7,30,61,0.08)] backdrop-blur-lg lg:inset-x-auto lg:end-6 lg:bottom-6 lg:rounded-2xl lg:border lg:p-3" aria-label={dict.contactLabel} data-contact-source="contact_dock">
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <a href={`tel:${phoneE164}`} className="btn-action min-h-12 flex-1 px-5 text-sm lg:flex-none"><Phone size={17} aria-hidden="true" />{dict.call}</a>
        <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 lg:flex-none"><WhatsAppIcon size={19} />WhatsApp</a>
        <ContactButton source="contact_dock" className="hidden min-h-12 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-brand-900 sm:inline-flex">{dict.more}<ArrowUpRight size={16} aria-hidden="true" /></ContactButton>
      </div>
    </aside>
  );
}
