import React from "react";
import { Search } from "lucide-react";
import CustomSelect from "./CustomSelect";

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
          <CustomSelect
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            options={[
              { value: "Semua", label: "Semua Status" },
              { value: "Menunggu Verifikasi", label: "Menunggu Verifikasi" },
              { value: "Disetujui", label: "Disetujui" },
              { value: "Ditolak", label: "Ditolak" },
            ]}
            width="170px"
          />
        </div>

        <div className="filter-group">
          <span className="filter-label">Urutkan</span>
          <CustomSelect
            value={sortOrder}
            onChange={(val) => setSortOrder(val)}
            options={[
              { value: "Terbaru", label: "Terbaru" },
              { value: "Terlama", label: "Terlama" },
            ]}
            width="130px"
          />
        </div>
      </div>
    </div>
  );
}