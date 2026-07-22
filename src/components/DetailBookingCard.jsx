import { useState } from "react";
import { Calendar, MessageSquare, ShieldCheck, CheckCircle2, GitCompare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function DetailBookingCard({ kos, onOpenCompare }) {
  const navigate = useNavigate();

  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [durasiSewa, setDurasiSewa] = useState(1);
  const [chatting, setChatting] = useState(false);

  const rawHarga = kos?.harga_per_bulan || 850000;
  const hargaPerBulan = typeof rawHarga === "string" ? parseFloat(rawHarga.replace(/[^\d]/g, "")) || 850000 : rawHarga;
  const totalHarga = hargaPerBulan * durasiSewa;

  const isAvailable = kos ? kos.jumlah_kamar > kos.kamar_terisi : true;

  const handleBooking = () => {
    if (!tanggalMasuk) {
      alert("Harap pilih tanggal masuk terlebih dahulu.");
      return;
    }

    // Simpan data checkout sementara ke sessionStorage
    const bookingDraft = {
      kos_id: kos?.id || 1,
      kos_nama: kos?.nama_kos || "Kost",
      harga_per_bulan: hargaPerBulan,
      tanggal_masuk: tanggalMasuk,
      durasi_sewa: durasiSewa,
      total_harga: totalHarga,
      foto_utama: kos?.foto_utama_url || kos?.foto_utama,
    };
    sessionStorage.setItem("checkout_draft", JSON.stringify(bookingDraft));
    navigate("/checkout");
  };

  const handleChatPemilik = async () => {
    if (!kos?.id) return;
    setChatting(true);
    try {
      const res = await api.post(`/kos/${kos.id}/tanya`, {
        pesan: "Halo, saya tertarik dengan kos ini. Apakah kamar masih tersedia?"
      });
      if (res.data?.wa_url) {
        window.open(res.data.wa_url, "_blank");
      } else if (res.data?.link) {
        window.open(res.data.link, "_blank");
      } else {
        alert("Pesan berhasil dikirim ke pemilik kos.");
      }
    } catch (e) {
      console.error("Gagal menghubungi pemilik", e);
      alert("Gagal terhubung dengan pemilik kos. Pastikan Anda sudah login.");
    } finally {
      setChatting(false);
    }
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        border: "1px solid #F1F5F9",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "360px",
      }}
    >
      {/* Top Header */}
      <div>
        <span style={{ color: "#64748B", fontSize: "14px", fontWeight: "500" }}>Harga</span>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "26px", fontWeight: "800", color: "#2563EB" }}>
              Rp{hargaPerBulan.toLocaleString("id-ID")}
            </span>
            <span style={{ fontSize: "13px", color: "#64748B" }}>/ bulan</span>
          </div>
          <span
            style={{
              background: isAvailable ? "#DCFCE7" : "#FEE2E2",
              color: isAvailable ? "#16A34A" : "#EF4444",
              fontSize: "12px",
              fontWeight: "600",
              padding: "4px 10px",
              borderRadius: "20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <CheckCircle2 size={13} fill={isAvailable ? "#16A34A" : "#EF4444"} color={isAvailable ? "#DCFCE7" : "#FEE2E2"} />
            {isAvailable ? "Tersedia" : "Penuh"}
          </span>
        </div>
      </div>

      {/* Tanggal Masuk */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "14px", fontWeight: "600", color: "#0F172A" }}>Tanggal Masuk</label>
        <div style={{ position: "relative" }}>
          <input
            type="date"
            value={tanggalMasuk}
            onChange={(e) => setTanggalMasuk(e.target.value)}
            style={{
              width: "100%",
              height: "46px",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "0 14px",
              fontSize: "14px",
              color: "#0F172A",
              outline: "none",
              background: "#FFFFFF",
            }}
          />
        </div>
      </div>

      {/* Durasi Sewa */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "14px", fontWeight: "600", color: "#0F172A" }}>Durasi Sewa</label>
        <select
          value={durasiSewa}
          onChange={(e) => setDurasiSewa(parseInt(e.target.value))}
          style={{
            width: "100%",
            height: "46px",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "0 14px",
            fontSize: "14px",
            color: "#0F172A",
            outline: "none",
            background: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          <option value={1}>1 Bulan</option>
          <option value={3}>3 Bulan</option>
          <option value={6}>6 Bulan</option>
          <option value={12}>12 Bulan</option>
        </select>
      </div>

      {/* Total Harga Box */}
      <div
        style={{
          background: "#EFF6FF",
          borderRadius: "14px",
          padding: "16px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "4px",
        }}
      >
        <span style={{ color: "#2563EB", fontSize: "14px", fontWeight: "600" }}>Total Harga</span>
        <span style={{ color: "#2563EB", fontSize: "22px", fontWeight: "800" }}>
          Rp{totalHarga.toLocaleString("id-ID")}
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={handleBooking}
          disabled={!isAvailable}
          style={{
            width: "100%",
            height: "48px",
            background: isAvailable ? "#2563EB" : "#94A3B8",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "15px",
            cursor: isAvailable ? "pointer" : "not-allowed",
            transition: "background 0.2s",
          }}
        >
          Booking Sekarang
        </button>

        <button
          onClick={handleChatPemilik}
          disabled={chatting}
          style={{
            width: "100%",
            height: "48px",
            background: "#FFFFFF",
            color: "#2563EB",
            border: "1px solid #2563EB",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <MessageSquare size={18} color="#2563EB" />
          {chatting ? "Menghubungi..." : "Chat Pemilik"}
        </button>

        {/* Tombol Bandingkan Kost */}
        <button
          onClick={onOpenCompare}
          style={{
            width: "100%",
            height: "48px",
            background: "#FFFFFF",
            color: "#1E3A8A",
            border: "1px solid #CBD5E1",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s",
          }}
        >
          <GitCompare size={18} color="#1E3A8A" />
          Bandingkan Kost
        </button>
      </div>

      {/* Security Guarantee */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "4px" }}>
        <ShieldCheck size={16} color="#16A34A" />
        <span style={{ color: "#64748B", fontSize: "13px" }}>Transaksi aman & terpercaya</span>
      </div>
    </div>
  );
}