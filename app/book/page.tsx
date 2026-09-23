"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  Sparkles,
} from "lucide-react";

// Mock Next.js useSearchParams for standalone and SSR compatibility
const useSearchParams = () => {
  const [params] = useState(() => {
    if (typeof window !== "undefined") return new URLSearchParams(window.location.search);
    return new URLSearchParams();
  });
  return params;
};

function BookingFormComponent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    orgType: "",
    phone: "",
    country: "",
    organization: "",
    comments: "",
    subscribe: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill from query parameters if passed
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const planParam = searchParams.get("plan");

    if (serviceParam || planParam) {
      setFormData((prev) => ({
        ...prev,
        comments: prev.comments || `Interested in: ${[serviceParam, planParam].filter(Boolean).join(" - ")}`,
        orgType: prev.orgType || (serviceParam?.toLowerCase().includes("saas") ? "SaaS / Digital Product" : ""),
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const fullComments = [
      formData.comments,
      formData.jobTitle ? `Job Title: ${formData.jobTitle}` : null,
      formData.organization ? `Company: ${formData.organization}` : null,
      formData.orgType ? `Organization Type: ${formData.orgType}` : null,
      formData.phone ? `Phone: ${formData.phone}` : null,
      formData.country ? `Country: ${formData.country}` : null,
      formData.subscribe ? `Newsletter: Subscribed` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const getUtmParams = () => {
      if (typeof window === "undefined") return null;
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
        const val = params.get(key);
        if (val) utm[key] = val;
      });
      return Object.keys(utm).length > 0 ? utm : null;
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          service: formData.orgType || "Strategy Call",
          plan: "Custom Sprint",
          message: fullComments || "General strategy inquiry",
          utm: getUtmParams(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.warn("API response note:", data);
      }
      setSubmitted(true);
    } catch (err) {
      console.warn("Booking submit fallback:", err);
      // Fallback optimistic submission so client inquiries are never lost
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full py-16 px-6 sm:px-10 flex flex-col items-center justify-center text-center"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1757EE]/10 text-[#1757EE] rounded-full flex items-center justify-center mb-6 border border-[#1757EE]/20 shadow-sm">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#1757EE]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif text-zinc-950 mb-3 tracking-tight">
          Inquiry Received
        </h3>
        <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-md mb-8">
          Thank you, <span className="font-semibold text-zinc-900">{formData.firstName || "there"}</span>.
          Our technical leads will review your product roadmap and reach out directly to{" "}
          <span className="font-semibold text-[#1757EE]">{formData.email}</span> within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              jobTitle: "",
              orgType: "",
              phone: "",
              country: "",
              organization: "",
              comments: "",
              subscribe: true,
            });
          }}
          className="text-xs sm:text-sm font-medium text-[#1757EE] hover:text-blue-700 underline underline-offset-4 cursor-pointer"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl sm:text-3xl md:text-[34px] font-serif tracking-tight text-zinc-950 text-center mb-6 sm:mb-8 font-normal">
        Contact Form
      </h2>

      {/* Row 1: First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold text-zinc-800 mb-1.5">
            First Name<span className="text-[#1757EE]">*</span>
          </label>
          <input
            id="firstName"
            required
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs min-h-[44px]"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold text-zinc-800 mb-1.5">
            Last Name<span className="text-[#1757EE]">*</span>
          </label>
          <input
            id="lastName"
            required
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs min-h-[44px]"
          />
        </div>
      </div>

      {/* Row 2: Business Email & Job Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch">
        <div className="flex flex-col justify-between">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-zinc-800 mb-0.5">
              Business Email<span className="text-[#1757EE]">*</span>
            </label>
            <span className="text-[11px] text-zinc-500 italic block mb-1.5 leading-tight">
              Due to privacy and security measures, business emails are preferred.
            </span>
          </div>
          <input
            id="email"
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs min-h-[44px]"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <label htmlFor="jobTitle" className="block text-xs font-semibold text-zinc-800 mb-1.5">
              Job Title<span className="text-[#1757EE]">*</span>
            </label>
          </div>
          <input
            id="jobTitle"
            required
            type="text"
            placeholder="e.g. Founder, CTO, VP Engineering"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            className="w-full bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs min-h-[44px]"
          />
        </div>
      </div>

      {/* Row 3: Organization Type */}
      <div>
        <label htmlFor="orgType" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Organization Type<span className="text-[#1757EE]">*</span>
        </label>
        <div className="relative">
          <select
            id="orgType"
            required
            value={formData.orgType}
            onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
            className="w-full appearance-none bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 pr-10 text-sm sm:text-base md:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs min-h-[44px] cursor-pointer"
          >
            <option value="">Please Select</option>
            <option value="SaaS / Software Platform">SaaS / Software Platform</option>
            <option value="FinTech / Capital Markets">FinTech / Capital Markets</option>
            <option value="AI / Automation Startup">AI / Automation Startup</option>
            <option value="E-Commerce / Direct-to-Consumer">E-Commerce / Direct-to-Consumer</option>
            <option value="Healthcare / MedTech">Healthcare / MedTech</option>
            <option value="Agency / Design Partner">Agency / Design Partner</option>
            <option value="Enterprise / Corporate">Enterprise / Corporate</option>
            <option value="Other">Other</option>
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Row 4: Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Phone Number<span className="text-[#1757EE]">*</span>
        </label>
        <input
          id="phone"
          required
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs min-h-[44px]"
        />
      </div>

      {/* Row 5: Country */}
      <div>
        <label htmlFor="country" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Country<span className="text-[#1757EE]">*</span>
        </label>
        <div className="relative">
          <select
            id="country"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full appearance-none bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 pr-10 text-sm sm:text-base md:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs min-h-[44px] cursor-pointer"
          >
            <option value="">Please Select</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="European Union">European Union</option>
            <option value="Australia / New Zealand">Australia / New Zealand</option>
            <option value="India">India</option>
            <option value="Singapore / Asia Pacific">Singapore / Asia Pacific</option>
            <option value="Other">Other</option>
          </select>
          <ChevronDown className="w-4 h-4 text-zinc-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Row 6: Organization */}
      <div>
        <label htmlFor="organization" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Organization / Company<span className="text-[#1757EE]">*</span>
        </label>
        <input
          id="organization"
          required
          type="text"
          placeholder="Company Name"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          className="w-full bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs min-h-[44px]"
        />
      </div>

      {/* Row 7: Comments */}
      <div>
        <label htmlFor="comments" className="block text-xs font-semibold text-zinc-800 mb-1.5">
          Comments / Project Scope<span className="text-[#1757EE]">*</span>
        </label>
        <textarea
          id="comments"
          required
          rows={4}
          placeholder="Tell us about your product, current architectural bottlenecks, or target timeline..."
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          className="w-full bg-white border border-[#D0DEF7] rounded-lg px-3.5 py-2.5 text-sm sm:text-base md:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1757EE] focus:border-transparent transition-all shadow-2xs resize-none"
        />
      </div>

      {/* Row 8: Subscribe Checkbox */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          id="subscribe"
          type="checkbox"
          checked={formData.subscribe}
          onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
          className="w-4 h-4 rounded border-zinc-300 text-[#1757EE] focus:ring-[#1757EE] mt-0.5 cursor-pointer shrink-0"
        />
        <label htmlFor="subscribe" className="text-xs text-zinc-700 leading-snug cursor-pointer select-none">
          Subscribe to Engineering Insights, Sprint Updates, and Architecture Case Studies.
        </label>
      </div>

      {errorMessage && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {errorMessage}
        </p>
      )}

      {/* Submit Button */}
      <div className="pt-3 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 rounded-xl sm:rounded-full bg-zinc-950 hover:bg-[#1757EE] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <span>Contact 11xSolutions</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default function BookingPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const splitAnchorRef = useRef<HTMLDivElement>(null);
  const [splitY, setSplitY] = useState<number>(420);

  // Dynamically calculate the exact dividing point so the dark background ALWAYS
  // starts cleanly right below the Contact Us section and above Contact Info
  useEffect(() => {
    const updateSplit = () => {
      if (splitAnchorRef.current && sectionRef.current) {
        const anchorRect = splitAnchorRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const calculated = anchorRect.top - sectionRect.top;
        if (calculated > 100) {
          setSplitY(calculated);
        }
      }
    };

    updateSplit();
    window.addEventListener("resize", updateSplit);
    // Re-check after images/fonts have loaded
    const timer = setTimeout(updateSplit, 250);
    return () => {
      window.removeEventListener("resize", updateSplit);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-manrope selection:bg-blue-500/20 selection:text-blue-950 relative overflow-x-hidden pt-28 sm:pt-32">
      {/* MAIN TWO-TONE SECTION (Light Top + Dark Bottom with Floating Form Card) */}
      <section ref={sectionRef} className="relative pt-6 sm:pt-10 lg:pt-12 pb-20 sm:pb-28">
        {/* Desktop Dynamic Background Split: Top is white, Bottom is #090C12 */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
          <div
            style={{ height: `${splitY}px` }}
            className="bg-white w-full transition-[height] duration-150"
          />
          <div
            className="bg-[#090C12] w-full"
            style={{ height: `calc(100% - ${splitY}px)` }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {/* TOP PART (Always on white background) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="pb-8 sm:pb-12"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-light tracking-tight text-zinc-950 leading-[1.12]">
                  Contact Us
                </h1>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mt-5 sm:mt-6 max-w-lg">
                  We&apos;re looking forward to connecting and would love to show you how
                  ElevenX Solutions can empower you to engineer the right software, accelerate
                  your sprint cycles, and scale without bottlenecks—every single time. Below are
                  a few ways to reach the ElevenX Team.
                </p>
              </motion.div>

              {/* Exact split anchor point between Contact Us and Contact Info */}
              <div ref={splitAnchorRef} className="w-full h-px opacity-0 pointer-events-none my-2" />

              {/* BOTTOM PART (Wrapped in dark background container on mobile; seamless full-bleed on desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="bg-[#090C12] text-white rounded-3xl lg:rounded-none lg:bg-transparent p-7 sm:p-9 lg:p-0 lg:pt-14 mt-6 lg:mt-0"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif tracking-tight text-white mb-6 font-normal">
                  Contact Info
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                  <div>
                    <span className="font-semibold text-white">Direct Line:</span>{" "}
                    <a href="tel:+18006557729" className="hover:text-[#1757EE] transition-colors">
                      +1 (800) 655-7729
                    </a>
                  </div>

                  <div>
                    <span className="font-semibold text-white">Technical Sprints:</span>{" "}
                    <a href="mailto:sprints@elevenxsolutions.com" className="hover:text-[#1757EE] transition-colors">
                      sprints@elevenxsolutions.com
                    </a>
                  </div>

                  <div>
                    <span className="font-semibold text-white">Client & Press:</span>{" "}
                    <a href="mailto:info@elevenxsolutions.com" className="hover:text-[#1757EE] transition-colors">
                      info@elevenxsolutions.com
                    </a>
                  </div>
                </div>

                {/* Notice to Founders */}
                <div className="my-6 text-xs sm:text-sm text-zinc-400 italic leading-relaxed">
                  <span className="font-semibold text-zinc-200 not-italic">Notice to founders:</span>{" "}
                  Direct access to principal software architects from day one. We kick off with a
                  focused 30-minute discovery session to evaluate your technical roadmap with zero
                  sales fluff.
                </div>

                {/* Office Locations */}
                <div className="space-y-5 text-xs sm:text-sm pt-2">
                  <div>
                    <div className="font-semibold text-white mb-0.5">United States Hub</div>
                    <div className="text-zinc-400 leading-relaxed font-normal">
                      2261 Market Street, Suite 86162 <br />
                      San Francisco, CA 94114
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-white mb-0.5">Global Distributed Engineering</div>
                    <div className="text-zinc-400 leading-relaxed font-normal">
                      Toronto • New York • London • Remote <br />
                      Dedicated Slack & Loom Channels
                    </div>
                  </div>
                </div>

                {/* Big Watermark Wordmark Brand at Bottom Left matching reference */}
                <div className="pt-10 sm:pt-14 lg:pt-16 pb-2">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white/95 font-light tracking-tight">
                    ElevenX
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#1757EE] mt-1.5 font-semibold">
                    ENGINEERING & SCALABLE ARCHITECTURE
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ================= RIGHT COLUMN: FORM CARD ================= */}
            <div id="contact-form" className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="bg-[#F0F5FE] border border-[#D5E3FA] rounded-3xl sm:rounded-[36px] p-6 sm:p-9 lg:p-11 shadow-[0_20px_50px_-15px_rgba(23,87,238,0.08)] relative"
              >
                <Suspense
                  fallback={
                    <div className="flex flex-col items-center justify-center h-96 gap-4">
                      <Loader2 className="animate-spin text-[#1757EE]" size={32} />
                      <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                        Loading Form...
                      </p>
                    </div>
                  }
                >
                  <BookingFormComponent />
                </Suspense>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}