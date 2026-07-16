import {
  MapPin,
} from "lucide-react";

export default function BookingCard({ booking }) {
  const statusMap = {
    pending: {
      text: "Menunggu Konfirmasi",
      className: "status-pending",
    },
    confirmed: {
      text: "Dikonfirmasi",
      className: "status-confirmed",
    },
    active: {
      text: "Sedang Berjalan",
      className: "status-active",
    },
  };

  const status = statusMap[booking.status];

  return (
    <div className="booking-card">

      {/* ==========================
          Gambar Kost
      ========================== */}

      <div className="booking-image">

        <img
          src={booking.image}
          alt={booking.name}
        />

      </div>

      {/* ==========================
          Informasi
      ========================== */}

      <div className="booking-content">

        <div className="booking-top">

          <div>

            <h2>{booking.name}</h2>

            <p className="booking-location">

              <MapPin size={16} />

              {booking.location}

            </p>

            <h3>{booking.price}</h3>

          </div>

          <span className={status.className}>
            {status.text}
          </span>

        </div>

        <hr />

        <div className="booking-bottom">

          <div className="booking-info">

            <div>

              <small>Tanggal Booking</small>

              <strong>{booking.bookingDate}</strong>

            </div>

            <div>

              <small>Tanggal Masuk</small>

              <strong>{booking.checkIn}</strong>

            </div>

            <div>

              <small>Durasi Sewa</small>

              <strong>{booking.duration}</strong>

            </div>

          </div>

          <div className="booking-action">

            <button className="detail-btn">
              Lihat Detail
            </button>

            <button className="contact-btn">
              Hubungi Pemilik
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}