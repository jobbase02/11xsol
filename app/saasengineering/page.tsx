"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Cloud,
  Workflow,
  Zap,
  Users,
  BarChart3,
} from "lucide-react";
import img from "@/public/saas.jpg";

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

export default function SaaSPage() {
  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>SaaS Development Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="We design, build, and scale secure, high-performance SaaS products — from MVP to enterprise-grade platforms."
        />
      </Head>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen bg-zinc-950 flex items-center overflow-hidden">
        <motion.div {...float} className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-blue-600/20 blur-[170px]" />
        <motion.div {...float} className="absolute bottom-[-220px] right-[-220px] w-[520px] h-[520px] bg-purple-600/20 blur-[180px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10 mt-10 lg:mt-0">
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
              SaaS Development <br />
              <span className="text-blue-500 relative">
                Built to Scale
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block" />
              </span>
            </motion.h1>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Build Your SaaS <ArrowRight size={16} />
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
              alt="SaaS Product Dashboard"
              className="rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHY SAAS ================= */}
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
              Why SaaS Wins in the <span className="text-blue-500">Long Run</span>
            </h2>
            <p className="mt-6 text-zinc-500 text-lg">
              SaaS compounds when architecture, product strategy, and execution align.
            </p>
          </motion.div>

          <div className="space-y-14">
            {[
              {
                tag: "RECURRING REVENUE",
                title: "Predictable income beats one-time sales",
                desc: "Subscription-based models generate consistent cash flow and long-term customer value.",
              },
              {
                tag: "SCALABILITY",
                title: "One platform, unlimited growth",
                desc: "We design SaaS systems that scale users and data without performance trade-offs.",
              },
              {
                tag: "AUTOMATION",
                title: "Your product should run the business",
                desc: "Automated workflows reduce costs and increase operational efficiency.",
              },
              {
                tag: "COMPOUND VALUE",
                title: "Products that grow stronger over time",
                desc: "SaaS products gain value as features, data, and adoption increase.",
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
            What We Build for SaaS
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers />,
                title: "MVP → Enterprise SaaS",
                desc: "Launch lean, validate fast, then scale into a full SaaS ecosystem.",
              },
              {
                icon: <Cloud />,
                title: "Cloud-Native Architecture",
                desc: "Built for performance, uptime, and global scalability.",
              },
              {
                icon: <Users />,
                title: "Multi-Tenant Systems",
                desc: "Secure tenant isolation with role-based access control.",
              },
              {
                icon: <BarChart3 />,
                title: "Analytics & Insights",
                desc: "Track growth, engagement, and revenue metrics in real time.",
              },
              {
                icon: <Workflow />,
                title: "Automations & Integrations",
                desc: "Reduce manual work with system-driven workflows.",
              },
              {
                icon: <ShieldCheck />,
                title: "Security & Compliance",
                desc: "Authentication, authorization, and best practices built-in.",
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

      {/* ================= SAAS PROCESS ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-white mb-12"
          >
            Our SaaS Development Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Discovery & Validation",
                desc: "We refine your idea, validate assumptions, and define a scalable SaaS roadmap.",
              },
              {
                title: "Architecture & UX Design",
                desc: "Multi-tenant architecture, data models, and user-centric experience design.",
              },
              {
                title: "Development & QA",
                desc: "Secure, scalable development with rigorous testing at every stage.",
              },
              {
                title: "Launch, Scale & Optimize",
                desc: "Deployment, monitoring, performance tuning, and continuous improvements.",
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
            Ready to Build a <span className="text-blue-500">SaaS</span> That Scales?
          </h2>
          <p className="text-zinc-400 mb-8">
            Let’s engineer a SaaS product that grows with your users and your vision.
          </p>

          <a
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition"
          >
            Book a Free Strategy Call <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
