// app/why/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "選ばれる理由 | JBBC",
  description: "JBBC が選ばれる理由のご紹介。",
};

const REASONS = [
  {
    title: "採用のスピード",
    text:
      "独自の海外ネットワークと選考フローにより、募集〜採用までの期間を大幅に短縮。急な人員補填にも対応します。",
  },
  {
    title: "高精度な人材選考",
    text:
      "スキル面・人柄面の両方を多面的に評価。ミスマッチを抑え、現場ですぐに活躍できる人材をご提案します。",
  },
  {
    title: "入国～就業後の徹底支援",
    text:
      "在留資格、住まい、生活支援、日本語学習、定着支援までワンストップで対応。受入れ企業様の負担を最小化します。",
  },
  {
    title: "現場に寄り添う伴走",
    text:
      "就業先の業務や現場の文化を理解した上で、導入時のオンボーディングや教育設計も支援します。",
  },
  {
    title: "明確なKPI・レポーティング",
    text:
      "募集効果・面接通過率・定着率などのKPIを明示。定期レポートで改善ポイントを共有します。",
  },
  {
    title: "圧倒的なコスパ",
    text:
      "適正価格で継続的な人材供給を実現。長期的なコストダウンにも貢献します。",
  },
];

const KPIS = [
  { label: "受入企業", value: "300+" },
  { label: "就職者 登録人数", value: "10K+" },
  { label: "利用者", value: "2K+" },
];

const BADGES = [
  { label: "実績紹介", sub: "事例ダイジェスト" },
  { label: "セミナー", sub: "最新イベント" },
  { label: "記事/資料", sub: "お役立ちコンテンツ" },
];

const GALLERY = new Array(9).fill(0).map((_, i) => ({
  id: i,
  src: "/placeholders/640x480.jpg", // ← ここを差し替え
}));

export default function WhyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* breadcrumb + title */}
      <div className="mb-6">
        <div className="text-xs text-sky-600 font-semibold mb-2">why</div>
        <h1 className="text-2xl md:text-3xl font-bold">選ばれる理由</h1>
      </div>

      {/* big featured banner */}
      <div className="mb-10 border-2 border-sky-300 rounded-lg overflow-hidden">
        <img
          src="/placeholders/1200x320.jpg"
          alt="Featured"
          className="w-full h-40 md:h-52 lg:h-60 object-cover"
        />
      </div>

      {/* reasons list (thumb + text) */}
      <section className="space-y-6 mb-12">
        {REASONS.map((r, idx) => (
          <div key={r.title} className="grid grid-cols-[112px_1fr] gap-4">
            <div className="rounded-md overflow-hidden border border-gray-200">
              <img
                src="/placeholders/200x140.jpg"
                alt={`thumb-${idx + 1}`}
                className="w-28 h-20 md:w-28 md:h-20 object-cover"
              />
            </div>
            <div className="border-b border-gray-200 pb-5">
              <h3 className="font-bold text-gray-900 mb-1">{r.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* KPI light-blue strip */}
      <section className="rounded-xl bg-sky-50 px-4 py-8 mb-10">
        <div className="text-center mb-6">
          <p className="text-xs text-gray-500">L o g o</p>
          <h2 className="text-lg font-semibold text-gray-800">数字で見るJBBC</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className="bg-white border border-sky-100 rounded-lg px-6 py-5 shadow-sm text-center"
            >
              <div className="mb-3">
                <img
                  src="/placeholders/320x180.jpg"
                  alt="metric"
                  className="w-full h-24 object-cover rounded"
                />
              </div>
              <div className="text-2xl font-extrabold text-orange-500">
                {k.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">{k.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* small badges / mini CTA strip */}
      <section className="rounded-xl bg-sky-50 px-4 py-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="bg-white border border-sky-100 rounded-lg px-6 py-5 shadow-sm flex items-center gap-4"
            >
              <img
                src="/placeholders/96x96.jpg"
                alt="badge"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <div className="text-sm text-sky-600 font-semibold">{b.label}</div>
                <div className="text-gray-700 font-medium">{b.sub}</div>
              </div>
              <div className="ml-auto">
                <a
                  href="#"
                  className="inline-flex items-center text-xs text-sky-600 hover:text-sky-700"
                >
                  詳細へ →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* gallery (people / scenes) */}
      <section className="mb-12">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            現場の声で選ばれ続ける
          </h2>
          <p className="text-sm text-gray-500">実際の現場スナップ</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((g) => (
            <div
              key={g.id}
              className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-50"
            >
              <img
                src={g.src}
                alt={`gallery-${g.id}`}
                className="w-full h-36 md:h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* dual CTA banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src="/placeholders/1200x320.jpg"
            alt="cta-1"
            className="w-full h-40 md:h-44 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="px-6 py-3 rounded-full bg-[#EE6629] text-white font-bold shadow">
              資料ダウンロード
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <img
            src="/placeholders/1200x320.jpg"
            alt="cta-2"
            className="w-full h-40 md:h-44 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="px-6 py-3 rounded-full bg-[#EE6629] text-white font-bold shadow">
              お問い合わせ
            </button>
          </div>
        </div>
      </section>

      {/* bottom small banner (optional message / search UI placeholder) */}
      <section className="rounded-xl bg-sky-50 px-5 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-sm text-gray-500">JBBCの採用情報を常にご確認ください</div>
            <div className="text-lg font-semibold text-gray-800">
              メールマガジン登録（プレースホルダー）
            </div>
          </div>
          <div className="w-full md:w-96">
            <div className="flex">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="w-full rounded-l-full border border-gray-300 px-4 py-2 outline-none"
              />
              <button className="rounded-r-full bg-[#EE6629] text-white px-5">
                送信
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
