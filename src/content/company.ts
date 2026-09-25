/**
 * Company section: hub (/company), profile (/company/profile) and
 * president's message (/company/message). Data copied from the original
 * site's Info pages.
 */

export const companyHub = {
  pill: "Info",
  title: "会社情報",
  bgWord: "Info",
  cards: [
    { title: "代表ご挨拶", image: "home/Mask-group-4-1.avif", href: "/company/message" },
    { title: "会社概要", image: "home/homeImg.avif", href: "/company/profile" },
  ],
} as const;

export type ProfileRow = {
  label: string;
  /** Plain lines. Each entry is one line or one list item. */
  lines?: string[];
  /** Ordered list items */
  ordered?: string[];
  /** Unordered list items */
  bullets?: string[];
  /** Link to render after the lines */
  link?: { label: string; href: string };
  /** Address blocks with a bold heading */
  blocks?: { heading: string; lines: string[] }[];
};

export const companyProfile = {
  pill: "Info",
  title: "会社概要",
  bgWord: "Company",
  image: "home/23234.avif",
  rows: [
    { label: "会社名", lines: ["ジャパンバングラブリッジ株式会社"] },
    { label: "英文表記", lines: ["Japan Bangla Bridge Co.,Ltd."] },
    { label: "通称", lines: ["JBBC"] },
    { label: "設立", lines: ["2010年11月10日"] },
    {
      label: "住所",
      blocks: [
        {
          heading: "1 新宿本社",
          lines: [
            "〒160-0023 東京都新宿区西新宿7丁目22-39 興亜第二ビル 703",
            "TEL: 03-6279-1289 / FAX: 03-6279-1287",
          ],
        },
        {
          heading: "2 バングラデシュ現地法人",
          lines: [
            "Cemex Shimul Trishna Trade Center (Level-6), Ka-86/1, Kuril Bishwa Road, Progoti Soroni, Dhaka, Bangladesh",
          ],
        },
      ],
    },
    { label: "資本金", lines: ["39,000,000円 (2025年6月時点)"] },
    { label: "代表取締役", lines: ["タハミド モイズル"] },
    {
      label: "代表取締役副社長",
      link: { label: "三浦 淳", href: "https://shorturl.at/vTop3" },
    },
    {
      label: "事業内容",
      ordered: [
        "システム開発事業（オフショア開発および業務委託を含む）",
        "技能実習生受入サポート（弊社送出機関 駐在員事務所）",
        "職業紹介有料職業紹介事業（番号：13ーユー316416）",
        "登録支援事業",
        "日本語学校運営事業（バングラデシュ）",
        "留学生支援事業",
        "バングラデシュ進出支援事業",
        "求職者マッチング事業（bhalojob.com）",
      ],
    },
    {
      label: "許可",
      lines: ["有料職業紹介事業許可番号 : 13ーユー316416", "登録支援機関 許可番号 19登-000466"],
    },
    {
      label: "グループ会社",
      bullets: [
        "Japan Bangla Bridge Recruiting Agency Ltd. （バングラデシュ送り出し機関）",
        "Bhalo Ventures Ltd. （バングラデシュ法人）",
        "Bhalojob Japanese Language School （バングラデシュ法人）",
      ],
    },
    { label: "従業員数", lines: ["社員数 30名 ※現地法人メンバーを含む"] },
    { label: "Eメール", lines: ["info@jbbc.co.jp"] },
    {
      label: "顧問",
      lines: ["杉田昌平 弁護士 （弁護士法人Global HR Strategy）"],
      link: {
        label: "https://www.ghrs.law/professionals/sugita-shohei/",
        href: "https://www.ghrs.law/professionals/sugita-shohei/",
      },
    },
    {
      label: "加盟団体 (日本)",
      bullets: [
        "神奈川県中小企業団体中央会",
        "KIP | 公益財団法人 神奈川産業振興センター",
        "一般財団法人外国人材共生支援全国協会",
        "東京日本橋ロータリークラブ",
        "一般財団法人外国人材共生支援全国協会(NAGOMI)",
        "全国ビジネスサポート協同組合連合会（NBCC)",
        "一般社団法人 国際連携推進協会",
      ],
    },
    {
      label: "加盟団体 (バングラデシュ)",
      bullets: [
        "BAIRA - バングラデシュ外国送出機関共同組合",
        "BASIS - バングラデシュソフトウェア開発組合",
        "BARVIDA - バングラデシュ中古車輸入業者およびディーラー協会",
      ],
    },
  ] satisfies ProfileRow[],
} as const;

export const companyMessage = {
  pill: "Info",
  title: "代表ご挨拶",
  bgWord: "Message",
  image: "home/Mask-group-4-1.avif",
  heading: "架け橋を築き、未来を切り拓く",
  signature: [
    "タハミド モイズル",
    "東京商⼯会議所 会員 / リーダーシップクラブ会員",
    "バングラデシュ情報⼯科企業家協会員 ほか",
  ],
  intro:
    "私たちJBBCは、「人・スキル・チャンス」を“橋”で結ぶことを使命に、日本とバングラデシュの双方に価値をもたらす人材・技術・ビジネスの循環をつくってきました。現場即戦力の人材供給から、現場定着・教育・コンプライアンスまで一気通貫で支援します。",
  body: [
    "企業の“今”に本当に必要な支援を、成果から逆算してデザインする。これが私たちのやり方です。現場の声に寄り添い、スピードと品質を両立させた“使える支援”で、長く頼れるパートナーになります。",
    "これからもJBBCは、更なる進化を続けます。どうぞご期待ください。",
  ],
} as const;

/** Address used in the footer. Matches the profile table. */
export const company = {
  address: ["〒160-0023 東京都新宿区西新宿7丁目22-39", "興亜第二ビル 703"],
  email: "info@jbbc.co.jp",
} as const;
