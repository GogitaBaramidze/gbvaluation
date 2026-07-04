"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Mail, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  contactEmail,
  phoneDisplay,
  telegramHandle,
  telegramUrl,
  whatsAppUrl,
} from "@/lib/contact";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/icons";

const ContactModalContext = createContext<(() => void) | null>(null);

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
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Escape closes the modal; page scroll is locked while it is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  const channels = [
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
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm"
            style={{ animation: "modal-fade 0.2s ease-out" }}
            onClick={close}
          />

          {/* Panel */}
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
            style={{ animation: "modal-pop 0.25s ease-out" }}
          >
            <button
              type="button"
              onClick={close}
              aria-label={dict.close}
              className="absolute end-4 top-4 cursor-pointer rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X size={18} />
            </button>

            <p className="pe-8 text-lg font-extrabold text-brand-900">
              {dict.title}
            </p>
            <p className="mt-1 text-sm text-zinc-500">{dict.subtitle}</p>

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
                    <span className="block truncate text-xs text-zinc-400" dir="ltr">
                      {channel.detail}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </ContactModalContext.Provider>
  );
}
