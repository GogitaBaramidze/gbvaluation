"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Appraisal", href: "/valuation" },
  { label: "Services", href: "/services" },
  { label: "About SFAI", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const HERO_PAGES = ["/"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"EN" | "KA">("EN");
  const pathname = usePathname();

  const isHeroPage = HERO_PAGES.includes(pathname);
  const transparent = isHeroPage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Top info bar ── always dark navy ── */}
      <div style={{ backgroundColor: "#071e3d" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-10">
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+995555123456"
              className="flex items-center gap-1.5 text-white/60 text-xs hover:text-white transition-colors"
            >
              <Phone size={11} />
              (+995) 555 123 456
            </a>
            <a
              href="mailto:info@sfaigeorgia.ge"
              className="flex items-center gap-1.5 text-white/60 text-xs hover:text-white transition-colors"
            >
              <Mail size={11} />
              info@sfaigeorgia.ge
            </a>
          </div>
          <div className="ml-auto flex items-center gap-1 text-xs font-medium">
            {(["EN", "KA"] as const).map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="text-white/25 mx-1">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    lang === l
                      ? "text-white bg-white/15"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── transparent on hero, white when scrolled ── */}
      <div
        className={`transition-colors duration-300 ${
          transparent ? "bg-transparent" : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col leading-none shrink-0"
              onClick={() => setMobileOpen(false)}
            >
              <span
                className={`text-[1.65rem] font-black tracking-tight transition-colors duration-300 ${
                  transparent ? "text-white" : ""
                }`}
                style={transparent ? {} : { color: "#0a2744" }}
              >
                GB
                <span style={{ color: transparent ? "#60c8f0" : "#1a6fa8" }}>
                  /
                </span>
                valuation
              </span>
              <span
                className={`text-[10px] font-medium tracking-widest uppercase mt-0.5 transition-colors duration-300 ${
                  transparent ? "text-white/50" : "text-zinc-400"
                }`}
              >
                Building Value
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1 text-[13.5px] px-3.5 py-2 rounded transition-colors ${
                    transparent
                      ? isActive(link.href)
                        ? "text-white font-semibold"
                        : "text-white/70 hover:text-white"
                      : isActive(link.href)
                      ? "font-semibold"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                  style={
                    !transparent && isActive(link.href)
                      ? { color: "#0a2744" }
                      : {}
                  }
                >
                  {link.label}
                  <ChevronDown size={13} className="opacity-50" />
                </Link>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className={`hidden lg:inline-flex items-center rounded-full border-2 text-[13px] font-semibold px-5 py-2 transition-colors ${
                  transparent
                    ? "border-white text-white hover:bg-white hover:text-[#0a2744]"
                    : "hover:bg-zinc-900 hover:text-white"
                }`}
                style={transparent ? {} : { borderColor: "#0a2744", color: "#0a2744" }}
              >
                Order a Valuation
              </Link>

              <button
                className={`lg:hidden p-1 transition-colors ${
                  transparent ? "text-white" : "text-zinc-600"
                }`}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
          {/* Separator — inset, aligned with content padding */}
          <div className={`h-px transition-colors duration-300 ${transparent ? "bg-white/20" : "bg-zinc-200"}`} />
        </div>
      </div>

      {/* ── Mobile menu ── always solid ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm py-2.5 px-3 rounded transition-colors ${
                  isActive(link.href)
                    ? "font-semibold bg-blue-50"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
                style={isActive(link.href) ? { color: "#0a2744" } : {}}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 rounded-full border-2 text-sm font-semibold px-5 py-2.5 text-center transition-colors hover:bg-zinc-900 hover:text-white"
              style={{ borderColor: "#0a2744", color: "#0a2744" }}
            >
              Order a Valuation
            </Link>
            <div className="mt-4 pt-4 border-t border-zinc-100 space-y-2">
              <a href="tel:+995555123456" className="flex items-center gap-2 text-xs text-zinc-400">
                <Phone size={12} /> (+995) 555 123 456
              </a>
              <a href="mailto:info@sfaigeorgia.ge" className="flex items-center gap-2 text-xs text-zinc-400">
                <Mail size={12} /> info@sfaigeorgia.ge
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
