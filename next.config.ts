import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // CDN originals are 5000-7000px. The optimizer resizes them to the
    // displayed width, converts to AVIF/WebP, and caches the result on disk
    // for a year, so each source image is processed once per size.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [112, 160, 320, 480],
    qualities: [75],
    // Keep in sync with ALLOWED_IMAGE_HOSTS in src/config/cdn.ts.
    remotePatterns: [
      { protocol: "https", hostname: "bbc-images.sgp1.cdn.digitaloceanspaces.com" },
      { protocol: "https", hostname: "jbbra.com" },
      { protocol: "https", hostname: "jbbc.co.jp" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
