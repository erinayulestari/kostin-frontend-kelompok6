import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/SidebarAdmin";
import UserCardAdmin from "../../components/admin/UserCardAdmin";
import api from "../../api/api";
import "../../styles/admin/data-pengguna.css";

export default function DataPengguna() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      if (res.data) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data pengguna admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "aktif" ? "nonaktif" : "aktif";
    try {
      await api.put(`/admin/users/${id}/status`, { status: nextStatus });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: nextStatus } : u))
      );
    } catch (err) {
      console.error("Gagal mengupdate status user:", err);
      alert(err.message || "Gagal mengubah status pengguna.");
    }
  };

  const filteredUsers = users.filter((item) => {
    const name = item.nama || item.name || "";
    const email = item.email || "";
    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());

    const itemRole = item.role === "pencari" ? "Pencari Kost" : item.role === "pemilik" ? "Pemilik Kost" : item.role;
    const matchRole = filterRole === "Semua" || itemRole === filterRole;

    const itemStatus = item.status === "aktif" ? "Aktif" : "Nonaktif";
    const matchStatus = filterStatus === "Semua" || itemStatus === filterStatus;

    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        className="data-pengguna-container"
        style={{ flex: 1, minWidth: 0, marginLeft: "250px" }}
      >
        <div className="page-header-row">
          <h1>Data Pengguna</h1>
          <p>Lihat seluruh pengguna yang terdaftar pada platform Kostin.</p>
        </div>

        <div className="filter-card">
          <div className="search-input-wrapper">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari nama atau email pengguna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-select-wrapper">
            <label>Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="Semua">Semua</option>
              <option value="Pencari Kost">Pencari Kost</option>
              <option value="Pemilik Kost">Pemilik Kost</option>
            </select>
          </div>

          <div className="filter-select-wrapper">
            <label>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua</option>
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>

        <div className="user-list-wrapper">
          {loading ? (
            <p style={{ textAlign: "center", padding: "30px 0" }}>Memuat pengguna...</p>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((userObj) => {
              const formattedUser = {
                id: userObj.id,
                nama: userObj.nama || "Pengguna",
                email: userObj.email,
                role: userObj.role === "pencari" ? "Pencari Kost" : userObj.role === "pemilik" ? "Pemilik Kost" : "Admin",
                status: userObj.status === "aktif" ? "Aktif" : "Nonaktif",
                avatar: userObj.foto_profil_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              };
              return (
                <UserCardAdmin
                  key={userObj.id}
                  user={formattedUser}
                  onToggleStatus={() => handleToggleStatus(userObj.id, userObj.status)}
                />
              );
            })
          ) : (
            <div className="empty-state">Data pengguna tidak ditemukan.</div>
          )}
        </div>
      </div>
    </div>
  );
}