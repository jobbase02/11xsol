"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  BarChart3,
  Globe,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import img from "@/public/seo.jpg"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function SEOOptimizationPage() {
  return (
    <>
      {/* SEO META */}
      <Head>
        <title>SEO Optimization Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="Result-driven SEO optimization services by ElevenX Solutions. We improve rankings, traffic, Core Web Vitals, and conversions — not vanity metrics."
        />
        <meta
          name="keywords"
          content="SEO Optimization Services, Technical SEO, On Page SEO, SEO Agency India, Website SEO Optimization"
        />
      </Head>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-40 right-[-20%] w-[520px] h-[520px] bg-blue-600/20 blur-[160px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10">
          {/* Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              SEO Optimization <br />
              <span className="text-blue-500">Engineered for Rankings</span>
            </h1>

            <p className="text-zinc-400 max-w-xl">
              We don’t chase keywords — we engineer SEO foundations that drive
              consistent traffic, higher rankings, and real business growth.
            </p>

            <a
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Optimize Your Website <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <Image
              src={img}
              alt="SEO Optimization Analytics Dashboard"
              width={600}
              height={500}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE OPTIMIZE */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            What We Optimize
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search />,
                title: "On-Page SEO",
                desc: "Keyword mapping, content optimization, metadata, internal linking, and structure.",
              },
              {
                icon: <Gauge />,
                title: "Technical SEO",
                desc: "Core Web Vitals, page speed, indexing, crawlability, and performance fixes.",
              },
              {
                icon: <Globe />,
                title: "Search Visibility",
                desc: "Clean site architecture and semantic SEO for long-term ranking stability.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-blue-500/40 transition"
              >
                <div className="text-blue-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
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
              "SEO Audit & Research",
              "Technical Fixes",
              "Content & On-Page Optimization",
              "Tracking & Continuous Growth",
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-zinc-900 border border-white/10"
              >
                <span className="text-blue-500 font-mono text-sm">
                  0{i + 1}
                </span>
                <h4 className="text-white font-bold mt-2">{step}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / RESULTS */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BarChart3 className="mx-auto text-blue-500 mb-4" size={42} />
          <h2 className="text-3xl font-bold text-white mb-4">
            SEO That Delivers Measurable Growth
          </h2>
          <p className="text-zinc-400">
            We track rankings, traffic, conversions, and performance — focusing
            on metrics that actually impact your revenue.
          </p>
        </div>
      </section>
    </>
  );
}
