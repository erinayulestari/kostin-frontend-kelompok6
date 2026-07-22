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
  const formattedPrice = typeof rawPrice === "number"
    ? `Rp${rawPrice.toLocaleString("id-ID")}`
    : rawPrice.toString().startsWith("Rp") ? rawPrice : `Rp${rawPrice}`;

  const rating = data.rating || data.reviews_avg_rating || "4.8";

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
        <h3>{name}</h3>

        <p className="location">
          <MapPin size={15} />
          {location}
        </p>

        <div className="price-rating">
          <h4>{formattedPrice}/bulan</h4>

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