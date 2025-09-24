
import Image from "next/image";
export const metadata = {
  title: "代表ご挨拶 | JBBC",
};

export default function CompanyMessage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Title */}
      <div className="mb-8">
        <p className="text-xs text-sky-600 font-semibold mb-2">info / 代表ご挨拶</p>
        <h1 className="text-2xl md:text-3xl font-bold">代表ご挨拶</h1>
        <div className="relative mt-6">
          <span className="pointer-events-none select-none text-[64px] md:text-[104px] font-extrabold text-sky-100 leading-none">
            Message
          </span>
        </div>
      </div>

      {/* Hero block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            架け橋を築き、未来を切り拓く
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            タハミド モイズル
            <br />
            東京商⼯会議所 会員 / リーダーシップクラブ会員
            <br />
            バングラデシュ情報⼯科企業家協会員 ほか
          </p>
          <p className="text-gray-700 leading-relaxed space-y-4">
            私たちJBBCは、「人・スキル・チャンス」を“橋”で結ぶことを使命に、日本と
            バングラデシュの双方に価値をもたらす人材・技術・ビジネスの循環をつくってきました。
            現場即戦力の人材供給から、現場定着・教育・コンプライアンスまで一気通貫で支援します。
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-200">
          <Image
            src="/home/Mask-group-4-1.png"
            alt="本社ビル"
  width={800}
  height={600}
  className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="mt-10 space-y-5 text-gray-700 leading-relaxed">
        <p>
          企業の“今”に本当に必要な支援を、成果から逆算してデザインする。これが私たちのやり方です。
          現場の声に寄り添い、スピードと品質を両立させた“使える支援”で、長く頼れるパートナーになります。
        </p>
        <p>
          これからもJBBCは、更なる進化を続けます。どうぞご期待ください。
        </p>
      </div>
    </main>
  );
}
