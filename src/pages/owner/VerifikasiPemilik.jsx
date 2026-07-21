import React, { useState } from "react";
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
import "../../styles/owner/verifikasi.css";

export default function VerifikasiPemilik() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="verifikasi-container">
      <div className="verifikasi-wrapper">

        {/* ==========================================
            HEADER & STEPPER
           ========================================== */}
        <div className="verifikasi-header">
          <div className="brand-logo">
            <Home size={28} color="#0066ff" />
            <span>Kostin</span>
          </div>
          <h1 className="verifikasi-title">Verifikasi Pemilik Kost</h1>
          <p className="verifikasi-subtitle">
            Sebelum mulai mengelola kost Anda, kami perlu memverifikasi identitas dan informasi properti untuk menjaga keamanan serta kepercayaan seluruh pengguna.
          </p>

          <Stepper currentStep={1} />
        </div>

        {/* ==========================================
            FORM CARD CONTAINER
           ========================================== */}
        <div className="form-card">
          <div className="form-grid">

            {/* KOLOM KIRI: INFORMASI PEMILIK */}
            <div>
              <div className="section-title">
                <User size={18} color="#0066ff" />
                <span>Informasi Pemilik</span>
              </div>

              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" placeholder="Masukkan nama lengkap sesuai KTP" />
              </div>

              <div className="form-group">
                <label>Nomor KTP / NIK</label>
                <input type="text" placeholder="Masukkan 16 digit NIK" />
              </div>

              <div className="form-group">
                <label>Nomor Telepon</label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" />
                  <input type="text" placeholder="08xxxxxxxxxx" />
                </div>
              </div>

              <div className="form-group">
                <label>Alamat</label>
                <textarea rows="3" placeholder="Masukkan alamat sesuai KTP" style={{ fontFamily: "inherit" }}></textarea>
              </div>

              <FileUploader 
                label="Upload Foto KTP" 
                sublabel="Pastikan foto jelas dan tidak buram." 
              />

              {/* Card Preview Status File Terupload */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "26px", backgroundColor: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                    <img src="https://via.placeholder.com/40" alt="KTP" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "12px", fontWeight: "600", color: "#334155" }}>KTP_1234567890.jpg</p>
                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>2.4 MB</span>
                  </div>
                </div>
                <CheckCircle2 size={18} color="#16a34a" />
              </div>
            </div>

            {/* KOLOM KANAN: INFORMASI KOST */}
            <div>
              <div className="section-title">
                <Home size={18} color="#0066ff" />
                <span>Informasi Kost</span>
              </div>

              <div className="form-group">
                <label>Nama Kost</label>
                <input type="text" placeholder="Contoh: Kost Melati" />
              </div>

              <div className="form-group">
                <label>Alamat Kost</label>
                <textarea rows="2" placeholder="Masukkan alamat lengkap kost" style={{ fontFamily: "inherit" }}></textarea>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label>Kota</label>
                  <select defaultValue="">
                    <option value="" disabled>Pilih kota</option>
                    <option value="makassar">Makassar</option>
                    <option value="jakarta">Jakarta</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Provinsi</label>
                  <select defaultValue="">
                    <option value="" disabled>Pilih provinsi</option>
                    <option value="sulsel">Sulawesi Selatan</option>
                    <option value="dki">DKI Jakarta</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Jumlah Kamar</label>
                <div className="input-with-icon">
                  <Home size={16} className="input-icon" />
                  <input type="number" placeholder="Masukkan jumlah kamar" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <FileUploader label="Foto Depan Kost" sublabel="Foto tampak depan" />
                <FileUploader label="Foto Lingkungan Kost" sublabel="Foto lingkungan sekitar" />
              </div>

              <FileUploader 
                label="Bukti Kepemilikan / Surat Pendukung (Opsional)" 
                sublabel="Contoh: Sertifikat, IMB, atau surat pernyataan" 
                formatText="JPG, PNG, PDF. Maks. 10MB"
              />
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
              <button className="btn-draft">
                <Save size={16} /> Simpan Draft
              </button>
              <button className="btn-submit" style={{ opacity: agreed ? 1 : 0.65 }}>
                <Send size={16} /> Kirim Verifikasi
              </button>
            </div>
          </div>
        </div>

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