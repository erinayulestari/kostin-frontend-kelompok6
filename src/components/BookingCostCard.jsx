import { Home, MapPin } from "lucide-react";
import defaultImg from "../assets/kost1.jpg";

export default function BookingCostCard({ booking }) {
  return (
    <section className="booking-cost-card">
      <div className="card-title">
        <div className="card-icon">
          <Home size={22} />
        </div>
        <h3>Informasi Kost</h3>
      </div>

      <div className="kost-wrapper">
        <img
          src={booking.image || defaultImg}
          alt={booking.name}
          className="kost-image"
          onError={(e) => { e.target.src = defaultImg; }}
        />

        <div className="kost-info">
          <div className="kost-header-info" style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
              {booking.name}
            </h2>
            <p className="kost-address" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748B", fontSize: "15px", margin: 0 }}>
              <MapPin size={16} color="#2563EB" />
              {booking.address}
            </p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #E2E8F0", margin: "20px 0 24px" }} />

          <div className="kost-detail-grid">
            <div className="detail-item">
              <span>Nama Pemilik</span>
              <h4>{booking.owner || "-"}</h4>
            </div>

            <div className="detail-item">
              <span>No. Telepon Pemilik</span>
              <h4>{booking.ownerPhone || booking.phone || "-"}</h4>
            </div>

            <div className="detail-item">
              <span>Harga per Bulan</span>
              <h4>{booking.price || "Rp 0"}</h4>
            </div>

            <div className="detail-item">
              <span>Tanggal Masuk</span>
              <h4>{booking.checkIn || "-"}</h4>
            </div>

            <div className="detail-item">
              <span>Durasi Sewa</span>
              <h4>{booking.duration || "1 Bulan"}</h4>
            </div>

            <div className="detail-item">
              <span>Tanggal Selesai</span>
              <h4>{booking.finishDate || booking.finish || "-"}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}