import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// The admin path is deliberately not listed: robots.txt is public and listing
// it would advertise the URL. Admin pages are behind login and send noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/blog/preview/", "/notices/preview/", "/unsubscribe"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
