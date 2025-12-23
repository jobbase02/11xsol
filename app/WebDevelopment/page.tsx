"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Globe,
  Layers,
  Zap,
  ShieldCheck,
  Smartphone,
  BarChart3,
  Workflow,
} from "lucide-react";
import img from "@/public/web-team.png";

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

export default function WebDevelopmentPage() {
  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>Web Development Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="High-performance web development services. We build fast, scalable, conversion-focused websites that drive real business growth."
        />
        <meta
          name="keywords"
          content="Web Development Services, Website Development Company, Custom Website Development, Business Websites"
        />
      </Head>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen bg-zinc-950 flex items-center overflow-hidden">
        {/* Animated Orbs */}
        <motion.div {...float} className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[160px]" />
        <motion.div {...float} className="absolute bottom-[-200px] right-[-200px] w-[520px] h-[520px] bg-purple-600/20 blur-[180px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10 mt-35 lg:mt-0">
          {/* TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 text-center md:text-left"
          >
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Web Development <br />
              <span className="text-blue-500 relative">
                That Converts & Scales
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block" />
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-zinc-400 max-w-xl mx-auto md:mx-0 text-lg">
              A website is no longer just an online presence — it’s your first
              impression, sales engine, and credibility layer. We build fast,
              secure, and conversion-focused websites designed to grow your
              business, not just look good.
            </motion.p>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Start Your Project <ArrowRight size={16} />
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
              alt="Web Development Dashboard"
              className="rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHY WEB DEVELOPMENT ================= */}
      {/* ================= WHY WEB DEVELOPMENT (NEW DESIGN) ================= */}
<section className="relative py-20 bg-black overflow-hidden border-t border-white/5">
  {/* subtle background texture */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_45%)]" />

  <div className="relative z-10 max-w-6xl mx-auto px-6">
    
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl mx-auto mb-20"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
        Why Web Development <br />
        <span className="text-zinc-400">
          Decides Your <span className="text-blue-500">Brand’s Future</span>?
        </span>
      </h2>

      <p className="mt-6 text-zinc-500 text-lg">
        In a digital first world, your website is no longer optional.
        It is the foundation of trust, growth, and conversion.
      </p>
    </motion.div>

    {/* Content Rows */}
    <div className="space-y-14">
      {[
        {
          tag: "FIRST IMPRESSION",
          title: "People trust your website before they trust you",
          desc: "The moment someone hears about your brand, they search for you. What they see in those first few seconds determines credibility, interest, and action."
        },
        {
          tag: "SILENT SALES ENGINE",
          title: "Your website works even when you don’t",
          desc: "While you focus on running your business, your website should educate, build confidence, and convert visitors — automatically, every day."
        },
        {
          tag: "STRATEGY OVER DESIGN",
          title: "Good design looks nice. Smart development makes money.",
          desc: "A visually pleasing site means nothing without speed, structure, clarity, and performance. Results come from strategy, not decoration."
        },
        {
          tag: "LONG-TERM GROWTH",
          title: "Built to scale, not rebuilt every year",
          desc: "We develop websites that grow with your business — adaptable, maintainable, and ready for future expansion without starting from scratch."
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          className="grid md:grid-cols-[180px_1fr] gap-6 items-start"
        >
          {/* Tag */}
          <div className="text-sm font-bold text-blue-500 tracking-widest">
            {item.tag}
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-3 leading-snug">
              {item.title}
            </h3>
            <p className="text-zinc-400 leading-relaxed max-w-3xl">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ================= FEATURES ================= */}
      <section className="py-10 lg:py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold text-blue-500 mb-12"
          >
            What We Deliver?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe />,
                title: "Custom Website Development",
                desc: "Tailor-made websites built around your business goals — not templates.",
              },
              {
                icon: <Smartphone />,
                title: "Fully Responsive Design",
                desc: "Pixel-perfect experiences across mobile, tablet, and desktop devices.",
              },
              {
                icon: <Zap />,
                title: "High Performance & Speed",
                desc: "Optimized for fast load times, better SEO, and improved conversions.",
              },
              {
                icon: <BarChart3 />,
                title: "SEO-Ready Architecture",
                desc: "Clean structure and technical foundations that search engines love.",
              },
              {
                icon: <Workflow />,
                title: "Scalable & Maintainable Code",
                desc: "Future-ready codebases that grow with your business.",
              },
              {
                icon: <ShieldCheck />,
                title: "Security & Reliability",
                desc: "Best practices to keep your website stable, secure, and protected.",
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
                className="p-6 rounded-2xl bg-zinc-900/60 backdrop-blur border border-white/10 hover:border-blue-500/40 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] transition"
              >
                <div className="text-blue-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-10 lg:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            Our Web Development Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Strategy & Planning",
              "Design & UX",
              "Development & Testing",
              "Launch & Optimization",
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-xl bg-zinc-900 border border-white/10"
              >
                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-black flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <h4 className="text-white font-bold mt-6">{step}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-10 lg:py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Code2 className="mx-auto text-blue-500 mb-4" size={42} />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build a <span className="text-blue-500">Website</span>  That <span className="text-blue-500">Works</span>?
          </h2>
          <p className="text-zinc-400 mb-8">
            Let’s create a fast, scalable, and conversion-driven website that
            supports your business goals — today and in the future.
          </p>

          <a
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition"
          >
            Book a Free Consultation <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
