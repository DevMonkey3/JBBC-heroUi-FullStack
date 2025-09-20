// components/navbar.tsx
"use client";
import { useRouter } from "next/navigation"; // 新增导入

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,

} from "@heroui/navbar";
import { Button, ButtonGroup } from "@heroui/button";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Image } from "@heroui/image";
import { MenuOutlined } from "@ant-design/icons";

export const Navbar = (props: any) => {
  // NEW: control mobile menu so we can close it after click
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
const router = useRouter(); // 新增

  const items = [
    { label: "ホーム", key: "Home", href: "/" },
    { label: "選ばれる理由", key: "inquiry", href: "/Why" },
    { label: "サービス紹介", key: "Service", href: "/jbbc/services" },
    { label: "導入実績", key: "Track_Record", href: "/jbbc/cases" },
    { label: "会社概要", key: "Profile", href: "/jbbc/Info" },
    { label: "セミナー", key: "Seminar", href: "/seminar" },
    { label: "ブログ", key: "Blog", href: "/blog" },
    { label: "お役立ち情報", key: "Information_Related", href: "/jbbc/faq" },
  ];

  return (
    <HeroUINavbar
      maxWidth="xl"
      // position="sticky"
      isMenuOpen={isMenuOpen}                // NEW
      onMenuOpenChange={(e) => { console.log(e, "KK"); }}       // NEW
      onChange={(e) => { console.log(e, "KK"); }}
    >
      <Image
        radius="none"
        width={120}
        height={90}
        className="topMenu_Icon 
             w-[80px] sm:w-[50px] md:w-[52px] lg:w-[100px]
             mt-9 lg:mt-10    /* 👈 移动端加一点下移，PC端覆盖为更大值 */
             lg:ml-5          /* 👈 左边距只在PC端生效 */
             cursor-pointer   /* 👈 添加这个！鼠标悬停时显示手型 */
             transition-all duration-300 ease-in-out"
        src="/home/jbbcIcon.png"
        alt="JBBC"
        onClick={()=>{
          // 导航到首页 '/'
          router.push('/');
          // 如果移动端菜单是打开状态，则关闭它
          if (isMenuOpen) {
            setIsMenuOpen(false);
          }
        }}
      />

      <NavbarContent style={{ justifyContent: 'end' }} className="basis-1/5 sm:basis-full justify-end" justify="center" >
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {items.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <ButtonGroup> */}
            <Button className="font-bold" as={NextLink} href="/jbbc/contact/inquiry" variant="bordered" color="warning">
              お問い合わせ
            </Button>
            <Button className="bg-[#f89834]  text-white">
              {/* <MenuOutlined /> */}
              download
            </Button>
          {/* </ButtonGroup> */}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle aria-label="メニューを開く" />
      </NavbarContent>

      {/* Mobile drawer */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {items.map((item) => (
            <NavbarMenuItem key={item.href} isActive={pathname === item.href}>
              {/* FIX: use NextLink + real href, and close the menu on click */}
              <NextLink
                href={item.href}
                className={clsx(
                  "w-full py-2 text-lg",
                  { "text-primary font-medium": pathname === item.href }
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}

          {/* mobile CTA */}
          <NavbarMenuItem>
            <NextLink
              href="/jbbc/contact/inquiry"
              className="w-full py-2 text-lg text-warning"
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </NextLink>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
