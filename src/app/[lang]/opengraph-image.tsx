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

// Fetch a TTF subset from Google Fonts limited to `text`. An unrecognised
// User-Agent makes Google serve TTF (satori can't parse woff2). Returns null on
// any failure so the build still succeeds and we can fall back to English.
async function loadFontSubset(
  family: string,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const api = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+"
    )}:wght@${taglineWeight}&text=${encodeURIComponent(text)}`;
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
  let fontData: ArrayBuffer | null = null;
  if (family) {
    fontData = await loadFontSubset(family, tagline);
    if (!fontData) tagline = taglines.en.toLocaleUpperCase("en");
  }

  const tracking = upperCaseLocales.has(locale) || !fontData;

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
        {/* Brand mark — rising building bars, same as the site logo */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 10,
            height: 84,
            marginBottom: 40,
          }}
        >
          <div style={{ width: 22, height: 34, borderRadius: 5, background: "rgba(255,255,255,0.4)" }} />
          <div style={{ width: 22, height: 58, borderRadius: 5, background: "rgba(255,255,255,0.72)" }} />
          <div style={{ width: 22, height: 84, borderRadius: 5, background: "#60c8f0" }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 92,
            fontWeight: 800,
            color: "#ffffff",
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
            fontFamily: fontData ? "Tagline" : undefined,
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
      fonts: fontData
        ? [{ name: "Tagline", data: fontData, weight: taglineWeight, style: "normal" }]
        : undefined,
    }
  );
}
