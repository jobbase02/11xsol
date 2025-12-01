
"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";



const Footer = () => {
  return (
    <footer className="bg-black pt-16 lg:pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xs">
            <a
              href="#"
              className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 mb-6"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-black font-bold">
                11X
              </div>
              Solutions
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed">
              <span className="text-blue-400 font-semibold">ElevenX Solutions</span> is a Premium Web Development agency building the next generation
              digital products.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
          <p>
            &copy; {new Date().getFullYear()} ElevenX Solutions Agency. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;