'use client'
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";
import { Image } from "@heroui/image";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { usePathname } from 'next/navigation';

// import { Footer } from "antd/es/layout/layout";
// import Footer from "@/components/footer/Footer";
// export const metadata: Metadata = {
//   title: {
//     default: "JBBC",
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: [
//       { url: "/favicon.png" },
//       { url: "/favicon.png", type: "image/png" },
//     ],
//     apple: "/apple-touch-icon.png", 
//   },
// };

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
// };

export default function RootLayout({ children, }: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 判断是否是/admin下的页面
  const isAdminRoute = pathname.startsWith('/admin');
  console.log(isAdminRoute, "isAdminRoute");

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers >
          <div className="relative flex flex-col h-screen">

            {!isAdminRoute && <Navbar />}
            <main className={!isAdminRoute ?"container mx-auto max-w-7xl pt-16 px-6 flex-grow":''}>
              {children}
            </main>

            {!isAdminRoute && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  );
}
