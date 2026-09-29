/**
 * 導入実績 (case studies). Copied from the original site's cases pages,
 * which showed these sample cards and one sample case detail.
 * Replace the entries here when real case studies are written.
 */

export type CaseCard = {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  industry: string;
};

export const casesPage = {
  pill: "solution",
  title: "導入実績一覧",
  bgWord: "solution",
  intro: [
    "各種サービスの導入実績では、お客様の課題をヒアリング、最適なご提案をおこなっております。",
    "提案の”結果・効果”についても詳しく記載していますので、ぜひご覧ください。",
  ],
} as const;

export const caseCards: CaseCard[] = [
  {
    id: "1",
    tag: "特定技能",
    title: "即戦力を2週間で確保！",
    excerpt: "定着率90％を実現した外国人採用支援",
    image: "home/Japan1.avif",
    industry: "プラスチック製造業",
  },
  {
    id: "2",
    tag: "国際的な仕事",
    title: "独自ルートで外国籍人材を採用。",
    excerpt: "新たな採用チャネルとしてのインターン制度導入",
    image: "home/Mt-Fuji-and-Cherry-Blossom-at-lake-Kawaguchiko.avif",
    industry: "プラスチック製造業",
  },
  {
    id: "3",
    tag: "日本留学",
    title: "人が定着しない現場を変えた。 2割を占める“家族のX”を理解して採用を成功に！",
    excerpt: "チーム派遣と常駐管理で実現した出勤率100%",
    image: "home/Japan-travel-tips-photographer-flytographer-21-2846066585.avif",
    industry: "プラスチック製造業",
  },
  {
    id: "4",
    tag: "特定技能",
    title: "即戦力を2週間で確保！",
    excerpt: "定着率90％を実現した外国人採用支援",
    image: "home/IMG_4102-1024x683.avif",
    industry: "プラスチック製造業",
  },
  {
    id: "5",
    tag: "国際的な仕事",
    title: "独自ルートで外国籍人材を採用。",
    excerpt: "新たな採用チャネルとしてのインターン制度導入",
    image: "home/20-The-Ultimate-Travel-Itinerary-Japan-body.avif",
    industry: "プラスチック製造業",
  },
  {
    id: "6",
    tag: "日本留学",
    title: "人が定着しない現場を変えた。 2割を占める“家族のX”を理解して採用を成功に！",
    excerpt: "チーム派遣と常駐管理で実現した出勤率100%",
    image: "home/shutterstock_1830039815.avif",
    industry: "プラスチック製造業",
  },
  {
    id: "7",
    tag: "特定技能",
    title: "即戦力を2週間で確保！",
    excerpt: "定着率90％を実現した外国人採用支援",
    image: "home/japan-tourism.avif",
    industry: "プラスチック製造業",
  },
  {
    id: "8",
    tag: "ライフスタイル",
    title: "独自ルートで外国籍人材を採用。",
    excerpt: "新たな採用チャネルとしてのインターン制度導入",
    image: "home/blogPosts.avif",
    industry: "プラスチック製造業",
  },
  {
    id: "9",
    tag: "日本留学",
    title: "人が定着しない現場を変えた。 2割を占める“家族のX”を理解して採用を成功に！",
    excerpt: "チーム派遣と常駐管理で実現した出勤率100%",
    image: "home/20-The-Ultimate-Travel-Itinerary-Japan-body.avif",
    industry: "プラスチック製造業",
  },
];

/** The one sample case detail the original site showed for every card. */
export const caseDetail = {
  title: ["人が定着しない現場を変えた。", "チーム派遣と常駐管理で実現した出勤率100%"],
  image: "home/Japan1.avif",
  profile: [
    ["業界・業種", "食品運搬業"],
    ["部門・職種", "倉庫内作業"],
    ["従業員数", "100人"],
    ["就業時間", "14:00〜21:30 22:00〜05:00"],
    ["納期", "2週間"],
  ] as [string, string][],
  sections: [
    {
      heading: "お客様の課題",
      sub: "人が定着しない現場、止まらない残業",
      body: "スポット派遣の求人媒体を活用しても応募が集まらず、各営業所における人員の確保は困難な状況が続いていた。寒冷な作業環境と重労働という職場特性から短期離職が多く、スタッフの習熟が進まないまま入れ替わりが発生し、現場の負担が増大していた。既存社員の残業は1日あたり2〜3時間にも及び、長時間労働が常態化。人員不足への焦りや緊張感が現場全体に広がっていた。学生アルバイトや女性パートを中心とした日勤帯の募集でも定着率は低く、深夜帯ではスポット派遣が主流で、「1回で終わる」勤務が大半を占めていた。さらに、既存の派遣会社においても「人材を入れて終わり」「問題が起きててもフォローがない」など、対応面に大きな課題があり、安定した戦力にはなり得なかった。",
    },
    {
      heading: "弊社からのご提案",
      sub: "現場に寄り添うチーム派遣と徹底管理で差別化を実現",
      body: "人材の定着と職場の文化や人間関係などの環境への適応を重視し、ネパール人留学生7名をチーム派遣としてご提案。さらに、英語話者である営業担当を現場の常駐管理者とし、工場内の業務管理・指導・勤怠管理・通訳・送迎までをすべて一括で対応。受け入れ体制全体をトータルで支援する体制を構築した。弊社では、ヒアリングシートを必ず記入し、契約関連も明確かつ丁寧に対応。就業時間、配属部署、製造内容、勤務内容をすべて事前に把握し、商談の段階から人材確保に着手。その結果、2週間での迅速な提案を実現した。こうした総合的な対応力とスピード感が、高い評価とスムーズな導入につながった。",
    },
    {
      heading: "結果・効果",
      sub: "出勤率100%・3部署に拡大、信頼を生んだチーム派遣",
      body: "初回発注では日々4名体制からスタートでしたが、1ヶ月後にはご評価をいただき、12名体制へと拡大。運用部署も1部署から3部署に増加し、現場全体での活用が進んだ。外国人派遣が初めてだったお客様にとっても、チーム派遣というサービスは直接スタッフに指導が出来るため、お客様に安心感を持っていただけた。また、ネパール人留学生のチーム派遣による責任感のある行動や高いリーダーシップ、熱意をご評価いただき、信頼してお任せいただく結果となった。営業担当は日勤帯の2部署を常駐管理者として運用し、作業指示や勤怠管理など、勤務外のフォローも徹底。これにより出勤率100%を実現し、社員の残業も解消。業務負担が大きく軽減された。さらに、全ての運用を弊社が一括で対応する体制が「安心して任せられる」と高く評価され、他社派遣に見られた「スタッフ任せ・態度の悪さ・挨拶なし」といった課題との明確な差別化につながった。",
    },
  ],
  relatedHeading: "この事例を見た方はこんな事例も見ています",
  related: [
    {
      id: "1",
      tag: "特定技能",
      title: "日本人 x 外国籍チーム派遣のハイブリット",
      excerpt: "派遣により24時間シフトが可能に",
      image: "home/Japan1.avif",
      industry: "プラスチック製造業",
    },
    {
      id: "2",
      tag: "国際的な仕事",
      title: "出勤率99%以上を実現！夜勤帯の人材不足を",
      excerpt: "解消",
      image: "home/Mt-Fuji-and-Cherry-Blossom-at-lake-Kawaguchiko.avif",
      industry: "プラスチック製造業",
    },
    {
      id: "3",
      tag: "日本留学",
      title: "毎年同時期のリピーター人材確保、当社社員が",
      excerpt: "常駐し「穴」を空けないバッファシフト管理を実行",
      image: "home/Japan-travel-tips-photographer-flytographer-21-2846066585.avif",
      industry: "プラスチック製造業",
    },
  ] satisfies CaseCard[],
  cta: { label: "選ばれる理由を詳しく見る", href: "/why" },
} as const;
