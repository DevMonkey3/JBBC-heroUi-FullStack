// app/why/page.tsx
'use client'
import type { Metadata } from "next";
import Image from "next/image";

// export const metadata: Metadata = {
//   title: "選ばれる理由 | JBBC",
//   description: "JBBC が選ばれる理由のご紹介。",
// };
import Breadcrumbs from "@/components/breadcrumb/page";
import {useState}from 'react';

// helper: safely use public paths that contain spaces
const enc = (p: string) => p.replace(/ /g, "%20");

const REASONS = [
  {
    title: "採用のスピード",
    text: "独自の海外ネットワークと選考フローにより、募集〜採用までの期間を大幅に短縮。急な人員補填にも対応します。",
    thumb: "/Garments/happy-female-dressmaker-working-with-sewing-machin-2025-03-13-19-29-43-utc.avif",
  },
  {
    title: "高精度な人材選考",
    text: "スキル面・人柄面の両方を多面的に評価。ミスマッチを抑え、現場ですぐに活躍できる人材をご提案します。",
    thumb: "/Garments/portrait-of-young-seamstress-using-sewing-machine-2025-04-04-21-11-54-utc.avif",
  },
  {
    title: "入国～就業後の徹底支援",
    text: "在留資格、住まい、生活支援、日本語学習、定着支援までワンストップで対応。受入れ企業様の負担を最小化します。",
    thumb: "/Garments/black-seamstress-adjusting-thread-on-sewing-machin-2024-12-13-19-33-28-utc.avif",
  },
  {
    title: "現場に寄り添う伴走",
    text: "就業先の業務や現場の文化を理解した上で、導入時のオンボーディングや教育設計も支援します。",
    thumb: "/Welding/welder-2024-10-20-15-09-15-utc.avif",
  },
  {
    title: "明確なKPI・レポーティング",
    text: "募集効果・面接通過率・定着率などのKPIを明示。定期レポートで改善ポイントを共有します。",
    thumb: "/Welding/welder-with-safety-work-wear-working-in-factory-2024-12-10-03-23-59-utc.avif",
  },
  {
    title: "圧倒的なコスパ",
    text: "適正価格で継続的な人材供給を実現。長期的なコストダウンにも貢献します。",
    thumb: "/Welding/worker-welding-in-factory-2024-09-15-07-46-15-utc.avif",
  },
];

const KPIS = [
  { label: "受入企業", value: "300+", img: "/Driver/portrait-of-a-indian-truck-driver-2025-03-15-15-24-57-utc.avif" },
  { label: "就職者 登録人数", value: "10K+", img: "/Driver/man-portrait-and-outdoor-at-warehouse-with-confid-2025-04-05-23-39-51-utc.avif" },
  { label: "利用者", value: "2K+", img: "/Driver/young-happy-truck-driver-looking-at-camera-2024-12-13-16-50-18-utc.avif" },
];

const BADGES = [
  { label: "実績紹介", sub: "事例ダイジェスト" },
  { label: "セミナー", sub: "最新イベント" },
  { label: "記事/資料", sub: "お役立ちコンテンツ" },
];

// NOTE: Some of your paths had spaces and one missing extension; fix/encode them:
const GALLERY = [
  "/Delivery/delivered-on-time-directly-to-your-door-2025-04-06-11-49-28-utc.avif",
  "/Caregiver/nurse-on-home-visit-greeting-senior-man-over-shou-2024-10-19-06-33-49-utc.avif",
  enc("/CAD CAM/creating-architectural-designs-on-computer-screens-2025-03-08-20-48-33-utc.avif"),
  enc("/HR Admin/people-active-lifestyle-2025-09-08-12-51-08-utc.avif"),
  enc("/Automation/woman-client-with-auto-mechanic-at-the-car-service-2025-03-17-05-19-25-utc (1).avif"),
  enc("/HR Admin/simplifying-her-tasks-with-just-one-device-2025-04-06-09-00-28-utc.avif"),
  "/Food Factory/man-and-woman-working-with-ceramics-at-the-pottery-2025-03-14-19-32-06-utc.avif",
  "/Automation/man-portrait-and-outdoor-at-warehouse-with-confid-2025-04-05-23-39-51-utc.avif",
  "/Food Factory/women-working-in-apple-factory-2024-09-18-09-15-59-utc.avif",
];

const FEATURED = enc("/HR Admin/asian-business-woman-working-using-laptop-computer-2025-02-20-08-11-05-utc.avif");


export default function WhyPage() {
  const [breadcrumbData, setBreadcrumbData] = useState([
      {
        key: "top",
        title: <span style={{ color: "#019cd4" }}>top</span>,
        // path: '/jbbc/contact/inquiry',
      },
      {
        key: "why",
        title: "選ばれる理由",
        // path: '/jbbc/contact/inquiry',
      },
    ]);
  return (
    <main className="py-8 md:py-10">
      {/* breadcrumb + title */}
      <Breadcrumbs
        breadcrumb={breadcrumbData}
        pageTitle={'why'}
        breadcrumbTitle={breadcrumbData[breadcrumbData.length - 1].title}
      />
      {/* <div className="mb-6">
        <div className="text-xs text-sky-600 font-semibold mb-2">why</div>
        <h1 className="text-2xl md:text-3xl font-bold">選ばれる理由</h1>
      </div> */}

      {/* featured banner */}
      <div className="mb-10 border-2 border-sky-300 rounded-lg overflow-hidden">
  <div className="relative w-full h-72 md:h-96 lg:h-[28rem]">
    <Image
      src={FEATURED}
      alt="Featured"
      fill
      sizes="(min-width:1280px) 1200px, (min-width:768px) 90vw, 100vw"
      className="object-cover object-center"
      priority
    />
  </div>
</div>

      {/* reasons list */}
      <section className="space-y-6 mb-12">
        {REASONS.map((r, idx) => (
          <div key={r.title} className="grid grid-cols-1 sm:grid-cols-[112px_1fr] gap-4">
            <div className="rounded-md overflow-hidden border border-gray-200 w-28 h-20 sm:w-28 sm:h-20">
              <div className="relative w-full h-full">
                <Image src={r.thumb} alt={`thumb-${idx + 1}`} fill sizes="112px" className="object-cover" />
              </div>
            </div>
            <div className="border-b border-gray-200 pb-5">
              <h3 className="font-bold text-gray-900 mb-1">{r.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* KPI strip */}
      <section className="rounded-xl bg-sky-50 px-2 sm:px-6 py-10 mb-10">
  <div className="text-center mb-6">
    <p className="text-xs text-gray-500">Logo</p>
    <h2 className="text-xl font-semibold text-gray-800">JBBC by the Numbers</h2>
  </div>

  {/* 1 → 3 responsive full-width cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
    {KPIS.map((k) => (
      <div
        key={k.label}
        className="bg-white border border-sky-100 rounded-xl shadow-md flex flex-col justify-between p-6 h-64"
      >
        <div className="relative w-full h-32 mb-4">
          <Image
            src={k.img}
            alt={k.label}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="text-3xl font-extrabold text-orange-500">{k.value}</div>
        <div className="text-base text-gray-600 mt-1">{k.label}</div>
      </div>
    ))}
  </div>
</section>

      {/* mini CTA badges */}
      <section className="rounded-xl bg-sky-50 px-3 sm:px-6 py-12 mb-10">
  {/* full-width grid, roomy spacing */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
    {BADGES.map((b, i) => (
      <a
        key={b.label}
        href="#"
        className="group rounded-2xl bg-white border border-sky-100 shadow-sm hover:shadow-md transition-shadow
                   ring-1 ring-transparent hover:ring-sky-100 focus:outline-none focus-visible:ring-2
                   focus-visible:ring-sky-400"
      >
        <div className="flex items-center gap-5 p-5 md:p-7">
          {/* bigger thumbnail */}
          <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
            <Image
              src={REASONS[i % REASONS.length].thumb}
              alt={`${b.label} thumbnail`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          {/* text block */}
          <div className="min-w-0">
            <div className="text-sm text-sky-600 font-semibold">{b.label}</div>
            <div className="text-base md:text-lg font-medium text-gray-800 truncate">
              {b.sub}
            </div>
          </div>

          {/* CTA on the right */}
          <span className="ml-auto inline-flex items-center gap-1 text-sky-600 text-sm md:text-base opacity-80 group-hover:opacity-100">
            To the details <span aria-hidden>→</span>
          </span>
        </div>
      </a>
    ))}
  </div>
</section>

      {/* gallery */}
      <section className="mb-12">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">現場の声で選ばれ続ける</h2>
          <p className="text-sm text-gray-500">実際の現場スナップ</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-50 w-full h-36 md:h-40">
              <Image src={src} alt={`gallery-${i}`} fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* dual CTAs */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {["資料ダウンロード", "お問い合わせ"].map((label, idx) => (
          <div key={label} className="relative overflow-hidden rounded-xl">
            <div className="relative w-full h-44 md:h-52">
              <Image src={GALLERY[(6 + idx) % GALLERY.length]} alt={`cta-${idx + 1}`} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="px-6 py-3 rounded-full bg-[#EE6629] text-white font-bold shadow">{label}</button>
            </div>
          </div>
        ))}
      </section>

      {/* footer banner */}
      <section className="rounded-xl bg-sky-50 px-5 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-sm text-gray-500">JBBCの採用情報を常にご確認ください</div>
            <div className="text-lg font-semibold text-gray-800">メールマガジン登録（プレースホルダー）</div>
          </div>
          <div className="w-full md:w-96">
            <div className="flex">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="w-full rounded-l-full border border-gray-300 px-4 py-2 outline-none"
              />
              <button className="rounded-r-full bg-[#EE6629] text-white px-5">送信</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
