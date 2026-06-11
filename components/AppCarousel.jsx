"use client";
import { useState } from "react";

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
