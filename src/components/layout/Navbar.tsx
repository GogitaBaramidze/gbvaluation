"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { locales, localeNativeNames, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Logo from "@/components/layout/Logo";

const navHrefs = ["#services", "#needs", "#expert", "#contact"] as const;
const sectionIds = navHrefs.map((h) => h.slice(1));

type NavbarProps = {
  lang: Locale;
  dict: Dictionary["nav"];
};

export default function Navbar({ lang, dict }: NavbarProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: dict.links.services, href: "#services" },
    { label: dict.links.needs, href: "#needs" },
    { label: dict.links.expert, href: "#expert" },
    { label: dict.links.contact, href: "#contact" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Switch locale by swapping the first path segment. A full navigation
  // (not router.push) guarantees the new locale's content AND its script
  // font both load. The cookie makes the proxy honour the choice later.
  const switchLocale = useCallback(
    (target: Locale) => {
      document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000;samesite=lax`;
      const segments = pathname.split("/");
      segments[1] = target;
      window.location.assign(segments.join("/") || `/${target}`);
    },
    [pathname]
  );

  // Close the language dropdown on outside click or Escape.
  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  }, []);

  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      scrollToId(href.slice(1));
      setMobileOpen(false);
    };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveId("");
    setMobileOpen(false);
  };

  const isActive = (href: string) => activeId === href.slice(1);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Top info bar ── always dark navy ── */}
      <div className="bg-brand-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-10">
          <div className="hidden lg:flex items-center gap-5">

            <a href="https://wa.me/995595912296" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/60 text-xs hover:text-white transition-colors">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="https://www.facebook.com/gogita.baramidze" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/60 text-xs hover:text-white transition-colors">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <span className="text-white/20">|</span>
            <a href="tel:+995595912296"
              className="flex items-center gap-1.5 text-white/60 text-xs hover:text-white transition-colors">
              <Phone size={11} />
              (+995) 595 91 22 96
            </a>
          </div>
          <div className="ml-auto relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Change language"
              className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-white/80 transition-colors hover:text-white"
            >
              <Globe size={13} className="shrink-0" />
              <span>{localeNativeNames[lang]}</span>
              <ChevronDown
                size={13}
                className={`shrink-0 transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <ul
                role="listbox"
                className="absolute end-0 z-50 mt-1.5 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1.5 shadow-xl"
              >
                {locales.map((l) => (
                  <li key={l}>
                    <button
                      role="option"
                      aria-selected={lang === l}
                      onClick={() => switchLocale(l)}
                      className={`flex w-full items-center justify-between px-3.5 py-2 text-sm transition-colors ${
                        lang === l
                          ? "bg-brand-50 font-semibold text-brand-700"
                          : "text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      <span>{localeNativeNames[l]}</span>
                      {lang === l && <Check size={14} className="text-brand-600" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── solid white block ── */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <a href="#top" onClick={scrollToTop} className="shrink-0">
              <Logo tagline={dict.tagline} />
            </a>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick(link.href)}
                    className={`relative text-[13.5px] font-medium px-3.5 py-2 transition-colors ${
                      active
                        ? "text-brand-850"
                        : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {link.label}
                    {/* Animated active / hover underline */}
                    <span
                      className={`pointer-events-none absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full origin-left bg-brand-600 transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={handleNavClick("#contact")}
                className="hidden lg:inline-flex btn-outline-navy text-[13px] px-5 py-2"
              >
                {dict.cta}
              </a>

              <button
                className="lg:hidden p-1 text-zinc-600 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile menu ── always solid ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick(link.href)}
                className={`text-sm py-2.5 px-3 rounded transition-colors ${
                  isActive(link.href)
                    ? "font-semibold bg-brand-50 text-brand-850"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleNavClick("#contact")}
              className="btn-outline-navy mt-3 text-sm px-5 py-2.5"
            >
              {dict.cta}
            </a>
            <div className="mt-4 pt-4 border-t border-zinc-100 space-y-2">
              <a href="tel:+995595912296" className="flex items-center gap-2 text-xs text-zinc-400">
                <Phone size={12} /> (+995) 595 91 22 96
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
