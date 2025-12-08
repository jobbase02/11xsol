"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Layers, Code2, Cpu } from "lucide-react";

// --- MOCK DATA (Replace with your actual projects later) ---
const PROJECTS = [
  {
    id: 1,
    title: "FinTech Dashboard Pro",
    category: "SaaS",
    description: "A high-frequency trading dashboard handling 50k+ socket events per second with real-time visualization.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80",
    stack: ["Next.js", "Supabase", "Recharts", "WebSockets"],
    link: "#",
    color: "from-blue-600 to-cyan-400"
  },
  {
    id: 2,
    title: "Luxe Estate",
    category: "Web Development",
    description: "Award-winning real estate platform with 3D virtual tours and automated booking systems.",
    image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80",
    stack: ["React", "Three.js", "GSAP", "Stripe"],
    link: "#",
    color: "from-purple-600 to-pink-400"
  },
  {
    id: 3,
    title: "Nebula AI",
    category: "AI Integration",
    description: "Generative AI interface for marketing teams to automate copy and asset creation.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
    stack: ["OpenAI API", "Node.js", "Postgres", "Redis"],
    link: "#",
    color: "from-emerald-600 to-green-400"
  },
  {
    id: 4,
    title: "Orbit E-Com",
    category: "Shopify",
    description: "Headless Shopify storefront maximizing conversion rates through ISR and edge caching.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80",
    stack: ["Shopify", "Next.js", "Vercel Analytics"],
    link: "#",
    color: "from-orange-600 to-red-400"
  }
];

const CATEGORIES = ["All", "SaaS", "Web Development", "AI Integration", "Shopify"];

// --- COMPONENTS ---

const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
  </div>
);

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <TechGridBackground />

      {/* --- HERO --- */}
      <section className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
            <Layers size={12} className="text-blue-500" />
            Selected Case Studies
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-almarena tracking-tighter mb-6">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">WORK</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We don't just write code; we engineer digital assets that drive revenue.
            Explore how we've transformed ideas into scalable reality.
          </p>
        </motion.div>

        {/* --- FILTERS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300
                ${activeCategory === cat 
                  ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                  : "bg-zinc-900/50 border-white/10 text-zinc-500 hover:text-white hover:border-white/30"}
              `}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* --- GALLERY GRID --- */}
      <section className="relative z-10 px-6 pb-32 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/30 backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                {/* Background Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0`}></div>

                {/* Image */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white">
                            {project.category}
                        </span>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
                                <Github size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/10 hover:bg-white hover:text-black transition-all">
                                <ExternalLink size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl font-bold font-almarena text-white mb-3">{project.title}</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden md:block">
                            {project.description}
                        </p>
                        
                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map(tech => (
                                <span key={tech} className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 border-t border-white/10 bg-black relative overflow-hidden">
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold font-almarena text-white mb-6">Have a similar project?</h2>
            <Link href="/book?utm_source=work_page" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all">
                Start Building <ArrowUpRight size={20} />
            </Link>
         </div>
      </section>
    </div>
  );
}