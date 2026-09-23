"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface TechItem {
  name: string;
  src: string;
}

const techItems: TechItem[] = [
  // Row 1 (Cols 1-6)
  { name: "Next.js", src: "/tech/nextjs.svg" },
  { name: "React", src: "/tech/react.svg" },
  { name: "TypeScript", src: "/tech/typescript.svg" },
  { name: "Node.js", src: "/tech/nodejs.svg" },
  { name: "Python", src: "/tech/python.svg" },
  { name: "AWS", src: "/tech/aws.svg" },

  // Row 2 (Cols 1-2, [Center 3-4], Cols 5-6)
  { name: "Docker", src: "/tech/docker.svg" },
  { name: "PostgreSQL", src: "/tech/postgresql.svg" },
  { name: "Supabase", src: "/tech/supabase.svg" },
  { name: "OpenAI", src: "/tech/openai.svg" },

  // Row 3 (Cols 1-2, [Center 3-4], Cols 5-6)
  { name: "Figma", src: "/tech/figma.svg" },
  { name: "Tailwind CSS", src: "/tech/tailwind.svg" },
  { name: "GraphQL", src: "/tech/graphql.svg" },
  { name: "Redis", src: "/tech/redis.svg" },

  // Row 4 (Cols 1-6)
  { name: "Stripe", src: "/tech/stripe.svg" },
  { name: "Vercel", src: "/tech/vercel.svg" },
  { name: "GSAP", src: "/tech/gsap.svg" },
  { name: "Three.js", src: "/tech/threejs.svg" },
  { name: "Prisma", src: "/tech/prisma.svg" },
  { name: "GitHub", src: "/tech/github.svg" },
];

export default function TechStackSection() {
  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-28 overflow-hidden text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative border border-zinc-200/90 rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-200/90 shadow-2xs"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:grid-rows-4 gap-[1px]">
            {/* Center Block (Prominent on mobile, exactly centered 2x2 on desktop) */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-2 order-first lg:order-none bg-white p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl sm:text-2xl lg:text-[27px] font-serif font-normal text-zinc-900 tracking-tight leading-[1.25] max-w-xs">
                Built With Modern & <br />
                <span className="text-[#1757EE] font-normal italic">
                  Scalable Technologies
                </span>
              </h2>
              <Link
                href="/book"
                className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-950 text-white text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-all duration-200 active:scale-95 shadow-sm group"
              >
                <span>Book a call</span>
                <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform duration-200">
                  »
                </span>
              </Link>
            </div>

            {/* 20 Technology Grid Cells */}
            {techItems.map((tech) => (
              <div
                key={tech.name}
                className="bg-white flex items-center justify-center h-20 sm:h-24 lg:h-32 transition-colors duration-200 hover:bg-zinc-50/80 group px-3 py-4"
              >
                <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                  <img
                    src={tech.src}
                    alt={tech.name}
                    loading="lazy"
                    className="h-5 w-5 sm:h-6 sm:w-6 object-contain pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="font-medium text-xs sm:text-sm lg:text-base text-zinc-800 tracking-tight group-hover:text-zinc-950 transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
