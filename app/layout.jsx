import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://sprout-new.vercel.app"),
  title: "Sprout, Real team-building. Real environmental impact.",
  description:
    "A friendly four-week team competition that turns everyday actions into real environmental impact, and ends with a guaranteed donation to a verified conservation project.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Sprout, Real team-building. Real environmental impact.",
    description:
      "A four-week team competition that turns everyday actions into real environmental impact, ending with a guaranteed donation to a verified conservation project.",
    url: "https://sprout-new.vercel.app",
    siteName: "Sprout",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprout, Real team-building. Real environmental impact.",
    description:
      "A four-week team competition that turns everyday actions into real environmental impact.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
