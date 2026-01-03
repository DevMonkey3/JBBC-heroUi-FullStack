// Content1.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import NextImage from "next/image";
import { Card } from "@heroui/card";

// ---------- constants (out of render) ----------
type Slide =
  | { type: "grid"; page: 0 | 1 }
  | {
      type: "image";
      src: string;
      alt: string;
      objectPosition?: string; // "center" | "top" | "left" | "50% 32%"
      fit?: "cover" | "contain";
    };

const DISPLAY_MS = 10_000;
const FADE_MS = 1_500;
const CARD_HEIGHT = 450; // px for wide-image container only

// Wide image slide lives in /public/home/indimage.png
const SLIDES: Readonly<Slide[]> = [
  { type: "grid", page: 0 },
  { type: "grid", page: 1 },
  { type: "image", src: "/home/indImage.png", alt: "Wide Image 1", objectPosition: "center" },
];

// Utilities kept outside so they don’t reallocate each render
const resolveImageClasses = (s: Extract<Slide, { type: "image" }>) => {
  const fit = s.fit === "contain" ? "object-contain" : "object-cover";
  const pos =
    s.objectPosition && s.objectPosition.includes("%")
      ? `object-[${s.objectPosition.replace(" ", "_")}]`
      : s.objectPosition === "top"
      ? "object-top"
      : s.objectPosition === "left"
      ? "object-left"
      : "object-center";
  return `${fit} ${pos}`;
};

const isGrid = (s: Slide | null): s is Extract<Slide, { type: "grid" }> => !!s && s.type === "grid";
const isImage = (s: Slide | null): s is Extract<Slide, { type: "image" }> => !!s && s.type === "image";

// ---------- component ----------
const Content1: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotionRef = useRef(false);

  // Prefer stable file list; encode once.
  const people = useMemo(() => {
    const files = [
      "Slider (6).avif",
      "Slider (13).avif",
      "Slider (16).avif",
      "Slider (17).avif",
      "Slider (10).avif",
      "Slider (11).avif",
      "Slider (4).avif",
      "Slider (9).avif",
    ];
    return files.map((name) => ({
      src: `/home/${encodeURI(name)}`,
      text: "",
      color: "#fff",
    }));
  }, []);

  // Reduced motion: disable auto-advance for users who ask for it
  useEffect(() => {
    if (typeof window !== "undefined") {
      reduceMotionRef.current = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    }
  }, []);

  // Autoplay timer – minimal state churn, always cleared
  useEffect(() => {
    if (reduceMotionRef.current) return; // respect user setting

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPrevIndex(index);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, DISPLAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index]);

  // Skip image if it fails (don't leave a blank)
  const skipBrokenImage = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPrevIndex(index);
    setIndex((i) => (i + 1) % SLIDES.length);
  }, [index]);

  const curr = SLIDES[index];
  const prev = prevIndex !== null ? SLIDES[prevIndex] : null;

  const getPeopleSlice = (page: 0 | 1) => (page === 0 ? people.slice(0, 4) : people.slice(4, 8));

  return (
    <div className="container mx-auto">
      {/* Fixed height ONLY for image slides */}
      <div
        className={`relative ${isImage(curr) ? "" : "pb-0"}`}
        style={isImage(curr) ? { height: CARD_HEIGHT } : undefined}
        aria-live="polite"
        aria-atomic
      >
        {/* GRID (current) */}
        {isGrid(curr) && (
          <div
            key={`grid-${curr.page}-${index}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 opacity-0 animate-[fadeIn_400ms_ease-out_forwards]"
          >
            {getPeopleSlice(curr.page).map((item, idx) => (
              <Card
                key={`${item.src}-${idx}`}
                className={`relative overflow-hidden rounded-lg shadow-lg ${idx >= 2 ? "hidden sm:block" : ""}`}
              >
                {/* Use Next/Image for perf + proper responsive loading */}
                <div className="relative w-full aspect-[2/3] md:aspect-[3/4]">
                  <NextImage
                    src={item.src}
                    alt={`Person ${idx + 1}`}
                    fill
                    sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>

                {item.text ? (
                  <div
                    className="absolute bottom-5 right-3 z-50 text-right text-sm leading-6 whitespace-pre-line font-medium"
                    style={{ color: item.color }}
                  >
                    {item.text.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/5" />
              </Card>
            ))}
          </div>
        )}

        {/* IMAGE (current) */}
        {isImage(curr) && (
          <div
            key={`curr-${index}`}
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{ transition: `opacity ${FADE_MS}ms ease-in-out`, opacity: 1 }}
          >
            <NextImage
              src={(curr as Extract<Slide, { type: "image" }>).src}
              alt={(curr as Extract<Slide, { type: "image" }>).alt}
              fill
              sizes="100vw"
              // Priority only on the very first paint; otherwise let it lazy-load
              priority={index === 0}
              className={`rounded-lg ${resolveImageClasses(curr as Extract<Slide, { type: "image" }>)}`}
              onError={skipBrokenImage}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent rounded-b-lg" />
          </div>
        )}

        {/* IMAGE (previous, fading out) */}
        {isImage(prev) && (
          <div
            key={`prev-${prevIndex}`}
            className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
            style={{ transition: `opacity ${FADE_MS}ms ease-in-out`, opacity: 0 }}
          >
            <NextImage
              src={(prev as Extract<Slide, { type: "image" }>).src}
              alt={(prev as Extract<Slide, { type: "image" }>).alt}
              fill
              sizes="100vw"
              className={`rounded-lg ${resolveImageClasses(prev as Extract<Slide, { type: "image" }>)}`}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Content1;
