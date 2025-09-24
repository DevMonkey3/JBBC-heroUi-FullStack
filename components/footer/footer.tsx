"use client";

import React from "react";
import { Typography, Row, Col, Button, Image, Input } from "antd";

import Marquee from "@/components/animation/Marquee";
import Content12 from "./content12";
import Link from "next/link";

// Compute once at module load so SSR and initial client render match
const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  const { Text, Title } = Typography;
  const { Search } = Input;

  // Demo image lists (replace with your real image paths)
  const marqueeImages1 = [
    "/HR Admin/business-people-2024-10-22-15-30-01-utc.avif",
    "/HR Admin/proud-of-everything-weve-achieved-portrait-of-a-g-2025-04-06-10-55-08-utc.avif",
    "/Garments/portrait-of-young-seamstress-using-sewing-machine-2025-04-04-21-11-54-utc.avif",
    "/Construction Worker/professional-technician-engineer-with-safety-hard-2024-12-06-13-12-06-utc.avif",
    "/Food Factory/staff-in-uniform-2025-03-14-11-07-34-utc.avif",
    "/Delivery/express-delivery-service-courier-delivering-packa-2024-11-01-23-11-21-utc.avif",
  ];
  const marqueeImages2 = [
    "/Driver/female-forklift-truck-driver-outside-a-warehouse-2024-10-18-17-18-53-utc.avif",
    "/Food Factory/male-worker-and-quality-control-manager-examining-2025-07-07-20-14-34-utc.avif",
    "/Driver/young-happy-truck-driver-looking-at-camera-2024-12-13-16-50-18-utc.avif",
    "/CAD CAM/men-s-hands-with-a-tablet-and-tools-2024-09-19-13-52-22-utc.avif",
    "/CAD CAM/work-process-at-modern-plant-2025-03-09-18-38-50-utc.avif",
    "/Garments/happy-black-textile-worker-cutting-fabric-with-a-m-2024-12-13-20-45-06-utc.avif",
  ];
  const marqueeImages3 = [
    "/Garments/young-dressmaker-woman-sews-clothes-on-working-tab-2025-03-13-19-29-42-utc.avif",
    "/Construction Worker/home-improvements-while-building-new-condo-at-the-2025-02-15-16-41-02-utc.avif",
    "/Delivery/happy-indian-deliveryman-standing-near-car-holding-2025-04-02-19-28-16-utc.avif",
    "/Driver/young-indian-man-standing-by-his-truck-the-concep-2025-03-13-16-52-26-utc.avif",
    "/Aviation/man-signaling-the-pilot-with-marshalling-wands-2024-10-18-09-44-47-utc.avif",
    "/Food Factory/senior-female-worker-cleaning-and-check-for-dirt-g-2024-12-05-12-02-04-utc.avif",
  ];

  return (
    <div className="font-sans">
      {/* ===== Marquee Banner ===== */}
      <div className="relative w-full bg-sky-50">
        <div className="py-10 space-y-6 opacity-80">
          <div className="-rotate-[3deg]">
            <Marquee images={marqueeImages1} speed={40} height={160} width={280} gap={16} rounded={14} />
          </div>
          <div className="rotate-[-3deg]">
            <Marquee images={marqueeImages2} reverse speed={42} height={160} width={280} gap={16} rounded={14} />
          </div>
          <div className="-rotate-[3deg]">
            <Marquee images={marqueeImages3} speed={44} height={160} width={280} gap={16} rounded={14} />
          </div>
        </div>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-white/40" />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-900 px-4">
          <Text className="block text-base md:text-lg mb-2 opacity-90">Features</Text>
          <div className="text-xl md:text-2xl lg:text-3xl mb-6 max-w-4xl mx-auto">
            ジャパンバングラブリッジで特定技能人材を素早く、簡単に採用しませんか？
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
            <Button
              shape="round"
              size="large"
              className="!text-[#1AA4DD] !border-[#1AA4DD] bg-white hover:!bg-[#e6f7ff] px-8 font-semibold"
            >
              資料ダウンロード
            </Button>
            <Button
              shape="round"
              size="large"
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
            <Title level={1} className="!text-2xl md:!text-3xl lg:!text-4xl mb-4">
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

      {/* ===== Contact Section ===== */}
      <Content12 />

      {/* ===== Footer Columns ===== */}
      <div className="bg-[#e6f7ff] py-12 px-4 md:px-10 lg:px-20">
        <Row gutter={[24, 24]} justify="center">
          {/* Company Info */}
          <Col span={10}>
            <Image src="/home/jbbcIcon.png" alt="JBBC Logo" width={100} height={100} className="mb-4" />
            <p className="text-sm leading-relaxed mb-6">
              <span className="font-bold">Japan Bangla Bridge Company（JBBC）</span>
              は、特にバングラデシュをはじめとする海外の優秀な人材を日本でのキャリア機会に結びつけることに特化した企業です。
            </p>
            <div className="flex space-x-6">
              <Image src="/home/facebook.png" alt="Facebook" width={40} height={40} className="w-10" />
              <div className="w-10 h-10 rounded-full bg-[#4ea2d7] flex items-center justify-center">
                <Image src="/home/play.png" alt="YouTube" width={24} height={24} className="w-6" />
              </div>
              <Image src="/home/in.png" alt="LinkedIn" width={40} height={40} className="w-10" />
              <div className="w-10 h-10 rounded-full bg-[#4ea2d7] flex items-center justify-center">
                <Image src="/home/instagram.png" alt="Instagram" width={24} height={24} className="w-6" />
              </div>
            </div>
          </Col>

          {/* Services */}
          <Col span={4}>
  <h3 className="text-lg font-bold mb-4">サービス</h3>
  <ul className="space-y-3">
    <li><Link href="/jbbc/services/tokutei" className="text-sm hover:underline">特定技能</Link></li>
    <li><Link href="/jbbc/services/highly-skilled" className="text-sm hover:underline">高度人材</Link></li>
    <li><Link href="/jbbc/services/technical-intern" className="text-sm hover:underline">技能実習生</Link></li>
    <li><Link href="/jbbc/services/other" className="text-sm hover:underline">その他</Link></li>
  </ul>
</Col>

{/* About Us */}
<Col span={4}>
  <h3 className="text-lg font-bold mb-4">当社について</h3>
  <ul className="space-y-3">
    <li><Link href="/jbbc/cases" className="text-sm hover:underline">導入実績</Link></li>
    <li><Link href="/seminar" className="text-sm hover:underline">セミナー</Link></li>
    <li><Link href="/resources" className="text-sm hover:underline">お役立ち資料</Link></li>
    <li><Link href="/jbbc/Info" className="text-sm hover:underline">会社情報</Link></li>
    <li><Link href="/careers" className="text-sm hover:underline">採用情報</Link></li>
  </ul>
</Col>

{/* More */}
<Col span={3}>
  <h3 className="text-lg font-bold mb-4">もっと</h3>
  <ul className="space-y-3">
    <li><Link href="/jbbc/faq" className="text-sm hover:underline">FAQ</Link></li>
    <li><Link href="/legal/privacy" className="text-sm hover:underline">プライバシーポリシー</Link></li>
  </ul>
</Col>
        </Row>
      </div>

      {/* ===== Copyright ===== */}
      <div className="bg-[#1890ff] text-white text-center py-4 text-sm">
        {/* Seeded with CURRENT_YEAR to avoid SSR/CSR mismatch */}
        © {CURRENT_YEAR} Japan Bangla Bridge Corporation Ltd. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
