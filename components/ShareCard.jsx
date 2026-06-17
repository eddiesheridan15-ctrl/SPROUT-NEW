"use client";

/**
 * "The proof" cascade: three LinkedIn-style posts from different GreenCo
 * departments, all about the same 4-week Renyu competition. Desktop shows a
 * diagonal cascade; mobile collapses to the single front card (see globals.css).
 */

const POSTS = [
  {
    key: "tom",
    cls: "li-pos-back",
    initials: "TM",
    avBg: "#1f7a4d",
    name: "Tom Mitchell",
    role: "Operations · GreenCo",
    body: (
      <>
        Didn&apos;t expect a 4-week eco challenge to be the thing Ops actually
        talks about. Our team at <b>GreenCo</b> funded real reforestation.{" "}
        <b>Proud of this one.</b> &#127793;
      </>
    ),
    photo: "/post-forest-floor.jpg",
    alt: "A young sprout on a mossy forest floor",
    reacts: (
      <>
        <span className="li-react li-react-like">&#128077;</span>
        <span className="li-react li-react-bang">&#8252;&#65039;</span>
      </>
    ),
    count: "184",
    comments: "26",
  },
  {
    key: "ria",
    cls: "li-pos-mid",
    initials: "RW",
    avBg: "#a8431f",
    name: "Ria Walsh",
    role: "Marketing Lead · GreenCo",
    body: (
      <>
        Marketing logged 2,750+ small actions this month and turned it into a
        guaranteed donation. Beat Finance by 40 points too. &#128527;{" "}
        <b>This is how you do team-building.</b>
      </>
    ),
    photo: "/post-soil-sprout.jpg",
    alt: "A green sprout emerging from dark soil",
    reacts: (
      <>
        <span className="li-react li-react-like">&#128077;</span>
        <span className="li-react li-react-heart">&#10084;&#65039;</span>
      </>
    ),
    count: "153",
    comments: "19",
  },
  {
    key: "jane",
    cls: "li-pos-front",
    initials: "JS",
    avBg: "#5e3aa6",
    name: "Jane Smith",
    role: "People & Culture Lead · GreenCo",
    body: (
      <>
        Four weeks ago I told our team at GreenCo we were starting a
        competition. Today we donated <b>9,500 trees</b> with the help of{" "}
        <b>Renyu</b>. Half of them rolled their eyes at the start. Nobody is
        rolling them now. &#128580;
      </>
    ),
    photo: "/jane-post.jpg",
    alt: "Newly planted tree saplings in a field",
    reacts: (
      <>
        <span className="li-react li-react-like">&#128077;</span>
        <span className="li-react li-react-heart">&#10084;&#65039;</span>
        <span className="li-react li-react-clap">&#128079;</span>
      </>
    ),
    count: "217",
    comments: "38",
  },
];

function Post({ p }) {
  return (
    <div className={"li-card " + p.cls}>
      <div className="li-top">
        <div className="li-avatar" style={{ background: p.avBg }}>
          {p.initials}
        </div>
        <div className="li-id">
          <div className="li-name">
            {p.name}
            <span className="li-badge">in</span>
            <span className="li-dot">&middot;</span>
            <span className="li-deg">1st</span>
          </div>
          <div className="li-role">{p.role}</div>
          <div className="li-meta">
            2d <span className="li-dot">&middot;</span>{" "}
            <span className="li-globe" aria-hidden="true">
              &#127758;
            </span>
          </div>
        </div>
        <span className="li-more" aria-hidden="true">
          &hellip;
        </span>
      </div>

      <div className="li-body">
        <p>{p.body}</p>
        <span className="li-seemore">&hellip;see more</span>
      </div>

      <div className="li-photo">
        <img src={p.photo} alt={p.alt} />
      </div>

      <div className="li-stats">
        <span className="li-reacts">{p.reacts}</span>
        <span className="li-count">{p.count}</span>
        <span className="li-comments">{p.comments} comments</span>
      </div>

      <div className="li-actions">
        <span className="li-action">
          <span className="li-ic">&#128077;</span> Like
        </span>
        <span className="li-action">
          <span className="li-ic">&#128172;</span> Comment
        </span>
        <span className="li-action">
          <span className="li-ic">&#128257;</span> Repost
        </span>
        <span className="li-action">
          <span className="li-ic">&#10148;</span> Send
        </span>
      </div>
    </div>
  );
}

export default function ShareCard() {
  return (
    <div className="li-stage reveal">
      <div className="li-cascade">
        {POSTS.map((p) => (
          <Post key={p.key} p={p} />
        ))}
      </div>
    </div>
  );
}
