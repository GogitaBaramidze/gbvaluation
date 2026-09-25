"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { Mail, Phone, ArrowUpRight, X } from "lucide-react";
import { trackContactOptions } from "@/lib/analytics";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  contactEmail,
  phoneDisplay,
  phoneE164,
  telegramHandle,
  telegramUrl,
  whatsAppUrl,
} from "@/lib/contact";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/icons";

const ContactModalContext = createContext<((source?: string) => void) | null>(null);

// Any client component under the provider can open the modal with this hook.
export function useContactModal() {
  const open = useContext(ContactModalContext);
  if (!open) {
    throw new Error("useContactModal must be used within <ContactModalProvider>");
  }
  return open;
}

type ContactModalProviderProps = {
  dict: Dictionary["contactModal"];
  children: React.ReactNode;
};

export default function ContactModalProvider({
  dict,
  children,
}: ContactModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("cta");
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = useCallback((placement = "cta") => {
    setSource(placement);
    trackContactOptions(placement);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Escape closes the modal; page scroll is locked while it is open.
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const controls = () => Array.from(dialog?.querySelectorAll<HTMLElement>('a[href], button') ?? []);
    controls()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const items = controls();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, close]);

  const channels = [
    {
      label: dict.phone,
      detail: phoneDisplay,
      href: `tel:${phoneE164}`,
      external: false,
      icon: <Phone size={20} />,
      iconBg: "#fff0cf",
      iconColor: "#7e5200",
    },
    {
      label: "WhatsApp",
      detail: phoneDisplay,
      href: whatsAppUrl,
      external: true,
      icon: <WhatsAppIcon size={18} />,
      iconBg: "#e5f8ec",
      iconColor: "#1da851",
    },
    {
      label: "Telegram",
      detail: telegramHandle,
      href: telegramUrl,
      external: true,
      icon: <TelegramIcon size={18} />,
      iconBg: "#e7f4fb",
      iconColor: "#229ed9",
    },
    {
      label: dict.email,
      detail: contactEmail,
      href: `mailto:${contactEmail}`,
      external: false,
      icon: <Mail size={18} />,
      iconBg: "var(--color-brand-50)",
      iconColor: "var(--color-brand-600)",
    },
  ];

  return (
    <ContactModalContext.Provider value={open}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={dict.title}
          aria-describedby="contact-description"
          data-contact-source={source}
          ref={dialogRef}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm"
            style={{ animation: "modal-fade 0.2s ease-out" }}
            onClick={close}
          />

          {/* Panel */}
          <div
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            style={{ animation: "modal-pop 0.25s ease-out" }}
          >
            <button
              type="button"
              onClick={close}
              aria-label={dict.close}
              className="absolute end-3 top-3 flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X size={18} />
            </button>

            <p className="pe-8 text-lg font-extrabold text-brand-900">
              {dict.title}
            </p>
            <p id="contact-description" className="mt-2 text-sm text-slate-600">{dict.subtitle}</p>

            <div className="mt-5 space-y-2.5">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={close}
                  className="flex items-center gap-3.5 rounded-2xl border border-zinc-200 px-4 py-3.5 transition-colors hover:border-brand-300 hover:bg-brand-50"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: channel.iconBg,
                      color: channel.iconColor,
                    }}
                  >
                    {channel.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-brand-900">
                      {channel.label}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-slate-600" dir="ltr">
                      {channel.detail}
                    </span>
                  </span>
                  <ArrowUpRight size={17} className="ms-auto shrink-0 text-slate-400" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </ContactModalContext.Provider>
  );
}
