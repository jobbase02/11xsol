"use client";

import React, { useState, useEffect, Suspense } from "react";
// Removed next/navigation import to fix preview error
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  Sparkles,
  Cpu,
  Globe,
  ShoppingBag,
  Rocket,
  Zap,
  Building2,
  Check,
  Terminal
} from "lucide-react";

// --- STATIC DATA ---
const SERVICES = [
  { id: "seo", label: "SEO Optimization", icon: <Sparkles size={18} /> },
  { id: "web-dev", label: "Website Development", icon: <Globe size={18} /> },
  { id: "shopify", label: "Shopify Development", icon: <ShoppingBag size={18} /> },
  { id: "app-dev", label: "App Development", icon: <Cpu size={18} /> },
];

const PLANS = [
  { id: "basic", label: "Basic", icon: <Rocket size={18} />, desc: "For startups validating ideas." },
  { id: "business", label: "Business", icon: <Zap size={18} />, desc: "For growing businesses." },
  { id: "premium", label: "Premium", icon: <Building2 size={18} />, desc: "Full-scale custom solutions." },
];

// --- COMPONENTS ---

const TechGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    {/* Radial Fade */}
    <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black_100%)]"></div>
  </div>
);

// Mock Next.js useSearchParams for standalone React preview
const useSearchParams = () => {
  const [params, setParams] = useState(new URLSearchParams());
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setParams(new URLSearchParams(window.location.search));
    }
  }, []);
  
  return params;
};

// Form Component (Isolated for Suspense)
function BookingForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    plan: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaStatus, setCaptchaStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const planParam = searchParams.get("plan");

    setFormData(prev => {
      let newService = prev.service;
      let newPlan = prev.plan;

      if (serviceParam) {
        const matchedService = SERVICES.find(s => 
          s.id === serviceParam || s.label.toLowerCase().includes(serviceParam.toLowerCase())
        );
        if (matchedService) newService = matchedService.id;
      }

      if (planParam) {
        const matchedPlan = PLANS.find(p => 
          p.id === planParam || p.label.toLowerCase().includes(planParam.toLowerCase())
        );
        if (matchedPlan) newPlan = matchedPlan.id;
      }

      return { ...prev, service: newService, plan: newPlan };
    });
  }, [searchParams]);

  const handleCaptchaClick = () => {
    if (captchaStatus === 'verified') return;
    setCaptchaStatus('verifying');
    setTimeout(() => {
      setCaptchaStatus('verified');
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (captchaStatus !== 'verified') {
      alert("Please complete the security check.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const getUtmParams = () => {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
      keys.forEach(key => {
        const value = params.get(key);
        if (value) utm[key] = value;
      });
      return Object.keys(utm).length > 0 ? utm : null;
    };

    try {
      const payload = { ...formData, utm: getUtmParams() };
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit booking.');
      setSubmitted(true);
    } catch (error: any) {
      console.error("Booking Error:", error);
      setErrorMessage(error.message || "Connection failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-[600px] flex flex-col items-center justify-center text-center p-8"
      >
        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8 border border-green-500/20 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4 font-almarena">System Acknowledged</h3>
        <p className="text-zinc-400 mb-10 max-w-md text-lg leading-relaxed">
          Your request has been logged. Our engineering team is currently analyzing your requirements and will deploy a strategy to your inbox within 24 hours.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setCaptchaStatus('idle');
            setFormData(prev => ({...prev, message: ""}));
          }}
          className="text-white hover:text-blue-400 font-mono text-sm uppercase tracking-widest border-b border-white/20 hover:border-blue-400 pb-1 transition-all"
        >
          Initialize New Request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
      
      {/* 1. Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Identity</label>
          <input 
            required
            type="text" 
            placeholder="Your Name"
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all placeholder:text-zinc-700"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Contact Node</label>
          <input 
            required
            type="email" 
            placeholder="work@email.com"
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all placeholder:text-zinc-700"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      {/* 2. Services Selection */}
      <div className="space-y-3">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Select Protocol (Optional)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              onClick={() => setFormData({...formData, service: formData.service === service.id ? "" : service.id})}
              className={`
                cursor-pointer relative px-4 py-3 rounded-xl border flex items-center gap-3 transition-all duration-200 select-none
                ${formData.service === service.id 
                  ? "bg-blue-500/10 border-blue-500/50 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]" 
                  : "bg-zinc-900/30 border-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/5"}
              `}
            >
              <div className={`${formData.service === service.id ? "text-blue-400" : "text-zinc-600"}`}>
                {service.icon}
              </div>
              <span className="text-sm font-medium">{service.label}</span>
              {formData.service === service.id && (
                <motion.div layoutId="check" className="absolute right-3 text-blue-400">
                  <CheckCircle2 size={16} />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Plan Selection */}
      <div className="space-y-3">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Bandwidth Scale (Optional)</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setFormData({...formData, plan: formData.plan === plan.id ? "" : plan.id})}
              className={`
                cursor-pointer p-4 rounded-xl border flex flex-col gap-3 transition-all duration-200 select-none
                ${formData.plan === plan.id 
                  ? "bg-purple-500/10 border-purple-500/50 text-white shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]" 
                  : "bg-zinc-900/30 border-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/5"}
              `}
            >
              <div className="flex justify-between items-center">
                <div className={`${formData.plan === plan.id ? "text-purple-400" : "text-zinc-600"}`}>
                  {plan.icon}
                </div>
                {formData.plan === plan.id && <CheckCircle2 size={16} className="text-purple-400" />}
              </div>
              <div>
                <span className="block text-sm font-bold text-white">{plan.label}</span>
                <span className="text-[10px] text-zinc-500 leading-tight block mt-1">{plan.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Message */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Project Specs</label>
        <textarea 
          required
          rows={4}
          placeholder="Brief us on your objectives, timeline, and current infrastructure..."
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all placeholder:text-zinc-700 resize-none"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>

      {/* 5. Security Check */}
      <div className="space-y-2">
         <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Security Clearance</label>
         <div 
           onClick={handleCaptchaClick}
           className={`
             flex items-center gap-4 p-3 pr-6 bg-zinc-900/30 border rounded-xl w-fit cursor-pointer transition-all duration-300
             ${captchaStatus === 'verified' ? 'border-green-500/30 bg-green-500/5' : 'border-white/10 hover:border-white/20'}
           `}
         >
             <div className={`
               w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 border
               ${captchaStatus === 'verified' ? 'bg-green-500/20 border-green-500/50' : 'border-white/10 bg-white/5'}
             `}>
                {captchaStatus === 'verifying' && <Loader2 className="animate-spin text-zinc-400" size={16} />}
                {captchaStatus === 'verified' && <Check className="text-green-400" size={18} strokeWidth={3} />}
             </div>
             
             <div className="flex flex-col">
                <span className={`text-sm font-bold ${captchaStatus === 'verified' ? 'text-green-400' : 'text-zinc-300'}`}>
                   {captchaStatus === 'verified' ? 'Verified Human' : 'Verify Humanity'}
                </span>
             </div>

             <ShieldCheck size={18} className={`ml-2 ${captchaStatus === 'verified' ? 'text-green-500' : 'text-zinc-700'}`} />
         </div>
      </div>

      {errorMessage && (
        <p className="text-red-400 text-sm font-semibold bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-center">
          {errorMessage}
        </p>
      )}

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting} 
        className={`
           w-full py-4 font-bold text-lg rounded-xl transition-all transform flex items-center justify-center gap-3 group border
           ${isSubmitting 
             ? "bg-zinc-800 border-white/5 text-zinc-500 cursor-not-allowed" 
             : "bg-white text-black border-white hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99]"}
        `}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Uplinking...
          </>
        ) : (
          <>
            {captchaStatus !== 'verified' ? 'Complete Verification Above' : 'Initiate Sequence'} 
            {captchaStatus === 'verified' && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </>
        )}
      </button>

      <div className="text-center pt-2">
         <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            Encrypted Transmission /// 256-Bit SSL Secure
         </p>
      </div>

    </form>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      
      <TechGridBackground />

      {/* --- AMBIENT GLOWS --- */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 px-6 pt-32 pb-20 lg:py-32 items-start">
        
        {/* LEFT COLUMN: Context & Value */}
        <div className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-32">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
           >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-8">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
               Systems Online
             </div>

             <h1 className="text-5xl md:text-6xl font-bold font-almarena tracking-tight leading-[1] mb-6 text-white">
               Let’s Build <br/>
               <span className="text-zinc-500">Something Legendary.</span>
             </h1>
             
             <p className="text-zinc-400 text-lg leading-relaxed mb-12">
               Whether you need a rapid MVP launch or an enterprise-grade scaling strategy, our engineers are ready. 
               Tell us your vision, and we'll architect the solution.
             </p>

             <div className="space-y-8 border-l border-white/10 pl-8">
               <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-blue-500/50 transition-colors shrink-0">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">Fast-Track Execution</h5>
                    <p className="text-sm text-zinc-500 leading-relaxed">We don't do fluff. We ship code and campaigns that perform from Day 1.</p>
                  </div>
               </div>
               
               <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-purple-500/50 transition-colors shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-lg mb-1 group-hover:text-purple-400 transition-colors">Enterprise Security</h5>
                    <p className="text-sm text-zinc-500 leading-relaxed">Data protection and scalable architecture included in every service tier.</p>
                  </div>
               </div>
             </div>
           </motion.div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md"
          >
            {/* Form Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-96 gap-4">
                <Loader2 className="animate-spin text-blue-500" size={32} />
                <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Loading Interface...</p>
              </div>
            }>
              <BookingForm />
            </Suspense>
            
          </motion.div>
        </div>

      </div>

    </div>
  );
}