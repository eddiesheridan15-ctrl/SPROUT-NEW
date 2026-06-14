"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background: a full-bleed macro sprout photo with a scroll-linked
 * "pan down" motion. As you scroll, the image pans upward so more of the lower
 * stem is revealed, like scrolling down through the photo. The motion is driven
 * by scrollY (not by a fixed position), which also smooths out the mobile
 * URL-bar jump, since the image is meant to move.
 *
 * The pan distance is clamped per device to the available vertical overflow so
 * it never pulls the image off an edge and exposes the dark backing.
 *
 * Tuned crop:
 *   desktop: x=13  y=9   zoom=100%
 *   phone:   x=3   y=-3  zoom=138%
 */
const CROP = {
  desktop: { x: 13, y: 9, zoom: 1.0, pan: 0.34 },
  phone: { x: 3, y: -3, zoom: 1.38, pan: 0.13 },
};

const IMG_W = 2786;
const IMG_H = 3482;

export default function LeafHero() {
  const imgRef = useRef(null);
  const [isPhone, setIsPhone] = useState(false);
  const cfg = useRef(null); // cached layout numbers
  const lastW = useRef(0);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight || 0
      );
      const phone = vw <= 600;
      setIsPhone(phone);
      const c = phone ? CROP.phone : CROP.desktop;

      const ar = IMG_W / IMG_H;
      let w, h;
      if (vw / vh > ar) {
        w = vw;
        h = vw / ar;
      } else {
        h = vh;
        w = vh * ar;
      }
      h *= c.zoom;
      w *= c.zoom;

      const baseTx = (c.x / 100) * vw;
      const baseTy = (c.y / 100) * vh;

      // Max distance we can pan UP before the bottom edge would show.
      const halfOverflowY = (h - vh) / 2;
      const maxPan = Math.max(0, halfOverflowY - Math.abs(baseTy) - 16);
      // Desired pan from the per-device factor, capped to what's safe.
      const panDist = Math.min(c.pan * vh, maxPan);

      img.style.width = w / c.zoom + "px";
      img.style.height = h / c.zoom + "px";

      cfg.current = { vh, baseTx, baseTy, zoom: c.zoom, panDist };
    };

    const apply = () => {
      const k = cfg.current;
      if (!k) return;
      const p = Math.min(1, Math.max(0, window.scrollY / k.vh));
      const ty = k.baseTy - p * k.panDist; // pan up as you scroll
      img.style.transform =
        "translate(calc(-50% + " +
        k.baseTx +
        "px), calc(-50% + " +
        ty +
        "px)) scale(" +
        k.zoom +
        ")";
    };

    lastW.current = window.innerWidth;
    measure();
    apply();

    const onScroll = () => apply();
    const onResize = () => {
      // Only re-measure on width change (ignore mobile URL-bar height jitter).
      if (window.innerWidth === lastW.current) return;
      lastW.current = window.innerWidth;
      measure();
      apply();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", () => {
      measure();
      apply();
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div id="leafhero" aria-hidden="true">
      <img ref={imgRef} className="leaf-photo" src="/leaf-hero.jpg" alt="" />
      <div className={"leaf-overlay" + (isPhone ? " phone" : "")} />
    </div>
  );
}
