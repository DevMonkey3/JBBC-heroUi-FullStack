/**
 * Services page. Copy for the three detailed services (SSW, HSP, TITP) is
 * taken verbatim from the old site. The other three services have no copy
 * yet and render as cards only.
 */

export type Block =
  { type: "h"; text: string } | { type: "p"; text: string } | { type: "ul"; items: string[] };

export type Sector = { title: string; en: string; image: string };

export type ServiceDetail = {
  id: string;
  title: string;
  heading: string;
  image: string;
  description: string;
  blocks: Block[];
  sectorsTitle: string;
  sectorsSubtitle: string;
  sectors: Sector[];
};

export const servicesPage = {
  pill: "service",
  title: "サービス紹介",
  heading: "あらゆるニーズに応えるサービス群",
  lead: "お客様ごとにオーダーメイドのご提案を。積み重ねてきた多彩な「現場ノウハウ」が、人材不足の課題を解決いたします。",
  cta: {
    title: "サービスについてのご相談はこちら",
    lead: "貴社の課題に合わせた最適なプランをご提案します。まずはお気軽にお問い合わせください。",
    primary: { label: "お問い合わせ", href: "/contact" },
    secondary: { label: "資料ダウンロード", href: "/download" },
  },
} as const;

/** The six service cards, in the old site's order. `detail` links to a section below. */
export const serviceCards = [
  { title: "特定技能人材紹介", image: "services/1. SSW.avif", detail: "ssw" },
  { title: "高度人材紹介", image: "services/2.international hiring.avif", detail: "hsp" },
  { title: "技能実習生受入支援", image: "services/3.TITP.avif", detail: "titp" },
  { title: "留学生受入支援", image: "services/4.overseas study.avif", detail: null },
  { title: "IT開発実績", image: "services/5.IT engineer.avif", detail: null },
  { title: "海外進出支援", image: "services/6.overseas consulting.avif", detail: null },
] as const;

export const serviceDetails: ServiceDetail[] = [
  {
    id: "ssw",
    title: "特定技能人材紹介",
    heading: "外国人材のための新しいチャンス、日本で働こう！",
    image: "services/1. SSW.avif",
    description:
      "日本では少子高齢化による深刻な労働力不足が続いています。これを解決するために、2019年に導入されたのが「特定技能（SSW：Specified Skilled Worker）」の在留資格です。特定技能制度により、外国人が正式な労働者として日本の12の産業で働くことが可能になりました。",
    blocks: [
      { type: "h", text: "特定技能（SSW）とは？" },
      {
        type: "p",
        text: "特定技能（SSW）とは、一定の専門的なスキルと日本語能力を持つ外国人が、日本の労働力不足の産業で働くための在留資格です。",
      },
      { type: "h", text: "特定技能1号" },
      {
        type: "ul",
        items: ["12の指定産業での就労が可能", "在留期間は最長5年間（更新可）", "家族の帯同は不可"],
      },
      { type: "h", text: "特定技能2号" },
      {
        type: "ul",
        items: [
          "より高度なスキルが必要",
          "在留期間に制限なし（永続的な就労が可能）",
          "家族の帯同が可能",
        ],
      },
    ],
    sectorsTitle: "Job Sectors under the SSW program",
    sectorsSubtitle: "特定技能における職種",
    sectors: [
      {
        title: "外食業",
        en: "Food Service",
        image:
          "Food Factory/female-baker-in-a-professional-kitchen-pours-dough-2024-12-04-17-14-52-utc.avif",
      },
      {
        title: "宿泊業",
        en: "Accommodation",
        image:
          "Aviation/airport-male-worker-taking-care-of-customer-luggag-2024-10-18-08-42-55-utc.avif",
      },
      {
        title: "介護",
        en: "Nursing Care",
        image:
          "Caregiver/asian-nurse-explaining-diagnosis-to-elderly-patien-2025-02-17-16-18-24-utc.avif",
      },
      {
        title: "ビルクリーニング業",
        en: "Building Cleaning",
        image:
          "Food Factory/senior-female-worker-cleaning-and-check-for-dirt-g-2024-12-05-12-02-04-utc.avif",
      },
    ],
  },
  {
    id: "hsp",
    title: "高度人材紹介",
    heading: "高度専門職（Highly Skilled Professional）とは",
    image: "services/2.international hiring.avif",
    description:
      "日本の高度専門職（Highly Skilled Professional, HSP）は、優れた専門的知識や技術を持つ外国人材を受け入れるための特別な在留資格です。高度な人材を受け入れることで、日本の経済成長、研究開発、国際競争力の強化を目的としています。",
    blocks: [
      {
        type: "p",
        text: "高度専門職制度はポイント制を採用しており、学歴・職歴・年収・年齢・日本語能力などに応じてポイントが加算され、合計70点以上で申請が可能です。",
      },
      { type: "h", text: "主な対象分野" },
      {
        type: "ul",
        items: [
          "学術研究活動：大学教授、研究者など",
          "高度専門・技術活動：エンジニア、ITスペシャリスト、建築士、弁護士、会計士など",
          "経営・管理活動：企業の管理職、経営者、スタートアップの代表者など",
        ],
      },
      { type: "h", text: "高度専門職の優遇措置" },
      {
        type: "ul",
        items: [
          "最長5年間の在留期間",
          "永住権の取得が通常より早い",
          "配偶者や子供の帯同が可能",
          "家事使用人の帯同が可能（一定条件あり）",
          "複数の活動を柔軟に行える",
        ],
      },
      {
        type: "p",
        text: "高度な資格や専門性を持つバングラデシュの人材にとって、日本でキャリアを築く大きなチャンスとなっています。",
      },
    ],
    sectorsTitle: "Job Sectors under the Highly Skilled Professional",
    sectorsSubtitle: "代表的な高度人材職種（バングラデシュ人向け）",
    sectors: [
      {
        title: "ITエンジニア",
        en: "IT Engineer",
        image:
          "Software Engineer/asian-software-developer-smiling-and-resuming-work-2025-02-20-00-59-07-utc.avif",
      },
      {
        title: "機械エンジニア",
        en: "Mechanical Engineer",
        image:
          "Welding/robotic-arm-engineer-check-on-equipment-in-its-wit-2025-02-03-09-45-18-utc.avif",
      },
      {
        title: "電気・電子エンジニア",
        en: "Electrical / Electronic Engineer",
        image:
          "Automation/auto-mechanics-diagnosing-car-with-computer-2025-03-15-17-04-00-utc.avif",
      },
      {
        title: "CADオペレーター・設計士",
        en: "CAD Operator / Designer",
        image:
          "CAD CAM/architect-drawing-with-cad-software-designing-buil-2025-03-10-15-20-28-utc.avif",
      },
      {
        title: "研究開発職",
        en: "R&D",
        image:
          "Software Engineer/diverse-team-of-ai-developers-shares-a-successful-2025-09-06-20-16-05-utc.avif",
      },
      {
        title: "通訳・翻訳",
        en: "Interpreter / Translator",
        image:
          "HR Admin/asian-businesswoman-leading-meeting-explaining-ch-2025-02-12-01-27-11-utc.avif",
      },
      {
        title: "貿易事務・海外営業",
        en: "Trade / Overseas Sales",
        image: "HR Admin/business-people-2024-10-22-15-30-01-utc.avif",
      },
      {
        title: "経営・管理職",
        en: "Management",
        image:
          "HR Admin/confident-businesswoman-holding-clipboard-leading-2025-09-09-19-20-33-utc.avif",
      },
    ],
  },
  {
    id: "titp",
    title: "技能実習生受入支援",
    heading: "技能実習制度（TITP）バングラデシュ人材および送出し機関向け",
    image: "services/3.TITP.avif",
    description:
      "技能実習制度（TITP）は、日本政府が管理するプログラムで、開発途上国に対して実践的な産業技術・技能・知識を移転することを目的としています。これにより、実習生の母国（バングラデシュ）の人材育成と経済発展に貢献します。",
    blocks: [
      { type: "h", text: "プログラム概要" },
      {
        type: "ul",
        items: [
          "種別：実践的な職業訓練（通常の就労ビザではありません）",
          "期間：1～5年間（技能試験や企業の要件により異なる）",
          "受入れ先：OTIT（外国人技能実習機構）に認定された日本企業",
          "送出し：バングラデシュ政府に認可された送出し機関を通じてのみ可能",
        ],
      },
      { type: "h", text: "実習生の条件" },
      {
        type: "ul",
        items: [
          "年齢：一般的に18歳～35歳程度",
          "最低学歴：高校卒業程度が一般的",
          "健康状態：心身ともに健康",
          "日本語能力：初級レベル（N5～N4推奨）",
          "修了後は必ず帰国し、習得技能を活かす意欲があること",
        ],
      },
      { type: "h", text: "送出し機関の条件" },
      {
        type: "ul",
        items: [
          "OTIT/JITCOの規定に基づき認可・登録されていること",
          "出国前研修の実施：日本語教育、日本の労働文化・マナー、基本的な技能教育",
          "派遣後のフォローアップ・報告義務を遵守",
        ],
      },
    ],
    sectorsTitle: "Job Sectors under the TITP",
    sectorsSubtitle: "代表的な職種（技能実習）",
    sectors: [
      {
        title: "建設分野",
        en: "Construction",
        image:
          "Construction Worker/a-team-of-indian-construction-workers-in-overalls-2025-03-16-22-25-15-utc.avif",
      },
      {
        title: "農業分野",
        en: "Agriculture",
        image:
          "Agriculture/farmer-women-working-while-picking-up-lettuce-plan-2025-02-22-01-15-03-utc.avif",
      },
      {
        title: "水産業",
        en: "Fishery",
        image:
          "Ship Breaking/marine-deck-officer-or-chief-mate-on-deck-of-offsh-2025-02-12-09-29-05-utc.avif",
      },
      {
        title: "食品製造・加工",
        en: "Food Processing",
        image: "Food Factory/food-production-control-2025-03-15-04-17-20-utc.avif",
      },
      {
        title: "繊維・衣料",
        en: "Textile / Garment",
        image:
          "Garments/dressmaker-woman-sews-clothes-on-sewing-machine-in-2025-03-18-20-17-44-utc.avif",
      },
      {
        title: "機械・金属加工",
        en: "Machinery / Metalwork",
        image:
          "Welding/industrial-worker-using-angle-grinder-and-cutting-2025-03-09-14-10-19-utc.avif",
      },
    ],
  },
];

export const industries = {
  kicker: "Category",
  title: "特定分野から導入事例を見る",
  items: [
    {
      title: "建設",
      image:
        "Construction Worker/construction-workers-measuring-building-2025-04-05-05-23-22-utc.avif",
    },
    {
      title: "介護",
      image:
        "Caregiver/happy-senior-woman-at-wheelchair-spending-time-out-2024-10-18-09-49-41-utc.avif",
    },
    {
      title: "食品加工",
      image:
        "Food Factory/female-worker-checking-quality-of-fruit-juice-drin-2024-12-02-16-13-39-utc.avif",
    },
    {
      title: "自動車整備",
      image:
        "Automation/car-mechanic-working-in-an-auto-repair-shop-inspe-2025-01-07-04-15-21-utc.avif",
    },
    {
      title: "造船",
      image: "Ship Breaking/shipbuilders-at-work-in-bangladesh-2025-01-10-03-53-52-utc.avif",
    },
    {
      title: "溶接・金属加工",
      image:
        "Welding/shallow-focus-of-an-adult-male-welding-rusty-steel-2025-02-02-15-04-42-utc.avif",
    },
    {
      title: "IT",
      image:
        "Software Engineer/image-of-smiling-unshaven-programmer-man-working-w-2025-02-14-15-35-32-utc.avif",
    },
    {
      title: "CAD/CAM",
      image: "CAD CAM/digital-designer-creating-3d-model-of-house-2025-03-07-05-14-21-utc.avif",
    },
    {
      title: "物流",
      image:
        "Delivery/express-delivery-service-courier-delivering-packa-2024-11-01-23-11-21-utc.avif",
    },
  ],
} as const;
