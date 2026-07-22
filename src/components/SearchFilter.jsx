import { MapPin, Search } from "lucide-react";

export default function SearchFilter({ filters, onChangeFilter, onSearch }) {
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
      <div className="search-container">
        <div className="filter-item">
          <label>
            <MapPin size={18} />
            Lokasi / Kota
          </label>
          <input
            type="text"
            placeholder="Cari lokasi..."
            value={filters?.kota || ""}
            onChange={(e) => onChangeFilter && onChangeFilter("kota", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch && onSearch()}
          />
        </div>

        <div className="filter-item">
          <label>Tipe Kost</label>
          <select
            value={filters?.tipe || ""}
            onChange={(e) => onChangeFilter && onChangeFilter("tipe", e.target.value)}
          >
            <option value="">Semua Tipe</option>
            <option value="putra">Putra</option>
            <option value="putri">Putri</option>
            <option value="campur">Campur</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Fasilitas Utama</label>
          <select
            value={filters?.fasilitasUtama || ""}
            onChange={(e) => {
              const val = e.target.value;
              if (onChangeFilter) {
                onChangeFilter("wifi", val === "wifi");
                onChangeFilter("ac", val === "ac");
                onChangeFilter("parkir", val === "parkir");
                onChangeFilter("fasilitasUtama", val);
              }
            }}
          >
            <option value="">Pilih Fasilitas</option>
            <option value="wifi">WiFi</option>
            <option value="ac">AC</option>
            <option value="parkir">Parkir</option>
          </select>
        </div>

        <button type="button" onClick={() => onSearch && onSearch()}>
          <Search size={20} />
          Cari
        </button>
      </div>

      <div className="popular-search">
        <span>Pencarian populer :</span>
        <button type="button" onClick={() => handlePopularClick("Jakarta")}>Jakarta</button>
        <button type="button" onClick={() => handlePopularClick("Bandung")}>Bandung</button>
        <button type="button" onClick={() => handlePopularClick("Yogyakarta")}>Yogyakarta</button>
        <button type="button" onClick={() => handlePopularClick("Makassar")}>Makassar</button>
        <button type="button" onClick={() => handlePopularClick("Surabaya")}>Surabaya</button>
      </div>
    </section>
  );
}