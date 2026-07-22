import { useState } from "react";
import {
  UserRound,
  CalendarDays,
  Clock3,
  SquarePen,
  Check,
  X
} from "lucide-react";

export default function TenantInfoCard({ tenant, onUpdateTenantInfo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: tenant?.name || "",
    email: tenant?.email || "",
    phone: tenant?.phone || "",
    tanggal_masuk: tenant?.raw_tanggal_masuk || new Date().toISOString().split("T")[0],
    durasi_sewa: tenant?.durasi_sewa || 1,
  });

  const checkinDate = tenant?.checkin || tenant?.tanggal_masuk || "Segera";
  const durationStr = tenant?.duration || (tenant?.durasi_sewa ? `${tenant.durasi_sewa} Bulan` : "1 Bulan");

  const handleOpenEdit = () => {
    setFormData({
      name: tenant?.name || "",
      email: tenant?.email || "",
      phone: tenant?.phone || "",
      tanggal_masuk: tenant?.raw_tanggal_masuk || new Date().toISOString().split("T")[0],
      durasi_sewa: tenant?.durasi_sewa || 1,
    });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateTenantInfo) {
      onUpdateTenantInfo(formData);
    }
    setIsEditing(false);
  };

  return (
    <section className="checkout-card">
      {/* Header */}
      <div className="checkout-card-title">
        <div className="checkout-card-icon">
          <UserRound size={22} />
        </div>
        <h3>1. Informasi Penyewa</h3>
      </div>

      {!isEditing ? (
        <>
          {/* Readonly View */}
          <div className="tenant-grid">
            {/* Left */}
            <div className="tenant-column">
              <div className="tenant-item">
                <span>Nama Lengkap</span>
                <h4>{tenant?.name || "-"}</h4>
              </div>

              <div className="tenant-item">
                <span>Email</span>
                <h4>{tenant?.email || "-"}</h4>
              </div>

              <div className="tenant-item">
                <span>Nomor Telepon</span>
                <h4>{tenant?.phone || "-"}</h4>
              </div>
            </div>

            {/* Right */}
            <div className="tenant-column">
              <div className="tenant-row">
                <div className="tenant-row-icon">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <span>Tanggal Masuk</span>
                  <h4>{checkinDate}</h4>
                </div>
              </div>

              <div className="tenant-row">
                <div className="tenant-row-icon">
                  <Clock3 size={20} />
                </div>
                <div>
                  <span>Durasi Sewa</span>
                  <h4>{durationStr}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="tenant-action">
            <button className="outline-btn" onClick={handleOpenEdit}>
              <SquarePen size={18} />
              Ubah Informasi Penyewa
            </button>
          </div>
        </>
      ) : (
        /* Edit Form View */
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "10px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748B", marginBottom: "6px" }}>
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748B", marginBottom: "6px" }}>
                Email Penyewa
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748B", marginBottom: "6px" }}>
                Nomor HP / WhatsApp
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748B", marginBottom: "6px" }}>
                Tanggal Masuk
              </label>
              <input
                type="date"
                required
                value={formData.tanggal_masuk}
                onChange={(e) => setFormData({ ...formData, tanggal_masuk: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#64748B", marginBottom: "6px" }}>
                Durasi Sewa
              </label>
              <select
                value={formData.durasi_sewa}
                onChange={(e) => setFormData({ ...formData, durasi_sewa: Number(e.target.value) })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #CBD5E1", fontSize: "14px", outline: "none", background: "#fff" }}
              >
                <option value={1}>1 Bulan</option>
                <option value={3}>3 Bulan</option>
                <option value={6}>6 Bulan</option>
                <option value={12}>12 Bulan</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{ padding: "8px 16px", borderRadius: "10px", border: "1px solid #CBD5E1", background: "#fff", color: "#475569", fontWeight: "600", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <X size={16} />
              Batal
            </button>
            <button
              type="submit"
              style={{ padding: "8px 20px", borderRadius: "10px", border: "none", background: "#2563EB", color: "#fff", fontWeight: "600", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Check size={16} />
              Simpan Perubahan
            </button>
          </div>
        </form>
      )}
    </section>
  );
}