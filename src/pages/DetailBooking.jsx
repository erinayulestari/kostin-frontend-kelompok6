import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import BookingInfoCard from "../components/BookingInfoCard";
import PaymentInfoCard from "../components/PaymentInfoCard";
import BookingCostCard from "../components/BookingCostCard";
import BookingActionCard from "../components/BookingActionCard";
import BookingNote from "../components/BookingNote";

import defaultImg from "../assets/kost1.jpg";
import bca from "../assets/payment/bca.png";
import { ArrowLeft } from "lucide-react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

import "../styles/detailbooking.css";

export default function DetailBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load Midtrans Snap SDK
  useEffect(() => {
    const snapUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "Mid-client-8akLAXtH58wvLwIi";

    let scriptTag = document.querySelector(`script[src="${snapUrl}"]`);
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.src = snapUrl;
      scriptTag.setAttribute("data-client-key", clientKey);
      scriptTag.async = true;
      document.body.appendChild(scriptTag);
    }
  }, []);

  // Fetch Booking Details from Backend API
  useEffect(() => {
    async function fetchDetail() {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await api.get(`/bookings/${id}`);
        if (res.data) {
          setBookingData(res.data);
        }
      } catch (err) {
        console.error("Gagal memuat detail booking:", err);
        setError("Gagal memuat detail booking.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  const handlePayNow = () => {
    if (!bookingData) return;

    const snapToken = bookingData.snap_token;
    if (snapToken && window.snap) {
      window.snap.pay(snapToken, {
        onSuccess: async function () {
          try { await api.post(`/bookings/${id}/verify-payment`); } catch (e) {}
          alert("Pembayaran berhasil!");
          window.location.reload();
        },
        onPending: async function () {
          try { await api.post(`/bookings/${id}/verify-payment`); } catch (e) {}
          alert("Pembayaran pending, silakan selesaikan transaksi Anda.");
          window.location.reload();
        },
        onError: function () {
          alert("Pembayaran gagal, silakan coba lagi.");
        },
        onClose: function () {
          console.log("Snap modal closed");
        },
      });
    } else {
      // Re-checkout fallback
      const draft = {
        kos_id: bookingData.kos_id || bookingData.kos?.id,
        kos_nama: bookingData.kos?.nama_kos || "Kost",
        harga_per_bulan: bookingData.harga_per_bulan || bookingData.total_harga,
        tanggal_masuk: bookingData.tanggal_masuk,
        durasi_sewa: bookingData.durasi_bulan || 1,
        total_harga: bookingData.total_harga,
      };
      sessionStorage.setItem("checkout_draft", JSON.stringify(draft));
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="detail-booking-page" style={{ textAlign: "center", padding: "60px 0" }}>
          <p>Memuat detail booking...</p>
        </main>
        <Footer />
      </>
    );
  }

  // Format Helper
  const formatTanggal = (dateStr) => {
    if (!dateStr || dateStr === "-") return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
    } catch (e) {
      return dateStr;
    }
  };

  const calculateFinishDate = (checkinStr, durationMonths) => {
    if (!checkinStr) return "-";
    try {
      const d = new Date(checkinStr);
      if (isNaN(d.getTime())) return "-";
      d.setMonth(d.getMonth() + (Number(durationMonths) || 1));
      return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
    } catch (e) {
      return "-";
    }
  };

  const rawStatus = bookingData?.status || "menunggu_pembayaran";
  const formattedStatus = rawStatus.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const isPaid = rawStatus === "aktif" || rawStatus === "selesai";

  const kos = bookingData?.kos || {};
  const owner = kos.pemilik || {};

  const checkInFormatted = formatTanggal(bookingData?.tanggal_masuk);
  const finishFormatted = bookingData?.tanggal_keluar
    ? formatTanggal(bookingData.tanggal_keluar)
    : calculateFinishDate(bookingData?.tanggal_masuk, bookingData?.durasi_bulan);

  const formattedBooking = {
    id: bookingData?.id ? `KB-${bookingData.id}` : "KB-000000",
    bookingDate: formatTanggal(bookingData?.created_at),
    status: formattedStatus,
    rawStatus: rawStatus,
    paymentType: bookingData?.payment_type || "",
    metodePembayaran: bookingData?.metode_pembayaran || "",
    paymentMethod: bookingData?.metode_pembayaran
      ? bookingData.metode_pembayaran.replace(/_/g, " ").toUpperCase()
      : "Midtrans Payment Gateway",
    paymentStatus: formattedStatus,
    paymentDate: bookingData?.tanggal_bayar ? formatTanggal(bookingData.tanggal_bayar) : "-",
    transaction: bookingData?.midtrans_order_id || "-",
    amount: bookingData?.total_harga
      ? `Rp ${Number(bookingData.total_harga).toLocaleString("id-ID")}`
      : "Rp 0",
    image: kos.foto_utama_url || kos.foto_utama || defaultImg,
    name: kos.nama_kos || "Kost",
    address: [kos.alamat, kos.kecamatan, kos.kota].filter(Boolean).join(", ") || "Indonesia",
    owner: owner.nama || "Pemilik Kost",
    ownerPhone: owner.no_hp || "-",
    phone: owner.no_hp || "-",
    price: kos.harga_per_bulan
      ? `Rp ${Number(kos.harga_per_bulan).toLocaleString("id-ID")}`
      : "Rp 0",
    checkIn: checkInFormatted,
    duration: `${bookingData?.durasi_bulan || 1} Bulan`,
    finish: finishFormatted,
    finishDate: finishFormatted,
    bankLogo: bca,
    snapToken: bookingData?.snap_token,
    kosId: kos.id,
  };

  return (
    <>
      <Navbar />

      <main className="detail-booking-page">
        <button className="back-btn" onClick={() => navigate(role === 'pemilik' ? "/owner/booking" : "/booking")}>
          <ArrowLeft size={18} />
          Kembali ke {role === 'pemilik' ? "Booking Masuk" : "Booking Saya"}
        </button>

        <div className="detail-header">
          <h2>Detail Booking</h2>
          <p>Lihat informasi lengkap mengenai booking kost yang telah kamu lakukan.</p>
        </div>

        {error && (
          <div style={{ color: "#ef4444", padding: "1rem", backgroundColor: "#fee2e2", borderRadius: "8px", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <div className="detail-grid">
          <div className="detail-left">
            <BookingInfoCard booking={formattedBooking} />
            <BookingCostCard booking={formattedBooking} />
            <BookingNote />
          </div>

          <div className="detail-right">
            <PaymentInfoCard booking={formattedBooking} />
            <BookingActionCard
              kosId={formattedBooking.kosId}
              onPayNow={handlePayNow}
              isPaid={isPaid}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}