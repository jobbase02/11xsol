"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Rocket, ShieldCheck, Zap } from "lucide-react";
import webdeb from "@/public/web-team.png"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function WebDevelopmentPage() {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>Web Development Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="High-performance, scalable web development services by ElevenX Solutions. We engineer fast, secure, SEO-optimized websites and web apps."
        />
        <meta
          name="keywords"
          content="Web Development Company, Custom Web Development, SaaS Development, Website Development India"
        />
      </Head>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-600/20 blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="mt-10 text-4xl md:text-6xl font-bold text-white leading-tight">
              Web Development <br />
              <span className="text-blue-500">Engineered to Perform</span>
            </h1>

            <p className="text-zinc-400 max-w-xl">
              We build fast, scalable, SEO-optimized websites and web
              applications — engineered for growth, conversions, and long-term
              performance.
            </p>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Start Your Project <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <Image
              src={webdeb}
              alt="Custom Web Development"
              width={600}
              height={500}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            What We Build
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 />,
                title: "Custom Websites",
                desc: "Pixel-perfect, lightning-fast websites built from scratch. No templates. No shortcuts.",
              },
              {
                icon: <Rocket />,
                title: "SaaS Platforms",
                desc: "Scalable SaaS applications designed for growth, performance, and reliability.",
              },
              {
                icon: <Zap />,
                title: "High-Converting Landing Pages",
                desc: "Optimized for speed, SEO, and conversions — engineered to sell.",
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
            Our Engineering Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Strategy & Planning",
              "UI/UX Architecture",
              "Development & Testing",
              "Launch & Optimization",
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

      {/* TRUST */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="mx-auto text-blue-500 mb-4" size={40} />
          <h2 className="text-3xl font-bold text-white mb-4">
            Built for Speed. Secured by Design.
          </h2>
          <p className="text-zinc-400">
            Every website we build is optimized for performance, accessibility,
            SEO, and security — from day one.
          </p>
        </div>
      </section>
    </>
  );
}

