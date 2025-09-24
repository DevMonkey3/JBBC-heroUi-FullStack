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
import { Image } from "@heroui/image";

export default function CasesDetail() {
  const [breadcrumbData, setBreadcrumbData] = useState<any>([
    {
      key: "top",
      title: <span style={{ color: "#019cd4" }}>top</span>,
      path: '/jbbc/cases',
    },
    {
      key: "cases",
      title: "導入実績",
      path: '/jbbc/cases',
    },
    {
      key: "caseDetail",
      title: "導入実績",
      path: '/jbbc/cases/caseDetail',

    }
  ]);

  const posts: any[] = [
    {
      id: "1",
      tag: "特定技能",
      title:
        "日本人 x 外国籍チーム派遣のハイブリット",
      excerpt: "派遣により24時間シフトが可能に",
      image: "/home/Japan1.jpg",
      href: "/blog/1",
      cardCss: 'bg-[#e8f6fa] border-b '
    },
    {
      id: "2",
      tag: "国際的な仕事",
      title:
        "出勤率99%以上を実現！夜勤帯の人材不足を",
      excerpt:
        "解消",
      image: "/home/Mt-Fuji-and-Cherry-Blossom-at-lake-Kawaguchiko.jpg",
      href: "/blog/2",
      cardCss: 'bg-[#e8f6fa] border-b '
    },
    {
      id: "3",
      tag: "日本留学",
      title:
        `毎年同時期のリピーター人材確保、当社社員が
`,
      excerpt:
        "常駐し「穴」を空けないバッファシフト管理を実行",
      image: "/home/Japan-travel-tips-photographer-flytographer-21-2846066585.jpeg",
      href: "/blog/3",
      cardCss: 'bg-[#e8f6fa] border-b '
    },
  ];


  function PostCard({ post }: { post: any }) {
    return (
      <article className={" border border-gray-200 shadow-sm overflow-hidden " + post.cardCss}>
        <div className="relative">
          <Image
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
        breadcrumbTitle={<>人が定着しない現場を変えた。<br />チーム派遣と常駐管理で実現した出勤率100%</>}
      />
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between p-8 bg-white">
        {/* 左侧图片 */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Image
            src="/home/Japan1.jpg" // 替换为你的图片路径
            alt="Worker in Warehouse"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* 右侧文本信息 */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-2xl font-bold mb-2">お客様プロフィール</h2>
          <div className="border-t border-gray-400 py-2">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-bold">業界・業種</span> 食品運搬業
              </li>
              <li>
                <span className="font-bold">部門・職種</span> 倉庫内作業
              </li>
              <li>
                <span className="font-bold">従業員数</span> 100人
              </li>
              <li>
                <span className="font-bold">就業時間</span> 14:00〜21:30 22:00〜05:00
              </li>
              <li>
                <span className="font-bold">納期</span> 2週間
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#f0f8ff] p-6 md:p-12 lg:p-20 rounded-lg md:rounded-[120px_0_120px_0] text-left"
        style={{
          borderRadius: "120px 0 120px 0",
        }}
      >
        {/* Section Title */}
        <div className="mb-4">
          <span
            style={{
              borderRadius: "10px 0 10px 0",
            }}
            className="bg-[#029dd5] text-xl  text-white px-2 py-1 rounded">solution</span>
          <h2 className="text-3xl font-bold mt-2 mb-2">お客様の課題</h2>
          <h3 className="text-lg font-semibold text-[#1AA4DD]">人が定着しない現場、止まらない残業</h3>
          <p className="text-sm mt-2">
            スポット派遣の求人媒体を活用しても応募が集まらず、各営業所における人員の確保は困難な状況が続いていた。
            寒冷な作業環境と重労働という職場特性から短期離職が多く、スタッフの習熟が進まないまま入れ替わりが発生し、
            現場の負担が増大していた。既存社員の残業は1日あたり2〜3時間にも及び、長時間労働が常態化。人員不足への焦りや緊張感が現場全体に広がっていた。
            学生アルバイトや女性パートを中心とした日勤帯の募集でも定着率は低く、深夜帯ではスポット派遣が主流で、「1回で終わる」勤務が大半を占めていた。
            さらに、既存の派遣会社においても「人材を入れて終わり」「問題が起きててもフォローがない」など、対応面に大きな課題があり、安定した戦力にはなり得なかった。
          </p>
        </div>

        {/* Proposal Section */}
        <div className="mb-4">
          <h2 className="text-3xl font-bold mt-2 mb-2">弊社からのご提案</h2>
          <h3 className="text-lg font-semibold text-[#1AA4DD]">現場に寄り添うチーム派遣と徹底管理で差別化を実現</h3>
          <p className="text-sm mt-2">
            人材の定着と職場の文化や人間関係などの環境への適応を重視し、ネパール人留学生7名をチーム派遣としてご提案。
            さらに、英語話者である営業担当を現場の常駐管理者とし、工場内の業務管理・指導・勤怠管理・通訳・送迎までをすべて一括で対応。
            受け入れ体制全体をトータルで支援する体制を構築した。弊社では、ヒアリングシートを必ず記入し、契約関連も明確かつ丁寧に対応。
            就業時間、配属部署、製造内容、勤務内容をすべて事前に把握し、商談の段階から人材確保に着手。その結果、2週間での迅速な提案を実現した。
            こうした総合的な対応力とスピード感が、高い評価とスムーズな導入につながった。
          </p>
        </div>

        {/* Diagram Section */}
        <div className="mb-4 ">
          <div className=" p-4 rounded-lg item-center">
            <div className="flex  mb-4  justify-center">
              <span className="bg-[#01418a] text-white px-2 py-1 rounded-lg text-center">キャリアリンクファクトリーの常駐管理体制</span>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center rounded-lg border-2 border-[#01418a]">
                  <img src="/path/to/your/image.jpg" alt="Diagram" className="w-64 h-64" />
                </div>
                {/* <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                <div className="flex justify-around w-full">
                                    <div className="flex flex-col items-center">
                                        <UserIcon className="w-10 h-10 text-green-500" />
                                        <span className="text-xs">CLFにまるっとお任せ！</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <ChatAltIcon className="w-10 h-10 text-green-500" />
                                        <span className="text-xs">指導・教育</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <BriefcaseIcon className="w-10 h-10 text-green-500" />
                                        <span className="text-xs">通訳対応</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <CalendarIcon className="w-10 h-10 text-green-500" />
                                        <span className="text-xs">送迎対応</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <UsersIcon className="w-10 h-10 text-green-500" />
                                        <span className="text-xs">迅速な人材確保</span>
                                    </div>
                                </div>
                            </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div>
          <h2 className="text-3xl font-bold mt-2 mb-2">結果・効果</h2>
          <h3 className="text-lg font-semibold text-[#1AA4DD]">出勤率100%・3部署に拡大、信頼を生んだチーム派遣</h3>
          <p className="text-sm mt-2">
            初回発注では日々4名体制からスタートでしたが、1ヶ月後にはご評価をいただき、12名体制へと拡大。運用部署も1部署から3部署に増加し、現場全体での活用が進んだ。
            外国人派遣が初めてだったお客様にとっても、チーム派遣というサービスは直接スタッフに指導が出来るため、お客様に安心感を持っていただけた。
            また、ネパール人留学生のチーム派遣による責任感のある行動や高いリーダーシップ、熱意をご評価いただき、信頼してお任せいただく結果となった。
            営業担当は日勤帯の2部署を常駐管理者として運用し、作業指示や勤怠管理など、勤務外のフォローも徹底。これにより出勤率100%を実現し、社員の残業も解消。
            業務負担が大きく軽減された。さらに、全ての運用を弊社が一括で対応する体制が「安心して任せられる」と高く評価され、他社派遣に見られた「スタッフ任せ・態度の悪さ・挨拶なし」といった課題との明確な差別化につながった。
          </p>
        </div>
      </div>
      <div className="text-center mt-10 font-blod text-2xl">この事例を見た方はこんな事例も見ています</div>
      <div className="bg-white p-4 sm:p-8 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
        <div className="flex justify-center w-full col-span-full mt-6 gap-2">
          <Button style={{ background: '#019cd4', }} shape="round" type="primary" >選ばれる理由を詳しく見る</Button>
        </div>
      </div>

    </div>
  );
}
