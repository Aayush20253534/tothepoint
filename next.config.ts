import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({ extension: /\.mdx?$/ });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { qualities: [75, 85], formats: ["image/webp"] },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // All pages are rendered with local system fonts and source-controlled SVGs.
  // Headers apply to server responses; do not cache contact submissions.
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },
};

export default withMDX(nextConfig);
