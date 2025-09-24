"use client";
import React, { memo, useMemo } from "react";
import styles from "./marquee.module.css";
import Image from "next/image";

export type MarqueeProps = {
  images: string[];
  reverse?: boolean;
  speed?: number;   // in seconds
  height?: number;
  width?: number;
  gap?: number;
  rounded?: number;
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
  className = "",
}) => {
  const list = useMemo(() => [...images, ...images], [images]);

  return (
    <div
      className={`${styles.wrapper} ${className}`}
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
              <Image
                src={src}
                alt=""
                width={width}
                height={height}
                loading="lazy"
                decoding="async"
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
