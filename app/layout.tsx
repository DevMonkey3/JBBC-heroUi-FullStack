import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import LayoutContent from "./layout-content";

/**
 * SEO OPTIMIZATION: Root metadata configuration
 *
 * This metadata object is crucial for SEO as it:
 * 1. Sets the base URL for all relative URLs in metadata (metadataBase)
 * 2. Defines dynamic title templates for child pages
 * 3. Provides default meta descriptions for search engines
 * 4. Configures OpenGraph tags for social media sharing (Facebook, LinkedIn)
 * 5. Sets up Twitter Card for Twitter/X sharing
 * 6. Controls search engine crawling behavior with robots directives
 *
 * These settings cascade to all child pages unless overridden.
 */
export const metadata: Metadata = {
  // SEO: Base URL for resolving relative URLs in metadata (required for OpenGraph)
  metadataBase: new URL(siteConfig.siteUrl),

  // SEO: Dynamic title configuration
  // - default: Used when child pages don't define a title
  // - template: Pattern for child page titles (e.g., "Blog | JBBC")
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  // SEO: Meta description shown in search results (155-160 chars optimal)
  description: siteConfig.description,

  // SEO: Keywords help search engines understand page content
  keywords: siteConfig.keywords,

  // SEO: Author and publisher metadata for credibility
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,

  // SEO: Prevent automatic detection/linking of contact info (reduces spam)
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // SEO: OpenGraph tags for social media sharing (Facebook, LinkedIn, etc.)
  // When users share your links, these control how the preview looks
  openGraph: {
    type: "website",
    locale: "ja_JP", // Japanese locale for proper language detection
    url: siteConfig.siteUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // OpenGraph images should be 1200x630px for optimal display
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // SEO: Twitter/X Card configuration for Twitter sharing
  // "summary_large_image" shows a large image preview
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },

  // SEO: Search engine crawling directives
  // Controls how Google and other search engines index your site
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Allow crawlers to follow links on this page
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1, // No limit on video preview length
      "max-image-preview": "large", // Allow large image previews in search
      "max-snippet": -1, // No limit on text snippet length
    },
  },

  // SEO: Favicon configuration for browser tabs and bookmarks
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png", // iOS home screen icon
  },

  // PWA: Web app manifest for installability
  manifest: "/site.webmanifest",
};

/**
 * SEO OPTIMIZATION: Viewport configuration
 *
 * Defines theme color for mobile browsers' address bar
 * Adapts to user's light/dark mode preference
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // SEO: lang="ja" for Japanese content (was "en" - changed for correct language detection)
    // This helps search engines understand the primary language of your site
    <html suppressHydrationWarning lang="ja">
      <head />
      <body
        className={clsx(
          // PERFORMANCE: antialiased improves text rendering
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  );
}
