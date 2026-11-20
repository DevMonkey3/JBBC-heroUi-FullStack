/**
 * Services page. Three services have a detail section: SSW, HSP and ESD
 * (Employment for Skill Development, 育成就労; official English terms from
 * the government's ESD memoranda of cooperation)
 * (which replaced the old 技能実習/TITP section; that system ends on
 * 2027-04-01). The other three services have no copy yet and render as
 * cards only.
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
  /** Related pages shown under the body. */
  links?: { label: string; href: string }[];
  /** Where the facts in `blocks` come from; shown as a small footnote. */
  source?: { label: string; href: string; checked: string };
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
  {
    title: "ESD（育成就労）人材受入支援",
    image:
      "Garments/happy-female-dressmaker-working-with-sewing-machin-2025-03-13-19-29-43-utc.avif",
    detail: "ikusei",
  },
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
      "日本では少子高齢化による深刻な労働力不足が続いています。これを解決するために、2019年に導入されたのが「特定技能（SSW：Specified Skilled Worker）」の在留資格です。対象分野は段階的に拡大し、2026年1月の閣議決定で特定技能1号は19分野になりました。2027年4月からは、新しい「育成就労制度」で3年間育成された人材の主な移行先にもなります。",
    blocks: [
      { type: "h", text: "特定技能（SSW）とは？" },
      {
        type: "p",
        text: "特定技能（SSW）とは、一定の専門的なスキルと日本語能力を持つ外国人が、日本の労働力不足の産業で働くための在留資格です。",
      },
      { type: "h", text: "特定技能1号" },
      {
        type: "ul",
        items: [
          "19分野が対象（2026年1月閣議決定。新たに加わった資源循環・リネンサプライ・物流倉庫は受入れ開始に向けて準備中）",
          "在留期間は通算で上限5年",
          "家族の帯同は原則不可",
          "技能試験と日本語試験（JLPT N4 または JFT-Basic）の合格が必要。技能実習2号を良好に修了した場合は試験免除",
          "2027年4月以降は、育成就労（原則3年）を修了し技能・日本語（A2相当）の要件を満たした方も移行できます",
        ],
      },
      { type: "h", text: "特定技能2号" },
      {
        type: "ul",
        items: [
          "11分野が対象。より熟練した技能（現場のリーダー級）が必要",
          "在留期間の更新に上限なし。要件を満たせば永住申請も視野に",
          "配偶者・子の帯同が可能",
        ],
      },
      { type: "h", text: "特定技能1号の19分野" },
      {
        type: "p",
        text: "介護／ビルクリーニング／工業製品製造業／建設／造船・舶用工業／自動車整備／航空／宿泊／自動車運送業／鉄道／農業／漁業／飲食料品製造業／外食業／林業／木材産業／資源循環／リネンサプライ／物流倉庫。※外食業は2026年現在、新規受入れを停止しています。",
      },
    ],
    links: [
      { label: "バングラデシュ人材の採用について詳しく", href: "/bangladesh-jinzai" },
      { label: "特定技能に関するよくある質問", href: "/faq#service" },
    ],
    source: {
      label: "出入国在留管理庁「特定技能総合支援サイト」",
      href: "https://www.ssw.go.jp/about/visa/",
      checked: "2026年11月",
    },
    sectorsTitle: "Job Sectors under the SSW program",
    sectorsSubtitle: "特定技能における職種",
    sectors: [
      {
        title: "飲食料品製造業",
        en: "Food & Beverage Manufacturing",
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
    id: "ikusei",
    title: "ESD（育成就労）人材受入支援",
    heading: "Employment for Skill Development（ESD）｜2027年4月開始の新制度",
    image:
      "Garments/happy-female-dressmaker-working-with-sewing-machin-2025-03-13-19-29-43-utc.avif",
    description:
      "ESD（Employment for Skill Development：育成就労）は、技能実習（TITP）に代わって2027年4月1日に始まる日本の新しい受入れ制度です。目的は「人手不足分野における人材の育成と確保」。原則3年間の就労を通じて、特定技能1号（SSW）の水準まで人材を育てます。JBBCはグループの送出し機関と連携し、バングラデシュ人材のESDでの受入れを支援します。",
    blocks: [
      { type: "h", text: "ESD（育成就労）とは？" },
      {
        type: "p",
        text: "ESDは Employment for Skill Development の略で、日本語では「育成就労」と呼ばれます。日本政府は制度の目的を「育成就労産業分野における人材の育成と確保」としており、国際貢献を目的としていた技能実習（TITP）とは位置づけが異なります。ESDで来日した人材は、働きながら技能と日本語を身につけ、3年後には特定技能1号（SSW）へ移行して日本で働き続けることができます。",
      },
      { type: "h", text: "ESDの用語" },
      {
        type: "ul",
        items: [
          "Skill Development Employee（育成就労外国人）：ESDで働く外国人材",
          "ESD plan（育成就労計画）：人材ごとに作成し、認定を受ける3年間の育成計画",
          "Supervising and Support Organization（監理支援機関）：受入れ企業を監理・支援する許可制の非営利法人",
          "ESD Industrial Field（育成就労産業分野）：ESDで受入れが認められる産業分野",
          "Approved Sending Organization（認定送出機関）：送出国の政府が認定した送出機関",
        ],
      },
      { type: "h", text: "ESDの概要" },
      {
        type: "ul",
        items: [
          "開始日：2027年4月1日。同日をもって技能実習（TITP）は廃止され、新規の受入れはESDへ切り替わります",
          "期間：原則3年。修了後は特定技能1号（SSW）へ移行し、そのまま長く働き続けられます",
          "対象分野：17のESD産業分野（特定技能の19分野から自動車運送業・航空を除いた分野。2026年1月閣議決定）",
          "受入れ：認定を受けたESD plan（育成就労計画）に基づき、監理支援機関の支援のもとで受入れ",
          "送出し：政府認定の送出機関を通じて受入れ。送出機関への手数料の一部を受入れ企業が負担する仕組みになります",
        ],
      },
      { type: "h", text: "TITP（技能実習）との違い" },
      {
        type: "ul",
        items: [
          "目的：技能移転による国際貢献から、人手不足分野の人材育成・人材確保へ",
          "転籍：同じ業務区分で1〜2年就労し、技能と日本語の要件を満たせば、本人の希望による転籍が可能",
          "日本語：就労開始前にA1相当（JLPT N5程度）以上または相当する講習の受講、特定技能1号への移行時にA2相当（N4程度）以上",
          "監理：監理団体から監理支援機関へ。許可要件が厳しくなり、独立性・中立性が求められます",
        ],
      },
      { type: "h", text: "TITPからESDへの移行" },
      {
        type: "ul",
        items: [
          "2027年3月31日までに技能実習計画の認定を申請し、原則として同年6月30日までに実習を開始する場合は、技能実習（TITP）として受入れ可能",
          "開始日時点で在留中の技能実習生は、認定済みの計画に基づき実習を継続できます（自動的にESDへ切り替わるわけではありません）",
          "技能実習2号を良好に修了した方は、これまでどおり特定技能1号（SSW）へ移行できます",
        ],
      },
      { type: "h", text: "JBBCのESDサポート" },
      {
        type: "p",
        text: "現地での日本語教育（A1→A2）と職種別の事前教育、ESD plan（育成就労計画）づくりのご相談、入国後の生活・定着支援、特定技能1号（SSW）への移行までを一貫して支援します。細目は省令・告示で順次定められるため、最新の公表内容に沿ってご案内します。",
      },
    ],
    links: [
      { label: "育成就労制度とは？技能実習との違い", href: "/ikusei-shuro" },
      { label: "バングラデシュ人材の採用について詳しく", href: "/bangladesh-jinzai" },
    ],
    source: {
      label: "厚生労働省・出入国在留管理庁「育成就労制度」",
      href: "https://www.mhlw.go.jp/stf/newpage_000117702_00015.html",
      checked: "2026年11月",
    },
    sectorsTitle: "Job Sectors under the ESD program",
    sectorsSubtitle: "代表的な分野（ESD）",
    sectors: [
      {
        title: "建設",
        en: "Construction",
        image:
          "Construction Worker/a-team-of-indian-construction-workers-in-overalls-2025-03-16-22-25-15-utc.avif",
      },
      {
        title: "農業",
        en: "Agriculture",
        image:
          "Agriculture/farmer-women-working-while-picking-up-lettuce-plan-2025-02-22-01-15-03-utc.avif",
      },
      {
        title: "漁業",
        en: "Fishery",
        image:
          "Ship Breaking/marine-deck-officer-or-chief-mate-on-deck-of-offsh-2025-02-12-09-29-05-utc.avif",
      },
      {
        title: "飲食料品製造業",
        en: "Food & Beverage Manufacturing",
        image: "Food Factory/food-production-control-2025-03-15-04-17-20-utc.avif",
      },
      {
        title: "繊維・縫製",
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
