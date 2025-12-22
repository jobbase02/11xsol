"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Plug,
  Workflow,
  
} from "lucide-react";
import img from "@/public/api-integration.jpg";

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

export default function APIIntegrationPage() {
  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>API Integration Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="Secure, scalable API integration services. Connect platforms, automate workflows, and enable seamless data exchange."
        />
      </Head>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen bg-zinc-950 flex items-center overflow-hidden">
        <motion.div {...float} className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-blue-600/20 blur-[170px]" />
        <motion.div {...float} className="absolute bottom-[-220px] right-[-220px] w-[520px] h-[520px] bg-cyan-500/20 blur-[180px]" />

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
              API Integration <br />
              <span className="text-blue-500 relative">
                That Connects Everything
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 hidden lg:block" />
              </span>
            </motion.h1>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Integrate Your Systems <ArrowRight size={16} />
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
              alt="API Integration Architecture"
              className="rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHY API INTEGRATION ================= */}
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
              Why API Integration <br />
              <span className="text-blue-500">Drives Scalability</span>?
            </h2>
            <p className="mt-6 text-zinc-500 text-lg">
              APIs are the backbone of modern, scalable digital products.
            </p>
          </motion.div>

          <div className="space-y-14">
            {[
              {
                tag: "AUTOMATION",
                title: "Reduce manual work across systems",
                desc: "APIs allow platforms to communicate automatically, saving time and eliminating human error.",
              },
              {
                tag: "SCALABILITY",
                title: "Build systems that grow together",
                desc: "Integrated systems scale faster than isolated tools.",
              },
              {
                tag: "REAL-TIME DATA",
                title: "Decisions powered by live information",
                desc: "APIs enable instant data sync across products and services.",
              },
              {
                tag: "FLEXIBILITY",
                title: "Swap tools without rebuilding everything",
                desc: "Well-designed integrations make your stack adaptable.",
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
                <div className="text-sm font-bold text-blue-500 tracking-widest">
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
            className="text-3xl md:text-6xl font-bold text-blue-500 mb-12"
          >
            What We Integrate?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Plug />,
                title: "Third-Party APIs",
                desc: "Payments, CRMs, ERPs, analytics, and more.",
              },
              {
                icon: <Cloud />,
                title: "Cloud & SaaS Platforms",
                desc: "AWS, Firebase, Stripe, Shopify, and custom SaaS tools.",
              },
              {
                icon: <Database />,
                title: "Data Synchronization",
                desc: "Reliable real-time and batch data syncing.",
              },
              {
                icon: <Workflow />,
                title: "Workflow Automation",
                desc: "Trigger-based and event-driven integrations.",
              },
              {
                icon: <ShieldCheck />,
                title: "Secure Authentication",
                desc: "OAuth, JWT, API keys, and access control.",
              },
              {
                icon: <Code2 />,
                title: "Custom API Development",
                desc: "Designing APIs tailored to your product needs.",
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
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= API PROCESS ================= */}
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
              {
                title: "Requirement Analysis",
                desc: "Understanding systems, data flow, and integration goals.",
              },
              {
                title: "Architecture & Mapping",
                desc: "Designing secure and scalable integration architecture.",
              },
              {
                title: "Implementation & Testing",
                desc: "Building, testing, and validating integrations.",
              },
              {
                title: "Monitoring & Scaling",
                desc: "Ongoing support, optimization, and performance monitoring.",
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
                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-black flex items-center justify-center font-bold">
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
            <Zap className="mx-auto text-blue-500 mb-4" size={42} />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to <span className="text-blue-500">Connect</span> Your Systems?
          </h2>
          <p className="text-zinc-400 mb-8">
            Let’s build integrations that make your software work smarter — together.
          </p>

          <a
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition"
          >
            Book a Free Integration Call <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
