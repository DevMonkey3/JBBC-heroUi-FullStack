"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { mainNav, ctaNav } from "@/config/nav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

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
              onClick={() => setOpen(false)}
              className="hover:bg-muted rounded-md px-3 py-2 text-base font-medium"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t pt-4">
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href={ctaNav.inquiry.href} />}
            >
              {ctaNav.inquiry.label}
            </Button>
            <Button nativeButton={false} render={<Link href={ctaNav.download.href} />}>
              {ctaNav.download.label}
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
