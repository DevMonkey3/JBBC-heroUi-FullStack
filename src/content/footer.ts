export const featuresBanner = {
  eyebrow: "Features",
  title: "ジャパンバングラブリッジで特定技能人材を素早く、簡単に採用しませんか？",
  buttons: [
    { label: "資料ダウンロード", href: "/download" },
    { label: "お問い合わせ", href: "/contact" },
  ],
  images: [
    "HR Admin/business-people-2024-10-22-15-30-01-utc.avif",
    "HR Admin/proud-of-everything-weve-achieved-portrait-of-a-g-2025-04-06-10-55-08-utc.avif",
    "Garments/portrait-of-young-seamstress-using-sewing-machine-2025-04-04-21-11-54-utc.avif",
    "Construction Worker/professional-technician-engineer-with-safety-hard-2024-12-06-13-12-06-utc.avif",
    "Food Factory/staff-in-uniform-2025-03-14-11-07-34-utc.avif",
    "Delivery/express-delivery-service-courier-delivering-packa-2024-11-01-23-11-21-utc.avif",
    "Driver/female-forklift-truck-driver-outside-a-warehouse-2024-10-18-17-18-53-utc.avif",
    "Food Factory/male-worker-and-quality-control-manager-examining-2025-07-07-20-14-34-utc.avif",
    "Driver/young-happy-truck-driver-looking-at-camera-2024-12-13-16-50-18-utc.avif",
    "CAD CAM/men-s-hands-with-a-tablet-and-tools-2024-09-19-13-52-22-utc.avif",
    "CAD CAM/work-process-at-modern-plant-2025-03-09-18-38-50-utc.avif",
    "Garments/happy-black-textile-worker-cutting-fabric-with-a-m-2024-12-13-20-45-06-utc.avif",
  ],
} as const;

export const newsletter = {
  titlePrefix: "JBBC",
  title: "の最新情報を常にご確認ください",
  placeholder: "メールアドレスを入力してください",
  submit: "送信",
  success: "ニュースレターの購読が完了しました！",
  duplicate: "このメールアドレスは既に登録されています",
  error: "購読に失敗しました。時間をおいて再度お試しください。",
} as const;

export const contactBlock = {
  title: "お問い合わせ",
  lead: "ご不明点やご質問などお気軽にご連絡ください。",
  tel: "03-6279-1289",
  bubble: "介護関連4種類のビザをわかりやすく解説",
  buttons: [
    { label: "お問い合わせ", href: "/contact", icon: "mail" },
    { label: "資料ダウンロード", href: "/download", icon: "download" },
    { label: "セミナー・施設見学会", href: "/seminar", icon: "calendar" },
  ],
} as const;

export const footerAbout = {
  name: "Japan Bangla Bridge Company（JBBC）",
  description:
    "特にバングラデシュをはじめとする海外の優秀な人材を日本でのキャリア機会に結びつけることに特化した企業です。",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/JBBRAbd", icon: "home/facebook.avif" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/japanbanglabridge/",
      icon: "home/instagram.avif",
    },
  ],
} as const;
