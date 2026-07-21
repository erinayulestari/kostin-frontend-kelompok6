import React from "react";
import { Search } from "lucide-react";

export default function FilterBar({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  sortOrder, 
  setSortOrder 
}) {
  return (
    <div className="filter-card">
      <div className="search-input-box">
        <Search size={18} color="#94a3b8" />
        <input 
          type="text" 
          placeholder="Cari nama pemilik atau nama kost..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <span className="filter-label">Status</span>
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Semua">Semua</option>
            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        <div className="filter-group">
          <span className="filter-label">Urutkan</span>
          <select 
            className="filter-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Terbaru">Terbaru</option>
            <option value="Terlama">Terlama</option>
          </select>
        </div>
      </div>
    </div>
  );
}