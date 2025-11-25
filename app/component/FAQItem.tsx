// components/FaqItem.tsx
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

export const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left focus:outline-none group">
        <span className={`text-lg font-medium transition-colors ${isOpen ? "text-cyan-400" : "text-white group-hover:text-cyan-200"}`}>
          {question}
        </span>
        <span className={`ml-6 p-2 rounded-full transition-all ${isOpen ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-slate-400"}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
