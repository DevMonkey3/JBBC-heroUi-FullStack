// Content12.tsx
"use client";

import { Typography, Row, Col, Button, Image, Input } from "antd";
import { RightOutlined } from "@ant-design/icons";
import React from "react";
import ImageGrid from "@/components/animation/sliderAnimation";
const Footer: React.FC = () => {
  const { Text, Title } = Typography;
  const { Search } = Input;
  const images=[
    {
      src: '/home/computerIcon.png',
      alt: 'Image 1',
    },
    {
      src: '/home/computerIcon.png',
      alt: 'Image 2',
    },
    {
      src: '/home/computerIcon.png',
      alt: 'Image 3',
    },
    {
      src: '/home/computerIcon.png',
      alt: 'Image 4',
    },
  
    {
      src: '/home/computerIcon.png',
      alt: 'Image 4',
    },
    {
      src: '/home/computerIcon.png',
      alt: 'Image 1',
    },
    {
      src: '/home/computerIcon.png',
      alt: 'Image 2',
    },
    {
      src: '/home/computerIcon.png',
      alt: 'Image 3',
    },
    {
      src: '/home/computerIcon.png',
      alt: 'Image 4',
    },
  
    {
      src: '/home/computerIcon.png',
      alt: 'Image 4',
    },
  ]
  return (
    <div className="font-sans">

      {/* Banner Section */}
      <div className="relative w-full">
        <ImageGrid images={images.map(i => i.src)} />
        {/* <img
          src="/home/computerIcon.png"
          alt="Banner"
          className="w-full h-auto object-cover"
        /> */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 px-4">
          <Text className="block text-base md:text-lg mb-2">Features</Text>
          <div  className="text-xl md:text-2xl lg:text-3xl !text-white !mb-6 max-w-4xl mx-auto">
            ジャパンバングラブリッジで特定技能人材を素早く、簡単に採用しませんか？
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button
              shape="round"
              size="large"
              className="bg-[#EE6629] border-[#EE6629] text-white font-bold px-8"
            >
              資料ダウンロード
            </Button>
            <Button
              shape="round"
              size="large"
              className="bg-[#EE6629] border-[#EE6629] text-white font-bold px-8"
            >
              お問い合わせ
            </Button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8">
          <div className="text-center md:text-left max-w-xl">
            <Title level={1} className="!text-2xl md:!text-3xl lg:!text-4xl !mb-4">
              <span className="text-[#1AA4DD]">JBBC</span>の最新情報を常にご確認ください
            </Title>
          </div>
          <div className="w-full md:w-96">
            <Search
              placeholder="メールアドレスを入力してください"
              allowClear
              enterButton="送信"
              size="large"
              className="w-full"
              // onSearch={onSearch}
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-[#e6f7ff] py-12 px-4 md:px-10 lg:px-20">
        <Row gutter={[24, 24]} className="max-w-6xl mx-auto">
          {/* Company Info */}
          <Col xs={24} md={8}>
            <Image
              src="/home/jbbcIcon.png"
              alt="JBBC Logo"
              width={100}
              preview={false}
              className="mb-4"
            />
            <p className="text-sm leading-relaxed mb-6">
              <span className="font-bold">Japan Bangla Bridge Company（JBBC）</span>
              は、特にバングラデシュをはじめとする海外の優秀な人材を日本でのキャリア機会に結びつけることに特化した、信頼される採用・企業です。
            </p>
            <div className="flex space-x-6">
              <img src="/home/facebook.png" alt="Facebook" className="w-10" />
              <div className="w-10 h-10 rounded-full bg-[#4ea2d7] flex items-center justify-center">
                <img src="/home/play.png" alt="YouTube" className="w-6" />
              </div>
              <img src="/home/in.png" alt="LinkedIn" className="w-10" />
              <div className="w-10 h-10 rounded-full bg-[#4ea2d7] flex items-center justify-center">
                <img src="/home/instagram.png" alt="Instagram" className="w-6" />
              </div>
            </div>
          </Col>

          {/* Services */}
          <Col xs={12} md={5}>
            <h3 className="text-lg font-bold mb-4">サービス</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:underline">特定技能</a></li>
              <li><a href="#" className="text-sm hover:underline">高度人材</a></li>
              <li><a href="#" className="text-sm hover:underline">技能実習生</a></li>
              <li><a href="#" className="text-sm hover:underline">その他</a></li>
            </ul>
          </Col>

          {/* About Us */}
          <Col xs={12} md={5}>
            <h3 className="text-lg font-bold mb-4">当社について</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:underline">導入実績</a></li>
              <li><a href="#" className="text-sm hover:underline">セミナー</a></li>
              <li><a href="#" className="text-sm hover:underline">お役立ち資料</a></li>
              <li><a href="#" className="text-sm hover:underline">会社情報</a></li>
              <li><a href="#" className="text-sm hover:underline">採用情報</a></li>
            </ul>
          </Col>

          {/* More */}
          <Col xs={12} md={5}>
            <h3 className="text-lg font-bold mb-4">もっと</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:underline">FAQ</a></li>
              <li><a href="#" className="text-sm hover:underline">プライバシーポリシー</a></li>
            </ul>
          </Col>
        </Row>
      </div>

      {/* Copyright */}
      <div className="bg-[#1890ff] text-white text-center py-4 text-sm">
        Copyright © 2010-2025 Japan Bangla Bridge Corporation Ltd. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;