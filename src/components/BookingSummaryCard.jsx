import {
  FileText,
  MapPin,
} from "lucide-react";

export default function BookingSummaryCard({ booking }) {
  return (
    <section className="checkout-card">

      {/* Header */}

      <div className="checkout-card-title">

        <div className="checkout-card-icon">
          <FileText size={22} />
        </div>

        <h3>2. Ringkasan Booking</h3>

      </div>

      <div className="summary-wrapper">

        {/* Foto */}

        <img
          src={booking.image}
          alt={booking.name}
          className="summary-image"
        />

        {/* Informasi */}

        <div className="summary-content">

          <h2>{booking.name}</h2>

          <p className="summary-address">

            <MapPin size={16} />

            {booking.address}

          </p>

          <div className="summary-detail">

            <div className="summary-row">

              <span>Harga per bulan</span>

              <strong>{booking.price}</strong>

            </div>

            <div className="summary-row">

              <span>Durasi Sewa</span>

              <strong>{booking.duration}</strong>

            </div>

            <div className="summary-row">

              <span>Tanggal Masuk</span>

              <strong>{booking.checkin}</strong>

            </div>

          </div>

          <hr />

          <div className="summary-status">

            <span>Status</span>

            <div className="status waiting">

              <div className="status-dot"></div>

              {booking.status}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}