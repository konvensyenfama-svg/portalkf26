
import React from "react";
import { CountdownTimer } from "../components/CountdownTimer";

export const Hero = ({ onNavigate, config }) => {
  return (
    <section className="relative min-h-screen flex flex-col pt-32 pb-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.imgur.com/uJGSpBG.jpeg"
          alt="Malaysian Agriculture Field"
          className="w-full h-full object-cover scale-105 brightness-110"
        />
        {/* Dark Overlay (Light Shadow) */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Subtle Pattern Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col flex-grow justify-between items-center text-center">
        
        {/* Top Content Group */}
        <div className="flex flex-col items-center mt-4 md:mt-8">
            {/* Corporate Badge */}
            <div className="mb-8 animate-fade-in-down">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5C857] text-black text-xs font-bold tracking-[0.2em] uppercase shadow-md border border-white/20">
                "Integriti, Inklusiviti Pemacu Kejayaan"
              </span>
            </div>

            {/* Main Title - All White */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight animate-fade-in drop-shadow-lg">
              <span className="text-white block mb-2">Konvensyen FAMA</span>
              <span className="text-white">
                Tahun 2026
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
              "Pengukuhan Pemasaran Menjamin Kedaulatan Makanan"
            </p>
        </div>

        {/* Bottom Content Group (Countdown) */}
        <div className="w-full max-w-5xl pt-6 animate-fade-in mb-8 md:mb-12">
            <p className="text-xs text-white uppercase tracking-[0.3em] mb-10 font-bold drop-shadow-md opacity-95">Masa Sehingga Perasmian</p>
            <CountdownTimer targetDate={config.targetDate} />
        </div>
      </div>
    </section>
  );
};
