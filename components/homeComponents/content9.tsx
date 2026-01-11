// Content9.tsx
"use client";

import { Typography, Row, Col, Button, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // 引入图标
import React, { useState } from "react";

const Content9: React.FC = () => {
  const { Text, Title } = Typography;

  const [industries] = useState([
    {
      title: '建設業',
      description: '建設現場で即戦力となる外国人労働者を、迅速かつ簡単に、相場の約半分の価格で採用できます。',
      image: '/home/industries.avif',
    },
    {
      title: '長野相談室',
      description: 'ご自宅からでも相続の無料相談が可能です。ぜひご利用ください。           ',
      image: '/Driver/happy-professional-truck-driver-driving-his-truck-2025-03-17-11-28-31-utc.avif',
    },
    {
      title: '長野相談室',
      description: 'ご自宅からでも相続の無料相談が可能です。ぜひご利用ください。',
      image: '/HR Admin/business-gets-done-in-the-boardroom-2025-04-06-07-25-21-utc.avif',
    },
  ]);

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-8 md:py-12">
      {/* 主要内容区域 - 带边框和阴影的卡片 */}
      <div className="border border-gray-300 rounded-lg p-4 md:p-6 mb-10 bg-white">
        <Row gutter={[16, 16]} className="flex-col lg:flex-row">
          {/* 左侧文本和按钮 */}
          <Col xs={24} lg={8} className="p-4 md:p-5">
            <Text className="block mb-1 text-base">業種から</Text>
            <Title level={3} className="!text-[#1AA4DD] !m-0 !text-xl md:!text-2xl text-left mb-3">
              活用方法を知る
            </Title>
            <Text className="block mb-4 text-sm md:text-base">
              当社は、技能実習生・特定技能人材高度人材の採用を希望する企業と求職者を直接結ぶ、日本最大級の採用プラットフォームを運営しております。
            </Text>
            {/* 箭头按钮 */}
            <div className="flex justify-start space-x-4 mt-4">
              <Button
                shape="circle"
                icon={<LeftOutlined />}
                className="bg-[#EE6629] border-[#EE6629] text-[#EDF8FC] hover:bg-[#d95a20] hover:border-[#d95a20] hover:text-white font-bold text-base w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
              />
              <Button
                shape="circle"
                icon={<RightOutlined />}
                className="bg-[#EE6629] border-[#EE6629] text-[#EDF8FC] hover:bg-[#d95a20] hover:border-[#d95a20] hover:text-white font-bold text-base w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
              />
            </div>
          </Col>

          {/* 右侧卡片网格 */}
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              {industries.map((industry, index) => (
                <Col key={index} xs={24} sm={12} md={8}>
                  <Card
                    cover={
                      <img
                        alt={industry.title}
                        src={industry.image}
                        className="w-full h-40 md:h-48 object-cover rounded-t-lg" // 图片样式
                        loading="lazy"
                      />
                    }
                    className="w-full rounded-lg overflow-hidden border-none shadow-md" // 卡片整体样式
                  >
                    {/* 自定义标题区域 */}
                    <div className="bg-[#1AA4DD] text-white py-2 px-4 text-center text-base md:text-lg font-bold">
                      {industry.title}
                    </div>
                    {/* 自定义描述区域 */}
                    <div className="bg-[#eef7fb] p-3 md:p-4 min-h-[100px]"> {/* 设置最小高度以保持一致性 */}
                      <Text className="text-sm md:text-base text-gray-700">
                        {industry.description}
                      </Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>

      {/* 博客标题区域 */}
      <Row justify="center" className="mb-8">
        <Col span={24} className="text-center">
          <Text className="block mb-1 text-base md:text-lg">各種ブログ</Text>
          <Title level={3} className="!m-0 !text-xl md:!text-2xl mb-1">外国人人材なら当社へお任せ</Title>
          <Title level={3} className="!text-[#1AA4DD] !m-0 !text-xl md:!text-2xl mb-3">
            高度人材・特定技能人材ジャーナル
          </Title>
          <Text className="block text-sm md:text-base max-w-3xl mx-auto">
            人材派遣に関連する最新情報やトレンドを発信する「派遣ジャーナル」。人材派遣に関心のある方々に有益な情報を公開しています。
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default Content9;



