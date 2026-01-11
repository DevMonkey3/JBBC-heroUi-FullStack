import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="flex flex-col items-center gap-6">
        {/* Logo with pulse animation */}
        <div className="relative animate-pulse">
          <Image
            src="/home/jbbcIcon.avif"
            alt="JBBC"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </div>

        {/* Spinning circle */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#1AA4DD] rounded-full animate-spin" />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-xl font-semibold text-[#1AA4DD] mb-1">読み込み中...</p>
          <p className="text-sm text-gray-500">しばらくお待ちください</p>
        </div>
      </div>
    </div>
  );
}
