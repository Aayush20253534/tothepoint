import type { MetadataRoute } from "next";
import { getIndexablePaths, getSiteOrigin, isIndexingAllowed } from "@/lib/seo";

export const dynamic = "force-static";

/** No fabricated lastModified timestamps. Unverified domains yield no URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin || !isIndexingAllowed()) return [];
  return getIndexablePaths().map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.75 : path.startsWith("/blog/") ? 0.6 : 0.85,
  }));
}
