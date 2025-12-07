
import React from "react";
import { PageHeader } from "../components/PageHeader";

export const About = () => {
  const objectives = [
    {
      text: "Memastikan pegawai di peringkat lapangan memahami objektif dan strategi pelaksanaan projek dan program sepertimana hasrat kerajaan.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" // Strategy/Team
    },
    {
      text: "Memberi panduan yang jelas kepada kakitangan FAMA dalam pelaksanaan projek yang telah dirancang untuk tahun 2026.",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" // Planning/Discussion
    },
    {
      text: "Memastikan Sasaran Kerja Tahunan FAMA dapat dicapai mengikut unjuran yang telah ditetapkan.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" // Target/Chart
    },
    {
      text: "Meningkatkan mutu perkhidmatan FAMA kepada kumpulan sasar dan pihak berkepentingan.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" // Service/Handshake
    }
  ];

  return (
    <>
      <PageHeader title="Objektif Konvensyen" subtitle="Hala tuju dan matlamat utama penganjuran" />
      <section className="py-16 bg-white animate-fade-in">
        <div className="container mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h4 className="text-fama-red font-bold uppercase tracking-widest mb-2 text-sm">Konsep Konvensyen</h4>
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Integriti, Inklusiviti Pemacu Kejayaan
             </h2>
             <div className="h-1 w-24 bg-fama-blue mx-auto rounded-full mb-6"></div>
             <p className="text-gray-600 text-lg">
                Objektif Konvensyen FAMA Tahun 2026 adalah untuk :
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col h-full">
                 <div className="h-48 overflow-hidden relative shrink-0">
                    <img 
                      src={item.img} 
                      alt={`Objektif ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-md">
                        Objektif {idx + 1}
                    </div>
                 </div>
                 <div className="p-6 relative flex-grow flex flex-col">
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-fama-red text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white z-10">
                        {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base mt-2">
                      {item.text}
                    </p>
                 </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};
