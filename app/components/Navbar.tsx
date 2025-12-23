"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Insights", href: "/blogs" },
  ];

  // const serviceItems = [
  //   "Web Development",
  //   "SaaS Engineering",
  //   "UI/UX Design",
  //   "API Integration",
  //   "SEO Optimization",
  // ];

  const serviceItems = [
    { label: "Web Development", href: "/WebDevelopment" },
    { label: "SaaS Engineering", href: "/saasengineering" },
    { label: "UI/UX Design", href: "/ui-ux-design" },
    { label: "API Integration", href: "/api-integration" },
    { label: "SEO Optimization", href: "/seo-optimization" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 flex justify-center ${
          scrolled ? "pt-4" : "pt-6"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-6 transition-all duration-500 ${
            scrolled || isOpen
              ? "w-[95%] md:w-[70%] lg:w-[60%] bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl py-3 rounded-full"
              : "w-[95%] md:w-[85%] bg-transparent py-4"
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white font-bold">11X</span>
            </div>
            <span className="text-white font-bold text-lg">Solutions</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.name === "Services" ? (
                <div key={link.name} className="relative group">
                  {/* Trigger */}
                  <div className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white cursor-pointer">
                    <span className="relative z-10">Services</span>
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />

                    {/* Hover underline */}
                    <span className="absolute left-3 right-3 bottom-1 h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Dropdown */}
                  <div
                    className="
            absolute top-full left-1/2 -translate-x-1/2
            w-64 rounded-2xl
            bg-zinc-900/95 backdrop-blur-xl
            border border-white/10
            shadow-[0_20px_50px_rgba(0,0,0,0.6)]
            opacity-0 translate-y-3 scale-[0.97]
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
            pointer-events-none group-hover:pointer-events-auto
            transition-all duration-200 ease-out
          "
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 to-transparent opacity-60 pointer-events-none" />

                    <div className="relative py-3">
                      {serviceItems.map((service) => (
                        <Link
                          key={service.label}
                          href={service.href}
                          onClick={() => setIsOpen(false)}
                          className="
                  group/item flex items-center justify-between
                  px-5 py-2.5
                  text-sm font-light font-almarena
                  text-zinc-400 hover:text-white
                  transition-all
                "
                        >
                          <span className="relative">
                            {service.label}
                            {/* left accent bar */}
                            <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-0 w-[2px] bg-blue-500 rounded-full group-hover/item:h-4 transition-all duration-200" />
                          </span>

                          {/* subtle arrow */}
                          <span className="text-blue-500 opacity-0 translate-x-[-4px] group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-full"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:block">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Book Call <ArrowRight size={14} />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white z-50"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black md:hidden px-6 flex flex-col justify-center"
          >
            <div className="space-y-6">
              {/* SERVICES ACCORDION */}
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full text-3xl font-bold text-white"
              >
                Services
                <ChevronDown
                  className={`transition-transform ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-4 space-y-3 overflow-hidden"
                  >
                    {serviceItems.map((service) => (
                      <Link
                        key={service.label}
                        href={service.href}
                        onClick={() => {
                          setIsOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="block text-lg text-zinc-400 hover:text-blue-500 transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* OTHER LINKS */}
              {navLinks
                .filter((l) => l.name !== "Services")
                .map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-3xl font-bold text-white hover:text-blue-500"
                  >
                    {link.name}
                  </Link>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
