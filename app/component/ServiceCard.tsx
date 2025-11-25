// components/ServiceCard.tsx
"use client";

import React from "react";

type ServiceCardProps = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300 group">
      <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
};
