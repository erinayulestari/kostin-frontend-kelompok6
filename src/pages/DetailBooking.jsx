import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import BookingInfoCard from "../components/BookingInfoCard";
import PaymentInfoCard from "../components/PaymentInfoCard";
import BookingCostCard from "../components/BookingCostCard";
import BookingActionCard from "../components/BookingActionCard";
import BookingNote from "../components/BookingNote";

import booking1 from "../assets/booking/kost.jpg";
import bca from "../assets/payment/bca.png";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/detailbooking.css";

export default function DetailBooking() {

  const navigate = useNavigate();

  // ===========================
  // Dummy Data
  // Nanti diganti API
  // ===========================

  const booking = {

    id: "KB-240601-00025",

    bookingDate: "01 Juni 2024, 14:30 WIB",

    status: "Menunggu Pembayaran",

    paymentMethod: "Transfer Bank - BCA",

    paymentStatus: "Menunggu Pembayaran",

    paymentDate: "-",

    transaction: "-",

    amount: "Rp 1.550.000",

    image: booking1,

    kostName: "Kost Putri Melati",

    location:
      "Jl. Melati No.45, Setiabudi, Jakarta Selatan",

    owner: "Budi Santoso",

    phone: "0812 3456 7890",

    price: "Rp 1.500.000",

    checkIn: "01 Juni 2024",

    duration: "6 Bulan",

    finish: "01 Desember 2024",

    bankLogo: bca,

  };

  return (
    <>
      <Navbar />

      <main className="detail-booking-page">

        <button
          className="back-btn"
          onClick={() => navigate("/booking")}
        >
          <ArrowLeft size={18} />

          Kembali ke Booking Saya

        </button>

        <div className="detail-header">

          <h2>Detail Booking</h2>

          <p>
            Lihat informasi lengkap mengenai booking kost
            yang telah kamu lakukan.
          </p>

        </div>

        <div className="detail-grid">

          <div className="detail-left">

            <BookingInfoCard booking={booking} />

            <BookingCostCard booking={booking} />

            <BookingNote />

          </div>

          <div className="detail-right">

            <PaymentInfoCard booking={booking} />

            <BookingActionCard />

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}