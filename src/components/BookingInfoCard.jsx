import { FileText } from "lucide-react";

export default function BookingInfoCard({ booking }) {
  return (
    <section className="booking-card">

      <div className="card-title">

        <div className="card-icon">
          <FileText size={22} />
        </div>

        <h3>Informasi Booking</h3>

      </div>

      <div className="booking-info-grid">

        <div className="booking-left">

          <div className="booking-item">

            <span>ID Booking</span>

            <h4>{booking.id}</h4>

          </div>

          <div className="booking-item">

            <span>Tanggal Booking</span>

            <h4>{booking.bookingDate}</h4>

          </div>

        </div>

        <div className="booking-right">

          <div className="booking-item">

            <span>Status Booking</span>

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