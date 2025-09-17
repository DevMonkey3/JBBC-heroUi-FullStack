// Content1.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Image } from "@heroui/image";
import { Card } from "@heroui/card";

type Slide =
  | { type: "grid"; page: 0 | 1 }   // two pages: 0 => first 4, 1 => next 4
  | {
      type: "image";
      src: string;
      alt: string;
      objectPosition?: string;       // e.g. "center", "top", "50% 32%"
      fit?: "cover" | "contain";
    };

const DISPLAY_MS = 10000;  // dwell per slide
const FADE_MS = 1500;      // cross-fade duration
const cardHeight = "450px";

const Content1: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- PEOPLE (8 items, filenames include spaces/parentheses) ---
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
    // If you can, rename files to kebab-case (no spaces) in /public/home/.
    // This encodeURI keeps it working even with spaces/parentheses.
    return files.map((name) => ({
      src: `/home/${encodeURI(name)}`,
      text: "",
      color: "#fff",
    }));
  }, []);

  // --- SLIDE SEQUENCE: grid(0) -> grid(1) -> wide1 -> wide2 ---
  const slides: Slide[] = useMemo(
    () => [
      { type: "grid", page: 0 }, // first 4 people
      { type: "grid", page: 1 }, // next 4 people
      {
        type: "image",
        src: "/home/indimage.png",
        alt: "Wide Image 1",
        objectPosition: "center",
      },
      
    ],
    []
  );

  // self-scheduling timer
  useEffect(() => {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPrevIndex(index);
      setIndex((i) => (i + 1) % slides.length);
    }, DISPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, slides.length]);

  const curr = slides[index];
  const prev = prevIndex !== null ? slides[prevIndex] : null;

  const isGrid = (s: Slide | null): s is Extract<Slide, { type: "grid" }> =>
    !!s && s.type === "grid";
  const isImage = (s: Slide | null): s is Extract<Slide, { type: "image" }> =>
    !!s && s.type === "image";

  // helper for object-position/fit classes
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

  // decide which 4 people to show on the grid page
  const getPeopleSlice = (page: 0 | 1) =>
    page === 0 ? people.slice(0, 4) : people.slice(4, 8);

  return (
    <div className="container mx-auto">
      <div className="relative" style={{ height: cardHeight }} aria-live="polite" aria-atomic>
        {/* GRID (current) */}
        {isGrid(curr) && (
          <div
            key={`grid-${curr.page}-${index}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 h-full opacity-0 animate-[fadeIn_400ms_ease-out_forwards]"
          >
            {getPeopleSlice(curr.page).map((item, idx) => (
              <Card key={idx} className="relative overflow-hidden rounded-lg shadow-lg h-full">
                <Image src={item.src} alt={`Person ${idx + 1}`} className="w-full h-full object-cover block" />
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
            <Image
              src={curr.src}
              alt={curr.alt}
              className={`w-full h-full ${resolveImageClasses(curr)} rounded-lg block`}
              style={{ maxHeight: cardHeight, width: "100%" }}
            />
            {/* optional gentle bottom gradient to help white text, remove if unwanted */}
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
            <Image
              src={prev.src}
              alt={prev.alt}
              className={`w-full h-full ${resolveImageClasses(prev)} rounded-lg block`}
              style={{ maxHeight: cardHeight, width: "100%" }}
            />
          </div>
        )}
      </div>

      {/* keyframes for grid fade-in */}
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
