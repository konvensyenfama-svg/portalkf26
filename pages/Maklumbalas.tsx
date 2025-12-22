import React, { useState } from "react";
import { supabase } from "../supabaseClient"; 

export const Maklumbalas = () => {
  // State Maklumat Peserta
  const [noId, setNoId] = useState("");
  const [peserta, setPeserta] = useState({ nama: "", jawatan: "", penempatan: "" });
  
  // State Borang
  const [kategori, setKategori] = useState("");
  const [ulasan, setUlasan] = useState("");
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FUNGSI AUTO-DETECT & AUTO-FILL
  const handleLookup = async (id: string) => {
    // 1. Bersihkan input: Buang space & jadikan Huruf Besar
    let searchId = id.trim().toUpperCase();
    
    // 2. Logik Pintar: Jika user taip nombor sahaja (cth: 4051), tambah 'P' di depan
    if (searchId && !isNaN(Number(searchId.charAt(0)))) {
      searchId = 'P' + searchId;
    }

    // Hanya cari jika panjang ID munasabah (P + sekurang-kurangnya 1 nombor)
    if (searchId.length < 2) {
      setPeserta({ nama: "", jawatan: "", penempatan: "" });
      return;
    }

    setSearching(true);
    
    // Cari data peserta dari table staf_fama
    const { data, error } = await supabase
      .from('staf_fama')
      .select('nama, jawatan, penempatan')
      .eq('no_id', searchId)
      .maybeSingle();

    if (data) {
      setPeserta({
        nama: data.nama,
        jawatan: data.jawatan,
        penempatan: data.penempatan
      });
    } else {
      setPeserta({ nama: "", jawatan: "", penempatan: "" });
    }
    setSearching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simpan maklumat ke table maklumbalas_program
    const { error } = await supabase
      .from('maklumbalas_program')
      .insert([
        { 
          no_id: noId.toUpperCase(), 
          nama: peserta.nama, 
          jawatan: peserta.jawatan, 
          penempatan: peserta.penempatan,
          kategori: kategori,
          ulasan: ulasan,
          tarikh: new Date().toISOString()
        }
      ]);

    if (error) {
      alert("Gagal menghantar: " + error.message);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  // Fungsi untuk tukar password visibility (Jika kau nak guna input IC juga di sini nanti)
  const [showPass, setShowPass] = useState(false);

  if (submitted) {
    return (
      <div className="py-20 text-center animate-fade-in px-4">
        <div className="bg-green-50 text-green-700 p-10 rounded-3xl inline-block border-2 border-green-200 shadow-2xl">
          <i className="fas fa-check-circle text-6xl mb-4"></i>
          <h2 className="text-3xl font-bold">Berjaya Dihantar!</h2>
          <p className="mt-2 text-lg italic">"Terima kasih {peserta.nama.split(' ')[0]}, atas maklumbalas yang diberikan."</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition-all"
          >
            Hantar Maklumbalas Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      
      {/* Box Tujuan Maklumbalas */}
      <div className="bg-gradient-to-br from-[#0054A6] to-[#003d7a] text-white p-8 rounded-3xl shadow-xl mb-10 border-b-4 border-yellow-400">
        <div className="flex items-start gap-4">
          <i className="fas fa-bullhorn text-3xl mt-1 text-yellow-400"></i>
          <div>
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">Tujuan Maklumbalas Program</h2>
            <p className="text-blue-50 leading-relaxed opacity-90">
              Borang Maklumbalas ini bertujuan untuk mendapatkan cadangan dan pandangan peserta berkaitan pelaksanaan Konvensyen FAMA 2026 yang lepas bagi penambahbaikan untuk Konvensyen yang akan datang. Segala maklumbalas anda adalah dirahsiakan dan akan dianalisis secara profesional oleh pihak Urus Setia dan Pengurusan FAMA.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
          
          {/* SEKSYEN 1: DATA PESERTA */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-gray-100 pb-4">
              <span className="bg-fama-red text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Maklumat Peserta</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">No. Pekerja</label>
                <input
                  type="text"
                  required
                  placeholder="Cth: P4051 atau 4051"
                  className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 outline-none font-bold uppercase transition-all"
                  value={noId}
                  onChange={(e) => {
                    setNoId(e.target.value);
                    handleLookup(e.target.value);
                  }}
                />
                {searching && <i className="fas fa-spinner fa-spin absolute right-4 bottom-5 text-blue-500"></i>}
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Nama Penuh</label>
                <input type="text" readOnly value={peserta.nama} className="w-full p-4 bg-gray-100 border-2 border-transparent rounded-2xl text-gray-700 font-bold" placeholder="..." />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Jawatan</label>
                <input type="text" readOnly value={peserta.jawatan} className="w-full p-4 bg-gray-100 border-2 border-transparent rounded-2xl text-gray-600" placeholder="..." />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Penempatan</label>
                <input type="text" readOnly value={peserta.penempatan} className="w-full p-4 bg-gray-100 border-2 border-transparent rounded-2xl text-gray-600" placeholder="..." />
              </div>
            </div>
          </div>

          {/* SEKSYEN 2: MAKLUMBALAS */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-gray-100 pb-4">
              <span className="bg-fama-red text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Penilaian Program</h3>
            </div>

            <div className="relative">
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Kategori Maklumbalas</label>
              <select
                required
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 outline-none appearance-none font-semibold text-gray-700 cursor-pointer"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="">-- Sila Pilih Kategori --</option>
                <optgroup label="1. Logistik">
                  <option value="Logistik - Penginapan">1.1 Penginapan</option>
                  <option value="Logistik - Makan/Minum">1.2 Makan/Minum</option>
                  <option value="Logistik - Pengangkutan">1.3 Pengangkutan</option>
                  <option value="Logistik - Dewan Konvensyen">1.4 Dewan Konvensyen</option>
                </optgroup>
                <option value="2. Urusetia Konvensyen">2. Urusetia Konvensyen</option>
                <option value="3. Pengisian Program">3. Pengisian Program</option>
                <option value="4. Cadangan Penambahbaikan & Idea Baharu">4. Cadangan Penambahbaikan & Idea Baharu</option>
              </select>
              <i className="fas fa-chevron-down absolute right-5 bottom-5 text-gray-400 pointer-events-none"></i>
            </div>

            <div className="relative">
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Ulasan Maklumbalas</label>
              <textarea
                required
                rows={5}
                placeholder="Berikan ulasan, teguran atau idea anda di sini..."
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 outline-none transition-all"
                value={ulasan}
                onChange={(e) => setUlasan(e.target.value)}
              ></textarea>
              {/* Simbol Mata untuk IC (Jika kau letak input IC nanti, logiknya dah ada di sini) */}
              {/* <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'} absolute right-4 top-10 cursor-pointer`} onClick={() => setShowPass(!showPass)}></i> */}
            </div>

            <button
              type="submit"
              disabled={loading || !peserta.nama || !kategori}
              className="w-full bg-[#28a745] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-green-700 hover:scale-[1.01] active:scale-95 transition-all disabled:bg-gray-300 disabled:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-circle-notch fa-spin"></i> Sedang Menghantar...
                </span>
              ) : "Hantar Maklumbalas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};