export default function BookingCard({ booking }) {

  return (

    <div className="booking-card">

      <img
        src={booking.image}
        alt={booking.tenant}
      />

      <div className="booking-user">

        <h3>{booking.tenant}</h3>

        <p>{booking.kost}</p>

      </div>

      <div className="booking-info">

        <small>Check In</small>

        <strong>{booking.date}</strong>

      </div>

      <div className="booking-info">

        <small>Durasi</small>

        <strong>{booking.duration}</strong>

      </div>

      <span
        className={
          booking.status === "success"
            ? "booking-status success"
            : "booking-status pending"
        }
      >
        {booking.status === "success"
          ? "Dikonfirmasi"
          : "Menunggu"}
      </span>

      <button className="detail-btn">

        Detail

      </button>

    </div>

  );

}