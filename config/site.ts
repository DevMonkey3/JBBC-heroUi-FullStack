export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Japan Bangla Bridge Company (JBBC)",
  description: "日本バングラブリッジ株式会社 - バングラデシュと日本をつなぐ人材紹介、技能実習生、特定技能外国人の受入れ支援を行っています。",
  keywords: "JBBC, 日本バングラブリッジ, バングラデシュ, 人材紹介, 技能実習生, 特定技能, 外国人労働者, 人材派遣, 国際人材",
  author: "Japan Bangla Bridge Company",
  siteUrl: process.env.NEXTAUTH_URL || "https://jbbc.co.jp",
  ogImage: "/og-image.jpg",
  twitterHandle: "@jbbc_official",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
