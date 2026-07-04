import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";
import { isLocale, type Locale } from "@/i18n/config";

// Per-locale share card. `params` is a promise in this Next.js version.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteName} — Certified Property & Asset Valuations`;

// Localised strap-line shown under the brand mark.
const taglines: Record<Locale, string> = {
  en: "Certified Property & Asset Valuations",
  ka: "უძრავი ქონებისა და აქტივების სერტიფიცირებული შეფასება",
  ru: "Сертифицированная оценка недвижимости и активов",
  ja: "不動産・資産の認定評価",
  tr: "Sertifikalı Gayrimenkul ve Varlık Değerleme",
  ar: "تقييمات معتمدة للعقارات والأصول",
};

// next/og's bundled fallback font only covers basic Latin, so for every other
// script we fetch a glyph-subset of the matching Noto family. `en` needs none.
const fontFamilies: Partial<Record<Locale, string>> = {
  ka: "Noto Sans Georgian",
  ru: "Noto Sans",
  ja: "Noto Sans JP",
  tr: "Noto Sans",
  ar: "Noto Sans Arabic",
};

// Uppercase + letter-tracking reads well in Latin/Cyrillic, but not in
// Georgian, Japanese or (cursive) Arabic.
const upperCaseLocales = new Set<Locale>(["en", "ru", "tr"]);
const taglineWeight = 600;

// Brand mark (house + valuation check), same artwork as app/icon.svg.
// Passed to satori as a data-URI <img> — inline <svg> children crash it.
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a2e55"/><stop offset="1" stop-color="#071e3d"/></linearGradient></defs><rect width="48" height="48" rx="12" fill="url(#bg)" stroke="rgba(255,255,255,0.14)"/><path d="M9.5 21.5 24 10.5l14.5 11" fill="none" stroke="#60c8f0" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.5 24v10.5a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2V24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.92"/><path d="M18.8 29l3.8 3.6 6.8-7.6" fill="none" stroke="#60c8f0" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const markDataUri = `data:image/svg+xml,${encodeURIComponent(markSvg)}`;

// next/og fails to load its own bundled default font under Turbopack
// ("Cannot read properties of undefined (reading 'split')"), so a font must
// ALWAYS be passed explicitly. We read the Geist TTF that ships inside the
// next package as the guaranteed base and layer Google-fetched subsets on top.
async function loadBaseFont(): Promise<ArrayBuffer | null> {
  try {
    const buf = await readFile(
      path.join(
        process.cwd(),
        "node_modules",
        "next",
        "dist",
        "compiled",
        "@vercel",
        "og",
        "Geist-Regular.ttf"
      )
    );
    return buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength
    ) as ArrayBuffer;
  } catch {
    return null;
  }
}

// Fetch a TTF subset from Google Fonts limited to `text`. An unrecognised
// User-Agent makes Google serve TTF (satori can't parse woff2). Returns null on
// any failure so the build still succeeds and we can fall back.
async function loadFontSubset(
  family: string,
  text: string,
  weight: number
): Promise<ArrayBuffer | null> {
  try {
    const api = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+"
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(api)).text();
    const url = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
    )?.[1];
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";

  // Apply casing before subsetting so the fetched glyphs match what renders.
  let tagline = upperCaseLocales.has(locale)
    ? taglines[locale].toLocaleUpperCase(locale)
    : taglines[locale];

  const family = fontFamilies[locale];
  const [baseFont, wordmarkFont, taglineFont] = await Promise.all([
    loadBaseFont(),
    loadFontSubset("Noto Sans", "GB/valuation", 800),
    family ? loadFontSubset(family, tagline, taglineWeight) : null,
  ]);
  if (family && !taglineFont) tagline = taglines.en.toLocaleUpperCase("en");

  const tracking = upperCaseLocales.has(locale) || !taglineFont;

  const fonts = [];
  if (baseFont) {
    fonts.push({ name: "Geist", data: baseFont, weight: 400 as const, style: "normal" as const });
  }
  if (wordmarkFont) {
    fonts.push({ name: "Wordmark", data: wordmarkFont, weight: 800 as const, style: "normal" as const });
  }
  if (taglineFont) {
    fonts.push({ name: "Tagline", data: taglineFont, weight: 600 as const, style: "normal" as const });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #040f1e 0%, #071e3d 45%, #0a2e55 100%)",
        }}
      >
        {/* Brand mark — house with valuation check, same as the site logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={120}
          height={120}
          src={markDataUri}
          alt=""
          style={{ marginBottom: 40 }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 92,
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: wordmarkFont ? "Wordmark" : undefined,
          }}
        >
          GB
          <span style={{ color: "#60c8f0" }}>/</span>
          valuation
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 960,
            textAlign: "center",
            lineHeight: 1.3,
            fontSize: 30,
            fontWeight: taglineWeight,
            color: "rgba(255,255,255,0.65)",
            letterSpacing: tracking ? 6 : 0,
            direction: locale === "ar" ? "rtl" : "ltr",
            // Must never be undefined: satori's letter-spacing pass reads the
            // font family unconditionally and crashes on undefined.
            fontFamily: taglineFont ? "Tagline" : "Geist",
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 18,
          }}
        >
          {["NBG", "RICS", "IVS", "ECO"].map((cert) => (
            <div
              key={cert}
              style={{
                display: "flex",
                padding: "10px 26px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "#60c8f0",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {cert}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
