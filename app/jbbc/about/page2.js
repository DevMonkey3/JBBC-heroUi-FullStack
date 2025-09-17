export const metadata = { title: "会社概要 | JBBC" };

export default function CompanyOverview() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <span className="inline-block bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded">Info</span>
        <h1 className="mt-3 text-2xl md:text-4xl font-extrabold">会社概要</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-8">
        <div className="rounded-2xl ring-1 ring-black/10 overflow-hidden">
          <div className="aspect-[3/4] bg-gray-100" />
        </div>

        <dl className="divide-y divide-gray-200 ring-1 ring-black/5 rounded-2xl overflow-hidden">
          {[
            ["会社名", "Japan Bangla Bridge Corporation（ジャパン・バングラ・ブリッジ・コーポレーション）"],
            ["設立", "2018年12月1日"],
            ["本社所在地", "〒106-0032 東京都港区六本木7丁目22-3 鳳麗富三ビル703"],
            ["資本金", "2,500万円（うち3,500万円）"],
            ["代表取締役", "公洋 モイヌル"],
            ["事業内容", "製造分野に特化した人材紹介・派遣、受入支援、採用支援 など"],
            ["主要取引先", "製造・物流・ホテル・農業 ほか"],
            ["連絡先", "03-xxxx-xxxx / info@jbbc.co.jp"],
          ].map(([term, desc]) => (
            <div key={term} className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
              <dt className="bg-gray-50 p-4 font-medium">{term}</dt>
              <dd className="p-4">{desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
