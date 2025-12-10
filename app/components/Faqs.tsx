import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
  item: typeof faqs[0];
}) => {
  const isOpen = i === expanded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -2 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.05,
      }}
      onClick={() => setExpanded(isOpen ? false : i)}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 border-b border-white/10 ${
        isOpen ? "bg-white/[0.02]" : "bg-transparent hover:bg-white/[0.02]"
      }`}
    >
      {/* Soft open-state glow orb */}
      {isOpen && (
        <motion.div
          className="pointer-events-none absolute -top-24 right-0 w-48 h-48 bg-blue-500/20 blur-3xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <div className="relative z-10 px-4 py-8 md:px-8">
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-6 md:gap-8">
            {/* Animated ID chip */}
            <div className="relative">
              {isOpen && (
                <motion.span
                  layoutId="faq-id-glow"
                  className="absolute -inset-1 rounded-full bg-blue-500/20 blur-md"
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
              )}
              <span
                className={`relative font-mono text-sm transition-colors ${
                  isOpen ? "text-blue-400" : "text-zinc-600"
                }`}
              >
                /{item.id}
              </span>
            </div>

            <motion.h3
              layout
              className={`text-lg md:text-2xl font-medium transition-colors ${
                isOpen
                  ? "text-white"
                  : "text-zinc-300 group-hover:text-white"
              }`}
            >
              {item.question}
            </motion.h3>
          </div>

          <motion.div
            animate={isOpen ? { rotate: 180, scale: 1.05 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            {isOpen ? (
              <Minus size={24} className="text-blue-500" />
            ) : (
              <Plus
                size={24}
                className="text-zinc-500 group-hover:text-white"
              />
            )}
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={item.id}
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ delay: 0.05, duration: 0.25 }}
                className="pt-6 pl-12 md:pl-[4rem] pr-4 md:pr-24 text-zinc-400 leading-relaxed text-base md:text-lg max-w-4xl"
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
          className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
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
      className="py-24 lg:py-32 bg-black relative overflow-hidden"
    >
      {/* Background Tech Grid (Subtle texture, no color) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Slow drifting gradient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
        animate={{ x: [0, 20, -10, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"
        animate={{ x: [0, -15, 10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="max-w-5xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Centered Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white font-almarena mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked{" "}
            <span className="text-blue-500">Questions</span>
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
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
          className="border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
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
