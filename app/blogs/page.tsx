"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp, Code2, Palette } from "lucide-react";

// --- DUMMY DATA ---
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Death of Traditional SEO: Enter SGE",
    slug: "future-of-seo-ai",
    category: "Strategy",
    date: "MAR 15",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    size: "hero", // Takes up 2x2 space
  },
  {
    id: 2,
    title: "Scaling Ads: The 'Vertical' Method",
    slug: "facebook-ads-scaling",
    category: "Growth",
    date: "MAR 10",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    size: "tall", // Takes up 1x2 space
  },
  {
    id: 3,
    title: "Design Systems in 2025",
    slug: "design-systems",
    category: "Design",
    date: "MAR 05",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop",
    size: "normal",
  },
  {
    id: 4,
    title: "Next.js 14 Server Actions",
    slug: "nextjs-server-actions",
    category: "Tech",
    date: "FEB 28",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
    size: "normal",
  },
  {
    id: 5,
    title: "Copywriting Psychology",
    slug: "copywriting-psych",
    category: "Strategy",
    date: "FEB 22",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=2668&auto=format&fit=crop",
    size: "wide", // Takes up 2x1 space
  },
];

const CATEGORIES = ["All", "Strategy", "Growth", "Design", "Tech"];

// --- NOISE OVERLAY COMPONENT ---
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

// --- MARQUEE COMPONENT ---
const Marquee = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-blue-600 text-black py-3 font-mono text-sm font-bold uppercase tracking-widest select-none rotate-[-1deg] scale-110 mb-20 border-y-2 border-black">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-4">
            <Sparkles size={14} /> LATEST INTELLIGENCE <span className="text-white">///</span> DIGITAL DOMINANCE
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function UltraModernBlog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const filteredPosts = BLOG_POSTS.filter((post) => 
    selectedCategory === "All" || post.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-blue-500/90 selection:text-black overflow-x-hidden">
      
      <NoiseOverlay />

      {/* --- AMBIENT GLOWS --- */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[150px] animate-pulse" />
         <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="relative z-10 pt-32 pb-12 px-6 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-8">
            INSIGHTS.
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8">
            <p className="text-xl md:text-2xl text-gray-400 max-w-lg font-light leading-relaxed">
              Decoding the algorithms of digital growth. <br/>
              <span className="text-white font-medium">Read. Implement. Dominate.</span>
            </p>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-8 md:mt-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                    selectedCategory === cat 
                      ? "bg-white text-black border-white" 
                      : "bg-transparent text-gray-500 border-white/10 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      {/* --- KINETIC MARQUEE --- */}
      <Marquee />

      {/* --- THE ULTRA GRID --- */}
      <section className="relative z-10 px-4 md:px-6 pb-32 max-w-[1600px] mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[350px]">
          
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => {
              // Grid Logic
              const isHero = post.size === "hero";
              const isTall = post.size === "tall";
              const isWide = post.size === "wide";
              
              const gridClass = isHero ? "md:col-span-2 md:row-span-2" 
                              : isTall ? "md:row-span-2" 
                              : isWide ? "md:col-span-2" 
                              : "col-span-1";

              return (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`group relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/5 cursor-pointer ${gridClass}`}
                >
                  <Link href={`/blog/${post.slug}`} className="block w-full h-full relative">
                    
                    {/* Image Layer */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                      />
                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-between">
                      
                      <div className="flex justify-between items-start">
                        <span className="inline-block px-3 py-1 rounded-sm bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-white/10">
                           {post.category}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-white/10">
                           <ArrowUpRight size={18} />
                        </div>
                      </div>

                      <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                         <div className="flex items-center gap-3 text-xs font-mono text-blue-400 mb-3 opacity-80">
                           <span>{post.date}</span>
                           <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                           <span>{post.readTime} READ</span>
                         </div>
                         <h2 className={`${isHero ? 'text-4xl md:text-5xl' : 'text-2xl'} font-bold leading-[0.95] text-white group-hover:text-blue-200 transition-colors`}>
                           {post.title}
                         </h2>
                      </div>
                    </div>

                  </Link>
                </motion.article>
              );
            })}

            {/* --- INTEGRATED CTA CARD (Appears naturally in grid) --- */}
            <motion.div 
               layout
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="md:col-span-1 md:row-span-1 bg-blue-600 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-blue-400/30"
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-multiply"></div>
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400 blur-3xl rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>

               <div className="relative z-10">
                 <TrendingUp className="mb-4 text-black" size={32} />
                 <h3 className="text-2xl font-black text-black leading-tight">
                   NEED TRAFFIC <br/> LIKE THIS?
                 </h3>
               </div>
               
               <div className="relative z-10">
                 <button className="w-full py-3 bg-black text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                   Book Strategy Call
                 </button>
               </div>
            </motion.div>

          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- FOOTER TEASER --- */}
      <section className="border-t border-white/10 py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your agency?</h2>
           <p className="text-gray-400 mb-8">Join the 1% of marketers dominating the landscape.</p>
           <div className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 cursor-pointer transition-colors text-lg font-bold">
              VIEW CASE STUDIES <ArrowUpRight />
           </div>
        </div>
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </section>

    </div>
  );
}