"use client";
import { useEffect, useRef, useState } from "react";

const TEAMS = [
  { id: "mkt", name: "Marketing", initial: "M", color: "#1f9d52", target: 8420 },
  { id: "sal", name: "Sales", initial: "S", color: "#b9851c", target: 8180 },
  { id: "fin", name: "Finance", initial: "F", color: "#3f6fa0", target: 7890 },
  { id: "ops", name: "Ops", initial: "O", color: "#a4652f", target: 7540 },
];
const FLOOR = 7000;

export default function LiveLeaderboard() {
  const wrapRef = useRef(null);
  const [scores, setScores] = useState(TEAMS.map(() => 0));
  const [chip, setChip] = useState(null);
  const startedRef = useRef(false);
  const runningRef = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let timer = null;
    let raf = null;

    const beginTicks = () => {
      timer = setInterval(() => {
        if (!runningRef.current) return;
        const i = Math.floor(Math.random() * TEAMS.length);
        const amount = [30, 40, 50][Math.floor(Math.random() * 3)];
        setChip({ i, amount, key: Date.now() });
        setScores((prev) => prev.map((s, j) => (j === i ? s + amount : s)));
      }, 2300);
    };

    const countUp = () => {
      const t0 = performance.now();
      const dur = 1800;
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        setScores(TEAMS.map((t) => Math.round(t.target * ease(p))));
        if (p < 1) raf = requestAnimationFrame(step);
        else beginTicks();
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          runningRef.current = e.isIntersecting;
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            countUp();
          }
        }),
      { threshold: 0.3 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const max = Math.max(...scores, FLOOR + 1);

  return (
    <div className="nr reveal" ref={wrapRef}>
      <div className="nr-head">
        <span className="nr-live">
          <i />
          Live race
        </span>
        <span className="nr-week">WEEK 3 OF 4</span>
      </div>
      {TEAMS.map((t, i) => {
        const pct = Math.max(0, (scores[i] - FLOOR) / (max + 400 - FLOOR));
        const left = 8 + pct * 76;
        return (
          <div className="nr-lane" key={t.id}>
            <div className="nr-finish" />
            <div
              className="nr-trail"
              style={{ width: Math.max(0, left - 8) + "%" }}
            />
            <div className="nr-run" style={{ left: left + "%" }}>
              <span className="nr-av" style={{ background: t.color }}>
                {t.initial}
              </span>
              <span className="nr-tag">
                {t.name} &middot; <b>{scores[i].toLocaleString()}</b>
              </span>
              {chip && chip.i === i && (
                <span key={chip.key} className="nr-chip">
                  +{chip.amount} pts
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
