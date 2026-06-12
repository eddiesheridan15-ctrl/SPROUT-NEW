"use client";
import { useState } from "react";

export default function ShareCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="li-stage reveal">
      <div className="li-card">
        <div className="li-top">
          <div className="li-avatar">JS</div>
          <div className="li-id">
            <div className="li-name">
              Jane Smith
              <span className="li-badge">in</span>
              <span className="li-dot">&middot;</span>
              <span className="li-deg">1st</span>
            </div>
            <div className="li-role">People &amp; Culture Lead | GreenCo</div>
            <div className="li-meta">
              2d <span className="li-dot">&middot;</span>{" "}
              <span className="li-globe" aria-hidden="true">&#127758;</span>
            </div>
          </div>
          <span className="li-more" aria-hidden="true">&hellip;</span>
        </div>

        <div className="li-body">
          <p>
            Four weeks ago I told our team at GreenCo we were starting a
            competition. Today we donated <b>1,600 trees</b> with the help of{" "}
            <b>Sprout</b>. Half of them rolled their eyes at the start. Nobody is
            rolling them now. &#128580;
          </p>
          {expanded && (
            <>
              <p>
                The pitch was simple: split into teams, log small everyday
                actions, climb a leaderboard. The catch, every point pushed a
                real donation closer to landing. No vague &ldquo;we care about
                sustainability&rdquo; line. An actual number, an actual project.
              </p>
              <p>
                And it landed. Those 1,600 trees are planted and monitored for
                years, not a logo on a slide. &#127793;
              </p>
              <p>
                What surprised me most was not the impact. It was watching
                people who barely spoke across departments end up in the same
                group chat at 11pm arguing over who logged what.
              </p>
              <p>
                If you run people and culture and you are tired of team-building
                that everyone forgets by Monday, this is the one thing mine are
                still talking about.
              </p>
            </>
          )}
          {!expanded && (
            <button
              type="button"
              className="li-seemore"
              onClick={() => setExpanded(true)}
            >
              &hellip;see more
            </button>
          )}
        </div>

        <div className="li-photo">
          <img src="/jane-post.jpg" alt="Newly planted tree saplings in a field" />
        </div>

        <div className="li-stats">
          <span className="li-reacts">
            <span className="li-react li-react-like">&#128077;</span>
            <span className="li-react li-react-heart">&#10084;&#65039;</span>
            <span className="li-react li-react-clap">&#128079;</span>
          </span>
          <span className="li-count">217</span>
          <span className="li-comments">38 comments</span>
        </div>

        <div className="li-actions">
          <span className="li-action"><span className="li-ic">&#128077;</span> Like</span>
          <span className="li-action"><span className="li-ic">&#128172;</span> Comment</span>
          <span className="li-action"><span className="li-ic">&#128257;</span> Repost</span>
          <span className="li-action"><span className="li-ic">&#10148;</span> Send</span>
        </div>
      </div>
    </div>
  );
}
