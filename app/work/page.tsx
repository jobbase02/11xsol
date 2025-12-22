"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Layers, Search, BarChart3, Gauge, Sparkles } from "lucide-react";
import CountUp from "@/components/CountUp";

type Project = {
  id: number;
  title: string;
  category: string;
  industry: string;
  year: number;
  description: string;
  problem: string;
  solution: string;
  results: string;
  image: string;
  stack: string[];
  metrics: { impact: string; performance: string; revenue: string };
  perf: { lcp: number; fcp: number; ttfb: number };
  links: { live?: string; github?: string; demo?: string };
  color: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FinTech Command Center",
    category: "SaaS",
    industry: "FinTech",
    year: 2025,
    description: "Real-time trading suite processing 50k+ socket events per second with sub-80ms latency across regions.",
    problem: "Legacy desktop terminals could not handle burst traffic or deliver insights to remote teams.",
    solution: "Built an edge-distributed Next.js app with WebSocket multiplexing, Supabase row-level security, and real-time risk dashboards.",
    results: "NPS +18, latency down 62%, ops dashboards adopted by 9 global desks in week 1.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80",
    stack: ["Next.js", "Supabase", "Recharts", "WebSockets", "Vercel Edge"],
    metrics: {
      impact: "+18 NPS",
      performance: "62% faster",
      revenue: "+11% LTV",
    },
    perf: { lcp: 1100, fcp: 600, ttfb: 110 },
    links: {
      live: "https://example.com/fintech",
      github: "https://github.com/jobbase02/fintech",
    },
    color: "from-blue-600 to-cyan-400",
    featured: true,
  },
  {
    id: 2,
    title: "Luxe Estate 3D",
    category: "Web Development",
    industry: "Real Estate",
    year: 2024,
    description: "Headless real estate platform with 3D virtual tours and AI-assisted lead scoring.",
    problem: "Brokers relied on slow page builders and static tours that killed engagement.",
    solution: "Delivered a Next.js + Three.js experience with streaming tours, dynamic CMS blocks, and AI scoring for hot leads.",
    results: "+34% session time, +21% tour-to-call conversions, editors ship pages 4x faster.",
    image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80",
    stack: ["React", "Three.js", "GSAP", "Stripe", "Sanity"],
    metrics: {
      impact: "+21% CVR",
      performance: "Sub-second LCP",
      revenue: "+12% ARR",
    },
    perf: { lcp: 900, fcp: 520, ttfb: 140 },
    links: {
      live: "https://example.com/luxe",
      github: "https://github.com/jobbase02/luxe",
    },
    color: "from-purple-600 to-pink-400",
  },
  {
    id: 3,
    title: "Nebula AI Studio",
    category: "AI Integration",
    industry: "Marketing",
    year: 2025,
    description: "Generative AI cockpit for campaign teams to create copy, assets, and variants in one flow.",
    problem: "Fragmented tools and manual QA slowed down campaign velocity.",
    solution: "Unified prompt templates, brand guardrails, and async review queues with Supabase row policies.",
    results: "Campaign throughput +2.4x, revisions down 41%, brand compliance automated.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
    stack: ["OpenAI", "Next.js", "Postgres", "Redis", "Drizzle"],
    metrics: {
      impact: "2.4x velocity",
      performance: "<120ms prompts",
      revenue: "+9% MRR",
    },
    perf: { lcp: 1200, fcp: 700, ttfb: 130 },
    links: {
      live: "https://example.com/nebula",
      github: "https://github.com/jobbase02/nebula",
    },
    color: "from-emerald-600 to-green-400",
  },
  {
    id: 4,
    title: "Orbit Commerce",
    category: "E-Commerce",
    industry: "Retail",
    year: 2024,
    description: "Headless Shopify storefront with ISR, edge caching, and conversion-focused PDP experiments.",
    problem: "Legacy theme blocked testing velocity and added 3.2s of blocking JS.",
    solution: "Rebuilt with Next.js app router, edge image optimization, and experiment toggles via feature flags.",
    results: "+28% add-to-cart, +15% AOV, checkout drop-off down 12%.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80",
    stack: ["Shopify", "Next.js", "Vercel", "Segment", "LaunchDarkly"],
    metrics: {
      impact: "+28% ATC",
      performance: "1.2s faster",
      revenue: "+15% AOV",
    },
    perf: { lcp: 1250, fcp: 780, ttfb: 150 },
    links: {
      live: "https://example.com/orbit",
      github: "https://github.com/jobbase02/orbit",
    },
    color: "from-orange-600 to-red-400",
  },
  {
    id: 5,
    title: "Helix Ops Portal",
    category: "Platform",
    industry: "DevTools",
    year: 2025,
    description: "Unified ops portal aggregating logs, incidents, and SLAs across multi-cloud fleets.",
    problem: "SREs context-switched between dashboards and lacked single pane of glass for incidents.",
    solution: "Streaming ingest pipeline with server actions, role-based access, and AI summaries for incidents.",
    results: "MTTR down 33%, incident review time cut by 45%.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    stack: ["Next.js", "Supabase", "Tailwind", "OpenAI", "Kafka"],
    metrics: {
      impact: "-33% MTTR",
      performance: "<1s queries",
      revenue: "99.9% SLA",
    },
    perf: { lcp: 980, fcp: 420, ttfb: 95 },
    links: {
      live: "https://example.com/helix",
      github: "https://github.com/jobbase02/helix",
    },
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 6,
    title: "Aurora Learning",
    category: "Web Development",
    industry: "EdTech",
    year: 2023,
    description: "Adaptive learning portal with AI tutors, live classrooms, and gamified progress.",
    problem: "Low engagement on mobile and laggy classrooms throttled growth.",
    solution: "Built low-latency classrooms, offline-ready PWA, and smart recommendations via embeddings.",
    results: "DAU +52%, lesson completion up 31%, churn down 8%.",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80",
    stack: ["Next.js", "Supabase", "WebRTC", "Tailwind", "Redis"],
    metrics: {
      impact: "+31% completion",
      performance: "P95 <180ms",
      revenue: "-8% churn",
    },
    perf: { lcp: 1150, fcp: 640, ttfb: 160 },
    links: {
      live: "https://example.com/aurora",
      github: "https://github.com/jobbase02/aurora",
    },
    color: "from-indigo-600 to-blue-400",
  },
];

const CATEGORIES = ["All", "SaaS", "Platform", "Web Development", "AI Integration", "E-Commerce"];

const DASHBOARD = [
  { label: "Projects Delivered", value: 140, suffix: "+", desc: "Across 9 verticals" },
  { label: "Avg Conversion Lift", value: 21, suffix: "%", desc: "Median across launches" },
  { label: "Deployment Cadence", value: 42, suffix: "/mo", desc: "Mean per client" },
  { label: "Uptime Commitment", value: 99.9, suffix: "%", desc: "SLA for prod apps" },
];

const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]"></div>
      <div className="absolute inset-0 bg-black mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
  </div>
);

const formatPerf = (ms: number) => {
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${ms}ms`;
};

const PerformanceGrid = ({ perf }: { perf: { lcp: number; fcp: number; ttfb: number } }) => {
  const values = [perf.lcp, perf.fcp, perf.ttfb];
  const max = Math.max(...values);
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { key: "LCP", val: perf.lcp, desc: "Largest Contentful Paint" },
        { key: "FCP", val: perf.fcp, desc: "First Contentful Paint" },
        { key: "TTFB", val: perf.ttfb, desc: "Time To First Byte" },
      ].map((m) => {
        // smaller is better -> longer bar
        const width = Math.min(100, Math.max(22, (max / m.val) * 80));
        return (
          <div key={m.key} className="p-3 rounded-xl border border-white/8 bg-white/3">
            <div className="flex items-baseline justify-between">
              <div className="text-xs text-zinc-400">{m.key}</div>
              <div className="text-sm font-semibold text-white">{formatPerf(m.val)}</div>
            </div>
            <div className="mt-3 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-2 bg-linear-to-r from-green-400 to-blue-500 rounded-full" style={{ width: `${width}%` }} />
            </div>
            <div className="text-xs text-zinc-500 mt-2">{m.desc}</div>
          </div>
        );
      })}
    </div>
  );
};

const StatCard = ({ label, value, suffix, desc }: { label: string; value: number; suffix?: string; desc: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-2"
  >
    <div className="text-sm text-zinc-400">{label}</div>
    <div className="text-3xl font-bold text-white flex items-baseline gap-1">
      <CountUp from={0} to={value} duration={1} separator="," />
      {suffix ? <span className="text-zinc-400 text-lg">{suffix}</span> : null}
    </div>
    <div className="text-xs text-zinc-500">{desc}</div>
  </motion.div>
);

const MetricPill = ({ label }: { label: string }) => (
  <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5">
    {label}
  </span>
);

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesTerm = [p.title, p.description, p.industry, p.stack.join(" ")].some((field) =>
        field.toLowerCase().includes(term)
      );
      return matchesCategory && matchesTerm;
    });
  }, [activeCategory, searchTerm]);

  const featuredProject = filteredProjects.length
    ? filteredProjects.find((p) => p.featured) || filteredProjects[0]
    : null;
  const gridProjects = filteredProjects.length && featuredProject
    ? filteredProjects.filter((p) => p.id !== featuredProject.id)
    : [];

  const spanPattern = ["md:col-span-2 md:row-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2", "md:col-span-1", "md:col-span-1"];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <TechGridBackground />

      {/* HERO */}
      <section className="relative z-10 pt-28 pb-12 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
            <Layers size={12} className="text-blue-500" />
            Selected Case Studies
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-almarena tracking-tighter mb-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Work</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Engineering-first builds with measurable lifts. Explore how we ship, scale, and optimize digital revenue engines.
          </p>
        </motion.div>

        {/* STAT DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {DASHBOARD.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} suffix={item.suffix} desc={item.desc} />
          ))}
        </div>
      </section>

      {/* FEATURED PROJECT */}
      {featuredProject ? (
        <section className="relative z-10 px-6 pb-16 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-sm min-h-[360px]"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${featuredProject.color} opacity-30`}></div>
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
              <div className="absolute bottom-0 w-full p-8 flex flex-col gap-4 z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white">
                    Featured
                  </span>
                  <span className="text-xs text-zinc-400">{featuredProject.industry} • {featuredProject.year}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-almarena text-white">{featuredProject.title}</h2>
                <p className="text-zinc-300 md:text-lg leading-relaxed max-w-2xl">{featuredProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  <MetricPill label={featuredProject.metrics.impact} />
                  <MetricPill label={featuredProject.metrics.performance} />
                  <MetricPill label={featuredProject.metrics.revenue} />
                </div>
                
                <div className="mt-4">
                  <PerformanceGrid perf={featuredProject.perf} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-zinc-300 leading-relaxed text-lg">{featuredProject.problem}</p>
              <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-mono uppercase tracking-[0.2em]">
                  <Sparkles size={14} /> Solution Snapshot
                </div>
                <p className="text-zinc-200 leading-relaxed">{featuredProject.solution}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredProject.stack.map((tech) => (
                    <MetricPill key={tech} label={tech} />
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm space-y-2">
                <div className="flex items-center gap-2 text-blue-300 text-sm font-semibold">
                  <BarChart3 size={16} /> Outcome
                </div>
                <p className="text-zinc-200 leading-relaxed">{featuredProject.results}</p>
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* FILTERS + SEARCH */}
      <section className="relative z-10 px-6 pb-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    : "bg-zinc-900/50 border-white/10 text-zinc-500 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-72 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, industry, or stack"
              className="w-full rounded-full bg-zinc-900/70 border border-white/10 text-sm px-10 py-2 text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none"
            />
          </div>
        </motion.div>
      </section>

      {/* BENTO GRID */}
      <section className="relative z-10 px-6 pb-20 max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[320px] gap-6"
        >
          <AnimatePresence mode="popLayout">
            {gridProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-sm hover:border-white/30 transition-colors cursor-pointer ${spanPattern[idx % spanPattern.length]}`}
              >
                <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0`}></div>
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-40 opacity-60"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-2">
                      <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white">
                        {project.category}
                      </span>
                      <div className="text-xs text-zinc-400">{project.industry} • {project.year}</div>
                    </div>
                    
                  </div>

                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold font-almarena text-white mb-3">{project.title}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-4 max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <MetricPill label={project.metrics.impact} />
                      <MetricPill label={project.metrics.performance} />
                      <MetricPill label={project.metrics.revenue} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {gridProjects.length === 0 ? (
          <div className="text-center text-zinc-500 mt-12">No projects match that filter. Try another term.</div>
        ) : null}
      </section>

      {/* MODAL DETAIL VIEW */}
      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950 p-6"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-2">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white">
                      {selectedProject.category}
                    </span>
                    <span>{selectedProject.industry}</span>
                    <span>• {selectedProject.year}</span>
                  </div>
                  <h3 className="text-3xl font-bold font-almarena text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-zinc-300 leading-relaxed mb-4">{selectedProject.description}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-zinc-400 hover:text-white text-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Impact</div>
                  <div className="text-white font-semibold">{selectedProject.metrics.impact}</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Performance</div>
                  <div className="text-white font-semibold">{selectedProject.metrics.performance}</div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-xs text-zinc-500 mb-1">Revenue/Outcome</div>
                  <div className="text-white font-semibold">{selectedProject.metrics.revenue}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                    <Gauge size={16} /> Problem
                  </div>
                  <p className="text-zinc-200 leading-relaxed">{selectedProject.problem}</p>
                </div>
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-300">
                    <Sparkles size={16} /> Solution
                  </div>
                  <p className="text-zinc-200 leading-relaxed">{selectedProject.solution}</p>
                </div>
              </div>

              <div className="mt-6 p-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                  <BarChart3 size={16} /> Results
                </div>
                <p className="text-zinc-100 leading-relaxed">{selectedProject.results}</p>
              </div>

              <div className="mt-6">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Stack & Delivery</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.stack.map((tech) => (
                    <MetricPill key={tech} label={tech} />
                  ))}
                </div>

                
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* CTA SECTION */}
      <section className="py-24 border-t border-white/10 bg-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-almarena text-white mb-6">Have a similar project?</h2>
          <Link
            href="/book?utm_source=work_page"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all"
          >
            Start Building <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}