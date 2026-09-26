import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import LocalFont from "next/font/local"
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

import SmoothScroll from "./components/SmoothScroll";
import PreloaderProvider from "./components/Preloader";

const almarena = LocalFont({
  src: "/Fonts/Almarena/almarenaneue-regular.otf",
  variable: "--font-almarena"
})

const manrope = LocalFont({
  src: "/Fonts/Manrope/Manrope-VariableFont_wght.ttf",
  variable: "--font-manrope"
})

export const metadata: Metadata = {
  title: "ElevenXsolutions",
  description: "Your Digital Partner",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "11XSolutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${almarena.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="11XSolutions" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-white text-zinc-900 font-manrope selection:bg-blue-500/20 selection:text-blue-950">
        <PreloaderProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
            <ChatBot />
          </SmoothScroll>
        </PreloaderProvider>
      </body>
    </html>
  );
}
