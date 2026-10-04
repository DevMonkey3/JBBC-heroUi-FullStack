/**
 * /bangladesh-jinzai: the pillar page for the search phrase バングラデシュ人材.
 * Facts about the visa routes follow the official sources listed at the
 * bottom (checked 2026-10). Company figures reuse the home-page stats.
 */

export const bangladeshPage = {
  pill: "Bangladesh",
  title: "バングラデシュ人材の採用ならJBBC",
  bgWord: "Bangladesh",
  lead: "ジャパンバングラブリッジ株式会社（JBBC）は、東京・新宿本社とバングラデシュ・ダッカの現地法人を自社で運営する人材会社です。特定技能・技能実習（育成就労）・技人国／高度人材の3つのルートで、募集・選考から入国手続き、日本語教育、就業後の定着支援までを一貫してご提供します。",
  updated: "2026年10月",

  reasons: {
    title: "バングラデシュ人材が選ばれる理由",
    items: [
      {
        title: "若く、豊富な労働力",
        text: "人口約1.7億人、平均年齢は20代後半。毎年多くの若者が海外就労を志望し、日本は人気の高い行き先の一つです。安定した母数から継続的な採用が可能です。",
      },
      {
        title: "日本語学習への意欲と基礎学力",
        text: "政府系の技術訓練校（TTC）や民間の日本語学校で、渡航前からN5〜N4レベルの学習が進んでいます。JBBCは自社教材（グロービッシュメソッド）で学習時間を短縮しています。",
      },
      {
        title: "勤勉で定着しやすい",
        text: "家族を支えるために長期で働く意思が強く、就業後の定着率が高いのが特徴です。弊社の受入れ事例でも、3年間の技能実習を全員が修了しています。",
      },
      {
        title: "政府が送り出しを後押し",
        text: "バングラデシュ政府（BMET）は日本への送り出しを重点施策とし、技能試験や日本語試験の現地実施、移民ローンなどの支援制度を整えています。",
      },
      {
        title: "宗教・文化面の配慮は難しくない",
        text: "多くはイスラム教徒ですが、礼拝時間やハラール食への配慮は日常の工夫で対応できます。JBBCが受入れ前に現場向けの説明と準備をサポートします。",
      },
      {
        title: "幅広い職種に対応",
        text: "介護、建設、製造、食品、自動車整備、造船、溶接、IT・CADまで。現地の教育機関・訓練校との連携で、職種に合った候補者をご提案します。",
      },
    ],
  },

  routes: {
    title: "採用できる3つのルート",
    lead: "必要な期間、職種、将来のキャリアに応じて最適な在留資格をご提案します。",
    items: [
      {
        title: "特定技能（SSW）",
        who: "即戦力として長く働ける人材を採用したい企業様",
        points: [
          "1号は19分野、在留は通算5年まで。2号へ移行すれば更新上限なし",
          "技能試験・日本語試験の合格者、または技能実習2号修了者",
          "登録支援機関としてJBBCが生活・就労支援を代行可能",
        ],
        href: "/services#ssw",
        cta: "特定技能人材紹介を見る",
      },
      {
        title: "技能実習 → 育成就労（2027年4月〜）",
        who: "未経験層を3年かけて育てたい企業様",
        points: [
          "現行の技能実習は2027年4月に育成就労制度へ移行予定",
          "3年間で特定技能1号の水準まで育成し、そのまま特定技能へ",
          "バングラデシュ政府認可の送出し機関（グループ会社JBBRA）と連携",
        ],
        href: "/ikusei-shuro",
        cta: "育成就労制度の解説を見る",
      },
      {
        title: "技術・人文知識・国際業務／高度人材",
        who: "エンジニア、通訳、海外営業など専門職を採用したい企業様",
        points: [
          "大学卒業以上の学歴や実務経験を持つ人材",
          "IT、機械・電気エンジニア、CAD、貿易事務、通訳・翻訳など",
          "高度専門職ポイント制で永住までの期間短縮も",
        ],
        href: "/services#hsp",
        cta: "高度人材紹介を見る",
      },
    ],
  },

  industries: {
    title: "対応分野",
    lead: "特定技能・技能実習・高度人材を組み合わせ、以下の分野で受入れ実績があります。",
    items: [
      {
        title: "介護",
        image:
          "Caregiver/asian-nurse-explaining-diagnosis-to-elderly-patien-2025-02-17-16-18-24-utc.avif",
      },
      {
        title: "建設",
        image:
          "Construction Worker/a-team-of-indian-construction-workers-in-overalls-2025-03-16-22-25-15-utc.avif",
      },
      {
        title: "食品製造",
        image: "Food Factory/women-working-in-apple-factory-2024-09-18-09-15-59-utc.avif",
      },
      {
        title: "縫製・繊維",
        image:
          "Garments/happy-female-dressmaker-working-with-sewing-machin-2025-03-13-19-29-43-utc.avif",
      },
      {
        title: "自動車整備",
        image:
          "Automation/woman-client-with-auto-mechanic-at-the-car-service-2025-03-17-05-19-25-utc.avif",
      },
      { title: "溶接・金属加工", image: "Welding/welder-2024-10-20-15-09-15-utc.avif" },
      {
        title: "物流・ドライバー",
        image:
          "Driver/man-portrait-and-outdoor-at-warehouse-with-confid-2025-04-05-23-39-51-utc.avif",
      },
      {
        title: "IT・CAD",
        image:
          "CAD CAM/creating-architectural-designs-on-computer-screens-2025-03-08-20-48-33-utc.avif",
      },
    ],
  },

  process: {
    title: "採用までの流れ",
    lead: "ヒアリングから入国まで、最短で3〜4か月。特定技能の国内在留者であれば1か月程度でのご紹介も可能です。",
    steps: [
      {
        title: "ヒアリング",
        text: "職種、人数、求める日本語レベル、就業条件、受入れ体制をお伺いし、最適な在留資格と採用プランをご提案します。",
      },
      {
        title: "候補者の選考",
        text: "ダッカ現地法人と提携訓練校のネットワークから、スキルと人柄の両面で候補者を選抜。書類と動画で事前にご確認いただけます。",
      },
      {
        title: "オンライン面接",
        text: "通訳付きのオンライン面接を実施。現地視察ツアーで直接お会いいただくことも可能です。",
      },
      {
        title: "在留資格の申請",
        text: "雇用契約の締結後、在留資格認定証明書（COE）の申請、バングラデシュ側の出国手続き（BMET登録など）をJBBCが進めます。",
      },
      {
        title: "出国前教育",
        text: "日本語、日本の生活・労働ルール、職種別の基礎教育を現地で実施。配属先の業務に合わせたオリエンテーションも行います。",
      },
      {
        title: "入国・就業開始",
        text: "空港出迎え、住居手配、役所手続き、銀行口座開設などの生活立ち上げを支援。就業開始後も定期面談で定着をサポートします。",
      },
    ],
  },

  cost: {
    title: "費用の考え方",
    text: "費用は在留資格、職種、人数、支援委託の範囲によって変わります。大きくは「紹介手数料」「登録支援機関への支援委託料（特定技能）」または「監理費（技能実習）」「渡航費・住居初期費用」で構成されます。ヒアリングの上、内訳を明示したお見積りをお出しします。相場感はよくある質問でもご案内しています。",
    links: [
      { label: "費用に関するよくある質問", href: "/faq#service" },
      { label: "資料をダウンロード", href: "/download" },
    ],
  },

  support: {
    title: "入国後の定着支援",
    items: [
      "生活オリエンテーションと住居・役所・銀行の手続き同行",
      "母語（ベンガル語）対応の相談窓口と定期面談",
      "日本語学習の継続支援（N4→N3）",
      "受入れ企業様への宗教・文化面のアドバイス",
      "在留期間更新、特定技能への移行手続きの支援",
      "KPI（定着率・出勤率など）の定期レポート",
    ],
  },

  faq: {
    title: "バングラデシュ人材についてよくある質問",
    /** Questions pulled from the FAQ page content by exact text. */
    questions: [
      "バングラデシュ人材の強みは何ですか？",
      "特定技能で採用できる分野は何ですか？",
      "日本語レベルはどの程度期待できますか？",
      "宗教（イスラム教）への配慮は必要ですか？",
      "バングラデシュ人材は長期就労に向いていますか？",
      "採用コストはどれくらいかかりますか？",
    ],
    more: { label: "よくある質問をすべて見る", href: "/faq" },
  },

  cta: {
    title: "バングラデシュ人材の採用についてご相談ください",
    lead: "職種や人数が未定の段階でも構いません。制度の選び方から、現地の最新状況までご説明します。",
    primary: { label: "お問い合わせ", href: "/contact" },
    secondary: { label: "セミナー・現地視察ツアー", href: "/seminar" },
  },

  sources: [
    { label: "出入国在留管理庁 特定技能総合支援サイト", href: "https://www.ssw.go.jp/" },
    {
      label: "厚生労働省 育成就労制度について",
      href: "https://www.mhlw.go.jp/stf/newpage_000117702_00015.html",
    },
    { label: "外国人技能実習機構（OTIT）", href: "https://www.otit.go.jp/" },
  ],
} as const;
