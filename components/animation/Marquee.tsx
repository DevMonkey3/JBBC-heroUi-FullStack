"use client";
import React, { memo, useMemo } from "react";
import styles from "./marquee.module.css";

export type MarqueeProps = {
  images: string[];
  reverse?: boolean;
  speed?: number;
  height?: number;
  width?: number;
  gap?: number;
  rounded?: number;
  pauseOnHover?: boolean;
  framed?: boolean;
  className?: string;
};

const Marquee: React.FC<MarqueeProps> = memo(({
  images,
  reverse = false,
  speed = 30,
  height = 120,
  width = 200,
  gap = 12,
  rounded = 12,
  pauseOnHover = false,
  framed = false,
  className = "",
}) => {
  // ✅ memoize the duplicated list so it doesn’t reallocate each render
  const list = useMemo(() => [...images, ...images], [images]);

  return (
    <div
      className={`${styles.wrapper} ${pauseOnHover ? styles.pauseHover : ""} ${framed ? styles.framed : ""} ${className}`}
      style={{ "--gap": `${gap}px` } as React.CSSProperties}
      aria-hidden
    >
      <ul
        className={`${styles.track} ${reverse ? styles.reverse : ""}`}
        style={
          {
            animationDuration: `${speed}s`,
            "--w": `${width}px`,
            "--h": `${height}px`,
            "--r": `${rounded}px`,
          } as React.CSSProperties
        }
      >
        {list.map((src, i) => (
          <li key={i} className={styles.item}>
            {src ? (
              <img
                loading="lazy"                 // ✅ defer offscreen
                decoding="async"               // ✅ non-blocking decode
                src={src}
                alt=""
                width={width} height={height}  // ✅ hint to browser → avoids reflow
                draggable={false}
              />
            ) : (
              <div className={styles.blank} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

Marquee.displayName = "Marquee";
export default Marquee;
