/**
 * Company profile shown on /company. Plain data so it can be edited without
 * touching components and translated later if the site goes bilingual.
 */
export const company = {
  name: "Japan Bangla Bridge Corporation",
  nameJa: "ジャパン・バングラ・ブリッジ・コーポレーション",
  founded: "2018年12月1日",
  address: ["〒160-0023 東京都新宿区西新宿7丁目22-39", "西新宿第二ビル703"],
  capital: "2,500万タカ（3,500万円）",
  ceo: "タハミド モイヌル",
  chairman: "タハミド タパスシム",
  business: [
    "技能実習生並びに特定技能登録支援機関の送り出し機関",
    "採用支援・海外人材事業運営",
    "技能実習生受入事業",
    "技術者派遣事業（製造業・人・事務業）",
    "日本語教育事業",
  ],
  memberships: [
    "東京西南ロータリークラブ 会員",
    "東京中小企業家同友会 会員",
    "BAIRA バングラデシュ国際人材供給関連協同組合 会員",
    "BASIS バングラデシュソフトウェア開発協会 会員",
    "BAYDIA バングラデシュ自動車輸出入およびディーラー協会 会員",
  ],
  phones: [
    "+8801707020644（ダッカ事務所）",
    "03-6279-1289（日本本社電話番号）",
    "FAX: 03-6279-1287（日本）",
  ],
  related: [
    "システム開発事業",
    "ピクト株式会社（日本法人）",
    "pik.lp 求人情報サイト",
    "bhalojob.com 人材紹介事業",
  ],
  email: "info@jbbc.co.jp",
} as const;
