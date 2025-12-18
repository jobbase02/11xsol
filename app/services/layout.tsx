import type { Metadata } from "next";

const TITLE = "Services | ElevenXsolutions - Custom Web Development & SaaS Engineering";
const DESCRIPTION = "We architect custom, high-performance digital ecosystems. Specializing in custom web applications, SaaS product engineering, and headless e-commerce solutions.";
const OG_IMAGE = "/og-services.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://elevenxsolutions.com/services",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "ElevenXsolutions Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
