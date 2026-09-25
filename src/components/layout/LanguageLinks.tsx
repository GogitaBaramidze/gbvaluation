"use client";

import { usePathname } from "next/navigation";
import { locales, localeNativeNames, type Locale } from "@/i18n/config";

export default function LanguageLinks({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const suffix = pathname.split("/").slice(2).join("/");
  return <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">{locales.map((locale) => (
    <a
      key={locale}
      href={`/${locale}${suffix ? `/${suffix}` : ""}`}
      hrefLang={locale}
      lang={locale}
      aria-current={lang === locale ? "page" : undefined}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
        window.location.assign(event.currentTarget.href + window.location.search + window.location.hash);
      }}
      className="py-2 text-xs text-white/60 underline-offset-4 hover:text-white hover:underline"
    >{localeNativeNames[locale]}</a>
  ))}</div>;
}
