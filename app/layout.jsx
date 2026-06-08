import "./globals.css";
import { Poppins, Mulish } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-head-import",
});
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-import",
});

export const metadata = {
  title: "Sprout — Real team-building. Real environmental impact.",
  description:
    "A friendly four-week competition that brings your team together, turns everyday actions into real environmental impact, and ends with a guaranteed donation to a verified conservation project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: `${mulish.style.fontFamily}, sans-serif`,
        }}
        className={`${poppins.variable} ${mulish.variable}`}
      >
        <style>{`
          :root {
            --font-head: ${poppins.style.fontFamily}, sans-serif;
            --font-body: ${mulish.style.fontFamily}, sans-serif;
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
