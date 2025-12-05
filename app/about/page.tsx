"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
// FIX: Added ArrowUpRight to the import list below
import { Terminal, Shield, Zap, Globe, Cpu, Award, ArrowUpRight } from "lucide-react";
import CountUp from "@/components/CountUp"; 

const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
  </div>
);

const ValueCard = ({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-blue-500/30 transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors mb-6">
        {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <TechGridBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
                    <Cpu size={12} />
                    Who We Are
                </div>
                <h1 className="text-5xl md:text-7xl font-bold font-almarena text-white leading-[1.1] mb-6">
                    Architects of the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">New Internet.</span>
                </h1>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-lg">
                    ElevenX Solutions wasn't founded by marketers. It was founded by engineers who were tired of bloated code and slow websites. We believe speed is the ultimate feature.
                </p>
                <div className="flex gap-4">
                    <Link href="/book" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors">
                        Join the Movement
                    </Link>
                    <Link href="/work" className="px-6 py-3 bg-zinc-900 border border-white/10 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors">
                        View Work
                    </Link>
                </div>
            </motion.div>

            {/* Abstract Code Visual */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-[100px]"></div>
                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 font-mono text-xs md:text-sm text-zinc-400 shadow-2xl">
                    <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <div className="space-y-1">
                        <p><span className="text-purple-400">const</span> <span className="text-blue-400">ElevenX</span> = <span className="text-purple-400">new</span> Agency({`{`}</p>
                        <p className="pl-4">mission: <span className="text-green-400">'Dominate Digital'</span>,</p>
                        <p className="pl-4">focus: [<span className="text-green-400">'Speed'</span>, <span className="text-green-400">'Scale'</span>, <span className="text-green-400">'Security'</span>],</p>
                        <p className="pl-4">founded: <span className="text-orange-400">2024</span>,</p>
                        <p className="pl-4">location: <span className="text-green-400">'Global'</span>,</p>
                        <p>{`}`});</p>
                        <br/>
                        <p><span className="text-purple-400">await</span> ElevenX.<span className="text-blue-300">deploy</span>();</p>
                        <p className="text-zinc-600">// System Ready...</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: "Lines of Code", value: 1000000, suffix: "+" },
                { label: "Projects Shipped", value: 50, suffix: "+" },
                { label: "Client Revenue", value: 10, suffix: "M+" },
                { label: "Uptime", value: 99.9, suffix: "%" },
            ].map((stat, i) => (
                <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 flex justify-center items-baseline">
                        <CountUp to={stat.value} duration={2} separator="," />
                        <span className="text-blue-500 ml-1">{stat.suffix}</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* --- VALUES GRID --- */}
      <section className="py-24 relative z-10 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-almarena text-white mb-4">Our Core Protocol</h2>
            <p className="text-zinc-400">The non-negotiable principles that drive our engineering.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            <ValueCard 
                delay={0.1}
                icon={<Zap size={24} />}
                title="Extreme Performance"
                desc="We treat milliseconds like gold. Every site we build is optimized for Core Web Vitals, ensuring near-instant load times."
            />
            <ValueCard 
                delay={0.2}
                icon={<Shield size={24} />}
                title="Ironclad Security"
                desc="Security isn't an addon; it's the foundation. We implement enterprise-grade firewalls and encryption by default."
            />
            <ValueCard 
                delay={0.3}
                icon={<Globe size={24} />}
                title="Global Scalability"
                desc="Built on edge networks. Whether you have 100 visitors or 1 million, your infrastructure will handle the load automatically."
            />
        </div>
      </section>

      {/* --- TEAM SECTION (Placeholder) --- */}
      <section className="py-24 bg-zinc-900/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold font-almarena text-white mb-4">The Engineers</h2>
                    <p className="text-zinc-400 max-w-md">A distributed team of senior developers, designers, and system architects.</p>
                </div>
                <Link href="/book" className="hidden md:flex items-center gap-2 text-blue-400 hover:text-white transition-colors text-sm font-bold">
                    Join the team <ArrowUpRight size={16} />
                </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 aspect-[4/5]">
                         {/* Replace with real team photos later */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                        <Image 
                            src={`https://images.unsplash.com/photo-${i === 1 ? '1507003211169-0a1dd7228f2d' : i === 2 ? '1494790108377-be9c29b29330' : '1500648767791-00dcc994a43e'}?auto=format&fit=crop&q=80`}
                            alt="Team Member"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute bottom-0 left-0 p-6 z-20">
                            <h3 className="text-xl font-bold text-white">Member Name</h3>
                            <p className="text-blue-400 text-xs font-mono uppercase tracking-widest">Full Stack Engineer</p>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </section>

    </div>
  );
}