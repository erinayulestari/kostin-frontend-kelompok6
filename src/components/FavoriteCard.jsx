import { Heart, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/kost1.jpg";

export default function FavoriteCard({ favItem, onRemove }) {
  const navigate = useNavigate();

  const kos = favItem?.kos || favItem;
  const kosId = kos?.id || favItem?.kos_id;

  const nama = kos?.nama_kos || kos?.nama || "Kos Favorit";
  const lokasi = kos?.kota || kos?.lokasi || "Indonesia";
  const image = kos?.foto_utama_url || kos?.foto_utama || kos?.image || defaultImg;

  const rawHarga = kos?.harga_per_bulan || kos?.harga || 0;
  const formattedHarga = typeof rawHarga === "number"
    ? `Rp${rawHarga.toLocaleString("id-ID")}`
    : rawHarga.toString().startsWith("Rp") ? rawHarga : `Rp${rawHarga}`;

  const rating = kos?.rating || "4.8";

  return (
    <div className="favorite-card">
      <div className="favorite-image">
        <img src={image} alt={nama} onError={(e) => { e.target.src = defaultImg; }} />

        {kos?.tipe && (
          <span className="favorite-badge">
            {kos.tipe.toUpperCase()}
          </span>
        )}

        <button
          className="favorite-love"
          onClick={() => onRemove && onRemove(kosId)}
        >
          <Heart size={20} fill="#EF4444" color="#EF4444" />
        </button>
      </div>

      <div className="favorite-content">
        <div className="favorite-rating">
          <Star size={16} fill="#FACC15" color="#FACC15" />
          <span>{rating}</span>
        </div>

        <h3>{nama}</h3>

        <p className="favorite-location">
          <MapPin size={16} />
          {lokasi}
        </p>

        <h2>{formattedHarga}</h2>

        <div className="favorite-button-group">
          <button
            className="detail-btn"
            onClick={() => navigate(kosId ? `/kost/${kosId}` : "/detail-kost")}
          >
            Lihat Detail
          </button>

          <button
            className="remove-btn"
            onClick={() => onRemove && onRemove(kosId)}
          >
            Hapus Favorit
          </button>
        </div>
      </div>
    </div>
  );
}