"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-50 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 pb-[calc(2rem+env(safe-area-inset-bottom))] border-t border-zinc-200 overflow-hidden">
      {/* Ambient Glow */}
      <div
        className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Content Container (Mobile-First responsive container) */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-12 sm:mb-16">
          {/* COLUMN 1: BRAND (Span 4 on lg) */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl"
              aria-label="ElevenX Solutions Homepage"
            >
              {/* Logo - Sized properly for mobile and desktop without excessive whitespace */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo3.png"
                  alt="ElevenX Solutions Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-sm mb-6 sm:mb-8">
              ElevenX Solutions is a premium digital engineering agency. We build
              high-performance websites, scalable apps, and next-gen interfaces
              for ambitious brands.
            </p>

            {/* Social Icons (WCAG 2.2 compliant: 44px+ touch targets) */}
            <div className="flex items-center gap-3">
              {[
                {
                  icon: <Github size={20} />,
                  href: "#",
                  label: "ElevenX Solutions on GitHub",
                },
                {
                  icon: <Twitter size={20} />,
                  href: "#",
                  label: "ElevenX Solutions on X (Twitter)",
                },
                {
                  icon: <Linkedin size={20} />,
                  href: "https://www.linkedin.com/company/103705779",
                  label: "ElevenX Solutions on LinkedIn",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="min-w-11 min-h-11 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-blue-600 hover:text-white hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-all shadow-sm active:scale-95"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* LINKS GRID (Span 8 on lg) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Services */}
            <div>
              <h4 className="text-zinc-900 font-bold mb-4 sm:mb-6 text-base sm:text-lg">
                Services
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-zinc-600">
                <li>
                  <Link
                    href="/WebDevelopment"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    href="/saasengineering"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    SaaS Engineering
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ui-ux-design"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ai-chatbox"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    AI Chatbots
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-integration"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    API Integration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seo-optimization"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    SEO Optimization
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-zinc-900 font-bold mb-4 sm:mb-6 text-base sm:text-lg">
                Company
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-zinc-600">
                <li>
                  <Link
                    href="/about"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    Insights / Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/book"
                    className="inline-flex items-center min-h-[38px] sm:min-h-0 py-1 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info (spans full width on mobile so long emails don't wrap awkwardly) */}
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
              <h4 className="text-zinc-900 font-bold mb-4 sm:mb-6 text-base sm:text-lg">
                Contact
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-zinc-600">
                <li>
                  <a
                    href="mailto:info@elevenxsolutions.com"
                    className="inline-flex items-center gap-3 min-h-[44px] py-1 hover:text-blue-600 transition-colors group break-all sm:break-normal focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    <Mail
                      size={18}
                      className="text-zinc-500 group-hover:text-blue-600 transition-colors flex-shrink-0"
                    />
                    <span>info@elevenxsolutions.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+911234567890"
                    className="inline-flex items-center gap-3 min-h-[44px] py-1 hover:text-blue-600 transition-colors group focus-visible:outline-none focus-visible:text-blue-600"
                  >
                    <Phone
                      size={18}
                      className="text-zinc-500 group-hover:text-blue-600 transition-colors flex-shrink-0"
                    />
                    <span>+91 1234567890</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 py-1">
                  <MapPin
                    size={18}
                    className="text-zinc-500 mt-1 flex-shrink-0"
                  />
                  <span>
                    Bangalore, India <br />
                    Remote Worldwide
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 pt-8 sm:pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-500 font-mono text-center sm:text-left">
          <p>
            &copy; {currentYear} ElevenX Solutions. Engineered for Growth.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="min-h-[36px] sm:min-h-0 inline-flex items-center hover:text-zinc-900 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="min-h-[36px] sm:min-h-0 inline-flex items-center hover:text-zinc-900 transition-colors"
            >
              Terms of Service
            </Link>

            <a
              href="/sitemap.xml"
              className="min-h-[36px] sm:min-h-0 inline-flex items-center hover:text-zinc-900 transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
