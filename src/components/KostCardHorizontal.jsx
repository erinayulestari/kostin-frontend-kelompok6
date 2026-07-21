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

export default function KostCardHorizontal({ kost }) {

  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  return (

    <div className="kost-horizontal">

      <div className="kost-horizontal-image">

        <img
          src={kost.image}
          alt={kost.nama}
        />

        <button
          className={`love-btn ${favorite ? "active" : ""}`}
          onClick={() => setFavorite(!favorite)}
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

            <h3>{kost.nama}</h3>

            <p className="location">

              <MapPin size={16} />

              {kost.lokasi}

            </p>

          </div>

          <div className="rating-box">

            <Star
              size={16}
              fill="#FACC15"
              color="#FACC15"
            />

            <span>{kost.rating}</span>

          </div>

        </div>

        <div className="badge-list">

          {kost.premium && (

            <span className="premium">

              Premium

            </span>

          )}

          <span className="available">

            Tersedia

          </span>

        </div>

        <p className="description">

          Kost eksklusif dengan fasilitas lengkap,
          lingkungan nyaman, bersih, dan dekat pusat kota.

        </p>

        <div className="facility-list">

          {kost.fasilitas.includes("WiFi") && (

            <span>

              <Wifi size={15} />

              WiFi

            </span>

          )}

          {kost.fasilitas.includes("AC") && (

            <span>

              <Snowflake size={15} />

              AC

            </span>

          )}

          {kost.fasilitas.includes("Parkir") && (

            <span>

              <Car size={15} />

              Parkir

            </span>

          )}

        </div>

        <div className="bottom-info">

          <div>

            <h2>{kost.harga}</h2>

            <small>/bulan</small>

          </div>

          <div className="action-btn">

            <button className="save-btn">

              Simpan

            </button>

            <button
              className="detail-btn"
              onClick={() => navigate("/detail-kost")}
            >

              Lihat Detail

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}