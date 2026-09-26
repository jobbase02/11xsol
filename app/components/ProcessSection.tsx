"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProcessStep {
  step: string;
  badge: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    step: "01",
    badge: "Discover",
    title: "Context before confidence",
    description:
      "Models and systems fail when they're guessing. We audit your technical stack, operational workflows, and data pipelines so every sprint is grounded in verified business context.",
  },
  {
    step: "02",
    badge: "Design",
    title: "Decisions, not recommendations",
    description:
      "Rapid wireframing and high-fidelity UX prototypes validate user psychology, edge cases, and brand authority upfront before a single line of code is written.",
  },
  {
    step: "03",
    badge: "Build",
    title: "Performance by design",
    description:
      "Production-ready, scalable full-stack engineering with clean modular architecture, sub-second response times, and fluid GSAP micro-interactions that captivate users.",
  },
  {
    step: "04",
    badge: "Scale",
    title: "Accountability by design",
    description:
      "Zero black boxes. Every deployment is backed by automated CI/CD pipelines, strict QA audits, technical SEO validation, and transparent telemetry logging.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative w-full bg-white py-20 sm:py-28 overflow-hidden text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - Restored to font-serif with 11xsol brand accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-zinc-900">
            How We{" "}
            <span className="text-[#1757EE] font-normal italic">Build</span>
          </h2>
        </motion.div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-14 sm:mb-20">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="border-t border-zinc-200/90 pt-6 flex flex-col items-start group hover:border-[#1757EE]/50 transition-colors duration-300"
            >
              {/* Checkmark Badge */}
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#1757EE] mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs">
                <Check className="w-4 h-4 text-[#1757EE]" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Middle Visual Element: Segmented Photo Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full mb-8 sm:mb-12"
        >
          {/* Mobile view: Single unified image card */}
          <div className="block md:hidden relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden shadow-sm border border-zinc-200/80">
            <Image
              src="/Process.webp"
              alt="11xsol Engineering & Strategy Team in action"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={false}
            />
          </div>

          {/* Tablet & Desktop view: Signature 3-panel slit presentation matching reference */}
          <div className="hidden md:flex gap-3.5 lg:gap-4.5 w-full h-[380px] lg:h-[460px]">
            {/* Slit Panel 1 (left strip) */}
            <div className="relative w-14 lg:w-20 h-full rounded-2xl overflow-hidden shrink-0 border border-zinc-200/60 shadow-xs group">
              <Image
                src="/Process.webp"
                alt="Process view slit 1"
                fill
                sizes="(max-width: 1200px) 100px, 150px"
                className="object-cover object-left transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-950/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Slit Panel 2 (middle strip) */}
            <div className="relative w-16 lg:w-24 h-full rounded-2xl overflow-hidden shrink-0 border border-zinc-200/60 shadow-xs group">
              <Image
                src="/Process.webp"
                alt="Process view slit 2"
                fill
                sizes="(max-width: 1200px) 150px, 200px"
                className="object-cover object-[25%_center] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-950/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Primary Showcase Panel (expansive main view) */}
            <div className="relative flex-1 h-full rounded-2xl overflow-hidden border border-zinc-200/60 shadow-sm group">
              <Image
                src="/Process.webp"
                alt="11xsol Strategy and Technical Execution in Action"
                fill
                sizes="(max-width: 1280px) 80vw, 1200px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Bottom Signature Statement Banner with restored font-serif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[1rem] bg-[#1757EE] p-8 sm:p-12 lg:p-14 text-white "
        >


          <div className="relative z-10 max-w-2xl">
            <h3 className=" text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-thin leading-[1.2] tracking-normal text-white">
              The work that remains
              <br />
              is the work that matters.
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
