"use client";
import React, { useEffect, useRef } from "react";
import styles from "./carousal.module.css";
import { getCdnUrl } from "@/config/cdn";

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
        {/* All images now served from Digital Ocean CDN */}
        <img src={getCdnUrl("/Carousal/Client-Logo-3.avif")}  alt="Logo 1" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-4.avif")}  alt="Logo 2" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-6.avif")}  alt="Logo 3" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-7.avif")}  alt="Logo 4" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-8.avif")}  alt="Logo 5" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-9.avif")}  alt="Logo 6" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-10.avif")} alt="Logo 7" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-11.avif")} alt="Logo 8" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-12.avif")} alt="Logo 9" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/Client-Logo-DP.avif")} alt="Logo 10" className={styles.carouselLogo} loading="lazy" />
        <img src={getCdnUrl("/Carousal/clientlogo8_2x.webp")} width="145" height="85" alt="Logo 11" className={styles.carouselLogo} loading="lazy" />
      </div>
    </div>
  );
}
