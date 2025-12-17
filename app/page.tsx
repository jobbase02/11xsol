"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Rocket,
  Book,
  Layout,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  Database,
  Zap,
  Shield,
  BarChart,
  Terminal,
  Code2,
  Quote,
} from "lucide-react";
import GlareHover from "@/components/GlareHover";
import CountUp from "@/components/CountUp";
import Faq from "./components/Faqs";

// --- Utility Components ---

const GridBackground = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
    {/* Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    {/* Radial Fade */}
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
    
    {/* Colored Orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-800/20 rounded-full blur-[100px] mix-blend-screen animate-pulse duration-[8000ms]" />
    <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-purple-800/10 rounded-full blur-[100px] mix-blend-screen" />
  </div>
);

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// --- Sections ---

const Hero = () => {
  // Simple Typewriter Logic for the code block
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const fullCode = [
    "interface Performance {",
    "  speed: 'Lightning';",
    "  security: 'FortKnox';",
    "  scale: 'Infinite';",
    "}"
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullCode.length) {
        setCodeLines((prev) => [...prev, fullCode[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 600); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center pt-26 lg:pt-32 pb-12 overflow-hidden bg-black selection:bg-blue-600/30">
      <GridBackground />

      <div className="max-w-6xl mx-auto px-6 w-full z-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        
        {/* LEFT COLUMN */}
        {/* CHANGED: Added 'h-full flex flex-col justify-between py-4' to spread content vertically */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative h-full flex flex-col justify-between py-2 md:py-6 gap-8 lg:gap-0"
        >
          {/* Top Content Wrapper */}
          <div className="space-y-6">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/20 border border-blue-500/20 text-blue-400 text-xs font-semibold backdrop-blur-sm hover:bg-blue-950/40 transition-colors cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Accepting New Clients for 2025
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-almarena text-white leading-[1.1] tracking-tight"
            >
              Want Growth? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Welcome
              </span>{" "}
              To <br />
              The Right Place.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-zinc-400 max-w-lg leading-relaxed"
            >
              ElevenXSolutions transforms your ideas into scalable,
              high performance web applications. We build digital weapons your business can win with.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4 font-almarena pt-2"
            >
              {/* CHANGED: Updated Link to /book?utm... */}
              <a
                href="/book?utm_source=landing_page_hero"
                className="px-6 py-3 w-full md:w-fit bg-white text-black font-bold text-base rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Start Project <ArrowRight size={18} />
              </a>

              <div className="w-full md:w-fit h-full">
                <GlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.1}
                  glareAngle={-30}
                  glareSize={200}
                  transitionDuration={800}
                >
                  {/* CHANGED: Text to 'Insights' and Link to /blogs */}
                  <a
                    href="/blogs"
                    className="px-6 py-3 w-full md:w-fit block bg-zinc-900/80 border border-zinc-800 text-white font-medium text-base rounded-xl hover:bg-zinc-800 transition-all text-center backdrop-blur-md"
                  >
                    Insights
                  </a>
                </GlareHover>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          {/* CHANGED: Added 'w-full justify-between' to take whole width and 'text-white' for icons */}
          <motion.div
            variants={fadeInUp}
            className="w-full flex justify-between items-center border-t border-white/5 pt-6 mt-4"
          >
            <div>
              <div className="text-xl md:text-2xl font-bold text-white flex items-baseline">
                <CountUp from={0} to={5} separator="," direction="up" duration={1} />
                {/* CHANGED: Removed blue color */}
                <span className="text-white">+</span>
              </div>
              <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide font-medium mt-1">
                Years Exp.
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-white flex items-baseline">
                <CountUp from={0} to={100} separator="," direction="up" duration={1} />
                {/* CHANGED: Removed blue color */}
                <span className="text-white">%</span>
              </div>
              <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide font-medium mt-1">
                Custom Built
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-white flex items-baseline">
                <CountUp from={0} to={98} separator="," direction="up" duration={1} />
                {/* CHANGED: Removed blue color */}
                <span className="text-white">%</span>
              </div>
              <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide font-medium mt-1">
                Retention
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN (3D Tech Visual) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-end py-6 lg:py-0"
        >
          <div className="relative w-full max-w-sm aspect-square md:aspect-[4/5] lg:aspect-[4/5] mx-auto">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-[3rem] rotate-3 blur-3xl"></div>

            {/* Main Card */}
            <div className="absolute inset-0 bg-[#0A0A0A] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col z-10">
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                  <Terminal size={10} />
                  <span>server-main.tsx</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="flex-1 p-5 md:p-6 font-mono text-xs md:text-sm space-y-3 relative">
                <div className="absolute top-0 right-8 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"></div>

                <div className="space-y-2">
                  {codeLines.map((line, idx) => {
                     if (!line) return null;
                     return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-3"
                      >
                        <span className="text-zinc-700 select-none">{(idx + 1).toString().padStart(2, '0')}</span>
                        <span dangerouslySetInnerHTML={{ 
                          __html: (line || "")
                            .replace("interface", "<span class='text-purple-400'>interface</span>")
                            .replace("Performance", "<span class='text-yellow-100'>Performance</span>")
                            .replace("speed:", "<span class='text-blue-400'>speed:</span>")
                            .replace("security:", "<span class='text-blue-400'>security:</span>")
                            .replace("scale:", "<span class='text-blue-400'>scale:</span>")
                            .replace(/'(.*?)'/g, "<span class='text-green-400'>'$1'</span>")
                        }} />
                      </motion.div>
                     );
                  })}
                  
                  {/* Blinking Cursor */}
                  <motion.div 
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-1.5 h-4 bg-blue-500 ml-7"
                  />
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                  <div className="text-blue-300 text-[9px] uppercase tracking-widest mb-1.5 font-bold">
                    Deploy Status
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-white font-bold text-xs">
                      Production Ready
                    </span>
                  </div>
                  <div className="mt-2 h-0.5 w-full bg-blue-900/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -right-4 top-20 bg-zinc-900/90 backdrop-blur-xl p-3 rounded-xl border border-zinc-800 shadow-2xl z-20"
            >
              <Zap className="text-yellow-400 w-6 h-6 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -left-8 bottom-32 bg-zinc-900/90 backdrop-blur-xl p-3 rounded-xl border border-zinc-800 shadow-2xl z-20 flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <BarChart className="text-white w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-400">Growth</div>
                <div className="text-white font-bold text-sm">+114%</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// const Services = () => {
//   const services = [
//     {
//       icon: <Layout className="text-white" size={24} />,
//       title: "Website Development",
//       desc: "Make your brand stand out online with high-performance, custom-engineered web applications.",
//       color: "from-blue-600 to-blue-400",
//     },
//     {
//       icon: <Book className="text-white" size={24} />,
//       title: "Booking Systems",
//       desc: "Custom booking engines that sync seamlessly with your calendar and payment gateways like Stripe.",
//       color: "from-indigo-600 to-indigo-400",
//     },
//     {
//       icon: <Globe className="text-white" size={24} />,
//       title: "Influencer Marketing",
//       desc: "Turn influencer power into unstoppable brand momentum. More reach, more trust, more sales.",
//       color: "from-purple-600 to-purple-400",
//     },
//     {
//       icon: <Database className="text-white" size={24} />,
//       title: "API Development",
//       desc: "Scalable REST and GraphQL APIs that serve as the backbone for your mobile and web ecosystem.",
//       color: "from-teal-600 to-teal-400",
//     },
//   ];

//   return (
//     <section id="services" className="py-20 lg:py-24 bg-black relative">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           variants={fadeInUp}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-almarena">
//             Expertise That Matters
//           </h2>
//           <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">
//             Tell us how you work? ElevenX Solution will build you the system that works for you.
//             <br className="hidden md:block" /> Built to grow, Built to win.
//           </p>
//         </motion.div>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//           variants={staggerContainer}
//           className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
//               }}
//               whileHover={{ y: -5 }}
//               className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
//             >
//               <div
//                 className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-bl-full blur-2xl transition-opacity duration-500`}
//               ></div>

//               <div
//                 className={`mb-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
//               >
//                 {service.icon}
//               </div>
              
//               <h3 className="text-xl font-bold text-white mb-4">
//                 {service.title}
//               </h3>
//               <p className="text-zinc-400 text-sm leading-relaxed mb-6">
//                 {service.desc}
//               </p>

//               <div className="flex items-center gap-2 text-sm font-semibold text-white/40 group-hover:text-white transition-colors cursor-pointer">
//                 Learn more <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

const Services = () => {
  const services = [
    {
      icon: <Layout className="text-white" size={24} />,
      title: "Website Development",
      desc: "Make your brand stand out online with high-performance, custom-engineered web applications.",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: <Book className="text-white" size={24} />,
      title: "Booking Systems",
      desc: "Custom booking engines that sync seamlessly with your calendar and payment gateways like Stripe.",
      color: "from-indigo-600 to-indigo-400",
    },
    {
      icon: <Globe className="text-white" size={24} />,
      title: "Influencer Marketing",
      desc: "Turn influencer power into unstoppable brand momentum. More reach, more trust, more sales.",
      color: "from-purple-600 to-purple-400",
    },
    {
      icon: <Database className="text-white" size={24} />,
      title: "API Development",
      desc: "Scalable REST and GraphQL APIs that serve as the backbone for your mobile and web ecosystem.",
      color: "from-teal-600 to-teal-400",
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-24 bg-black relative">
      {/* Subtle moving gradient background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-72 max-w-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-almarena">
            Expertise That Matters
          </h2>
          <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Tell us how you work? ElevenX Solution will build you the system that works for you.
            <br className="hidden md:block" /> Built to grow, Built to win.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                rotateX: 2,
                rotateY: -2,
              }}
              whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              {/* Animated diagonal shimmer on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={{ x: "-120%" }}
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.16), transparent)",
                }}
              />

              {/* Soft color gradient burst in top-right */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-bl-full blur-2xl transition-opacity duration-500`}
              ></div>

              {/* Floating icon */}
              <motion.div
                className={`mb-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg relative z-10`}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3 + index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {service.icon}
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 relative z-10">
                {service.desc}
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold text-white/40 group-hover:text-white transition-colors cursor-pointer relative z-10">
                <span className="relative">
                  <motion.span
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-white/30 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  />
                  Learn more
                </span>
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


const OurStory = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white font-manrope mb-6">
              The <span className="text-blue-500">ElevenX</span> Origin
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We didn't start as an agency. We started as engineers tired of slow, bloated software. 
              We built ElevenX to prove that speed, aesthetics, and code quality can coexist.
            </p>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="hidden md:block"
          >
             <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-sm font-mono flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                System Status: Scaling
             </div>
          </motion.div>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: THE SPARK (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 md:p-12 hover:border-blue-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
               <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 mb-4">
                  <Zap size={24} />
               </div>
               
               <div>
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Born from Frustration</h3>
                 <p className="text-zinc-400 leading-relaxed text-base md:text-lg max-w-lg">
                    We saw too many great businesses held back by clunky websites. We realized the market didn't need "more developers"—it needed <span className="text-white">better architects</span>. ElevenX started in a small room with one obsession: Performance.
                 </p>
               </div>
            </div>
          </motion.div>

          {/* CARD 2: THE PHILOSOPHY (Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 hover:border-purple-500/30 transition-colors flex flex-col"
          >
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
             
             {/* Abstract Code Visual */}
             <div className="absolute inset-0 opacity-20 font-mono text-[10px] p-4 text-blue-300 leading-none overflow-hidden select-none">
                {Array(20).fill("010110 const engine = new ElevenX(); return speed; ").map((s, i) => <div key={i}>{s}</div>)}
             </div>

             <div className="relative z-10 mt-auto">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 mb-4">
                  <Terminal size={20} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Code First</h3>
               <p className="text-zinc-400 text-sm leading-relaxed">
                  While others sold templates, we wrote custom engines. We adopted Serverless & Edge computing before they were cool.
               </p>
             </div>
          </motion.div>

          {/* CARD 3: THE SCALE (Tall) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 hover:border-green-500/30 transition-colors"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500/10 blur-[50px] rounded-full"></div>

             <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-400">
                  <Globe size={20} />
               </div>
               
               <div className="mt-8">
                 <h3 className="text-xl font-bold text-white mb-2">Global Impact</h3>
                 <p className="text-zinc-400 text-sm leading-relaxed">
                    From local startups to enterprise giants. Our systems now handle millions of requests, driving revenue across 12 countries.
                 </p>
               </div>
             </div>
          </motion.div>

          {/* CARD 4: THE FUTURE (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-8 md:p-12 hover:border-indigo-500/30 transition-colors"
          >
            {/* Background Gradient Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-blue-900/10 opacity-50"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
               <div className="max-w-md">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                        <Rocket size={20} />
                      </div>
                      <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">Vision 2025</span>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">11x and Beyond</h3>
                   <p className="text-zinc-400 text-base leading-relaxed">
                      We are evolving from a dev shop to a strategic growth partner. We are currently building proprietary AI-driven interfaces that will define the next decade of web.
                   </p>
               </div>

               {/* Decorative Stat */}
               <div className="hidden md:block">
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
                     <div className="text-xs text-zinc-500 uppercase mb-1">R&D Investment</div>
                     <div className="text-2xl font-bold text-white">+400%</div>
                  </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 lg:py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-almarena">
            Invest In Your Growth
          </h2>
          <p className="text-zinc-400 text-lg">
            We have got a plan for every level. From startups to industry leaders.
          </p>
        </motion.div>

        {/* 3 Columns Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          
          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm hover:border-white/10 transition-all"
          >
            <h3 className="text-lg font-bold text-zinc-400 mb-2 tracking-wide">BASIC</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">₹5,000</span>
              <span className="text-sm text-zinc-500">starting</span>
            </div>
            <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">
              For small businesses or individuals who need a clean, functional online presence.
            </p>
            <div className="w-full h-px bg-white/5 mb-8"></div>
            <div className="space-y-4 mb-8">
              {[
                "Upto 5 pages",
                "Modern UI/UX Design",
                "Mobile Responsive",
                "SSL Setup",
                "Basic Speed Optimization",
                "7-Days Custom Support",
                "Delivery 5-7 Days",               
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-blue-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <a href="/book?plan=basic&upm_source=landing_page_pricing" className="block w-full py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white hover:text-black transition-colors text-center">
               Choose Basic
            </a>
          </motion.div>

          {/* Business Plan (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-blue-500/30 bg-zinc-900/80 relative shadow-2xl shadow-blue-900/10 z-10 transform md:-translate-y-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-blue-600/20">
              Most Popular
            </div>
            <h3 className="text-lg font-bold text-blue-400 mb-2 tracking-wide">BUSINESS</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-white">₹8,000</span>
              <span className="text-sm text-zinc-500">starting</span>
            </div>
            <p className="text-zinc-300 text-sm mb-8 min-h-[40px]">
              Perfect for growing companies that need features, branding, and better performance.
            </p>
            <div className="w-full h-px bg-blue-500/20 mb-8"></div>
            <div className="space-y-4 mb-8">
              {[
                "Everything in Basic",
                "Upto 10-12 pages",
                "Custom UI/UX Design",
                "CMS Integration (Wordpress)",
                "On-Page SEO Optimization",
                "3 Rounds of Revisions",
                "14-Days Custom Support",
                "Delivery 10-14 Days",   
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <a href="/book?plan=business&upm_source=landing_page_pricing" className="block w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 text-center">
              Choose Business
            </a>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm hover:border-white/10 transition-all"
          >
            <h3 className="text-lg font-bold text-zinc-400 mb-2 tracking-wide">PREMIUM</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">₹14,000</span>
              <span className="text-sm text-zinc-500">starting</span>
            </div>
            <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">
              For brands that want automation, custom functionality, and enterprise-grade performance.
            </p>
            <div className="w-full h-px bg-white/5 mb-8"></div>
            <div className="space-y-4 mb-8">
              {[
                "Everything in Business",
                "Unlimited pages",
                "Advanced Security + Firewall",
                "Premium Animation (GSAP)",
                "Backup & Restore System",
                "Advanced SEO",
                "30-Days Custom Support",
                "Delivery 20-30 Days",   
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={12} className="text-blue-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <a href="/book?plan=premium&upm_source=landing_page_pricing" className="block w-full py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white hover:text-black transition-colors text-center">
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const InfiniteTestimonials = () => {
  const testimonials = [
    {
      text: "11XSolutions completely transformed our internal workflow. The dashboard they built saved us 20 hours a week.",
      name: "Sarah Jenkins",
      role: "CEO, TechFlow",
      img: "sarah",
    },
    {
      text: "The most professional dev team I've worked with. They understood our business logic better than we did.",
      name: "Michael Ross",
      role: "Founder, EstateBook",
      img: "mike",
    },
    {
      text: "Blazing fast delivery. The app scaled to 10k users in the first week without a hitch.",
      name: "David Chen",
      role: "CTO, FinStart",
      img: "dave",
    },
    {
      text: "Their design sense matches their engineering skills. A rare combination in this industry.",
      name: "Elena Rodriguez",
      role: "Product Lead, CreativeCo",
      img: "elena",
    },
  ];

  // Duplicate for seamless loop
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="py-24 bg-black overflow-hidden relative border-t border-white/5">
      
      {/* Background Tech Grid (Consistent with OurStory) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-almarena mb-6">
            Trusted by <span className="text-blue-500">Industry Leaders</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Don't take our word for it. Here is what the engineers and founders we work with have to say.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden z-10">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 50, // Slower, more readable speed
            repeat: Infinity,
          }}
        >
          {extendedTestimonials.map((item, i) => (
            <div
              key={i}
              className="relative w-[300px] sm:w-[450px] bg-zinc-900/40 p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-blue-500/30 transition-colors backdrop-blur-md group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-white/5 group-hover:text-blue-500/10 transition-colors">
                <Quote size={60} />
              </div>

              <div className="relative z-10">
                {/* Tech Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono mb-6 uppercase tracking-wider">
                   <CheckCircle2 size={12} />
                   Verified Client
                </div>

                <p className="text-zinc-200 text-lg leading-relaxed mb-8 font-light">
                  "{item.text}"
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-12 h-12 bg-zinc-800 rounded-full overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.img}&backgroundColor=transparent`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-base">
                    {item.name}
                  </div>
                  <div className="text-zinc-500 text-xs font-mono uppercase tracking-wide">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Main App Component ---
const App = () => {
  return (
    <div className="bg-black w-full overflow-x-hidden min-h-screen text-zinc-200 selection:bg-blue-600/30">
      <main>
        <Hero />
        <Services />
        <OurStory />
        <Pricing />
        <InfiniteTestimonials />
        <Faq />
      </main>
    </div>
  );
};

export default App;