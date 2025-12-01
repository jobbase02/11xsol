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
      initial={false}
      onClick={() => setExpanded(isOpen ? false : i)}
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 border-b border-white/10 ${
        isOpen ? "bg-white/[0.02]" : "bg-transparent hover:bg-white/[0.02]"
      }`}
    >
      <div className="relative z-10 px-4 py-8 md:px-8">
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center gap-6 md:gap-8">
            <span className={`font-mono text-sm transition-colors ${isOpen ? "text-blue-500" : "text-zinc-600"}`}>
              /{item.id}
            </span>
            <h3 className={`text-lg md:text-2xl font-medium transition-colors ${isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
              {item.question}
            </h3>
          </div>

          <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
             {isOpen ? <Minus size={24} className="text-blue-500" /> : <Plus size={24} className="text-zinc-500 group-hover:text-white" />}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="pt-6 pl-12 md:pl-[4rem] pr-4 md:pr-24 text-zinc-400 leading-relaxed text-base md:text-lg max-w-4xl">
                {item.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Animated Bottom Glow Line */}
      {isOpen && (
        <motion.div 
            layoutId="active-glow"
            className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
        />
      )}
    </motion.div>
  );
};

const Faq = () => {
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-black relative overflow-hidden">
      
      {/* Background Tech Grid (Subtle texture, no color) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Centered Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-almarena mb-6">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our technical capabilities, pricing models, and delivery timelines.
          </p>
        </div>

        {/* List Layout (Same as before) */}
        <div className="border-t border-white/10">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              i={i}
              expanded={expanded}
              setExpanded={setExpanded}
              item={faq}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;