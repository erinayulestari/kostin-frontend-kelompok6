import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import UserCardAdmin from "../../components/admin/UserCardAdmin";
import Pagination from "../../components/admin/Pagination";
import api from "../../api/api";
import defaultAvatar from "../../assets/avatar.jpg";
import CustomSelect from "../../components/admin/CustomSelect";
import "../../styles/admin/admin-dashboard.css";
import "../../styles/admin/data-pengguna.css";

export default function DataPengguna() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterRole, filterStatus]);

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
    // Sembunyikan akun admin dari daftar Data Pengguna
    if (item.role === "admin") return false;

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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main-content">
        <HeaderAdmin
          title="Data Pengguna"
          subtitle="Lihat seluruh pengguna yang terdaftar pada platform Kostin."
        />

        <div className="data-pengguna-container" style={{ padding: 0, backgroundColor: "transparent" }}>
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
              <CustomSelect
                value={filterRole}
                onChange={(val) => setFilterRole(val)}
                options={[
                  { value: "Semua", label: "Semua Role" },
                  { value: "Pencari Kost", label: "Pencari Kost" },
                  { value: "Pemilik Kost", label: "Pemilik Kost" },
                ]}
                width="160px"
              />
            </div>

            <div className="filter-select-wrapper">
              <label>Status</label>
              <CustomSelect
                value={filterStatus}
                onChange={(val) => setFilterStatus(val)}
                options={[
                  { value: "Semua", label: "Semua Status" },
                  { value: "Aktif", label: "Aktif" },
                  { value: "Nonaktif", label: "Nonaktif" },
                ]}
                width="160px"
              />
            </div>
          </div>

          <div className="user-list-wrapper">
            {loading ? (
              <p style={{ textAlign: "center", padding: "30px 0" }}>Memuat pengguna...</p>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((userObj) => {
                const formattedUser = {
                  id: userObj.id,
                  nama: userObj.nama || userObj.name || "Pengguna",
                  email: userObj.email,
                  role: userObj.role === "pencari" ? "Pencari Kost" : userObj.role === "pemilik" ? "Pemilik Kost" : "Admin",
                  status: userObj.status === "aktif" ? "Aktif" : "Nonaktif",
                  avatar: userObj.foto_profil_url || defaultAvatar
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

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>
    </div>
  );
}