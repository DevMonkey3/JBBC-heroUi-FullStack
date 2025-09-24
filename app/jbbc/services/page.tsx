// app/jbbc/service-introduction/page.tsx
'use client'
import { title } from "@/components/primitives";
import { useState, useEffect, use } from "react";
import { Image } from "@heroui/image";
import {CategoryCom} from '@/components/servicesComponents/category';
// export const metadata = {
//   title: "Service Introduction | JBBC",
// };
import Breadcrumbs from "@/components/breadcrumb/page";
import BgFont from "@/components/bgFont/BgFont";
export default function Page() {
  const [services, setServices] = useState([
    {
      image: "/services/1. SSW.avif",
      title: "特定技能人材紹介",
    },
    {
      image: "/services/2.international hiring.avif",
      title: "高度人材紹介",
    },
    {
      image: "/services/3.TITP.avif",
      title: "技能実習生受入支援",
    },
    {
      image: "/services/4.overseas study.avif",
      title: "留学生受入支援",
    },
    {
      image: "/services/5.IT engineer.avif",
      title: "IT開発実績",
    },
    {
      image: "/services/6.overseas consulting.avif",
      title: "海外進出支援",
    },
  ]);
  const [categories, setCategories] = useState([
    {
      title: "建設",
      image: "/Construction Worker/construction-workers-measuring-building-2025-04-05-05-23-22-utc.avif",
      value: 'construction',

    },
    {
      title: "介護",
      image: "/Caregiver/happy-senior-woman-at-wheelchair-spending-time-out-2024-10-18-09-49-41-utc.avif",
      value: 'nurse'
    },
    {
      title: "食品加工",
      image: "/home/introduce.png",
      value: 'foodProcessing'
    },
    {
      title: "自動車整備",
      image: "/Food Factory/female-worker-checking-quality-of-fruit-juice-drin-2024-12-02-16-13-39-utc.avif",
      value: 'carRepairing'
    },
    {
      title: "造船解体",
      image: "/Ship Breaking/shipbuilders-at-work-in-bangladesh-2025-01-10-03-53-52-utc.avif",
      value: 'shipbuilding'
    },
    {
      title: "塗装",
      image: "/Garments/happy-female-dressmaker-working-with-sewing-machin-2025-03-13-19-29-43-utc.avif",
      value: 'coating'
    },
    {
      title: "IT",
      image: "/Software Engineer/image-of-smiling-unshaven-programmer-man-working-w-2025-02-14-15-35-32-utc.avif",
      value: 'IT'
    },
    {
      title: "CAD/CAM",
      image: "/CAD CAM/digital-designer-creating-3d-model-of-house-2025-03-07-05-14-21-utc.avif",
      value: 'CAD'
    },
    {
      title: "物流",
      image: "/Delivery/express-delivery-service-courier-delivering-packa-2024-11-01-23-11-21-utc.avif",
      value: 'Deelivery'
    },
    {
      title: "物流",
      image: "/HR Admin/confident-hispanic-business-woman-in-office-2025-07-14-15-14-58-utc.avif",
      value: 'HR Admin'
    },
  ]);
  const [categoryVal, setCategoryVal] = useState(null);
  const [title, setTitle] = useState("サービス紹介");
  useEffect(() => {
    console.log(categoryVal, "categoryVal");

  }, [categoryVal])

  const changeCategory = (item: any) => {
    setCategoryVal(item.value),
      setTitle(item.title)
  }

  const [breadcrumbData, setBreadcrumbData] = useState<any>([
    {
      key: "top",
      title: <span style={{ color: "#019cd4" }}>top</span>,
      // path: '/jbbc/contact/inquiry',
    },
    {
      key: "inquiry",
      title: "サービス紹介",
      // path: '/jbbc/contact/inquiry',
    },
  ]);

  return (
    <div className="bg-white">

      <div className="container mx-auto ">
        {/* Section Title */}
        <Breadcrumbs
          breadcrumb={breadcrumbData}
          pageTitle={'service'}
          breadcrumbTitle={breadcrumbData[breadcrumbData.length - 1].title}
        />
        <BgFont textBg={'service'} title={'あらゆるニーズに応えるサービス群'} />
        {/* <div className="flex flex-col items-start text-left">
          <span className="text-sm font-bold bg-blue-500 text-white px-2 py-1 rounded">service</span>
          <h1 className="text-4xl font-bold mt-4">{title}</h1>
          <p className="text-sm text-gray-500 mt-2">
            top / サービス紹介
          </p>
        </div> */}
      </div>
      {(!categoryVal) ? <>
        {/* Section Title */}
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mt-8">
              あらゆるニーズに応えるサービス群
            </h2>
            <p className="text-sm  mt-4 max-w-lg mx-auto">
              お客様ごとにオーダーメイドのご提案を。積み重ねてきた多彩な「現場ノウハウ」が、人材不足の課題を解決いたします。
            </p>
          </div>
        </div>
      </> : <>
        <CategoryCom categoryVal={categoryVal} />
      </>}

      {/* Services Grid */}
      <div className="container mx-auto px-6 py-10 bg-[#e8f6fa]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white  overflow-hidden shadow-md p-4">
              <Image src={service.image} alt={service.title} width={350} height={200} className="w-full h-48 object-cover mb-4 " />
              <div className="bg-[#029dd5] text-white text-center p-2">
                {service.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-6 py-10">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-xl font-bold mb-2">Category</h2>
          <h1 className="text-3xl font-bold">特定分野から導入事例を見る</h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
          {categories.map((category: any, index) => (
            <div key={index} className="relative group " onClick={() => { changeCategory(category) }}>
              <Image src={category.image} alt={category.title} width={200} height={150} className="w-full h-full object-cover rounded-2lg rounded-xl" />
              <div className="z-10 absolute top-1  flex items-center justify-between 
                       px-3 py-3  
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white" >{category.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[120] left-42 h-5 w-5 text-white font-bold border-2 border-white rounded-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
