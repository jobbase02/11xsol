"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Zap,
  MessageSquare,
  Brain,
  ShieldCheck,
  Workflow,
  BarChart3,
} from "lucide-react";
import img from "@/public/ai-chatbox-3.jpg"; // replace with your image

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

export default function AIChatbotPage() {
  return (
    <>
      {/* ================= SEO ================= */}
      <Head>
        <title>AI Chatbot Development Services | ElevenX Solutions</title>
        <meta
          name="description"
          content="AI-powered chatbot development services for websites, apps, and businesses. Automate support, increase conversions, and engage customers 24/7."
        />
        <meta
          name="keywords"
          content="AI Chatbot Development, Website Chatbot, AI Customer Support, Chatbot for Business, AI Automation"
        />
      </Head>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen bg-zinc-950 flex items-center overflow-hidden">
        {/* Animated Orbs */}
        <motion.div {...float} className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 blur-[160px]" />
        <motion.div {...float} className="absolute bottom-[-200px] right-[-200px] w-[520px] h-[520px] bg-purple-600/20 blur-[180px]" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative z-10 mt-32 lg:mt-0">
          {/* TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 text-center md:text-left"
          >
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white leading-tight">
              AI Chatbots <br />
              <span className="text-blue-500 relative">
                That Talk, Convert & Scale
                <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 hidden lg:block" />
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-zinc-400 max-w-xl mx-auto md:mx-0 text-lg">
              AI chatbots are not just support tools — they are sales assistants,
              lead qualifiers, and customer engagement engines. We build smart,
              secure, and human-like AI chatbots that work 24/7 to grow your
              business.
            </motion.p>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition"
            >
              Build Your AI Chatbot <ArrowRight size={16} />
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
              alt="AI Chatbot Dashboard"
              className="rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= WHY AI CHATBOTS ================= */}
      <section className="relative py-20 bg-black overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_45%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Why AI Chatbots <br />
              <span className="text-zinc-400">
                Are the <span className="text-blue-500">Future of Business</span>
              </span>
            </h2>

            <p className="mt-6 text-zinc-500 text-lg">
              Customers expect instant replies. AI chatbots make sure you never
              miss a conversation, lead, or sale.
            </p>
          </motion.div>

          <div className="space-y-14">
            {[
              {
                tag: "24/7 AVAILABILITY",
                title: "Never miss a customer again",
                desc: "AI chatbots respond instantly, even while you sleep. Your business stays active around the clock."
              },
              {
                tag: "SMART CONVERSATIONS",
                title: "Human-like replies powered by AI",
                desc: "We build chatbots trained on your business data to answer accurately, naturally, and intelligently."
              },
              {
                tag: "LEAD & SALES FOCUS",
                title: "From chats to conversions",
                desc: "AI chatbots qualify leads, book appointments, and guide users toward buying decisions."
              },
              {
                tag: "AUTOMATION AT SCALE",
                title: "Reduce support costs, increase efficiency",
                desc: "Handle thousands of conversations simultaneously without increasing your support team."
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
      <section className="py-10 lg:py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold text-blue-500 mb-12"
          >
            What Our AI Chatbots Deliver?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Bot />, title: "Custom AI Chatbots", desc: "Built specifically for your business use case." },
              { icon: <MessageSquare />, title: "Website & App Integration", desc: "Seamless integration with your website or product." },
              { icon: <Brain />, title: "AI & NLP Powered", desc: "Understands intent, context, and real questions." },
              { icon: <Workflow />, title: "Automated Workflows", desc: "Bookings, lead capture, FAQs, and support automation." },
              { icon: <BarChart3 />, title: "Analytics & Insights", desc: "Track conversations, leads, and performance." },
              { icon: <ShieldCheck />, title: "Secure & Reliable", desc: "Privacy-first, scalable, and production-ready." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-2xl bg-zinc-900/60 backdrop-blur border border-white/10 hover:border-blue-500/40 transition"
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
            Our AI Chatbot Development Process
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Requirement & Use-Case Analysis",
              "AI Training & Flow Design",
              "Development & Integration",
              "Testing, Launch & Optimization",
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
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity }}>
            <Zap className="mx-auto text-blue-500 mb-4" size={42} />
          </motion.div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Launch Your <span className="text-blue-500">AI Chatbot</span>?
          </h2>
          <p className="text-zinc-400 mb-8">
            Automate conversations, increase conversions, and deliver instant
            support with a powerful AI chatbot.
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
