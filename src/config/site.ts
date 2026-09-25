/**
 * Public site configuration. Safe to import from client components.
 */
export const siteConfig = {
  name: "JBBC",
  legalName: "Japan Bangla Bridge Corporation",
  legalNameJa: "日本バングラブリッジ株式会社",
  description:
    "日本バングラブリッジ株式会社 - バングラデシュと日本をつなぐ人材紹介、技能実習生、特定技能外国人の受入れ支援を行っています。",
  keywords: [
    "JBBC",
    "日本バングラブリッジ",
    "バングラデシュ",
    "人材紹介",
    "技能実習生",
    "特定技能",
    "外国人労働者",
    "人材派遣",
    "国際人材",
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
