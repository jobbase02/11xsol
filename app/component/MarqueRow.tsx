// components/MarqueeRow.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { TestimonialCard, Testimonial } from "./TestimonialCard";

type MarqueeRowProps = {
  items: Testimonial[];
  direction?: "left" | "right";
};

export const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = "left" }) => {
  return (
    <div className="flex overflow-hidden relative w-full py-4">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />

      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          ease: "linear",
          duration: 40,
          repeat: Infinity,
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <TestimonialCard
            key={`${idx}-${direction}`}
            text={item.text}
            author={item.author}
            project={item.project}
            country={item.country}
            img={item.img}
          />
        ))}
      </motion.div>
    </div>
  );
};
