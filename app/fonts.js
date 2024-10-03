import { Inter, Fugaz_One, Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  //weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-openSans",
});

// export const poppins = Poppins({
//   weight: ["300", "400", "600", "700"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

export const fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fugaz",
});
