import Nav from "@/components/Nav";
import SproutLogo from "@/components/SproutLogo";
import AppCarousel from "@/components/AppCarousel";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <main id="top">
      <Nav />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: 40 }}>
        <FloatingSquares />
        <div className="container" style={{ position: "relative", textAlign: "center", paddingTop: 60, paddingBottom: 100 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <SproutLogo size={80} showWordmark={false} />
          </div>
          <h1 style={{ fontSize: 84, maxWidth: 900, margin: "0 auto 36px", lineHeight: 1.0 }}>
            Real team-building. Real environmental impact.
          </h1>
          <p className="lead" style={{ maxWidth: 720, margin: "0 auto 48px" }}>
            A friendly four-week competition that brings your team together, turns everyday
            actions into real environmental impact, and ends with a guaranteed donation to a
            verified conservation project. Engaging for them. Effortless for you.
          </p>
          <a href="#contact" className="btn-primary">Book a 20-minute intro call</a>
          <p style={{ color: "var(--muted)", marginTop: 24 }}>No setup work on your side. We run the whole thing.</p>
        </div>
      </section>

      {/* HEALTHY COMPETITION */}
      <section id="how" className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <h2 style={{ fontSize: 52, marginBottom: 40 }}>A bit of healthy competition, for a serious cause.</h2>
          <p className="lead">
            Over four to six weeks, your team earns points for everyday eco-conscious actions:
            cycling in, a meatless lunch, a second-hand find, a weekend beach clean. Points build
            streaks, climb a live leaderboard, and turn a quiet office value into something people
            actually talk about at their desks. At the end, your company makes a real donation to a
            verified environmental project, and the winning team chooses where it goes. The good
            gets done either way. They just get to point it.
          </p>
        </div>
      </section>

      {/* THREE CARDS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 style={{ fontSize: 52, textAlign: "center", marginBottom: 64 }}>Built to be played, not endured.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            <Card title="Compete" body="Department against department, or everyone for the top spot in smaller teams. A live leaderboard keeps it loud all the way to the finish." />
            <Card title="Level up" body="Every action grows a personal score and unlocks new tiers. Small wins early, real bragging rights by the end." />
            <Card title="Learn as you go" body="A light weekly read shows the team easy, genuine ways to live a little greener, with no lectures and nothing they have to buy." />
          </div>
        </div>
      </section>

      {/* REAL EFFORT */}
      <section id="impact" className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <h2 style={{ fontSize: 52, marginBottom: 40 }}>Real effort. Real money. Real impact.</h2>
          <p className="lead" style={{ marginBottom: 48 }}>
            Every Sprout programme funds verified work on the ground through partners we have vetted
            ourselves: reforestation, wildlife conservation, and ocean and river cleanup. We only
            work with projects that have multi-year monitoring and certified results, so the impact
            you point to is real, not a logo on a website. The donation is guaranteed from the
            moment you sign on. The competition simply decides which of our partners your people
            send it to, and that single choice turns out to be the most talked-about moment of the
            whole programme.
          </p>
          <blockquote style={{ borderLeft: "4px solid var(--green)", paddingLeft: 28, margin: 0 }}>
            <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 36, lineHeight: 1.2 }}>
              The good is guaranteed. Your team just gets to choose its shape.
            </p>
          </blockquote>
        </div>
      </section>

      {/* WALK AWAY / VIDEO */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <h2 style={{ fontSize: 52, marginBottom: 36 }}>You walk away with something worth sharing.</h2>
          <p className="lead" style={{ marginBottom: 56 }}>
            At the end of every programme we produce a short, beautifully made film: your team, your
            impact, the project you funded. It is built to be proud of and made to be posted. A
            culture moment your people remember and a values story your company can actually show,
            not just claim.
          </p>
          <div
            style={{
              background: "var(--cream-soft)",
              borderRadius: 24,
              aspectRatio: "16 / 10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div style={{ width: 84, height: 84, borderRadius: "50%", background: "rgba(31,157,82,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "var(--green)", fontSize: 30, marginLeft: 6 }}>▶</span>
            </div>
            <p style={{ color: "var(--muted)" }}>An example film is in the works. You will be able to show your programme here.</p>
          </div>
        </div>
      </section>

      {/* HARDEST PART */}
      <section className="section">
        <div className="container" style={{ maxWidth: 920 }}>
          <h2 style={{ fontSize: 52, marginBottom: 36 }}>The hardest part is telling your team it is starting.</h2>
          <p className="lead" style={{ marginBottom: 48 }}>
            Plenty of companies try to run something like this in-house, then quietly drop it when
            they realise the admin becomes someone's full-time job. That someone is us. We handle
            the setup, the platform, the verification, the donation, and the film. You bring your
            team and a date to start.
          </p>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0 }}>
              <SproutLogo size={64} showWordmark={false} />
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 22, marginBottom: 18 }}>
                One simple app your team will actually want to open.
              </p>
              <p style={{ marginBottom: 10 }}><Check /> We handle setup, verification, the donation, and the film.</p>
              <p><Check /> One point of contact, from kickoff to final film.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <AppCarousel />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ background: "var(--cream-soft)" }} className="section">
        <div className="container" style={{ textAlign: "center", maxWidth: 820 }}>
          <h2 style={{ fontSize: 60, marginBottom: 32 }}>Give your team something good to compete over.</h2>
          <p className="lead" style={{ marginBottom: 48 }}>
            We are taking on a small number of founding programmes now. If your company already
            cares about this and you want a culture win with real impact behind it, let's talk.
          </p>
          <a href="#contact" className="btn-primary">Book a 20-minute intro call</a>
          <p style={{ color: "var(--muted)", marginTop: 24 }}>A quick chat to see if it is a fit. No deck, no pressure.</p>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="contact" className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 52, marginBottom: 18 }}>Book your intro call</h2>
            <p className="lead">Tell us a little about your team and we'll find a time.</p>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <SproutLogo size={44} />
          </div>
          <nav style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginBottom: 24, fontFamily: "var(--font-head)", fontWeight: 500 }}>
            <a href="#how">How It Works</a>
            <a href="#impact">Impact</a>
            <a href="#contact">Contact</a>
            <a href="#contact">Book Your Intro Call</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </nav>
          <p style={{ color: "var(--muted)", marginBottom: 8 }}>hello@sproutclimate.com</p>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>Sprout. Saving the Planet's Resources, One Upload at a Time.</p>
        </div>
      </footer>
    </main>
  );
}

function Card({ title, body }) {
  return (
    <div style={{ background: "var(--card)", borderRadius: 20, padding: "40px 36px", border: "1px solid rgba(0,0,0,0.04)", boxShadow: "0 12px 30px rgba(0,0,0,0.03)" }}>
      <h3 style={{ fontSize: 28, marginBottom: 18 }}>{title}</h3>
      <p style={{ color: "var(--muted)", fontSize: 17 }}>{body}</p>
    </div>
  );
}

function Check() {
  return <span style={{ color: "var(--green)", fontWeight: 700, marginRight: 10 }}>✓</span>;
}

function FloatingSquares() {
  const sq = (style) => (
    <div style={{ position: "absolute", borderRadius: 28, background: "rgba(110,150,120,0.10)", ...style }} />
  );
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {sq({ width: 320, height: 360, left: -80, top: 120, transform: "rotate(-8deg)" })}
      {sq({ width: 220, height: 240, right: 60, top: 60, background: "rgba(247,246,240,0.7)", transform: "rotate(6deg)" })}
      {sq({ width: 300, height: 320, right: -60, top: 260, transform: "rotate(-4deg)" })}
      {sq({ width: 260, height: 280, left: 40, top: 420, transform: "rotate(5deg)" })}
    </div>
  );
}
