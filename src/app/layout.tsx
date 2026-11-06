import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { getSiteOrigin, isIndexingAllowed, organizationSchema, personSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const origin = getSiteOrigin();

export const metadata: Metadata = {
  metadataBase: origin ? new URL(origin) : undefined,
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: `Astrology consultations with ${siteConfig.astrologer} in Prayagraj and online worldwide. Kundli, marriage, career, numerology, Vastu and Muhurat in Hindi and English.`,
  applicationName: siteConfig.name,
  robots: { index: isIndexingAllowed(), follow: true, googleBot: { index: isIndexingAllowed(), follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  referrer: "strict-origin-when-cross-origin",
  other: { "color-scheme": "dark" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-navy-deep text-cream antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {origin && <JsonLd data={[organizationSchema(origin), personSchema(origin), websiteSchema(origin)]}/>}
        <div className="flex min-h-screen flex-col">
          <SiteHeader/>
          <main id="main-content" className="min-w-0 flex-1">{children}</main>
          <SiteFooter/>
        </div>
      </body>
    </html>
  );
}
