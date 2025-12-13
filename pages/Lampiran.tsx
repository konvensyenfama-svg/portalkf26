import React from "react";
import { PageHeader } from "../components/PageHeader";

export const Lampiran = () => {
  // Mock data for 15 documents now
  const documents = [
    { id: 1, title: "Senarai Nama Peserta Konvensyen FAMA 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-XCHUDRn02goJ-gliNzF9YcY2dBPWCRHkoIW_dx1e7dHXvf3M-5J5S6ls9UDl1O2JUSs47cYyyqRP/pubhtml?gid=1920558370&single=true" },
    { id: 2, title: "Slaid Pembentangan: Pembangunan Pasaran Agromakanan (PPAM)", url: "https://drive.google.com/drive/folders/1vnClZno763uBSzzKHOOBifVC1wS33o4q?usp=sharing" },
    { id: 3, title: "Slaid Pembentangan: Rantaian Pembekalan dan Pengedaran Agromakanan (RANTAI)", url: "https://drive.google.com/drive/folders/16_ya0do3M9rLk8CfDzbHbAxiqikYxkKu?usp=drive_link" },
    { id: 4, title: "Slaid Pembentangan: Pembangunan Pasaran dan Padanan Produk Mikro IAT", url: "https://drive.google.com/drive/folders/14ImA8o-xe8oxSz-sGnLAl7KgrnWR1FDY?usp=drive_link" },
    { id: 5, title: "Slaid Pembentangan: Pemodenan Ekosistem Pemasaran Pertanian", url: "https://drive.google.com/drive/folders/15kNqmlC8476tBzgAShl1WzaO9KEI8aab?usp=drive_link" },
    { id: 6, title: "Slaid Pembentangan: Rejuvenasi Outlet Pemasaran", url: "https://drive.google.com/drive/folders/1TBtqByK11ZNoX1m7ZKnvN7ZH-IN4WqSU?usp=drive_link" },
    { id: 7, title: "Slaid Pembentangan: Program Pemerkasaan Eksport dan Keusahawanan (Globex)", url: "https://drive.google.com/drive/folders/15kNqmlC8476tBzgAShl1WzaO9KEI8aab?usp=drive_link" },
    { id: 8, title: "Slaid Pembentangan: Jaringan Digital Agromakanan (DIGIFOOD NETWORK)", url: "https://drive.google.com/drive/folders/1fphHC6R4dOpk1dlcTYGJ4a6WmmP2ZvI7?usp=drive_link" },
    { id: 9, title: "Slaid Pembentangan: Pengukuhan Standard & Regulatori Ekosistem Agromakanan", url: "https://drive.google.com/drive/folders/1IqEzOuVjabnj2TnO34JDzzLOV9_fk24B?usp=drive_link" },
    // Data Tambahan 10-15
    { id: 10, title: "-", url: "Belum Dikemaskini" },
    { id: 11, title: "-", url: "Belum Dikemaskini" },
    { id: 12, title: "-", url: "Belum Dikemaskini" },
    { id: 13, title: "-", url: "Belum Dikemaskini" },
    { id: 14, title: "-", url: "Belum Dikemaskini" },
    { id: 15, title: "-", url: "Belum Dikemaskini" },
  ].map((item, index) => ({
    ...item,
    image: `https://placehold.co/400x500/f3f4f6/1f2937?text=Dokumen+${index + 1}`,
    type: "PDF",
    size: "2.4MB" // Letak size default
  }));

  const handleOpenDocument = (url) => {
    if(url && url !== "placeholder") window.open(url, "_blank");
  };

  return (
    <>
      <PageHeader title="Lampiran & Dokumen" subtitle="Pusat rujukan dokumen dan bahan edaran konvensyen" />
      <section className="py-16 bg-white animate-fade-in min-h-screen">
        <div className="container mx-auto px-4">
            
           <div className="flex flex-col items-center mb-10">
              <span className="inline-block px-3 py-1 bg-fama-blue/10 text-fama-blue rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                
              </span>
              <h2 className="text-3xl font-bold text-gray-800">Bahan Rujukan</h2>
           </div>

           {/* Grid Layout: Kekal 6 column (kecil) */}
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {documents.map((doc) => (
                <div 
                  key={doc.id} 
                  onClick={() => handleOpenDocument(doc.url)}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-100 overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
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
                            <i className="fas fa-external-link-alt text-2xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"></i>
                            <span className="text-[10px] font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">Buka</span>
                        </div>

                        {/* File Type Badge */}
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm z-10">
                            {doc.type}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 flex-grow flex flex-col">
                        {/* Text wrapping enabled (no line-clamp) */}
                        <h3 className="text-xs font-bold text-gray-800 leading-snug mb-2 group-hover:text-fama-red transition-colors break-words">
                            {doc.title}
                        </h3>
                        
                        <div className="mt-auto pt-2 border-t border-gray-50 flex items-center text-[10px] text-gray-400">
                           <i className="fas fa-file-alt mr-1.5"></i> {doc.size}
                        </div>
                    </div>
                </div>
              ))}
           </div>

           <div className="mt-12 bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
              <i className="fas fa-info-circle text-fama-blue text-xl mb-2"></i>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                 .
              </p>
           </div>
        </div>
      </section>
    </>
  );
};
