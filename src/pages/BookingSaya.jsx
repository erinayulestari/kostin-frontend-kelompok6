import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingCard from "../components/BookingCard";
import EmptyBooking from "../components/EmptyBooking";
import api from "../api/api";

import "../styles/booking.css";

export default function BookingSaya() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings');
      if (res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data booking:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin membatalkan booking ini?")) return;
    try {
      await api.post(`/bookings/${id}/cancel`);
      alert("Booking berhasil dibatalkan.");
      fetchBookings();
    } catch (err) {
      console.error("Gagal membatalkan booking:", err);
      alert(err.message || "Gagal membatalkan booking.");
    }
  };

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

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat riwayat booking...</p>
        ) : bookings.length > 0 ? (
          <div className="booking-list">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancelBooking}
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