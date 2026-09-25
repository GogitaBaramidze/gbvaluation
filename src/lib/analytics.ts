export type ContactChannel = "phone" | "whatsapp" | "telegram" | "email";

type Pixel = (action: "track" | "trackCustom", event: string, parameters?: Record<string, string>) => void;
declare global { interface Window { fbq?: Pixel; } }

// A click measures contact intent, not a confirmed conversation or lead.
export function trackContact(channel: ContactChannel, source: string) {
  window.fbq?.("track", "Contact", { contact_channel: channel, source });
}
export function trackContactOptions(source: string) {
  window.fbq?.("trackCustom", "ContactOptionsOpened", { source });
}
