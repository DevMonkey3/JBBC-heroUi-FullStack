'use client'
import { usePathname } from 'next/navigation';
import { Navbar } from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="relative flex flex-col h-screen">
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? "container mx-auto max-w-7xl pt-16 px-6 flex-grow" : ''}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
