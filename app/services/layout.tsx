import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | ElevenXsolutions - Custom Web Development & SaaS Engineering",
  description: "We architect custom, high-performance digital ecosystems. Specializing in custom web applications, SaaS product engineering, and headless e-commerce solutions.",
  openGraph: {
    title: "Services | ElevenXsolutions - Custom Web Development & SaaS Engineering",
    description: "We architect custom, high-performance digital ecosystems. Specializing in custom web applications, SaaS product engineering, and headless e-commerce solutions.",
    type: "website",
    url: "https://elevenxsolutions.com/services",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "ElevenXsolutions Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | ElevenXsolutions - Custom Web Development & SaaS Engineering",
    description: "We architect custom, high-performance digital ecosystems. Specializing in custom web applications, SaaS product engineering, and headless e-commerce solutions.",
    images: ["/og-services.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
