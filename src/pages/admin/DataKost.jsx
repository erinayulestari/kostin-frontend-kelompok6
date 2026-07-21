import React, { useState } from "react";
import KostCardAdmin from "../../components/admin/KostCardAdmin";
import Sidebar from "../../components/admin/SidebarAdmin"; 
import "../../styles/admin/data-kost.css";

// Data Awal Mockup
const INITIAL_KOST_DATA = [
  {
    id: 1,
    namaKost: "Kost Putri Alifia",
    pemilik: "Siti Aisyah",
    lokasi: "Depok, Jawa Barat",
    harga: 1200000,
    status: "Aktif",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300"
  },
  {
    id: 2,
    namaKost: "Kost Harmoni",
    pemilik: "Budi Santoso",
    lokasi: "Bandung, Jawa Barat",
    harga: 950000,
    status: "Nonaktif",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300"
  },
  {
    id: 3,
    namaKost: "Kost Griya Asri",
    pemilik: "Rahmat Hidayat",
    lokasi: "Malang, Jawa Timur",
    harga: 800000,
    status: "Aktif",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300"
  },
  {
    id: 4,
    namaKost: "Kost Melati",
    pemilik: "Anita Putri",
    lokasi: "Surabaya, Jawa Timur",
    harga: 1100000,
    status: "Aktif",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300"
  },
  {
    id: 5,
    namaKost: "Kost Taman Indah",
    pemilik: "Dewi Lestari",
    lokasi: "Yogyakarta, DI Yogyakarta",
    harga: 750000,
    status: "Nonaktif",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=300"
  }
];

export default function DataKost() {
  const [kosts, setKosts] = useState(INITIAL_KOST_DATA);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  // Handler Toggle Status Aktif/Nonaktif
  const handleToggleStatus = (id) => {
    setKosts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === "Aktif" ? "Nonaktif" : "Aktif";
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  // Filtering Data
  const filteredKosts = kosts.filter((item) => {
    const matchSearch =
      item.namaKost.toLowerCase().includes(search.toLowerCase()) ||
      item.pemilik.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "Semua" || item.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      {/* 1. Pemanggilan Sidebar */}
      <Sidebar />

      {/* 2. Container Konten Utama (ditambah marginLeft 250px agar terdorong ke kanan sidebar) */}
      <div 
        className="data-kost-container" 
        style={{ flex: 1, minWidth: 0, marginLeft: "250px" }}
      >
        {/* Header */}
        <div className="page-header-row">
          <h1>Data Kost</h1>
          <p>Lihat seluruh data kost yang terdaftar.</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-card">
          <div className="search-input-wrapper">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari nama kost atau nama pemilik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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

        {/* List Card Data Kost */}
        <div className="kost-list-wrapper">
          {filteredKosts.length > 0 ? (
            filteredKosts.map((kost) => (
              <KostCardAdmin
                key={kost.id}
                kost={kost}
                onToggleStatus={handleToggleStatus}
              />
            ))
          ) : (
            <div className="empty-state">Data kost tidak ditemukan.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper">
          <button className="page-btn">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn"> &gt;</button>
        </div>
      </div>
    </div>
  );
}