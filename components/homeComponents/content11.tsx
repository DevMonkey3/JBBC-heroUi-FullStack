// Content11.tsx
"use client";

import { Typography, Row, Col, Button, Image } from "antd";
import { RightOutlined } from "@ant-design/icons"; // 引入图标
import React, { useState } from "react";
import HeroCarousel from "@/components/hero/HeroCarousel";
import { getCdnUrl } from "@/config/cdn";

const Content11: React.FC = () => {
  const { Text, Title } = Typography;

  const [faqItems] = useState([
    {
      question: 'どうやって人材不足を解決するの？',
      id: 'faq1',
    },
    {
      question: '契約期間はきまっていますか？',
      id: 'faq2',
    },
    {
      question: '依頼からどのくらいで紹介してもらえるの？',
      id: 'faq3',
    },
    {
      question: '1名あたりの相場はどのくらいですか？',
      id: 'faq4',
    },
    {
      question: '外国籍スタッフは時間制限なく働けるの？',
      id: 'faq5',
    },
    {
      question: '就業後、なにかサポートやフォローはある？',
      id: 'faq6',
    },
  ]);

  return (
    <div className="w-full">
      <style jsx>{`
      .whiteTitle {
        font-family: 'Arial';
        font-size: 100px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        color: #eff6f9;
    }
      `}</style>
      {/* Company Section */}
      <div className="bg-[#f0f8ff] py-10 md:py-16 px-4 md:px-6 rounded-tl-[60px] rounded-br-[60px] w-11/12 md:w-4/5 mx-auto text-center mb-10 md:mb-16">
        <Button
          type="primary"
          shape="round"
          size="large"
          className="bg-[#EE6629] hover:bg-[#d95a20] border-none mb-4 md:mb-6 !px-6 !py-2 md:!px-8 md:!py-3 !text-base md:!text-lg"
          onClick={() => window.location.href = '/jbbc/Info'}
        >
          当社について
        </Button>
        <Title level={2} className="!text-2xl md:!text-3xl !m-0 mb-4 md:mb-6">
          会社情報
        </Title>
        <Text className="block text-base md:text-lg text-gray-700 max-w-3xl mx-auto text-left">
          ジャパンバングラブリッジ株式会社は、製造事業に特化した人材総合サービス会社です。
          日本は「モノづくり」の国として、日本の経済を支えてきた製造業、そんな「モノづくり」の現場と、すべてのはたらく人たちを繋ぐことが私たちの使命です。
        </Text>
      </div>

      {/* Compliance Section */}
      <Row justify="center" className="w-11/12 md:w-4/5 mx-auto -mt-10 md:-mt-16 z-10 relative">
        <Col xs={24} md={10} className="mb-6 md:mb-0">
          <Image
            src={getCdnUrl("/home/homeImg.avif")}
            preview={false}
            className="w-full h-auto rounded-tl-[60px] rounded-br-[60px] object-cover"
            alt="Building"
          />
        </Col>
        <Col xs={24} md={12} className="px-4 md:px-0 md:pl-6 flex flex-col justify-center">
          <Title level={1} className="!text-2xl md:!text-3xl !m-0 mb-4 md:mb-6 text-left">
            コンプライアンスへの取り組み
          </Title>
          <Text className="block text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-left">
            ジャパンバングラブリッジでは、労働関連法規ならびに当社事業に関わるすべての法令を遵守し、正常な商慣習と社会倫理に適合した企業活動に努めています。
          </Text>
          <Button
            shape="round"
            size="large"
            className="self-start bg-[#EE6629] hover:bg-[#d95a20] border-none !px-6 !py-2 md:!px-8 md:!py-3 !text-base md:!text-lg text-white"
            onClick={() => window.location.href = '/jbbc/Info'}
          >
            詳細はこちら →
          </Button>
        </Col>
      </Row>

      {/* Client Examples Section */}
      <div className="text-center my-10 md:my-16 px-4">
        <Title level={3} className="!text-xl md:!text-2xl !m-0 mb-6">
          ご利用企業様例
        </Title>
        <HeroCarousel />
      </div>

      {/* Problems Section */}
      <div className="bg-[#f0f8ff] py-10 md:py-16 px-4 md:px-10">
        <div className=" text-center text-gray-500 text-sm md:text-base mb-6 md:mb-8">
          Problems
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-11/12 md:w-4/5 mx-auto p-6 md:p-10">
          <Button
          style={{
            backgroundColor: "#EE6629",
            border: "none",
            color: "white",
            borderRadius: "0",
            marginTop: "20px",
          }}
            className="bg-[#EE6629] hover:bg-[#d95a20] border-none text-white rounded-none rounded-tr-[40px] rounded-br-[40px] !px-6 !py-3 md:!px-8 md:!py-4 !text-lg md:!text-xl font-bold mb-6 md:mb-0"
          >
            よくある質問
          </Button>
          <Row gutter={[16, 16]} className="flex-col md:flex-row">
            <Col xs={24} md={12} className="p-4 md:p-10">
              <Title level={1} className="!text-2xl md:!text-3xl !m-0 mb-4 md:mb-6 text-left">
                現場の悩み・経営課題をお聞かせください
              </Title>
              <Text className="block text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-left">
                人材不足から業務効率化まで、今抱えている課題を一緒に解決しませんか？
                まずは「よくあるご質問」をご覧ください。解決の糸口をご紹介します。
              </Text>
              <Button
                type="primary"
                shape="round"
                size="large"
                className="bg-[#EE6629] hover:bg-[#d95a20] border-none !px-6 !py-2 md:!px-8 md:!py-3 !text-base md:!text-lg flex items-center"
                onClick={() => window.location.href = '/jbbc/faq'}
              >
                質問の答えを見る <RightOutlined className="ml-2" />
              </Button>
            </Col>
            <Col xs={24} md={12} className="p-4 md:p-10">
              <ul className="list-none p-0 m-0">
                {faqItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center mb-4 p-3 border-2 border-[#1AA4DD40] rounded-[20px]"
                  >
                    <div className="bg-[#1AA4DD] text-white rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-sm md:text-base font-bold mr-3 flex-shrink-0">
                      ?
                    </div>
                    <span className="text-base md:text-lg text-gray-800 text-left">
                      {item.question}
                    </span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Content11;



