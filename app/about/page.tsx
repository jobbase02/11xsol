"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Mountain,
  Scale, 
  Code2, 
  BookOpen,
  HeartHandshake
} from "lucide-react";

const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
  </div>
);

const ManifestoCard = ({ 
  icon, 
  title, 
  desc, 
  delay 
}: { 
  icon: React.ReactNode, 
  title: string, 
  desc: string, 
  delay: number 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ delay, duration: 0.7, ease: "easeOut" }}
    whileHover={{ y: -6, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-blue-500/40 transition-all group relative overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.65)]"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-blue-300 group-hover:bg-blue-500/15 transition-colors mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 font-almarena tracking-tight">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <TechGridBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-10 md:pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
              <Terminal size={12} />
              Our Philosophy
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-almarena text-white leading-[1.1] mb-6 tracking-tight">
              Technology for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-purple-500">
                Human Potential.
              </span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
              We are a collective of Pragmatic Programmers. We believe software isn&apos;t just about code—it&apos;s about craftsmanship, impact, and building the future responsibly.
            </p>
            <div className="flex gap-4">
              {/* HEARTBEAT + HOVER ANIMATION WRAPPER */}
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: [1, 1.04, 1] }}
                transition={{
                  opacity: { duration: 0.6, ease: "easeOut" },
                  y: { duration: 0.6, ease: "easeOut" },
                  scale: {
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex"
              >
                <Link
                  href="/book"
                  className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_12px_35px_rgba(255,255,255,0.2)] text-sm tracking-wide"
                >
                  Partner With Us
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual: The "Code" Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 rounded-full blur-[120px]"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 font-mono text-xs md:text-sm text-zinc-400 shadow-2xl">
              <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
              </div>
              <div className="space-y-3 leading-loose">
                <p className="text-zinc-500">  {"/* The 11X Manifesto */"}</p>
                <p>
                  <span className="text-purple-400">class</span>{" "}
                  <span className="text-yellow-100">PragmaticAgency</span>{" "}
                  <span className="text-purple-400">implements</span>{" "}
                  <span className="text-yellow-100">Impact</span> {"{"}
                </p>
                <p className="pl-6">
                  <span className="text-blue-400">constructor</span>() {"{"}
                </p>
                <p className="pl-12">
                  this.<span className="text-blue-300">values</span> = [
                  <span className="text-green-400">&apos;Craftsmanship&apos;</span>,{" "}
                  <span className="text-green-400">&apos;Trust&apos;</span>,{" "}
                  <span className="text-green-400">&apos;Harmony&apos;</span>
                  ];
                </p>
                <p className="pl-12">
                  this.<span className="text-blue-300">vision</span> ={" "}
                  <span className="text-green-400">&apos;Long Term Sustainability&apos;</span>;
                </p>
                <p className="pl-6">{"}"}</p>
                <p className="pl-6">
                  <span className="text-blue-400">build</span>(
                  <span className="text-orange-300">client</span>) {"{"}
                </p>
                <p className="pl-12">
                  <span className="text-purple-400">return</span>{" "}
                  client.<span className="text-blue-300">empower</span>().
                  <span className="text-blue-300">scale</span>();
                </p>
                <p className="pl-6">{"}"}</p>
                <p>{"}"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- THE PRAGMATIC STANDARD (Replaces Stats) --- */}
      <section className="border-y border-white/10 bg-zinc-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-wrap md:justify-between justify-center items-center gap-10 md:gap-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <BookOpen size={20} className="text-blue-500" />
              <span className="text-sm font-bold text-zinc-300">
                Life Long Learners
              </span>
            </motion.div>

            <div className="hidden md:block w-px h-8 bg-white/10"></div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <Scale size={20} className="text-purple-500" />
              <span className="text-sm font-bold text-zinc-300">
                Responsible Finance
              </span>
            </motion.div>

            <div className="hidden md:block w-px h-8 bg-white/10"></div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <ShieldCheck size={20} className="text-green-500" />
              <span className="text-sm font-bold text-zinc-300">
                No Broken Windows
              </span>
            </motion.div>

            <div className="hidden md:block w-px h-8 bg-white/10"></div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <HeartHandshake size={20} className="text-orange-500" />
              <span className="text-sm font-bold text-zinc-300">
                Relationship Over Revenue
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- CORE PILLARS --- */}
      <section className="py-16 md:py-24 relative z-10 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-almarena text-white mb-6 tracking-tight">
            The 11X Approach
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            We don&apos;t just &quot;shippit.&quot; We engineer systems that last. 
            Our approach is grounded in the belief that great software is a byproduct of great thinking.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ManifestoCard 
            delay={0.1}
            icon={<Code2 size={24} />}
            title="Software Craftsmanship"
            desc="We view coding as an art form. We adhere to the 'Broken Windows' theory—we fix bad code immediately. We build solutions that are robust, readable, and maintainable, ensuring your tech debt stays at zero."
          />
          <ManifestoCard 
            delay={0.2}
            icon={<Zap size={24} />}
            title="Impact-Driven Engineering"
            desc="What we build matters as much as how we build it. We actively seek projects that contribute to a better future. We aren't just a vendor; we are partners in your mission to create positive change."
          />
          <ManifestoCard 
            delay={0.3}
            icon={<Mountain size={24} />}
            title="Deep Work & Harmony"
            desc="We embrace Work-Life Harmony. Operating with a 'Remote-First' mindset often from quiet, high-altitude environments, we prioritize deep focus over hustle culture. This clarity translates directly into the quality of your product."
          />
          <ManifestoCard 
            delay={0.4}
            icon={<ShieldCheck size={24} />}
            title="The Long View"
            desc="We are bootstrapped and independent. This gives us the freedom to value long-term sustainability over short-term profits. We practice responsible management to ensure we are here to support you for decades, not just quarters."
          />
        </div>
      </section>

      {/* --- CULTURE / BOTTOM SECTION (Replaces Team) --- */}
      <section className="py-24 bg-zinc-900/30 border-t border-white/5 relative overflow-hidden">
        {/* Abstract background for 'Trust' */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-900/15 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
                Sustainability
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-almarena text-white mb-6 tracking-tight">
                Growth rooted in <span className="text-zinc-500">Grounding.</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                We redefine talent. We champion potential over credentials and make mentorship a core value of our tribe. 
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Just as we nurture our code, we nurture our environment. We believe in being &quot;Bootstrapped and Independent,&quot; allowing us to stay true to our vision without external pressure. When you work with us, you get a team that is grounded, focused, and in it for the long haul.
              </p>
              
              <Link href="/book" className="text-white border-b border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-all font-mono uppercase tracking-widest text-sm">
                Join Our Collective &rarr;
              </Link>
            </div>

            {/* Abstract Visual Representation of "Harmony/Connection" */}
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central Node */}
                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] z-20"></div>
                {/* Orbiting Nodes */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-64 h-64 border border-blue-500/30 rounded-full"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                </motion.div>
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-48 h-48 border border-purple-500/30 rounded-full"
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
                </motion.div>
                {/* Connecting Lines */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
                  <p className="text-xs text-zinc-400 font-mono">
                    &quot;We build more than just software; we build connections between people, ideas, and positive change.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
    