import SproutLogo from "./SproutLogo";

export default function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(247,246,240,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
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
          <SproutLogo size={40} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 40 }} className="nav-links">
          <a href="#how" style={{ fontFamily: "var(--font-head)", fontWeight: 500 }}>How It Works</a>
          <a href="#impact" style={{ fontFamily: "var(--font-head)", fontWeight: 500 }}>Impact</a>
          <a href="#contact" style={{ fontFamily: "var(--font-head)", fontWeight: 500 }}>Contact</a>
          <a href="#contact" className="btn-nav">Book Your Intro Call</a>
        </nav>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .nav-links a:not(.btn-nav) { display: none; }
        }
      `}</style>
    </header>
  );
}
