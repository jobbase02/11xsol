"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Plug,
  Database,
  ShieldCheck,
  Workflow,
} from "lucide-react";

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
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

export default function ClientContent() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
        {/* Animated Orbs */}
        <motion.div {...float} className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-blue-600/10 blur-[160px]" />
        <motion.div {...float} className="absolute bottom-[-200px] right-[-200px] w-[520px] h-[520px] bg-purple-600/10 blur-[180px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10 mt-15 lg:mt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 text-left md:text-left"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight"
            >
              API Integration <br />
              <span className="text-blue-500 relative">
                That Just Works
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block" />
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-zinc-600 max-w-xl mx-auto md:mx-0 text-lg">
              We integrate APIs that are fast, secure, and reliable — connecting
              your products, platforms, and services without breaking your
              system or slowing it down.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold rounded-full hover:bg-zinc-800 transition shadow-md"
              >
                Integrate Your Systems <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <Image
              src="/api-integration.webp"
              alt="API Integration Architecture"
              width={600}
              height={500}
              className="rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-zinc-200"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHAT WE INTEGRATE ================= */}
      <section className="py-10 lg:py-20 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-blue-500 mb-12"
          >
            What We Integrate
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Plug />,
                title: "Third-Party APIs",
                desc: "Payment gateways, CRMs, analytics tools, maps, messaging, and more.",
              },
              {
                icon: <Database />,
                title: "Internal Systems",
                desc: "Connect microservices, databases, dashboards, and internal tools seamlessly.",
              },
              {
                icon: <Workflow />,
                title: "Workflow Automation",
                desc: "Automate data flow between apps to eliminate manual work and errors.",
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
                className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200 hover:border-blue-500/40 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.2)] transition"
              >
                <div className="text-blue-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{item.title}</h3>
                <p className="text-zinc-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-10 lg:py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12"
          >
            Our API Integration Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Requirement Analysis",
              "API Mapping & Security",
              "Integration & Testing",
              "Monitoring & Scaling",
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-xl bg-white border border-zinc-200 shadow-sm"
              >
                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                  {i + 1}
                </span>
                <h4 className="text-zinc-900 font-bold mt-6">{step}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST / RELIABILITY & CTA ================= */}
      <section className="py-10 lg:py-24 bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity }}>
            <ShieldCheck className="mx-auto text-blue-500 mb-4" size={42} />
          </motion.div>
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">
            Secure, Reliable, Production-Ready Integrations
          </h2>
          <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">
            We follow best practices for authentication, rate limiting,
            validation, and error handling — so your integrations stay stable
            under real-world load.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition shadow-lg shadow-blue-500/25"
          >
            Book a Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
