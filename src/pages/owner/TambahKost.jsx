import React, { useState } from "react";
import SidebarOwner from "../../components/owner/SidebarOwner";
import "../../styles/owner/tambah-kost.css";
import { 
  UploadCloud, 
  X, 
  Plus, 
  MapPin, 
  Info, 
  Send,
  Wifi,
  Wind,
  Bath,
  Bed,
  Tv,
  BookOpen,
  Utensils,
  Bike,
  Car,
  Shirt,
  ShieldCheck
} from "lucide-react";

export default function TambahKost() {
  const [desc, setDesc] = useState("");

  // Sample data fasilitas sesuai mockup
  const facilities = [
    { id: "wifi", label: "WiFi", icon: Wifi, defaultChecked: true },
    { id: "ac", label: "AC", icon: Wind, defaultChecked: true },
    { id: "kamar_mandi", label: "Kamar Mandi Dalam", icon: Bath, defaultChecked: true },
    { id: "kasur", label: "Kasur", icon: Bed, defaultChecked: true },
    { id: "lemari", label: "Lemari", icon: Tv, defaultChecked: true },
    { id: "meja", label: "Meja Belajar", icon: BookOpen, defaultChecked: true },
    { id: "dapur", label: "Dapur", icon: Utensils, defaultChecked: true },
    { id: "parkir_motor", label: "Parkir Motor", icon: Bike, defaultChecked: true },
    { id: "parkir_mobil", label: "Parkir Mobil", icon: Car, defaultChecked: false },
    { id: "laundry", label: "Laundry", icon: Shirt, defaultChecked: false },
    { id: "cctv", label: "CCTV", icon: ShieldCheck, defaultChecked: true },
    { id: "keamanan", label: "Keamanan 24 Jam", icon: ShieldCheck, defaultChecked: true },
  ];

  return (
    <div className="owner-layout">
      <SidebarOwner />

      <main className="main-content">
        {/* Header Tanpa Tombol Batal */}
        <div className="page-header">
          <h1 className="page-title">Tambah Kost</h1>
          <p className="page-subtitle">Lengkapi informasi kost yang akan dipublikasikan.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="tambah-kost-grid">
            
            {/* ================= KOLOM KIRI ================= */}
            <div>
              {/* 1. Informasi Kost */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">1</span>
                    <span>Informasi Kost</span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nama Kost</label>
                    <input type="text" placeholder="Masukkan nama kost" />
                  </div>
                  <div className="form-group">
                    <label>Jenis Kost</label>
                    <select defaultValue="">
                      <option value="" disabled>Pilih jenis kost</option>
                      <option value="putra">Putra</option>
                      <option value="putri">Putri</option>
                      <option value="campur">Campur</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kategori Kost</label>
                    <select defaultValue="">
                      <option value="" disabled>Pilih kategori kost</option>
                      <option value="bulanan">Bulanan</option>
                      <option value="tahunan">Tahunan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Harga Sewa</label>
                    <input type="text" placeholder="Rp  Masukkan harga sewa" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Provinsi</label>
                    <select defaultValue="">
                      <option value="" disabled>Pilih provinsi</option>
                      <option value="sulsel">Sulawesi Selatan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Kota</label>
                    <select defaultValue="">
                      <option value="" disabled>Pilih kota</option>
                      <option value="makassar">Makassar</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kecamatan</label>
                    <select defaultValue="">
                      <option value="" disabled>Pilih kecamatan</option>
                      <option value="tamalanrea">Tamalanrea</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Kode Pos</label>
                    <input type="text" placeholder="Masukkan kode pos" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Alamat Lengkap</label>
                  <textarea rows="3" placeholder="Masukkan alamat lengkap kost"></textarea>
                </div>
              </div>

              {/* 2. Deskripsi */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">2</span>
                    <span>Deskripsi</span>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 4 }}>
                  <textarea 
                    rows="4" 
                    maxLength={1000}
                    placeholder="Jelaskan informasi mengenai kost, peraturan, serta keunggulan kost."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>
                <div style={{ textAlign: "right", fontSize: "11px", color: "#94a3b8" }}>
                  {desc.length} / 1000 karakter
                </div>
              </div>

              {/* 3. Fasilitas */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">3</span>
                    <span>Fasilitas</span>
                  </div>
                </div>

                <div className="facilities-grid">
                  {facilities.map((f) => {
                    const IconComp = f.icon;
                    return (
                      <label key={f.id} className="facility-item">
                        <input type="checkbox" defaultChecked={f.defaultChecked} />
                        <IconComp size={14} color="#0066ff" />
                        <span>{f.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 6. Informasi Kamar */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">6</span>
                    <span>Informasi Kamar</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label>Jumlah Kamar</label>
                    <input type="number" placeholder="Masukkan jumlah kamar" />
                  </div>
                  <div className="form-group">
                    <label>Jumlah Kamar Kosong</label>
                    <input type="number" placeholder="Masukkan kamar kosong" />
                  </div>
                  <div className="form-group">
                    <label>Luas Kamar (m²)</label>
                    <input type="text" placeholder="Masukkan luas kamar" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Peraturan Kost</label>
                  <textarea rows="3" placeholder="Contoh: Tamu hanya boleh sampai jam 22.00, Dilarang merokok, dll."></textarea>
                </div>
              </div>
            </div>

            {/* ================= KOLOM KANAN ================= */}
            <div>
              {/* 4. Foto Kost */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">4</span>
                    <span>Foto Kost</span>
                  </div>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Maksimal 10 foto</span>
                </div>

                <div className="upload-drop-zone">
                  <UploadCloud size={28} color="#0066ff" style={{ marginBottom: "6px" }} />
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>
                    Drag & Drop foto di sini
                  </p>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                    atau klik untuk memilih file<br />JPG, PNG (maks. 5MB)
                  </span>
                </div>

                <div className="photo-preview-grid">
                  <div className="photo-card">
                    <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300" alt="Kost 1" />
                    <button className="photo-delete-btn"><X size={12} /></button>
                  </div>
                  <div className="photo-card">
                    <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300" alt="Kost 2" />
                    <button className="photo-delete-btn"><X size={12} /></button>
                  </div>
                  <div className="photo-card">
                    <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300" alt="Kost 3" />
                    <button className="photo-delete-btn"><X size={12} /></button>
                  </div>
                  <div className="photo-card">
                    <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300" alt="Kost 4" />
                    <button className="photo-delete-btn"><X size={12} /></button>
                  </div>
                  <div className="photo-card">
                    <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300" alt="Kost 5" />
                    <button className="photo-delete-btn"><X size={12} /></button>
                  </div>
                  <div className="photo-card">
                    <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300" alt="Kost 6" />
                    <button className="photo-delete-btn"><X size={12} /></button>
                  </div>
                  <div className="photo-card">
                    <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300" alt="Kost 7" />
                    <button className="photo-delete-btn"><X size={12} /></button>
                  </div>
                  <div className="add-photo-box">
                    <Plus size={18} />
                    <span>Tambah Foto</span>
                  </div>
                </div>
              </div>

              {/* 5. Lokasi */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">5</span>
                    <span>Lokasi</span>
                  </div>
                </div>

                <div className="map-mock">
                  <img src="https://via.placeholder.com/600x200/e2e8f0/94a3b8?text=Map+Preview+Location" alt="Map" />
                </div>

                <button type="button" style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  border: "1px solid #0066ff", 
                  color: "#0066ff", 
                  background: "#fff", 
                  padding: "8px 14px", 
                  borderRadius: "8px", 
                  fontSize: "12px", 
                  fontWeight: "600",
                  cursor: "pointer",
                  marginBottom: "16px"
                }}>
                  <MapPin size={14} /> Pilih Lokasi di Peta
                </button>

                <div className="form-row" style={{ marginBottom: 0 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Latitude</label>
                    <input type="text" defaultValue="-6.2088" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Longitude</label>
                    <input type="text" defaultValue="106.8456" />
                  </div>
                </div>
              </div>

              {/* 7. Kontak */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">7</span>
                    <span>Kontak</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Nama Pemilik</label>
                  <input type="text" placeholder="Masukkan nama pemilik" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nomor Telepon</label>
                    <input type="text" placeholder="08xxxxxxxxxx" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="nama@email.com" />
                  </div>
                </div>

                <div style={{
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "12px",
                  color: "#1e40af"
                }}>
                  <Info size={16} color="#0066ff" style={{ flexShrink: 0 }} />
                  <span>Informasi kontak ini akan ditampilkan kepada calon penyewa untuk menghubungi Anda.</span>
                </div>
              </div>

            </div>
          </div>

          {/* Action Bottom: Tanpa Tombol Draft */}
          <div className="form-actions-bottom">
            <button type="submit" className="btn-publish">
              <Send size={16} /> Publikasikan Kost
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}