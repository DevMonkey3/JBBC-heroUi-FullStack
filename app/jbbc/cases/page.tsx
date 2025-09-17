// app/jbbc/implementation-results/page.tsx
import { title } from "@/components/primitives";

export const metadata = {
  title: "Implementation results | JBBC",
};

export default function Page() {
  return (
    <main>
      <h1 className={title()}>Implementation results</h1>

      {/* Placeholder content */}
      <p className="mt-6 text-gray-600">
        （このページは準備中です）導入事例、数値実績、インタビューなどを掲載します。
      </p>
    </main>
  );
}
