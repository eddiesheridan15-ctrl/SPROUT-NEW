export default function SproutLogo({ size = 40, showWordmark = true, mono = false, onDark = false }) {
  const green = mono ? "currentColor" : "#1f9d52";
  const darkGreen = mono ? "currentColor" : "#15532c";
  const wordColor = onDark ? "#ffffff" : darkGreen;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sprout"
      >
        <defs>
          <linearGradient id="sproutSquare" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3fbf6e" />
            <stop offset="100%" stopColor="#179a4b" />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="88" height="88" rx="24" fill={mono ? "none" : "url(#sproutSquare)"} stroke={mono ? green : "none"} strokeWidth={mono ? 5 : 0} />
        {/* leaf behind the S */}
        <path
          d="M62 30 C70 38 70 54 56 64 C50 68 42 68 36 64 C48 62 58 50 62 30 Z"
          fill={mono ? "none" : "#ffffff"}
          opacity={mono ? 0 : 0.55}
        />
        {/* the S */}
        <path
          d="M64 38 C64 31 57 27 48 27 C39 27 32 32 32 40 C32 56 62 50 62 64 C62 72 54 75 46 75 C37 75 30 70 30 63"
          fill="none"
          stroke={mono ? green : "#ffffff"}
          strokeWidth="11"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 700,
              fontSize: size * 0.62,
              letterSpacing: "0.04em",
              color: wordColor,
            }}
          >
            SPROUT
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: size * 0.18,
              color: wordColor,
              opacity: 0.8,
              marginTop: 3,
            }}
          >
            Saving the Planet One Upload at a Time
          </span>
        </span>
      )}
    </span>
  );
}
