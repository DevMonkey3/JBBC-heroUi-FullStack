// Content2.tsx
"use client";

import { Card } from "@heroui/card";
import { useState } from "react";
import { Typography } from "antd";

const Content2: React.FC = () => {
  const { Text } = Typography;

  const [content2] = useState([
    { title: '受入企業', content: '300+' },
    { title: '就職者 登録人数', content: '10K+' },
    { title: '利用者', content: '2K+' },
    { title: '求人募集中', content: '300+' },
  ]);

  return (
      <div className="w-full max-w-6xl px-4">
        {/* 浅蓝背景容器 */}
        <div className="bg-[#EDF8FC] rounded-lg p-4 md:p-6 shadow-sm">
          {/* 响应式网格：手机1列，平板2列，桌面4列 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {content2.map((item, index) => (
              <Card
                key={index}
                
                className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center custom-card"
              >
                {/* 数字 */}
                <Text
                  strong
                  style={{ color: '#EE6629', fontSize: '2rem', lineHeight: 1.2 }}
                  className="block text-4xl md:text-5xl font-extrabold"
                >
                  {item.content}
                </Text>
                {/* 标题 */}
                <Text
                  className="block mt-2 text-base font-medium text-gray-700"
                >
                  {item.title}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Content2;
