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
import HeroVideoBanner from "./components/HeroVideoBanner";
import ServicesSection from "./components/ServicesSection";
import TechStackSection from "./components/TechStackSection";
import ProcessSection from "./components/ProcessSection";
import ClientUpdatesSection from "./components/ClientUpdatesSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import PricingExplainerSection from "./components/PricingExplainerSection";
import TestimonialsSection from "./components/TestimonialsSection";
import { usePreloader } from "./components/Preloader";

const GridBackground = () => {
  const { isLoaded } = usePreloader();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none"
    >
      {/* Deep Mesh Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-500/8 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-indigo-500/8 rounded-full blur-[140px]"
      />

      {/* Primary Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Subtle Fade */}
      <div className="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,transparent_0%,white_100%)]"></div>
    </motion.div>
  );
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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
  const { isLoaded } = usePreloader();

  return (
    <section className="relative min-h-[88vh] lg:min-h-screen flex items-center pt-36 sm:pt-40 lg:pt-44 pb-20 sm:pb-24 lg:pb-32 overflow-hidden bg-white selection:bg-blue-600/40">
      <GridBackground />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 xl:gap-20 items-start lg:items-center">
          {/* LEFT: MASSIVE EDITORIAL HEADLINE */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(8px)" }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8"
          >

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold text-black tracking-tight leading-[1.08] sm:leading-[1.05] md:leading-[1.02]">
              <span className="relative inline-block">
                Software
              </span>{" "}
              <span className="underline decoration-black decoration-[3px] sm:decoration-4 lg:decoration-[5px] underline-offset-[8px] sm:underline-offset-[10px] lg:underline-offset-[14px]">
                engineering
              </span>{" "}
              and{" "}
              <span className="underline decoration-black decoration-[3px] sm:decoration-4 lg:decoration-[5px] underline-offset-[8px] sm:underline-offset-[10px] lg:underline-offset-[14px]">
                products
              </span>{" "}
              that put performance at the frontier
            </h1>
          </motion.div>

          {/* RIGHT: EDITORIAL STATEMENT & CTAS */}
          <div className="lg:col-span-5 xl:col-span-5 w-full">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};
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
      className={`group relative overflow-hidden rounded-[2.5rem] bg-white border border-zinc-200/80 p-8 flex flex-col transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_60px_rgba(59,130,246,0.08)] ${variant === "wide" ? "md:col-span-2" : "md:col-span-1"
        } ${variant === "featured" ? "h-full justify-between" : "justify-between"}`}
    >
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${service.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-bl-full blur-3xl transition-opacity duration-700`} />

      <div className="relative z-10">
        <div className={`mb-6 p-4 w-fit rounded-2xl bg-gradient-to-br ${service.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
          {service.icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-4 font-manrope">
          {service.title}
        </h3>
        <p className="text-zinc-600 text-base leading-relaxed group-hover:text-zinc-900 transition-colors">
          {service.desc}
        </p>
      </div>

      <div className="mt-8 relative z-10 flex items-center justify-between">
        <Link
          href="/services"
          className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]"
        >
          Explore Protocol <ChevronRight size={14} />
        </Link>
        <div className="text-[10px] font-mono text-zinc-400">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};




// --- Main App Component ---
const App = () => {
  return (
    <div className="bg-white w-full overflow-x-hidden min-h-screen text-zinc-900 selection:bg-blue-600/30">
      <main>
        <Hero />
        <HeroVideoBanner />
        <TechStackSection />
        <ServicesSection />
        <ProcessSection />
        <ClientUpdatesSection />
        <CaseStudiesSection />
        <PricingExplainerSection />
        <TestimonialsSection />
        <Faq />
      </main>
    </div>
  );
};

export default App;

