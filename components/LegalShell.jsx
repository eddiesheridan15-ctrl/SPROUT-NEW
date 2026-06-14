const Mark = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path
      d="M64 38 C64 31 57 27 48 27 C39 27 32 32 32 40 C32 56 62 50 62 64 C62 72 54 75 46 75 C37 75 30 70 30 63"
      fill="none"
      stroke="#fff"
      strokeWidth="11"
      strokeLinecap="round"
    />
  </svg>
);

export default function LegalShell({ title, updated, children }) {
  return (
    <div className="legal">
      <header className="legal-top">
        <a href="/" className="legal-brand" aria-label="Back to Sprout home">
          <span className="legal-mark">
            <Mark />
          </span>
          <span className="legal-name">SPROUT</span>
        </a>
        <a href="/" className="legal-back">
          &larr; Back to site
        </a>
      </header>

      <main className="legal-body">
        <h1>{title}</h1>
        <p className="legal-updated">Last updated: {updated}</p>
        {children}
      </main>

      <footer className="legal-foot">
        <p>
          Sprout. Bring your team together. Leave the planet better.
        </p>
        <p>
          <a href="/privacy">Privacy Policy</a>
          <span className="legal-dot">&middot;</span>
          <a href="/terms">Terms of Service</a>
          <span className="legal-dot">&middot;</span>
          <a href="/dpa">Data Processing Agreement</a>
        </p>
      </footer>
    </div>
  );
}
