"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MessageSquareCode,
  CalendarCheck2,
  LaptopMinimal,
  ShieldCheck,
} from "lucide-react";

interface UpdatePillar {
  title: string;
  description: string;
  icon: React.ElementType;
}

const updatePillars: UpdatePillar[] = [
  {
    title: "Slack & Loom Sync",
    description:
      "Direct Slack channel with your engineering lead. Async video walkthroughs so you never have to decode raw Git commits.",
    icon: MessageSquareCode,
  },
  {
    title: "Weekly Sprint Demos",
    description:
      "Live working software reviews every week. Watch features iterate in real time, not in month-end slide decks.",
    icon: CalendarCheck2,
  },
  {
    title: "Live Staging Previews",
    description:
      "Private preview URLs for every pull request. Test on your own devices anytime before anything hits production.",
    icon: LaptopMinimal,
  },
  {
    title: "Zero-Surprise Signoffs",
    description:
      "Transparent milestones and documented release notes. You know exactly what ships, when it ships, and why.",
    icon: ShieldCheck,
  },
];

export default function ClientUpdatesSection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-20 sm:py-28 md:py-32 overflow-hidden text-zinc-900 border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading + 2x2 Pillars Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Header Content matching website format */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12 sm:mb-16"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-zinc-900 leading-[1.15]">
                How We Keep You <br className="hidden sm:inline" />
                <span className="text-[#1757EE] font-normal italic">in the Loop</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 mt-4 sm:mt-5 leading-relaxed font-normal max-w-lg">
                Transparent communication, zero surprises. Here is how you stay in complete control from day one through production release.
              </p>
            </motion.div>

            {/* 2x2 Grid with subtle divider lines matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12">
              {updatePillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                    className={`group flex flex-col pt-6 ${index < 2
                      ? "border-t border-zinc-200/80"
                      : "sm:border-t sm:border-zinc-200/80 border-t border-zinc-200/80"
                      }`}
                  >
                    {/* Circular Icon Badge matching website brand aesthetic */}
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-[#1757EE] flex items-center justify-center mb-4.5 shadow-2xs border border-blue-500/20 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 mb-2">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Fidelity Photo matching reference layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-md border border-zinc-200/70 bg-zinc-200">
              <Image
                src="/client-updates.webp"
                alt="11x Solutions team collaborating with client on product updates"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                priority={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
