import { Home } from "lucide-react";

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
          src={booking.image}
          alt={booking.name}
          className="kost-image"
        />

        <div className="kost-info">

          <h2>{booking.name}</h2>

          <p className="kost-address">
            {booking.address}
          </p>

          <div className="kost-detail-grid">

            <div className="detail-item">
              <span>Nama Pemilik</span>
              <h4>{booking.owner}</h4>
            </div>

            <div className="detail-item">
              <span>No. Telepon Pemilik</span>
              <h4>{booking.ownerPhone}</h4>
            </div>

            <div className="detail-item">
              <span>Harga per Bulan</span>
              <h4>{booking.price}</h4>
            </div>

            <div className="detail-item">
              <span>Tanggal Masuk</span>
              <h4>{booking.checkIn}</h4>
            </div>

            <div className="detail-item">
              <span>Durasi Sewa</span>
              <h4>{booking.duration}</h4>
            </div>

            <div className="detail-item">
              <span>Tanggal Selesai</span>
              <h4>{booking.finishDate}</h4>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}