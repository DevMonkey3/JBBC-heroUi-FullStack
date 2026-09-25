"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { mainNav } from "@/config/nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HeaderCta } from "@/components/site/header-cta";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="メニュー" />}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetTitle className="sr-only">メニュー</SheetTitle>
        <nav className="mt-8 flex flex-col gap-1" aria-label="モバイルナビゲーション">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="hover:bg-muted rounded-md px-3 py-2 text-base font-medium"
            >
              {item.label}
            </Link>
          ))}
          <HeaderCta className="mt-4 flex-col items-stretch border-t pt-4" onNavigate={close} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
