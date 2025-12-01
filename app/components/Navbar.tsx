"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    if (isOpen) {
      // Freeze background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out px-2 md:px-0 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 rounded-2xl transition-all duration-300 flex justify-between items-center ${
            scrolled
              ? "bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-900/10 py-3"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 group"
          >
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-0 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-black rounded-lg rotate-0 scale-90 group-hover:scale-100 transition-transform duration-300 border border-blue-500/30"></div>
              <span className="relative z-10 text-blue-500 font-bold text-base lg:text-xl">
                11X
              </span>
            </div>
            <span className="group-hover:text-blue-400 transition-colors">
              Solutions
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-almarena">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm lg:text-base font-medium text-zinc-400 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}

            <a
              href="/book"
              className="relative overflow-hidden px-5 py-2.5 bg-blue-600 text-white text-normal font-bold font-almarena rounded-full group hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2 font-almarena">
                Book a Call{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 relative"
          >
            <motion.div
              initial={false}
              animate={
                isOpen ? { rotate: 180, scale: 1.2 } : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {isOpen ? (
                <X className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              ) : (
                <Menu className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              )}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          >
            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="absolute right-0 top-0 h-full w-[80%] bg-zinc-900/90 backdrop-blur-xl border-l border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.4)] px-6 pt-28"
            >
              {/* Links Container */}
              <motion.div
                className="flex flex-col items-start gap-10"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    variants={{
                      hidden: { opacity: 0, x: 30 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="text-3xl font-light text-zinc-300 hover:text-blue-500 transition-colors drop-shadow-sm"
                  >
                    {link.name}
                  </motion.a>
                ))}

                {/* Modern Divider */}
                <motion.div
                  variants={{
                    hidden: { width: 0, opacity: 0 },
                    visible: { width: "100%", opacity: 1 },
                  }}
                  className="h-px bg-white/10 my-4"
                />

                {/* Book A Call Button — Only Mobile */}
                <motion.a
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { type: "spring", stiffness: 200 },
                    },
                  }}
                  className="px-6 py-3 bg-blue-600 text-white text-xl rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] active:scale-95 transition-all"
                >
                  Book a Call
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
