import React, { useState, useEffect } from "react";

export const Navbar = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // TAMBAH 'Maklumbalas' DALAM ARRAY INI
  const navLinks = [
    { name: "Utama", id: "home" },
    { name: "Objektif", id: "about" },
    { name: "Tentatif", id: "agenda" },
    { name: "Pameran", id: "exhibitor" },
    { name: "Lampiran", id: "lampiran" },
    { name: "Maklumbalas", id: "maklumbalas" }, // <-- Link baru ditambah di sini
    { name: "Admin", id: "admin" },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || currentPage !== 'home' ? "bg-white shadow-md py-2" : "bg-white md:bg-white/95 backdrop-blur-sm py-4 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="h-16 w-auto flex items-center justify-center">
             <img src="https://i.imgur.com/YIyHLEx.png" alt="Jata Negara" className="h-16 w-auto object-contain drop-shadow-sm" />
          </div>
          <div className="h-14 w-auto flex items-center">
             <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/FAMA_logo.png" alt="FAMA Logo" className="h-14 w-auto object-contain" />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className={`font-medium transition-colors text-sm uppercase tracking-wide ${
                currentPage === link.id ? "text-fama-red font-bold" : "text-gray-700 hover:text-fama-red"
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('register')}
            className="bg-[#800000] hover:bg-[#600000] text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg hover:shadow-red-900/30 transform hover:-translate-y-0.5 text-sm"
          >
            Daftar Kehadiran
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl left-0">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className={`text-left font-medium p-2 ${currentPage === link.id ? "text-fama-red" : "text-gray-700 hover:text-fama-red"}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('register')}
              className="bg-[#800000] text-white text-center py-3 rounded-lg font-bold"
            >
              Daftar Kehadiran
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
