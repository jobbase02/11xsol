// app/page.tsx
"use client";

import React, { JSX, useState } from "react";
import { AnimatedBackgroundWrapper } from "./component/AnimatedBackground";
import { Navbar } from "./component/Navbar";
import { ServiceCard } from "./component/ServiceCard";
import { FaqItem } from "./component/FAQItem";
import { MarqueeRow } from "./component/MarqueRow";
import { Code2, ShoppingCart, Search, PenTool, ArrowRight, Rocket, CheckCircle, Twitter, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";

const testimonialsRow1 = [
  { text: "Website ka design ekdum mast hai, pehle se zyada traffic aa raha hai. ElevenX team ne kamaal kar diya.", author: "Rahul Verma", project: "Fashion E-Store", country: "India", img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul" },
  { text: "Sales increase hui hai inki digital marketing strategies se. Bilkul value for money service hai.", author: "Amit Sharma", project: "Tech Startup Site", country: "India", img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Amit" },
  { text: "Great work! Deadline se pehle delivery mili aur support bhi badhiya hai.", author: "Sarah Jenkins", project: "Portfolio Page", country: "USA", img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah" },
  { text: "Meri brand ki puri look change kar di. Clients bhi tareef kar rahe hain naye logo ki.", author: "Vikram Rathore", project: "Brand Identity", country: "UAE", img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram" },
];

const testimonialsRow2 = [
  { text: "Technical SEO bohot strong hai inka, Google ranking improve ho gayi hai kuch hi weeks mein.", author: "Suresh Kumar", project: "SaaS Platform", country: "India", img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Suresh" },
  { text: "Starting mein doubt tha but results dekh ke main impress ho gaya. Highly recommended.", author: "Jessica Lee", project: "App Landing Page", country: "Singapore", img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jessica" },
  { text: "Inka support system best hai. Kabhi bhi call karo, solution mil jata hai. Koi tension nahi.", author: "Arjun Das", project: "Real Estate Web", country: "India", img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun" },
  { text: "E-commerce store banwaya tha, speed bahot fast hai aur user experience smooth hai.", author: "Karan Patel", project: "Electronics Store", country: "UK", img: "https://api.dicebear.com/9.x/avataaars/svg?seed=Karan" },
];

export default function Page(): JSX.Element {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "What services do you specialize in?", a: "We specialize in high-performance Web Development (Next.js), E-commerce (Shopify/WooCommerce), SEO Optimization, and Digital Marketing strategies." },
    { q: "How long does a typical project take?", a: "A standard website typically takes 2-4 weeks. Complex web applications or e-commerce stores generally range from 4-8 weeks depending on requirements." },
    { q: "Do you provide post-launch support?", a: "Absolutely. We offer 30 days of free support after launch, and we have flexible monthly maintenance packages to keep your site secure and updated." },
    { q: "Can you help rank my site on Google?", a: "Yes. SEO is one of our core pillars. We build websites with technical SEO best practices and offer ongoing content strategies to improve your rankings." },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 selection:bg-cyan-500/30 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackgroundWrapper />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-transparent to-slate-950/90" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-semibold mb-8 backdrop-blur-sm mx-auto">
              <Rocket size={16} /> Digital Marketing Agency
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
              WE BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">DIGITAL LEGACIES</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              <span className="text-white font-semibold">ElevenXsolutions</span> combines cutting-edge 3D web technologies with data-driven marketing strategies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-50 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Start Your Project <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 text-white hover:bg-white/10 backdrop-blur-md transition-all">
                View Our Portfolio
              </button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-32 px-4 relative bg-slate-950/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Expertise</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">We provide end-to-end digital solutions tailored to scale your business in the modern landscape.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard icon={Code2} title="Web Development" description="Custom Next.js & React applications. Fast, secure, and scalable architectures." />
              <ServiceCard icon={ShoppingCart} title="E-Commerce" description="High-converting Shopify & WordPress stores designed for sales velocity." />
              <ServiceCard icon={Search} title="SEO Solutions" description="Technical & Content SEO strategies to dominate search rankings." />
              <ServiceCard icon={PenTool} title="Brand Design" description="Visual identities and UI/UX design that captures your brand's essence." />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Projects", val: "200+" },
              { label: "Clients", val: "100%" },
              { label: "Growth", val: "300%" },
              { label: "Awards", val: "15+" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{item.val}</div>
                <div className="text-cyan-500 text-sm font-bold uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 relative overflow-hidden bg-slate-950/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-20 px-4">
              <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Don't just take our word for it. Here is what real people are saying about our work.</p>
            </div>

            <div className="flex flex-col gap-8">
              <MarqueeRow items={testimonialsRow1} direction="left" />
              <MarqueeRow items={testimonialsRow2} direction="right" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32 px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Common Questions</h2>
              <p className="text-slate-400">Everything you need to know about working with us.</p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.q} answer={faq.a} isOpen={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-xl p-12 md:p-24 text-center group">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/30 transition-all duration-700" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/30 transition-all duration-700" />

              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                  Ready to transform your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Digital Presence?</span>
                </h2>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">Don't let your competitors get ahead. Partner with ElevenXsolutions and build a website that works as hard as you do.</p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <button className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-cyan-50 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    Start Your Project Now
                  </button>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="text-cyan-400" size={20} />
                    <span>Free Consultation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="bg-slate-950 pt-24 pb-12 border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-white mb-6">ElevenX<span className="text-cyan-400">solutions</span></h2>
                <p className="text-slate-400 mb-8 max-w-md leading-relaxed">Transforming businesses through innovation. We build the technology that powers your growth engine.</p>
                <div className="flex gap-4">
                  {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {["Home", "Services", "FAQ", "Contact"].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Contact Us</h4>
                <ul className="space-y-4 text-slate-400">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-cyan-500 mt-1" size={18} />
                    <span>Tech City, TC 90210</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="text-cyan-500" size={18} />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="text-cyan-500" size={18} />
                    <span>hello@elevenx.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <p>© {new Date().getFullYear()} ElevenXsolutions. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
