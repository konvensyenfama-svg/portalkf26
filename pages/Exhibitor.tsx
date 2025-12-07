
import React from "react";
import { PageHeader } from "../components/PageHeader";

export const Exhibitor = () => {
  const booths = [
    {
        title: "Licensing Kopiesatu",
        dept: "Pasaran Produk Proses",
        image: "https://i.imgur.com/Lkr9cyg.png"
    },
    {
        title: "Koleksi Laporan Tahunan FAMA & Pop up RMK-13",
        dept: "Dasar & Perancangan Strategik",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Kelestarian Makanan: Masa Depan Negara",
        dept: "Padanan Bekalan",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Mock up iFAMA & SISDA",
        dept: "Perkhidmatan Digital",
        image: "https://i.imgur.com/tcB4q5I.png"
    }
  ];

  return (
    <>
      <PageHeader title="Ruang Pameran KF26" subtitle="Pameran Oleh  Bahagian" />
      <section className="py-16 bg-fama-light animate-fade-in min-h-screen">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
              <i className="fas fa-store text-6xl text-fama-blue mb-6"></i>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Senarai Pameran</h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Saksikan showcase eksklusif yang memaparkan hala tuju masa depan FAMA, inovasi digital, dan kelestarian makanan.
              </p>
           </div>

           <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {booths.map((item, idx) => (
                <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-2xl h-80 cursor-pointer transform hover:-translate-y-2 transition-all duration-500">
                    {/* Background Image */}
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                    
                    {/* Text Content */}
                    <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-3 py-1 bg-fama-red text-white text-xs font-bold uppercase tracking-widest rounded-full mb-3 shadow-lg border border-red-400/50">
                            {item.dept}
                        </span>
                        <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-blue-200 transition-colors drop-shadow-md">
                            {item.title}
                        </h3>
                        <div className="h-1 w-12 bg-fama-blue rounded-full mt-4 group-hover:w-24 group-hover:bg-white transition-all duration-300"></div>
                    </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </>
  );
};
