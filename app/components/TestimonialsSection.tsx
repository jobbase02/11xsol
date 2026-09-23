"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { TrendingUp } from "lucide-react";

// Coordinated single-trigger entrance variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-20 sm:py-28 md:py-32 overflow-hidden text-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-18"
        >
          {/* Left Title */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif tracking-tight text-zinc-950 leading-[1.12]">
              Real founders, <br className="hidden sm:inline" />
              <span className="text-[#1757EE] font-normal italic">
                Real results.
              </span>
            </h2>
          </div>

          {/* Right Subtitle + CTA Button */}
          <div className="lg:max-w-sm flex flex-col items-start lg:items-end gap-5">
            <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed lg:text-right">
              Behind every breakthrough product is an elite engineering ally. See how founders scale with <span className="font-semibold text-[#1757EE]">11xSolutions</span>.
            </p>
            <Link
              href="#case-studies"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-zinc-900 text-zinc-900 text-xs sm:text-sm font-medium hover:bg-[#1757EE] hover:text-white hover:border-[#1757EE] transition-colors duration-200 active:scale-95 shadow-2xs"
            >
              Explore Customer Stories
            </Link>
          </div>
        </motion.div>

        {/* 3-Row Alternating Bento Grid (Single Observer Trigger) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {/* ================= ROW 1 ================= */}

          {/* 1. Stat Card (Peach/Warm tint) */}
          <motion.div
            variants={cardVariants}
            className="bg-[#FDF3EE] border border-[#F5E5DC] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] hover:shadow-md transition-shadow duration-200 group"
          >
            <div>
              <div className="text-4xl sm:text-5xl lg:text-[46px] font-medium text-zinc-950 font-manrope tracking-[-2px] leading-none">
                44
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed mt-3">
                new features shipped in record sprint time [5/week]
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-zinc-900">
                Goosehead Insurance
              </span>
              <TrendingUp className="w-4 h-4 text-zinc-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-zinc-950" />
            </div>
          </motion.div>

          {/* 2. Stat Card (Soft Blue tint) */}
          <motion.div
            variants={cardVariants}
            className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] hover:shadow-md transition-shadow duration-200 group"
          >
            <div>
              <div className="text-4xl sm:text-5xl lg:text-[46px] font-medium text-zinc-950 font-manrope tracking-[-2px] leading-none">
                10,000+
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed mt-3">
                hours saved across automated operational workflows
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-zinc-900">
                Cushman & Wakefield
              </span>
              <TrendingUp className="w-4 h-4 text-zinc-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-zinc-950" />
            </div>
          </motion.div>

          {/* 3. Quote Card (Spans 2 cols on tablet & desktop) */}
          <motion.div
            variants={cardVariants}
            className="sm:col-span-2 bg-[#F9F9F8] border border-zinc-200/90 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch justify-between hover:shadow-md transition-shadow duration-200"
          >
            {/* Portrait Image with Overlay */}
            <div className="relative w-full sm:w-44 h-64 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-zinc-200 shadow-2xs">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                alt="Nick Kakanis"
                fill
                sizes="(max-width: 640px) 100vw, 180px"
                className="object-cover object-[center_20%] sm:object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3.5 pt-10 sm:p-3 sm:pt-6 text-white">
                <div className="font-semibold text-xs sm:text-sm leading-tight">
                  Nick Kakanis
                </div>
                <div className="text-[11px] text-zinc-300 font-normal mt-0.5">
                  SVP of Operations
                </div>
              </div>
            </div>

            {/* Quote + Company Lockup */}
            <div className="flex flex-col justify-between flex-1 py-1">
              <p className="text-sm sm:text-base text-zinc-800 font-normal leading-relaxed">
                &ldquo;11xSolutions&apos; brand and architecture tools help our teams work even better together. We&apos;re able to align faster and collaborate more effectively.&rdquo;
              </p>
              <div className="pt-4 border-t border-zinc-200/70 mt-4 sm:mt-0">
                <span className="font-mono font-bold tracking-widest text-xs uppercase text-zinc-900">
                  PILOT COMPANY
                </span>
              </div>
            </div>
          </motion.div>

          {/* ================= ROW 2 ================= */}

          {/* 4. Quote Card (Spans 2 cols on tablet & desktop) */}
          <motion.div
            variants={cardVariants}
            className="sm:col-span-2 bg-[#F9F9F8] border border-zinc-200/90 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch justify-between hover:shadow-md transition-shadow duration-200"
          >
            {/* Portrait Image with Overlay */}
            <div className="relative w-full sm:w-44 h-64 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-zinc-200 shadow-2xs">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                alt="Dara Cohen"
                fill
                sizes="(max-width: 640px) 100vw, 180px"
                className="object-cover object-[center_20%] sm:object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3.5 pt-10 sm:p-3 sm:pt-6 text-white">
                <div className="font-semibold text-xs sm:text-sm leading-tight">
                  Dara Cohen
                </div>
                <div className="text-[11px] text-zinc-300 font-normal mt-0.5">
                  Sr. Manager, Strategy
                </div>
              </div>
            </div>

            {/* Quote + Company Lockup */}
            <div className="flex flex-col justify-between flex-1 py-1">
              <p className="text-sm sm:text-base text-zinc-800 font-normal leading-relaxed">
                &ldquo;We can be way more creative in what we&apos;re putting out into the world. Their frontend speed and attention to detail are completely unmatched.&rdquo;
              </p>
              <div className="pt-4 border-t border-zinc-200/70 mt-4 sm:mt-0 flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600" />
                <span className="font-semibold text-xs sm:text-sm tracking-tight text-zinc-900">
                  CloudBees
                </span>
              </div>
            </div>
          </motion.div>

          {/* 5. Stat Card (Soft Lavender tint) */}
          <motion.div
            variants={cardVariants}
            className="bg-[#F3EFFC] border border-[#E9E0FA] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] hover:shadow-md transition-shadow duration-200 group"
          >
            <div>
              <div className="text-4xl sm:text-5xl lg:text-[46px] font-medium text-zinc-950 font-manrope tracking-[-2px] leading-none">
                3,000+
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed mt-3">
                hours saved in content & sprint creation time
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-zinc-900">
                walkme
              </span>
              <TrendingUp className="w-4 h-4 text-zinc-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-zinc-950" />
            </div>
          </motion.div>

          {/* 6. Stat Card (Peach/Warm tint) */}
          <motion.div
            variants={cardVariants}
            className="bg-[#FDF3EE] border border-[#F5E5DC] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] hover:shadow-md transition-shadow duration-200 group"
          >
            <div>
              <div className="text-4xl sm:text-5xl lg:text-[46px] font-medium text-zinc-950 font-manrope tracking-[-2px] leading-none">
                800%
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed mt-3">
                surge in organic web traffic & qualified conversions
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-zinc-900">
                bestplaces
              </span>
              <TrendingUp className="w-4 h-4 text-zinc-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-zinc-950" />
            </div>
          </motion.div>

          {/* ================= ROW 3 ================= */}

          {/* 7. Stat Card (Soft Blue tint) */}
          <motion.div
            variants={cardVariants}
            className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] hover:shadow-md transition-shadow duration-200 group"
          >
            <div>
              <div className="text-4xl sm:text-5xl lg:text-[46px] font-medium text-zinc-950 font-manrope tracking-[-2px] leading-none">
                40%
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed mt-3">
                increase in traffic using sub-100ms full-stack architecture
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-zinc-900">
                bloomreach
              </span>
              <TrendingUp className="w-4 h-4 text-zinc-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-zinc-950" />
            </div>
          </motion.div>

          {/* 8. Stat Card (Soft Mint tint) */}
          <motion.div
            variants={cardVariants}
            className="bg-[#EEF9F0] border border-[#DCF2E0] rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[220px] sm:min-h-[240px] hover:shadow-md transition-shadow duration-200 group"
          >
            <div>
              <div className="text-4xl sm:text-5xl lg:text-[46px] font-medium text-zinc-950 font-manrope tracking-[-2px] leading-none">
                93%
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 font-normal leading-relaxed mt-3">
                faster creation & automated deployment of campaigns
              </p>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-black/[0.04]">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-zinc-900">
                commercetools
              </span>
              <TrendingUp className="w-4 h-4 text-zinc-700 transition-transform duration-200 group-hover:scale-110 group-hover:text-zinc-950" />
            </div>
          </motion.div>

          {/* 9. Quote Card (Spans 2 cols on tablet & desktop) */}
          <motion.div
            variants={cardVariants}
            className="sm:col-span-2 bg-[#F9F9F8] border border-zinc-200/90 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch justify-between hover:shadow-md transition-shadow duration-200"
          >
            {/* Portrait Image with Overlay */}
            <div className="relative w-full sm:w-44 h-64 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-zinc-200 shadow-2xs">
              <Image
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80"
                alt="Mark Wollney"
                fill
                sizes="(max-width: 640px) 100vw, 180px"
                className="object-cover object-[center_20%] sm:object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3.5 pt-10 sm:p-3 sm:pt-6 text-white">
                <div className="font-semibold text-xs sm:text-sm leading-tight">
                  Mark Wollney
                </div>
                <div className="text-[11px] text-zinc-300 font-normal mt-0.5">
                  SVP of Operations
                </div>
              </div>
            </div>

            {/* Quote + Company Lockup */}
            <div className="flex flex-col justify-between flex-1 py-1">
              <p className="text-sm sm:text-base text-zinc-800 font-normal leading-relaxed">
                &ldquo;This isn&apos;t just about staying relevant in a rapidly evolving industry; it&apos;s about leading the way with scalable architecture.&rdquo;
              </p>
              <div className="pt-4 border-t border-zinc-200/70 mt-4 sm:mt-0">
                <span className="font-black text-sm tracking-wider uppercase text-zinc-900">
                  MERGE
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
