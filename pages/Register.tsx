import React, { useState, useEffect } from "react";
import { PageHeader } from "../components/PageHeader";
import { staffData } from "../data/staffData";
import { supabaseUrl, supabaseKey } from "../config";
import { createClient } from '@supabase/supabase-js';

// --- Initialize Supabase Client ---
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Geofencing Configuration ---
const TARGET_LAT = 2.42027; // Venue Latitude (ILF Port Dickson)
const TARGET_LONG = 101.89122; // Venue Longitude
const ALLOWED_RADIUS_KM = 0.05; // Allowed radius in KM

// --- Helper Functions for Distance Calculation ---
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; 
  return d;
};

// --- Fallback Metadata (UPDATED: 27 SESI IKUT TEKS TERKINI) ---
const FALLBACK_METADATA: any = {
  // HARI 1 - AHAD (14 DIS)
  "1": { time: "15:00 - 18:00", date: "2025-12-14" }, // Daftar Masuk
  "2": { time: "18:30 - 19:30", date: "2025-12-14" }, // Makan Malam
  "3": { time: "19:30 - 21:00", date: "2025-12-14" }, // Program Kerohanian
  "4": { time: "21:00 - 22:30", date: "2025-12-14" }, // Motivasi
  "5": { time: "22:30 - 23:30", date: "2025-12-14" }, // Taklimat & Minum Malam

  // HARI 2 - ISNIN (15 DIS)
  "6": { time: "08:00 - 09:00", date: "2025-12-15" }, // Taklimat NGO
  "7": { time: "09:00 - 10:30", date: "2025-12-15" }, // Perasmian
  "8": { time: "10:30 - 11:00", date: "2025-12-15" }, // Minum Pagi
  "9": { time: "11:00 - 13:00", date: "2025-12-15" }, // Forum BoD
  "10": { time: "13:00 - 14:30", date: "2025-12-15" }, // Rehat Tengahari
  "11": { time: "14:30 - 15:30", date: "2025-12-15" }, // Amanat KP
  "12": { time: "15:30 - 17:30", date: "2025-12-15" }, // RMK-13
  "13": { time: "20:30 - 22:30", date: "2025-12-15" }, // Pembentangan Projek
  "14": { time: "22:30 - 23:00", date: "2025-12-15" }, // Minum Malam (H2)

  // HARI 3 - SELASA (16 DIS)
  "15": { time: "09:00 - 11:00", date: "2025-12-16" }, // Pitching 1
  "16": { time: "11:00 - 11:15", date: "2025-12-16" }, // Minum Pagi (H3)
  "17": { time: "11:15 - 13:15", date: "2025-12-16" }, // Pitching 2
  "18": { time: "13:15 - 14:30", date: "2025-12-16" }, // Rehat Tengahari (H3)
  "19": { time: "14:30 - 17:30", date: "2025-12-16" }, // Pitching Akhir
  "20": { time: "17:30 - 18:30", date: "2025-12-16" }, // Minum Petang
  "21": { time: "20:00 - 22:30", date: "2025-12-16" }, // Malam Prestij

  // HARI 4 - RABU (17 DIS)
  "22": { time: "09:00 - 10:00", date: "2025-12-17" }, // iFAMA
  "23": { time: "10:00 - 10:30", date: "2025-12-17" }, // Minum Pagi (H4)
  "24": { time: "10:30 - 11:15", date: "2025-12-17" }, // Aspirasi Pengerusi
  "25": { time: "11:15 - 12:15", date: "2025-12-17" }, // Watikah & Hadiah
  "26": { time: "12:15 - 13:00", date: "2025-12-17" }, // Resolusi
  "27": { time: "13:00 - 14:00", date: "2025-12-17" }  // Makan & Bersurai
};

export const Register = ({ onRegister }: any) => {
  const [dbSessions, setDbSessions] = useState<any[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  
  const [formData, setFormData] = useState({ id: '', name: '', jawatan: '', penempatan: '', fama_negeri: '' });
  const [status, setStatus] = useState('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [geoStatus, setGeoStatus] = useState('idle');
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });

  // --- Fetch Sessions on Mount ---
  useEffect(() => {
    const fetchActiveSessions = async () => {
        setLoadingSessions(true);
        
        const { data, error } = await supabase
            .from('sessions')
            .select('*')
            .eq('is_active', true)
            .order('id', { ascending: true });

        if (data) {
            const formatted = data.map((item: any) => {
                const meta = FALLBACK_METADATA[item.id] || {};
                return {
                    id: item.id.toString(),
                    label: item.session_name,
                    day: item.day,
                    time: meta.time || "Masa belum ditetapkan",
                    date: meta.date || "2025-01-01"
                };
            });
            setDbSessions(formatted);
        } else if (error) {
            console.error("Error fetching sessions:", error);
        }
        
        setLoadingSessions(false);
    };

    fetchActiveSessions();
  }, []);

  const handleIdChange = (e: any) => {
    const val = e.target.value.toUpperCase();
    setFormData(prev => ({ ...prev, id: val }));

    // Syarat: Mula mencari bila ada 4 atau lebih karakter
    if (val.length >= 4) {
      const found = staffData.find((s: any) => s.id === val || s.id.endsWith(val));
      
      if (found) {
        setFormData({ 
            id: found.id,              
            name: found.name,          
            jawatan: found.jawatan, 
            penempatan: found.penempatan,
            fama_negeri: found.wing_negeri || '' 
        });
        setStatus('found');
      } else {
         if (val.length >= 4) {
            setStatus('not_found');
            setFormData(prev => ({ ...prev, name: '', jawatan: '', penempatan: '', fama_negeri: '' }));
         } else {
            setStatus('idle');
         }
      }
    } else {
      setStatus('idle');
      setFormData(prev => ({ ...prev, name: '', jawatan: '', penempatan: '', fama_negeri: '' }));
    }
  };

  const handleDayChange = (e: any) => {
      setSelectedDay(e.target.value);
      setSelectedSessions([]);
  };

  const handleCheckboxChange = (sessionId: string) => {
    setSelectedSessions(prev => {
      if (prev.includes(sessionId)) {
        return prev.filter(id => id !== sessionId);
      } else {
        return [...prev, sessionId];
      }
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert("Sila pastikan data staf ditemui sebelum menghantar.");
      return;
    }

    if (selectedSessions.length === 0) {
      alert("Sila pilih sekurang-kurangnya satu sesi.");
      return;
    }

    if (status === 'found') {
      setIsSubmitting(true);
      setGeoStatus('locating');

      if (!navigator.geolocation) {
          alert("Pelayar anda tidak menyokong geolokasi.");
          setIsSubmitting(false);
          setGeoStatus('idle');
          return;
      }

      navigator.geolocation.getCurrentPosition(
          (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const distance = calculateDistance(lat, lng, TARGET_LAT, TARGET_LONG);
              
              if (distance > ALLOWED_RADIUS_KM) {
                  alert("Maaf, anda berada di luar kawasan konvensyen.");
                  setIsSubmitting(false);
                  setGeoStatus('idle');
                  return;
              }

              setCoords({ latitude: String(lat), longitude: String(lng) });
              submitAllSessions(lat, lng);
          },
          (error) => {
              console.error("Geolocation error:", error);
              alert("Sila benarkan akses lokasi.");
              setIsSubmitting(false);
              setGeoStatus('idle');
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  const submitAllSessions = async (latitude: number, longitude: number) => {
      setGeoStatus('submitting');
      
      let successCount = 0;
      let failCount = 0;
      let errorMessages: string[] = [];

      for (const sessionId of selectedSessions) {
          const sessionDetails = dbSessions.find(s => s.id === sessionId);
          if (!sessionDetails) continue;

          const cleanLat = (latitude !== null && latitude !== undefined) ? Number(latitude) : null;
          const cleanLng = (longitude !== null && longitude !== undefined) ? Number(longitude) : null;

          const payload = {
            no_pekerja: formData.id,
            nama: formData.name,
            jawatan: formData.jawatan,
            penempatan: formData.penempatan,
            wing_negeri: formData.fama_negeri,
            
            // PENTING: Guna 'tarikh_kehadir' ikut column DB
            tarikh_kehadiran: sessionDetails.date, 
            
            sesi: sessionDetails.label,
            waktu_sesi: sessionDetails.time,
            latitude: cleanLat,
            longitude: cleanLng
          };

          try {
            const { error } = await supabase
              .from('pendaftaran')
              .insert([payload]);

            if (error) {
               if (error.code === '23505') {
                   errorMessages.push(`Sesi ${sessionDetails.label}: Sudah didaftarkan.`);
               } else {
                   throw error;
               }
               failCount++;
            } else {
               successCount++;
               onRegister({
                  ...payload,
                  id: formData.id,
                  day: sessionDetails.day,
                  timestamp: new Date().toISOString()
               });
            }
          } catch (err) {
            console.error(`Error registering session ${sessionId}:`, err);
            failCount++;
            errorMessages.push(`Sesi ${sessionDetails.label}: Ralat sistem.`);
          }
      }

      setIsSubmitting(false);
      setGeoStatus('idle');

      if (successCount > 0) {
          setStatus('submitted');
          if (failCount > 0) {
              alert(`Pendaftaran separa berjaya.\nBerjaya: ${successCount}\nGagal: ${failCount}\n\nInfo:\n${errorMessages.join('\n')}`);
          }
      } else {
          if (errorMessages.length > 0) {
              alert(`Pendaftaran gagal:\n${errorMessages.join('\n')}`);
          } else {
              alert("Ralat semasa mendaftar.");
          }
      }
  };

  const resetForm = () => {
    setFormData({ id: '', name: '', jawatan: '', penempatan: '', fama_negeri: '' });
    setStatus('idle');
    setCoords({ latitude: '', longitude: '' });
    setSelectedSessions([]);
    setSelectedDay("");
  };

  const uniqueDays = Array.from(new Set(dbSessions.map(s => JSON.stringify({ date: s.date, day: s.day }))))
    .map((str: any) => JSON.parse(str))
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <>
      <PageHeader title="Pendaftaran Kehadiran" subtitle="Masukkan No. Pekerja, Pilih Tarikh dan Sesi" />
      <section className="py-12 bg-white animate-fade-in min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-fama-blue p-6 text-white text-center">
                <h3 className="text-xl font-bold">Borang Kehadiran Digital</h3>
                <p className="opacity-80 text-sm">Konvensyen FAMA 2026</p>
            </div>

            <div className="p-6 md:p-8">
                {status === 'submitted' ? (
                    <div className="text-center py-8 animate-fade-in">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <i className="fas fa-check text-4xl text-green-600"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Pendaftaran Berjaya!</h3>
                      <p className="text-gray-600 mb-6">
                        Kehadiran <strong>{formData.name}</strong> telah direkodkan.
                      </p>
                      <button onClick={resetForm} className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors shadow-lg">
                        Daftar Seterusnya
                      </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                          <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Langkah 1: No. Pekerja</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.id}
                                    onChange={handleIdChange}
                                    className={`w-full p-4 pl-12 text-lg tracking-widest border-2 rounded-xl focus:outline-none transition-colors uppercase ${
                                        status === 'not_found' ? 'border-red-300 bg-red-50 text-red-700' :
                                        status === 'found' ? 'border-green-500 bg-green-50 text-green-800' :
                                        'border-gray-300 focus:border-fama-blue'
                                    }`}
                                    placeholder="Contoh: P1403"
                                    maxLength={10}
                                    disabled={isSubmitting}
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <i className="fas fa-id-card text-xl"></i>
                                </div>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    {status === 'searching' && <i className="fas fa-spinner fa-spin text-gray-400"></i>}
                                    {status === 'found' && <i className="fas fa-check-circle text-green-500 text-xl animate-bounce"></i>}
                                    {status === 'not_found' && <i className="fas fa-times-circle text-red-500 text-xl"></i>}
                                </div>
                            </div>
                            
                            {/* ERROR MSG BOX */}
                            {status === 'not_found' && (
                                <div className="mt-3 p-4 bg-red-100 border border-red-200 rounded-xl flex items-start space-x-3 animate-fade-in">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-exclamation-triangle text-red-600 text-xl mt-0.5"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-red-800 text-sm">Maaf, pendaftaran gagal.</h4>
                                        <p className="text-red-700 text-sm mt-1">
                                            Anda tidak didaftarkan sebagai peserta Konvensyen FAMA 2026.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className={`transition-all duration-500 ${status === 'found' ? 'opacity-100 translate-y-0' : 'opacity-50 grayscale'}`}>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nama Penuh</label>
                                    <div className="font-bold text-gray-800 text-lg border-b border-gray-200 pb-1">{formData.name || "-"}</div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Jawatan</label>
                                        <div className="font-medium text-gray-700 text-sm border-b border-gray-200 pb-1">{formData.jawatan || "-"}</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Wing/FAMA Negeri</label>
                                        <div className="font-medium text-gray-700 text-sm border-b border-gray-200 pb-1">{formData.fama_negeri || "-"}</div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pejabat Bertugas</label>
                                        <div className="font-medium text-gray-700 text-sm border-b border-gray-200 pb-1">{formData.penempatan || "-"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 ${status === 'found' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Langkah 2: Pilih Tarikh Kehadiran</label>
                                <div className="relative">
                                    <select
                                        value={selectedDay}
                                        onChange={handleDayChange}
                                        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-fama-blue"
                                        disabled={loadingSessions}
                                    >
                                        <option value="">{loadingSessions ? "Memuatkan sesi..." : "-- Sila Pilih Tarikh --"}</option>
                                        {!loadingSessions && uniqueDays.map((d: any) => (
                                            <option key={d.date} value={d.date}>{d.day} ({new Date(d.date).toLocaleDateString('ms-MY', { day: '2-digit', month: 'short' })})</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className={`block text-gray-700 text-sm font-bold mb-3 ${!selectedDay ? 'opacity-50' : ''}`}>Langkah 3: Pilih Sesi</label>
                                {loadingSessions ? (
                                    <div className="text-center p-6 bg-gray-50 rounded-xl text-gray-500"><i className="fas fa-spinner fa-spin mr-2"></i> Sedang mengemaskini sesi...</div>
                                ) : (
                                    <div className={`bg-gray-50 border border-gray-200 rounded-xl overflow-hidden ${selectedDay ? 'block' : 'hidden'}`}>
                                        {dbSessions.filter(s => s.date === selectedDay).map((session, index, arr) => (
                                            <label key={session.id} className={`flex items-start p-4 cursor-pointer hover:bg-blue-50 transition-colors ${index !== arr.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                                <div className="flex items-center h-5 mt-1">
                                                    <input type="checkbox" name="selected_sessions" value={session.id} checked={selectedSessions.includes(session.id)} onChange={() => handleCheckboxChange(session.id)} className="w-5 h-5 text-fama-blue border-gray-300 rounded focus:ring-fama-blue"/>
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <span className="block text-gray-900 font-bold">{session.label}</span>
                                                    <span className="block text-gray-500 text-xs mt-0.5"><i className="far fa-clock mr-1"></i> {session.time}</span>
                                                </div>
                                            </label>
                                        ))}
                                        {dbSessions.filter(s => s.date === selectedDay).length === 0 && (
                                            <div className="p-4 text-center text-gray-400 italic text-sm">Tiada sesi aktif.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button type="submit" disabled={status !== 'found' || isSubmitting || selectedSessions.length === 0} className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform flex justify-center items-center ${status === 'found' && selectedSessions.length > 0 ? 'bg-fama-red text-white hover:bg-red-700 hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                            {isSubmitting ? (geoStatus === 'locating' ? <><i className="fas fa-map-marker-alt fa-spin mr-2"></i> Mengesan lokasi...</> : <><i className="fas fa-circle-notch fa-spin mr-2"></i> Mendaftar...</>) : <><i className="fas fa-paper-plane mr-2"></i> Hantar Kehadiran</>}
                        </button>
                    </form>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
