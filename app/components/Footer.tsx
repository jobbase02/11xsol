"use client";
import Link from "next/link";
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
    <footer className="relative bg-black pt-20 pb-10 border-t border-white/5 overflow-hidden">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content Container (Full Width) */}
      <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">
          
          {/* COLUMN 1: BRAND (Span 4) */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group mb-6">
                {/* Navbar Logo Code */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-300 border border-white/10">
                    <span className="font-almarena font-bold text-white text-xl tracking-tighter">11X</span>
                </div>
                <div className="flex flex-col justify-center">
                    <span className="font-bold text-xl text-white tracking-tight leading-none">
                        ElevenX
                    </span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none mt-1">
                        Solutions
                    </span>
                </div>
            </Link>
            <p className="text-zinc-400 text-base leading-relaxed max-w-sm mb-8">
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
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all"
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
                <h4 className="text-white font-bold mb-8 text-lg">Services</h4>
                <ul className="space-y-4 text-base text-zinc-500">
                   <li><Link href="/WebDevelopment" className="hover:text-blue-400 transition-colors">Web Development</Link></li>
                   <li><Link href="/saasengineering" className="hover:text-blue-400 transition-colors">SaaS Engineering</Link></li>
                   <li><Link href="/ui-ux-design" className="hover:text-blue-400 transition-colors">UI/UX Design</Link></li>
                   <li><Link href="/api-integration" className="hover:text-blue-400 transition-colors">API Integration</Link></li>
                   <li><Link href="/seo-optimization" className="hover:text-blue-400 transition-colors">SEO Optimization</Link></li>
                </ul>
             </div>

             {/* Company */}
             <div>
                <h4 className="text-white font-bold mb-8 text-lg">Company</h4>
                <ul className="space-y-4 text-base text-zinc-500">
                   <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                   <li><Link href="/work" className="hover:text-blue-400 transition-colors">Our Work</Link></li>
                   <li><Link href="/blogs" className="hover:text-blue-400 transition-colors">Insights / Blog</Link></li>
                   <li><Link href="/book" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                   {/* <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li> */}
                </ul>
             </div>

             {/* Contact Info */}
             <div>
                <h4 className="text-white font-bold mb-8 text-lg">Contact</h4>
                <ul className="space-y-6 text-base text-zinc-500">
                   <li>
                      <a href="mailto:info@elevenxsolutions.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                         <Mail size={18} className="text-zinc-600 group-hover:text-blue-500 transition-colors" />
                         info@elevenxsolutions.com
                      </a>
                   </li>
                   <li>
                      <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                         <Phone size={18} className="text-zinc-600 group-hover:text-blue-500 transition-colors" />
                         +91 8630377915                     </a>
                   </li>
                   <li className="flex items-start gap-3">
                       <MapPin size={18} className="text-zinc-600 mt-1 flex-shrink-0" />
                       <span>
                          Bangalore, India <br/>
                          Remote Worldwide
                       </span>
                   </li>
                </ul>
             </div>

          </div>
        </div>

{/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-600 font-mono">
          <p>
            &copy; {currentYear} ElevenX Solutions. Engineered for Growth.
          </p>
          <div className="flex gap-8 md:gap-12">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
              Privacy Policy
            </Link>
            
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">
              Terms of Service
            </Link>
            
            <a href="/sitemap.xml" className="hover:text-zinc-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;