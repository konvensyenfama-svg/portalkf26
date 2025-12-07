
import React from "react";

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-fama-white">Konvensyen FAMA</h3>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Lembaga Pemasaran Pertanian Persekutuan (FAMA)<br/>
              Bangunan FAMA Point, Lot 17304,<br/>
              Jalan Persiaran 1, Bandar Baru Selayang,<br/>
              68100 Batu Caves, Selangor.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Pautan Pantas</h4>
            <ul className="space-y-2 text-gray-400">
              {['Utama', 'Tentatif', 'Pameran', 'Lampiran'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => onNavigate(item === 'Utama' ? 'home' : item.toLowerCase() === 'tentatif' ? 'agenda' : item.toLowerCase() === 'pameran' ? 'exhibitor' : 'lampiran')} 
                    className="hover:text-fama-red transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Hubungi Kami</h4>
            <div className="space-y-3 text-gray-400">
              <p><i className="fas fa-phone mr-2"></i> +603-6126 2020</p>
              <p><i className="fas fa-envelope mr-2"></i> info@fama.gov.my</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.facebook.com/FAMA.Malaysia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-fama-blue transition-colors"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/fama.malaysia/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/channel/UCA74nRDPdlW6bSKFObC2tMw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Lembaga Pemasaran Pertanian Persekutuan (FAMA). Hak Cipta Terpelihara.</p>
        </div>
      </div>
    </footer>
  );
};
