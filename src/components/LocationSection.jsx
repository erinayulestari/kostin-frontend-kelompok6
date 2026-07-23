import { MapPin, Navigation, Building2, Map } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default marker icon path issue with Vite bundler
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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

  const hasCoordinates = kos.lat && kos.lng && !isNaN(Number(kos.lat)) && !isNaN(Number(kos.lng));

  return (
    <section className="location-section">
      <h2>Lokasi Kost</h2>

      <div className="location-wrapper">
        <div className="map-card">
          {hasCoordinates ? (
            <MapContainer
              center={[Number(kos.lat), Number(kos.lng)]}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: "350px", width: "100%", borderRadius: "12px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[Number(kos.lat), Number(kos.lng)]}>
                <Popup>
                  <strong>{kos.nama_kos}</strong><br />
                  {kos.alamat}<br />
                  <span>Rp {Number(kos.harga_per_bulan)?.toLocaleString("id-ID")}/bulan</span>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="map-fallback">
              <MapPin size={36} color="#94a3b8" />
              <p>Koordinat peta belum diatur oleh pemilik.</p>
            </div>
          )}
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