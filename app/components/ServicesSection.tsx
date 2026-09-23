"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Workflow,
  Layout,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  isHighlight?: boolean;
}

const services: ServiceItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Sub-second Next.js architecture, robust API infrastructure, and scalable full-stack engineering.",
    icon: Code2,
    link: "/WebDevelopment",
  },
  {
    id: "saas-engineering",
    title: "SaaS Engineering",
    description:
      "Intelligence, context, and enterprise cloud reliability at the core of every product release.",
    icon: Sparkles,
    link: "/saasengineering",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Conversion-led interface systems, accessible design tokens, and fluid micro-interactions.",
    icon: Layout,
    link: "/ui-ux-design",
  },
  {
    id: "seo-optimization",
    title: "SEO & Growth",
    description:
      "Technical Core Web Vitals audits, programmatic SEO, and organic pipeline acceleration.",
    icon: TrendingUp,
    link: "/seo-optimization",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Automate complex workflows, deploy intelligent agents, and eliminate operational bottlenecks at scale.",
    icon: Workflow,
    link: "/ai-chatbox",
    isHighlight: true,
  },

];

export default function ServicesSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 lg:py-28 overflow-hidden text-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {/* Header Block in Slot 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col justify-between p-3 sm:p-5 lg:p-6 min-h-[220px] sm:min-h-[260px]"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-normal tracking-tight text-zinc-900 leading-[1.2]">
                Built on rock-solid foundations
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 mt-3 sm:mt-4 leading-relaxed font-normal max-w-sm">
                The foundations of fast, reliable and consistent digital product engineering.
              </p>
            </div>

            <div className="pt-6 sm:pt-8">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#1757EE] hover:text-blue-700 transition-colors"
              >
                <span>Discover our services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Service Cards (Slots 2-6) */}
          {services.map((item, index) => {
            const Icon = item.icon;
            const isHighlight = item.isHighlight;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: (index + 1) * 0.08,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={item.link}
                  className={`group block h-full rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 transition-all duration-300 flex flex-col justify-between min-h-[220px] sm:min-h-[260px] ${isHighlight
                      ? "bg-[#1757EE] text-white hover:bg-[#1248c7] shadow-lg shadow-blue-500/15 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1"
                      : "bg-[#F7F5EE] border border-black/[0.04] text-zinc-900 hover:bg-[#F2EFE7] hover:shadow-md hover:-translate-y-1"
                    }`}
                >
                  {/* Top: Icon Badge */}
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${isHighlight
                          ? "bg-white text-[#1757EE] shadow-xs"
                          : "bg-white text-[#1757EE] shadow-xs border border-black/[0.05]"
                        }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Bottom: Title & Description */}
                  <div className="mt-8 sm:mt-12">
                    <h3
                      className={`text-lg sm:text-xl font-semibold tracking-tight mb-2 ${isHighlight ? "text-white" : "text-zinc-900"
                        }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${isHighlight ? "text-blue-50/90" : "text-zinc-600"
                        }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
