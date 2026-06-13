"use client";
import { useState, useEffect, useRef } from "react";

const SCREENS = [
  "/screens/01-homescreen.svg",
  "/screens/02-splash.svg",
  "/screens/03-feed.svg",
  "/screens/04-camera.svg",
  "/screens/05-edit.svg",
  "/screens/06-learn.svg",
  "/screens/07-ranks-team.svg",
  "/screens/08-ranks-leaderboard.svg",
  "/screens/09-impact.svg",
  "/screens/10-profile.svg",
];

export default function AppCarousel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileCarousel /> : <DesktopCarousel />;
}

/* ===== DESKTOP: three-up windowed (unchanged behaviour) ===== */
function DesktopCarousel() {
  const [start, setStart] = useState(0);
  const [tilt, setTilt] = useState({ i: null, x: 0, y: 0 });
  const perView = 3;
  const maxStart = Math.max(0, SCREENS.length - perView);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(maxStart, s + 1));

  const visible = SCREENS.slice(start, start + perView);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          position: "relative",
        }}
      >
        <button onClick={prev} aria-label="Previous" style={arrowStyle} disabled={start === 0}>
          ‹
        </button>

        <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "center" }}>
          {visible.map((src, i) => {
            const isCenter = i === 1;
            const active = tilt.i === i;
            return (
              <img
                key={src}
                src={src}
                alt="Sprout app screen"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setTilt({
                    i,
                    x: (e.clientX - r.left) / r.width - 0.5,
                    y: (e.clientY - r.top) / r.height - 0.5,
                  });
                }}
                onMouseLeave={() => setTilt({ i: null, x: 0, y: 0 })}
                style={{
                  width: 300,
                  height: "auto",
                  display: "block",
                  flexShrink: 0,
                  transform: `perspective(900px) scale(${isCenter ? 1 : 0.88}) rotateY(${
                    active ? (tilt.x * 10).toFixed(2) : 0
                  }deg) rotateX(${active ? (-tilt.y * 8).toFixed(2) : 0}deg)`,
                  transition: active ? "transform 0.08s ease-out" : "transform 0.5s ease",
                  willChange: "transform",
                  zIndex: isCenter ? 2 : 1,
                  filter: isCenter ? "none" : "saturate(0.92) brightness(0.98)",
                }}
              />
            );
          })}
        </div>

        <button onClick={next} aria-label="Next" style={arrowStyle} disabled={start === maxStart}>
          ›
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 36 }}>
        {Array.from({ length: maxStart + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background: i === start ? "var(--green-deep)" : "rgba(0,0,0,0.18)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ===== MOBILE: seamless sliding track, all screens in one row ===== */
function MobileCarousel() {
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [drag, setDrag] = useState(0); // live finger offset in px
  const [animate, setAnimate] = useState(true);
  const viewportRef = useRef(null);
  const startX = useRef(null);
  const startY = useRef(null);
  const dragging = useRef(false);
  const axisLocked = useRef(false);
  const horizontal = useRef(false);

  const last = SCREENS.length - 1;

  const go = (i) => {
    setIndex(Math.max(0, Math.min(last, i)));
    setShowHint(false);
  };
  const prev = () => go(index === 0 ? last : index - 1);
  const next = () => go(index === last ? 0 : index + 1);

  const onStart = (x, y) => {
    startX.current = x;
    startY.current = y;
    dragging.current = true;
    axisLocked.current = false;
    horizontal.current = false;
    setAnimate(false);
  };

  const onMove = (x, y, e) => {
    if (!dragging.current || startX.current === null) return;
    const dx = x - startX.current;
    const dy = y - startY.current;
    // Lock the axis on first meaningful movement so vertical scroll still works.
    if (!axisLocked.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      axisLocked.current = true;
      horizontal.current = Math.abs(dx) > Math.abs(dy);
    }
    if (axisLocked.current && horizontal.current) {
      if (e && e.cancelable) e.preventDefault();
      setDrag(dx);
    }
  };

  const onEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setAnimate(true);
    const w = viewportRef.current ? viewportRef.current.clientWidth : 320;
    const threshold = Math.min(60, w * 0.18);
    if (drag <= -threshold) next();
    else if (drag >= threshold) prev();
    setDrag(0);
    startX.current = null;
    startY.current = null;
  };

  const vw = viewportRef.current ? viewportRef.current.clientWidth : 0;
  const dragPct = vw ? (drag / vw) * 100 : 0;
  const trackX = -index * 100 + dragPct;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
        <div
          ref={viewportRef}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 340,
            overflow: "hidden",
            touchAction: "pan-y",
          }}
          onTouchStart={(e) => onStart(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY, e)}
          onTouchEnd={onEnd}
        >
          <div
            style={{
              display: "flex",
              width: `${SCREENS.length * 100}%`,
              transform: `translateX(${trackX / SCREENS.length}%)`,
              transition: animate ? "transform 0.4s cubic-bezier(0.22,1,0.36,1)" : "none",
              willChange: "transform",
            }}
          >
            {SCREENS.map((src) => (
              <div key={src} style={{ width: `${100 / SCREENS.length}%`, flexShrink: 0, padding: "0 2px", boxSizing: "border-box" }}>
                <img
                  src={src}
                  alt="Sprout app screen"
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button onClick={prev} aria-label="Previous" style={{ ...mArrowStyle, position: "absolute", left: 0, top: "42%", transform: "translateY(-50%)", zIndex: 2 }}>
          ‹
        </button>
        <button onClick={next} aria-label="Next" style={{ ...mArrowStyle, position: "absolute", right: 0, top: "42%", transform: "translateY(-50%)", zIndex: 2 }}>
          ›
        </button>
      </div>

      {showHint && (
        <div
          style={{
            marginTop: 14,
            fontFamily: "var(--head)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: 0.85,
          }}
        >
          <span style={{ fontSize: 15 }}>‹</span> Swipe <span style={{ fontSize: 15 }}>›</span>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: showHint ? 18 : 28, flexWrap: "wrap" }}>
        {SCREENS.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to screen ${i + 1}`}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background: i === index ? "var(--green-deep)" : "rgba(0,0,0,0.18)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const arrowStyle = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#fff",
  fontSize: 28,
  lineHeight: 1,
  cursor: "pointer",
  color: "var(--green-deep)",
  flexShrink: 0,
};

const mArrowStyle = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  border: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.92)",
  boxShadow: "0 4px 14px rgba(13,42,23,0.18)",
  backdropFilter: "blur(4px)",
  fontSize: 22,
  lineHeight: 1,
  cursor: "pointer",
  color: "var(--green-deep)",
  flexShrink: 0,
};
