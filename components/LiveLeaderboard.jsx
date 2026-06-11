"use client";
import { useEffect, useRef, useState } from "react";

const START = [
  { id: "mkt", name: "Leaf It Up to Marketing", score: 8420 },
  { id: "sal", name: "Sales Squadron", score: 8180 },
  { id: "fin", name: "Finance Forest", score: 7890 },
  { id: "ops", name: "Ocean's Eleven", score: 7540 },
];

const ROW_H = 84;

export default function LiveLeaderboard() {
  const wrapRef = useRef(null);
  const [teams, setTeams] = useState(START.map((t) => ({ ...t, score: 0 })));
  const [chip, setChip] = useState(null);
  const startedRef = useRef(false);
  const runningRef = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let tickTimer = null;
    let raf = null;

    const beginTicks = () => {
      tickTimer = setInterval(() => {
        if (!runningRef.current) return;
        setTeams((prev) => {
          const i = Math.floor(Math.random() * prev.length);
          const amount = [30, 40, 50][Math.floor(Math.random() * 3)];
          setChip({ id: prev[i].id, amount, key: Date.now() });
          return prev.map((t, j) =>
            j === i ? { ...t, score: t.score + amount } : t
          );
        });
      }, 2400);
    };

    const startCountUp = () => {
      const t0 = performance.now();
      const dur = 1800;
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        setTeams(
          START.map((t) => ({ ...t, score: Math.round(t.score * ease(p)) }))
        );
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
            startCountUp();
          }
        }),
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (tickTimer) clearInterval(tickTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const max = Math.max(...teams.map((t) => t.score), 1);
  const ranked = [...teams].sort((a, b) => b.score - a.score);
  const rankOf = (id) => ranked.findIndex((t) => t.id === id);

  return (
    <div className="lb reveal" ref={wrapRef}>
      <div className="lb-head">
        <span className="lb-live">
          <span className="lb-dot" />
          Live leaderboard
        </span>
        <span className="lb-week">Week 3 of 4</span>
      </div>
      <div className="lb-rows" style={{ height: START.length * ROW_H }}>
        {teams.map((t) => {
          const r = rankOf(t.id);
          return (
            <div
              key={t.id}
              className="lb-row"
              style={{ transform: `translateY(${r * ROW_H}px)` }}
            >
              <span className="lb-rank">{r + 1}</span>
              <div className="lb-mid">
                <div className="lb-name">{t.name}</div>
                <div className="lb-bar">
                  <span style={{ width: `${(t.score / max) * 100}%` }} />
                </div>
              </div>
              <span className="lb-score">{t.score.toLocaleString()}</span>
              {chip && chip.id === t.id && (
                <span key={chip.key} className="lb-chip">
                  +{chip.amount} pts
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
