import React from "react";
import { PageHeader } from "../components/PageHeader";

export const Lampiran = () => {
  // 1. Data Definition
  const rawDocuments = [
    { id: 1, title: "Dashboard Kehadiran Peserta", url: "Maaf. Sistem Dashboard Sedang Dikemaskini", type: "dashboard" },
    { id: 2, title: "Senarai Nama Peserta Konvensyen FAMA 2026", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRacZCWatHXE48t5WIRL8w4Vn92rwY_DRNogQtRXAmzjRoZVwP7uZpAmdAfiz4_0e9mthsRnSw3idrW/pubhtml?gid=1920558370&single=true", type: "sheet" },
    { id: 3,title: "SLIDE KP - KONVENSYEN FAMA 2026 ", url: "https://drive.google.com/file/d/1rqSzn3FbPULsR9ucrBaGyTa4O-dokbLP/preview", type: "slide" },
    { id: 4, title: "TOR  : Terma Rujukan Projek Pembangunan RMK-13 ", url: "https://drive.google.com/file/d/17kjDGl6p5npauIpRqHjfX0j-P0L1tDch/view?usp=sharing", type: "slide" },
    { id: 5, title: "Slaid: Pembangunan Pasaran Agromakanan (PPAM)", url: "https://drive.google.com/drive/folders/1vnClZno763uBSzzKHOOBifVC1wS33o4q?usp=sharing", type: "slide" },
    { id: 6, title: "Slaid: Rantaian Pembekalan dan Pengedaran (RANTAI)", url: "https://drive.google.com/drive/folders/16_ya0do3M9rLk8CfDzbHbAxiqikYxkKu?usp=drive_link", type: "slide" },
    { id: 7, title: "Slaid: Pembangunan Pasaran dan Padanan Produk Mikro IAT", url: "https://drive.google.com/drive/folders/14ImA8o-xe8oxSz-sGnLAl7KgrnWR1FDY?usp=drive_link", type: "slide" },
    { id: 8, title: "Slaid: Pemodenan Ekosistem Pemasaran Pertanian", url: "https://drive.google.com/drive/folders/15kNqmlC8476tBzgAShl1WzaO9KEI8aab?usp=drive_link", type: "slide" },
    { id: 9, title: "Slaid: Rejuvenasi Outlet Pemasaran", url: "https://drive.google.com/drive/folders/1TBtqByK11ZNoX1m7ZKnvN7ZH-IN4WqSU?usp=drive_link", type: "slide" },
    { id: 10, title: "Slaid: Program Pemerkasaan Eksport (Globex)", url: "https://drive.google.com/drive/folders/1zgmgwRisNS4sSXu3wjO6B3hHH9SJIbLZ?usp=drive_link", type: "slide" },
    { id: 11, title: "Slaid: Jaringan Digital Agromakanan (JARINGAN)", url: "https://drive.google.com/drive/folders/1fphHC6R4dOpk1dlcTYGJ4a6WmmP2ZvI7?usp=drive_link", type: "slide" },
    { id: 12, title: "Slaid: Pengukuhan Standard & Regulatori", url: "https://drive.google.com/drive/folders/1IqEzOuVjabnj2TnO34JDzzLOV9_fk24B?usp=drive_link", type: "slide" },
    { id: 13, title: "Tentatif Pitching", url: "https://drive.google.com/file/d/19J5ULxsUQI1tlvtvGsjUnA_x2Md_3rsy/preview", type: "slide" },
    { id: 14, title: "QR Juri Awam", url: "https://drive.google.com/file/d/19t8i7PSuy3V6Mt1Lkfsbk8C5F0yhQ8TR/preview", type: "slide" },
    { id: 15, title: "Pitching 1 : Pembangunan Pasaran Agromakanan (PPAM)", url: "https://drive.google.com/file/d/1nCRLSrlx3QMWruV5clxBflNL8fmGdH--/preview", type: "slide" },
    { id: 16, title: "Pitching 2 : Pembangunan Pasaran dan Padanan Produk Mikro IAT", url: "https://drive.google.com/file/d/1NlWIpXiXoNc2xKVpgX1cImRfygyPjn6S/preview", type: "slide" },
    { id: 17, title: "Pitching 3 : Rantaian Pembekalan dan Pengedaran (RANTAI)", url: "https://drive.google.com/file/d/1hNbMoQjtIQfFJMGn2-T_pq4Le-RP66FC/preview", type: "slide" },
    { id: 18, title: "Pitching 4 : Rejuvenasi Outlet Pemasaran", url: "https://drive.google.com/file/d/1ZQBIdwnC-q_GZih4E9jQpk2hdrvsMbt0/preview", type: "slide" },
    { id: 19, title: "Slide: Portal iFAMA ", url: "https://drive.google.com/file/d/11ZNWxDBS3kR1WKH7y_hCdYw94YpwlCKP/preview", type: "slide" },
    { id: 20, title: "Slide: Paparan iFAMA ", url: "https://drive.google.com/file/d/1VJm3H7BUUrKGRH1OOhHGpGp_4ooFOQ2Z/preview", type: "slide" },
  ];

  // 2. Filter item kosong secara automatik
  const documents = rawDocuments.filter(doc => doc.title !== "-");

  const handleOpenDocument = (url) => {
    if (url && url !== "Belum Dikemaskini") window.open(url, "_blank");
  };

  // 3. Helper function untuk tentukan style ikon
  const getDocStyle = (type) => {
    switch (type) {
      case 'slide':
        return { 
          bg: "bg-orange-50", 
          text: "text-orange-600", 
          icon: "fa-file-powerpoint", 
          label: "PDF / Slaid" 
        };
      case 'dashboard':
        return { 
          bg: "bg-blue-50", 
          text: "text-blue-600", 
          icon: "fa-chart-line", 
          label: "Dashboard" 
        };
      case 'sheet':
        return { 
          bg: "bg-green-50", 
          text: "text-green-600", 
          icon: "fa-file-excel", 
          label: "Senarai" 
        };
      default:
        return { 
          bg: "bg-gray-50", 
          text: "text-gray-600", 
          icon: "fa-file-alt", 
          label: "Dokumen" 
        };
    }
  };

  return (
    <>
      <PageHeader title="Lampiran & Dokumen" subtitle="" />
      
      <section className="py-16 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto px-4">
            
           <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
                Bahan Rujukan
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-fama-blue/30 rounded-full w-1/2 mx-auto"></div>
              </h2>
              <p className="text-gray-500 mt-3 text-sm max-w-lg text-center">
                Sila klik pada kad di bawah untuk mengakses dokumen.
              </p>
           </div>

           {/* Tukar Grid Layout kepada responsive yang lebih selesa (2, 3, 4 col) */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {documents.map((doc) => {
                const style = getDocStyle(doc.type);
                
                return (
                  <div 
                    key={doc.id} 
                    onClick={() => handleOpenDocument(doc.url)}
                    className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl border border-gray-100 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
                  >
                    {/* Decorative Top Background */}
                    <div className={`absolute top-0 right-0 w-24 h-24 ${style.bg} rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110`}></div>

                    <div>
                        {/* Header: Icon & Type */}
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 ${style.bg} ${style.text} rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                <i className={`fas ${style.icon}`}></i>
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider py-1 px-2 rounded-lg ${style.bg} ${style.text}`}>
                                {style.label}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-gray-800 leading-relaxed mb-2 group-hover:text-fama-blue transition-colors line-clamp-3">
                            {doc.title}
                        </h3>
                    </div>

                    {/* Footer: Action Link */}
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 group-hover:text-fama-blue transition-colors">
                        <span className="flex items-center gap-2">
                           <i className="fas fa-external-link-alt"></i> Buka Pautan
                        </span>
                        <i className="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                    </div>
                  </div>
                );
              })}
           </div>

           {/* Empty State visual kalau tiada dokumen */}
           {documents.length === 0 && (
             <div className="text-center py-12 text-gray-400">
               <i className="fas fa-folder-open text-4xl mb-3 opacity-50"></i>
               <p>Tiada dokumen untuk dipaparkan masa ini.</p>
             </div>
           )}

           <div className="mt-16 bg-blue-50/80 rounded-2xl p-6 text-center border border-blue-100 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-2 text-fama-blue">
                 <i className="fas fa-info-circle text-lg"></i>
                 <span className="font-bold text-sm uppercase tracking-wide"></span>
              </div>
              <p className="text-sm text-gray-600">
                 
              </p>
           </div>
        </div>
      </section>
    </>
  );
};
