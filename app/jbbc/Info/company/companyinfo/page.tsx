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
          <img
            src="/home/23234.png"
            alt="本社ビル"
            className="w-full h-full object-cover"
          />
        </div>

        <dl className="divide-y divide-gray-200 border border-gray-200 rounded-xl">
          {[
            ["会社名", "Japan Bangla Bridge Corporation / ジャパン・バングラ・ブリッジ・コーポレーション"],
            ["設立", "2018年12月1日"],
            ["本社所在地", "〒160-0023 東京都新宿区西新宿7丁目22-39 興亜第三ビル 703"],
            ["資本金", "2,500万円（うち3,500万円）"],
            ["代表取締役", "タハミド モイズル"],
            ["事業内容", "特定技能・高度人材の採用支援 / 技術支援 / 送出し機関連携 / 教育・研修 / コンプライアンス支援 ほか"],
            ["加盟団体", "東京商工会議所、リーダーシップクラブ ほか"],
            ["電話 / FAX", "03-6279-1289（日本本社） / FAX 03-6279-1287"],
            ["関連会社", "ピクト株式会社（日本法人） ほか"],
            ["Eメール", "info@jbbc.co.jp"],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-3 px-4 py-3">
              <dt className="col-span-1 text-sm font-medium text-gray-500">{k}</dt>
              <dd className="col-span-2 text-sm text-gray-800">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
