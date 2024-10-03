//import localFont from "next/font/local";
import "./globals.css";
//import { Fugaz_One, Inter } from "next/font/google";
import { fugaz, openSans } from "./fonts";
import Link from "next/link";

// const inter = Inter({ subsets: ["latin"] });
// const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Moody",
  description: "Track your daily mood every day of the year.",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-6 flex items-center justify-between w-full">
      <Link href={"/"}>
        <h1
          className={`font-fugaz text-base sm:text-lg text-nowrap textGradient `}
        >
          Moody
        </h1>
      </Link>
      <div className="flex items-center justify-between">
        PLACEHOLDER CTA || STATS
      </div>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className="font-fugaz text-indigo-500">Created with 💚</p>
    </footer>
  );

  return (
    <html lang="en" className={`${openSans.variable} ${fugaz.variable}`}>
      <body
        className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col font-openSans text-slate-800`}
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
