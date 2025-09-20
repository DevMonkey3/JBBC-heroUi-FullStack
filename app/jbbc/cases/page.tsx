// app/jbbc/implementation-results/page.tsx
'use client'
import { title } from "@/components/primitives";
import { useState, use } from "react";
import Breadcrumbs from "@/components/breadcrumb/page";
// export const metadata = {
//   title: "Implementation results | JBBC",
// };
import BgFont from "@/components/bgFont/BgFont";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { color } from "framer-motion";

export default function Cases() {
  const [breadcrumbData, setBreadcrumbData] = useState<any>([
    {
      key: "top",
      title: <span style={{ color: "#019cd4" }}>top</span>,
      path: '/jbbc/cases',
    },
    {
      key: "service",
      title: "導入実績",
      path: '/jbbc/cases',
    }
  ]);

  const posts: any[] = [
    {
      id: "1",
      tag: "特定技能",
      title:
        "即戦力を2週間で確保！",
      excerpt: "定着率90％を実現した外国人採用支援",
      image: "/home/Japan1.jpg",
      href: "/blog/1",
    },
    {
      id: "2",
      tag: "国際的な仕事",
      title:
        "独自ルートで外国籍人材を採用。",
      excerpt:
        "新たな採用チャネルとしてのインターン制度導入",
      image: "/home/Mt-Fuji-and-Cherry-Blossom-at-lake-Kawaguchiko.jpg",
      href: "/blog/2",
    },
    {
      id: "3",
      tag: "日本留学",
      title:
        "人が定着しない現場を変えた。 2割を占める“家族のX”を理解して採用を成功に！",
      excerpt:
        "チーム派遣と常駐管理で実現した出勤率100%",
      image: "/home/Japan-travel-tips-photographer-flytographer-21-2846066585.jpeg",
      href: "/blog/3",
    },
    {
      id: "4",
      tag: "特定技能",
      title:
        "即戦力を2週間で確保！",
      excerpt:
        "定着率90％を実現した外国人採用支援",
      image: "/home/IMG_4102-1024x683.jpg",
      href: "/blog/4",
    },
    {
      id: "5",
      tag: "国際的な仕事",
      title:
        "独自ルートで外国籍人材を採用。",
      excerpt:
        "新たな採用チャネルとしてのインターン制度導入",
      image: "/home/20-The-Ultimate-Travel-Itinerary-Japan-body.jpg",
      href: "/blog/5",
    },
    {
      id: "6",
      tag: "日本留学",
      title:
        "人が定着しない現場を変えた。 2割を占める“家族のX”を理解して採用を成功に！",
      excerpt:
        "チーム派遣と常駐管理で実現した出勤率100%",
      image: "/home/shutterstock_1830039815.jpg",
      href: "/blog/6",
    },
    {
      id: "7",
      tag: "特定技能",
      title:
        "即戦力を2週間で確保！",
      excerpt:
        "定着率90％を実現した外国人採用支援",
      image: "/home/japan-tourism.avif",
      href: "/blog/7",
    },
    {
      id: "8",
      tag: "ライフスタイル",
      title:
        "独自ルートで外国籍人材を採用。",
      excerpt:
        "新たな採用チャネルとしてのインターン制度導入",
      image: "/home/blogPosts.png",
      href: "/blog/8",
    },
    {
      id: "9",
      tag: "日本留学",
      title:
        "人が定着しない現場を変えた。 2割を占める“家族のX”を理解して採用を成功に！",
      excerpt:
        "チーム派遣と常駐管理で実現した出勤率100%",
      image: "/home/20-The-Ultimate-Travel-Itinerary-Japan-body.jpg",
      href: "/blog/9",
    },
  ];


  function PostCard({ post }: { post: any }) {
    return (
      <article className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-44 md:h-48 object-cover"
          />
          <span className="absolute left-3 top-3 inline-block bg-white border-[#019cd4] text-[#019cd4] text-xs px-2 py-1 rounded-2xl">
            {post.tag}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 text-left">
            {post.title}
          </h3>
          <p className="font-semibold text-gray-900 line-clamp-2 mb-2 text-left">{post.excerpt}</p>
          <div className="flex  text-left">
            <a
              href="/jbbc/cases/caseDetail"
              // href={post.href}
              // onClick={()=>{

              // }}
              className="text-sky-600 hover:text-sky-700 text-xs"
            >
              業界・業種
            </a>
            <span className="text-xs mx-20">プラスチック製造業</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <div className="container text-center ">
      <Breadcrumbs
        breadcrumb={breadcrumbData}
        pageTitle={'solution'}
        breadcrumbTitle={breadcrumbData[breadcrumbData.length - 1].title}
      />
      <BgFont textBg={'solution'} title={'導入実績一覧'} />
      <div>各種サービスの導入実績では、お客様の課題をヒアリング、最適なご提案をおこなっております。 <br />提案の”結果・効果”についても詳しく記載していますので、ぜひご覧ください。</div>
      <div className="bg-[#e8f6fa] p-4 sm:p-8 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}

        {/* 分页按钮 - 居中显示 */}
        <div className="flex justify-center w-full col-span-full mt-6 gap-2">
          <Button shape="circle" icon={<LeftOutlined style={{ fontWeight: "bold" }} />} />
          <Button shape="circle" icon={<RightOutlined style={{ fontWeight: "bold" }} />} />
        </div>
      </div>

    </div>
  );
}
