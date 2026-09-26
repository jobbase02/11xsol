"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PenTool,
  Users,
  Zap,
  Layers,
  Workflow,
  ShieldCheck,
  Layout,
} from "lucide-react";
import img from "@/public/ui-ux.webp";

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

export default function UIUXDesignPage() {
  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>UI/UX Design Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="User-centric UI/UX design services. We design digital experiences that are intuitive, engaging, and conversion-focused."
        />
        <meta
          name="keywords"
          content="UI/UX Design Services, Product Design, Web Design, UX Research, Mobile App Design"
        />
      </Head>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen bg-white flex items-center overflow-hidden">
        {/* Animated Orbs */}
        <motion.div {...float} className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-purple-600/10 blur-[170px]" />
        <motion.div {...float} className="absolute bottom-[-220px] right-[-220px] w-[520px] h-[520px] bg-blue-600/10 blur-[180px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10 mt-35 lg:mt-0">
          {/* TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 text-center md:text-left"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight"
            >
              UI/UX Design <br />
              <span className="text-purple-500 relative">
                That Users Love
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 hidden lg:block" />
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-zinc-600 max-w-xl mx-auto md:mx-0 text-lg">
              Great design is not just how it looks — it’s how it works. We create
              intuitive, frictionless, and conversion-driven digital experiences
              that turn casual visitors into loyal customers.
            </motion.p>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-bold rounded-full hover:bg-zinc-800 transition shadow-md"
            >
              Design Your Product <ArrowRight size={16} />
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
              alt="UI UX Design Dashboard"
              className="rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-zinc-200"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHY UI/UX ================= */}
      <section className="relative py-20 bg-zinc-50 overflow-hidden border-t border-zinc-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.06),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.06),transparent_45%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 leading-tight">
              Why UI/UX Design <br />
              <span className="text-zinc-600">
                Decides <span className="text-purple-500">Product Success</span>
              </span>
            </h2>
            <p className="mt-6 text-zinc-600 text-lg">
              Great design removes friction. Bad design kills adoption.
            </p>
          </motion.div>

          <div className="space-y-14">
            {[
              {
                tag: "FIRST IMPRESSION",
                title: "Users judge in seconds",
                desc: "A clean, intuitive interface instantly builds trust and credibility.",
              },
              {
                tag: "USABILITY",
                title: "Ease of use beats features",
                desc: "If users struggle, they leave — no matter how powerful the product is.",
              },
              {
                tag: "CONVERSION",
                title: "Design guides decisions",
                desc: "Good UX naturally leads users toward the right actions.",
              },
              {
                tag: "RETENTION",
                title: "Experiences bring users back",
                desc: "Products with great UX create habits, not confusion.",
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
                <div className="text-sm font-bold text-purple-500 tracking-widest">
                  {item.tag}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-900 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed max-w-3xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-10 lg:py-20 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold text-purple-500 mb-12"
          >
            What We Design
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool />,
                title: "UI Design",
                desc: "Clean, modern interfaces aligned with your brand.",
              },
              {
                icon: <Users />,
                title: "UX Research",
                desc: "User flows, personas, and behavior analysis.",
              },
              {
                icon: <Layout />,
                title: "Wireframes & Prototypes",
                desc: "Clickable prototypes to validate ideas early.",
              },
              {
                icon: <Layers />,
                title: "Design Systems",
                desc: "Scalable systems for consistency and speed.",
              },
              {
                icon: <Workflow />,
                title: "Product Flows",
                desc: "Smooth onboarding and journey mapping.",
              },
              {
                icon: <ShieldCheck />,
                title: "Accessibility & Usability",
                desc: "Inclusive design that works for everyone.",
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
                className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200 hover:border-purple-500/40 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.2)] transition"
              >
                <div className="text-purple-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  {item.title}
                </h3>
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
            Our UI/UX Design Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Research & Discovery",
                desc: "Understanding users, goals, and business context.",
              },
              {
                title: "Wireframing & UX",
                desc: "Structuring flows and interactions.",
              },
              {
                title: "UI Design & Prototyping",
                desc: "Visual design with interactive prototypes.",
              },
              {
                title: "Testing & Handoff",
                desc: "Usability testing and dev-ready handoff.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-xl bg-white border border-zinc-200 shadow-sm"
              >
                <span className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-md">
                  {i + 1}
                </span>
                <h4 className="text-zinc-900 font-bold mt-6 mb-2">
                  {step.title}
                </h4>
                <p className="text-zinc-600 text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-10 lg:py-24 bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Zap className="mx-auto text-purple-500 mb-4" size={42} />
          </motion.div>

          <h2 className="text-3xl font-bold text-zinc-900 mb-4">
            Ready to Design a <span className="text-purple-500">Product Users Love</span>?
          </h2>
          <p className="text-zinc-600 mb-8">
            Let’s design experiences that feel effortless and convert naturally.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 transition shadow-lg shadow-purple-500/25"
          >
            Book a Free Design Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
