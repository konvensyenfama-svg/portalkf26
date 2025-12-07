
import React from "react";

export const PageHeader = ({ title, subtitle }) => (
  <div className="relative pt-32 pb-12 text-center px-4 overflow-hidden bg-fama-blue">
     <div className="absolute inset-0 z-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
     </div>
     <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{title}</h1>
        {subtitle && <p className="text-blue-100">{subtitle}</p>}
     </div>
  </div>
);
