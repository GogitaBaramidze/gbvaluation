"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { locales, localeNativeNames, type Locale } from "@/i18n/config";
import { articleNavLabels, localizedPathname } from "@/lib/navigation";
import type { Dictionary } from "@/i18n/dictionaries";
import Logo from "@/components/layout/Logo";
import { useContactModal } from "@/components/contact/ContactModal";
import { TelegramIcon, WhatsAppIcon } from "@/components/ui/icons";
import {
  phoneDisplay,
  phoneE164,
  telegramUrl,
  whatsAppUrl,
} from "@/lib/contact";

const navHrefs = ["#services", "#needs", "#expert", "#contact"] as const;
const sectionIds = navHrefs.map((h) => h.slice(1));

type NavbarProps = {
  lang: Locale;
  dict: Dictionary["nav"];
};

export default function Navbar({ lang, dict }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const openContactModal = useContactModal();

  const navLinks = [
    { label: dict.links.services, href: "#services" },
    { label: dict.links.needs, href: "#needs" },
    { label: dict.links.expert, href: "#expert" },
    { label: articleNavLabels[lang], href: "/ka/articles" },
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
      const destination = localizedPathname(pathname, target);
      const samePage = destination.split("/").slice(2).join("/") === pathname.split("/").slice(2).join("/");
      window.location.assign(destination + (samePage ? window.location.search + window.location.hash : ""));
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
  }, [pathname]);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      setActiveId(id);
    }
  }, []);

  // The Contact link opens the channel-picker modal; other links scroll.
  const handleNavClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (href === "#contact") {
        e.preventDefault();
        openContactModal("navigation");
      } else if (isHome && href.startsWith("#")) {
        e.preventDefault();
        scrollToId(href.slice(1));
      }
      setMobileOpen(false);
    };

  const scrollToTop = (e: React.MouseEvent) => {
    if (!isHome || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setActiveId("");
    setMobileOpen(false);
  };

  const isActive = (href: string) => href.startsWith("#") ? activeId === href.slice(1) : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" data-contact-source="navigation">
      {/* ── Top info bar ── always dark navy ── */}
      <div className="bg-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-10">
          <div className="flex items-center gap-5">

            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-white/80 text-xs hover:text-white transition-colors">
              <WhatsAppIcon size={11} />
              WhatsApp
            </a>
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-white/80 text-xs hover:text-white transition-colors">
              <TelegramIcon size={11} />
              Telegram
            </a>
            <span className="hidden lg:block text-white/20">|</span>
            <a href={`tel:${phoneE164}`}
              className="flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap text-white/90 text-[10px] sm:text-xs hover:text-white transition-colors" dir="ltr">
              <Phone size={11} />
              {phoneDisplay}
            </a>
          </div>
          <div className="ml-auto relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Change language"
              className={`flex items-center gap-1.5 rounded-full border px-2 sm:px-3 py-1.5 text-sm font-semibold text-white transition-colors ${
                langOpen
                  ? "border-white/40 bg-white/15"
                  : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <Globe size={16} className="shrink-0" />
              <span>{localeNativeNames[lang]}</span>
              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <ul
                role="listbox"
                className="absolute end-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1.5 shadow-xl"
              >
                {locales.map((l) => (
                  <li key={l}>
                    <button
                      role="option"
                      aria-selected={lang === l}
                      onClick={() => switchLocale(l)}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-[15px] transition-colors ${
                        lang === l
                          ? "bg-brand-50 font-semibold text-brand-700"
                          : "text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      <span>{localeNativeNames[l]}</span>
                      {lang === l && <Check size={16} className="text-brand-600" />}
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
            <a href={`/${lang}`} onClick={scrollToTop} className="shrink-0">
              <Logo tagline={dict.tagline} />
            </a>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href.startsWith("#") ? `/${lang}${link.href}` : link.href}
                    onClick={handleNavClick(link.href)}
                    className={`relative text-sm font-medium px-2.5 py-2 transition-colors ${
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
              <button
                type="button"
                onClick={() => openContactModal("navigation")}
                aria-haspopup="dialog"
                className="hidden lg:inline-flex btn-action min-h-11 cursor-pointer text-[13px] px-5 py-2"
              >
                {dict.cta}
              </button>

              <button
                className="lg:hidden min-h-11 min-w-11 flex items-center justify-center text-zinc-600 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
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
          <nav id="mobile-navigation" className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href.startsWith("#") ? `/${lang}${link.href}` : link.href}
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
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openContactModal("mobile_navigation");
              }}
              className="btn-outline-navy mt-3 cursor-pointer text-sm px-5 py-2.5"
            >
              {dict.cta}
            </button>
            <div className="mt-4 pt-4 border-t border-zinc-100 space-y-2">
              <a href={`tel:${phoneE164}`} className="flex items-center gap-2 text-xs text-zinc-400">
                <Phone size={12} /> {phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
