// app/jbbc/service-introduction/page.tsx
'use client'
import { title } from "@/components/primitives";
import { useState ,useEffect, use} from "react";
import { Image } from "@heroui/image";
import Category from '@/components/servicesComponents/category';
// export const metadata = {
//   title: "Service Introduction | JBBC",
// };

export default function Page() {
  const [services, setServices] = useState([
    {
      image: "/home/introduce.png",
      title: "特定技能人材紹介",
    },
    {
      image: "/home/introduce.png",
      title: "高度人材紹介",
    },
    {
      image: "/home/introduce.png",
      title: "技能実習生受入支援",
    },
    {
      image: "/home/introduce.png",
      title: "留学生受入支援",
    },
    {
      image: "/home/introduce.png",
      title: "IT開発実績",
    },
    {
      image: "/home/introduce.png",
      title: "海外進出支援",
    },
  ]);
  const [categories, setCategories] = useState([
    {
      title: "建設",
      image: "/home/introduce.png",
      value: 'construction',
    
    },
    {
      title: "介護",
      image: "/home/introduce.png",
      value: 'nurse'
    },
    {
      title: "食品加工",
      image: "/home/introduce.png",
      value: 'foodProcessing'
    },
    {
      title: "自動車整備",
      image: "/home/introduce.png",
      value: 'carRepairing'
    },
    {
      title: "造船解体",
      image: "/home/introduce.png",
      value: 'shipbuilding'
    },
    {
      title: "塗装",
      image: "/home/introduce.png",
      value: 'coating'
    },
    {
      title: "IT",
      image: "/home/introduce.png",
      value: 'IT'
    },
    {
      title: "CAD/CAM",
      image: "/home/introduce.png",
      value: 'CAD'
    },
    {
      title: "物流",
      image: "/home/introduce.png",
      value: 'logistics'
    },
    {
      title: "物流",
      image: "/home/introduce.png",
      value: 'logistics'
    },
  ]);
  const [categoryVal, setCategoryVal] = useState(null);
  const [title,setTitle]=useState("サービス紹介");
  useEffect(() => { 
    console.log(categoryVal,"categoryVal");
    
  },[categoryVal])

  const changeCategory=(item:any)=>{
    setCategoryVal(item.value),
    setTitle(item.title)
  }
  
  return (
    <div className="bg-white">

      <div className="container mx-auto ">
        {/* Section Title */}
        <div className="flex flex-col items-start text-left">
          <span className="text-sm font-bold bg-blue-500 text-white px-2 py-1 rounded">service</span>
          <h1 className="text-4xl font-bold mt-4">{title}</h1>
          <p className="text-sm text-gray-500 mt-2">
            top / サービス紹介
          </p>
        </div>
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
        <Category categoryVal={categoryVal} />
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
            <div key={index} className="relative group " onClick={() => { changeCategory(category)  }}>
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
