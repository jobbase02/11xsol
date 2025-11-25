import type { Metadata } from "next";
import "./globals.css";
import Cursor from './component/Cursor'

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
    <html lang="en">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
