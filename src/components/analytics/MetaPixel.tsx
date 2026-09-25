"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackContact, type ContactChannel } from "@/lib/analytics";
import { phoneE164, contactEmail, whatsAppUrl, telegramUrl } from "@/lib/contact";

const configuredId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const pixelId = /^\d+$/.test(configuredId) ? configuredId : null;
const channels = new Map<string, ContactChannel>([
  [`tel:${phoneE164}`, "phone"], [`mailto:${contactEmail}`, "email"],
  [whatsAppUrl, "whatsapp"], [telegramUrl, "telegram"],
]);

export default function MetaPixel() {
  useEffect(() => {
    if (!pixelId) return;
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const channel = channels.get(link.getAttribute("href") ?? "");
      if (!channel) return;
      const source = link.closest<HTMLElement>("[data-contact-source]")?.dataset.contactSource ?? "site";
      trackContact(channel, source);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!pixelId) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}
