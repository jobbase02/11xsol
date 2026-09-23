import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePreloader } from "./Preloader";

const HeroVisual = () => {
    const { isLoaded } = usePreloader();

    return (
        <motion.div
            initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 35, filter: "blur(6px)" }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative space-y-8 max-w-xl"
        >
            {/* Editorial Narrative Paragraph */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-black text-xl sm:text-2xl lg:text-[1.65rem] leading-[1.5] sm:leading-[1.55] font-light tracking-normal text-pretty"
            >
                Digital systems define the competitive frontier of ambitious businesses.
                ElevenX Solutions is an engineering studio dedicated to building
                high-performance web applications, scalable platforms and next generation
                interfaces.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.9, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
                <Link
                    href="/book"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1757EE] text-white font-semibold text-base rounded-full hover:bg-zinc-800 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-black/5 min-h-[48px]"
                >
                    <span>Initialize Project</span>
                    <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                </Link>

                <Link
                    href="#case-studies"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white border border-zinc-300 text-black font-medium text-base hover:bg-zinc-50 hover:border-zinc-400 transition-all duration-300 text-center min-h-[48px]"
                >
                    View Archive
                </Link>
            </motion.div>

            {/* Micro Metrics Proof Strip */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-zinc-200"
            >
                <div>
                    <div className="text-black font-mono font-bold text-sm sm:text-base md:text-lg">
                        2–4 Wks
                    </div>
                    <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-mono mt-1 leading-tight">
                        Sprint Delivery
                    </div>
                </div>
                <div>
                    <div className="text-black font-mono font-bold text-sm sm:text-base md:text-lg">
                        90+
                    </div>
                    <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-mono mt-1 leading-tight">
                        PageSpeed Score
                    </div>
                </div>
                <div>
                    <div className="text-black font-mono font-bold text-sm sm:text-base md:text-lg">
                        3.8x
                    </div>
                    <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-mono mt-1 leading-tight">
                        Avg. Conversion Lift
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default HeroVisual;
