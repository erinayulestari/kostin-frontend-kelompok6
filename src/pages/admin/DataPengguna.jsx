import React, { useState } from "react";
import Sidebar from "../../components/admin/SidebarAdmin";
import UserCardAdmin from "../../components/admin/UserCardAdmin";
import "../../styles/admin/data-pengguna.css";

// Data Dummy Pengguna
const INITIAL_USERS_DATA = [
  {
    id: 1,
    nama: "Siti Aisyah",
    email: "siti.aisyah@email.com",
    role: "Pencari Kost",
    status: "Aktif",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    id: 2,
    nama: "Budi Santoso",
    email: "budi.santoso@email.com",
    role: "Pemilik Kost",
    status: "Aktif",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: 3,
    nama: "Dewi Lestari",
    email: "dewi.lestari@email.com",
    role: "Pencari Kost",
    status: "Nonaktif",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
  },
  {
    id: 4,
    nama: "Rahmat Hidayat",
    email: "rahmat.hidayat@email.com",
    role: "Pemilik Kost",
    status: "Aktif",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
  },
  {
    id: 5,
    nama: "Anita Putri",
    email: "anita.putri@email.com",
    role: "Pencari Kost",
    status: "Aktif",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  }
];

export default function DataPengguna() {
  const [users, setUsers] = useState(INITIAL_USERS_DATA);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");

  // Handler Status Toggle
  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === "Aktif" ? "Nonaktif" : "Aktif";
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  // Filter Data
  const filteredUsers = users.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      filterRole === "Semua" || item.role === filterRole;

    const matchStatus =
      filterStatus === "Semua" || item.status === filterStatus;

    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div
        className="data-pengguna-container"
        style={{ flex: 1, minWidth: 0, marginLeft: "250px" }}
      >
        {/* Header */}
        <div className="page-header-row">
          <h1>Data Pengguna</h1>
          <p>Lihat seluruh pengguna yang terdaftar pada platform Kostin.</p>
        </div>

        {/* Filter Bar */}
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

        {/* User Cards List */}
        <div className="user-list-wrapper">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCardAdmin
                key={user.id}
                user={user}
                onToggleStatus={handleToggleStatus}
              />
            ))
          ) : (
            <div className="empty-state">Data pengguna tidak ditemukan.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper">
          <button className="page-btn flex-btn">&lt; Previous</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <span className="page-dots">...</span>
          <button className="page-btn flex-btn">Next &gt;</button>
        </div>
      </div>
    </div>
  );
}