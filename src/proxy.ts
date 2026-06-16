import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

const COOKIE = "NEXT_LOCALE";

// Pick the best locale from a cookie preference, then the Accept-Language
// header, falling back to the default locale.
function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get(COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase());

    for (const lang of preferred) {
      const base = lang.split("-")[0];
      const match = locales.find((l) => l === lang || l === base);
      if (match) return match;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  // No locale in the path — redirect to the resolved locale.
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except API routes, Next internals, and files with an
  // extension (e.g. /banner-valuation.svg, /valuer.png, /favicon.ico).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
