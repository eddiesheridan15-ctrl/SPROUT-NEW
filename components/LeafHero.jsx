"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background: a full-bleed macro sprout photo.
 *
 * DESKTOP: vertically centered, with a gentle scroll-linked "pan down" so the
 * image drifts as you scroll. Clamped so it never exposes an edge.
 *
 * PHONE: completely still. The image is TOP-ANCHORED (pinned to the top of the
 * fixed layer, no vertical centering). This matters because mobile browsers
 * grow/shrink the viewport as the URL bar hides/shows on the first scroll; a
 * vertically-centered fixed element gets re-centered and appears to drift down.
 * Pinning the top removes the moving reference point, so it stays put.
 *
 * Tuned crop:
 *   desktop: x=13  y=9   zoom=100%
 *   phone:   x=3   y=-3  zoom=138%
 */
const CROP = {
  desktop: { x: 13, y: 9, zoom: 1.0, pan: 0.34 },
  phone: { x: 3, y: -3, zoom: 1.38, pan: 0 },
};

const IMG_W = 2786;
const IMG_H = 3482;

export default function LeafHero() {
  const imgRef = useRef(null);
  const [isPhone, setIsPhone] = useState(false);
  const cfg = useRef(null);
  const lastW = useRef(0);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const measure = () => {
      const vw = window.innerWidth;
      // Use the largest stable height so a hidden/shown URL bar never shrinks
      // coverage.
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
      const scaledH = h * c.zoom;

      const baseTx = (c.x / 100) * vw;
      const baseTy = (c.y / 100) * vh;

      // Max safe pan up before the bottom edge would show (desktop only).
      const halfOverflowY = (scaledH - vh) / 2;
      const maxPan = Math.max(0, halfOverflowY - Math.abs(baseTy) - 16);
      const panDist = Math.min(c.pan * vh, maxPan);

      img.style.width = w + "px";
      img.style.height = h + "px";

      if (phone) {
        // TOP-ANCHORED: pin to top:0, no vertical centering. We still center
        // horizontally and apply the tuned x/zoom. Because there is no vertical
        // %-based centering, the URL bar moving cannot shift it.
        // Vertical position: start from the top, then nudge by baseTy so the
        // tuned crop still lands right. We bias upward so the lower stem fills
        // the visible area as the URL bar retracts.
        const vShift = -((scaledH - vh) / 2) + baseTy;
        img.style.top = "0px";
        img.style.transform =
          "translateX(calc(-50% + " +
          baseTx +
          "px)) translateY(" +
          vShift +
          "px) scale(" +
          c.zoom +
          ")";
        img.style.transformOrigin = "top center";
      } else {
        img.style.top = "50%";
        img.style.transformOrigin = "center";
      }

      cfg.current = { vh, baseTx, baseTy, zoom: c.zoom, panDist, phone };
      if (!phone) placeStill();
    };

    const placeStill = () => {
      const k = cfg.current;
      if (!k) return;
      img.style.transform =
        "translate(calc(-50% + " +
        k.baseTx +
        "px), calc(-50% + " +
        k.baseTy +
        "px)) scale(" +
        k.zoom +
        ")";
    };

    const applyScroll = () => {
      const k = cfg.current;
      if (!k || k.phone || k.panDist === 0) return; // phone stays still
      const p = Math.min(1, Math.max(0, window.scrollY / k.vh));
      const ty = k.baseTy - p * k.panDist;
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
    applyScroll();

    const onScroll = () => applyScroll();
    const onResize = () => {
      // Only re-measure on a real width change (orientation flip, desktop
      // resize). Ignore height-only changes from the mobile URL bar.
      if (window.innerWidth === lastW.current) return;
      lastW.current = window.innerWidth;
      measure();
      applyScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", () => {
      measure();
      applyScroll();
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
