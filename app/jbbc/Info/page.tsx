// app/company/page.tsx
"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumb/page";
import BgFont from "@/components/bgFont/BgFont";
import {useState}from 'react';
import { getCdnUrl } from "@/config/cdn";
export default function CompanyPage() {
  const sections = [
    {
      title: "代表ご挨拶",
      img: getCdnUrl("/home/Mask-group-4-1.avif"), // replace with your image
      href: "/jbbc/Info/company/PersonInfo",
    },
    {
      title: "会社概要",
      img: getCdnUrl("/home/homeImg.avif"), // building photo
      href: "/jbbc/Info/company/companyinfo",
    },
    

  ];

    const [breadcrumbData, setBreadcrumbData] = useState([
      {
        key: "top",
        title: <span style={{ color: "#019cd4" }}>top</span>,
        // path: '/jbbc/contact/inquiry',
      },
      {
        key: "Info",
        title: "会社情報",
        // path: '/jbbc/contact/inquiry',
      },
    ]);



  return (
    <main className="mx-auto max-w-6xl px-4 mb-10">
            <Breadcrumbs
              breadcrumb={breadcrumbData}
              pageTitle={'blog'}
              breadcrumbTitle={breadcrumbData[breadcrumbData.length - 1].title}
            />
            <BgFont textBg={'Info'} title={'会社情報'} />
      {/* Page Title */}
      {/* <div className="text-center mb-10">
        <span className="inline-block px-4 py-1 text-sm font-bold bg-blue-100 text-blue-600 rounded-full mb-3">
          Info
        </span>
        <h1 className="text-3xl md:text-4xl font-bold">会社情報</h1>
        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
          Japan Bangla Bridge Corporation (JBBC) は、日本とバングラデシュの間における人材・技術・ビジネスの架け橋となることを目指して設立された総合人材会社です。
          製造業を中心とした現場支援、現地法人の設立コンサルティング、ITソリューション開発まで、多角的なサービスを提供しています。
        </p>
      </div> */}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
        {sections.slice(0, 2).map((section, i) => (
          <Link key={i} href={section.href}>
            <div  className="bg-white rounded-lg  hover:shadow-lg transition overflow-hidden cursor-pointer">
              <img
                src={section.img}
                alt={section.title}
                width={500}
                height={400}
                style={{borderRadius:'60px 0 60px 0'}}
                className="w-full h-100 object-cover"
                loading="lazy"
              />
              <div className="p-4 text-center font-semibold text-gray-800">
                {section.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-3">
        {sections.slice(2,6).map((section, i) => (
          <Link key={i} href={section.href}>
            <div  className="bg-white rounded-lg  hover:shadow-lg transition overflow-hidden cursor-pointer">
              <img
                src={section.img}
                alt={section.title}
                width={500}
                height={400}
                style={{borderRadius:'60px 0 60px 0'}}
                className="w-full h-50 object-cover"
                loading="lazy"
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
