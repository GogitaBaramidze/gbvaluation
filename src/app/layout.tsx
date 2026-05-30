import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "GB Valuation — Certified Property & Asset Valuations",
    template: "%s | GB Valuation",
  },
  description:
    "Professional, legally recognised valuation certificates for property, estates, insurance, and business assets. RICS-qualified valuers with 48hr turnaround.",
  keywords: [
    "property valuation",
    "valuation certificate",
    "RICS valuation",
    "probate valuation",
    "insurance valuation",
    "GB Valuation",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "GB Valuation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
