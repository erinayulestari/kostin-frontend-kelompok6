import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingCard from "../components/BookingCard";
import EmptyBooking from "../components/EmptyBooking";

import booking1 from "../assets/booking/kost.jpg";
import booking2 from "../assets/booking/kost1.jpg";
import booking3 from "../assets/booking/melati3.jpeg";

import "../styles/booking.css";

export default function BookingSaya() {

  // ===========================
  // Dummy Data
  // Ubah menjadi [] untuk melihat Empty State
  // ===========================

  const bookings = [
    {
      id: 1,
      name: "Kost Putri Melati",
      image: booking1,
      location: "Jl. Melati No.45, Setiabudi, Jakarta Selatan",
      price: "Rp 1.500.000 / bulan",
      bookingDate: "12 Mei 2024",
      checkIn: "01 Juni 2024",
      duration: "6 Bulan",
      status: "pending",
    },
    {
      id: 2,
      name: "Kost Eksklusif Blue House",
      image: booking2,
      location: "Jl. Cendrawasih No.10, Depok, Jawa Barat",
      price: "Rp 1.800.000 / bulan",
      bookingDate: "28 April 2024",
      checkIn: "15 Mei 2024",
      duration: "3 Bulan",
      status: "confirmed",
    },
    {
      id: 3,
      name: "Kost Nyaman Putra",
      image: booking3,
      location: "Jl. Swadaya Raya No.8, Yogyakarta",
      price: "Rp 1.200.000 / bulan",
      bookingDate: "10 Maret 2024",
      checkIn: "20 Maret 2024",
      duration: "12 Bulan",
      status: "active",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="booking-page">

        <div className="booking-header">

          <h1>Booking Saya</h1>

          <p>
            Lihat status dan riwayat booking kost yang telah kamu lakukan.
          </p>

        </div>

        {bookings.length > 0 ? (

          <div className="booking-list">

            {bookings.map((booking) => (

              <BookingCard
                key={booking.id}
                booking={booking}
              />

            ))}

          </div>

        ) : (

          <EmptyBooking />

        )}

      </main>

      <Footer />
    </>
  );
}