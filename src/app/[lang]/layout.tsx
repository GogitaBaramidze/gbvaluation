import type { Metadata, Viewport } from "next";
import {
  Geist,
  Noto_Sans,
  Noto_Sans_Georgian,
  Noto_Sans_JP,
  Noto_Sans_Arabic,
} from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MetaPixel from "@/components/analytics/MetaPixel";
import ContactModalProvider from "@/components/contact/ContactModal";
import ContactDock from "@/components/contact/ContactDock";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, localeDir, isLocale, type Locale } from "@/i18n/config";
import { siteUrl, siteName } from "@/lib/site";

// One font per script. Each exposes the same `--font-geist-sans` variable
// that globals.css feeds into `--font-sans`, so whichever font we apply on
// <html> becomes the page font. Only the active locale's font is loaded.
// (next/font requires the option values to be inline literals.)
const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const notoGeorgian = Noto_Sans_Georgian({
  variable: "--font-geist-sans",
  subsets: ["georgian"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const notoCyrillic = Noto_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-geist-sans",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Japanese is a large CJK font with no Latin "subset" to preload, so disable
// preload to avoid the build-time subset requirement.
const notoJapanese = Noto_Sans_JP({
  variable: "--font-geist-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: false,
});

const localeFont: Record<Locale, { variable: string }> = {
  en: geist,
  tr: geist,
  ka: notoGeorgian,
  ru: notoCyrillic,
  ja: notoJapanese,
  ar: notoArabic,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#071e3d",
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    applicationName: siteName,
    authors: [{ name: "Gogita Baramidze" }],
    creator: "Gogita Baramidze",
    publisher: siteName,
    category: "Real Estate",
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={localeDir[lang]}
      className={`${localeFont[lang].variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <MetaPixel />
        <ContactModalProvider dict={dict.contactModal}>
          <Navbar lang={lang} dict={dict.nav} />
          {children}
          <Footer dict={dict.footer} lang={lang} />
          <ContactDock dict={dict.conversion} />
        </ContactModalProvider>
      </body>
    </html>
  );
}
