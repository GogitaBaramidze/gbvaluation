import { Phone, MapPin, ArrowRight } from "lucide-react";
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
            href="https://wa.me/995595912296"
            target="_blank"
            rel="noopener noreferrer"
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
                  href="tel:+995595912296"
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
                >
                  <Phone size={13} className="text-brand-300" />
                  (+995) 595 91 22 96
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/gogita.baramidze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-brand-300"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
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
