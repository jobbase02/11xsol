import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                <FileText size={24} />
            </div>
            <h1 className="text-4xl font-bold text-white font-almarena">Terms of Service</h1>
        </div>

        <div className="space-y-8 text-sm md:text-base leading-relaxed">
            <section>
                <h2 className="text-xl font-bold text-white mb-4">1. Agreement</h2>
                <p>By accessing elevenxsolutions.com, you agree to these Terms. If you disagree, do not use our services.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-4">2. Services</h2>
                <p>ElevenX Solutions provides web engineering, design, and consulting services. Specific deliverables are defined in individual client contracts (SOWs).</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-4">3. Intellectual Property</h2>
                <p>
                    All code and assets created by ElevenX remain our property until full payment is received, at which point ownership transfers to the client, excluding our proprietary libraries/frameworks which are licensed for use.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-4">4. Liability</h2>
                <p>
                  We provide software as-is. ElevenX Solutions is not liable for indirect damages, data loss, or business interruption resulting from the use of our code or services.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
}