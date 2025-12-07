
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

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [registrations, setRegistrations] = useState([]); // State to store registration data
  
  // Centralized Configuration State (modifiable by Admin)
  const [config, setConfig] = useState({
      targetDate: "2025-12-14T15:00:00", // Default Date: 14 Dec 2025, 3pm
      location: "ILF Port Dickson",
      dateRange: "14 - 17 Disember 2025"
  });

  // GOOGLE APPS SCRIPT URL for Excel Database
  // Replace this with your deployed Web App URL
  const GOOGLE_APPS_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbyu03-c40tqK2j8D4p_L9C-lT4zJb5j9tW0x_E_R7z_xH-k_R9_g0_l3_j5_n4_m2_o/exec"; // Placeholder, user needs to update this

  // Scroll to top on page change
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
      case 'about':
        return <About />;
      case 'agenda':
        return <Agenda />;
      case 'exhibitor':
        return <Exhibitor />;
      case 'lampiran':
        return <Lampiran />;
      case 'register':
        return <Register onRegister={handleRegistration} />;
      case 'admin':
        return <Admin config={config} updateConfig={setConfig} registrations={registrations} />;
      default:
        return <Hero onNavigate={setCurrentPage} config={config} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
