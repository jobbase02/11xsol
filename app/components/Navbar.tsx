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

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock Body Scroll when Mobile Menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/blogs" }, // Renamed for professional feel
  ];

  return (
    <>
      {/* --- DESKTOP & MOBILE NAVBAR --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? "pt-4" : "pt-6"
        }`}
      >
        <div
          className={`relative flex items-center justify-between px-6 transition-all duration-500 ease-in-out ${
            scrolled || isOpen
              ? "w-[95%] md:w-[70%] lg:w-[60%] bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 py-3 rounded-full"
              : "w-[95%] md:w-[85%] bg-transparent border-transparent py-4"
          }`}
        >
          {/* LOGO */}
          <a
            href="/"
            className="flex items-center gap-2 group z-50 relative"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300 border border-white/10">
              <span className="font-almarena font-bold text-white text-lg tracking-tighter">11X</span>
            </div>
            <span className={`font-bold text-lg tracking-tight transition-colors ${scrolled || isOpen ? "text-white" : "text-white/90"}`}>
              Solutions
            </span>
          </a>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-full group overflow-hidden"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Hover Glow Effect */}
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              </a>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:block">
            <a
              href="/book?utm_source=navbar&utm_medium=cta&utm_campaign=book_call"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full overflow-hidden transition-all hover:bg-zinc-200"
            >
               <span className="relative z-10 flex items-center gap-2">
                 Book Call <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </span>
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white active:scale-90 transition-all"
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

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black md:hidden flex flex-col justify-center"
          >
            {/* Background Tech Grid (To match theme) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50"></div>
            
            {/* Ambient Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative w-full px-6 flex flex-col gap-6">
               <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                  className="flex flex-col gap-6"
               >
                 <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 border-b border-white/10 pb-4">
                    Navigation
                 </div>

                 {navLinks.map((link) => (
                   <motion.a
                     key={link.name}
                     href={link.href}
                     onClick={() => setIsOpen(false)}
                     variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 },
                     }}
                     className="text-4xl font-bold text-white hover:text-blue-500 transition-colors tracking-tight flex items-center gap-4 group"
                   >
                     {/* Decorative Dot */}
                     <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-blue-500 transition-colors"></span>
                     {link.name}
                   </motion.a>
                 ))}

                  <motion.div 
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                     }}
                    className="pt-8"
                  >
                     <a
                        href="/book"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center justify-between px-8 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)]"
                      >
                        Start a Project
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                           <ArrowRight size={20} />
                        </div>
                     </a>
                  </motion.div>
               </motion.div>
            </div>

            {/* Footer Info */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="absolute bottom-10 left-0 w-full text-center"
            >
               <p className="text-zinc-600 text-sm font-mono">
                  Designed by Engineers.
               </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;