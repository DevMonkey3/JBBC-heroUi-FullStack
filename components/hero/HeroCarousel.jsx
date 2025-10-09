"use client";
import React, { useEffect, useRef } from "react";
import styles from "./carousal.module.css";

export default function HeroCarousel() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    // Prevent double-clone on fast HMR reloads
    if (root.dataset.animated === "true") return;

    root.dataset.animated = "true";

    // Clone once to create seamless loop
    const items = Array.from(track.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);           // <-- no TS cast in .jsx
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    // Add a real class to kick off CSS animation
    root.classList.add(styles.animated);
  }, []);

  return (
    <div ref={rootRef} className={styles.carousel}>
      <div ref={trackRef} className={styles.carouselTrack}>
        {/* FIRST PASS (files live under /public/Carousal) */}
        <img src="/Carousal/Client-Logo-3.jpg"  alt="Logo 1" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-4.jpg"  alt="Logo 2" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-6.jpg"  alt="Logo 3" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-7.jpg"  alt="Logo 4" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-8.jpg"  alt="Logo 5" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-9.jpg"  alt="Logo 6" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-10.jpg" alt="Logo 7" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-11.jpg" alt="Logo 8" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-12.jpg" alt="Logo 9" className={styles.carouselLogo} />
        <img src="/Carousal/Client-Logo-DP.jpg" alt="Logo 10" className={styles.carouselLogo} />
        <img src="/Carousal/clientlogo8_2x.webp" width="145" height="85" alt="Logo 11" className={styles.carouselLogo} />
      </div>
    </div>
  );
}
