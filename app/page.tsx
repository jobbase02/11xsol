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
      {/* Deep Mesh Gradient Orbs (Static GPU-cached glow - zero scroll overhead) */}
      <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/7 rounded-full blur-[80px] transform-gpu pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-500/7 rounded-full blur-[80px] transform-gpu pointer-events-none" />

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
    <section className="relative min-h-[88vh] lg:min-h-screen flex items-center pt-30 sm:pt-40 lg:pt-44 pb-20 sm:pb-24 lg:pb-32 overflow-hidden bg-white selection:bg-blue-600/40">
      <GridBackground />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-16 xl:gap-20 items-start lg:items-center">
          {/* LEFT: MASSIVE EDITORIAL HEADLINE */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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

