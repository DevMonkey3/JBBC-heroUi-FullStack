// Content5.tsx
"use client";

import { Image, Typography, Button, Row, Col } from "antd";
import { useState } from "react";
import HeroCarousel from "../hero/HeroCarousel";

const Content5: React.FC = () => {
  const { Text, Title } = Typography;

  const [achievements] = useState([
    {
      image: '/home/solve.png',
      industryText: '業界・業種',
      industry: 'バイク製造の大手企業',
      departmentText: '部門・職種',
      department: 'バイク製造工程における溶接・組立',
      employeesText: '従業員数',
      employees: '1,000名以上',
    },
    {
      image: '/Garments/dressmaker-woman-sews-clothes-on-sewing-machine-in-2025-03-18-20-17-44-utc.avif',
       industryText: '業界・業種',
  industry: 'アパレル・縫製業',
  departmentText: '部門・職種',
  department: '衣服製造工程における縫製・仕上げ',
  employeesText: '従業員数',
  employees: '500名以上',
    },
    {
      image: '/home/Mask-group-4.png',
      industryText: '業界・業種',
  industry: '建設業',
  departmentText: '部門・職種',
  department: '建築工事における溶接・組立',
  employeesText: '従業員数',
  employees: '1,000名以上',
    },
  ]);

  const [points] = useState([
    '日本在住歴、勤務歴あり外国人材',
    '採用~採用後も安心のサポート',
    'インターンからの特定技能採用',
    '留学生派遣からの特定技能採用',
    'オーダーメイド人材の採用',
    '安心のコンプライアンス',
  ]);

  return (
    <div>
      
    <div className="mx-auto py-10 px-4 max-w-7xl">
      
      {/* 第一部分：解决实绩 */}
      <Title level={2} className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-4">
        解決してきた実績があります
      </Title>
      <Text className="text-center block text-gray-600 mb-8 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
        現在の日本の製造業には外国籍人材の活用は欠かせないものとなっております。当社では、60カ国以上の多様なグローバル人材の派遣が可能です。長期での派遣を可能にするため、万全なサポート体制を準備しています。
      </Text>

      {/* 实绩卡片网格 */}
      <div className="bg-blue-50 rounded-xl p-6 mb-10">
        <Row gutter={[16, 24]} justify="center">
          {achievements.map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <div className="bg-white rounded-lg shadow-sm p-4 text-left">
                <Image
                  src={item.image}
                  alt="Achievement"
                  preview={false}
                  width="100%"
                  height={160}
                  className="rounded-lg object-cover mb-4"
                />
                <Text className="block text-sm md:text-base mb-2">
                  <span className="font-semibold text-blue-600">{item.industryText}</span>{' '}
                  {item.industry}
                </Text>
                <Text className="block text-sm md:text-base mb-2">
                  <span className="font-semibold text-blue-600">{item.departmentText}</span>{' '}
                  {item.department}
                </Text>
                <Text className="block text-sm md:text-base">
                  <span className="font-semibold text-blue-600">{item.employeesText}</span>{' '}
                  {item.employees}
                </Text>
              </div>
            </Col>
          ))}
        </Row>

        {/* 查看更多按钮 */}
        <div className="text-center mt-6">
          <Button
            type="primary"
            shape="round"
            className="bg-orange-500 hover:bg-orange-600 border-none text-white font-medium px-8 py-2"
            style={{ background: '#EE6629' }}
          >
            サービス一覧をみる &gt;
          </Button>
        </div>
      </div>

       {/* 第二部分：ご利用企業様例 */}
      <Title level={2} className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-6">
        ご利用企業様例
      </Title>
      <div className="relative w-full overflow-hidden mb-8 bg-white py-4 shadow-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* 复制两次以实现无缝滚动 */}
          {[...Array(2)].map((_, index) => (
            <Image
              key={`logo-${index}`}
              src="/home/logo.png" // 确保路径正确
              alt="企業ロゴ"
              preview={false}
              width={0}
              height={0}
              className="w-screen min-w-full h-auto object-contain block"
            />
          ))}
        </div>
      </div>

      {/* 6つのポイント */}
      <div className="bg-blue-50/60 rounded-xl p-6 md:p-8">
        <Row gutter={[24, 24]} align="middle">
          {/* 左侧图片 */}
          <Col xs={24} md={8}>
            <Image
              src="/home/leftside.jpg"
              alt="ポイント図解"
              preview={false}
              width="100%"
              height={350}
              className="rounded-lg object-cover"
            />
          </Col>

          {/* 右侧文字 + 列表 */}
          <Col xs={24} md={16}>
            <Row align="middle" className="mb-6">
              <Col>
                <span
                  className="text-5xl md:text-6xl font-bold text-orange-500 mr-3"
                  style={{ fontFamily: 'sans-serif' }}
                >
                  6
                </span>
              </Col>
              <Col>
                <Title level={3} className="text-orange-500 m-0 text-lg md:text-xl">
                  特定技能&外国人材
                </Title>
                <Title level={2} className="m-0 text-2xl md:text-3xl font-bold">
                  つのポイント
                </Title>
              </Col>
            </Row>

            {/* 优势列表 */}
            <ul className="space-y-3 pl-5 md:pl-8">
              {points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded-full mr-3 mt-0.5 flex-shrink-0"
                  >
                    ✓
                  </span>
                  <Text className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {point}
                  </Text>
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

export default Content5;
