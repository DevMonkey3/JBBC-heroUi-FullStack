// Content7.tsx
"use client";

import React from "react";

type Reason = {
  number: number;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    number: 1,
    title: "最適人材を紹介",
    description:
      "強固な外国人求職者ネットワーク＆求人媒体を駆使した採用で円滑なご紹介が可能",
  },
  {
    number: 2,
    title: "フォローアップ",
    description:
      "住居のフォローなど直接雇用でありながら、採用から雇用後も一貫してフォローアップが可能です。報告書のレポート作成もお任せください",
  },
  {
    number: 3,
    title: "外国からの特定技能",
    description:
      "若くて優秀なベトナム籍の大学生を最長1年採用し、期間中に特定技能試験を勉強",
  },
  {
    number: 4,
    title: "留学生からの特定技能",
    description:
      "留学生の期間はお試しとして派遣で活用しつつ、その期間で見極めを行うことが可能",
  },
  {
    number: 5,
    title: "当社の人材は「質」が違う！",
    description:
      "海外からの紹介人材なら「完全オーダーメイド」の事前教育プログラムを提供。専門用語などを事前に覚えてから入国するため、現場での即活躍が期待できます。",
  },
];

export default function Content7() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:py-10">
      {/* White card wrapper */}
      <div className="bg-white rounded-2xl shadow-lg ring-1 ring-black/5 px-5 py-8 md:px-10 md:py-12">
        {/* Header */}
        <header className="text-center space-y-2 md:space-y-3 mb-8 md:mb-10">
          <p className="m-0 text-lg md:text-xl text-gray-800">それが当社の</p>
          <h2 className="m-0 font-serif font-extrabold text-[#1AA4DD] leading-tight text-3xl md:text-5xl lg:text-6xl">
            「特定技能&外国人材」
          </h2>
          <p className="text-base md:text-lg text-gray-700 m-0">
            当社の特定技能が選ばれる5つの理由とは・・・？
          </p>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: reasons + CTA */}
          <div className="md:col-span-7">
            <ul className="space-y-5 md:space-y-6">
              {reasons.map((r) => (
                <li key={r.number} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4da2d7] text-white grid place-items-center font-bold text-lg md:text-xl">
                    {r.number}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 text-lg md:text-xl mb-1">
                      {r.title}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {r.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA: orange and right-aligned on desktop */}
            <div className="mt-7 md:mt-9 text-center md:text-right">
              <button
                type="button"
                className="rounded-full bg-[#EE6629] hover:bg-[#d95a20] text-white px-7 py-2 md:px-9 md:py-3 text-base md:text-lg shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EE6629]"
              >
                営業担当に聞いてみる
              </button>
            </div>
          </div>

          {/* Right: image pinned bottom-left */}
          <div className="md:col-span-5">
            <div className="relative h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] overflow-visible">
              {/* Image lives at public/home/personImage.png → src="/home/personImage.png" */}
              <img
                src="/home/personImage.png"
                alt="Person"
                className="absolute bottom-0 left-0 h-full w-auto object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
