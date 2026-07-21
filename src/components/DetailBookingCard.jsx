import { Calendar, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailBookingCard() {
  const navigate = useNavigate();

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
            <span style={{ fontSize: "26px", fontWeight: "800", color: "#2563EB" }}>Rp850.000</span>
            <span style={{ fontSize: "13px", color: "#64748B" }}>/ bulan</span>
          </div>
          <span
            style={{
              background: "#DCFCE7",
              color: "#16A34A",
              fontSize: "12px",
              fontWeight: "600",
              padding: "4px 10px",
              borderRadius: "20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <CheckCircle2 size={13} fill="#16A34A" color="#DCFCE7" />
            Tersedia
          </span>
        </div>
      </div>

      {/* Tanggal Masuk */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "14px", fontWeight: "600", color: "#0F172A" }}>Tanggal Masuk</label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Pilih tanggal masuk"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            style={{
              width: "100%",
              height: "46px",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "0 40px 0 14px",
              fontSize: "14px",
              color: "#0F172A",
              outline: "none",
              background: "#FFFFFF",
            }}
          />
          <Calendar
            size={18}
            color="#64748B"
            style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          />
        </div>
      </div>

      {/* Durasi Sewa */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "14px", fontWeight: "600", color: "#0F172A" }}>Durasi Sewa</label>
        <select
          defaultValue="1 Bulan"
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
          <option value="1 Bulan">1 Bulan</option>
          <option value="3 Bulan">3 Bulan</option>
          <option value="6 Bulan">6 Bulan</option>
          <option value="12 Bulan">12 Bulan</option>
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
        <span style={{ color: "#2563EB", fontSize: "22px", fontWeight: "800" }}>Rp850.000</span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={() => navigate("/checkout")}
          style={{
            width: "100%",
            height: "48px",
            background: "#2563EB",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Booking Sekarang
        </button>

        <button
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
          Chat Pemilik
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
