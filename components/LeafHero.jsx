"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background: a full-bleed macro sprout photo.
 *
 * The photo is an <img> sized to COVER the viewport, then translated and
 * scaled so the sprout sits exactly where it was tuned. Desktop and phone
 * get independent crops (the portrait photo frames very differently on a wide
 * screen versus a tall one), switched on a width breakpoint.
 *
 * Tuned values (from the desktop/phone tuner):
 *   desktop: x=13  y=9   zoom=100%
 *   phone:   x=3   y=-3  zoom=138%
 * x and y are percentages of the viewport (width / height) to translate the
 * image from centre; zoom scales it up from the cover size.
 */
const CROP = {
  desktop: { x: 13, y: 9, zoom: 1.0 },
  phone: { x: 3, y: -3, zoom: 1.38 },
};

// Natural size of the source photo, for the cover calculation.
const IMG_W = 2786;
const IMG_H = 3482;

export default function LeafHero() {
  const imgRef = useRef(null);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const apply = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const phone = vw <= 600;
      setIsPhone(phone);
      const c = phone ? CROP.phone : CROP.desktop;

      // Size the image to cover the viewport (match the dimension that leaves
      // overflow), then transforms pan/zoom from the centred position.
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

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  return (
    <div id="leafhero" aria-hidden="true">
      <img ref={imgRef} className="leaf-photo" src="/leaf-hero.jpg" alt="" />
      <div className={"leaf-overlay" + (isPhone ? " phone" : "")} />
    </div>
  );
}
