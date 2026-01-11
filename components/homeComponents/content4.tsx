// Content4.tsx
"use client";

import { Image, Typography, Button, Row, Col } from "antd";
import { useState } from "react";

const Content4: React.FC = () => {
  const { Text, Title } = Typography;

  const [services] = useState([
     { image: "/home/introduce.avif", title: "特定技能人材紹介" },
  {
    image:
      "/Automation/indian-car-mechanic-standing-and-working-in-servic-2025-03-15-20-56-19-utc.avif",
    title: "高度人材紹介",
  },
  {
    image:
      "/Aviation/closeup-shot-of-a-white-airplane-landed-in-the-air-2025-02-09-06-46-58-utc.avif",
    title: "技能実習生受入支援",
  },
  {
    image:
      "/Software Engineer/young-programmer-working-on-desktop-pc-in-office-o-2025-03-25-12-53-58-utc.avif",
    title: "留学生受入支援",
  },
  ]);

  return (
    
    <div className="mx-auto py-10 px-8 rounded-xl bg-blue-100/20">
      {/* 标题 */}
      <Title level={2} className="text-center text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3">
        サービス紹介
      </Title>
      <Text className="text-center block text-gray-600 mb-8 text-sm md:text-base max-w-2xl mx-auto">
        各サービスの特長や解決方法、人材紹介開始までの詳細を各サービスごとにご紹介いたします。
      </Text>

      {/* 服务卡片网格 */}
      <Row gutter={[16, 32]} justify="center" className="max-w-6xl mx-auto">
        {services.map((service, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <div className="relative group">
              {/* 图片 */}
              <Image
                src={service.image}
                alt={service.title}
                preview={false}
                width="100%"
                height={180}
                className="rounded-lg object-cover w-full h-44 sm:h-48 md:h-44 lg:h-40"
              />

              {/* 左上角标签 */}
              <div
                className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full"
                style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
              >
                {service.title}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* 查看更多按钮 */}
      <div className="text-center mt-10">
        <Button
          type="primary"
          shape="round"
          className="bg-orange-500 hover:bg-orange-600 border-none text-white font-medium px-8 py-2 text-sm sm:text-base"
          style={{ background: "#EE6629" }}
          onClick={() => window.location.href = '/jbbc/services'}
        >
          サービス詳細一覧をみる &gt;
        </Button>
      </div>
    </div>
  );
};

export default Content4;