import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { fugaz, openSans } from "./fonts";
import LogoutButton from "@/components/LogoutButton";

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
      <LogoutButton />
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className="font-fugaz text-indigo-500">
        Created by Hanna Skeppe with 💚
      </p>
    </footer>
  );

  return (
    <html lang="en" className={`${openSans.variable} ${fugaz.variable}`}>
      <AuthProvider>
        <body
          className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col font-openSans text-slate-800`}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
