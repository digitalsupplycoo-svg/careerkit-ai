import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema, SITE_NAME } from "@/lib/schema";
import { ADSENSE_CLIENT, ADSENSE_VERIFICATION, SITE_URL, hasValidAdsenseClient } from "@/lib/env";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const DEFAULT_DESCRIPTION =
  "Practical, original guides and free tools for resumes, interviews, salary negotiation, and job searching.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CareerKit AI — Practical Career & Job Search Guides",
    template: "%s | CareerKit AI"
  },
  description: DEFAULT_DESCRIPTION,
  verification: ADSENSE_VERIFICATION ? { other: { "google-adsense-account": ADSENSE_VERIFICATION } } : undefined,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "CareerKit AI — Practical Career & Job Search Guides",
    description: DEFAULT_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerKit AI — Practical Career & Job Search Guides",
    description: DEFAULT_DESCRIPTION
  }
  // No `alternates.canonical` here on purpose: an object set at this level would
  // otherwise be inherited wholesale by any page that doesn't define its own
  // `alternates`, silently canonicalizing every such page to "/". Each page sets
  // its own canonical explicitly instead.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {/* Loaded ONLY when a real, validly-formatted publisher ID is configured.
            Never a placeholder or fake ad script. See lib/env.ts. */}
        {hasValidAdsenseClient() && (
          <Script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
    </html>
  );
}
