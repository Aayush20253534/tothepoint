import type { MetadataRoute } from "next";
import { getSiteOrigin, isIndexingAllowed } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();
  // Until the canonical origin is configured, deliberately prevent indexing of preview domains.
  if (!origin || !isIndexingAllowed()) return { rules: [{ userAgent: "*", disallow: "/" }] };
  // Crawlers must be able to see noindex on draft policies/testimonials.
  // Blocking those pages here would hide their noindex directives.
  const disallow = ["/api/"];
  return {
    rules: { userAgent: "*", allow: "/", disallow },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
