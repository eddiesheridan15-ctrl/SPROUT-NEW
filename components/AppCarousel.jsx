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

/* ===== DESKTOP: center-anchored sliding track, smooth, loops both ways ===== */
function DesktopCarousel() {
  const SLOT = 328; // image width (300) + gap (28)
  const N = SCREENS.length;
  // We render the strip with a set of clones on each side so the track can
  // slide past either end and wrap seamlessly. `pos` is the logical position
  // in the (cloned) strip; the real active index is pos wrapped into 0..N-1.
  const CLONES = 3;
  const [pos, setPos] = useState(0); // 0 = first real slide centered
  const [animate, setAnimate] = useState(true);
  const [tilt, setTilt] = useState({ key: null, x: 0, y: 0 });
  const lockRef = useRef(false);

  const active = ((pos % N) + N) % N;

  // Build the strip: [last CLONES] + [all] + [first CLONES]
  const strip = [];
  for (let k = -CLONES; k < N + CLONES; k++) {
    const realIndex = ((k % N) + N) % N;
    strip.push({ src: SCREENS[realIndex], realIndex, slot: k });
  }

  const go = (dir) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnimate(true);
    setPos((p) => p + dir);
    // release lock after the transition so clicks can't pile up and stutter
    setTimeout(() => {
      lockRef.current = false;
    }, 460);
  };
  const prev = () => go(-1);
  const next = () => go(1);

  // When the animation lands on a cloned region (pos outside 0..N-1), silently
  // snap back to the equivalent real position with animation off, so the loop
  // is invisible.
  useEffect(() => {
    if (pos < 0 || pos >= N) {
      const t = setTimeout(() => {
        setAnimate(false);
        setPos(((pos % N) + N) % N);
      }, 470);
      return () => clearTimeout(t);
    }
  }, [pos, N]);

  // Re-enable animation on the next frame after a silent snap.
  useEffect(() => {
    if (!animate) {
      const r = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(r);
    }
  }, [animate]);

  // translateX so the current pos sits dead center. The strip's first element
  // is at slot -CLONES, so the element at logical slot `pos` is at offset
  // (pos + CLONES) from the strip start.
  const trackX = -(pos + CLONES + 0.5) * SLOT;

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
        <button onClick={prev} aria-label="Previous" style={arrowStyle}>
          ‹
        </button>

        <div
          style={{
            position: "relative",
            width: SLOT * 3,
            height: 640,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              display: "flex",
              alignItems: "center",
              transform: `translateX(${trackX}px)`,
              transition: animate
                ? "transform 0.46s cubic-bezier(0.22,1,0.36,1)"
                : "none",
              willChange: "transform",
            }}
          >
            {strip.map((item) => {
              const isCenter = item.slot === pos;
              const key = item.slot;
              const activeTilt = tilt.key === key;
              return (
                <div
                  key={key}
                  style={{
                    width: SLOT,
                    flexShrink: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.src}
                    alt="Sprout app screen"
                    draggable={false}
                    onMouseMove={(e) => {
                      if (!isCenter) return;
                      const r = e.currentTarget.getBoundingClientRect();
                      setTilt({
                        key,
                        x: (e.clientX - r.left) / r.width - 0.5,
                        y: (e.clientY - r.top) / r.height - 0.5,
                      });
                    }}
                    onMouseLeave={() => setTilt({ key: null, x: 0, y: 0 })}
                    style={{
                      width: 300,
                      height: "auto",
                      display: "block",
                      transform: `perspective(900px) scale(${
                        isCenter ? 1 : 0.84
                      }) rotateY(${
                        activeTilt ? (tilt.x * 10).toFixed(2) : 0
                      }deg) rotateX(${
                        activeTilt ? (-tilt.y * 8).toFixed(2) : 0
                      }deg)`,
                      transition: activeTilt
                        ? "transform 0.08s ease-out"
                        : "transform 0.46s cubic-bezier(0.22,1,0.36,1)",
                      willChange: "transform",
                      filter: isCenter
                        ? "none"
                        : "saturate(0.9) brightness(0.96)",
                      opacity: isCenter ? 1 : 0.78,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={next} aria-label="Next" style={arrowStyle}>
          ›
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginTop: 28,
        }}
      >
        {SCREENS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (lockRef.current) return;
              setAnimate(true);
              setPos(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background:
                i === active ? "var(--green-deep)" : "rgba(0,0,0,0.18)",
              transition: "background 0.3s ease",
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
