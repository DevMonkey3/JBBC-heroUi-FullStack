// Content12.tsx
"use client";

import React from "react";
import { Typography, Row, Col, Button, Image, Input } from "antd";
import Marquee from "@/components/animation/Marquee"; // seamless GPU marquee

const Footer: React.FC = () => {
  const { Text, Title } = Typography;
  const { Search } = Input;

  
  // Marquee duplicates the list internally for a perfect loop.
  const marqueeImages: string[] = [
    "HR Admin/asian-businesswoman-leading-meeting-explaining-ch-2025-02-12-01-27-11-utc.avif",
    "Driver/portrait-of-a-indian-truck-driver-2025-03-15-15-24-57-utc.avif",
    "Caregiver/portrait-of-female-nurse-smiling-and-holding-clipb-2025-03-18-07-40-02-utc.avif",
    "CAD CAM/work-process-at-modern-plant-2025-03-09-18-38-50-utc.avif",
    "Aviation/signalman-in-headphones-looking-into-the-distance-2024-10-18-09-32-38-utc.avif",
    "Agriculture/workers-on-the-farmland-for-growing-snails-2025-03-17-23-43-17-utc.avif",
  ];
  const marqueeImages2: string[] = [
    "Agriculture/multi-generational-farmer-team-holding-wood-boxes-2025-02-21-12-49-02-utc.avif",
    "Caregiver/women-senior-or-physiotherapy-help-with-dumbbell-2025-04-06-09-23-29-utc.avif",
    "Aviation/woman-engineer-in-white-hardhat-standing-and-holdi-2024-12-19-19-32-58-utc.avif",
    "CAD CAM/two-interior-designers-working-in-the-office-2025-03-15-04-17-05-utc.avif",
    "Food Factory/from-our-table-to-yours-2025-04-06-11-41-12-utc.avif",
    "Software Engineer/portrait-of-smiling-engineer-checking-event-logs-o-2025-02-20-01-10-07-utc.avif",
  ];
  const marqueeImages3: string[] = [
    "Aviation/signalman-in-headphones-looking-into-the-distance-2024-10-18-09-32-38-utc.avif",
    "Food Factory/female-worker-checking-quality-of-fruit-juice-drin-2024-12-02-16-13-39-utc.avif",
    "Software Engineer/make-creativity-a-job-2025-04-06-09-51-53-utc.avif",
    "Caregiver/nurse-on-home-visit-greeting-senior-man-over-shou-2024-10-19-06-33-49-utc.avif",
    "CAD CAM/working-on-architectural-design-using-digital-tool-2025-03-10-07-42-29-utc.avif",
    "Agriculture/workers-on-the-farmland-for-growing-snails-2025-03-17-23-43-17-utc.avif",
  ];

  return (
    <div className="font-sans">
      {/* ===== Banner / Tokuty-style marquee ===== */}
      {/* CHANGED: bg from black to light blue (bg-sky-50) */}
      <div className="relative w-full bg-sky-50">
        {/* CHANGED: added tilt on each rail via rotate utility classes */}
        <div className="py-10 space-y-6 opacity-80">
          <div className="-rotate-[3deg]">
            <Marquee
              images={marqueeImages}
              speed={40}
              height={160}
              width={280}
              gap={16}
              rounded={14}
            />
          </div>
          <div className="rotate-[-3deg]">
            <Marquee
              images={marqueeImages2}
              reverse
              speed={42}
              height={160}
              width={280}
              gap={16}
              rounded={14}
            />
          </div>
          <div className="-rotate-[3deg]">
            <Marquee
              images={marqueeImages3}
              speed={44}
              height={160}
              width={280}
              gap={16}
              rounded={14}
            />
          </div>
        </div>

        {/* CHANGED: overlay from black/40 to white/40 to suit light background */}
        <div className="pointer-events-none absolute inset-0 bg-white/40" />

        {/* CHANGED: text color from white to slate-900; buttons to outlined light-blue */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-900 px-4">
          <Text className="block text-base md:text-lg mb-2 opacity-90">
            Features
          </Text>
          <div className="text-xl md:text-2xl lg:text-3xl !mb-6 max-w-4xl mx-auto">
            ジャパンバングラブリッジで特定技能人材を素早く、簡単に採用しませんか？
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
            <Button
              shape="round"
              size="large"
              // CHANGED: button style to light-blue outline
              className="!text-[#1AA4DD] !border-[#1AA4DD] bg-white hover:!bg-[#e6f7ff] px-8 font-semibold"
            >
              資料ダウンロード
            </Button>
            <Button
              shape="round"
              size="large"
              // CHANGED: button style to light-blue outline
              className="!text-[#1AA4DD] !border-[#1AA4DD] bg-white hover:!bg-[#e6f7ff] px-8 font-semibold"
            >
              お問い合わせ
            </Button>
          </div>
        </div>
      </div>

      {/* ===== Newsletter ===== */}
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
            />
          </div>
        </div>
      </div>

      {/* ===== Footer columns ===== */}
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
