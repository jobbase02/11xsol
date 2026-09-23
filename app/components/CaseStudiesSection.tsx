"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  tags: string[];
  image: string;
  link: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "geon-leasing",
    title: "Geon Leasing",
    tags: ["Brand", "Web"],
    image: "/projects/Geon Leasing Portfolio Design.webp",
    link: "#",
  },
  {
    id: "noramble",
    title: "Noramble",
    tags: ["Brand", "Web"],
    image: "/projects/Noramble Work Portfolio Design.webp",
    link: "#",
  },
  {
    id: "apex-cloud",
    title: "Apex Cloud",
    tags: ["Brand", "Web"],
    image: "/projects/1db04fd3-5a07-4eae-92a5-d298873f82ba.webp",
    link: "#",
  },
  {
    id: "pulse-commerce",
    title: "Pulse Commerce",
    tags: ["Brand", "Web"],
    image: "/projects/32563503-a597-4011-abb9-5dda91d01ec9.webp",
    link: "#",
  },
  {
    id: "veloce-systems",
    title: "Veloce Systems",
    tags: ["Brand", "Web"],
    image: "/projects/d7dd4681-dd87-4a13-936c-af506b89313a.png",
    link: "#",
  },
  {
    id: "flex-studios",
    title: "Flex Studios",
    tags: ["Brand", "Web"],
    image: "/projects/Untitled-Made with FlexClip.png",
    link: "#",
  },
];

export default function CaseStudiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Custom follower cursor physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -520 : 520;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="case-studies" className="w-full bg-white py-20 sm:py-28 overflow-hidden text-zinc-900 relative">
      {/* Header Container */}
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-24 mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif font-light leading-[1.2] tracking-tight text-zinc-900 max-w-3xl"
        >
          Empowering you with smart creative work so you can grow your business.
        </motion.h2>

        {/* Minimal Navigation Arrows */}
        <div className="hidden sm:flex items-center gap-5 shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-16 h-16 rounded-full border border-zinc-300 bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-xs cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-16 h-16 rounded-full border border-zinc-300 bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-xs cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track with Left Spacing */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsDragging(false);
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing md:cursor-none pb-6 pl-6 sm:pl-10 lg:pl-24 pr-6 sm:pr-10 lg:pr-24 scroll-pl-6 sm:scroll-pl-10 lg:scroll-pl-24 scroll-pr-6 sm:scroll-pr-10 lg:scroll-pr-24"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {caseStudies.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="w-[84vw] sm:w-[500px] md:w-[580px] lg:w-[640px] shrink-0 snap-start group"
          >
            <Link href={project.link} className="block select-none md:cursor-none">
              {/* Image Container with rounded corners matching reference */}
              <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-200 shadow-sm border border-zinc-200/60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 580px, 640px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Card Footer: Project Title + Tags as in screenshot */}
              <div className="mt-3.5 sm:mt-4 flex items-center gap-2.5">
                <span className="font-normal text-zinc-900 text-sm sm:text-base tracking-tight">
                  {project.title}
                </span>

                <div className="flex items-center gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[11px] sm:text-xs rounded-md bg-[#ECE8E1] text-zinc-700 font-normal tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Floating Custom Cursor Follower */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center rounded-full shadow-2xl bg-white text-zinc-900 border border-white/10 backdrop-blur-xs select-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: 76,
          height: 76,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isHovered
            ? { scale: isDragging ? 0.85 : 1, opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        <span className="flex items-center gap-1 text-xs font-semibold tracking-wide">
          {isDragging ? "Drag" : "Visit"}
          {!isDragging && <ArrowUpRight className="w-3.5 h-3.5 text-[#1757EE]" />}
        </span>
      </motion.div>
    </section>
  );
}
