/**
 * Home page copy and image paths. Images are CDN paths passed to cdn().
 */

export const hero = {
  /** Two pages of four portrait photos, then one wide image. */
  peoplePages: [
    [
      "home/Slider (6).avif",
      "home/Slider (13).avif",
      "home/Slider (16).avif",
      "home/Slider (17).avif",
    ],
    [
      "home/Slider (10).avif",
      "home/Slider (11).avif",
      "home/Slider (4).avif",
      "home/Slider (9).avif",
    ],
  ],
  wideImage: "home/indImage.avif",
  displayMs: 10_000,
} as const;

export const stats = [
  { value: "300+", label: "受入企業" },
  { value: "10K+", label: "就職者 登録人数" },
  { value: "2K+", label: "利用者" },
  { value: "300+", label: "求人募集中" },
] as const;

export const services = {
  title: "サービス紹介",
  lead: "各サービスの特長や解決方法、人材紹介開始までの詳細を各サービスごとにご紹介いたします。",
  cta: { label: "サービス詳細一覧をみる", href: "/services" },
  items: [
    { title: "特定技能人材紹介", image: "home/introduce.avif" },
    {
      title: "高度人材紹介",
      image:
        "Automation/indian-car-mechanic-standing-and-working-in-servic-2025-03-15-20-56-19-utc.avif",
    },
    {
      title: "技能実習生受入支援",
      image:
        "Aviation/closeup-shot-of-a-white-airplane-landed-in-the-air-2025-02-09-06-46-58-utc.avif",
    },
    {
      title: "留学生受入支援",
      image:
        "Software Engineer/young-programmer-working-on-desktop-pc-in-office-o-2025-03-25-12-53-58-utc.avif",
    },
  ],
} as const;

export const achievements = {
  title: "解決してきた実績があります",
  lead: "現在の日本の製造業には外国籍人材の活用は欠かせないものとなっております。当社では、60カ国以上の多様なグローバル人材の派遣が可能です。長期での派遣を可能にするため、万全なサポート体制を準備しています。",
  cta: { label: "サービス一覧をみる", href: "/cases" },
  items: [
    {
      image: "home/solve.avif",
      industry: "バイク製造の大手企業",
      department: "バイク製造工程における溶接",
      employees: "1,000名以上",
    },
    {
      image:
        "Garments/dressmaker-woman-sews-clothes-on-sewing-machine-in-2025-03-18-20-17-44-utc.avif",
      industry: "アパレル・縫製業",
      department: "衣服製造工程における縫製",
      employees: "500名以上",
    },
    {
      image: "home/Mask-group-4.avif",
      industry: "建設業",
      department: "建築工事における溶接",
      employees: "1,000名以上",
    },
  ],
  labels: { industry: "業界・業種", department: "部門・職種", employees: "従業員数" },
} as const;

export const clientLogos = {
  title: "ご利用企業様例",
  items: [
    "Carousal/Client-Logo-3.avif",
    "Carousal/Client-Logo-4.avif",
    "Carousal/Client-Logo-6.avif",
    "Carousal/Client-Logo-7.avif",
    "Carousal/Client-Logo-8.avif",
    "Carousal/Client-Logo-9.avif",
    "Carousal/Client-Logo-10.avif",
    "Carousal/Client-Logo-11.avif",
    "Carousal/Client-Logo-12.avif",
    "Carousal/Client-Logo-DP.avif",
    "Carousal/clientlogo8_2x.webp",
  ],
} as const;

export const sixPoints = {
  image: "home/leftside.avif",
  number: "6",
  kicker: "特定技能&外国人材",
  title: "つのポイント",
  items: [
    "日本在住歴、勤務歴あり外国人材",
    "採用~採用後も安心のサポート",
    "インターンからの特定技能採用",
    "留学生派遣からの特定技能採用",
    "オーダーメイド人材の採用",
    "安心のコンプライアンス",
  ],
} as const;

export const support = {
  word: "Support",
  images: ["home/content6Img1.avif", "home/content6Img2.avif"],
} as const;

export const fiveReasons = {
  kicker: "それが当社の",
  title: "「特定技能&外国人材」",
  lead: "当社の特定技能が選ばれる5つの理由とは・・・？",
  image: "home/personImage.avif",
  cta: { label: "営業担当に聞いてみる", href: "/contact" },
  items: [
    {
      title: "最適人材を紹介",
      description: "強固な外国人求職者ネットワーク＆求人媒体を駆使した採用で円滑なご紹介が可能",
    },
    {
      title: "フォローアップ",
      description:
        "住居のフォローなど直接雇用でありながら、採用から雇用後も一貫してフォローアップが可能です。報告書のレポート作成もお任せください",
    },
    {
      title: "外国からの特定技能",
      description: "若くて優秀なベトナム籍の大学生を最長1年採用し、期間中に特定技能試験を勉強",
    },
    {
      title: "留学生からの特定技能",
      description: "留学生の期間はお試しとして派遣で活用しつつ、その期間で見極めを行うことが可能",
    },
    {
      title: "当社の人材は「質」が違う！",
      description:
        "海外からの紹介人材なら「完全オーダーメイド」の事前教育プログラムを提供。専門用語などを事前に覚えてから入国するため、現場での即活躍が期待できます。",
    },
  ],
} as const;

export const sixReasons = {
  kicker: "当社ジャパンバングラブリッジの特長",
  title: "リピートいただく",
  highlight: "6つの理由",
  lead: [
    "私たちは単なる人材紹介会社ではありません。日本での成功した生活を築くための信頼できるパートナーです。",
    "実績あるサポート体制、個別対応、そして確かな解決力で、JBBCはあなたの「日本での夢」を現実にする場所です。",
  ],
  image: "home/Home_page_content8_personImage.avif",
  cta: { label: "6つ理由の詳細一覧を見る", href: "/why" },
  items: [
    { title: "信頼と実績", description: "日・バングラ間の豊富な実績で安心のサポートを提供。" },
    {
      title: "超迅速な人材供給力",
      description: "急なニーズにも即対応。スピードと精度で人材をご紹介。",
    },
    {
      title: "外国人材の導入安心支援",
      description:
        "専任チームが生産性向上を支援。現場管理や教育を徹底し、安定した人材運用を実現します。",
    },
    {
      title: "辞めない若手を確保できる",
      description: "外国籍の学生の受け入れを支援。採用から定着まで丁寧にサポートします。",
    },
    {
      title: "安全第一、未来への責任",
      description:
        "「安全第一」を掲げ、現場のリスク管理を徹底し、すべてのスタッフが安心して働ける環境を提供します。",
    },
    { title: "的確なマッチング", description: "求めるスキル・人物像に合致した候補者を厳選。" },
  ],
} as const;

export const industries = {
  kicker: "業種から",
  title: "活用方法を知る",
  lead: "当社は、技能実習生・特定技能人材高度人材の採用を希望する企業と求職者を直接結ぶ、日本最大級の採用プラットフォームを運営しております。",
  items: [
    {
      title: "建設業",
      description:
        "建設現場で即戦力となる外国人労働者を、迅速かつ簡単に、相場の約半分の価格で採用できます。",
      image: "home/industries.avif",
    },
    {
      title: "運送・ドライバー",
      description: "大型・中型免許を持つ即戦力ドライバーを、繁忙期にも安定してご紹介します。",
      image:
        "Driver/happy-professional-truck-driver-driving-his-truck-2025-03-17-11-28-31-utc.avif",
    },
    {
      title: "事務・管理",
      description:
        "日本語能力と実務経験を備えた事務・管理人材を、貴社のニーズに合わせてご紹介します。",
      image: "HR Admin/business-gets-done-in-the-boardroom-2025-04-06-07-25-21-utc.avif",
    },
  ],
} as const;

export const blogPreview = {
  kicker: "各種ブログ",
  title: "外国人人材なら当社へお任せ",
  highlight: "高度人材・特定技能人材ジャーナル",
  lead: "人材派遣に関連する最新情報やトレンドを発信する「派遣ジャーナル」。人材派遣に関心のある方々に有益な情報を公開しています。",
  fallbackImage: "home/blogPosts.avif",
  cta: { label: "記事一覧を見る", href: "/blog" },
} as const;

export const companyIntro = {
  badge: { label: "当社について", href: "/company" },
  title: "会社情報",
  body: "ジャパンバングラブリッジ株式会社は、製造事業に特化した人材総合サービス会社です。日本は「モノづくり」の国として、日本の経済を支えてきた製造業、そんな「モノづくり」の現場と、すべてのはたらく人たちを繋ぐことが私たちの使命です。",
  compliance: {
    image: "home/homeImg.avif",
    title: "コンプライアンスへの取り組み",
    body: "ジャパンバングラブリッジでは、労働関連法規ならびに当社事業に関わるすべての法令を遵守し、正常な商慣習と社会倫理に適合した企業活動に努めています。",
    cta: { label: "詳細はこちら", href: "/company" },
  },
} as const;

export const newsSection = {
  title: "最新のお知らせ",
  lead: "JBBCからの最新情報をお届けします",
  cta: { label: "すべてのお知らせを見る", href: "/notices" },
} as const;
