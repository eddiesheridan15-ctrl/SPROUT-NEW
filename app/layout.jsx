import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://renyu.co.uk"),
  title: "RENYU, Bring your team together. Leave the planet better.",
  description:
    "A friendly four-week team competition that turns everyday actions into real environmental impact, and ends with a guaranteed donation to a verified conservation project.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/renyu-appicon.png",
  },
  openGraph: {
    title: "RENYU, Bring your team together. Leave the planet better.",
    description:
      "A four-week team competition that turns everyday actions into real environmental impact, ending with a guaranteed donation to a verified conservation project.",
    url: "https://renyu.co.uk",
    siteName: "RENYU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RENYU, Bring your team together. Leave the planet better.",
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
