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

export type AdminNavItem = NavItem & {
  /** lucide icon name, resolved in the admin nav component */
  icon: "gauge" | "book" | "calendar" | "megaphone" | "mail" | "users" | "shield" | "user";
  /** Only shown to these roles. Omit for everyone. */
  roles?: ("ADMIN" | "EDITOR")[];
};

export const adminNav: { heading: string; items: AdminNavItem[] }[] = [
  {
    heading: "概要",
    items: [{ label: "ダッシュボード", href: "/admin", icon: "gauge" }],
  },
  {
    heading: "コンテンツ",
    items: [
      { label: "ブログ", href: "/admin/blog", icon: "book" },
      { label: "セミナー", href: "/admin/seminars", icon: "calendar" },
      { label: "お知らせ", href: "/admin/announcements", icon: "megaphone" },
      { label: "ニュースレター", href: "/admin/newsletters", icon: "mail" },
    ],
  },
  {
    heading: "管理",
    items: [
      { label: "購読者", href: "/admin/subscribers", icon: "users", roles: ["ADMIN"] },
      { label: "ユーザー", href: "/admin/users", icon: "shield", roles: ["ADMIN"] },
      { label: "プロフィール", href: "/admin/profile", icon: "user" },
    ],
  },
];
