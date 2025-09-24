import React from 'react';

const ContactHero = () => {
  return (
    <div className="bg-blue-500 text-white min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-3xl w-full space-y-6">
        {/* 标题 */}
        <h1 className="text-2xl md:text-3xl font-bold">
          お問い合わせ
        </h1>

        {/* 副标题 */}
        <p className="text-lg md:text-xl">
          ご不明点やご質問などお気軽にご連絡ください。
        </p>

        {/* 电话号码 */}
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          TEL: 03-4306-1163
        </h2>

        {/* 悬浮提示气泡 */}
        <div className="relative inline-block mx-auto mt-4 mb-8">
          <div className="bg-red-500 text-white px-4 py-2 rounded-md text-sm md:text-base whitespace-nowrap">
            介護関連4種類のビザをわかりやすく解説
          </div>
          {/* 三角形箭头 */}
          <svg
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 fill-current text-red-500"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128 256L0 128h256z" />
          </svg>
        </div>

        {/* 按钮组 */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4">
          {[
            { label: 'お問い合わせ', icon: MailIcon },
            { label: '資料ダウンロード', icon: DownloadIcon },
            { label: 'セミナー・施設見学会', icon: EventIcon },
          ].map((item, index) => (
            <button
              key={index}
              className="bg-white text-blue-500 font-medium px-6 py-3 rounded-full flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-shadow min-w-[200px]"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 🎨 SVG Icons（内联组件，避免依赖图标库）
const MailIcon = ({ className }:any) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);

const DownloadIcon = ({ className }:any) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    ></path>
  </svg>
);

const EventIcon = ({ className }:any) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ></path>
  </svg>
);

export default ContactHero;
