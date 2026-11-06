import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { canonicalPath } from "@/lib/seo";

/** Keep every route's search and social identity in sync. */
export function pageMetadata(path: string, title: string, description: string, type: "website" | "article" = "website"): Metadata {
  const url = canonicalPath(path);
  const image = canonicalPath("/opengraph-image");
  const images = image ? [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name} — Prayagraj & online astrology consultations` }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_IN",
      images,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images },
  };
}
