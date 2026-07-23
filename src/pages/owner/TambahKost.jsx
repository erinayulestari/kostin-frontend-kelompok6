import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../../components/owner/Sidebar";
import Header from "../../components/owner/Header";
import MapPicker from "../../components/owner/MapPicker";
import api from "../../api/api";
import "../../styles/owner/dashboard.css";
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const [namaKos, setNamaKos] = useState("");
  const [tipe, setTipe] = useState("putri");
  const [hargaPerBulan, setHargaPerBulan] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kodePos, setKodePos] = useState("");
  const [alamat, setAlamat] = useState("");
  const [desc, setDesc] = useState("");
  const [jumlahKamar, setJumlahKamar] = useState("");
  const [kamarTerisi, setKamarTerisi] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [fotoUtama, setFotoUtama] = useState(null);
  const [fotoUtamaPreview, setFotoUtamaPreview] = useState(null);
  const [galeriFoto, setGaleriFoto] = useState([]);
  const [galeriPreview, setGaleriPreview] = useState([]);

  const [facilities, setFacilities] = useState({
    wifi: false,
    ac: false,
    kamar_mandi_dalam: false,
    parkir: false,
    dapur: false,
    laundry: false,
    security: false,
    cctv: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      async function loadKosDetail() {
        try {
          const res = await api.get(`/kos/${editId}`);
          if (res.data) {
            const data = res.data;
            setNamaKos(data.nama_kos || "");
            setTipe(data.tipe || "putri");
            setHargaPerBulan(data.harga_per_bulan || "");
            setProvinsi(data.provinsi || "");
            setKota(data.kota || "");
            setKecamatan(data.kecamatan || "");
            setKodePos(data.kode_pos || "");
            setAlamat(data.alamat || "");
            setDesc(data.deskripsi || "");
            setJumlahKamar(data.jumlah_kamar || 10);
            setKamarTerisi(data.kamar_terisi || 0);
            setLat(data.lat || "-5.1477");
            setLng(data.lng || "119.4327");
            if (data.foto_utama_url || data.foto_utama) {
              setFotoUtamaPreview(data.foto_utama_url || data.foto_utama);
            }
            setFacilities({
              wifi: !!data.wifi,
              ac: !!data.ac,
              kamar_mandi_dalam: !!data.kamar_mandi_dalam,
              parkir: !!data.parkir,
              dapur: !!data.dapur,
              laundry: !!data.laundry,
              security: !!data.security,
              cctv: !!data.cctv,
            });
          }
        } catch (err) {
          console.error("Gagal mengambil detail kos untuk di-edit:", err);
          setError("Gagal memuat data kos yang akan di-edit.");
        }
      }
      loadKosDetail();
    } else {
      // Reset semua state ke default saat beralih ke mode tambah
      setNamaKos("");
      setTipe("putri");
      setHargaPerBulan("");
      setProvinsi("");
      setKota("");
      setKecamatan("");
      setKodePos("");
      setAlamat("");
      setDesc("");
      setJumlahKamar("");
      setKamarTerisi("");
      setLat("");
      setLng("");
      setFotoUtama(null);
      setFotoUtamaPreview(null);
      setGaleriFoto([]);
      setGaleriPreview([]);
      setFacilities({
        wifi: false,
        ac: false,
        kamar_mandi_dalam: false,
        parkir: false,
        dapur: false,
        laundry: false,
        security: false,
        cctv: false,
      });
      setError("");
    }
  }, [editId, isEditMode]);

  const handleFotoUtamaChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoUtama(file);
      setFotoUtamaPreview(URL.createObjectURL(file));
    }
  };

  const handleGaleriChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setGaleriFoto((prev) => [...prev, ...files]);
      const previews = files.map((f) => URL.createObjectURL(f));
      setGaleriPreview((prev) => [...prev, ...previews]);
    }
  };

  const removeGaleriFoto = (index) => {
    setGaleriFoto((prev) => prev.filter((_, i) => i !== index));
    setGaleriPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleFacility = (key) => {
    setFacilities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isEditMode && !fotoUtama) {
      setError("Foto utama wajib diunggah.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("nama_kos", namaKos);
    formData.append("tipe", tipe);
    formData.append("harga_per_bulan", String(hargaPerBulan).replace(/\D/g, ''));
    formData.append("provinsi", provinsi);
    formData.append("kota", kota);
    formData.append("kecamatan", kecamatan);
    formData.append("kode_pos", kodePos);
    formData.append("alamat", alamat);
    formData.append("deskripsi", desc);
    formData.append("jumlah_kamar", jumlahKamar);
    formData.append("kamar_terisi", kamarTerisi);
    formData.append("lat", lat);
    formData.append("lng", lng);

    Object.keys(facilities).forEach((key) => {
      formData.append(key, facilities[key] ? "1" : "0");
    });

    if (fotoUtama) {
      formData.append("foto_utama", fotoUtama);
    }
    galeriFoto.forEach((file) => {
      formData.append("kos_foto[]", file);
    });

    try {
      if (isEditMode) {
        formData.append("_method", "PUT");
        await api.post(`/owner/kos/${editId}`, formData);
        alert("Properti kos berhasil diperbarui!");
      } else {
        await api.post("/owner/kos", formData);
        alert("Properti kos berhasil ditambahkan!");
      }
      navigate("/owner/kost-saya");
    } catch (err) {
      console.error("Gagal menyimpan kos:", err);
      setError(err.message || "Gagal menyimpan properti kos.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Header 
          title={isEditMode ? "Edit Kost" : "Tambah Kost"} 
          subtitle={isEditMode ? "Ubah informasi properti kos Anda." : "Lengkapi informasi kost yang akan dipublikasikan."}
          showProfile={true}
        />

        {error && (
          <div style={{ color: "#ef4444", backgroundColor: "#fee2e2", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
                    <input
                      type="text"
                      placeholder="Masukkan nama kost"
                      value={namaKos}
                      onChange={(e) => setNamaKos(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Jenis Kost</label>
                    <select
                      value={tipe}
                      onChange={(e) => setTipe(e.target.value)}
                      required
                    >
                      <option value="putra">Putra</option>
                      <option value="putri">Putri</option>
                      <option value="campur">Campur</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Harga Sewa Per Bulan</label>
                    <div className="price-input-wrapper" style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      height: '42px',
                      backgroundColor: '#fff',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      boxSizing: 'border-box',
                      gap: '6px'
                    }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0066ff',
                        flexShrink: 0
                      }}>Rp</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="1.500.000"
                        value={hargaPerBulan ? Number(String(hargaPerBulan).replace(/\D/g, '')).toLocaleString('id-ID') : ''}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '');
                          setHargaPerBulan(raw);
                        }}
                        style={{
                          border: 'none',
                          outline: 'none',
                          flex: 1,
                          fontSize: '13px',
                          padding: '0',
                          margin: '0',
                          height: 'auto',
                          lineHeight: 'normal',
                          backgroundColor: 'transparent'
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Provinsi</label>
                    <input
                      type="text"
                      placeholder="Provinsi"
                      value={provinsi}
                      onChange={(e) => setProvinsi(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kota</label>
                    <input
                      type="text"
                      placeholder="Kota"
                      value={kota}
                      onChange={(e) => setKota(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Kecamatan</label>
                    <input
                      type="text"
                      placeholder="Kecamatan"
                      value={kecamatan}
                      onChange={(e) => setKecamatan(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kode Pos</label>
                    <input
                      type="text"
                      placeholder="Masukkan kode pos"
                      value={kodePos}
                      onChange={(e) => setKodePos(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Alamat Lengkap</label>
                  <textarea
                    rows="3"
                    placeholder="Masukkan alamat lengkap kost"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Peta Interaktif - Map Picker */}
                <div className="form-group">
                  <label>Lokasi di Peta</label>
                  <MapPicker
                    value={{ lat, lng }}
                    onChange={({ lat: newLat, lng: newLng }) => {
                      setLat(newLat);
                      setLng(newLng);
                    }}
                  />
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
                  <label className="facility-item">
                    <input type="checkbox" checked={facilities.wifi} onChange={() => toggleFacility('wifi')} />
                    <Wifi size={14} color="#0066ff" />
                    <span>WiFi</span>
                  </label>

                  <label className="facility-item">
                    <input type="checkbox" checked={facilities.ac} onChange={() => toggleFacility('ac')} />
                    <Wind size={14} color="#0066ff" />
                    <span>AC</span>
                  </label>

                  <label className="facility-item">
                    <input type="checkbox" checked={facilities.kamar_mandi_dalam} onChange={() => toggleFacility('kamar_mandi_dalam')} />
                    <Bath size={14} color="#0066ff" />
                    <span>Kamar Mandi Dalam</span>
                  </label>

                  <label className="facility-item">
                    <input type="checkbox" checked={facilities.parkir} onChange={() => toggleFacility('parkir')} />
                    <Car size={14} color="#0066ff" />
                    <span>Parkir</span>
                  </label>

                  <label className="facility-item">
                    <input type="checkbox" checked={facilities.dapur} onChange={() => toggleFacility('dapur')} />
                    <Utensils size={14} color="#0066ff" />
                    <span>Dapur</span>
                  </label>

                  <label className="facility-item">
                    <input type="checkbox" checked={facilities.laundry} onChange={() => toggleFacility('laundry')} />
                    <Shirt size={14} color="#0066ff" />
                    <span>Laundry</span>
                  </label>

                  <label className="facility-item">
                    <input type="checkbox" checked={facilities.security} onChange={() => toggleFacility('security')} />
                    <ShieldCheck size={14} color="#0066ff" />
                    <span>Keamanan 24 Jam</span>
                  </label>

                  <label className="facility-item">
                    <input type="checkbox" checked={facilities.cctv} onChange={() => toggleFacility('cctv')} />
                    <ShieldCheck size={14} color="#0066ff" />
                    <span>CCTV</span>
                  </label>
                </div>
              </div>

              {/* Informasi Kamar */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">4</span>
                    <span>Informasi Kamar</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label>Jumlah Kamar</label>
                    <input
                      type="number"
                      placeholder="Jumlah kamar"
                      value={jumlahKamar}
                      onChange={(e) => setJumlahKamar(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Kamar Terisi</label>
                    <input
                      type="number"
                      placeholder="Kamar terisi"
                      value={kamarTerisi}
                      onChange={(e) => setKamarTerisi(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ================= KOLOM KANAN ================= */}
            <div>
              {/* Foto Utama & Galeri */}
              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">5</span>
                    <span>Foto Utama Kost</span>
                  </div>
                </div>

                <label className="upload-drop-zone" style={{ cursor: "pointer", display: "block" }}>
                  <UploadCloud size={28} color="#0066ff" style={{ marginBottom: "6px" }} />
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#0f172a" }}>
                    Klik untuk memilih Foto Utama
                  </p>
                  <input type="file" accept="image/*" onChange={handleFotoUtamaChange} style={{ display: "none" }} />
                </label>

                {fotoUtamaPreview && (
                  <div style={{ marginTop: "12px" }}>
                    <p style={{ fontSize: "12px", fontWeight: "600" }}>Preview Foto Utama:</p>
                    <img src={fotoUtamaPreview} alt="Foto Utama Preview" style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "8px" }} />
                  </div>
                )}
              </div>

              <div className="form-section">
                <div className="section-head">
                  <div className="section-badge-title">
                    <span className="badge-number">6</span>
                    <span>Galeri Foto Tambahan</span>
                  </div>
                </div>

                <label className="add-photo-box" style={{ cursor: "pointer", width: "100%", height: "80px" }}>
                  <Plus size={18} />
                  <span>Tambah Foto Galeri</span>
                  <input type="file" accept="image/*" multiple onChange={handleGaleriChange} style={{ display: "none" }} />
                </label>

                <div className="photo-preview-grid" style={{ marginTop: "12px" }}>
                  {galeriPreview.map((src, idx) => (
                    <div key={idx} className="photo-card">
                      <img src={src} alt={`Galeri ${idx + 1}`} />
                      <button type="button" className="photo-delete-btn" onClick={() => removeGaleriFoto(idx)}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions-bottom">
            <button type="submit" className="btn-publish" disabled={submitting}>
              <Send size={16} /> {submitting ? "Memproses..." : isEditMode ? "Simpan Perubahan" : "Publikasikan Kost"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}