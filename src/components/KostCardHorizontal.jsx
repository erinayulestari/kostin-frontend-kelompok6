import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  Star,
  Wifi,
  Car,
  Snowflake,
} from "lucide-react";
import defaultImg from "../assets/kost1.jpg";
import api from "../api/api";

export default function KostCardHorizontal({ kost, onToggleFavorite, isFavorite = false }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);

  const id = kost.id;
  const name = kost.nama_kos || kost.nama || kost.name || "Kos";
  const location = kost.kota || kost.lokasi || kost.location || "Indonesia";
  const image = kost.foto_utama_url || kost.foto_utama || kost.image || defaultImg;
  const description = kost.deskripsi || "Kost nyaman dengan fasilitas lengkap, lingkungan aman dan bersih.";

  const rawPrice = kost.harga_per_bulan || kost.harga || 0;
  const formattedPrice = typeof rawPrice === "number"
    ? `Rp${rawPrice.toLocaleString("id-ID")}`
    : rawPrice.toString().startsWith("Rp") ? rawPrice : `Rp${rawPrice}`;

  const rating = kost.rating || kost.reviews_avg_rating || "4.8";

  const handleFavorite = async () => {
    try {
      if (favorite) {
        await api.delete(`/favorites/${id}`);
        setFavorite(false);
      } else {
        await api.post('/favorites', { kos_id: id });
        setFavorite(true);
      }
      if (onToggleFavorite) onToggleFavorite(id, !favorite);
    } catch (e) {
      console.error("Failed toggle favorite", e);
    }
  };

  return (
    <div className="kost-horizontal">
      <div className="kost-horizontal-image">
        <img
          src={image}
          alt={name}
          onError={(e) => { e.target.src = defaultImg; }}
        />
        <button
          className={`love-btn ${favorite ? "active" : ""}`}
          onClick={handleFavorite}
        >
          <Heart
            size={18}
            fill={favorite ? "#EF4444" : "none"}
            color={favorite ? "#EF4444" : "#64748B"}
          />
        </button>
      </div>

      <div className="kost-horizontal-content">
        <div className="top-info">
          <div>
            <h3>{name}</h3>
            <p className="location">
              <MapPin size={16} />
              {location}
            </p>
          </div>

          <div className="rating-box">
            <Star size={16} fill="#FACC15" color="#FACC15" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="badge-list">
          {kost.tipe && (
            <span className="premium">
              {kost.tipe.toUpperCase()}
            </span>
          )}
          <span className="available">
            {kost.jumlah_kamar > kost.kamar_terisi ? "Tersedia" : "Penuh"}
          </span>
        </div>

        <p className="description">
          {description}
        </p>

        <div className="facility-list">
          {kost.wifi && (
            <span>
              <Wifi size={15} />
              WiFi
            </span>
          )}
          {kost.ac && (
            <span>
              <Snowflake size={15} />
              AC
            </span>
          )}
          {kost.parkir && (
            <span>
              <Car size={15} />
              Parkir
            </span>
          )}
          {(!kost.wifi && !kost.ac && !kost.parkir) && (
            <span>Fasilitas Lengkap</span>
          )}
        </div>

        <div className="bottom-info">
          <div>
            <h2>{formattedPrice}</h2>
            <small>/bulan</small>
          </div>

          <div className="action-btn">
            <button className="save-btn" onClick={handleFavorite}>
              {favorite ? "Tersimpan" : "Simpan"}
            </button>
            <button
              className="detail-btn"
              onClick={() => navigate(id ? `/kost/${id}` : "/detail-kost")}
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}