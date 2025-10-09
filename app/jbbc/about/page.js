export const metadata = { title: "会社概要 | JBBC" };

export default function CompanyOverview() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">会社概要</h1>

      <dl className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden shadow">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">会社名</dt>
          <dd className="p-4">
            Japan Bangla Bridge Corporation
            <br />
            ジャパン・バングラ・ブリッジ・コーポレーション
          </dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">設立</dt>
          <dd className="p-4">2018年12月1日</dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">本社所在地</dt>
          <dd className="p-4">
            〒160-0023 東京都新宿区西新宿7丁目22-39
            <br />
            西新宿第二ビル703
          </dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">資本金</dt>
          <dd className="p-4">2,500万タカ（3,500万円）</dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">代表取締役</dt>
          <dd className="p-4">タハミド モイヌル</dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">会長</dt>
          <dd className="p-4">タハミド タパスシム</dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">事業内容</dt>
          <dd className="p-4 space-y-1">
            <p>技能実習生並びに特定技能登録支援機関の送り出し機関</p>
            <p>採用支援・海外人材事業運営</p>
            <p>技能実習生受入事業</p>
            <p>技術者派遣事業（製造業・人・事務業）</p>
            <p>日本語教育事業</p>
          </dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">加盟団体</dt>
          <dd className="p-4 space-y-1">
            <p>東京西南ロータリークラブ 会員</p>
            <p>東京中小企業家同友会 会員</p>
            <p>BAIRA バングラデシュ国際人材供給関連協同組合 会員</p>
            <p>BASIS バングラデシュソフトウェア開発協会 会員</p>
            <p>BAYDIA バングラデシュ自動車輸出入およびディーラー協会 会員</p>
          </dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">電話 & FAX</dt>
          <dd className="p-4 space-y-1">
            <p>+8801707020644（ダッカ事務所）</p>
            <p>03-6279-1289（日本本社電話番号）</p>
            <p>FAX: 03-6279-1287（日本）</p>
          </dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">関連会社</dt>
          <dd className="p-4 space-y-1">
            <p>システム開発事業</p>
            <p>ピクト株式会社（日本法人）</p>
            <p>pik.lp 求人情報サイト</p>
            <p>bhalojob.com 人材紹介事業</p>
          </dd>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
          <dt className="bg-gray-50 p-4 font-medium">Eメール</dt>
          <dd className="p-4">info@jbbc.co.jp</dd>
        </div>
      </dl>
    </main>
  );
}
