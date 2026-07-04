"use client";

import { useContactModal } from "@/components/contact/ContactModal";

type ContactButtonProps = {
  className?: string;
  children: React.ReactNode;
};

// Drop-in contact CTA for server components: renders a button that opens
// the contact-channel modal instead of linking anywhere.
export default function ContactButton({
  className,
  children,
}: ContactButtonProps) {
  const openContactModal = useContactModal();

  return (
    <button
      type="button"
      onClick={openContactModal}
      className={`cursor-pointer ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
