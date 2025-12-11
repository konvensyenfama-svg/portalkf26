
import React from "react";
import { PageHeader } from "../components/PageHeader";

export const Lampiran = () => {
  // Mock data for 10 documents
  const documents = [
    { id: 1, title: "Kertas Kerja Utama: Hala Tuju 2026", url: "https://www.fama.gov.my" },
    { id: 2, title: "Senarai Nama Peserta Konvensyen FAMA 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-XCHUDRn02goJ-gliNzF9YcY2dBPWCRHkoIW_dx1e7dHXvf3M-5J5S6ls9UDl1O2JUSs47cYyyqRP/pubhtml?gid=1920558370&single=true" },
    { id: 3, title: "Slaid Pembentangan: Projek RMK-13", url: "https://www.fama.gov.my" },
    { id: 4, title: "-", url: "" },
    { id: 5, title: "-", url: "" },
    { id: 6, title: "-", url: "" },
    { id: 7, title: "-", url: "" },
    { id: 8, title: "-", url: "" },
    { id: 9, title: "-", url: "" },
    { id: 10, title: "-", url: "" },
  ].map((item, index) => ({
    ...item,
    image: `https://placehold.co/400x500/f3f4f6/1f2937?text=Dokumen+${index + 1}`, // Placeholder image generator
    type: "`",
    size: ""
  }));

  const handleOpenDocument = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <PageHeader title="Lampiran & Dokumen" subtitle="Pusat rujukan dokumen dan bahan edaran konvensyen" />
      <section className="py-16 bg-white animate-fade-in min-h-screen">
        <div className="container mx-auto px-4">
           
           <div className="flex flex-col items-center mb-12">
              <span className="inline-block px-3 py-1 bg-fama-blue/10 text-fama-blue rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                
              </span>
              <h2 className="text-3xl font-bold text-gray-800">Bahan Rujukan</h2>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {documents.map((doc) => (
                <div 
                  key={doc.id} 
                  onClick={() => handleOpenDocument(doc.url)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                    {/* Image Placeholder */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 border-b border-gray-100">
                        <img 
                          src={doc.image} 
                          alt={doc.title} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500" 
                        />
                        
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-fama-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                            <i className="fas fa-external-link-alt text-3xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"></i>
                            <span className="text-xs font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">Buka Dokumen</span>
                        </div>

                        {/* File Type Badge */}
                        <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-extrabold px-2 py-1 rounded shadow-md z-10">
                            {doc.type}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-grow flex flex-col justify-between">
                        <h3 className="text-sm font-bold text-gray-800 leading-tight mb-2 group-hover:text-fama-red transition-colors line-clamp-2">
                            {doc.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-400 mt-2">
                           <i className="fas fa-file-alt mr-2"></i> {doc.size}
                        </div>
                    </div>
                </div>
              ))}
           </div>

           <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center border border-blue-100">
              <i className="fas fa-info-circle text-fama-blue text-2xl mb-3"></i>
              <p className="text-gray-600 max-w-2xl mx-auto">
              </p>
           </div>
        </div>
      </section>
    </>
  );
};
