import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./pages/Hero";
import { InfoGrid } from "./components/InfoGrid";
import { About } from "./pages/About";
import { Agenda } from "./pages/Agenda";
import { Exhibitor } from "./pages/Exhibitor";
import { Register } from "./pages/Register";
import { Admin } from "./pages/Admin";
import { Lampiran } from "./pages/Lampiran";

// 1. TAMBAH IMPORT INI
import { Maklumbalas } from "./pages/Maklumbalas";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [registrations, setRegistrations] = useState([]); 
  
  const [config, setConfig] = useState({
      targetDate: "2025-12-14T15:00:00", 
      location: "ILF Port Dickson",
      dateRange: "14 - 17 Disember 2025"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleRegistration = (record) => {
    setRegistrations([...registrations, record]);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} config={config} />
            <InfoGrid config={config} />
          </>
        );
      case 'about': return <About />;
      case 'agenda': return <Agenda />;
      case 'exhibitor': return <Exhibitor />;
      case 'lampiran': return <Lampiran />;
      case 'register': return <Register onRegister={handleRegistration} />;
      case 'admin': return <Admin config={config} updateConfig={setConfig} registrations={registrations} />;
      
      // 2. TAMBAH CASE INI
      case 'maklumbalas': 
        return <Maklumbalas />;
        
      default:
        return <Hero onNavigate={setCurrentPage} config={config} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow pt-20"> {/* Tambah padding-top supaya tak kena tutup dengan navbar */}
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
