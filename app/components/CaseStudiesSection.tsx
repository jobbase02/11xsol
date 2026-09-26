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
    id: "jobbase",
    title: "Jobbase",
    tags: ["Recruitment Platform", "Web"],
    image: "/projects/jobbase.webp",
    link: "https://jobbase-v2.vercel.app/",
  },
  {
    id: "Mockup-Test",
    title: "Mockup-Test",
    tags: ["Education Platform", "Web"],
    image: "/projects/Mockup-Test.webp",
    link: "https://yourprepcorner.vercel.app/",
  },
  {
    id: "Real-estate",
    title: "Real-estate",
    tags: ["Real Estate", "Web"],
    image: "/projects/Real-estate.webp",
    link: "https://real-estate-ten-zeta-24.vercel.app/",
  },
  {
    id: "E-commerce",
    title: "E-commerce",
    tags: ["E-commerce", "Web"],
    image: "/projects/E-commerce.webp",
    link: "https://www.divasbucket.store/",
  },
  {
    id: "Gym",
    title: "Gym",
    tags: ["Gym", "Web"],
    image: "/projects/Gym.webp",
    link: "https://www.bajrangfitness.com/",
  },
  {
    id: "Kitchen",
    title: "Kitchen",
    tags: ["Restaurant", "Web"],
    image: "/projects/kitchen.webp",
    link: "https://elysian-table.vercel.app/",
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

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

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
            initial={isDesktop ? { opacity: 0, y: 24 } : false}
            whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
            viewport={isDesktop ? { once: true, margin: "-40px" } : undefined}
            transition={isDesktop ? { duration: 0.5, delay: index * 0.08, ease: "easeOut" } : undefined}
            className="w-[84vw] sm:w-[500px] md:w-[580px] lg:w-[640px] shrink-0 snap-start group"
          >
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block select-none md:cursor-none"
            >
              {/* Image Container with rounded corners matching reference */}
              <div className="relative w-full aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden bg-zinc-200 shadow-sm border border-zinc-200/60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 580px, 640px"
                  className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Card Footer: Project Title + Tags + Mobile "Click to visit" indicator */}
              <div className="mt-3.5 sm:mt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                  <span className="font-normal text-zinc-900 text-sm sm:text-base tracking-tight">
                    {project.title}
                  </span>

                  <div className="flex items-center gap-1.5 flex-wrap">
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

                {/* Mobile text: "Click to visit" (hidden on md+ where custom floating cursor is used) */}
                <span className="md:hidden shrink-0 inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50/90 px-2 py-0.5 rounded-md border border-blue-100">
                  Click to visit <ArrowUpRight className="w-3 h-3" />
                </span>
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
