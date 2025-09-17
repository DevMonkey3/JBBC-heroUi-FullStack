// app/jbbc/service-introduction/page.tsx
import { title } from "@/components/primitives";

export const metadata = {
  title: "Service Introduction | JBBC",
};

export default function Page() {
  return (
    <main>
      <h1 className={title()}>Service Introduction</h1>

      {/* Placeholder content – replace with your components/sections later */}
      <p className="mt-6 text-gray-600">
        （このページは準備中です）サービスの概要、対象、強み、導入フローなどを掲載します。
      </p>
    </main>
  );
}
