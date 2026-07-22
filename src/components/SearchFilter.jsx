import { MapPin, Search } from "lucide-react";

export default function SearchFilter({ filters, onChangeFilter, onSearch }) {
  const popularCities = ["Makassar", "Gowa", "Samata"];

  const handlePopularClick = (kota) => {
    if (onChangeFilter) {
      onChangeFilter("kota", kota);
    }
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <section className="search-filter">
      <div className="search-container" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div className="filter-item" style={{ flex: 1, paddingRight: 0, borderRight: "none" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: "600", color: "#1E293B", marginBottom: "8px" }}>
            <MapPin size={18} color="#2563EB" />
            Lokasi / Jalan / Kota
          </label>
          <input
            type="text"
            placeholder="Cari berdasarkan nama lokasi, jalan, atau kota..."
            value={filters?.kota || ""}
            onChange={(e) => onChangeFilter && onChangeFilter("kota", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch && onSearch()}
            style={{ width: "100%", fontSize: "15px", outline: "none", color: "#334155" }}
          />
        </div>

        <button
          type="button"
          onClick={() => onSearch && onSearch()}
          style={{ height: "52px", padding: "0 28px", borderRadius: "12px", background: "#2563EB", color: "#fff", border: "none", fontWeight: "600", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
        >
          <Search size={20} />
          Cari
        </button>
      </div>

      <div className="popular-search" style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ color: "#64748B", fontSize: "14px", fontWeight: "500" }}>Pencarian populer :</span>
        {popularCities.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handlePopularClick(city)}
            style={{
              border: filters?.kota === city ? "1px solid #2563EB" : "none",
              background: filters?.kota === city ? "#EFF6FF" : "#F1F5F9",
              color: filters?.kota === city ? "#2563EB" : "#334155",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: filters?.kota === city ? "600" : "500",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}