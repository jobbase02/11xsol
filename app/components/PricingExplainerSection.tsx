"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckSquare, ArrowRight, Clock, Sparkles } from "lucide-react";

interface PricingFactor {
  title: string;
  subtitle: string;
  badge: string;
  items: {
    label: string;
    value: string;
    active?: boolean;
  }[];
}

const factors: PricingFactor[] = [
  {
    title: "Scope",
    subtitle: "Project size & deliverables",
    badge: "Custom Sized",
    items: [
      { label: "Core Architecture & UX", value: "Custom Built", active: true },
      { label: "Design System & UI Library", value: "Included", active: true },
      { label: "Database & CMS Setup", value: "Tailored", active: true },
      { label: "Multi-page / App Depth", value: "Per Scope", active: true },
      { label: "Custom Asset Production", value: "Optional", active: false },
    ],
  },
  {
    title: "Timeline",
    subtitle: "Speed & sprint velocity",
    badge: "Sprint Based",
    items: [
      { label: "MVP Sprint Delivery", value: "2–4 Weeks", active: true },
      { label: "Dedicated Weekly Milestones", value: "Transparent", active: true },
      { label: "Real-time Slack / Loom Sync", value: "Daily", active: true },
      { label: "Expedited Priority Launch", value: "Available", active: true },
      { label: "Post-Launch Warranty", value: "30 Days", active: true },
    ],
  },
  {
    title: "Complexity",
    subtitle: "Tech stack & integrations",
    badge: "Tailored",
    items: [
      { label: "Third-party APIs & Payments", value: "Included", active: true },
      { label: "Cloud & Edge Infrastructure", value: "Sub-second", active: true },
      { label: "Interactive GSAP Motion", value: "Production", active: true },
      { label: "Technical SEO & Core Vitals", value: "99+ Score", active: true },
      { label: "Enterprise Security Audit", value: "Included", active: true },
    ],
  },
];

export default function PricingExplainerSection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-20 sm:py-28 overflow-hidden text-zinc-900 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Split Layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: Bold Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#1757EE] font-semibold mb-3">
              Transparent Model
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-zinc-950 leading-[1.12]">
              Every project is different.
              <br />
              <span className="text-zinc-500">So is every quote.</span>
            </h2>
          </motion.div>

          {/* Right Column: Narrative with vertical divider on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 lg:border-l lg:border-zinc-200/90 lg:pl-12 flex flex-col justify-center"
          >
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal mb-6">
              We don&apos;t do one-size-fits-all pricing because your product isn&apos;t one-size-fits-all either.
              Every engagement starts with a free discovery call where we scope your exact needs,
              technical architecture & growth goals so you invest only in what drives measurable ROI.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <Sparkles className="w-4 h-4 text-[#1757EE]" />
              <span>Zero obligation • Detailed breakdown within 24 hours</span>
            </div>
          </motion.div>
        </div>

        {/* 3-Column Factor Grid matching reference screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14 sm:mb-16">
          {factors.map((factor, idx) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Column Header */}
                <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-zinc-100">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                      {factor.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      {factor.subtitle}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-800 text-xs font-medium tracking-wide">
                    {factor.badge}
                  </span>
                </div>

                {/* Table Rows */}
                <div className="space-y-3">
                  {factor.items.map((item, rowIdx) => (
                    <div
                      key={rowIdx}
                      className={
                        "flex items-center justify-between py-2 text-xs sm:text-sm border-b border-zinc-100 last:border-b-0 " +
                        (item.active === false ? "text-zinc-400" : "text-zinc-800")
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckSquare
                          className={
                            "w-4 h-4 shrink-0 " +
                            (item.active === false ? "text-zinc-300" : "text-zinc-800")
                          }
                          strokeWidth={2}
                        />
                        <span className="font-normal">{item.label}</span>
                      </div>
                      <span
                        className={
                          "font-medium " +
                          (item.active === false ? "text-zinc-400" : "text-zinc-900")
                        }
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Conversion Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-2xl bg-white border border-zinc-200/90 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="max-w-xl text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-zinc-950 tracking-tight mb-1">
              Ready to know your exact numbers?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600">
              Get an itemized roadmap and transparent proposal with zero guesswork.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto">
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1757EE] text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm active:scale-98 min-h-[46px]"
            >
              <span>Book a free discovery call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-zinc-300 text-zinc-900 font-medium text-sm hover:bg-zinc-50 transition-colors active:scale-98 min-h-[46px]"
            >
              <Clock className="w-4 h-4 text-zinc-500" />
              <span>Get custom quote in 24 hours</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
