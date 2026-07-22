import { useState, useEffect } from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import avatar from "../assets/avatar.jpg";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export default function ProfileCard() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    jenis_kelamin: "Perempuan",
    tanggal_lahir: "",
    alamat: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nama: user.nama || "",
        email: user.email || "",
        no_hp: user.no_hp || "",
        jenis_kelamin: user.jenis_kelamin || "Perempuan",
        tanggal_lahir: user.tanggal_lahir || "",
        alamat: user.alamat || "",
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

  const displayAvatar = user?.foto_profil_url || avatar;
  const roleText = user?.role === "pemilik" ? "Pemilik Kost" : user?.role === "admin" ? "Super Admin" : "Pencari Kost";

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
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              ) : (
                <h4>{user?.jenis_kelamin || "Perempuan"}</h4>
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
        </div>
      </div>

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