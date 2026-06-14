"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background: a still full-bleed macro sprout photo.
 *
 * The photo is an <img> sized to cover the viewport, then translated and scaled
 * so the sprout sits in the tuned position (desktop and phone independently).
 * It does not move on scroll.
 *
 * The layout only recomputes when the viewport WIDTH changes, not the height,
 * because mobile browsers change innerHeight as the URL bar shows/hides while
 * scrolling; recomputing on that made the image visibly jump. Using the larger,
 * stable viewport height for sizing keeps it rock-steady.
 *
 * Tuned crop:
 *   desktop: x=13  y=9   zoom=100%
 *   phone:   x=3   y=-3  zoom=138%
 */
const CROP = {
  desktop: { x: 13, y: 9, zoom: 1.0 },
  phone: { x: 3, y: -3, zoom: 1.38 },
};

const IMG_W = 2786;
const IMG_H = 3482;

export default function LeafHero() {
  const imgRef = useRef(null);
  const [isPhone, setIsPhone] = useState(false);
  const lastW = useRef(0);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const layout = () => {
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
      img.style.width = w + "px";
      img.style.height = h + "px";

      const tx = (c.x / 100) * vw;
      const ty = (c.y / 100) * vh;
      img.style.transform =
        "translate(calc(-50% + " +
        tx +
        "px), calc(-50% + " +
        ty +
        "px)) scale(" +
        c.zoom +
        ")";
    };

    lastW.current = window.innerWidth;
    layout();

    // Only relayout on a real width change (orientation flip, desktop resize).
    // Ignore height-only changes from the mobile URL bar so the image stays put.
    const onResize = () => {
      if (window.innerWidth === lastW.current) return;
      lastW.current = window.innerWidth;
      layout();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", layout);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", layout);
    };
  }, []);

  return (
    <div id="leafhero" aria-hidden="true">
      <img ref={imgRef} className="leaf-photo" src="/leaf-hero.jpg" alt="" />
      <div className={"leaf-overlay" + (isPhone ? " phone" : "")} />
    </div>
  );
}
