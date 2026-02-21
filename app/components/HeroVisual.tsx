"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, BarChart } from "lucide-react";

const HeroVisual = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end py-12 lg:py-0 px-4 sm:px-0"
        >
            <div className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-md aspect-[3/5] md:aspect-[4/5] mx-auto">
                {/* Deep Background Glows */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-20 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                        rotate: [0, -5, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-20 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
                />

                {/* The Glass Monolith */}
                <motion.div
                    whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative h-full w-full bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col z-10"
                >
                    {/* Internal Refraction Borders */}
                    <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none" />
                    <div className="absolute inset-[1px] border border-white/5 rounded-[2.45rem] pointer-events-none" />

                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/40" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                            <div className="w-3 h-3 rounded-full bg-green-500/40" />
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                            <Terminal size={14} className="text-blue-400" />
                            <span className="tracking-widest">ENGINE_CORE_V2.0</span>
                        </div>
                    </div>

                    <div className="flex-1 p-6 md:p-8 font-manrope text-[11px] md:text-sm space-y-4 md:space-y-6 relative overflow-hidden">
                        {/* Value Points */}
                        <div className="space-y-4">
                            {[
                                "10+ Projects Delivered • 100% Client Satisfaction.",
                                "Trusted by Startups, Creators & Growing Brands.",
                                "Modern Tech Stack • Future-Ready Websites.",
                                "SEO-Optimized Builds • Performance First.",
                                "Long-Term Support, Not One-Time Delivery.",
                                "From Idea to Impact.",
                                "Your Growth, Our Mission."
                            ].map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="flex gap-4 items-start"
                                >
                                    <span className="text-blue-500 font-mono text-xs pt-0.5">
                                        {(i + 1).toString().padStart(2, "0")}
                                    </span>
                                    <p className="text-zinc-300 leading-tight">
                                        {point}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Central Hologram Ring */}
                        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 pointer-events-none opacity-[0.02] md:opacity-100">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border border-purple-500/30 rounded-full"
                            />
                        </div>

                        {/* Metrics Dashboard */}
                        <div className="absolute bottom-6 md:bottom-10 left-4 right-4 md:left-8 md:right-8 grid grid-cols-2 gap-3 md:gap-4">
                            <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 backdrop-blur-md">
                                <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase mb-0.5 md:mb-1">Response</div>
                                <div className="text-sm md:text-xl font-bold text-white">12ms</div>
                            </div>
                            <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 backdrop-blur-md">
                                <div className="text-[9px] md:text-[10px] text-zinc-500 uppercase mb-0.5 md:mb-1">Availability</div>
                                <div className="text-sm md:text-xl font-bold text-green-400">99.9%</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Scanner */}
                    <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-20 pointer-events-none"
                    />
                </motion.div>

                {/* External Decorative Elements */}
                {/* Floating Zap */}
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute -right-1 md:-right-8 top-1/4 bg-blue-600/10 backdrop-blur-xl p-3 md:p-4 rounded-xl md:rounded-2xl border border-blue-500/20 shadow-2xl z-20"
                >
                    <Zap className="text-blue-400 w-6 h-6 md:w-8 md:h-8" />
                </motion.div>

                {/* Floating Growth */}
                <motion.div
                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-1 md:-left-12 bottom-1/4 bg-purple-600/10 backdrop-blur-xl p-3 md:p-4 rounded-xl md:rounded-2xl border border-purple-500/20 shadow-2xl z-20 flex items-center gap-2 md:gap-3"
                >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500/20 rounded-lg md:rounded-xl flex items-center justify-center">
                        <BarChart className="text-purple-400 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                        <div className="text-[9px] md:text-[10px] text-zinc-400 font-mono text-center">SCALING</div>
                        <div className="text-white font-bold text-base md:text-lg font-mono">11.4X</div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HeroVisual;
