export default function ShareCard() {
  return (
    <div className="share-stage reveal">
      <div className="share-card">
        <div className="sc-top">
          <div className="sc-avatar">AO</div>
          <div>
            <div className="sc-name">Aoife O&apos;Brien</div>
            <div className="sc-sub">Marketing Lead &middot; GreenCo</div>
          </div>
        </div>
        <p className="sc-text">
          Our team just funded <b>1,600 trees</b> &#127793; Four weeks of
          friendly competition against the whole company, one very real
          donation at the end. Proud of this crew.
        </p>
        <div className="sc-img">
          <span className="sc-img-line" />
          <span className="sc-badge">GreenCo &times; Sprout</span>
        </div>
        <div className="sc-foot">
          <span className="sc-react">
            <span className="sc-pill">&#128077;</span>
            <span className="sc-pill">&#128079;</span>
            <span className="sc-pill">&#10084;&#65039;</span>
          </span>
          <span className="sc-count">128 reactions &middot; 14 comments</span>
        </div>
      </div>
    </div>
  );
}
