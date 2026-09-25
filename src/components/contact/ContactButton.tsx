"use client";

import { useContactModal } from "@/components/contact/ContactModal";

type ContactButtonProps = {
  className?: string;
  children: React.ReactNode;
  source?: string;
};

// Drop-in contact CTA for server components: renders a button that opens
// the contact-channel modal instead of linking anywhere.
export default function ContactButton({
  className,
  children,
  source = "cta",
}: ContactButtonProps) {
  const openContactModal = useContactModal();

  return (
    <button
      type="button"
      onClick={() => openContactModal(source)}
      aria-haspopup="dialog"
      className={`cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
