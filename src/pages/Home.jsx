import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import Footer from "../components/Footer";
import FeatureSection from "../components/FeatureSection";
import CategoryCard from "../components/CategoryCard";
import KostCard from "../components/KostCard";
import api from "../api/api";

import kost from "../assets/premium.jpeg";

import "../styles/home.css";

export default function Home() {
  const [recommendations, setRecommendations] = useState([]);
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
    fetchRecommendations();
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <SearchBox />

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
              <KostCard key={item.id} data={item} />
            ))
          )}
        </div>
      </section>

      <FeatureSection />
      <Footer />
    </div>
  );
}