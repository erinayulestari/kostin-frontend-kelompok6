import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Star } from "lucide-react";
import defaultImg from "../assets/kost1.jpg";

export default function KostCard({ data, onToggleFavorite, isFavorite = false }) {
  const navigate = useNavigate();

  const id = data.id;
  const name = data.nama_kos || data.nama || data.name || "Kos";
  const location = data.kota || data.lokasi || data.location || "Indonesia";
  const image = data.foto_utama_url || data.foto_utama || data.image || defaultImg;

  const rawPrice = data.harga_per_bulan || data.harga || data.price || 0;
  const numPrice = typeof rawPrice === "number" ? rawPrice : (parseFloat(String(rawPrice)) || 0);
  const formattedPrice = `Rp ${Math.round(numPrice).toLocaleString("id-ID")}`;

  const rawRating = data.rating || data.reviews_avg_rating;
  const rating = (rawRating && Number(rawRating) > 0) ? Number(rawRating).toFixed(1) : "0.0";

  const handleCardClick = () => {
    if (id) {
      navigate(`/kost/${id}`);
    } else {
      navigate("/detail-kost");
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  const sisaKamar = data.sisa_kamar !== undefined
    ? data.sisa_kamar
    : (data.kamar_tersedia !== undefined
        ? data.kamar_tersedia
        : (data.jumlah_kamar !== undefined && data.kamar_terisi !== undefined
            ? Math.max(0, data.jumlah_kamar - data.kamar_terisi)
            : 3));

  return (
    <div
      className="kost-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="kost-image">
        <img src={image} alt={name} onError={(e) => { e.target.src = defaultImg; }} />
        <button
          className={`favorite ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
          style={isFavorite ? { color: "#ef4444", backgroundColor: "#fee2e2" } : {}}
        >
          <Heart size={20} fill={isFavorite ? "#ef4444" : "none"} />
        </button>
      </div>

      <div className="kost-content">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <h3>{name}</h3>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "#16a34a", backgroundColor: "#dcfce7", padding: "3px 8px", borderRadius: "12px", whiteSpace: "nowrap" }}>
            Sisa {sisaKamar} Kamar
          </span>
        </div>

        <p className="location">
          <MapPin size={15} />
          {location}
        </p>

        <div className="price-rating">
          <h4>{formattedPrice} <span style={{ fontSize: "13px", fontWeight: "normal", color: "#64748B" }}>/ bulan</span></h4>

          <div className="rating">
            <Star size={17} fill="#FACC15" color="#FACC15" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="facility">
          {data.wifi && <span>WiFi</span>}
          {data.ac && <span>AC</span>}
          {data.parkir && <span>Parkir</span>}
          {(!data.wifi && !data.ac && !data.parkir) && (
            <>
              <span>WiFi</span>
              <span>AC</span>
              <span>Parkir</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}