"use client";

import { useEffect, useState } from "react";
import { CdnImage } from "@/components/site/cdn-image";
import { hero } from "@/content/home";
import { cn } from "@/lib/utils";

const slideCount = hero.peoplePages.length + 1;

/**
 * Rotates through two grids of portrait photos and one wide image.
 * Every slide is in the DOM so the CDN images load once; only opacity changes.
 */
export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slideCount), hero.displayMs);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative" aria-live="polite">
      {hero.peoplePages.map((page, p) => (
        <div
          key={p}
          className={cn(
            "grid grid-cols-2 gap-3 transition-opacity duration-1000 md:grid-cols-4 md:gap-5",
            index === p ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
          )}
          aria-hidden={index !== p}
        >
          {page.map((path, i) => (
            <div
              key={path}
              className={cn(
                "relative aspect-[3/4] overflow-hidden rounded-xl shadow-md ring-1 ring-black/5",
                i >= 2 && "hidden md:block",
              )}
            >
              <CdnImage
                path={path}
                alt=""
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
                priority={p === 0 && i < 2}
              />
            </div>
          ))}
        </div>
      ))}

      <div
        className={cn(
          "relative aspect-[16/7] overflow-hidden rounded-xl shadow-md transition-opacity duration-1000",
          index === slideCount - 1
            ? "opacity-100"
            : "pointer-events-none absolute inset-0 opacity-0",
        )}
        aria-hidden={index !== slideCount - 1}
      >
        <CdnImage path={hero.wideImage} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </div>
  );
}
