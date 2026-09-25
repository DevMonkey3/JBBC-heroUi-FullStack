export type NavItem = {
  label: string;
  href: string;
};

/** Main site navigation. Order matches the current site. */
export const mainNav: NavItem[] = [
  { label: "ホーム", href: "/" },
  { label: "選ばれる理由", href: "/why" },
  { label: "サービス紹介", href: "/services" },
  { label: "導入実績", href: "/cases" },
  { label: "会社概要", href: "/company" },
  { label: "セミナー", href: "/seminar" },
  { label: "ブログ", href: "/blog" },
  { label: "お役立ち情報", href: "/faq" },
];

export const ctaNav = {
  inquiry: { label: "お問い合わせ", href: "/contact" },
  download: { label: "ダウンロード", href: "/download" },
} as const;

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "サービス",
    items: [
      { label: "サービス紹介", href: "/services" },
      { label: "導入実績", href: "/cases" },
      { label: "セミナー", href: "/seminar" },
      { label: "資料ダウンロード", href: "/download" },
    ],
  },
  {
    heading: "会社情報",
    items: [
      { label: "会社概要", href: "/company" },
      { label: "選ばれる理由", href: "/why" },
      { label: "お知らせ", href: "/notices" },
      { label: "ブログ", href: "/blog" },
    ],
  },
  {
    heading: "サポート",
    items: [
      { label: "お問い合わせ", href: "/contact" },
      { label: "よくある質問", href: "/faq" },
      { label: "プライバシーポリシー", href: "/privacy" },
    ],
  },
];

export const adminNav: NavItem[] = [
  { label: "ダッシュボード", href: "/admin" },
  { label: "ブログ", href: "/admin/blog" },
  { label: "セミナー", href: "/admin/seminars" },
  { label: "お知らせ", href: "/admin/announcements" },
  { label: "ニュースレター", href: "/admin/newsletters" },
  { label: "購読者", href: "/admin/subscribers" },
  { label: "ユーザー", href: "/admin/users" },
];
