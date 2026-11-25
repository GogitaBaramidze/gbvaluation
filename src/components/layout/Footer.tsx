import { Phone, MapPin, ArrowRight, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import Logo from "@/components/layout/Logo";
import ContactButton from "@/components/contact/ContactButton";
import LanguageLinks from "@/components/layout/LanguageLinks";
import type { Locale } from "@/i18n/config";
import { serviceKeys, serviceSlugs } from "@/lib/services";
import { articleNavLabels } from "@/lib/navigation";
import { getAdditionalServices } from "@/content/additional-services";
import { valuationCertificateNumber } from "@/lib/credentials";
import { facebookUrl, googleMapsUrl, googleProfileLabels } from "@/lib/profiles";
import { TelegramIcon } from "@/components/ui/icons";
import {
  phoneDisplay,
  phoneE164,
  contactEmail,
  telegramHandle,
  telegramUrl,
} from "@/lib/contact";

type FooterProps = {
  dict: Dictionary["footer"];
  lang: Locale;
};

export default function Footer({ dict, lang }: FooterProps) {
  const links = [
    { label: dict.links.home, href: "#" },
    { label: dict.links.services, href: "#services" },
    { label: dict.links.needs, href: "#needs" },
    { label: dict.links.about, href: "#expert" },
    { label: articleNavLabels[lang], href: `/${lang}/articles` },
    { label: dict.links.contact, href: "#contact" },
  ];

  return (
    <footer
      id="contact"
      data-contact-source="footer"
      style={{ background: "var(--gradient-footer)" }}
    >
      {/* Top CTA strip */}
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg">
              {dict.ctaHeading}
            </p>
            <p className="text-white/50 text-sm mt-1">
              {dict.ctaSubtext}
            </p>
          </div>
          <ContactButton source="footer" className="btn-action min-h-14 text-sm px-7 py-3 group shrink-0">
            {dict.ctaButton}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </ContactButton>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href={`/${lang}`} className="mb-5 inline-block">
              <Logo tagline={dict.tagline} variant="dark" />
            </a>
            <p className="text-white/45 text-sm leading-relaxed">
              {dict.description}
            </p>

            {/* Contact info */}
            <ul className="mt-6 space-y-3">
              <li><a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-white/70 hover:text-white">Facebook</a></li>
              <li><a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-white/70 hover:text-white">{googleProfileLabels[lang]}</a></li>
              <li><a href={`mailto:${contactEmail}`} className="inline-flex min-h-11 items-center gap-2.5 break-all text-sm text-white/70 hover:text-white"><Mail size={13} className="shrink-0 text-brand-300" aria-hidden="true" /><span dir="ltr">{contactEmail}</span></a></li>
              <li>
                <a
                  href={`tel:${phoneE164}`}
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
                >
                  <Phone size={13} className="text-brand-300" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
                >
                  <TelegramIcon size={13} className="text-brand-300" />
                  <span dir="ltr">{telegramHandle}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/45">
                <MapPin size={13} className="text-brand-300" />
                {dict.city}
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label={dict.navHeading}>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              {dict.navHeading}
            </p>
            <ul className="space-y-3">
              {links.map(({ label, href }) =>
                href === "#contact" ? (
                  // Contact opens the channel-picker modal instead of linking.
                  <li key={href}>
                    <ContactButton className="text-sm text-white/50 hover:text-white transition-colors">
                      {label}
                    </ContactButton>
                  </li>
                ) : (
                  <li key={href}>
                    <a
                      href={href.startsWith("/") ? href : `/${lang}${href === "#" ? "" : href}`}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              {dict.servicesHeading}
            </p>
            <ul className="space-y-3">
              {dict.services.map((s, index) => (
                <li key={s}>
                  <a
                    href={`/${lang}/services/${serviceSlugs[serviceKeys[index]]}`}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
              {getAdditionalServices(lang).map((service) => (
                <li key={service.slug}><a href={`/${lang}/services/${service.slug}`} className="text-sm text-white/70 hover:text-white transition-colors">{service.cardTitle}</a></li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              {dict.certHeading}
            </p>
            <div className="space-y-3">
              {[valuationCertificateNumber].map((cert) => (
                <div
                  key={cert}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mr-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-xs font-bold text-brand-300">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-xs leading-relaxed mt-5">
              {dict.certNote}
            </p>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} GB Valuation. {dict.rights}
          </p>
          <LanguageLinks lang={lang} />
        </div>
      </div>
    </footer>
  );
}
