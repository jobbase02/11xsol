"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Smartphone,
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
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

export default Contact;