import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/site";

// These editorial and service pages exist only in Georgian. Do not advertise
// translations until equivalent pages have actually been published.
export function georgianMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  const image = `${siteUrl}/ka/opengraph-image`;
  return {
    title: { absolute: `${title} | ${siteName}` }, description,
    authors: [{ name: siteName, url: `${siteUrl}/ka` }],
    alternates: { canonical: url, languages: { ka: url } },
    openGraph: {
      type: "website", url, title: `${title} | ${siteName}`, description,
      siteName, locale: "ka_GE", images: [{ url: image, width: 1200, height: 630, alt: siteName }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteName}`, description, images: [image] },
  };
}
