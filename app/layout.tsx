import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import LocalFont from "next/font/local"


const almarena = LocalFont({
    src: "/Fonts/Almarena/almarenaneue-regular.otf",
    variable: "--font-almarena"
}) 

const manrope = LocalFont({
  src:"/Fonts/Manrope/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope"
})

export const metadata: Metadata = {
  title: "ElevenXsolutions",
  description: "Your Digital Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className= {`${almarena.variable} ${manrope.variable}`}>
      <body className="font-manrope">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
