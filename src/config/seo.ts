import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Per-page SEO. One entry per route so titles and descriptions are written
 * once, in one place, and stay consistent.
 *
 * Titles lead with the Japanese phrases employers actually search for
 * (バングラデシュ人材, 特定技能, 技能実習, 高度人材) and end with the brand
 * through the layout template. Keep the page part around 30 full-width
 * characters so it survives Google's truncation; descriptions 90 to 120.
 */
export const pageSeo = {
  home: {
    path: "/",
    title: "バングラデシュ人材・特定技能の採用支援",
    description:
      "バングラデシュ人材の採用ならJBBC（ジャパンバングラブリッジ株式会社）。特定技能・技能実習・高度人材の紹介から入国手続き、日本語教育、就業後の定着支援まで一貫してサポート。東京・ダッカの自社拠点で安心の外国人採用を。",
  },
  why: {
    path: "/why",
    title: "選ばれる理由｜バングラデシュ人材採用の6つの強み",
    description:
      "JBBCが外国人材・特定技能の採用で選ばれる6つの理由。採用スピード、高精度な人材選考、入国から就業後までの徹底支援、現場に寄り添う伴走、明確なKPIレポート、コストパフォーマンス。",
  },
  services: {
    path: "/services",
    title: "サービス紹介｜特定技能・技能実習・高度人材の紹介",
    description:
      "特定技能（SSW）人材紹介、高度人材・技人国の紹介、技能実習生受入支援、留学生受入支援、IT開発、海外進出支援。介護・建設・製造・自動車整備・食品など幅広い分野でバングラデシュ人材をご紹介します。",
  },
  cases: {
    path: "/cases",
    title: "導入実績｜外国人材・特定技能の受入れ事例",
    description:
      "JBBCの外国人材導入実績。製造業・縫製・建設・物流などでバングラデシュ人材を受け入れた企業の課題、ご提案、結果・効果を事例形式でご紹介します。",
  },
  company: {
    path: "/company",
    title: "会社情報｜ジャパンバングラブリッジ株式会社",
    description:
      "ジャパンバングラブリッジ株式会社（JBBC）の会社情報。代表ご挨拶と会社概要。東京・新宿本社とバングラデシュ・ダッカ現地法人で、日本とバングラデシュをつなぐ人材事業を行っています。",
  },
  companyProfile: {
    path: "/company/profile",
    title: "会社概要｜ジャパンバングラブリッジ株式会社",
    description:
      "ジャパンバングラブリッジ株式会社（JBBC）の会社概要。設立2010年、新宿本社とダッカ現地法人、事業内容、有料職業紹介・登録支援機関などの許認可、グループ会社、加盟団体。",
  },
  companyMessage: {
    path: "/company/message",
    title: "代表ご挨拶｜ジャパンバングラブリッジ株式会社",
    description:
      "ジャパンバングラブリッジ株式会社 代表取締役 タハミド モイズルからのご挨拶。人・技術・機会で日本とバングラデシュの架け橋となるJBBCの想いをお伝えします。",
  },
  seminar: {
    path: "/seminar",
    title: "セミナー・イベント｜特定技能・外国人採用セミナー",
    description:
      "JBBC主催の企業向けセミナー・イベント情報。特定技能制度、技能実習、バングラデシュ人材の採用方法を解説するオンラインセミナーや現地視察ツアーに無料でお申し込みいただけます。",
  },
  blog: {
    path: "/blog",
    title: "ブログ｜特定技能・在留資格・バングラデシュ人材の最新情報",
    description:
      "特定技能（SSW）、技能実習、技術・人文知識・国際業務、高度人材などの在留資格ガイドと、バングラデシュ人材採用の実績・ノウハウ、現地の最新情報をお届けします。",
  },
  faq: {
    path: "/faq",
    title: "よくある質問｜特定技能・技能実習・外国人採用",
    description:
      "特定技能と技能実習の違い、採用までの期間と費用、対象分野、日本語レベル、宗教・文化面の配慮、留学生支援、在留資格認定証明書（COE）など、外国人採用のよくある質問にお答えします。",
  },
  notices: {
    path: "/notices",
    title: "お知らせ・ニュース",
    description:
      "ジャパンバングラブリッジ株式会社（JBBC）からのお知らせ、ニュースレター、セミナー情報。バングラデシュ人材の採用、技能試験、日本・バングラデシュ間の雇用に関する最新情報。",
  },
  contact: {
    path: "/contact",
    title: "お問い合わせ｜バングラデシュ人材・特定技能の採用相談",
    description:
      "外国人材・特定技能の採用に関するご相談、資料請求、求職のお問い合わせはこちら。法人・個人それぞれのフォームからご連絡ください。お電話 03-6279-1289（平日9:00〜17:00）。",
  },
  download: {
    path: "/download",
    title: "資料ダウンロード｜バングラデシュ人材採用サービス資料",
    description:
      "特定技能・技能実習・高度人材の制度概要、JBBCの採用サポート内容、受入れまでの流れをまとめたサービス資料を無料でご請求いただけます。",
  },
  bangladesh: {
    path: "/bangladesh-jinzai",
    title: "バングラデシュ人材の採用ならJBBC｜特定技能・技能実習・高度人材",
    description:
      "バングラデシュ人材を採用するメリット、特定技能・技能実習（育成就労）・技人国の3つのルート、対象分野、採用までの流れ、費用の考え方、入国後の定着支援までを一つのページで解説。東京・ダッカの自社拠点を持つJBBCがご案内します。",
  },
  ikusei: {
    path: "/ikusei-shuro",
    title: "育成就労制度とは？技能実習との違いと2027年施行のポイント",
    description:
      "2027年4月施行予定の育成就労制度を分かりやすく解説。技能実習との違い、3年間の育成期間と特定技能1号への移行、転籍のルール、日本語要件、受入れ企業と送出し機関の役割、バングラデシュ人材の受入れ準備について。",
  },
  privacy: {
    path: "/privacy",
    title: "プライバシーポリシー",
    description:
      "ジャパンバングラブリッジ株式会社（JBBC）の個人情報保護方針。本ウェブサイトで取得する個人情報の収集方法、利用目的、第三者提供、開示・訂正・利用停止の手続きについて。",
  },
} as const satisfies Record<string, { path: string; title: string; description: string }>;

export type PageKey = keyof typeof pageSeo;

/** "%s｜JBBC (Japan Bangla Bridge)": applied by the root layout and reused for social titles. */
export const titleTemplate = `%s｜${siteConfig.name} (${siteConfig.brandEn})`;
export const withBrand = (title: string) => titleTemplate.replace("%s", title);

/** Build Next.js metadata for a page defined in pageSeo. */
export function pageMetadata(key: PageKey, extra: Metadata = {}): Metadata {
  const page = pageSeo[key];
  const url = `${siteConfig.url}${page.path}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: withBrand(page.title),
      description: page.description,
      url,
      type: "website",
    },
    twitter: {
      title: withBrand(page.title),
      description: page.description,
    },
    ...extra,
  };
}
