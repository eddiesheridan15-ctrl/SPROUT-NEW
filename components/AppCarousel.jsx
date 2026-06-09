"use client";
import { useState } from "react";

const SCREENS = [
  "01-homescreen",
  "02-splash",
  "03-feed",
  "04-camera",
  "05-edit",
  "06-learn",
  "07-ranks-team",
  "08-ranks-leaderboard",
  "09-profile",
];

export default function AppCarousel() {
  const perView = 3;
  const maxStart = Math.max(0, SCREENS.length - perView);
  const [start, setStart] = useState(0);

  const visible = SCREENS.slice(start, start + perView);

  return (
    <div>
      <div className="car-wrap">
        <button
          className="arrow"
          aria-label="Previous"
          disabled={start === 0}
          onClick={() => setStart(Math.max(0, start - 1))}
        >
          &#8249;
        </button>
        <div className="car-track">
          {visible.map((name) => (
            <img key={name} src={`/screens/${name}.svg`} alt={name} />
          ))}
        </div>
        <button
          className="arrow"
          aria-label="Next"
          disabled={start === maxStart}
          onClick={() => setStart(Math.min(maxStart, start + 1))}
        >
          &#8250;
        </button>
      </div>
      <div className="dots">
        {Array.from({ length: maxStart + 1 }).map((_, i) => (
          <button
            key={i}
            className={i === start ? "active" : ""}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setStart(i)}
          />
        ))}
      </div>
    </div>
  );
}
