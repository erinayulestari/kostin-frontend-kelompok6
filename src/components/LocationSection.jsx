import { MapPin, Navigation, Building2, Map } from "lucide-react";
import mapImage from "../assets/map.jpg";

export default function LocationSection({ kos }) {
  if (!kos) return null;

  const fullAddress = [
    kos.alamat,
    kos.kecamatan ? `Kec. ${kos.kecamatan}` : null,
    kos.kota,
    kos.provinsi,
    kos.kode_pos ? `Kode Pos ${kos.kode_pos}` : null,
  ]
    .filter(Boolean)
    .join(", ") || "Lokasi kos belum diset.";

  const handleOpenRoute = () => {
    let mapsUrl = "";
    if (kos.lat && kos.lng) {
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${kos.lat},${kos.lng}`;
    } else {
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    }
    window.open(mapsUrl, "_blank");
  };

  return (
    <section className="location-section">
      <h2>Lokasi Kost</h2>

      <div className="location-wrapper">
        <div className="map-card">
          <img src={mapImage} alt="Peta Lokasi Kos" onError={(e) => { e.target.src = mapImage; }} />
        </div>

        <div className="location-info">
          <h4>{fullAddress}</h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            {kos.kota && (
              <div className="near-place">
                <Building2 size={18} color="#2563EB" />
                <span>Kota / Kabupaten</span>
                <strong>{kos.kota}</strong>
              </div>
            )}

            {kos.kecamatan && (
              <div className="near-place">
                <MapPin size={18} color="#2563EB" />
                <span>Kecamatan</span>
                <strong>{kos.kecamatan}</strong>
              </div>
            )}

            {kos.provinsi && (
              <div className="near-place">
                <Map size={18} color="#2563EB" />
                <span>Provinsi</span>
                <strong>{kos.provinsi}</strong>
              </div>
            )}
          </div>

          <button className="route-btn" onClick={handleOpenRoute}>
            <Navigation size={18} />
            Lihat Rute di Maps
          </button>
        </div>
      </div>
    </section>
  );
}