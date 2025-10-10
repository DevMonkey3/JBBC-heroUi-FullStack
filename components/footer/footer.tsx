"use client";

import React, { useState } from "react";
import { Typography, Row, Col, Button, Image as AntImage, Input, message } from "antd";
import Link from "next/link";
import Image from "next/image";

import Content12 from "./content12";

// Compute once at module load so SSR and client render match
const CURRENT_YEAR = new Date().getFullYear();

const Footer: React.FC = () => {
  const { Text, Title } = Typography;
  const { Search } = Input;
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (email: string) => {
    if (!email || !email.includes('@')) {
      message.error('有効なメールアドレスを入力してください');
      return;
    }

    setSubscribing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        message.success('ニュースレターの購読が完了しました！');
      } else if (res.status === 409) {
        message.warning('このメールアドレスは既に登録されています');
      } else {
        message.error(data.error || '購読に失敗しました');
      }
    } catch (error) {
      message.error('ネットワークエラーが発生しました');
    } finally {
      setSubscribing(false);
    }
  };

  // merged image list for seamless infinite scroll
  const allImages = [
    "/HR Admin/business-people-2024-10-22-15-30-01-utc.avif",
    "/HR Admin/proud-of-everything-weve-achieved-portrait-of-a-g-2025-04-06-10-55-08-utc.avif",
    "/Garments/portrait-of-young-seamstress-using-sewing-machine-2025-04-04-21-11-54-utc.avif",
    "/Construction Worker/professional-technician-engineer-with-safety-hard-2024-12-06-13-12-06-utc.avif",
    "/Food Factory/staff-in-uniform-2025-03-14-11-07-34-utc.avif",
    "/Delivery/express-delivery-service-courier-delivering-packa-2024-11-01-23-11-21-utc.avif",
    "/Driver/female-forklift-truck-driver-outside-a-warehouse-2024-10-18-17-18-53-utc.avif",
    "/Food Factory/male-worker-and-quality-control-manager-examining-2025-07-07-20-14-34-utc.avif",
    "/Driver/young-happy-truck-driver-looking-at-camera-2024-12-13-16-50-18-utc.avif",
    "/CAD CAM/men-s-hands-with-a-tablet-and-tools-2024-09-19-13-52-22-utc.avif",
    "/CAD CAM/work-process-at-modern-plant-2025-03-09-18-38-50-utc.avif",
    "/Garments/happy-black-textile-worker-cutting-fabric-with-a-m-2024-12-13-20-45-06-utc.avif",
    "/Garments/young-dressmaker-woman-sews-clothes-on-working-tab-2025-03-13-19-29-42-utc.avif",
    "/Construction Worker/home-improvements-while-building-new-condo-at-the-2025-02-15-16-41-02-utc.avif",
    "/Delivery/happy-indian-deliveryman-standing-near-car-holding-2025-04-02-19-28-16-utc.avif",
    "/Driver/young-indian-man-standing-by-his-truck-the-concep-2025-03-13-16-52-26-utc.avif",
    "/Aviation/man-signaling-the-pilot-with-marshalling-wands-2024-10-18-09-44-47-utc.avif",
    "/Food Factory/senior-female-worker-cleaning-and-check-for-dirt-g-2024-12-05-12-02-04-utc.avif",
  ];

  return (
    <div className="font-sans">
      {/* ===== Seamless Infinite Scroll Banner ===== */}
      <div className="relative w-full bg-sky-50 py-10 overflow-hidden">
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="flex gap-4 animate-scroll">
          {/* Duplicate images twice for seamless loop */}
          {[...allImages, ...allImages].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-80">
              <Image
                src={src}
                alt=""
                width={320}
                height={160}
                className="rounded-xl shadow-md h-40 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-white/40" />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-900 px-4 z-10">
          <Text className="block text-base md:text-lg mb-2 opacity-90">Features</Text>
          <div className="text-xl md:text-2xl lg:text-3xl mb-6 max-w-4xl mx-auto font-bold">
            ジャパンバングラブリッジで特定技能人材を素早く、簡単に採用しませんか？
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
            <Link href="/download">
              <Button
                shape="round"
                size="large"
                className="!text-[#1AA4DD] !border-[#1AA4DD] bg-white hover:!bg-[#e6f7ff] px-8 font-semibold"
              >
                資料ダウンロード
              </Button>
            </Link>
            <Link href="/jbbc/contact/inquiry">
              <Button
                shape="round"
                size="large"
                className="!text-[#1AA4DD] !border-[#1AA4DD] bg-white hover:!bg-[#e6f7ff] px-8 font-semibold"
              >
                お問い合わせ
              </Button>
            </Link>
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
              onSearch={handleSubscribe}
              loading={subscribing}
              disabled={subscribing}
            />
          </div>
        </div>
      </div>

      {/* ===== Contact Section ===== */}
      <Content12 />

      {/* ===== Footer Columns ===== */}
      <div className="bg-[#E4EFF4] py-16 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[32, 48]}>
            {/* Company Info */}
            <Col xs={24} sm={24} md={12} lg={8}>
              <div className="space-y-6">
                <AntImage
                  src="/home/jbbcIcon.png"
                  alt="JBBC Logo"
                  width={120}
                  height={120}
                  className="mb-4 filter brightness-110"
                />
                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="font-bold text-white text-base block mb-2">
                    Japan Bangla Bridge Company（JBBC）
                  </span>
                  特にバングラデシュをはじめとする海外の優秀な人材を日本でのキャリア機会に結びつけることに特化した企業です。
                </p>

                {/* Contact Info */}
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#1AA4DD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:03-6279-1289" className="hover:text-[#1AA4DD] transition-colors">
                      TEL: 03-6279-1289
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#1AA4DD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@jbbc.co.jp" className="hover:text-[#1AA4DD] transition-colors">
                      info@jbbc.co.jp
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#1AA4DD] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="flex-1">〒100-0005 東京都千代田区丸の内1-1-1</span>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-center gap-4 pt-4">
                  <span className="text-white font-semibold text-sm">Follow Us:</span>
                  <div className="flex gap-3">
                    <a href="https://www.facebook.com/JBBRAbd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1AA4DD] hover:bg-[#1890ff] flex items-center justify-center transition-all hover:scale-110">
                      <AntImage src="/home/facebook.png" alt="Facebook" width={20} height={20} className="w-5" preview={false} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#1AA4DD] hover:bg-[#1890ff] flex items-center justify-center transition-all hover:scale-110">
                      <AntImage src="/home/play.png" alt="YouTube" width={20} height={20} className="w-5" preview={false} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#1AA4DD] hover:bg-[#1890ff] flex items-center justify-center transition-all hover:scale-110">
                      <AntImage src="/home/in.png" alt="LinkedIn" width={20} height={20} className="w-5" preview={false} />
                    </a>
                    <a href="https://www.instagram.com/japanbanglabridge/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1AA4DD] hover:bg-[#1890ff] flex items-center justify-center transition-all hover:scale-110">
                      <AntImage src="/home/instagram.png" alt="Instagram" width={20} height={20} className="w-5" preview={false} />
                    </a>
                  </div>
                </div>
              </div>
            </Col>

            {/* Services */}
            <Col xs={12} sm={12} md={6} lg={5}>
              <div className="space-y-4">
                <h3 className="text-white text-lg font-bold mb-6 pb-2 border-b-2 border-[#1AA4DD]">
                  サービス
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/jbbc/services" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      特定技能
                    </Link>
                  </li>
                  <li>
                    <Link href="/jbbc/services" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      高度人材
                    </Link>
                  </li>
                  <li>
                    <Link href="/jbbc/services" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      技能実習生
                    </Link>
                  </li>
                  <li>
                    <Link href="/jbbc/services" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      その他
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Company */}
            <Col xs={12} sm={12} md={6} lg={5}>
              <div className="space-y-4">
                <h3 className="text-white text-lg font-bold mb-6 pb-2 border-b-2 border-[#1AA4DD]">
                  会社案内
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/jbbc/Info" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      会社情報
                    </Link>
                  </li>
                  <li>
                    <Link href="/jbbc/cases" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      導入実績
                    </Link>
                  </li>
                  <li>
                    <Link href="/jbbc/about" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      JBBCについて
                    </Link>
                  </li>
                  <li>
                    <Link href="/jbbc/Info" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      採用情報
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Resources */}
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className="space-y-4">
                <h3 className="text-white text-lg font-bold mb-6 pb-2 border-b-2 border-[#1AA4DD]">
                  お役立ち情報
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/seminar" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      セミナー・イベント
                    </Link>
                  </li>
                  <li>
                    <Link href="/download" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      資料ダウンロード
                    </Link>
                  </li>
                  <li>
                    <Link href="/jbbc/faq" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      よくある質問
                    </Link>
                  </li>
                  <li>
                    <Link href="/jbbc/contact/inquiry" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      お問い合わせ
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/privacy" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      プライバシーポリシー
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal/terms" className="text-gray-300 text-sm hover:text-[#1AA4DD] hover:pl-2 transition-all flex items-center gap-2 group">
                      <span className="text-[#1AA4DD] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                      利用規約
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          {/* Divider */}
          <div className="border-t border-gray-700 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link href="/legal/privacy" className="hover:text-[#1AA4DD] transition-colors">プライバシーポリシー</Link>
              <span className="hidden md:inline">|</span>
              <Link href="/legal/terms" className="hover:text-[#1AA4DD] transition-colors">利用規約</Link>
              <span className="hidden md:inline">|</span>
              <Link href="/jbbc/contact/inquiry" className="hover:text-[#1AA4DD] transition-colors">お問い合わせ</Link>
            </div>
            <p className="text-center md:text-right">
              © {CURRENT_YEAR} Japan Bangla Bridge Corporation Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
