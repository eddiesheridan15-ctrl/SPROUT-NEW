"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background: a full-bleed macro sprout photo.
 *
 * The photo is an <img> sized to MORE THAN cover the viewport, then translated
 * and scaled so the sprout sits in the tuned position. We oversize on purpose
 * so panning the image never exposes a bare edge of the page behind it.
 *
 * Desktop and phone get independent crops. The handler only recomputes when
 * the viewport WIDTH changes, not the height, because mobile browsers change
 * innerHeight as the URL bar shows/hides while scrolling, and recomputing on
 * that would make the image visibly rescale mid-scroll.
 *
 * Tuned values:
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
      // Use the LARGER of the visual viewport and the window for height so a
      // hidden/shown mobile URL bar never shrinks our coverage.
      const vh = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight || 0
      );
      const phone = vw <= 600;
      setIsPhone(phone);
      const c = phone ? CROP.phone : CROP.desktop;

      // Base cover size.
      const ar = IMG_W / IMG_H;
      let w, h;
      if (vw / vh > ar) {
        w = vw;
        h = vw / ar;
      } else {
        h = vh;
        w = vh * ar;
      }

      // Oversize so the translate (and any zoom < 1) can never expose an edge.
      // The translate is at most |x|% of width and |y|% of height; pad by twice
      // the largest translate plus a safety margin, divided by zoom.
      const padX = (Math.abs(c.x) / 100) * vw * 2 + 80;
      const padY = (Math.abs(c.y) / 100) * vh * 2 + 80;
      w = (w + padX) / Math.min(c.zoom, 1);
      h = (h + padY) / Math.min(c.zoom, 1);

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

    // First paint.
    lastW.current = window.innerWidth;
    layout();

    // Only relayout when the WIDTH actually changes (orientation change, window
    // resize on desktop). Ignore height-only changes from the mobile URL bar.
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
