import { ShieldCheck, CreditCard, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingActionCard({ kosId, onPayNow, isPaid = false }) {
  const navigate = useNavigate();

  return (
    <section className="booking-action-card">
      <h3>Aksi</h3>

      <button
        className="detail-kost-btn"
        onClick={() => navigate(kosId ? `/kost/${kosId}` : "/carikost")}
      >
        Lihat Detail Kost
      </button>

      {isPaid ? (
        <button
          className="pay-btn"
          onClick={() => navigate(kosId ? `/kost/${kosId}` : "/carikost")}
          style={{
            background: "#F59E0B",
            color: "#FFFFFF",
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          <Star size={18} fill="#FFFFFF" color="#FFFFFF" />
          Tulis Ulasan Kos
        </button>
      ) : (
        <button
          className="pay-btn"
          onClick={onPayNow}
          style={{
            background: "#2563EB",
            color: "#FFFFFF",
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          <CreditCard size={18} />
          Bayar Sekarang
        </button>
      )}

      <div className="secure-box">
        <ShieldCheck size={20} />
        <p>Transaksi Anda aman dan terenkripsi.</p>
      </div>
    </section>
  );
}