"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HeaderCta } from "@/components/site/header-cta";
import { NavLinks } from "@/components/site/nav-links";

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
        <div className="mt-8 flex flex-col gap-4">
          <NavLinks
            className="flex flex-col gap-1"
            linkClassName="hover:bg-muted rounded-md px-3 py-2 text-base"
            onNavigate={close}
          />
          <HeaderCta className="flex-col items-stretch border-t pt-4" onNavigate={close} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
