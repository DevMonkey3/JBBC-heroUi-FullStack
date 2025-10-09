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
import { PlusOutlined } from '@ant-design/icons';
export default function Faq() {
  const [breadcrumbData, setBreadcrumbData] = useState<any>([
    {
      key: "top",
      title: <span style={{ color: "#019cd4" }}>top</span>,
      path: '/jbbc/faq',
    },
    {
      key: "service",
      title: "よくある質問",
      path: '/jbbc/faq',
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

  ];


  function PostCard({ post }: { post: any }) {
    return (
      <article className="   overflow-hidden bg-white">
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-44 md:h-48 object-cover rounded-lg"
          />
          {/* <span className="absolute left-3 top-3 inline-block bg-white border-[#019cd4] text-[#019cd4] text-xs px-2 py-1 rounded-2xl">
            {post.tag}
          </span> */}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 text-left">
            {post.title}
          </h3>
          <p className="text-1xl text-[#929292] line-clamp-2 mb-2 text-left">{post.excerpt}</p>
          {/* <div className="flex  text-left">
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
          </div> */}
        </div>
      </article>
    );
  }

 const AccordionItem= ({ question, answer }:any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* 折叠按钮 —— 移动端触控友好 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full bg-white rounded-xl border border-blue-200 p-5 sm:p-2 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-expanded={isOpen}
        style={{ borderRadius: '50px' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* 圆形图标 */}
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#019cd4]">
            <PlusOutlined style={{ color: 'white', fontSize: '14px' }} />
            {/* 如果用 Heroicons：
              <PlusIcon className="w-4 h-4 text-white" />
            */}
          </div>
          {/* 问题文字 —— 防止溢出 */}
          <span className="text-gray-800 text-base sm:text-lg font-medium leading-tight truncate">
            {question}
          </span>
        </div>

        {/* 展开/收起图标 */}
        <div
          className={`transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-[#019cd4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
            />
          </svg>
        </div>
      </button>

      {/* 答案区域 —— 移动端优化排版 */}
      {isOpen && (
        <div className="bg-gray-50 p-4 sm:p-5 rounded-xl mt-2 animate-fadeIn">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#019cd4] text-white text-sm font-bold">
              A
            </span>
            <span className="text-gray-700 text-base sm:text-lg leading-relaxed break-words">
              {answer}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
  const faqs = [
    {
      question: "これから初めて外国人を採用しようと考えていますが、制度等詳しくわかりません。",
      answer: "現在もこれから外国人採用を検討している企業様から多数お問い合わせをいただいております。弊社が持っているノウハウ・ネットワークを駆使し、ベストな人材をベストな形で採用頂けるお手伝いをさせて頂きます。ご面談から内定までしっかりとしたサポート体制を構築しております。安心してご活用ください。",
    },
    {
      question: "これから初めて外国人を採用しようと考えていますが、制度等詳しくわかりません。",
      answer: "現在もこれから外国人採用を検討している企業様から多数お問い合わせをいただいております。弊社が持っているノウハウ・ネットワークを駆使し、ベストな人材をベストな形で採用頂けるお手伝いをさせて頂きます。ご面談から内定までしっかりとしたサポート体制を構築しております。安心してご活用ください。",
    },
    {
      question: "これから初めて外国人を採用しようと考えていますが、制度等詳しくわかりません。",
      answer: "現在もこれから外国人採用を検討している企業様から多数お問い合わせをいただいております。弊社が持っているノウハウ・ネットワークを駆使し、ベストな人材をベストな形で採用頂けるお手伝いをさせて頂きます。ご面談から内定までしっかりとしたサポート体制を構築しております。安心してご活用ください。",
    },
    {
      question: "これから初めて外国人を採用しようと考えていますが、制度等詳しくわかりません。",
      answer: "現在もこれから外国人採用を検討している企業様から多数お問い合わせをいただいております。弊社が持っているノウハウ・ネットワークを駆使し、ベストな人材をベストな形で採用頂けるお手伝いをさせて頂きます。ご面談から内定までしっかりとしたサポート体制を構築しております。安心してご活用ください。",
    },
    {
      question: "これから初めて外国人を採用しようと考えていますが、制度等詳しくわかりません。",
      answer: "現在もこれから外国人採用を検討している企業様から多数お問い合わせをいただいております。弊社が持っているノウハウ・ネットワークを駆使し、ベストな人材をベストな形で採用頂けるお手伝いをさせて頂きます。ご面談から内定までしっかりとしたサポート体制を構築しております。安心してご活用ください。",
    },
    {
      question: "これから初めて外国人を採用しようと考えていますが、制度等詳しくわかりません。",
      answer: "現在もこれから外国人採用を検討している企業様から多数お問い合わせをいただいております。弊社が持っているノウハウ・ネットワークを駆使し、ベストな人材をベストな形で採用頂けるお手伝いをさせて頂きます。ご面談から内定までしっかりとしたサポート体制を構築しております。安心してご活用ください。",
    },
    // 添加更多FAQ项...
  ];
  return (
    <div className="container text-center ">
      <Breadcrumbs
        breadcrumb={breadcrumbData}
        pageTitle={'FAQ'}
        breadcrumbTitle={breadcrumbData[breadcrumbData.length - 1].title}
      />
      <BgFont textBg={'FAQ'} title={'よくある質問'} />
      <div>クリックすると該当の質問へ移動できます</div>
      <div className="items-center  " >
        <Button shape="round" color="primary" variant="outlined">特定技能</Button>
        <Button shape="round" color="primary" variant="outlined">高度人材</Button>
        <Button shape="round" color="primary" variant="outlined">技能実習生</Button>
        <Button shape="round" color="primary" variant="outlined">日本へ留学</Button>
        <Button shape="round" color="primary" variant="outlined">人材紹介について</Button>
      </div>
      <div className="mt-10">
        <div className="text-center text-3xl font-bold m-5">サービスについて</div>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} {...faq} />
        ))}
        <div className="text-center text-3xl font-bold m-5">採用人材について</div>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} {...faq} />
        ))}
      </div>
      <>
        <div className="text-center text-xl  mt-5">
          Document
        </div>
        <div className="text-center text-3xl font-bold mt-5">
          お役立ち資料
        </div>
        <div className=" p-4 sm:p-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </>
    </div>
  );
}
