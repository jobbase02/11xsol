"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  LineChart,
  Zap,
  Globe,
  Gauge,
} from "lucide-react";
import img from "@/public/Seo-green.png";

/* ---------------- ANIMATIONS ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const float = {
  animate: { y: [0, -14, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

export default function SEOOptimizationPage() {
  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>SEO Optimization Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="Revenue-focused SEO optimization services. Rank higher, attract qualified traffic, and convert organic visitors into customers."
        />
      </Head>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen bg-zinc-950 flex items-center overflow-hidden">
        <motion.div {...float} className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-green-600/20 blur-[170px]" />
        <motion.div {...float} className="absolute bottom-[-220px] right-[-220px] w-[520px] h-[520px] bg-blue-600/20 blur-[180px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10 mt-30 lg:mt-0">
          {/* TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 text-center md:text-left"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              SEO Optimization <br />
              <span className="text-green-500 relative">
                That Compounds Growth
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-green-500 to-blue-500 hidden lg:block" />
              </span>
            </motion.h1>

            <p className="text-zinc-400 max-w-xl">
              We don&apos;t chase keywords — we engineer SEO foundations that drive
              consistent traffic, higher rankings, and real business growth.
            </p>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Optimize Your Website <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <Image
              src={img}
              alt="SEO Performance Dashboard"
              className="rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHY SEO ================= */}
      <section className="relative py-20 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Why SEO Is a <span className="text-green-500">Long-Term Asset</span>
            </h2>
            <p className="mt-6 text-zinc-500 text-lg">
              SEO compounds when strategy, execution, and consistency align.
            </p>
          </motion.div>

          <div className="space-y-14">
            {[
              {
                tag: "VISIBILITY",
                title: "Be present when intent is highest",
                desc: "SEO positions your brand exactly where users are actively searching for solutions you offer.",
              },
              {
                tag: "AUTHORITY",
                title: "Trust is built before the first click",
                desc: "Search engines reward brands that consistently deliver relevance, performance, and value.",
              },
              {
                tag: "CONSISTENCY",
                title: "Traffic that doesn’t disappear overnight",
                desc: "Unlike ads, SEO continues delivering results long after the work is done.",
              },
              {
                tag: "COMPOUNDING ROI",
                title: "Every month builds on the last",
                desc: "As rankings improve, traffic increases, conversions grow, and acquisition costs drop.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="grid md:grid-cols-[180px_1fr] gap-6"
              >
                <div className="text-sm font-bold text-green-500 tracking-widest">
                  {item.tag}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 max-w-3xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold text-green-500 mb-12"
          >
            What Our SEO Covers
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search />,
                title: "Search Intent Research",
                desc: "We target keywords that bring conversions, not vanity traffic.",
              },
              {
                icon: <Globe />,
                title: "Technical SEO",
                desc: "Indexing, speed, Core Web Vitals, and crawl optimization.",
              },
              {
                icon: <LineChart />,
                title: "On-Page & Content SEO",
                desc: "Structure, content depth, and semantic relevance.",
              },
              {
                icon: <Users />,
                title: "UX & Engagement",
                desc: "Lower bounce rates and stronger user signals.",
              },
              {
                icon: <BarChart3 />,
                title: "Analytics & Reporting",
                desc: "Clear metrics tied to growth and ROI.",
              },
              {
                icon: <ShieldCheck />,
                title: "Future-Safe SEO",
                desc: "White-hat strategies aligned with algorithm updates.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-2xl bg-zinc-900/60 backdrop-blur border border-white/10 hover:border-green-500/40 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.6)] transition"
              >
                <div className="text-green-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEO PROCESS ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            Our SEO Optimization Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Audit & Research",
                desc: "Deep analysis of your website, competitors, keywords, and search intent.",
              },
              {
                title: "Strategy & Roadmap",
                desc: "A clear SEO roadmap covering technical fixes, content, and growth priorities.",
              },
              {
                title: "Execution & Optimization",
                desc: "On-page SEO, technical improvements, content optimization, and UX enhancements.",
              },
              {
                title: "Tracking & Scaling",
                desc: "Continuous monitoring, reporting, and scaling to compound results.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-xl bg-zinc-900 border border-white/10"
              >
                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-green-600 text-black flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <h4 className="text-white font-bold mt-6 mb-2">
                  {step.title}
                </h4>
                <p className="text-zinc-400 text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Zap className="mx-auto text-green-500 mb-4" size={42} />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build <span className="text-green-500">Organic Authority</span>?
          </h2>
          <p className="text-zinc-400 mb-8">
            Let’s turn search visibility into long-term, compounding growth.
          </p>

          <a
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 transition"
          >
            Book a Free SEO Strategy Call <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
