// components/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer z-50">
            <h1 className="text-2xl font-bold tracking-tighter text-white">
              ElevenX<span className="text-cyan-400">solutions</span>
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {["Services", "About", "FAQ", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
                </a>
              ))}

              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5">
                Get Started
              </button>
            </div>
          </div>

          <div className="md:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 md:hidden flex flex-col p-4 shadow-2xl">
          {["Services", "About", "FAQ", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
