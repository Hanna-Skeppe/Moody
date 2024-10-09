import { Fugaz_One, Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-openSans",
});

export const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fugaz",
});
