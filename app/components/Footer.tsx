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
  MapPin
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-zinc-50 pt-20 pb-10 border-t border-zinc-200 overflow-hidden">

      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Container (Full Width) */}
      <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">

          {/* COLUMN 1: BRAND (Span 4) */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group ">
              {/* Logo */}
              <div className="relative w-48 h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo3.png"
                  alt="11X Solutions Logo"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <p className="text-zinc-600 text-base leading-relaxed max-w-sm mb-8">
              ElevenX Solutions is a premium digital engineering agency. We build high-performance websites, scalable apps, and next-gen interfaces for ambitious brands.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <Github size={20} />, href: "#" },
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/company/103705779" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* LINKS GRID (Span 8) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Services */}
            <div>
              <h4 className="text-black font-bold mb-8 text-lg">Services</h4>
              <ul className="space-y-4 text-base text-zinc-600">
                <li><Link href="/WebDevelopment" className="hover:text-blue-600 transition-colors">Web Development</Link></li>
                <li><Link href="/saasengineering" className="hover:text-blue-600 transition-colors">SaaS Engineering</Link></li>
                <li><Link href="/ui-ux-design" className="hover:text-blue-600 transition-colors">UI/UX Design</Link></li>
                <li><Link href="/api-integration" className="hover:text-blue-600 transition-colors">API Integration</Link></li>
                <li><Link href="/seo-optimization" className="hover:text-blue-600 transition-colors">SEO Optimization</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-black font-bold mb-8 text-lg">Company</h4>
              <ul className="space-y-4 text-base text-zinc-600">
                <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link href="/work" className="hover:text-blue-600 transition-colors">Our Work</Link></li>
                <li><Link href="/blogs" className="hover:text-blue-600 transition-colors">Insights / Blog</Link></li>
                <li><Link href="/book" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                {/* <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li> */}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-black font-bold mb-8 text-lg">Contact</h4>
              <ul className="space-y-6 text-base text-zinc-600">
                <li>
                  <a href="mailto:info@elevenxsolutions.com" className="flex items-center gap-3 hover:text-blue-600 transition-colors group">
                    <Mail size={18} className="text-zinc-500 group-hover:text-blue-600 transition-colors" />
                    info@elevenxsolutions.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-blue-600 transition-colors group">
                    <Phone size={18} className="text-zinc-500 group-hover:text-blue-600 transition-colors" />
                    +91 1234567890                    </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-zinc-500 mt-1 flex-shrink-0" />
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
        <div className="border-t border-zinc-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500 font-mono">
          <p>
            &copy; {currentYear} ElevenX Solutions. Engineered for Growth.
          </p>
          <div className="flex gap-8 md:gap-12">
            <Link href="/privacy" className="hover:text-zinc-900 transition-colors">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-zinc-900 transition-colors">
              Terms of Service
            </Link>

            <a href="/sitemap.xml" className="hover:text-zinc-900 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
