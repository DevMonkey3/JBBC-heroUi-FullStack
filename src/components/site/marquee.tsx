"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Horizontal marquee that only animates while on screen. Children must be
 * rendered twice by the caller so the track can scroll by half seamlessly.
 */
export function Marquee({
  className,
  speed = "normal",
  children,
}: {
  className?: string;
  speed?: "normal" | "slow";
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("marquee-running", entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("marquee-track", speed === "slow" && "marquee-slow", className)}>
      {children}
    </div>
  );
}
