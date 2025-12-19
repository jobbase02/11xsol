"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import {
  ArrowRight,
  Layout,
  PenTool,
  Layers,
  Users,
  Zap,
} from "lucide-react";
import img from "@/public/design.jpeg"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function UIUXDesignPage() {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>UI/UX Design Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="Premium UI/UX design services by ElevenX Solutions. We design intuitive, conversion-focused user experiences backed by research and strategy."
        />
        <meta
          name="keywords"
          content="UI UX Design Company, Product Design, UX Research, UI Design Services, App Design Agency"
        />
      </Head>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden">
        {/* Ambient Glow */}
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
              UI/UX Design <br />
              <span className="text-blue-500">That Users Love</span>
            </h1>

            <p className="text-zinc-400 max-w-xl">
              We design clean, intuitive, and conversion-driven interfaces.
              Every decision is backed by research, usability, and business
              goals — not guesswork.
            </p>

            <a
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Design Your Product <ArrowRight size={16} />
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
              alt="UI UX Design Dashboard"
              width={600}
              height={500}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DESIGN */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            What We Design
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layout />,
                title: "Web & App Interfaces",
                desc: "Modern, responsive UI designs optimized for clarity, usability, and performance.",
              },
              {
                icon: <Users />,
                title: "UX Research & Strategy",
                desc: "User flows, personas, and journeys crafted to reduce friction and increase engagement.",
              },
              {
                icon: <PenTool />,
                title: "Design Systems",
                desc: "Scalable UI systems that keep products consistent, fast, and future-ready.",
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

      {/* DESIGN PROCESS */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            Our UI/UX Design Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Research & Discovery",
              "Wireframes & UX Flows",
              "Visual UI Design",
              "Testing & Iteration",
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

      {/* VALUE SECTION */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Zap className="mx-auto text-blue-500 mb-4" size={42} />
          <h2 className="text-3xl font-bold text-white mb-4">
            Design That Converts, Not Just Looks Good
          </h2>
          <p className="text-zinc-400">
            Our UI/UX design balances aesthetics with usability — helping users
            move faster, convert better, and enjoy every interaction.
          </p>
        </div>
      </section>
    </>
  );
}
