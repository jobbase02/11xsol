"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Code2,
  Rocket,
  Settings,
  Layout,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Smartphone,
  Globe,
  Database,
  Zap,
  Shield,
  BarChart,
} from "lucide-react";
import GlareHover from "@/components/GlareHover";
import CountUp from "@/components/CountUp";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleOnHover = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0px 10px 30px -10px rgba(59, 130, 246, 0.3)", // Blue glow
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 overflow-hidden bg-black selection:bg-blue-600/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[5000ms]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8 relative"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/30 border border-blue-500/30 text-blue-400 text-sm font-semibold backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Accepting New Clients for 2025
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-6xl font-bold font-almarena text-white leading-[1.1] tracking-tight"
          >
            Want Growth? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-gradient-x">
              Welcome
            </span>{" "}
            To <br />
            The Right Place.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed"
          >
            11XSolutions transforms ambitious ideas into scalable,
            high-performance web applications. Zero fluff, 100% engineering
            excellence.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center gap-5 lg:gap-7 font-almarena"
          >
            <motion.a
              href="#contact"
              className="px-8 py-4 w-3/4 md:w-fit bg-white text-black font-bold text-lg rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              animate={{ scale: [1, 1.2, 1] }} // heartbeat effect
              transition={{
                duration: 1, // 1 second per beat
                repeat: Infinity, // infinite looping
                ease: "easeInOut",
              }}
            >
              Start Project <ArrowRight size={20} />
            </motion.a>

              {/* Glare animation */}
              <div className=" px-8 py-4 w-3/4 md:w-fit bg-zinc-900 border-zinc-800 overflow-hidden rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all  ">
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
            >
              <a
                href="#portfolio"
                className=" text-white font-medium text-lg flex items-center justify-center"
              >
                View Work
              </a>
            </GlareHover>
              </div>

            {/* <a
              href="#portfolio"
              className="px-8 py-4 w-3/4 md:w-fit bg-zinc-900 border border-zinc-800 text-white font-medium text-lg rounded-xl hover:bg-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-center"
            >
              View Work
            </a> */}
          </motion.div>

          {/* Stats */}

          {/* <motion.div variants={fadeInUp} className="pt-8 grid grid-cols-3 gap-8 border-t border-white/5">
            {[
              { label: 'Revenue Generated', val: '$50M+' },
              { label: 'Projects Shipped', val: '100+' },
              { label: 'Client Retention', val: '98%' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.val}</div>
                <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-wide font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div> */}

          <motion.div
            variants={fadeInUp}
            className="pt-8 flex justify-around items-center gap-8 border-t border-white/5"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                $
                <CountUp
                  from={0}
                  to={50}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                M+
              </div>
              <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-wide font-medium">
                Revenue Generated
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                <CountUp
                  from={0}
                  to={100}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                +
              </div>
              <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-wide font-medium">
                Projects Shipped
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                <CountUp
                  from={0}
                  to={98}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                %
              </div>
              <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-wide font-medium">
                Client Retention
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D/Tech Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[700px] flex items-center justify-center lg:justify-end mb-5 lg:mb-0"
        >
          <div className="relative w-full max-w-lg aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[3rem] rotate-3 blur-2xl opacity-20"></div>

            {/* Main Card */}
            <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  server-main.tsx
                </div>
              </div>

              {/* Code Content */}
              <div className="flex-1 p-6 md:p-8 font-mono text-sm md:text-base space-y-4 overflow-hidden relative">
                {/* Matrix rain effect simplified */}
                <div className="absolute top-0 right-10 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>

                <div className="flex gap-3">
                  <span className="text-zinc-600">01</span>
                  <span className="text-purple-400">interface</span>{" "}
                  <span className="text-yellow-100">Performance</span> {"{"}
                </div>
                <div className="flex gap-3">
                  <span className="text-zinc-600">02</span>
                  <span className="pl-4 text-blue-400">speed:</span>{" "}
                  <span className="text-green-400">'Lightning'</span>;
                </div>
                <div className="flex gap-3">
                  <span className="text-zinc-600">03</span>
                  <span className="pl-4 text-blue-400">security:</span>{" "}
                  <span className="text-green-400">'FortKnox'</span>;
                </div>
                <div className="flex gap-3">
                  <span className="text-zinc-600">04</span>
                  <span className="pl-4 text-blue-400">scale:</span>{" "}
                  <span className="text-green-400">'Infinite'</span>;
                </div>
                <div className="flex gap-3">
                  <span className="text-zinc-600">05</span>
                  <span>{"}"}</span>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="text-blue-300 text-xs uppercase mb-2">
                    Deploy Status
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-bold">
                      Production Ready
                    </span>
                  </div>
                  <div className="mt-3 h-1 w-full bg-blue-900/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -right-4 top-20 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 shadow-xl"
            >
              <Zap className="text-yellow-400 w-8 h-8" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -left-8 bottom-32 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart className="text-white w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-zinc-400">Growth</div>
                <div className="text-white font-bold">+114%</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Layout className="text-white" size={28} />,
      title: "Web Applications",
      desc: "Complex SaaS platforms built with Next.js 14 and React. We handle the hard stuff: SSR, caching, and state management.",
      color: "bg-blue-600",
    },
    {
      icon: <Globe className="text-white" size={28} />,
      title: "Booking Systems",
      desc: "Custom booking engines that sync seamlessly with your calendar and payment gateways like Stripe.",
      color: "bg-indigo-600",
    },
    {
      icon: <Shield className="text-white" size={28} />,
      title: "Enterprise Security",
      desc: "Bank-grade security implementation, role-based access control (RBAC), and data encryption.",
      color: "bg-purple-600",
    },
    {
      icon: <Database className="text-white" size={28} />,
      title: "API Development",
      desc: "Scalable REST and GraphQL APIs that serve as the backbone for your mobile and web ecosystem.",
      color: "bg-teal-600",
    },
  ];

  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 font-almarena">
            Expertise That Matters
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Tell us how you work. We’ll build the system that works for you.{" "}
            <br />
            Built to grow, Built to win.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={scaleOnHover}
              initial="initial"
              whileHover="hover"
              className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 ${service.color} opacity-10 rounded-bl-full blur-2xl group-hover:opacity-20 transition-opacity`}
              ></div>

              <div
                className={`mb-6 p-4 ${service.color} w-fit rounded-2xl shadow-lg`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {service.desc}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-white transition-colors"
              >
                Learn more <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "CryptoDash",
      category: "FinTech",
      image:
        "https://www.admin-dashboards.com/content/images/2022/03/cryptodash-free-template-transactions-min.jpg",
      tech: ["Next.js", "Web3.js"],
    },
    {
      title: "Vessel",
      category: "Logistics",
      image:
        "https://themeslay.com/wp-content/uploads/2025/09/Lorita-Cruise-Ship-Yacht-Bootstrap-HTML-Template.jpg",
      tech: ["React", "Mapbox"],
    },
    {
      title: "LuxeStay",
      category: "Real Estate",
      image:
        "https://www.siddhiinfosoft.com/blog/wp-content/uploads/2024/10/luxestay-the-ultimate-hotel-booking_banner2.png",
      tech: ["Supabase", "Stripe"],
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-10 lg:py-16 bg-zinc-950 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Selected Work
            </h2>
            <p className="text-zinc-400 max-w-xl">
              We let our code speak for itself. Here are a few projects we've
              recently deployed.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all font-medium"
          >
            View All Projects
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 relative">
                <div className="absolute inset-0 bg-black-600/60 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-xs text-white font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs text-zinc-500 border border-zinc-800 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Investment Packages
          </h2>
          <p className="text-zinc-400">
            Clear pricing for every stage of your business growth.
          </p>
        </motion.div>

        {/* 3 Columns Layout on Desktop, Stacks on Mobile */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
          >
            <h3 className="text-lg font-bold text-zinc-300 mb-2">MVP Launch</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">₹5,000</span>
              <span className="text-sm text-zinc-500">starting</span>
            </div>
            <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">
              Get your idea to market quickly with a high-performance landing
              page or basic app.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "React/Next.js Landing Page",
                "Mobile Responsive",
                "SEO Basic Setup",
                "Contact Forms",
                "1 Month Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-zinc-300 text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-blue-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white hover:text-black transition-colors">
              Choose Starter
            </button>
          </motion.div>

          {/* Business Plan (Featured) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border-2 border-blue-600 bg-zinc-900 relative shadow-2xl shadow-blue-900/20 z-10 transform md:-translate-y-4"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Scale Up</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-white">₹8,000</span>
              <span className="text-sm text-zinc-500">starting</span>
            </div>
            <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">
              Full-featured web application with authentication, database, and
              dynamic content.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Everything in MVP",
                "User Authentication (Auth0/Supabase)",
                "Admin Dashboard",
                "Payment Integration",
                "Database Design",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-white text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25">
              Choose Business
            </button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
          >
            <h3 className="text-lg font-bold text-zinc-300 mb-2">Enterprise</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-white">₹14,000</span>
            </div>
            <p className="text-zinc-400 text-sm mb-8 min-h-[40px]">
              For established organizations requiring complex architecture and
              dedicated teams.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Dedicated Development Team",
                "Microservices Architecture",
                "Legacy System Migration",
                "SLA Support",
                "Advanced Security Audit",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-zinc-300 text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-blue-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white hover:text-black transition-colors">
              <a href="#contact">Contact Us</a>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InfiniteTestimonials = () => {
  const testimonials = [
    {
      text: "11XSolutions completely transformed our internal workflow. The dashboard they built saved us 20 hours a week.",
      name: "Sarah Jenkins",
      role: "CEO, TechFlow",
      img: "1",
    },
    {
      text: "The most professional dev team I've worked with. They understood our business logic better than we did.",
      name: "Michael Ross",
      role: "Founder, EstateBook",
      img: "2",
    },
    {
      text: "Blazing fast delivery. The app scaled to 10k users in the first week without a hitch.",
      name: "David Chen",
      role: "CTO, FinStart",
      img: "3",
    },
    {
      text: "Their design sense matches their engineering skills. A rare combination in this industry.",
      name: "Elena Rodriguez",
      role: "Product Lead, CreativeCo",
      img: "4",
    },
  ];

  // Duplicate for seamless loop
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="py-24 bg-zinc-950 overflow-hidden relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-white text-center">
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>

        <motion.div
          className="flex gap-4 sm:gap-6 md:gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 40, // can adjust later for mobile vs desktop
            repeat: Infinity,
          }}
        >
          {extendedTestimonials.map((item, i) => (
            <div
              key={i}
              className="w-[280px] sm:w-[320px] md:w-[400px] lg:w-[450px] bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-blue-500/30 transition-colors"
            >
              <div>
                <div className="flex gap-1 text-blue-500 mb-3 sm:mb-4">
                  ★★★★★
                </div>
                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  "{item.text}"
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-800 rounded-full overflow-hidden border border-white/10">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.img}&backgroundColor=transparent`}
                    alt={item.name}
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-base">
                    {item.name}
                  </div>
                  <div className="text-zinc-500 text-xs sm:text-sm">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    // <section className="py-24 bg-zinc-950 overflow-hidden relative border-y border-white/5">
    //   <div className="max-w-7xl mx-auto px-6 mb-12">
    //     <h2 className="text-3xl font-bold text-white text-center">
    //       Trusted by Industry Leaders
    //     </h2>
    //   </div>

    //   {/* Infinite Scroll Container */}
    //   <div className="relative w-full overflow-hidden">
    //     {/* Gradients to fade edges */}
    //     <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
    //     <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>

    //     <motion.div
    //       className="flex gap-6 w-max"
    //       animate={{ x: ["0%", "-50%"] }}
    //       transition={{
    //         ease: "linear",
    //         duration: 40,
    //         repeat: Infinity,
    //       }}
    //     >
    //       {extendedTestimonials.map((item, i) => (
    //         <div
    //           key={i}
    //           className="w-[350px] md:w-[450px] bg-zinc-900/50 p-8 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-blue-500/30 transition-colors"
    //         >
    //           <div>
    //             <div className="flex gap-1 text-blue-500 mb-4">★★★★★</div>
    //             <p className="text-zinc-300 text-lg leading-relaxed mb-6">
    //               "{item.text}"
    //             </p>
    //           </div>
    //           <div className="flex items-center gap-4">
    //             <div className="w-12 h-12 bg-zinc-800 rounded-full overflow-hidden border border-white/10">
    //               <img
    //                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.img}&backgroundColor=transparent`}
    //                 alt={item.name}
    //               />
    //             </div>
    //             <div>
    //               <div className="text-white font-bold">{item.name}</div>
    //               <div className="text-zinc-500 text-sm">{item.role}</div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </motion.div>
    //   </div>
    // </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-900/20 text-blue-400 text-sm font-semibold border border-blue-800/50">
              Contact Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something <br /> Legendry.
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-md">
              Ready to scale? We are currently accepting 2 new enterprise
              clients for Q1 2025.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 text-zinc-300 group">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">
                    Email Us
                  </p>
                  <p className="font-medium text-lg">hello@11xsolutions.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 text-zinc-300 group">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Smartphone size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">
                    Call Us
                  </p>
                  <p className="font-medium text-lg">+1 (555) 000-1111</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900/30 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
          >
            {formState === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 min-h-[400px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-zinc-400">
                  Our team will review your request and reply within 24 hours.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 text-blue-500 text-sm font-semibold hover:text-blue-400"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-700"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-700"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Service Interest
                  </label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                    <option>Custom Web Application</option>
                    <option>Mobile App Development</option>
                    <option>UI/UX Design</option>
                    <option>Consultation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Message
                  </label>
                  <textarea
                    required
                    rows="4"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-700 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <button
                  disabled={formState === "submitting"}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
                >
                  {formState === "submitting" ? "Sending..." : "Send Message"}
                  {!formState === "submitting" && <ArrowRight size={18} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xs">
            <a
              href="#"
              className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 mb-6"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-black font-bold">
                11X
              </div>
              Solutions
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Premium web development agency building the next generation of
              digital products.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
          <p>
            &copy; {new Date().getFullYear()} 11XSolutions Agency. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
const App = () => {
  return (
    <div className="bg-black w-screen overflow-x-hidden min-h-screen text-zinc-200 selection:bg-blue-600/30">
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <InfiniteTestimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
