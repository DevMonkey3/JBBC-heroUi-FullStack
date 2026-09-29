import type { NextConfig } from "next";

/**
 * Content-Security-Policy. Sources are limited to what the site actually
 * uses: the image CDN and optimizer, Google Analytics, YouTube embeds in
 * articles, and Google Fonts for the admin's shadcn defaults. Inline scripts
 * are allowed because Next.js and the JSON-LD blocks need them; unsafe-eval
 * only in development for React Refresh.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' https:",
  `connect-src 'self'${process.env.NODE_ENV === "development" ? " ws: wss:" : ""} https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com`,
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/**
 * Old-site URLs → new pages. Permanent so search engines move their rankings.
 * Matching here is case-insensitive, so a source that differs from its
 * destination only by case (the old "/Why") would loop; that one lives in
 * proxy.ts, which sees the exact path. tests/redirects.test.ts enforces it.
 */
const legacyRedirects = [
  ["/about", "/company"],
  ["/jbbc/Info", "/company"],
  ["/jbbc/Info/company/companyinfo", "/company/profile"],
  ["/jbbc/Info/company/PersonInfo", "/company/message"],
  ["/jbbc/services", "/services"],
  ["/jbbc/cases", "/cases"],
  ["/jbbc/cases/caseDetail", "/cases"],
  ["/jbbc/faq", "/faq"],
  ["/jbbc/contact/inquiry", "/contact"],
  ["/jbbc/careers", "/contact"],
  ["/legal/privacy", "/privacy"],
  ["/download/success", "/download"],
  ["/docs", "/"],
  ["/pricing", "/"],
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Smaller server bundle and memory footprint; also what App Platform and
  // Docker deployments need.
  output: "standalone",
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
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Long cache for the icons and share image; they change with a deploy.
        source: "/(icon.png|apple-icon.png|favicon.ico|og-image.jpg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
