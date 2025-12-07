import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey } from "../config"; // Pastikan path ni betul

// Initialize client
const supabase = createClient(supabaseUrl, supabaseKey);

export const Admin = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Function tarik data
  const fetchSessions = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      // Kita tarik semua column (*) dan susun ikut ID supaya kemas
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        console.log("Data Sesi Diterima:", data); // Boleh check console nanti
        setSessions(data);
      }
    } catch (err: any) {
      console.error("Error fetching:", err);
      setErrorMsg(err.message || "Ralat tidak diketahui.");
    } finally {
      setLoading(false);
    }
  };

  // Jalan sekali masa page load
  useEffect(() => {
    fetchSessions();
  }, []);

  // Function toggle Active/Inactive
  const toggleStatus = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from('sessions')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (!error) fetchSessions(); // Refresh lepas update
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-fama-blue">Admin Panel</h1>
        <button 
          onClick={fetchSessions} 
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2"
        >
          <i className="fas fa-sync-alt"></i> Refresh Data
        </button>
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
                      {/* Guna column 'date' kalau ada, kalau takde guna '-' */}
                      <div className="text-xs text-gray-500">{sesi.date || "-"}</div>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {sesi.session_name}
                    </td>
                    <td className="p-4 text-gray-600 whitespace-nowrap">
                      {/* Guna column 'time' ATAU 'time_range' */}
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
