// Content8.tsx
"use client";

import { Typography, Row, Col, Button, Image } from "antd";
import React, { useState } from "react";

const Content8: React.FC = () => {
  const { Text, Title } = Typography;

  const [reasons2] = useState([
    {
      title: '信頼と実績',
      description: '日・バングラ間の豊富な実績で安心のサポートを提供。',
    },
    {
      title: '超迅速な人材供給力',
      description: '急なニーズにも即対応。スピードと精度で人材をご紹介。',
    },
    {
      title: '外国人材の導入安心支援',
      description: '専任チームが生産性向上を支援。現場管理や教育を徹底し、安定した人材運用を実現します。',
    },
    {
      title: '辞めない若手を確保できる',
      description: '外国籍の学生の受け入れを支援。採用から定着まで丁寧にサポートします。',
    },
    {
      title: '安全第一、未来への責任',
      description: '「安全第一」を掲げ、現場のリスク管理を徹底し、すべてのスタッフが安心して働ける環境を提供します。',
    },
    {
      title: '的確なマッチング',
      description: '求めるスキル・人物像に合致した候補者を厳選。',
    },
  ]);

  return (
    <div className="w-full bg-[#eef7fb] px-4 md:px-10 lg:px-20 py-8 md:py-12">
      {/* 第一行内容 */}
      <Row justify="center" align="middle" className="mb-8 md:mb-12">
        <Col xs={24} md={8} className="mb-6 md:mb-0 md:pr-6">
          <Text className="block text-base md:text-lg mb-2">当社ジャパンバングラブリッジの特長</Text>
          <h2 className="text-xl md:text-2xl font-bold mb-1">リピートいただく</h2>
          <div className="text-[#ff4d4f] text-xl md:text-2xl font-bold">6つの理由</div>
        </Col>
        <Col xs={24} md={16}>
          <Text className="block text-left text-base md:text-lg mb-3">
            私たちは単なる人材紹介会社ではありません。日本での成功した生活を築くための信頼できるパートナーです。
          </Text>
          <Text className="block text-left text-base md:text-lg">
            実績あるサポート体制、個別対応、そして確かな解決力で、JBBCはあなたの「日本での夢」
            を現実にする場所です。
          </Text>
        </Col>
      </Row>

      {/* 第二行内容 - Reason列表和图片 */}
      <Row justify="center" align="top" gutter={[24, 24]} className="mb-8">
        <Col  xs={24} lg={12}>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            {reasons2.map((item, index) => (
              <div key={index} className="Home_page_content8_reasonItem">
                <div className="inline-block bg-[#4da2d7] text-white py-1 px-3 rounded-r-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-2">
                  Reason {String(index + 1).padStart(2, '0')}
                </div>
                <Title level={4} className="!text-base md:!text-lg font-bold !mb-1 !mt-0">{item.title}</Title>
                <Text className="block text-sm md:text-base text-gray-600">{item.description}</Text>
              </div>
            ))}
          </div>
        </Col>
        <Col  xs={24} lg={10} className="flex flex-col items-center">
          <div className="text-[100px] md:text-[120px] lg:text-[150px] font-bold text-[#fff] leading-none mb-4 self-start">
            Reason
          </div>
          <Image
            src="/home/Home_page_content8_personImage.png"
            alt="Person"
            preview={false}
            className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-tl-[60px] rounded-tr-none rounded-br-[60px] rounded-bl-none shadow-lg object-cover h-auto"
          />
        </Col>
      </Row>

      {/* 按钮 */}  
      <div className="text-center mt-6">
        <Button
          type="primary"
          shape="round"
          size="large"
          className="bg-[#EE6629] hover:bg-[#d95a20] border-none !px-6 !py-2 md:!px-8 md:!py-3 !text-base md:!text-lg"
        >
          6つ理由の詳細一覧を見る →
        </Button>
      </div>
    </div>
  );
};

export default Content8;



