import Image from "next/image";
export const metadata = {
  title: "会社概要 | JBBC",
};

export default function CompanyOverview() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Title */}
      <div className="mb-8">
        <p className="text-xs text-sky-600 font-semibold mb-2">info / 会社概要</p>
        <h1 className="text-2xl md:text-3xl font-bold">会社概要</h1>
        <div className="relative mt-6">
          <span className="pointer-events-none select-none text-[64px] md:text-[104px] font-extrabold text-sky-100 leading-none">
            Company
          </span>
        </div>
      </div>

      {/* Image + table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <Image
  src="/home/23234.png"
  alt="本社ビル"
  width={800}
  height={600}
  className="w-full h-full object-cover"
/>
        </div>

        <dl className="divide-y divide-gray-200 border border-gray-200 rounded-xl">
          {[
            ["会社名", "ジャパンバングラブリッジ株式会社"],
            ["英文表記", "Japan Bangla Bridge Co.,Ltd."],
            ["通称", "JBBC"],
            ["設立", "2010年11月10日"],
            [
              "住所",
              <>
                <p className="mb-2">
                  <strong>1 新宿本社</strong><br />
                  〒160-0023 東京都新宿区西新宿7丁目22-39 興亜第二ビル 703<br />
                  TEL: 03-6279-1289 / FAX: 03-6279-1287
                </p>
                <p>
                  <strong>2 バングラデシュ現地法人</strong><br />
                  Cemex Shimul Trishna Trade Center (Level-6), Ka-86/1, Kuril
                  Bishwa Road, Progoti Soroni, Dhaka, Bangladesh
                </p>
              </>
            ],
            ["資本金", "39,000,000円 (2025年6月時点)"],
            ["代表取締役", "タハミド モイズル"],
            [
              "代表取締役副社長",
              <a
                href="https://shorturl.at/vTop3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 underline"
              >
                三浦 淳
              </a>,
            ],
            [
              "事業内容",
              <>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>システム開発事業（オフショア開発および業務委託を含む）</li>
                  <li>技能実習生受入サポート（弊社送出機関 駐在員事務所）</li>
                  <li>職業紹介有料職業紹介事業（番号：13ーユー316416）</li>
                  <li>登録支援事業</li>
                  <li>日本語学校運営事業（バングラデシュ）</li>
                  <li>留学生支援事業</li>
                  <li>バングラデシュ進出支援事業</li>
                  <li>求職者マッチング事業（bhalojob.com）</li>
                </ol>
              </>
            ],
            [
              "許可",
              <>
                有料職業紹介事業許可番号 : 13ーユー316416<br />
                登録支援機関 許可番号 19登-000466
              </>
            ],
            [
              "グループ会社",
              <>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Japan Bangla Bridge Recruiting Agency Ltd. （バングラデシュ送り出し機関）</li>
                  <li>Bhalo Ventures Ltd. （バングラデシュ法人）</li>
                  <li>Bhalojob Japanese Language School （バングラデシュ法人）</li>
                </ul>
              </>
            ],
            ["従業員数", "社員数 30名 ※現地法人メンバーを含む"],
            ["Eメール", "info@jbbc.co.jp"],
            [
              "顧問",
              <>
                杉田昌平 弁護士 （弁護士法人Global HR Strategy）<br />
                <a
                  href="https://www.ghrs.law/professionals/sugita-shohei/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline"
                >
                  https://www.ghrs.law/professionals/sugita-shohei/
                </a>
              </>
            ],
            [
              "加盟団体 (日本)",
              <>
                <ul className="list-disc pl-5 space-y-1">
                  <li>神奈川県中小企業団体中央会</li>
                  <li>KIP | 公益財団法人 神奈川産業振興センター</li>
                  <li>一般財団法人外国人材共生支援全国協会</li>
                  <li>東京日本橋ロータリークラブ</li>
                  <li>一般財団法人外国人材共生支援全国協会(NAGOMI)</li>
                  <li>全国ビジネスサポート協同組合連合会（NBCC)</li>
                  <li>一般社団法人 国際連携推進協会</li>
                </ul>
              </>
            ],
            [
              "加盟団体 (バングラデシュ)",
              <>
                <ul className="list-disc pl-5 space-y-1">
                  <li>BAIRA - バングラデシュ外国送出機関共同組合</li>
                  <li>BASIS - バングラデシュソフトウェア開発組合</li>
                  <li>BARVIDA - バングラデシュ中古車輸入業者およびディーラー協会</li>
                </ul>
              </>
            ],
          ].map(([k, v]) => (
            <div key={k as string} className="grid grid-cols-3 px-4 py-3">
              <dt className="col-span-1 text-sm font-medium text-gray-500">{k}</dt>
              <dd className="col-span-2 text-sm text-gray-800">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
