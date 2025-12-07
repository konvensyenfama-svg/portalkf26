
import React, { useState, useEffect } from "react";
import { supabaseUrl, supabaseKey } from "../config";

// Mapping for Session Times based on ID (since simple DB might not have time column)
const SESSION_METADATA = {
  "1": "19:30 - 21:00",
  "2": "21:00 - 22:30",
  "3": "08:45 - 10:30",
  "4": "11:00 - 13:00",
  "5": "14:30 - 17:30",
  "6": "20:30 - 22:30",
  "7": "09:00 - 13:15",
  "8": "14:30 - 17:30",
  "9": "20:00 - 22:30",
  "10": "09:00 - 13:00"
};

export const Admin = ({ config, updateConfig, registrations }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Session Manager State
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);

  // Local state for inputs
  const [formData, setFormData] = useState({
      targetDate: config.targetDate,
      location: config.location,
      dateRange: config.dateRange
  });

  // --- Auth & Initial Load ---

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "cytro") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("ID Pengguna atau Kata Laluan salah.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
        fetchSessions();
    }
  }, [isAuthenticated]);

  // --- Session Management Functions ---

  const fetchSessions = async () => {
    setLoadingSessions(true);
    // @ts-ignore
    if (window.supabase) {
        // @ts-ignore
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase
            .from('sessions')
            .select('*')
            .order('id', { ascending: true });
        
        if (data) {
            setSessions(data);
        } else if (error) {
            console.error("Error fetching sessions:", error);
        }
    }
    setLoadingSessions(false);
  };

  const toggleSession = async (id, currentStatus) => {
      // Optimistic UI Update
      const updatedSessions = sessions.map(s => 
          s.id === id ? { ...s, is_active: !currentStatus } : s
      );
      setSessions(updatedSessions);

      // @ts-ignore
      if (window.supabase) {
          // @ts-ignore
          const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
          const { error } = await supabase
            .from('sessions')
            .update({ is_active: !currentStatus })
            .eq('id', id);
          
          if (error) {
              console.error("Error updating session:", error);
              alert("Gagal mengemaskini status sesi. Sila cuba lagi.");
              fetchSessions(); // Revert on error
          } else {
              console.log("Status Updated");
          }
      }
  };

  // --- Existing Admin Functions ---

  const handleUpdate = (e) => {
      e.preventDefault();
      updateConfig(formData);
      alert("Tetapan berjaya dikemaskini!");
  };

  const handleFileUpload = (e) => {
      if (e.target.files.length > 0) {
          alert(`Fail "${e.target.files[0].name}" berjaya dimuat naik.`);
      }
  }

  const downloadCSV = () => {
    if (!registrations || registrations.length === 0) {
      alert("Tiada data pendaftaran untuk dimuat turun.");
      return;
    }

    const headers = ["Timestamp", "Hari", "Tarikh", "No Pekerja", "Nama", "Jawatan", "Penempatan"];
    const rows = registrations.map(row => [
      `"${row.timestamp}"`,
      `"${row.day}"`,
      `"${row.date}"`,
      `"${row.id}"`,
      `"${row.name}"`,
      `"${row.jawatan}"`,
      `"${row.penempatan}"`
    ]);

    const csvContent = [
      headers.join(","), 
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Laporan_Kehadiran_Konvensyen_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 py-20">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-fama-red">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Log Masuk Admin</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">ID Pengguna</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fama-blue focus:border-transparent"
                placeholder="Masukkan ID"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Kata Laluan</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fama-blue focus:border-transparent"
                placeholder="Masukkan Kata Laluan"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-fama-blue text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Log Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gray-800 text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <button 
                onClick={() => setIsAuthenticated(false)}
                className="text-sm bg-red-600 px-4 py-2 rounded hover:bg-red-700 font-bold"
            >
                Log Keluar
            </button>
        </div>
        
        <div className="p-8 grid md:grid-cols-2 gap-8">
            {/* Settings Form */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Tetapan Konvensyen</h3>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tarikh Sasaran (Countdown)</label>
                        <input 
                            type="datetime-local" 
                            value={formData.targetDate}
                            onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-fama-blue focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Paparan</label>
                        <input 
                            type="text" 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-fama-blue focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Julat Tarikh Paparan</label>
                        <input 
                            type="text" 
                            value={formData.dateRange}
                            onChange={(e) => setFormData({...formData, dateRange: e.target.value})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-fama-blue focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 shadow-md transition-all">
                        Simpan Perubahan
                    </button>
                </form>
            </div>

            {/* File Upload */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Pengurusan Fail</h3>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-8 hover:bg-gray-100 transition-colors">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600 mb-4">Muat naik fail dokumen atau gambar di sini</p>
                    <input 
                        type="file" 
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-fama-blue file:text-white
                        hover:file:bg-blue-700
                        cursor-pointer
                        "
                    />
                </div>
            </div>
        </div>
      </div>

      {/* NEW SECTION: Session Availability Manager */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        <div className="bg-fama-blue text-white p-6 flex justify-between items-center">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <i className="fas fa-list-check"></i> Pengurusan Sesi Pendaftaran
            </h3>
            <button onClick={fetchSessions} className="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded transition-colors shadow-sm font-medium border border-blue-500">
                <i className="fas fa-sync-alt mr-1"></i> Kemaskini
            </button>
        </div>
        <div className="p-0">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider border-b border-gray-200">
                        <tr>
                            <th className="p-4 w-16 text-center">ID</th>
                            <th className="p-4 w-32">Hari</th>
                            <th className="p-4">Nama Sesi</th>
                            <th className="p-4 w-40">Masa</th>
                            <th className="p-4 w-32 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {loadingSessions ? (
                            <tr><td colSpan={5} className="p-12 text-center text-gray-500"><i className="fas fa-circle-notch fa-spin mr-2 text-2xl"></i><br/>Memuatkan data sesi...</td></tr>
                        ) : sessions.length === 0 ? (
                            <tr><td colSpan={5} className="p-12 text-center text-gray-500 italic">Tiada sesi dijumpai dalam pangkalan data.</td></tr>
                        ) : (
                            sessions.map((session) => (
                                <tr key={session.id} className="hover:bg-blue-50/40 transition-colors group">
                                    <td className="p-4 text-center font-mono text-xs text-gray-400 font-bold">#{session.id}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold border uppercase ${
                                            session.day.includes('1') ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                            session.day.includes('2') ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            session.day.includes('3') ? 'bg-green-50 text-green-600 border-green-100' :
                                            'bg-orange-50 text-orange-600 border-orange-100'
                                        }`}>
                                            {session.day}
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold text-gray-800">{session.session_name}</td>
                                    <td className="p-4 text-gray-500 text-xs font-mono">
                                        <i className="far fa-clock mr-1 opacity-50"></i>
                                        {SESSION_METADATA[String(session.id)] || "N/A"}
                                    </td>
                                    <td className="p-4 text-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={!!session.is_active} 
                                                onChange={() => toggleSession(session.id, session.is_active)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 shadow-inner"></div>
                                        </label>
                                        <div className="text-[10px] font-bold uppercase mt-1 tracking-wider">
                                            {session.is_active ? <span className="text-green-600">Dibuka</span> : <span className="text-gray-400">Ditutup</span>}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Attendance Data Section (Existing) */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-users"></i> Laporan Kehadiran
          </h3>
        </div>
        <div className="p-8">
           <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <div className="flex-1 w-full md:w-auto relative">
                <input 
                    type="text" 
                    placeholder="Cari nama atau ID..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-fama-blue focus:border-transparent outline-none"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <button 
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center shadow-md"
              >
                <i className="fas fa-file-csv mr-2"></i> Muat Turun CSV
              </button>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider border-b border-gray-200">
                    <tr>
                        <th className="p-4">Masa</th>
                        <th className="p-4">Hari</th>
                        <th className="p-4">ID</th>
                        <th className="p-4">Nama</th>
                        <th className="p-4">Jawatan</th>
                        <th className="p-4">Penempatan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {registrations && registrations.length > 0 ? (
                        registrations.map((reg, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 whitespace-nowrap text-gray-500 font-mono text-xs">
                                    {new Date(reg.timestamp).toLocaleString('ms-MY')}
                                </td>
                                <td className="p-4">
                                    <span className="inline-block px-2 py-1 rounded text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase">
                                        {reg.day}
                                    </span>
                                </td>
                                <td className="p-4 font-bold text-gray-700">{reg.id}</td>
                                <td className="p-4 font-semibold text-gray-900">{reg.name}</td>
                                <td className="p-4 text-gray-600 text-xs">{reg.jawatan}</td>
                                <td className="p-4 text-gray-600 text-xs max-w-xs truncate">{reg.penempatan}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                                Tiada rekod pendaftaran.
                            </td>
                        </tr>
                    )}
                </tbody>
             </table>
           </div>
           
           <div className="mt-4 text-right text-xs text-gray-400">
               Jumlah Pendaftaran: {registrations ? registrations.length : 0}
           </div>
        </div>
      </div>
    </div>
  );
};
