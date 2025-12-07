import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from "../config";

// --- CONFIGURATION ---
// TUKAR PASSWORD KAT SINI
const ADMIN_PASSWORD = "cytro"; 

// Initialize client
const supabase = createClient(supabaseUrl, supabaseKey);

export const Admin = () => {
  // State untuk Security
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPass, setInputPass] = useState("");

  // State untuk Data
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // --- FUNCTION LOGIN ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPass === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchSessions(); // Tarik data lepas login berjaya
    } else {
      alert("Password salah! Sila cuba lagi.");
      setInputPass("");
    }
  };

  // --- FUNCTION TARIK DATA ---
  const fetchSessions = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      if (data) setSessions(data);
      
    } catch (err: any) {
      console.error("Error fetching:", err);
      setErrorMsg(err.message || "Ralat tidak diketahui.");
    } finally {
      setLoading(false);
    }
  };

  // --- FUNCTION TOGGLE STATUS ---
  const toggleStatus = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from('sessions')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (!error) fetchSessions();
  };

  // --- RENDER: LOGIN SCREEN (Kalau belum login) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
          <div className="text-center mb-6">
            <i className="fas fa-user-shield text-5xl text-fama-blue mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-500 text-sm">Portal Konvensyen FAMA</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Kata Laluan</label>
              <input 
                type="password" 
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-fama-blue focus:ring-1 focus:ring-fama-blue transition-all"
                placeholder="Masukkan password..."
                autoFocus
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-fama-blue text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors shadow-md"
            >
              Masuk Sistem
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER: DASHBOARD (Kalau dah login) ---
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-fama-blue">Admin Panel</h1>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-green-400">Verified</span>
        </div>
        
        <div className="flex gap-2">
            <button 
            onClick={fetchSessions} 
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded flex items-center gap-2 shadow-sm"
            >
            <i className="fas fa-sync-alt"></i> Refresh
            </button>
            <button 
            onClick={() => setIsAuthenticated(false)} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 shadow-sm"
            >
            <i className="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
      </div>

      {/* --- BAHAGIAN SESI --- */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
        <div className="bg-fama-blue p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-lg"><i className="fas fa-list mr-2"></i> Pengurusan Sesi Pendaftaran</h3>
          <span className="text-xs bg-blue-800 px-2 py-1 rounded">Total: {sessions.length}</span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              <i className="fas fa-spinner fa-spin fa-2x mb-2"></i><br/>Sedang memuatkan data...
            </div>
          ) : errorMsg ? (
            <div className="p-8 text-center text-red-500 bg-red-50">
              <i className="fas fa-exclamation-triangle fa-2x mb-2"></i><br/>Error: {errorMsg}
            </div>
          ) : sessions.length === 0 ? (
            <div className="p-8 text-center text-gray-500 italic">
              Tiada sesi dijumpai dalam pangkalan data.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-bold">
                <tr>
                  <th className="p-4 border-b">ID</th>
                  <th className="p-4 border-b">Hari / Tarikh</th>
                  <th className="p-4 border-b">Nama Sesi</th>
                  <th className="p-4 border-b">Masa</th>
                  <th className="p-4 border-b text-center">Status</th>
                  <th className="p-4 border-b text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {sessions.map((sesi) => (
                  <tr key={sesi.id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-mono text-gray-400">#{sesi.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{sesi.day}</div>
                      <div className="text-xs text-gray-500">{sesi.date || "-"}</div>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {sesi.session_name}
                    </td>
                    <td className="p-4 text-gray-600 whitespace-nowrap">
                      <i className="far fa-clock mr-1 text-fama-blue"></i> 
                      {sesi.time || sesi.time_range || "Tiada Masa"}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${sesi.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {sesi.is_active ? 'AKTIF' : 'TUTUP'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => toggleStatus(sesi.id, sesi.is_active)}
                        className={`text-xs px-3 py-1 rounded border transition-all ${sesi.is_active ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                      >
                        {sesi.is_active ? 'Matikan' : 'Aktifkan'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
