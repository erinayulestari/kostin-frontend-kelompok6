import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Home, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  Save, 
  Send 
} from "lucide-react";

import Stepper from "../../components/owner/Stepper";
import FileUploader from "../../components/owner/FileUploader";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "../../styles/owner/verifikasi.css";

export default function VerifikasiPemilik() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [nama, setNama] = useState(user?.nama || "");
  const [nik, setNik] = useState(user?.nik || "");
  const [noHp, setNoHp] = useState(user?.no_hp || "");
  const [alamat, setAlamat] = useState(user?.alamat || "");
  
  const [namaKos, setNamaKos] = useState("");
  const [alamatKos, setAlamatKos] = useState("");
  const [kota, setKota] = useState("makassar");
  const [provinsi, setProvinsi] = useState("sulsel");
  const [jumlahKamar, setJumlahKamar] = useState(5);

  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setNama(user.nama || "");
      setNoHp(user.no_hp || "");
      setAlamat(user.alamat || "");
    }
  }, [user]);

  const handleSubmitVerifikasi = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Harap centang persetujuan kebenaran data.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      // Update profile info in backend
      const res = await api.put('/profile', {
        nama,
        no_hp: noHp,
        alamat,
      });

      if (res.data) {
        updateProfile(res.data);
      }

      alert("Data verifikasi pemilik berhasil dikirim! Tim Kostin akan meninjau pengajuan Anda.");
      navigate("/owner/dashboard");
    } catch (err) {
      console.error("Gagal kirim verifikasi:", err);
      setError(err.message || "Gagal mengirim data verifikasi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="verifikasi-container">
      <div className="verifikasi-wrapper">

        {/* ==========================================
            HEADER & STEPPER
           ========================================== */}
        <div className="verifikasi-header">
          <div className="brand-logo" onClick={() => navigate('/owner/dashboard')} style={{ cursor: 'pointer' }}>
            <Home size={28} color="#0066ff" />
            <span>Kostin</span>
          </div>
          <h1 className="verifikasi-title">Verifikasi Pemilik Kost</h1>
          <p className="verifikasi-subtitle">
            Sebelum mulai mengelola kost Anda, kami perlu memverifikasi identitas dan informasi properti untuk menjaga keamanan serta kepercayaan seluruh pengguna.
          </p>

          <Stepper currentStep={1} />
        </div>

        {error && (
          <div style={{ color: "#ef4444", backgroundColor: "#fee2e2", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        {/* ==========================================
            FORM CARD CONTAINER
           ========================================== */}
        <form onSubmit={handleSubmitVerifikasi} className="form-card">
          <div className="form-grid">

            {/* KOLOM KIRI: INFORMASI PEMILIK */}
            <div>
              <div className="section-title">
                <User size={18} color="#0066ff" />
                <span>Informasi Pemilik</span>
              </div>

              <div className="form-group">
                <label>Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama lengkap sesuai KTP" 
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nomor KTP / NIK</label>
                <input 
                  type="text" 
                  placeholder="Masukkan 16 digit NIK" 
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Nomor Telepon</label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="08xxxxxxxxxx" 
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Alamat</label>
                <textarea 
                  rows="3" 
                  placeholder="Masukkan alamat sesuai KTP" 
                  style={{ fontFamily: "inherit" }}
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                ></textarea>
              </div>

              <FileUploader 
                label="Upload Foto KTP" 
                sublabel="Pastikan foto jelas dan tidak buram." 
              />
            </div>

            {/* KOLOM KANAN: INFORMASI KOST */}
            <div>
              <div className="section-title">
                <Home size={18} color="#0066ff" />
                <span>Informasi Kost</span>
              </div>

              <div className="form-group">
                <label>Nama Kost</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Kost Melati" 
                  value={namaKos}
                  onChange={(e) => setNamaKos(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Alamat Kost</label>
                <textarea 
                  rows="2" 
                  placeholder="Masukkan alamat lengkap kost" 
                  style={{ fontFamily: "inherit" }}
                  value={alamatKos}
                  onChange={(e) => setAlamatKos(e.target.value)}
                ></textarea>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label>Kota</label>
                  <select value={kota} onChange={(e) => setKota(e.target.value)}>
                    <option value="makassar">Makassar</option>
                    <option value="jakarta">Jakarta</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Provinsi</label>
                  <select value={provinsi} onChange={(e) => setProvinsi(e.target.value)}>
                    <option value="sulsel">Sulawesi Selatan</option>
                    <option value="dki">DKI Jakarta</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Jumlah Kamar</label>
                <div className="input-with-icon">
                  <Home size={16} className="input-icon" />
                  <input 
                    type="number" 
                    placeholder="Masukkan jumlah kamar" 
                    value={jumlahKamar}
                    onChange={(e) => setJumlahKamar(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <FileUploader label="Foto Depan Kost" sublabel="Foto tampak depan" />
                <FileUploader label="Foto Lingkungan Kost" sublabel="Foto lingkungan sekitar" />
              </div>
            </div>

          </div>

          {/* FOOTER ACTIONS */}
          <div className="form-footer">
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#475569" }}>
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              Saya menyatakan bahwa seluruh informasi yang saya berikan adalah benar.
            </label>

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="button" className="btn-draft" onClick={() => navigate('/owner/dashboard')}>
                <Save size={16} /> Batal / Dashboard
              </button>
              <button type="submit" className="btn-submit" disabled={submitting || !agreed} style={{ opacity: agreed && !submitting ? 1 : 0.65 }}>
                <Send size={16} /> {submitting ? "Mengirim..." : "Kirim Verifikasi"}
              </button>
            </div>
          </div>
        </form>

        {/* ==========================================
            INFO BANNER AMAN
           ========================================== */}
        <div style={{
          backgroundColor: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "14px",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
            <div style={{ backgroundColor: "#dbeafe", padding: "10px", borderRadius: "50%" }}>
              <ShieldCheck size={24} color="#0066ff" />
            </div>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e3a8a", margin: "0 0 4px 0" }}>
                Proses Verifikasi Aman
              </h3>
              <p style={{ fontSize: "13px", color: "#1e40af", margin: 0, lineHeight: "1.4" }}>
                Tim Kostin akan meninjau data Anda dalam waktu maksimal 1 × 24 jam. Setelah verifikasi disetujui,<br />
                Anda dapat mengakses Dashboard Pemilik Kost dan mulai mengelola properti.
              </p>
            </div>
          </div>

          <ShieldCheck size={54} color="#2563eb" style={{ opacity: 0.8 }} />
        </div>

      </div>
    </div>
  );
}