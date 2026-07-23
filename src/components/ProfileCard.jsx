import { useState, useEffect } from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileImage,
} from "lucide-react";
import avatar from "../assets/avatar.jpg";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export default function ProfileCard() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ktpUploading, setKtpUploading] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
    alamat: "",
    nik: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nama: user.nama || "",
        email: user.email || "",
        no_hp: user.no_hp || "",
        jenis_kelamin: user.jenis_kelamin || "",
        tanggal_lahir: user.tanggal_lahir || "",
        alamat: user.alamat || "",
        nik: user.nik || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await api.put("/profile", formData);
      const updatedUser = res.data !== undefined ? res.data : res;
      if (updatedUser) {
        updateProfile(updatedUser);
      }
      setIsEditing(false);
      alert("Profil berhasil diperbarui.");
    } catch (err) {
      console.error("Gagal update profil:", err);
      alert(err.message || "Gagal memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("foto_profil", file);

    try {
      const res = await api.post("/profile/photo", data);
      const updatedUser = res.data !== undefined ? res.data : res;
      if (updatedUser) {
        updateProfile(updatedUser);
      }
      alert("Foto profil berhasil diperbarui.");
    } catch (err) {
      console.error("Gagal mengunggah foto profil:", err);
      alert(err.message || "Gagal mengunggah foto profil.");
    }
  };

  const handleKtpUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setKtpUploading(true);
    const data = new FormData();
    data.append("foto_ktp", file);

    try {
      const res = await api.post("/profile/ktp", data);
      const updatedUser = res.data !== undefined ? res.data : res;
      if (updatedUser) {
        updateProfile(updatedUser);
      }
      alert("Foto KTP berhasil diunggah.");
    } catch (err) {
      console.error("Gagal mengunggah foto KTP:", err);
      alert(err.message || "Gagal mengunggah foto KTP.");
    } finally {
      setKtpUploading(false);
    }
  };

  const displayAvatar = user?.foto_profil_url || avatar;
  const roleText = user?.role === "pemilik" ? "Pemilik Kost" : user?.role === "admin" ? "Super Admin" : "Pencari Kost";
  const isPemilik = user?.role === "pemilik";

  return (
    <section className="profile-card">
      {/* ================= Header ================= */}
      <div className="profile-top">
        <div className="profile-avatar">
          <img src={displayAvatar} alt="Profile" onError={(e) => { e.target.src = avatar; }} />
        </div>

        <div className="profile-info">
          <h2>{user?.nama || "User"}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
            <span className="profile-role" style={{ margin: 0 }}>{roleText}</span>
            <label className="photo-btn" style={{ cursor: "pointer", margin: 0 }}>
              <Camera size={16} />
              Ubah Foto
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
            </label>
          </div>
        </div>
      </div>

      <hr />

      {/* ================= Content ================= */}
      <div className="profile-content">
        {/* LEFT */}
        <div className="profile-column">
          <div className="profile-item">
            <div className="profile-icon">
              <User size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span>Nama Lengkap</span>
              {isEditing ? (
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "6px 10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              ) : (
                <h4>{user?.nama || "-"}</h4>
              )}
            </div>
          </div>

          <div className="profile-item">
            <div className="profile-icon">
              <Mail size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span>Email</span>
              <h4>{user?.email || "-"}</h4>
            </div>
          </div>

          <div className="profile-item">
            <div className="profile-icon">
              <Phone size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span>Nomor Telepon</span>
              {isEditing ? (
                <input
                  type="text"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "6px 10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              ) : (
                <h4>{user?.no_hp || "-"}</h4>
              )}
            </div>
          </div>

          <div className="profile-item">
            <div className="profile-icon">
              <User size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span>Jenis Kelamin</span>
              {isEditing ? (
                <select
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "6px 10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                >
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              ) : (
                <h4>{user?.jenis_kelamin || "-"}</h4>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="profile-column">
          <div className="profile-item">
            <div className="profile-icon">
              <Calendar size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span>Tanggal Lahir</span>
              {isEditing ? (
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "6px 10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              ) : (
                <h4>{user?.tanggal_lahir || "-"}</h4>
              )}
            </div>
          </div>

          <div className="profile-item">
            <div className="profile-icon">
              <MapPin size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <span>Alamat</span>
              {isEditing ? (
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows={2}
                  style={{ width: "100%", padding: "6px 10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                />
              ) : (
                <h4>{user?.alamat || "-"}</h4>
              )}
            </div>
          </div>

          {/* NIK - Hanya untuk Pemilik Kost */}
          {isPemilik && (
            <div className="profile-item">
              <div className="profile-icon">
                <CreditCard size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <span>Nomor KTP / NIK</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="Masukkan 16 digit NIK"
                    maxLength={16}
                    style={{ width: "100%", padding: "6px 10px", marginTop: "4px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  />
                ) : (
                  <h4>{user?.nik || "-"}</h4>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= KTP Upload Section (Pemilik Only) ================= */}
      {isPemilik && (
        <>
          <hr />
          <div style={{ padding: "0 0 8px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <FileImage size={18} color="#0066ff" />
              <span style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>Dokumen KTP</span>
              {user?.foto_ktp_url ? (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "11px", fontWeight: "600", color: "#16a34a",
                  backgroundColor: "#f0fdf4", padding: "3px 10px", borderRadius: "20px",
                  border: "1px solid #bbf7d0"
                }}>
                  <CheckCircle2 size={12} /> Sudah Diunggah
                </span>
              ) : (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "4px",
                  fontSize: "11px", fontWeight: "600", color: "#ea580c",
                  backgroundColor: "#fff7ed", padding: "3px 10px", borderRadius: "20px",
                  border: "1px solid #fed7aa"
                }}>
                  <AlertCircle size={12} /> Belum Diunggah
                </span>
              )}
            </div>

            {/* Preview KTP */}
            {user?.foto_ktp_url && (
              <div style={{
                marginBottom: "16px", borderRadius: "12px", overflow: "hidden",
                border: "1px solid #e2e8f0", maxWidth: "400px"
              }}>
                <img
                  src={user.foto_ktp_url}
                  alt="Foto KTP"
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            )}

            {/* Upload Button */}
            <label style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "10px", cursor: "pointer",
              backgroundColor: "#eff6ff", border: "1.5px dashed #93c5fd",
              color: "#2563eb", fontSize: "13px", fontWeight: "600",
              transition: "all 0.2s ease",
              opacity: ktpUploading ? 0.6 : 1,
            }}>
              <Upload size={16} />
              {ktpUploading ? "Mengunggah..." : user?.foto_ktp_url ? "Ganti Foto KTP" : "Upload Foto KTP"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleKtpUpload}
                disabled={ktpUploading}
                style={{ display: "none" }}
              />
            </label>
            <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "8px" }}>
              Format: JPG, PNG. Maksimal 5MB. Pastikan foto jelas dan tidak buram.
            </p>
          </div>
        </>
      )}

      <hr />

      {/* ================= Footer ================= */}
      <div className="profile-footer">
        {isEditing ? (
          <>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Batal
            </button>
            <button className="edit-btn" onClick={handleSave} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profil
          </button>
        )}
      </div>
    </section>
  );
}