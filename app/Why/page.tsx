// app/why/page.tsx
'use client'

import Image from "next/image";
import Link from "next/link";

import { getCdnUrl } from "@/config/cdn";
import Breadcrumbs from "@/components/breadcrumb/page";

const REASONS = [
  {
    title: "採用のスピード",
    text: "独自の海外ネットワークと選考フローにより、募集〜採用までの期間を大幅に短縮。急な人員補填にも対応します。",
    thumb: getCdnUrl("/Garments/happy-female-dressmaker-working-with-sewing-machin-2025-03-13-19-29-43-utc.avif"),
  },
  {
    title: "高精度な人材選考",
    text: "スキル面・人柄面の両方を多面的に評価。ミスマッチを抑え、現場ですぐに活躍できる人材をご提案します。",
    thumb: getCdnUrl("/Garments/portrait-of-young-seamstress-using-sewing-machine-2025-04-04-21-11-54-utc.avif"),
  },
  {
    title: "入国～就業後の徹底支援",
    text: "在留資格、住まい、生活支援、日本語学習、定着支援までワンストップで対応。受入れ企業様の負担を最小化します。",
    thumb: getCdnUrl("/Garments/black-seamstress-adjusting-thread-on-sewing-machin-2024-12-13-19-33-28-utc.avif"),
  },
  {
    title: "現場に寄り添う伴走",
    text: "就業先の業務や現場の文化を理解した上で、導入時のオンボーディングや教育設計も支援します。",
    thumb: getCdnUrl("/Welding/welder-2024-10-20-15-09-15-utc.avif"),
  },
  {
    title: "明確なKPI・レポーティング",
    text: "募集効果・面接通過率・定着率などのKPIを明示。定期レポートで改善ポイントを共有します。",
    thumb: getCdnUrl("/Welding/welder-with-safety-work-wear-working-in-factory-2024-12-10-03-23-59-utc.avif"),
  },
  {
    title: "圧倒的なコスパ",
    text: "適正価格で継続的な人材供給を実現。長期的なコストダウンにも貢献します。",
    thumb: getCdnUrl("/Welding/worker-welding-in-factory-2024-09-15-07-46-15-utc.avif"),
  },
];

const KPIS = [
  {
    label: "受入企業",
    value: "300+",
    img: getCdnUrl("/Driver/portrait-of-a-indian-truck-driver-2025-03-15-15-24-57-utc.avif")
  },
  {
    label: "就職者 登録人数",
    value: "10K+",
    img: getCdnUrl("/Driver/man-portrait-and-outdoor-at-warehouse-with-confid-2025-04-05-23-39-51-utc.avif")
  },
  {
    label: "利用者",
    value: "2K+",
    img: getCdnUrl("/Driver/young-happy-truck-driver-looking-at-camera-2024-12-13-16-50-18-utc.avif")
  },
];

const BADGES = [
  { label: "実績紹介", sub: "事例ダイジェスト" },
  { label: "セミナー", sub: "最新イベント" },
  { label: "記事/資料", sub: "お役立ちコンテンツ" },
];

const GALLERY = [
  getCdnUrl("/Delivery/delivered-on-time-directly-to-your-door-2025-04-06-11-49-28-utc.avif"),
  getCdnUrl("/Caregiver/nurse-on-home-visit-greeting-senior-man-over-shou-2024-10-19-06-33-49-utc.avif"),
  getCdnUrl("/CAD CAM/creating-architectural-designs-on-computer-screens-2025-03-08-20-48-33-utc.avif"),
  getCdnUrl("/HR Admin/people-active-lifestyle-2025-09-08-12-51-08-utc.avif"),
  getCdnUrl("/Automation/woman-client-with-auto-mechanic-at-the-car-service-2025-03-17-05-19-25-utc.avif"),
  getCdnUrl("/HR Admin/simplifying-her-tasks-with-just-one-device-2025-04-06-09-00-28-utc.avif"),
  getCdnUrl("/Food Factory/man-and-woman-working-with-ceramics-at-the-pottery-2025-03-14-19-32-06-utc.avif"),
  getCdnUrl("/Driver/man-portrait-and-outdoor-at-warehouse-with-confid-2025-04-05-23-39-51-utc.avif"),
  getCdnUrl("/Food Factory/women-working-in-apple-factory-2024-09-18-09-15-59-utc.avif"),
];

const FEATURED = getCdnUrl(
  "/HR Admin/asian-business-woman-working-using-laptop-computer-2025-02-20-08-11-05-utc.avif"
);

export default function WhyPage() {
  const breadcrumbData = [
    { key: "top", title: "top" },
    { key: "why", title: "選ばれる理由" },
  ];

  return (
    <main className="py-8 md:py-10">
      <Breadcrumbs
        breadcrumb={breadcrumbData}
        pageTitle="why"
        breadcrumbTitle={breadcrumbData[breadcrumbData.length - 1].title}
      />

      {/* featured banner */}
      <div className="mb-10 border-2 border-sky-300 rounded-lg overflow-hidden">
        <div className="relative w-full h-72 md:h-96 lg:h-[28rem]">
          <img
            src={FEATURED}
            alt="Featured"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* reasons */}
      <section className="space-y-6 mb-12">
        {REASONS.map((r, idx) => (
          <div key={r.title} className="grid grid-cols-1 sm:grid-cols-[112px_1fr] gap-4">
            <div className="rounded-md overflow-hidden border border-gray-200 w-28 h-20">
              <img src={r.thumb} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
            </div>
            <div className="border-b border-gray-200 pb-5">
              <h3 className="font-bold text-gray-900 mb-1">{r.title}</h3>
              <p className="text-sm text-gray-600">{r.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* gallery */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((src, i) => (
            <div key={i} className="relative h-36 md:h-40">
              <Image src={src} alt={`gallery-${i}`} fill className="object-cover rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* footer banner */}
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
