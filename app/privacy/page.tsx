import React from "react";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-blue-500/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-32">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-12">
            <ArrowLeft size={16} /> Return Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <Shield size={24} />
            </div>
            <h1 className="text-4xl font-bold text-white font-almarena">Privacy Protocol</h1>
        </div>

        <div className="space-y-8 text-sm md:text-base leading-relaxed">
            <p>Last Updated: December 2025</p>

            <section>
                <h2 className="text-xl font-bold text-white mb-4">1. Data Collection</h2>
                <p>ElevenX Solutions (we, us) collects data to provide engineering services. This includes:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400">
                    <li>Identity Data (Name, Job Title) via booking forms.</li>
                    <li>Contact Data (Email, Phone) via inquiry submission.</li>
                    <li>Technical Data (IP address, Browser type) via Vercel Analytics.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-4">2. Usage of Information</h2>
                <p>We do not sell your data. We use your information strictly to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400">
                    <li>Process service inquiries and schedule consultations.</li>
                    <li>Execute contractual engineering obligations.</li>
                    <li>Send relevant technical updates (if opted in).</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-4">3. Security</h2>
                <p>
                    We employ enterprise-grade security including SSL encryption and secure database storage (Supabase). 
                    However, no transmission over the internet is 100% secure.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-4">4. Third-Party Services</h2>
                <p>Our infrastructure utilizes trusted partners:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400">
                    <li>Vercel (Hosting & Analytics)</li>
                    <li>Supabase (Database)</li>
                    <li>SendGrid (Email Transaction)</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-4">5. Contact</h2>
                <p>For privacy concerns, contact our Data Officer at <a href="mailto:privacy@elevenxsolutions.com" className="text-blue-400 hover:underline">privacy@elevenxsolutions.com</a>.</p>
            </section>
        </div>
      </div>
    </div>
  );
}