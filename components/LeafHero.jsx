"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: a macro sprout photo with a single water drop.
 * As the visitor scrolls out of the hero, a clean synthetic droplet
 * releases from the real drop's position, swells, and falls down the
 * stem line into the dark, then the whole layer fades out before the
 * "Built to be played" section (same handoff the old globe used).
 *
 * The real drop in the photo sits at roughly 50% across, 55% down.
 * The synthetic drop is drawn from scratch on canvas so it stays crisp,
 * rather than cutting the soft translucent drop out of the photo.
 */
export default function LeafHero() {
  const canvasRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const layer = layerRef.current;
    if (!canvas || !layer) return;
    const ctx = canvas.getContext("2d");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Scroll progress 0..1: 0 at top of page, 1 a bit before the built
    // section enters view (identical fade window to the old globe).
    let curP = 0;
    let targetP = 0;
    const onScroll = () => {
      const builtEl = document.getElementById("built");
      const fadeEnd = builtEl
        ? builtEl.offsetTop - window.innerHeight
        : window.innerHeight;
      targetP = Math.min(1, Math.max(0, window.scrollY / (fadeEnd || 1)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Where the real drop hangs, measured as a fraction of the source photo
    // (natural size 2786x3482). The synthetic drop starts here so it lines up
    // with the real drop, then falls down the stem line.
    const IMG_W = 2786;
    const IMG_H = 3482;
    const DROP_FX = 0.505; // real drop centre, across the source photo
    const DROP_FY = 0.535; // real drop centre, down the source photo

    // Map a source-image fraction to a screen point through the exact
    // background-size:cover / background-position:right center transform, so
    // the synthetic drop lands on the real one at any viewport size.
    function photoPoint(fx, fy) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.max(vw / IMG_W, vh / IMG_H);
      const dw = IMG_W * scale;
      const dh = IMG_H * scale;
      const ox = vw - dw; // right-aligned
      const oy = (vh - dh) * 0.5; // vertically centred
      return { x: ox + fx * dw, y: oy + fy * dh, w: dw, h: dh, scale };
    }

    // Draw a single glassy droplet (teardrop) centred at (x,y), height h.
    function drawDrop(x, y, h, alpha) {
      const w = h * 0.72;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);

      // teardrop path: pointed top, round bottom
      ctx.beginPath();
      ctx.moveTo(0, -h * 0.5);
      ctx.bezierCurveTo(w * 0.55, -h * 0.1, w * 0.5, h * 0.5, 0, h * 0.5);
      ctx.bezierCurveTo(-w * 0.5, h * 0.5, -w * 0.55, -h * 0.1, 0, -h * 0.5);
      ctx.closePath();

      // soft dark contour just outside the drop so it reads even over the
      // bright lit stem
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.55)";
      ctx.shadowBlur = h * 0.18;
      ctx.fillStyle = "rgba(20,40,30,0.25)";
      ctx.fill();
      ctx.restore();

      // body: brighter translucent fill with a clear sheen so it shows on
      // both the dark background and the green stem
      const g = ctx.createRadialGradient(
        -w * 0.18,
        h * 0.0,
        w * 0.08,
        0,
        h * 0.1,
        h * 0.7
      );
      g.addColorStop(0, "rgba(245,252,248,0.95)");
      g.addColorStop(0.45, "rgba(200,228,215,0.7)");
      g.addColorStop(1, "rgba(120,170,145,0.55)");
      ctx.fillStyle = g;
      ctx.fill();

      // rim light
      ctx.lineWidth = Math.max(1, h * 0.03);
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.stroke();

      // bright specular highlight (top-left)
      ctx.beginPath();
      ctx.ellipse(
        -w * 0.2,
        -h * 0.06,
        w * 0.15,
        h * 0.18,
        -0.5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fill();

      // small lower glow (light passing through)
      ctx.beginPath();
      ctx.ellipse(w * 0.05, h * 0.24, w * 0.2, h * 0.13, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(225,245,235,0.55)";
      ctx.fill();

      ctx.restore();
    }

    let running = true;
    const loop = () => {
      curP += (targetP - curP) * 0.08;

      // Fade the whole hero layer out near the built section, matching the
      // old globe: full opacity until 50% progress, gone by 65%.
      const op = curP < 0.5 ? 1 : Math.max(0, 1 - (curP - 0.5) / 0.15);
      layer.style.opacity = op;

      if (op <= 0.02) {
        layer.style.display = "none";
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        running = false;
        return;
      }
      layer.style.display = "";

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // The droplet releases as the visitor begins leaving the hero and
      // completes its fall before the layer fade (which starts ~0.5), so the
      // fall is visible rather than fading out near the top.
      const RELEASE_START = 0.1;
      const RELEASE_END = 0.46;
      const dp = Math.min(
        1,
        Math.max(0, (curP - RELEASE_START) / (RELEASE_END - RELEASE_START))
      );

      if (dp > 0) {
        const src = photoPoint(DROP_FX, DROP_FY);
        // The stem leans very slightly right going down; bias the path a touch
        // right of the drop so it tracks the stem, not air.
        const startX = src.x;
        const startY = src.y;
        const endY = window.innerHeight + 140;
        // Mild ease-in (gravity feel) but fast enough to clear the screen
        // within the release window.
        const fall = dp * (0.45 + 0.55 * dp);
        const x = startX + src.w * 0.012 * fall;
        const y = startY + (endY - startY) * fall;

        // Size matches the real drop's apparent size (tied to photo scale),
        // with a quick swell at release then a steady falling size.
        const baseH = IMG_H * 0.052 * src.scale * 0.5;
        const swell = 1 + 0.45 * Math.max(0, 1 - dp * 8);
        const h = baseH * swell;

        const dropAlpha = Math.min(1, dp * 10) * op;

        // faint trailing streak down the stem behind the drop
        if (dp < 0.5) {
          ctx.save();
          ctx.globalAlpha = (1 - dp * 2) * 0.25 * op;
          const grad = ctx.createLinearGradient(x, startY, x, y);
          grad.addColorStop(0, "rgba(220,240,230,0)");
          grad.addColorStop(1, "rgba(220,240,230,0.6)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(1, h * 0.3);
          ctx.beginPath();
          ctx.moveTo(x, startY);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.restore();
        }

        drawDrop(x, y, h, dropAlpha);
      }

      if (running) requestAnimationFrame(loop);
    };
    loop();

    // wake the loop if the user scrolls back to the top
    const wake = () => {
      if (!running && window.scrollY < window.innerHeight) {
        running = true;
        layer.style.display = "";
        loop();
      }
    };
    window.addEventListener("scroll", wake, { passive: true });

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", wake);
    };
  }, []);

  return (
    <div id="leafhero" ref={layerRef}>
      <div className="leaf-photo" />
      <canvas id="leaf-drop" ref={canvasRef} />
    </div>
  );
}
