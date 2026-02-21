"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Rocket,
  Book,
  Layout,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  Database,
  Zap,
  BarChart,
  Terminal,
  Quote,
  User,
  Monitor,
  Bot,
  Layers,
  Cpu,
} from "lucide-react";
// GlareHover was removed because it is not used in this file
import CountUp from "@/components/CountUp";
import Faq from "./components/Faqs";
import Link from "next/link";

// --- Utility Components ---

import HeroVisual from "./components/HeroVisual";

const GridBackground = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
    {/* Deep Mesh Gradient Orbs */}
    <motion.div
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{
        x: [0, -100, 0],
        y: [0, -50, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px]"
    />

    {/* Primary Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

    {/* Vignette & Masking */}
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,transparent_0%,black_100%)]"></div>
  </div>
);

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

// --- Sections ---

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-black selection:bg-blue-600/40">
      <GridBackground />

      <div className="max-w-7xl mx-auto px-6 w-full z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* TEXT CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative space-y-10"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <div className="relative flex h-2 w-2">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></div>
            </div>
            <span className="text-zinc-400 text-xs font-bold tracking-widest uppercase">
              Now accepting 2026 projects
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-bold font-almarena text-white leading-[0.95] tracking-tighter"
            >
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white/20">
                Digital Legacies.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-zinc-400 max-w-xl leading-relaxed font-light"
            >
              We engineer high-performance digital ecosystems for the next generation of visionary brands. From custom software to immersive web experiences.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <Link
              href="/book"
              className="group relative px-10 py-5 w-full sm:w-fit bg-green-500 text-white font-bold text-lg rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                Initialize Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-zinc-200 transition-transform translate-y-full group-hover:translate-y-0" />
            </Link>

            <Link
              href="/work"
              className="px-10 py-5 w-full sm:w-fit bg-zinc-900/50 backdrop-blur-md border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-zinc-800 transition-all text-center"
            >
              View Archive
            </Link>
          </motion.div>

          {/* Micro Stats */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-12 pt-8 border-t border-white/5"
          >
            {[
              { label: "Execution Time", val: "< 45 Days" },
              { label: "Performance Score", val: "99/100" },
              { label: "Satisfaction Rate", val: "100%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-white font-bold text-lg font-mono">{stat.val}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* VISUAL CONTENT */}
        <HeroVisual />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0" />
        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Scroll</span>
      </motion.div>
    </section>
  );
};
//       color: "from-blue-600 to-blue-400",
//     },
//     {
//       icon: <Book className="text-white" size={24} />,
//       title: "Booking Systems",
//       desc: "Custom booking engines that sync seamlessly with your calendar and payment gateways like Stripe.",
//       color: "from-indigo-600 to-indigo-400",
//     },
//     {
//       icon: <Globe className="text-white" size={24} />,
//       title: "Influencer Marketing",
//       desc: "Turn influencer power into unstoppable brand momentum. More reach, more trust, more sales.",
//       color: "from-purple-600 to-purple-400",
//     },
//     {
//       icon: <Database className="text-white" size={24} />,
//       title: "API Development",
//       desc: "Scalable REST and GraphQL APIs that serve as the backbone for your mobile and web ecosystem.",
//       color: "from-teal-600 to-teal-400",
//     },
//   ];

//   return (
//     <section id="services" className="py-20 lg:py-24 bg-black relative">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={fadeInUp}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-almarena">
//             Expertise That Matters
//           </h2>
//           <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">
//             Tell us how you work? ElevenX Solution will build you the system that works for you.
//             <br className="hidden md:block" /> Built to grow, Built to win.
//           </p>
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//           variants={staggerContainer}
//           className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//               }}
//               whileHover={{ y: -5 }}
//               className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
//             >
//               <div
//                 className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-bl-full blur-2xl transition-opacity duration-500`}
//               ></div>

//               <div
//                 className={`mb-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
//               >
//                 {service.icon}
//               </div>

//               <h3 className="text-xl font-bold text-white mb-4">
//                 {service.title}
//               </h3>
//               <p className="text-zinc-400 text-sm leading-relaxed mb-6">
//                 {service.desc}
//               </p>

//               <div className="flex items-center gap-2 text-sm font-semibold text-white/40 group-hover:text-white transition-colors cursor-pointer">
//                 Learn more <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };


// Services Section
const ServiceCard = ({ service, index, variant = "default" }: { service: any; index: number; variant?: "default" | "featured" | "wide" }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={`group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/[0.04] p-8 flex flex-col transition-all duration-500 hover:border-blue-500/20 hover:shadow-[0_0_80px_rgba(59,130,246,0.05)] ${variant === "wide" ? "md:col-span-2" : "md:col-span-1"
        } ${variant === "featured" ? "h-full justify-between" : "justify-between"}`}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${service.color} opacity-[0.02] group-hover:opacity-[0.08] rounded-bl-full blur-3xl transition-opacity duration-700`} />

      <div className="relative z-10">
        <div className={`mb-6 p-4 w-fit rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-10 backdrop-blur-xl border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
          {service.icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 font-manrope">
          {service.title}
        </h3>
        <p className="text-zinc-500 text-base leading-relaxed group-hover:text-zinc-400 transition-colors">
          {service.desc}
        </p>
      </div>

      <div className="mt-8 relative z-10 flex items-center justify-between">
        <Link
          href="/services"
          className="flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.2em]"
        >
          Explore Protocol <ChevronRight size={14} />
        </Link>
        <div className="text-[10px] font-mono text-zinc-800">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: <Monitor className="text-white" size={28} />,
      title: "Web Engineering",
      desc: "Architecting high-velocity digital ecosystems for the elite 1% of market leaders.",
      color: "from-blue-600 to-cyan-500",
    },
    {
      icon: <Layers className="text-white" size={28} />,
      title: "UI/UX Design",
      desc: "Neuro-centric interfaces designed for absolute user retention and conversion.",
      color: "from-purple-600 to-pink-500",
    },
    {
      icon: <Bot className="text-white" size={28} />,
      title: "AI Automation",
      desc: "Bespoke neural agents that handle your sales while you sleep.",
      color: "from-emerald-600 to-teal-500",
    },
    {
      icon: <Rocket className="text-white" size={28} />,
      title: "SaaS Systems",
      desc: "Full-stack SaaS solutions engineered for multi-tenant scalability and edge-speed performance.",
      color: "from-orange-600 to-amber-500",
    },
  ];

  return (
    <section id="services" className="relative bg-[#030303] py-24 lg:py-32 overflow-hidden">
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-12 bg-blue-500" />
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-blue-500">Expertise</span>
          </div>
          <h2 className="font-almarena text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white/20">Digital Dominance.</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Main Feature / Left Column */}
          <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-6">
            <motion.div
              variants={cardVariants}
              className="relative flex-1 overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-blue-600/20 to-transparent border border-white/[0.04] p-10 flex flex-col justify-end group"
            >
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,#fff_50%)] bg-[size:100%_4px] opacity-[0.03]" />
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Zap size={32} className="text-blue-400" />
                </div>
                <h3 className="text-4xl font-bold text-white leading-tight font-manrope">Execution <br /> Protocol.</h3>
                <p className="text-zinc-500 text-lg">We deliver high-fidelity systems from ideation to launch in &lt; 45 days.</p>
              </div>
              <div className="absolute -right-10 top-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Rocket size={240} className="text-white" />
              </div>
            </motion.div>
          </div>

          {/* Right Column Grid */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {/* Horizontal Top Card */}
              <motion.div
                variants={cardVariants}
                className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/[0.04] p-8 flex flex-col md:flex-row items-center justify-between gap-8 group"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-widest uppercase w-fit">
                    Optimized Performance
                  </div>
                  <h3 className="text-3xl font-bold text-white font-manrope">Performance Engine</h3>
                  <p className="text-zinc-500 max-w-sm">Every build is scored 99+ on lighthouse to ensure absolute speed and SEO dominance.</p>
                </div>
                <div className="relative w-full md:w-64 aspect-video bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart size={64} className="text-blue-500/20 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Smaller Service Cards */}
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Interaction Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-white/5"
        >
          <div className="flex items-center gap-6">
            <p className="text-zinc-600 text-sm font-mono tracking-widest uppercase">Encryption Status: <span className="text-green-500">Secure</span></p>
            <div className="h-1 w-24 bg-zinc-900 overflow-hidden rounded-full">
              <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="h-full w-full bg-blue-500/30" />
            </div>
          </div>
          <Link href="/book" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition">
            Initialize Project Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};



// Our Story section
const OurStory = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Our Philosophy
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold text-white font-manrope leading-[0.9] tracking-tighter mb-8">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">ElevenX</span> Origin.
            </h2>
            <p className="text-zinc-400 text-xl leading-relaxed font-light">
              We started as engineers frustrated by the status quo. Tenacious performance, absolute aesthetics, and unbreakable code aren't just goals — they're our baseline.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md"
          >
            <div className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1 font-bold font-mono">Status Dashboard</div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                    {i}
                  </div>
                ))}
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-white font-mono text-xs scale-90">ENGINE: <span className="text-green-400">ACTIVE</span></div>
            </div>
          </motion.div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[600px]">
          {/* Bento Card 1: The Spark (4/6 wide) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/20 p-10 flex flex-col justify-end transition-colors hover:border-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-10 right-10 scale-150 opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-500">
              <Zap size={120} className="text-blue-500" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Zap size={24} />
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">Born from Frustration</h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                We saw too many businesses held back by bloated, clunky software. We decided to stop complaining and started building digital weapons that win.
              </p>
            </div>
          </motion.div>

          {/* Bento Card 2: Code First (2/6 wide) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/20 p-10 flex flex-col justify-center transition-colors hover:border-purple-500/20"
          >
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:rotate-6 transition-transform">
                <Terminal size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Code First</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  While others sold bloated templates, we built custom high-performance engines. Speed is not a feature; it is our foundation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 3: Global Impact (2/6 wide) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/20 p-10 flex flex-col justify-between transition-colors hover:border-green-500/20"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Globe size={300} className="text-white" />
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <Globe size={24} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Global Impact</h3>
              <p className="text-zinc-500 text-sm">Scaling requests across 12 countries with &lt;100ms latency.</p>
            </div>
          </motion.div>

          {/* Bento Card 4: The Future (4/6 wide) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/20 p-10 flex items-start justify-between gap-10 transition-colors hover:border-indigo-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Rocket size={24} />
                </div>
                <span className="text-indigo-400 font-bold text-[10px] tracking-widest uppercase">Launch Alpha 2026</span>
              </div>
              <h3 className="text-3xl font-bold text-white">11x and Beyond</h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                We are evolving into a strategic growth partner, building proprietary AI-driven interfaces that will define the next decade of user interaction.
              </p>
            </div>

            <div className="hidden md:flex flex-col gap-4 relative z-10">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">R&D Scale</div>
                <div className="text-3xl font-bold text-white tracking-tighter">+400%</div>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Architecture</div>
                <div className="text-xl font-bold text-blue-400">EDGE_FIRST</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-20 lg:py-24 bg-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-almarena">
            Invest In Your Growth
          </h2>
          <p className="text-zinc-400 text-lg">
            We have got a plan for every level. From startups to industry
            leaders.
          </p>
        </motion.div>

        {/* 3 Columns Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm hover:border-white/10 transition-all"
          >
            <h3 className="text-lg font-bold text-zinc-400 mb-2 tracking-wide">
              BASIC
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">₹5,000</span>
              <span className="text-sm text-zinc-500">starting</span>
            </div>
            <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">
              For small businesses or individuals who need a clean, functional
              online presence.
            </p>
            <div className="w-full h-px bg-white/5 mb-8"></div>
            <div className="space-y-4 mb-8">
              {[
                "Upto 5 pages",
                "Modern UI/UX Design",
                "Mobile Responsive",
                "SSL Setup",
                "Basic Speed Optimization",
                "7-Days Custom Support",
                "Delivery 5-7 Days",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-zinc-300 text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-blue-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/book?plan=basic&upm_source=landing_page_pricing"
              className="block w-full py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white hover:text-black transition-colors text-center"
            >
              Choose Basic
            </Link>
          </motion.div>

          {/* Business Plan (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-blue-500/30 bg-zinc-900/80 relative shadow-2xl shadow-blue-900/10 z-10 transform md:-translate-y-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-blue-600/20">
              Most Popular
            </div>
            <h3 className="text-lg font-bold text-blue-400 mb-2 tracking-wide">
              BUSINESS
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-white">₹8,000</span>
              <span className="text-sm text-zinc-500">starting</span>
            </div>
            <p className="text-zinc-300 text-sm mb-8 min-h-[40px]">
              Perfect for growing companies that need features, branding, and
              better performance.
            </p>
            <div className="w-full h-px bg-blue-500/20 mb-8"></div>
            <div className="space-y-4 mb-8">
              {[
                "Everything in Basic",
                "Upto 10-12 pages",
                "Custom UI/UX Design",
                "CMS Integration (Wordpress)",
                "On-Page SEO Optimization",
                "3 Rounds of Revisions",
                "14-Days Custom Support",
                "Delivery 10-14 Days",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-white text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/book?plan=business&upm_source=landing_page_pricing"
              className="block w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 text-center"
            >
              Choose Business
            </Link>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm hover:border-white/10 transition-all"
          >
            <h3 className="text-lg font-bold text-zinc-400 mb-2 tracking-wide">
              PREMIUM
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">₹14,000</span>
              <span className="text-sm text-zinc-500">starting</span>
            </div>
            <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">
              For brands that want automation, custom functionality, and
              enterprise-grade performance.
            </p>
            <div className="w-full h-px bg-white/5 mb-8"></div>
            <div className="space-y-4 mb-8">
              {[
                "Everything in Business",
                "Unlimited pages",
                "Advanced Security + Firewall",
                "Premium Animation (GSAP)",
                "Backup & Restore System",
                "Advanced SEO",
                "30-Days Custom Support",
                "Delivery 20-30 Days",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-zinc-300 text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-blue-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/book?plan=premium&upm_source=landing_page_pricing"
              className="block w-full py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white hover:text-black transition-colors text-center"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// InfiniteTestimonials section
const InfiniteTestimonials = () => {
  const testimonials = [
    {
      text: "11XSolutions completely transformed our internal workflow. The dashboard they built saved us 20 hours a week.",
      name: "Sarah Jenkins",
      role: "CEO, TechFlow",
      img: "sarah",
    },
    {
      text: "The most professional dev team I&apos;ve worked with. They understood our business logic better than we did.",
      name: "Michael Ross",
      role: "Founder, EstateBook",
      img: "mike",
    },
    {
      text: "Blazing fast delivery. The app scaled to 10k users in the first week without a hitch.",
      name: "David Chen",
      role: "CTO, FinStart",
      img: "dave",
    },
    {
      text: "Their design sense matches their engineering skills. A rare combination in this industry.",
      name: "Elena Rodriguez",
      role: "Product Lead, CreativeCo",
      img: "elena",
    },
  ];

  // Duplicate for seamless loop
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="py-10 lg:py-24  bg-black overflow-hidden relative border-t border-white/5">
      {/* Background Tech Grid (Consistent with OurStory) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-almarena mb-6">
            Trusted by <span className="text-blue-500">Industry Leaders</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Do not take our word for it. Here is what the engineers and founders
            we work with have to say.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden z-10">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 50, // Slower, more readable speed
            repeat: Infinity,
          }}
        >
          {extendedTestimonials.map((item, i) => (
            <div
              key={i}
              className="relative w-[300px] sm:w-[450px] bg-zinc-900/40 p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-blue-500/30 transition-colors backdrop-blur-md group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-white/5 group-hover:text-blue-500/10 transition-colors">
                <Quote size={60} />
              </div>

              <div className="relative z-10">
                {/* Tech Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono mb-6 uppercase tracking-wider">
                  <CheckCircle2 size={12} />
                  Verified Client
                </div>

                <p className="text-zinc-200 text-lg leading-relaxed mb-8 font-light">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <User size={24} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
                </div>
                <div>
                  <div className="text-white font-bold text-base">
                    {item.name}
                  </div>
                  <div className="text-zinc-500 text-xs font-mono uppercase tracking-wide">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Main App Component ---
const App = () => {
  return (
    <div className="bg-black w-full overflow-x-hidden min-h-screen text-zinc-200 selection:bg-blue-600/30">
      <main>
        <Hero />
        <Services />
        <OurStory />
        <Pricing />
        <InfiniteTestimonials />
        <Faq />
      </main>
    </div>
  );
};

export default App;
