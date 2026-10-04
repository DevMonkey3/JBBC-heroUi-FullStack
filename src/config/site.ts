/**
 * Public site configuration. Safe to import from client components.
 */
export const siteConfig = {
  name: "JBBC",
  brandEn: "Japan Bangla Bridge",
  legalName: "Japan Bangla Bridge Corporation",
  legalNameJa: "ジャパンバングラブリッジ株式会社",
  /** Full home-page title: the main search phrases first, then the brand. */
  defaultTitle: "バングラデシュ人材・特定技能の採用支援｜JBBC（ジャパンバングラブリッジ株式会社）",
  description:
    "バングラデシュ人材の採用ならJBBC（ジャパンバングラブリッジ株式会社）。特定技能・技能実習・高度人材の紹介から入国手続き、日本語教育、就業後の定着支援まで一貫してサポート。東京・ダッカの自社拠点で安心の外国人採用を。",
  keywords: [
    "バングラデシュ人材",
    "バングラデシュ人材 採用",
    "バングラデシュ人材紹介",
    "特定技能 バングラデシュ",
    "外国人材 採用",
    "特定技能 人材紹介",
    "技能実習 バングラデシュ",
    "高度人材 バングラデシュ",
    "登録支援機関 東京",
    "ジャパンバングラブリッジ",
    "JBBC",
    "Japan Bangla Bridge Corporation",
    "Specified Skilled Worker Bangladesh",
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
