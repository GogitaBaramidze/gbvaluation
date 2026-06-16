import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import Logo from "@/components/layout/Logo";

type FooterProps = {
  dict: Dictionary["footer"];
};

export default function Footer({ dict }: FooterProps) {
  const links = [
    { label: dict.links.home, href: "#" },
    { label: dict.links.services, href: "#services" },
    { label: dict.links.needs, href: "#needs" },
    { label: dict.links.about, href: "#expert" },
    { label: dict.links.contact, href: "#contact" },
  ];

  return (
    <footer
      id="contact"
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
          <a
            href="mailto:info@gbvaluation.ge"
            className="btn-primary text-sm px-7 py-3 group shrink-0"
          >
            {dict.ctaButton}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="mb-5 inline-block">
              <Logo tagline={dict.tagline} variant="dark" />
            </a>
            <p className="text-white/45 text-sm leading-relaxed">
              {dict.description}
            </p>

            {/* Contact info */}
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="tel:+995555123456"
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
                >
                  <Phone size={13} className="text-brand-300" />
                  (+995) 555 123 456
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@gbvaluation.ge"
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
                >
                  <Mail size={13} className="text-brand-300" />
                  info@gbvaluation.ge
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/45">
                <MapPin size={13} className="text-brand-300" />
                {dict.city}
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              {dict.navHeading}
            </p>
            <ul className="space-y-3">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              {dict.servicesHeading}
            </p>
            <ul className="space-y-3">
              {dict.services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5">
              {dict.certHeading}
            </p>
            <div className="space-y-3">
              {["NBG", "RICS", "IVS", "ECO"].map((cert) => (
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
            <p className="text-white/35 text-xs leading-relaxed mt-5">
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
          <div className="flex gap-5">
            <a href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">
              {dict.privacy}
            </a>
            <a href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">
              {dict.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
