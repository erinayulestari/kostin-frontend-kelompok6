import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import TenantInfoCard from "../components/TenantInfoCard";
import BookingSummaryCard from "../components/BookingSummaryCard";
import PaymentSummaryCard from "../components/PaymentSummaryCard";

import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import "../styles/checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tenantOverride, setTenantOverride] = useState(null);
  const [draft, setDraft] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const storedDraft = sessionStorage.getItem("checkout_draft");
    if (storedDraft) {
      setDraft(JSON.parse(storedDraft));
    } else {
      // Default draft jika tidak ada
      const today = new Date().toISOString().split("T")[0];
      setDraft({
        kos_id: 1,
        kos_nama: "Kost Putri Melati",
        harga_per_bulan: 1500000,
        tanggal_masuk: today,
        durasi_sewa: 1,
        total_harga: 1500000,
      });
    }
  }, []);

  const handlePayNow = async () => {
    if (!draft) return;
    setError("");
    setSubmitting(true);

    try {
      const payload = {
        kos_id: draft.kos_id,
        tanggal_masuk: draft.tanggal_masuk || new Date().toISOString().split("T")[0],
        durasi_bulan: draft.durasi_sewa || 1,
      };

      const res = await api.post("/bookings", payload);
      const createdBooking = res.data?.data || res.data || res;
      const bookingId = createdBooking?.id;

      sessionStorage.removeItem("checkout_draft");

      const snapToken = res.data?.snap_token || res.snap_token || res.data?.payment?.snap_token || createdBooking?.snap_token;
      if (snapToken && window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: async function () {
            if (bookingId) {
              try { await api.post(`/bookings/${bookingId}/verify-payment`); } catch(e) {}
            }
            navigate("/booking");
          },
          onPending: async function () {
            if (bookingId) {
              try { await api.post(`/bookings/${bookingId}/verify-payment`); } catch(e) {}
            }
            navigate("/booking");
          },
          onError: function () {
            alert("Pembayaran gagal, silakan coba lagi.");
          },
          onClose: function () {
            navigate("/booking");
          }
        });
      } else {
        if (bookingId) {
          try { await api.post(`/bookings/${bookingId}/verify-payment`); } catch(e) {}
        }
        alert("Booking berhasil dibuat!");
        navigate("/booking");
      }
    } catch (err) {
      setError(err.message || "Gagal membuat transaksi booking.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTenantInfo = (updated) => {
    setTenantOverride(updated);
    if (draft) {
      const newDraft = {
        ...draft,
        tanggal_masuk: updated.tanggal_masuk || draft.tanggal_masuk,
        durasi_sewa: Number(updated.durasi_sewa) || draft.durasi_sewa,
      };
      setDraft(newDraft);
      sessionStorage.setItem("checkout_draft", JSON.stringify(newDraft));
    }
  };

  const tenantData = {
    name: tenantOverride?.name || user?.nama || "Penyewa",
    email: tenantOverride?.email || user?.email || "user@email.com",
    phone: tenantOverride?.phone || user?.no_hp || "-",
    raw_tanggal_masuk: draft?.tanggal_masuk || new Date().toISOString().split("T")[0],
    checkin: draft?.tanggal_masuk ? new Date(draft.tanggal_masuk).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "Segera",
    durasi_sewa: draft?.durasi_sewa || 1,
    duration: `${draft?.durasi_sewa || 1} Bulan`,
  };

  const hargaBulan = draft?.harga_per_bulan || 1500000;
  const durasiBulan = draft?.durasi_sewa || 1;
  const subtotalNum = hargaBulan * durasiBulan;
  const discount = 0;
  const totalNum = subtotalNum - discount;

  const kostData = {
    name: draft?.kos_nama || "Kost Melati",
    address: draft?.alamat || "Lokasi Kos",
    image: draft?.foto_utama || "/src/assets/harmoni.jpeg",
    price: `Rp ${hargaBulan.toLocaleString("id-ID")}`,
    duration: `${durasiBulan} Bulan`,
    checkin: draft?.tanggal_masuk || new Date().toLocaleDateString("id-ID"),
    status: "Menunggu Pembayaran",
  };

  const paymentData = {
    subtotal: `Rp ${subtotalNum.toLocaleString("id-ID")}`,
    discount: discount > 0 ? `- Rp ${discount.toLocaleString("id-ID")}` : "Rp 0",
    total: `Rp ${totalNum.toLocaleString("id-ID")}`,
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div className="checkout-header">
          <h1>Checkout Booking</h1>
          <p>Periksa kembali informasi booking dan selesaikan pembayaran.</p>
        </div>

        {error && (
          <div style={{ color: "#ef4444", padding: "1rem", backgroundColor: "#fee2e2", borderRadius: "8px", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <div className="checkout-grid">
          {/* LEFT */}
          <div className="checkout-left">
            <TenantInfoCard tenant={tenantData} onUpdateTenantInfo={handleUpdateTenantInfo} />
            <BookingSummaryCard booking={kostData} />
          </div>

          {/* RIGHT */}
          <div className="checkout-right">
            <PaymentSummaryCard
              payment={paymentData}
              onPayNow={handlePayNow}
              submitting={submitting}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}