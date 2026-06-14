"use client";
import { useEffect, useState } from "react";
import LeafHero from "../components/LeafHero";
import AppCarousel from "../components/AppCarousel";
import BookingForm from "../components/BookingForm";
import LiveLeaderboard from "../components/LiveLeaderboard";
import ShareCard from "../components/ShareCard";
import ImpactEarth from "../components/ImpactEarth";

const Mark = () => (
  <svg viewBox="0 0 100 100">
    <path
      d="M64 38 C64 31 57 27 48 27 C39 27 32 32 32 40 C32 56 62 50 62 64 C62 72 54 75 46 75 C37 75 30 70 30 63"
      fill="none"
      stroke="#fff"
      strokeWidth="11"
      strokeLinecap="round"
    />
  </svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.14 }
    );
    document
      .querySelectorAll(".reveal,.stagger")
      .forEach((el) => io.observe(el));

    const nav = document.getElementById("nav");
    const darkSections = Array.from(
      document.querySelectorAll('[data-nav="dark"]')
    );
    let onScroll;
    if (nav && darkSections.length) {
      const NAV_H = 82;
      onScroll = () => {
        let onDark = false;
        for (const el of darkSections) {
          const r = el.getBoundingClientRect();
          if (r.top <= NAV_H && r.bottom >= 0) {
            onDark = true;
            break;
          }
        }
        nav.classList.toggle("on-dark", onDark);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io.disconnect();
      if (onScroll) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
  }, []);

  return (
    <>
      <nav id="nav">
        <div className="nav-in">
          <div className="brand">
            <span className="mark">
              <Mark />
            </span>
            <span>
              <span className="name">SPROUT</span>
              <br />
              <span className="tag">Saving the Planet One Upload at a Time</span>
            </span>
          </div>
          <div className="nav-links">
            <a href="#how">How It Works</a>
            <a href="#impact">Impact</a>
            <a href="#contact">Contact</a>
            <a href="#contact" className="btn">
              <span className="dot" />
              Book Your Intro Call
            </a>
          </div>
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <a href="#how" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#contact" className="btn" onClick={() => setMenuOpen(false)}>
            <span className="dot" />
            Book Your Intro Call
          </a>
        </div>
      </nav>

      <LeafHero />

      <header className="hero" id="top" data-nav="dark">
        <div className="stars" />
        <div className="container">
          <div className="micro dim reveal" style={{ marginBottom: 30 }}>
            A four-week team competition
          </div>
          <h1 className="reveal">
            Real team-building. <span className="g">Real</span> environmental
            impact.
          </h1>
          <div className="hero-foot">
            <div>
              <p className="lead reveal">
                A friendly four-week competition that brings your team together,
                turns everyday actions into real environmental impact, and ends
                with a guaranteed donation to a verified conservation project.
                Engaging for them. Effortless for you.
              </p>
              <a
                href="#contact"
                className="btn btn-lg reveal"
                style={{ marginTop: 36 }}
              >
                <span className="dot" />
                Book a 20-minute intro call
              </a>
            </div>
            <div className="hero-side reveal">
              No setup work on your side. We run the whole thing.
            </div>
          </div>
          <div className="hero-tiles reveal">
            <div className="ht"><b>4 weeks</b><span>one self-contained programme</span></div>
            <div className="ht"><b>1 donation</b><span>guaranteed from day one</span></div>
            <div className="ht"><b>3 causes</b><span>the winning team chooses</span></div>
          </div>
        </div>
        <div className="scroll-cue">
          <span className="line" />
          Scroll
        </div>
      </header>

      <section id="how">
        <div className="container">
          <div className="eyebrow reveal">
            <span className="num">01</span>
            <span className="micro">How it works</span>
          </div>
          <h2 className="reveal">
            A bit of healthy competition, for a serious cause.
          </h2>
          <p className="lead-p reveal">
            Over four weeks, your team earns points for everyday eco-conscious
            actions: cycling in, a meatless lunch, a second-hand find, a weekend
            beach clean. Points build streaks, climb a live leaderboard, and
            turn a quiet office value into something people actually talk about
            at their desks. At the end, your company makes a real donation to a
            verified environmental project, and the winning team chooses where
            it goes. The good gets done either way. They just get to point it.
          </p>
          <LiveLeaderboard />
        </div>
      </section>

      {/* BUILT TO BE PLAYED, leaf-vein diptych */}
      <section id="built" className="built">
        <div className="container">
          <div className="frame reveal">
            <div className="left">
              <div className="bg" />
              <div className="grade" />
              <div className="grade2" />
              <div>
                <span className="tag">The mechanics</span>
                <h2>Built to be played, not endured.</h2>
              </div>
              <p className="foot">
                It looks and feels like an app your team actually wants to open,
                not a chore they are told to finish.
              </p>
            </div>
            <div className="right">
              <div className="item">
                <span className="num">01</span>
                <div>
                  <h3>Compete</h3>
                  <p>
                    Department against department, or everyone for the top spot
                    in smaller teams. A live leaderboard keeps it loud all the
                    way to the finish.
                  </p>
                </div>
              </div>
              <div className="item">
                <span className="num">02</span>
                <div>
                  <h3>Level up</h3>
                  <p>
                    Every action grows a personal score and unlocks new tiers.
                    Small wins early, real bragging rights by the end.
                  </p>
                </div>
              </div>
              <div className="item">
                <span className="num">03</span>
                <div>
                  <h3>Learn as you go</h3>
                  <p>
                    A light weekly read shows the team easy, genuine ways to
                    live a little greener, with no lectures and nothing they
                    have to buy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="carousel-head reveal">A look inside the app</h2>
          <AppCarousel />
        </div>
      </section>

      <section id="impact">
        <div className="container">
          <div className="eyebrow reveal">
            <span className="num">02</span>
            <span className="micro">Impact</span>
          </div>
          <h2 className="reveal">Real effort. Real money. Real impact.</h2>
          <p className="lead-p reveal">
            Every Sprout programme funds verified work on the ground through
            partners we have vetted ourselves: reforestation, wildlife
            conservation, and ocean and river cleanup. We only work with
            projects that have multi-year monitoring and certified results, so
            the impact you point to is real, not a logo on a website. The
            donation is guaranteed from the moment you sign on. The competition
            simply decides which of our partners your people send it to, and
            that single choice turns out to be the most talked-about moment of
            the whole programme.
          </p>
          <ImpactEarth />
          <div className="pull reveal">
            <p>
              The good is <span className="g">guaranteed.</span> Your team just
              gets to choose its shape.
            </p>
          </div>
        </div>
      </section>

      {/* PHOTO PLUNGE */}
      <section className="plunge" data-nav="dark">
        <img className="plunge-img" src="/plunge-forest.jpg" alt="Sunlight through a forest canopy seen from below" />
        <div className="plunge-grad" />
        <div className="plunge-inner">
          <h2 className="reveal">
            Four weeks of competition.
            <br />
            <span>A patch of the planet, repaired.</span>
          </h2>
        </div>
      </section>

      <section className="verify" data-nav="dark">
        <div className="container">
          <div className="v-eyebrow reveal">[&nbsp;&nbsp;How we keep it honest&nbsp;&nbsp;]</div>
          <h2 className="reveal">If we can&apos;t verify it, we don&apos;t fund it.</h2>
          <div className="v-grid reveal">
            <div className="v-tile">
              <h3>Multi-year monitoring</h3>
              <p>Every project we fund is tracked for years, not months. Planting day is the start, not the photo op.</p>
            </div>
            <div className="v-tile">
              <h3>Published standards</h3>
              <p>Results are certified against recognised frameworks, so the numbers stand up outside this website.</p>
            </div>
            <div className="v-tile">
              <h3>Locked in at signing</h3>
              <p>The donation is committed before the first point is scored. The competition decides where, never whether.</p>
            </div>
            <div className="v-tile">
              <h3>Vetted by us</h3>
              <p>Registered charities and non-profits we have checked ourselves, not logos licensed for a landing page.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SHARE LOOP (film section returns here post-launch) */}
      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <h2 className="reveal" style={{ maxWidth: "20ch" }}>
            You walk away with something worth sharing.
          </h2>
          <p className="lead-p reveal" style={{ marginBottom: 0 }}>
            When the donation lands, your people do the telling. Real posts
            from real employees: the team&apos;s win, the project it funded,
            the company that made it happen. A culture moment your people
            remember and a values story your company can actually show, not
            just claim.
          </p>
          <ShareCard />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="reveal" style={{ maxWidth: "16ch" }}>
            The hardest part is telling your team it is starting.
          </h2>
          <p className="lead-p reveal">
            Plenty of companies try to run something like this in-house, then
            quietly drop it when they realise the admin becomes someone&apos;s
            full-time job. That someone is us. We handle the setup, the platform,
            the verification, and the donation. You bring your team and a date to
            start.
          </p>
          <div className="callout reveal">
            <span className="ic">
              <Mark />
            </span>
            <div>
              <h3>One simple app your team will actually want to open.</h3>
              <div className="tick">
                <b>&#10003;</b> We handle setup, verification, and the donation.
              </div>
              <div className="tick">
                <b>&#10003;</b> One point of contact, from kickoff to wrap-up.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="closing" data-nav="dark">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="micro reveal">Founding programmes open now</div>
          <h2 className="reveal">
            Give your team something good to compete over.
          </h2>
          <p className="lead-p reveal">
            We are taking on a small number of founding programmes now. If your
            company already cares about this and you want a culture win with real
            impact behind it, let&apos;s talk.
          </p>
          <a
            href="#contact"
            className="btn btn-lg reveal"
            style={{ background: "var(--green)" }}
          >
            <span className="dot" style={{ background: "#fff" }} />
            Book a 20-minute intro call
          </a>
          <p className="sub reveal">
            A quick chat to see if it is a fit. No deck, no pressure.
          </p>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="form-wrap">
            <div className="form-head">
              <h2 className="reveal">Book your intro call</h2>
              <p className="reveal">
                Tell us a little about your team and we&apos;ll find a time.
              </p>
            </div>
            <div className="reveal">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div
            className="brand"
            style={{ justifyContent: "center", display: "inline-flex" }}
          >
            <span className="mark">
              <Mark />
            </span>
            <span>
              <span className="name">SPROUT</span>
              <br />
              <span className="tag">Saving the Planet One Upload at a Time</span>
            </span>
          </div>
          <div className="foot-links">
            <a href="#how">How It Works</a>
            <a href="#impact">Impact</a>
            <a href="#contact">Contact</a>
            <a href="#contact">Book Your Intro Call</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/dpa">Data Processing Agreement</a>
          </div>
          <p className="em">eddiesheridan15@gmail.com</p>
          <p className="tg">
            Sprout. Saving the Planet&apos;s Resources, One Upload at a Time.
          </p>
        </div>
      </footer>
    </>
  );
}
