import { useNavigate } from "react-router-dom";

import emptyBooking from "../assets/empty-booking.png";

export default function EmptyBooking() {
  const navigate = useNavigate();

  return (
    <div className="empty-booking">

      <img
        src={emptyBooking}
        alt="Belum ada booking"
      />

      <h2>Belum Ada Booking</h2>

      <p>
        Kamu belum melakukan booking kost.
        <br />
        Yuk mulai cari kost yang sesuai dengan kebutuhanmu.
      </p>

      <button
        onClick={() => navigate("/carikost")}
      >
        Cari Kost
      </button>

    </div>
  );
}