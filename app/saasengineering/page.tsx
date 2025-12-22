"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Cloud,
  Workflow,
} from "lucide-react";
import img from "@/public/software.png"
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function SaaSEngineeringPage() {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>SaaS Engineering Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="Scalable SaaS engineering services by ElevenX Solutions. We design, build, and scale secure, high-performance SaaS platforms."
        />
        <meta
          name="keywords"
          content="SaaS Engineering, SaaS Development Company, SaaS Product Development, Cloud SaaS Solutions"
        />
      </Head>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-blue-600/20 blur-[160px]" />

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
              SaaS Engineering <br />
              <span className="text-blue-500">Built to Scale</span>
            </h1>

            <p className="text-zinc-400 max-w-xl">
              We engineer SaaS platforms that scale effortlessly — from MVP to
              enterprise. Secure, cloud-native, performance-optimized, and
              future-ready.
            </p>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Build Your SaaS <ArrowRight size={16} />
            </Link>
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
              alt="SaaS Engineering Dashboard"
              width={600}
              height={500}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE ENGINEER */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            What We Engineer
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers />,
                title: "SaaS MVP Development",
                desc: "Launch fast with a production-ready MVP designed for validation and scale.",
              },
              {
                icon: <Cloud />,
                title: "Cloud-Native Architecture",
                desc: "Built on AWS, Vercel, or custom cloud stacks for reliability and performance.",
              },
              {
                icon: <Workflow />,
                title: "Multi-Tenant Systems",
                desc: "Secure and scalable multi-tenant SaaS architectures from day one.",
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

      {/* ENGINEERING PROCESS */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            Our SaaS Engineering Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Product Discovery",
              "Architecture & Planning",
              "Development & QA",
              "Scaling & Optimization",
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

      {/* TRUST / QUALITY */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="mx-auto text-blue-500 mb-4" size={42} />
          <h2 className="text-3xl font-bold text-white mb-4">
            Secure. Scalable. Production-Ready.
          </h2>
          <p className="text-zinc-400">
            From authentication to billing-ready architecture, we build SaaS
            platforms that are secure, compliant, and engineered for long-term
            growth.
          </p>
        </div>
      </section>
    </>
  );
}
