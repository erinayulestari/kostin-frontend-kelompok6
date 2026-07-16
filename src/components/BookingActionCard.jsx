import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingActionCard() {

  const navigate = useNavigate();

  return (
    <section className="booking-action-card">

      <h3>Aksi</h3>

      <button
        className="detail-kost-btn"
        onClick={() => navigate("/detail-kost")}
      >
        Lihat Detail Kost
      </button>

      <button
        className="pay-btn"
      >
        Bayar Sekarang
      </button>

      <div className="secure-box">

        <ShieldCheck size={20} />

        <p>
          Transaksi Anda aman dan terenkripsi.
        </p>

      </div>

    </section>
  );
}