"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    id: "01",
    question: "What makes ElevenX different?",
    answer:
      "We are engineering-first. While others focus on templates, we build custom, scalable architectures using Next.js and Supabase. We prioritize speed, security, and long-term scalability from day one.",
  },
  {
    id: "02",
    question: "How long does a project take?",
    answer:
      "A high-performance landing page takes 1-2 weeks. A full SaaS platform or custom web app typically takes 4-8 weeks. We work in agile sprints to ensure steady progress.",
  },
  {
    id: "03",
    question: "Do you offer post-launch support?",
    answer:
      "Yes. We offer monthly maintenance packages to handle updates, security patches, and feature additions so your system remains production-ready forever.",
  },
  {
    id: "04",
    question: "What is your primary tech stack?",
    answer:
      "We specialize in the React ecosystem: Next.js (Framework), TypeScript (Safety), Tailwind CSS (Styling), Supabase (Backend), and Framer Motion (Animation).",
  },
  {
    id: "05",
    question: "Can you fix my existing legacy site?",
    answer:
      "Yes. We perform 'Rescue Missions'—auditing codebases, refactoring bottlenecks, or migrating legacy sites to modern architectures without losing SEO data.",
  },
];

const FaqItem = ({
  i,
  expanded,
  setExpanded,
  item,
}: {
  i: number;
  expanded: number | false;
  setExpanded: (i: number | false) => void;
  item: (typeof faqs)[0];
}) => {
  const isOpen = i === expanded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.04,
      }}
      onClick={() => setExpanded(isOpen ? false : i)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded(isOpen ? false : i);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-300 border-b border-zinc-200/90 select-none ${
        isOpen ? "bg-zinc-50/70" : "bg-transparent hover:bg-zinc-50/40"
      }`}
    >
      {/* Soft open-state glow orb */}
      {isOpen && (
        <motion.div
          className="pointer-events-none absolute -top-24 right-0 w-48 h-48 bg-[#1757EE]/5 blur-3xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <div className="relative z-10 px-3.5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-7">
        <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-5 md:gap-7 flex-1 min-w-0">
            {/* ID Chip */}
            <div className="relative shrink-0 pt-0.5 sm:pt-0">
              {isOpen && (
                <motion.span
                  layoutId="faq-id-glow"
                  className="absolute -inset-1 rounded-full bg-[#1757EE]/10 blur-sm"
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
              )}
              <span
                className={`relative font-mono text-xs sm:text-sm transition-colors ${
                  isOpen ? "text-[#1757EE] font-bold" : "text-zinc-400"
                }`}
              >
                /{item.id}
              </span>
            </div>

            {/* Question Heading */}
            <motion.h3
              layout
              className={`text-base sm:text-lg md:text-xl lg:text-[22px] font-medium tracking-tight leading-snug transition-colors ${
                isOpen
                  ? "text-zinc-950 font-semibold"
                  : "text-zinc-800 group-hover:text-[#1757EE]"
              }`}
            >
              {item.question}
            </motion.h3>
          </div>

          {/* Plus/Minus Circular Toggle Badge */}
          <motion.div
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors mt-0.5 sm:mt-0 ${
              isOpen
                ? "bg-[#1757EE]/10 text-[#1757EE]"
                : "bg-zinc-100 text-zinc-500 group-hover:bg-[#1757EE]/10 group-hover:text-[#1757EE]"
            }`}
          >
            {isOpen ? (
              <Minus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            ) : (
              <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            )}
          </motion.div>
        </div>

        {/* Answer Accordion */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={item.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ delay: 0.05, duration: 0.25 }}
                className="pt-3 sm:pt-4 pl-7 sm:pl-10 md:pl-12 pr-2 sm:pr-8 md:pr-16 text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed max-w-3xl"
              >
                {item.answer}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Bottom Glow Line */}
      {isOpen && (
        <motion.div
          layoutId="active-glow"
          className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#1757EE] to-transparent"
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
        />
      )}
    </motion.div>
  );
};

const Faq = () => {
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden text-zinc-900"
    >
      {/* Slow drifting gradient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-blue-500/5 blur-3xl"
        animate={{ x: [0, 20, -10, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-indigo-500/5 blur-3xl"
        animate={{ x: [0, -15, 10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Centered Header */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1757EE] font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-950 font-almarena tracking-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked{" "}
            <span className="text-[#1757EE]">Questions</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to know about our technical capabilities,
            pricing models, and delivery timelines.
          </motion.p>
        </div>

        {/* List Layout */}
        <motion.div
          className="border-t border-zinc-200/90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.id}
              i={i}
              expanded={expanded}
              setExpanded={setExpanded}
              item={faq}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Faq;
