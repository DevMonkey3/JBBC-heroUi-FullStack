// Content10.tsx
"use client";

import { Typography, Row, Col, Button, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // 引入图标
import React, { useState } from "react";

const Content10: React.FC = () => {
  const { Text, Title } = Typography;

  const [blogPosts] = useState([
    {
      title: '日本での生活：バングラデシュ人労働者の一日',
      description: '早朝の通勤から、清潔で効率的な職場、そして日本食を楽しみながら穏やかな夜を過ごすまで、このブログは、規律正しく、...',
      tag: 'ライフスタイル',
      image: '/home/blogPosts.png',
    },
    {
      title: '日本での生活：バングラデシュ人労働者の一日',
      description: '早朝の通勤から、清潔で効率的な職場、そして日本食を楽しみながら穏やかな夜を過ごすまで、このブログは、規律正しく、...',
      tag: 'ライフスタイル',
      image: '/home/20-The-Ultimate-Travel-Itinerary-Japan-body.jpg',
    },
    {
      title: '日本での生活：バングラデシュ人労働者の一日',
      description: '早朝の通勤から、清潔で効率的な職場、そして日本食を楽しみながら穏やかな夜を過ごすまで、このブログは、規律正しく、...',
      tag: 'ライフスタイル',
      image: '/home/Japan-travel-tips-photographer-flytographer-21-2846066585.jpeg',
    },
  ]);

  return (
    <div className="w-full bg-[#f0f8ff] px-4 py-8 md:py-10 mb-8">
      {/* 博客文章卡片区域 - 使用 Flex 布局实现水平滚动 */}
      <div className="flex items-center justify-center space-x-4 md:space-x-6 overflow-x-auto pb-4">
        {/* 左侧箭头按钮 */}
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          className="flex-shrink-0 bg-[#24D1F0] border-[#24D1F0] text-[#EDF8FC] hover:bg-[#1fc0df] hover:border-[#1fc0df] hover:text-white font-bold text-base w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md"
        />

        {/* 博客卡片列表 */}
        <div className="flex space-x-4 md:space-x-6">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              cover={
                <div className="relative">
                  <img
                    alt={post.title}
                    src={post.image}
                    className="w-64 md:w-80 h-48 md:h-56 object-cover rounded-lg" // 固定宽度和高度，适应不同屏幕
                  />
                  <div className="absolute top-3 left-4 bg-[#24D1F0] text-white py-1 px-3 rounded-full text-xs md:text-sm font-medium">
                    {post.tag}
                  </div>
                </div>
              }
              className="flex-shrink-0 w-64 md:w-80 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white" // 固定宽度
            >
              <div className="p-4">
                <Title level={4} className="!text-base md:!text-lg !m-0 mb-2 line-clamp-2">
                  {post.title}
                </Title>
                <Text className="text-sm md:text-base text-gray-600 line-clamp-3">
                  {post.description}
                </Text>
                <div className="mt-3 text-right">
                  <Button type="link" className="!p-0 !text-[#1AA4DD] hover:!text-[#178bc2]">
                    続きを読む
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 右侧箭头按钮 */}
        <Button
          shape="circle"
          icon={<RightOutlined />}
          className="flex-shrink-0 bg-[#24D1F0] border-[#24D1F0] text-[#EDF8FC] hover:bg-[#1fc0df] hover:border-[#1fc0df] hover:text-white font-bold text-base w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md"
        />
      </div>

      {/* 查看更多文章按钮 */}
      <Row justify="center" className="mt-6">
        <Col>
          <Button
            type="primary"
            shape="round"
            size="large"
            className="bg-[#EE6629] hover:bg-[#d95a20] border-none !px-6 !py-2 md:!px-8 md:!py-3 !text-base md:!text-lg"
          >
            記事一覧を見る →
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Content10;



