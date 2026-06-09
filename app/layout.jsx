import "./globals.css";

export const metadata = {
  title: "Sprout, Real team-building. Real environmental impact.",
  description:
    "A friendly four-week team competition that turns everyday actions into real environmental impact, and ends with a guaranteed donation to a verified conservation project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
