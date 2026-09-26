"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-manrope selection:bg-blue-500/20 selection:text-blue-950 relative overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Header & Wide Collaborative Team Photo */}
      {/* ========================================================================= */}
      <section className="pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14"
        >
          {/* Left Title matching reference */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1757EE] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Who We Are</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif tracking-tight text-zinc-950 leading-[1.14]">
              We Build <br className="hidden sm:inline" />
              <span className="text-[#1757EE] font-normal italic">
                What You Need.
              </span>
            </h1>
          </div>

          {/* Right Subtitle & Action Links */}
          <div className="lg:max-w-md flex flex-col items-start lg:items-start gap-5">
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              We Build and scale software that works better, delivered through
              agile engineering sprints to solve the core bottlenecks that slows
              down your business.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-lg bg-[#1757EE] text-white text-xs sm:text-sm font-medium hover:bg-blue-700 transition-all duration-200 active:scale-95 shadow-sm focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/#case-studies"
                className="inline-flex items-center gap-1.5 px-4 py-3 min-h-[44px] text-zinc-800 text-xs sm:text-sm font-medium hover:text-[#1757EE] transition-colors focus-visible:ring-2 focus-visible:ring-[#1757EE] focus-visible:outline-none"
              >
                <span>See our case studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* High-Angle Collaborative Team Photo (Matching reference photo) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-100 shadow-sm"
        >
          <Image
            src="/Team.webp"
            alt="ElevenX Engineering Team Collaboration"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MISSION & MANIFESTO CALLOUT (with 4-Stat Bento Bar) */}
      {/* ========================================================================= */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-zinc-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16 relative overflow-hidden shadow-xl"
        >
          {/* Headline Statement */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-serif tracking-tight text-white leading-[1.25] mb-8 sm:mb-12 max-w-4xl">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[80px] text-[#1757EE]">11x</span>{" "} was built for the complex, disconnected reality of modern
            digital systems & for the founders doing their best to scale them.
          </h2>

          {/* 2-Column Story / Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 text-zinc-300 text-sm sm:text-base leading-relaxed font-normal mb-10 sm:mb-14 border-t border-zinc-800/80 pt-8 sm:pt-10">
            <p>
              Founded in 2024, ElevenX Solutions started with a clear
              conviction: ambitious companies shouldn&apos;t be held back by fragile
              codebases, slow agencies or template bloat. We saw how traditional
              software development burns runway and slows down market execution.
            </p>
            <p>
              Today, we operate as a dedicated engineering partner for
              fast-moving startups and scaling teams worldwide. We engineer
              fast and reliable full-stack web applications, custom SaaS platforms &
              automated workflow pipelines designed to scale any business seamlessly.
            </p>
          </div>

          {/* Bottom Stat Bar: 4 Boxes matching reference layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Box 1 (Brand Blue Highlight) */}
            <div className="bg-[#1757EE] text-white p-5 sm:p-6 rounded-xl flex flex-col justify-between min-h-[120px] shadow-sm">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight">
                Founded in 2024
              </span>
              <span className="text-xs sm:text-sm text-blue-100 font-mono mt-3">
                Bangalore & Remote Worldwide
              </span>
            </div>

            {/* Box 2 */}
            <div className="bg-zinc-900 border border-zinc-800/80 text-white p-5 sm:p-6 rounded-xl flex flex-col justify-between min-h-[120px]">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-zinc-100">
                Sub-100ms
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-mono mt-3">
                Full-Stack Edge Latency
              </span>
            </div>

            {/* Box 3 */}
            <div className="bg-zinc-900 border border-zinc-800/80 text-white p-5 sm:p-6 rounded-xl flex flex-col justify-between min-h-[120px]">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-zinc-100">
                100% Agile Sprints
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-mono mt-3">
                Weekly Production Deploys
              </span>
            </div>

            {/* Box 4 */}
            <div className="bg-zinc-900 border border-zinc-800/80 text-white p-5 sm:p-6 rounded-xl flex flex-col justify-between min-h-[120px]">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-zinc-100">
                Scale Worldwide
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-mono mt-3">
                Clients Across 4 Continents
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LEADERSHIP / TEAM SECTION (Asymmetric 2-Column with 2x2 Portraits) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
          {/* Left Column: Headline & Subtitle */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-zinc-950 mb-4 sm:mb-6">
              Leadership
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Our team of engineers, product designers & systems architects work alongside you to turn your roadmap into scalable reality with zero compromise on speed or quality.
            </p>
          </div>

          {/* Right Column: 2x2 Grid of Team Members */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Member 1 */}
            <div className="group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 shadow-2xs mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80"
                  alt="Deepak Singh"
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight">
                Deepak Singh
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                Founder & Frontend / AI Automation Expert
              </p>
            </div>

            {/* Member 2 */}
            <div className="group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 shadow-2xs mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                  alt="Lokesh Mewari"
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight">
                Lokesh Mewari
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                Founder & Backend / Automation Expert
              </p>
            </div>

            {/* Member 3 */}
            <div className="group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 shadow-2xs mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80"
                  alt="Bhavesh Tilara"
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight">
                Bhavesh Tilara
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                Frontend Developer & UI/UX Designer
              </p>
            </div>

            {/* Member 4 */}
            <div className="group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 shadow-2xs mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80"
                  alt="Elena Rostova"
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight">
                David Kim
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-0.5">
                Frontend & Motion Lead
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PROBLEMS WE SOLVE (2x2 Card Grid with Real UI Previews) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80">
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-zinc-950">
            Problems we solve
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal mt-2 max-w-xl">
            We target and eliminate the critical product and engineering
            bottlenecks that throttle your growing business.
          </p>
        </div>

        {/* 2x2 Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {/* Solution 1 */}
          <div className="border border-zinc-200/90 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all group">
            <div className="relative aspect-[16/10] w-full bg-zinc-100 overflow-hidden">
              <Image
                src="/dashboard-design-example-hcare.webp"
                alt="SaaS Analytics & Data Architecture"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6 border-t border-zinc-100">
              <h3 className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight shrink-0 sm:w-1/2">
                Slow & Fragile Web Architecture
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal sm:w-1/2">
                Eliminating latency bottlenecks with sub-100ms Next.js Edge
                caching and robust full-stack engineering.
              </p>
            </div>
          </div>

          {/* Solution 2 */}
          <div className="border border-zinc-200/90 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all group">
            <div className="relative aspect-[16/10] w-full bg-zinc-100 overflow-hidden">
              <Image
                src="/saas.webp"
                alt="SaaS Engineering & Workflows"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6 border-t border-zinc-100">
              <h3 className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight shrink-0 sm:w-1/2">
                Manual Operational Bottlenecks
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal sm:w-1/2">
                Replacing fragile spreadsheets with custom automated portals,
                secure role permissions, and synced pipelines.
              </p>
            </div>
          </div>

          {/* Solution 3 */}
          <div className="border border-zinc-200/90 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all group">
            <div className="relative aspect-[16/10] w-full bg-zinc-100 overflow-hidden">
              <Image
                src="/Design.webp"
                alt="UI/UX Design Systems"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6 border-t border-zinc-100">
              <h3 className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight shrink-0 sm:w-1/2">
                High Drop-Off & Confusing UX
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal sm:w-1/2">
                Transforming convoluted product journeys into intuitive,
                high-retention user experiences with zero friction.
              </p>
            </div>
          </div>

          {/* Solution 4 */}
          <div className="border border-zinc-200/90 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all group">
            <div className="relative aspect-[16/10] w-full bg-zinc-100 overflow-hidden">
              <Image
                src="/software.webp"
                alt="Backend Scalability & Cloud Infrastructure"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6 border-t border-zinc-100">
              <h3 className="font-semibold text-zinc-950 text-base sm:text-lg tracking-tight shrink-0 sm:w-1/2">
                Unscalable Backend Infrastructure
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal sm:w-1/2">
                Hardening Supabase, PostgreSQL, and serverless API pipelines to
                effortlessly support 100,000+ active users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. STRATEGY CALL CTA BANNER (Matching reference bottom callout) */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-gradient-to-r from-blue-600 via-[#1757EE] to-blue-700 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 shadow-xl shadow-blue-500/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-200 font-semibold mb-2 block">
              Book a Strategy Call
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white leading-tight max-w-xl">
              We don&apos;t just understand digital bottlenecks &rarr; we build solutions
              for them.
            </h2>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-medium text-sm transition-all duration-200 active:scale-95 shadow-md shrink-0 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <span>Partner With Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}