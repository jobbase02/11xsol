"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import {
  ArrowRight,
  Plug,
  Database,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import img from "@/public/api-integration.jpg"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function APIIntegrationPage() {
  return (
    <>
      {/* SEO */}
      <Head>
        <title>API Integration Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="Secure, scalable API integration services by ElevenX Solutions. We connect apps, platforms, and services with reliable, high-performance APIs."
        />
        <meta
          name="keywords"
          content="API Integration Services, REST API Integration, Third Party API Integration, Backend Integration, API Development Company"
        />
      </Head>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-40 left-[-20%] w-[520px] h-[520px] bg-blue-600/20 blur-[160px]" />

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
              API Integration <br />
              <span className="text-blue-500">That Just Works</span>
            </h1>

            <p className="text-zinc-400 max-w-xl">
              We integrate APIs that are fast, secure, and reliable — connecting
              your products, platforms, and services without breaking your
              system or slowing it down.
            </p>

            <a
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Integrate Your Systems <ArrowRight size={16} />
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
              alt="API Integration Architecture"
              width={600}
              height={500}
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE INTEGRATE */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
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

      {/* TRUST / RELIABILITY */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="mx-auto text-blue-500 mb-4" size={42} />
          <h2 className="text-3xl font-bold text-white mb-4">
            Secure, Reliable, Production-Ready Integrations
          </h2>
          <p className="text-zinc-400">
            We follow best practices for authentication, rate limiting,
            validation, and error handling — so your integrations stay stable
            under real-world load.
          </p>
        </div>
      </section>
    </>
  );
}
