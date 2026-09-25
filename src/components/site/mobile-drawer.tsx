"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { HeaderCta } from "@/components/site/header-cta";
import { NavLinks } from "@/components/site/nav-links";

export function MobileDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
