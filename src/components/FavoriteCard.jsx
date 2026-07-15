import { Heart, MapPin, Star } from "lucide-react";

export default function FavoriteCard({ kost }) {
  return (
    <div className="favorite-card">

      <div className="favorite-image">

        <img
          src={kost.image}
          alt={kost.nama}
        />

        {kost.premium && (
          <span className="favorite-badge">
            Premium
          </span>
        )}

        <button className="favorite-love">
          <Heart
            size={20}
            fill="#EF4444"
            color="#EF4444"
          />
        </button>

      </div>

      <div className="favorite-content">

        <div className="favorite-rating">

          <Star
            size={16}
            fill="#FACC15"
            color="#FACC15"
          />

          <span>{kost.rating}</span>

        </div>

        <h3>{kost.nama}</h3>

        <p className="favorite-location">

          <MapPin size={16} />

          {kost.lokasi}

        </p>

        <h2>{kost.harga}</h2>

        <div className="favorite-button-group">

          <button className="detail-btn">
            Lihat Detail
          </button>

          <button className="remove-btn">
            Hapus Favorit
          </button>

        </div>

      </div>

    </div>
  );
}