import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import FavoriteHero from "../components/FavoriteHero";
import FavoriteCard from "../components/FavoriteCard";
import api from "../api/api";

import "../styles/favorite.css";

export default function Favorit() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await api.get('/favorites');
      if (res.data) {
        setFavorites(res.data);
      }
    } catch (err) {
      console.error("Gagal memuat favorit:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (kosId) => {
    try {
      await api.delete(`/favorites/${kosId}`);
      setFavorites((prev) => prev.filter((item) => (item.kos_id || item.kos?.id || item.id) !== kosId));
    } catch (err) {
      console.error("Gagal menghapus favorit:", err);
      alert("Gagal menghapus kos dari favorit.");
    }
  };

  return (
    <>
      <Navbar />

      <FavoriteHero />

      <section className="favorite-section">
        <div className="favorite-header">
          <h2>Kost Favorit Saya</h2>
          <p>Tersimpan {favorites.length} kost favorit</p>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat kos favorit...</p>
        ) : favorites.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <h3>Belum Ada Kost Favorit</h3>
            <p style={{ color: "#64748b", marginTop: "8px" }}>
              Jelajahi pilihan kost terbaik dan klik ikon hati untuk menyimpan ke daftar favorit Anda.
            </p>
          </div>
        ) : (
          <div className="favorite-grid">
            {favorites.map((fav) => (
              <FavoriteCard
                key={fav.id || fav.kos_id}
                favItem={fav}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}