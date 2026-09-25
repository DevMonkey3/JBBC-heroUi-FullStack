/**
 * Public site configuration. Safe to import from client components.
 */
export const siteConfig = {
  name: "JBBC",
  legalName: "Japan Bangla Bridge Corporation",
  legalNameJa: "日本バングラブリッジ株式会社",
  /** Default page title when a page defines none. */
  defaultTitle: "Japan Bangla Bridge Corporation (JBBC) | Foreign Talent Recruitment in Japan",
  description:
    "JBBC connects Japanese companies with skilled workers from Bangladesh: Specified Skilled Worker (SSW) recruitment, technical intern training, highly skilled professionals and full onboarding support.",
  keywords: [
    "JBBC",
    "Japan Bangla Bridge Corporation",
    "foreign talent recruitment Japan",
    "Specified Skilled Worker",
    "SSW recruitment",
    "technical intern training program",
    "Bangladesh workers Japan",
    "日本バングラブリッジ",
    "特定技能",
    "技能実習生",
    "外国人材紹介",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jbbc.co.jp",
  locale: "ja_JP",
  ogImage: "/og-image.jpg",
  contact: {
    email: "info@jbbc.co.jp",
    phoneJp: "03-6279-1289",
    faxJp: "03-6279-1287",
    phoneBd: "+8801707020644",
  },
} as const;

export type SiteConfig = typeof siteConfig;
