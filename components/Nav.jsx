"use client";
import { useEffect, useState } from "react";
import SproutLogo from "./SproutLogo";

export default function Nav() {
  const [dark, setDark] = useState(true); // hero is dark, so start dark

  useEffect(() => {
    const NAV_H = 84;
    const sections = Array.from(document.querySelectorAll('[data-nav="dark"]'));
    if (!sections.length) return;

    // The nav is "dark" whenever a dark section overlaps the nav bar's band
    // (top of viewport down to the bar's bottom edge).
    const update = () => {
      let onDark = false;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= NAV_H && r.bottom >= 0) {
          onDark = true;
          break;
        }
      }
      setDark(onDark);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className={"site-nav" + (dark ? " on-dark" : "")}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 84,
        }}
      >
        <a href="#top" aria-label="Sprout home">
          <SproutLogo size={40} onDark={dark} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 40 }} className="nav-links">
          <a href="#how">How It Works</a>
          <a href="#impact">Impact</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="btn-nav">Book Your Intro Call</a>
        </nav>
      </div>
    </header>
  );
}
