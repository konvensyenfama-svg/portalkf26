
import React from "react";

export const InfoGrid = ({ config }) => {
  const items = [
    { icon: "fa-calendar-alt", title: "Tarikh", text: config.dateRange },
    { icon: "fa-clock", title: "Masa", text: "8:00 Pagi - 11:00 Malam" },
    { icon: "fa-map-marker-alt", title: "Lokasi", text: config.location },
  ];

  return (
    <section className="py-12 -mt-16 relative z-20 mb-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg border-b-4 border-fama-red flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-fama-blue/10 rounded-full flex items-center justify-center text-fama-blue text-2xl mb-4">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
