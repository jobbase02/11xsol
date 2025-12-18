"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Database, 
  Layout, 
  Server, 
  ShoppingCart,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

// --- COMPONENTS ---

const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
  </div>
);

const ServiceSection = ({ title, desc, features, icon, align = "left" }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-32 ${align === "right" ? "lg:flex-row-reverse" : ""}`}
  >
    {/* Visual Side */}
    <div className="w-full lg:w-1/2">
        <div className="relative aspect-square md:aspect-[16/9] lg:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Abstract UI Representation */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl relative">
                   <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                      {icon}
                   </div>
                   <div className="space-y-4 opacity-50">
                      <div className="h-2 w-1/3 bg-zinc-700 rounded-full"></div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full"></div>
                      <div className="h-2 w-5/6 bg-zinc-800 rounded-full"></div>
                      <div className="h-32 w-full bg-zinc-800/50 rounded-lg border border-white/5 mt-6"></div>
                   </div>
                </div>
            </div>
        </div>
    </div>

    {/* Content Side */}
    <div className="w-full lg:w-1/2">
        <h3 className="text-3xl md:text-4xl font-bold font-almarena text-white mb-6">{title}</h3>
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            {desc}
        </p>
        <ul className="space-y-4">
            {features.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <CheckCircle2 className="text-blue-500 shrink-0 mt-1" size={18} />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
  </motion.div>
);

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      <TechGridBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
            <Server size={12} />
            System Capabilities
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-almarena text-white leading-[1.1] mb-6">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Digital Dominance.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We move beyond templates. We architect custom, high-performance digital ecosystems tailored to scale your revenue.
          </p>
        </motion.div>
      </section>

      {/* --- DETAILED SERVICES --- */}
      <section className="relative z-10 px-6 pb-20 max-w-7xl mx-auto">
        
        <ServiceSection 
            title="Custom Web Applications"
            desc="The core of your digital identity. We build lightning-fast, SEO-optimized web applications using modern architectures. No bloat, just performance."
            icon={<Layout size={24} />}
            align="left"
            features={[
                "Server-Side Rendering (SSR) for instant SEO ranking.",
                "High-performance animation & interactions.",
                "Responsive design for mobile, tablet, and desktop.",
                "Custom CMS Integration for easy content management."
            ]}
        />

        <ServiceSection 
            title="SaaS Product Engineering"
            desc="Turning ideas into subscription revenue. We handle the complex logic—authentication, payments, and database architecture—so you can focus on the business."
            icon={<Database size={24} />}
            align="right"
            features={[
                "Secure Enterprise-grade Authentication.",
                "Subscription Payments & Recurring Billing.",
                "Real-time Databases & Live Sync.",
                "Admin Dashboards & Data Visualization."
            ]}
        />

        <ServiceSection 
            title="Headless E-Commerce"
            desc="Break free from the limitations of standard themes. We build headless storefronts that load instantly and convert higher."
            icon={<ShoppingCart size={24} />}
            align="left"
            features={[
                "Seamless Integration with any Backend (Shopify/Custom).",
                "Global Edge Caching for sub-second loads.",
                "Custom Checkout Flows & Upsells.",
                "Inventory Management Systems."
            ]}
        />

      </section>

      {/* --- THE PROCESS --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            <div className="md:w-1/3">
                <h2 className="text-4xl font-bold font-almarena text-white mb-6 sticky top-32">
                    How We <br/> <span className="text-blue-500">Deploy.</span>
                </h2>
            </div>
            <div className="md:w-2/3 space-y-12">
                {[
                    { title: "01. Architecture", desc: "We don't start with design; we start with logic. We map out your database schema, API routes, and user flows before writing a line of code." },
                    { title: "02. Development", desc: "We work in agile sprints. You get deployment links regularly to see progress. We adapt the tech stack to fit your specific scaling needs." },
                    { title: "03. Optimization", desc: "Once features are built, we obsess over speed. We optimize images, fonts, and scripts to ensure you hit that 100/100 Lighthouse score." },
                    { title: "04. Handover", desc: "We don't hold your code hostage. You receive full repository access, documentation, and a training session on how to manage your content." }
                ].map((step, i) => (
                    <div key={i} className="group">
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                        <p className="text-zinc-400 leading-relaxed max-w-lg">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 border-t border-white/10 bg-black relative overflow-hidden text-center">
         <div className="relative z-10 max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold font-almarena text-white mb-8">Ready to upgrade your infrastructure?</h2>
            <Link href="/book?utm_source=services_page" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all">
                Book Engineering Call <ArrowRight size={20} />
            </Link>
         </div>
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-900/20 blur-[100px] pointer-events-none"></div>
      </section>

    </div>
  );
}