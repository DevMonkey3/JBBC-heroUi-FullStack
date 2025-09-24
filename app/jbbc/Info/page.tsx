// app/company/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function CompanyPage() {
  const sections = [
    {
      title: "代表ご挨拶",
      img: "/home/Mask-group-4-1.png", // replace with your image
      href: "/jbbc/Info/company/PersonInfo",
    },
    {
      title: "会社概要",
      img: "/home/homeImg.png", // building photo
      href: "/jbbc/Info/company/companyinfo",
    },
    
    
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Page Title */}
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1 text-sm font-bold bg-blue-100 text-blue-600 rounded-full mb-3">
          Info
        </span>
        <h1 className="text-3xl md:text-4xl font-bold">会社情報</h1>
        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
          Japan Bangla Bridge Corporation (JBBC) は、日本とバングラデシュの間における人材・技術・ビジネスの架け橋となることを目指して設立された総合人材会社です。
          製造業を中心とした現場支援、現地法人の設立コンサルティング、ITソリューション開発まで、多角的なサービスを提供しています。
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sections.map((section, i) => (
          <Link key={i} href={section.href}>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
              <Image
                src={section.img}
                alt={section.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center font-semibold text-gray-800">
                {section.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
