import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import TenantInfoCard from "../components/TenantInfoCard";
import BookingSummaryCard from "../components/BookingSummaryCard";
import PaymentMethodCard from "../components/PaymentMethodCard";
import PaymentSummaryCard from "../components/PaymentSummaryCard";

import "../styles/checkout.css";

export default function Checkout() {
  // ==========================
  // Dummy Data
  // ==========================

  const booking = {
    tenant: {
      name: "Erin Ayu Lestari",
      email: "erin.ayu@email.com",
      phone: "0812 3456 7890",
    },

    kost: {
      name: "Kost Putri Melati",
      address: "Jl. Melati No.45, Setiabudi, Jakarta Selatan",
      image: "/src/assets/harmoni.jpeg",
      price: "Rp 1.500.000",
      duration: "6 Bulan",
      checkin: "01 Juni 2024",
      status: "Menunggu Pembayaran",
    },

    payment: {
      subtotal: "Rp 9.000.000",
      admin: "Rp 50.000",
      discount: "- Rp 100.000",
      total: "Rp 8.950.000",
      countdown: "23 : 59 : 45",
    },
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">

        {/* ========================= */}
        {/* Header */}
        {/* ========================= */}

        <div className="checkout-header">

          <h1>Checkout Booking</h1>

          <p>
            Periksa kembali informasi booking dan
            selesaikan pembayaran.
          </p>

        </div>

        {/* ========================= */}
        {/* Grid */}
        {/* ========================= */}

        <div className="checkout-grid">

          {/* LEFT */}

          <div className="checkout-left">

            <TenantInfoCard
              tenant={booking.tenant}
            />

            <BookingSummaryCard
              booking={booking.kost}
            />

            <PaymentMethodCard />

          </div>

          {/* RIGHT */}

          <div className="checkout-right">

            <PaymentSummaryCard
              payment={booking.payment}
            />

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}