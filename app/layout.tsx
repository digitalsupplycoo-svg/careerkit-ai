import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentBanner from "@/components/ConsentBanner";
import { ADSENSE_CLIENT, ADSENSE_VERIFICATION, SITE_URL, hasValidAdsenseClient } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CareerKit AI — Practical Career & Job Search Guides",
    template: "%s | CareerKit AI"
  },
  description:
    "Practical, original guides and free tools for resumes, interviews, salary negotiation, and job searching.",
  verification: ADSENSE_VERIFICATION ? { other: { "google-adsense-account": ADSENSE_VERIFICATION } } : undefined,
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
