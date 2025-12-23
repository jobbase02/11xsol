import dynamic from "next/dynamic";

export const metadata = {
  title: "API Integration Services | ElevenX Solutions",
  description:
    "Secure, scalable API integration services by ElevenX Solutions. We connect apps, platforms, and services with reliable, high-performance APIs.",
  keywords:
    "API Integration Services, REST API Integration, Third Party API Integration, Backend Integration, API Development Company",
};

import ClientContent from "./ClientContent";

export default function Page() {
  return <ClientContent />;
}
