import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";

export const Agenda = () => {
  const [activeTab, setActiveTab] = useState(0);

  const days = [
    {
      id: 0,
      day: "HARI 1",
      date: "14 DIS",
      title: "Ahad",
      events: [
        { time: "3:00 - 6:00 PTG", title: "Daftar Masuk Penginapan", desc: "Ketibaan peserta dan urusan daftar masuk.", icon: "fa-suitcase" },
        { time: "6:30 - 7:30 MLM", title: "Makan Malam", desc: "Jamuan makan malam di dewan utama.", icon: "fa-utensils" },
        { time: "7:30 - 9:00 MLM", title: "Program Kerohanian", desc: "Bacaan Yassin & Tahlil, Solat Isyak Berjemaah.", icon: "fa-hands-praying" },
        { time: "9:00 - 10:30 MLM", title: "Program Motivasi (Ceramah)", desc: "Topik: Solat Mantap Kerjaya Hebat.", icon: "fa-lightbulb" },
        { time: "10:30 MLM", title: "Taklimat Konvensyen & Minum Malam", desc: "Taklimat ringkas urus setia dan minum malam.", icon: "fa-clipboard-check" },
      ]
    },
    {
      id: 1,
      day: "HARI 2",
      date: "15 DIS",
      title: "Isnin",
      events: [
        { time: "8:00 - 9:00 PG", title: "Taklimat NGO", desc: "Sesi bersama NGO dan pemegang taruh.", icon: "fa-handshake" },
        { time: "9:00 - 10:30 PG", title: "Majlis Perasmian & Anugerah FAMA Negeri 2025", desc: "Pakaian: Pejabat (Suit/Baju Kurung).", icon: "fa-award" },
        { time: "10:30 - 11:00 PG", title: "Minum Pagi", desc: "Rehat sebentar.", icon: "fa-mug-hot" },
        { time: "11:00 - 1:00 TGH", title: "Forum Pengurusan Tertinggi (BoD)", desc: "Topik: Cabaran FAMA.", icon: "fa-users" },
        { time: "1:00 - 2:30 PTG", title: "Rehat & Makan Tengahari", desc: "Solat Zohor dan jamuan makan.", icon: "fa-utensils" },
        { time: "2:30 - 3:30 PTG", title: "Majlis Amanat Ketua Pengarah", desc: "Amanat Tahunan oleh YBhg. Ketua Pengarah.", icon: "fa-microphone-alt" },
        { time: "3:30 - 5:30 PTG", title: "Penerangan & Pelaksanaan RMK-13", desc: "Oleh TKP SMO, TKP KP & TKP PIA.", icon: "fa-chart-line" },
        { time: "8:30 - 10:30 MLM", title: "Pembentangan 8 Projek RMK-13", desc: "Oleh Pengurus Kanan (Owner Project). Pakaian: Smart Casual.", icon: "fa-project-diagram" },
        { time: "10:30 MLM", title: "Minum Malam", desc: "Bersurai.", icon: "fa-moon" },
      ]
    },
    {
      id: 2,
      day: "HARI 3",
      date: "16 DIS",
      title: "Selasa",
      events: [
        { time: "9:00 - 11:00 PG", title: "Pitching Projek RMK13", desc: "Sesi pembentangan idea dan projek.", icon: "fa-bullhorn" },
        { time: "11:00 - 11:15 PG", title: "Minum Pagi", desc: "Rehat sebentar.", icon: "fa-coffee" },
        { time: "11:15 - 1:15 TGH", title: "Pitching Projek RMK13 (Sambungan)", desc: "Sambungan sesi pembentangan.", icon: "fa-bullhorn" },
        { time: "1:15 - 2:30 PTG", title: "Rehat & Makan Tengahari", desc: "", icon: "fa-utensils" },
        { time: "2:30 - 5:30 PTG", title: "Pitching Projek RMK13 (Akhir)", desc: "Sesi akhir pembentangan.", icon: "fa-bullhorn" },
        { time: "5:30 - 6:30 PTG", title: "Minum Petang & Riadah", desc: "Aktiviti santai.", icon: "fa-running" },
        { time: "8:00 - 10:30 MLM", title: "Majlis FAMA Prestij 2025", desc: "Tema: Nusantara. Makan malam gala.", icon: "fa-star" },
      ]
    },
    {
      id: 3,
      day: "HARI 4",
      date: "17 DIS",
      title: "Rabu",
      events: [
        { time: "9:00 - 10:00 PG", title: "Pembentangan : iFAMA", desc: "Pakaian: Baju Korporat (Biru).", icon: "fa-laptop" },
        { time: "10:00 - 10:30 PG", title: "Minum Pagi", desc: "Rehat sebentar.", icon: "fa-mug-hot" },
        { time: "10:30 - 11:15 PG", title: "Majlis Aspirasi Pengerusi FAMA", desc: "Sesi bersama Pengerusi.", icon: "fa-user-tie" },
        { time: "11:15 - 12:15 TGH", title: "Penyerahan Watikah SPK 2026", desc: "Dan Penyampaian Hadiah Sesi Pitching.", icon: "fa-certificate" },
        { time: "12:15 - 1:00 TGH", title: "Resolusi Konvensyen", desc: "Rumusan program.", icon: "fa-file-signature" },
        { time: "1:00 PTG", title: "Makan Tengahari & Bersurai", desc: "Tamat program.", icon: "fa-sign-out-alt" },
      ]
    }
  ];

  return (
    <>
    <PageHeader title="Tentatif Konvensyen" subtitle="Jadual penuh program sepanjang 4 hari" />
    <section className="py-16 bg-fama-light animate-fade-in">
      <div className="container mx-auto px-4">
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {days.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-3 md:px-6 md:py-4 rounded-lg flex flex-col items-center min-w-[100px] md:min-w-[140px] transition-all duration-300 border-2 ${
                activeTab === item.id
                  ? "bg-fama-blue text-white border-fama-blue shadow-lg scale-105"
                  : "bg-white text-gray-600 border-transparent hover:bg-blue-50 hover:border-blue-100"
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${activeTab === item.id ? "text-blue-200" : "text-gray-400"}`}>
                {item.day}
              </span>
              <span className="text-lg md:text-xl font-bold">{item.date}</span>
              <span className={`text-xs ${activeTab === item.id ? "text-white" : "text-gray-500"}`}>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto relative bg-white rounded-2xl shadow-xl p-6 md:p-10 min-h-[400px]">
           {/* Timeline Line (visible on desktop) */}
           <div className="hidden md:block absolute left-[140px] top-10 bottom-10 w-0.5 bg-gray-200"></div>

           <div className="space-y-8">
              {days[activeTab].events.map((event, idx) => (
                 <div key={idx} className="relative flex flex-col md:flex-row md:items-start group">
                    {/* Time (Desktop) */}
                    <div className="hidden md:block w-[120px] text-right pr-8 pt-1">
                       <span className="text-fama-blue font-bold text-sm block">{event.time.split(/-(.+)/)[0]}</span>
                       <span className="text-gray-500 text-xs font-medium block opacity-70">{event.time.split(/-(.+)/)[1]}</span>
                    </div>

                    {/* Dot */}
                    <div className="hidden md:flex absolute left-[132px] w-4 h-4 bg-white border-4 border-fama-red rounded-full z-10 mt-2 group-hover:scale-125 transition-transform"></div>
                    
                    {/* Content */}
                    <div className="flex-1 md:pl-8 pb-8 md:pb-0 border-l-2 border-gray-200 md:border-l-0 ml-3 md:ml-0 pl-6 md:pl-8 relative">
                        {/* Mobile Time & Dot */}
                        <div className="md:hidden flex items-center mb-2 -ml-[31px]">
                            <div className="w-4 h-4 bg-white border-4 border-fama-red rounded-full z-10"></div>
                            <span className="ml-3 text-fama-blue font-bold text-sm bg-blue-50 px-2 py-1 rounded">{event.time}</span>
                        </div>

                        <div className="bg-gray-50 p-5 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-100">
                           <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-fama-blue shadow-sm shrink-0 ml-2">
                                 <i className={`fas ${event.icon}`}></i>
                              </div>
                           </div>
                           <p className="text-gray-600 text-sm leading-relaxed">{event.desc}</p>
                        </div>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="mt-8 text-center">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert('Fungsi ini akan tersedia nanti.'); }}
                className="inline-flex items-center justify-center px-6 py-2 border border-fama-red text-fama-red rounded-full hover:bg-fama-red hover:text-white transition-colors font-medium text-sm"
              >
                 Muat Turun Jadual Penuh (PDF) <i className="fas fa-file-pdf ml-2"></i>
              </a>
           </div>
        </div>
      </div>
    </section>
    </>
  );
};
