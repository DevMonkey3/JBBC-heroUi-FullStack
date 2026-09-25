"use client";

import { lazy, Suspense, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

// The drawer library is only downloaded the first time the menu is opened,
// so desktop visitors and first paint never pay for it.
const MobileDrawer = lazy(() =>
  import("@/components/site/mobile-drawer").then((m) => ({ default: m.MobileDrawer })),
);

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="メニュー"
        aria-expanded={open}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
      >
        <Menu className="size-5" />
      </Button>
      {loaded && (
        <Suspense fallback={null}>
          <MobileDrawer open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </>
  );
}
