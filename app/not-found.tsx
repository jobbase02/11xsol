"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SearchX, ArrowLeft, Home } from "lucide-react";

// Standard Grid Background
const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
  </div>
);

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-hidden flex flex-col items-center justify-center relative pt-34 pb-20">
      
      <TechGridBackground />

      {/* Subtle Blue Glow (Smaller & Smoother) */}
      <motion.div 
         animate={{ opacity: [0.3, 0.5, 0.3] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"
      ></motion.div>

      {/* Reduced Container Width (max-w-md) for a compact look */}
      <div className="relative z-10 max-w-md w-full px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group"
        >
           {/* Moving "Radar Scan" Line Animation */}
           <motion.div 
             animate={{ top: ["-10%", "110%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-0"
           />

           <div className="relative z-10">
               {/* Icon */}
               <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-blue-500/30 transition-colors">
                     <SearchX size={24} className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
                  </div>
               </div>

               {/* Text Content */}
               <div className="mb-8">
                   <h1 className="text-5xl font-bold font-almarena text-white tracking-tight mb-2">
                     404
                   </h1>
                   <div className="h-px w-12 bg-blue-500 mx-auto mb-4 rounded-full"></div>
                   <p className="text-zinc-400 text-sm leading-relaxed">
                     We couldn't locate that page. It might have been moved, deleted, or lost in the void.
                   </p>
               </div>

               {/* Compact Buttons */}
               <div className="flex flex-col gap-3">
                 <Link 
                   href="/"
                   className="w-full py-3 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                 >
                   <Home size={16} />
                   <span>Return Home</span>
                 </Link>
                 
                 <button 
                   onClick={() => window.history.back()}
                   className="w-full py-3 bg-zinc-900 border border-white/5 text-zinc-400 text-sm font-bold rounded-lg hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                 >
                   <ArrowLeft size={16} />
                   <span>Go Back</span>
                 </button>
               </div>
           </div>

        </motion.div>

        <p className="mt-8 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
            System Error: PAGE_NOT_FOUND
        </p>

      </div>
    </div>
  );
}