import { useState, useEffect } from "react";
import KostCard from "./KostCard";
import api from "../api/api";

export default function SimilarKost({ currentKosId }) {
  const [similarList, setSimilarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSimilar() {
      try {
        const res = await api.get('/kos');
        const allKos = res.data || [];
        // Filter out current kos ID and pick up to 3 similar kos
        const filtered = allKos.filter(k => Number(k.id) !== Number(currentKosId)).slice(0, 3);
        setSimilarList(filtered);
      } catch (err) {
        console.error("Gagal memuat rekomendasi kos serupa:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSimilar();
  }, [currentKosId]);

  if (!loading && similarList.length === 0) {
    return null; // Sembunyikan section jika tidak ada kos lain di DB
  }

  return (
    <section className="similar-section">
      <h2>Kost Rekomendasi Lainnya</h2>

      <div className="similar-grid">
        {loading ? (
          <p style={{ color: "#64748b", gridColumn: "span 3" }}>Memuat kos rekomendasi...</p>
        ) : (
          similarList.map((item) => (
            <KostCard key={item.id} data={item} />
          ))
        )}
      </div>
    </section>
  );
}