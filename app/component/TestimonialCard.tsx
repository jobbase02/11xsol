// components/TestimonialCard.tsx
"use client";

import React from "react";
import { Globe, Quote } from "lucide-react";

export type Testimonial = {
  text: string;
  author: string;
  project: string;
  country: string;
  img: string;
};

export const TestimonialCard: React.FC<Testimonial> = ({ text, author, project, country, img }) => {
  return (
    <div className="flex-shrink-0 w-[400px] bg-slate-900/50 rounded-2xl p-6 mx-4 hover:bg-slate-800/50 transition-colors">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/20">
          <img src={img} alt={author} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm">{author}</h4>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
            <span className="text-cyan-400">{project}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Globe size={10} /> {country}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <Quote className="text-slate-700 absolute -top-1 -left-1 opacity-50" size={20} />
        <p className="text-slate-300 text-sm leading-relaxed pl-6 italic">"{text}"</p>
      </div>
    </div>
  );
};
