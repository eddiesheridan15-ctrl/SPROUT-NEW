const Mark = () => (
  <img src="/renyu-badge.png" alt="RENYU" width="256" height="256" />
);

export default function LegalShell({ title, updated, children }) {
  return (
    <div className="legal">
      <header className="legal-top">
        <a href="/" className="legal-brand" aria-label="Back to RENYU home">
          <span className="legal-mark">
            <Mark />
          </span>
          <span className="legal-name">RENYU</span>
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
          Renyu. Bring your team together. Leave the planet better.
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
