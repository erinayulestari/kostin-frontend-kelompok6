import { MapPin, Navigation } from "lucide-react";
import mapImage from "../assets/map.jpg"; // ganti nanti kalau sudah punya

export default function LocationSection() {
  return (
    <section className="location-section">

      <h2>Lokasi Kost</h2>

      <div className="location-wrapper">

        <div className="map-card">
          <img
            src={mapImage}
            alt="Map"
          />
        </div>

        <div className="location-info">

          <h4>
            Jl. Melati No.45, Kel. Tamalate,
            Kec. Rappocini,
            Makassar
          </h4>

          <div className="near-place">
            <MapPin size={18}/>
            <span>Universitas Hasanuddin</span>
            <strong>800 meter</strong>
          </div>

          <div className="near-place">
            <MapPin size={18}/>
            <span>Indomaret</span>
            <strong>200 meter</strong>
          </div>

          <div className="near-place">
            <MapPin size={18}/>
            <span>Rumah Sakit</span>
            <strong>1.2 km</strong>
          </div>

          <div className="near-place">
            <MapPin size={18}/>
            <span>Halte Bus</span>
            <strong>350 meter</strong>
          </div>

          <button className="route-btn">

            <Navigation size={18}/>

            Lihat Rute

          </button>

        </div>

      </div>

    </section>
  );
}