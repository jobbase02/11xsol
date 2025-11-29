"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Check
} from "lucide-react";

// --- STATIC DATA ---
const SERVICES = [
  { id: "seo", label: "SEO Optimization", icon: <Sparkles size={18} /> },
  { id: "web-dev", label: "Website Development", icon: <Globe size={18} /> },
  { id: "shopify", label: "Shopify Development", icon: <ShoppingBag size={18} /> },
  { id: "app-dev", label: "App Development", icon: <Cpu size={18} /> },
];

const PLANS = [
  { id: "mvp", label: "MVP Launch", icon: <Rocket size={18} />, desc: "For startups validating ideas." },
  { id: "scale", label: "Scale Up", icon: <Zap size={18} />, desc: "For growing businesses." },
  { id: "enterprise", label: "Enterprise", icon: <Building2 size={18} />, desc: "Full-scale custom solutions." },
];

// --- COMPONENTS ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

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
  
  // Captcha State: 'idle' | 'verifying' | 'verified'
  const [captchaStatus, setCaptchaStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');

  // Initialize from URL - STRICT LOGIC
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const planParam = searchParams.get("plan");

    setFormData(prev => {
      let newService = prev.service;
      let newPlan = prev.plan;

      // Only update service if param exists and matches a valid option
      if (serviceParam) {
        const matchedService = SERVICES.find(s => 
          s.id === serviceParam || s.label.toLowerCase().includes(serviceParam.toLowerCase())
        );
        if (matchedService) newService = matchedService.id;
      }

      // Only update plan if param exists and matches a valid option
      if (planParam) {
        const matchedPlan = PLANS.find(p => 
          p.id === planParam || p.label.toLowerCase().includes(planParam.toLowerCase())
        );
        if (matchedPlan) newPlan = matchedPlan.id;
      }

      return {
        ...prev,
        service: newService,
        plan: newPlan
      };
    });
  }, [searchParams]);

  const handleCaptchaClick = () => {
    if (captchaStatus === 'verified') return;
    setCaptchaStatus('verifying');
    
    // Simulate verification delay
    setTimeout(() => {
      setCaptchaStatus('verified');
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaStatus !== 'verified') return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking. Please try again.');
      }

      // Success
      setSubmitted(true);
    } catch (error) {
      console.error("Booking Error:", error);
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full flex flex-col items-center justify-center text-center p-12 bg-white/5 border border-white/10 rounded-3xl"
      >
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Request Received</h3>
        <p className="text-gray-400 mb-8 max-w-md">
          Our engineers are analyzing your requirements. Expect a strategy breakdown in your inbox within 24 hours.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setCaptchaStatus('idle');
            setFormData(prev => ({...prev, message: ""})); // Clear message but keep context
          }}
          className="text-blue-400 hover:text-white font-semibold transition-colors"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
      
      {/* 1. Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
          <input 
            required
            type="text" 
            placeholder="John Doe"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Work Email</label>
          <input 
            required
            type="email" 
            placeholder="john@company.com"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      {/* 2. Services Selection */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Service Required (Optional)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              onClick={() => setFormData({...formData, service: formData.service === service.id ? "" : service.id})}
              className={`
                cursor-pointer relative px-4 py-3 rounded-xl border flex items-center gap-3 transition-all duration-200 select-none
                ${formData.service === service.id 
                  ? "bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_-3px_rgba(37,99,235,0.3)]" 
                  : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5"}
              `}
            >
              <div className={`${formData.service === service.id ? "text-blue-400" : "text-gray-500"}`}>
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
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Project Scale (Optional)</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setFormData({...formData, plan: formData.plan === plan.id ? "" : plan.id})}
              className={`
                cursor-pointer p-4 rounded-xl border flex flex-col gap-2 transition-all duration-200 select-none
                ${formData.plan === plan.id 
                  ? "bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_-3px_rgba(147,51,234,0.3)]" 
                  : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5"}
              `}
            >
              <div className="flex justify-between items-center">
                <div className={`${formData.plan === plan.id ? "text-purple-400" : "text-gray-500"}`}>
                  {plan.icon}
                </div>
                {formData.plan === plan.id && <CheckCircle2 size={16} className="text-purple-400" />}
              </div>
              <div>
                <span className="block text-sm font-bold">{plan.label}</span>
                <span className="text-[10px] opacity-60 leading-tight block mt-1">{plan.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Message */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Project Details</label>
        <textarea 
          required
          rows={4}
          placeholder="Tell us about your goals, timeline, and current challenges..."
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700 resize-none"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>

      {/* 5. Working ReCAPTCHA Simulation */}
      <div className="space-y-2">
         <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Security Check</label>
         <div 
            onClick={handleCaptchaClick}
            className={`
               flex items-center gap-4 p-4 bg-[#0a0a0a] border rounded-xl w-fit cursor-pointer transition-all duration-300
               ${captchaStatus === 'verified' ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-white/30'}
            `}
         >
             <div className={`
                w-7 h-7 border-2 rounded-md flex items-center justify-center transition-all duration-300
                ${captchaStatus === 'verified' ? 'bg-green-500 border-green-500' : 'border-gray-500 bg-transparent'}
             `}>
                {captchaStatus === 'verifying' && <Loader2 className="animate-spin text-gray-400" size={16} />}
                {captchaStatus === 'verified' && <Check className="text-black" size={18} strokeWidth={3} />}
             </div>
             
             <div className="flex flex-col">
                <span className={`text-sm font-medium ${captchaStatus === 'verified' ? 'text-green-500' : 'text-gray-300'}`}>
                   {captchaStatus === 'verified' ? 'Verified Human' : 'I am human'}
                </span>
                <span className="text-[10px] text-gray-600">Protected by 11xGuard</span>
             </div>

             <ShieldCheck size={18} className={`ml-4 ${captchaStatus === 'verified' ? 'text-green-500' : 'text-gray-600'}`} />
         </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
          {errorMessage}
        </p>
      )}

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isSubmitting || captchaStatus !== 'verified'}
        className={`
           w-full py-4 font-bold text-lg rounded-xl transition-all transform flex items-center justify-center gap-2 group
           ${isSubmitting || captchaStatus !== 'verified' 
             ? "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50" 
             : "bg-white text-black hover:bg-blue-500 hover:text-white hover:scale-[1.01] active:scale-[0.99]"}
        `}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Processing...
          </>
        ) : (
          <>
            {captchaStatus !== 'verified' ? 'Complete Verification Above' : 'Secure Your Slot'} 
            {captchaStatus === 'verified' && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-600 mt-4">
        By submitting, you agree to our privacy policy. Your data is encrypted and secure.
      </p>

    </form>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-blue-500/50 selection:text-white overflow-x-hidden">
      
      <NoiseOverlay />

      {/* --- AMBIENT GLOWS --- */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 px-6 py-20 lg:py-32 items-center">
        
        {/* LEFT COLUMN: Context & Value */}
        <div className="lg:col-span-5 flex flex-col justify-center">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
           >
             <h4 className="text-blue-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
               <span className="w-8 h-[1px] bg-blue-500"></span> Start the Conversation
             </h4>
             <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
               Let’s Build <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Something Legendary.</span>
             </h1>
             <p className="text-gray-400 text-lg leading-relaxed mb-10">
               Whether you need a rapid MVP launch or an enterprise-grade scaling strategy, our engineers are ready. 
               Tell us your vision, and we'll handle the architecture.
             </p>

             <div className="space-y-6 border-l border-white/10 pl-6">
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Fast-Track Execution</h5>
                    <p className="text-sm text-gray-500">We don't do fluff. We ship code and campaigns that work from Day 1.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Enterprise Security</h5>
                    <p className="text-sm text-gray-500">Data protection and scalable architecture included in every tier.</p>
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
            className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/50 relative overflow-hidden"
          >
            {/* Form Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <Suspense fallback={
              <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin text-blue-500" size={32} />
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