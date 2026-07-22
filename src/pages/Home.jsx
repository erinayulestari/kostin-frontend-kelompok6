import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FeatureSection from "../components/FeatureSection";
import CategoryCard from "../components/CategoryCard";
import KostCard from "../components/KostCard";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

import kost from "../assets/premium.jpeg";

import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const res = await api.get('/kos');
        if (res.data) {
          setRecommendations(res.data);
        }
      } catch (err) {
        console.error("Gagal memuat rekomendasi kos:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchFavorites() {
      if (!isAuthenticated) {
        setFavoriteIds([]);
        return;
      }
      try {
        const resFav = await api.get('/favorites');
        const favData = resFav.data || [];
        const ids = favData.map(item => item.kos_id || item.kos?.id || item.id).filter(Boolean);
        setFavoriteIds(ids);
      } catch (err) {
        console.error("Gagal memuat favorit user:", err);
      }
    }

    fetchRecommendations();
    fetchFavorites();
  }, [isAuthenticated]);

  const handleToggleFavorite = async (kosId) => {
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu untuk menyimpan kos favorit.");
      navigate("/login");
      return;
    }

    const isFav = favoriteIds.includes(kosId);
    if (isFav) {
      setFavoriteIds(prev => prev.filter(id => id !== kosId));
      try {
        await api.delete(`/favorites/${kosId}`);
      } catch (err) {
        console.error("Gagal menghapus favorit:", err);
        setFavoriteIds(prev => [...prev, kosId]);
        alert("Gagal menghapus kos dari favorit.");
      }
    } else {
      setFavoriteIds(prev => [...prev, kosId]);
      try {
        await api.post('/favorites', { kos_id: kosId });
      } catch (err) {
        console.error("Gagal menambah favorit:", err);
        setFavoriteIds(prev => prev.filter(id => id !== kosId));
        alert("Gagal menambahkan kos ke favorit.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Hero />

      <section className="category-section">
        <h2>Temukan Kost Sesuai Kebutuhanmu</h2>
        <div className="category-grid">
          <CategoryCard type="putri" image={kost} />
          <CategoryCard type="putra" image={kost} />
          <CategoryCard type="campur" image={kost} />
          <CategoryCard type="premium" image={kost} />
        </div>
      </section>

      <section className="kost-section">
        <h2>Rekomendasi Kost Untukmu</h2>

        <div className="kost-list">
          {loading ? (
            <p style={{ textAlign: "center", padding: "20px" }}>Memuat rekomendasi...</p>
          ) : recommendations.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px", width: "100%" }}>
              <p>Belum ada data kos yang tersedia saat ini.</p>
            </div>
          ) : (
            recommendations.map((item) => (
              <KostCard
                key={item.id}
                data={item}
                isFavorite={favoriteIds.includes(item.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          )}
        </div>
      </section>

      <FeatureSection />
      <Footer />
    </div>
  );
}