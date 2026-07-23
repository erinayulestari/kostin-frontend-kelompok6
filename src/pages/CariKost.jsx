import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchFilter from "../components/SearchFilter";
import SidebarFilter from "../components/SidebarFilter";
import KostCardHorizontal from "../components/KostCardHorizontal";
import Pagination from "../components/Pagination";
import api from "../api/api";
import "../styles/carikost.css";

export default function CariKost() {
  const [searchParams] = useSearchParams();
  const [kostList, setKostList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    kota: "",
    tipe: searchParams.get("tipe") || "",
    wifi: false,
    ac: false,
    kamar_mandi_dalam: false,
    parkir: false,
    laundry: false,
    dapur: false,
    cctv: false,
    sort: "Terbaru",
  });

  const itemsPerPage = 5;

  useEffect(() => {
    const tipeParam = searchParams.get("tipe");
    if (tipeParam) {
      setFilters(prev => ({ ...prev, tipe: tipeParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const fetchFavorites = async () => {
    try {
      const res = await api.get('/favorites');
      if (res.data) {
        const favIds = res.data.map(f => f.kos_id || f.kos?.id || f.id);
        setFavorites(favIds);
      }
    } catch (e) {
      console.log("Belum login atau gagal memuat favorit", e);
    }
  };

  const handleToggleFavorite = async (kosId) => {
    const isFav = favorites.includes(kosId);
    try {
      if (isFav) {
        await api.delete(`/favorites/${kosId}`);
        setFavorites(prev => prev.filter(id => id !== kosId));
      } else {
        await api.post('/favorites', { kos_id: kosId });
        setFavorites(prev => [...prev, kosId]);
      }
    } catch (e) {
      console.error("Gagal update favorit:", e);
      alert("Silakan login terlebih dahulu untuk menyukai kos.");
    }
  };

  const fetchKosData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.kota) queryParams.append("kota", filters.kota);
      if (filters.tipe) queryParams.append("tipe", filters.tipe);
      if (filters.wifi) queryParams.append("wifi", "1");
      if (filters.ac) queryParams.append("ac", "1");
      if (filters.kamar_mandi_dalam) queryParams.append("kamar_mandi_dalam", "1");
      if (filters.parkir) queryParams.append("parkir", "1");
      if (filters.laundry) queryParams.append("laundry", "1");
      if (filters.dapur) queryParams.append("dapur", "1");
      if (filters.cctv) queryParams.append("cctv", "1");

      const res = await api.get(`/kos?${queryParams.toString()}`);
      let data = res.data || [];

      // Sorting lokal
      if (filters.sort === "Harga Termurah") {
        data = [...data].sort((a, b) => (parseFloat(a.harga_per_bulan) || 0) - (parseFloat(b.harga_per_bulan) || 0));
      } else if (filters.sort === "Harga Termahal") {
        data = [...data].sort((a, b) => (parseFloat(b.harga_per_bulan) || 0) - (parseFloat(a.harga_per_bulan) || 0));
      }

      setKostList(data);
    } catch (err) {
      console.error("Gagal mengambil data pencarian kos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKosData();
    fetchFavorites();
  }, []);

  const handleChangeFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilter = () => {
    const resetState = {
      kota: "",
      tipe: "",
      wifi: false,
      ac: false,
      kamar_mandi_dalam: false,
      parkir: false,
      laundry: false,
      dapur: false,
      cctv: false,
      sort: "Terbaru",
    };
    setFilters(resetState);
    fetchKosData();
  };

  const totalPages = Math.ceil(kostList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKosts = kostList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Navbar />
      <SearchFilter
        filters={filters}
        onChangeFilter={handleChangeFilter}
        onSearch={fetchKosData}
      />

      <div className="search-layout">
        <SidebarFilter
          filters={filters}
          onChangeFilter={handleChangeFilter}
          onApply={fetchKosData}
          onReset={handleResetFilter}
        />

        <div className="search-result">
          <div className="kost-header">
            <h2>
              <span>{kostList.length}</span> Kost Ditemukan
            </h2>

            <div className="sort-area">
              <label>Urutkan :</label>
              <select
                value={filters.sort}
                onChange={(e) => {
                  handleChangeFilter("sort", e.target.value);
                  fetchKosData();
                }}
              >
                <option value="Terbaru">Terbaru</option>
                <option value="Harga Termurah">Harga Termurah</option>
                <option value="Harga Termahal">Harga Termahal</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat daftar kos...</p>
          ) : kostList.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <h3>Tidak ada kost yang sesuai</h3>
              <p style={{ color: "#64748b", marginTop: "8px" }}>Coba ubah kata kunci atau reset filter pencarian Anda.</p>
            </div>
          ) : (
            currentKosts.map((kost) => (
              <KostCardHorizontal
                key={kost.id}
                kost={kost}
                isFavorite={favorites.includes(kost.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}