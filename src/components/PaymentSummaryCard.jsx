import { useState, useEffect } from "react";
import {
  ReceiptText,
  Clock3,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSummaryCard({ payment, onPayNow, submitting }) {
  const navigate = useNavigate();

  // Dynamic 24-hour countdown timer (86400 seconds)
  const [timeLeft, setTimeLeft] = useState(86400);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeDigits = (seconds) => {
    if (seconds <= 0) return { h: "00", m: "00", s: "00" };
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return { h, m, s };
  };

  const { h, m, s } = formatTimeDigits(timeLeft);

  return (
    <aside className="payment-summary">
      {/* Header */}
      <div className="checkout-card-title">
        <div className="checkout-card-icon">
          <ReceiptText size={22} />
        </div>
        <h3>Ringkasan Pembayaran</h3>
      </div>

      {/* Detail */}
      <div className="summary-price">
        <div className="summary-item">
          <span>Subtotal</span>
          <strong>{payment?.subtotal}</strong>
        </div>

        {payment?.discount && payment.discount !== "Rp 0" && (
          <div className="summary-item">
            <span>Diskon</span>
            <strong className="discount">{payment?.discount}</strong>
          </div>
        )}
      </div>

      <hr />

      {/* Total */}
      <div className="summary-total">
        <span>Total Pembayaran</span>
        <h2>{payment?.total}</h2>
      </div>

      {/* Countdown Box */}
      <div className="payment-countdown-card">
        <div className="countdown-header">
          <Clock3 size={18} />
          <span>Selesaikan Pembayaran Dalam</span>
        </div>

        <div className="countdown-boxes">
          <div className="time-box">
            <span className="time-num">{h}</span>
            <span className="time-unit">Jam</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-box">
            <span className="time-num">{m}</span>
            <span className="time-unit">Menit</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-box">
            <span className="time-num">{s}</span>
            <span className="time-unit">Detik</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        className="pay-now-btn"
        onClick={onPayNow}
        disabled={submitting || timeLeft <= 0}
      >
        <CreditCard size={20} />
        {submitting ? "Memproses..." : timeLeft <= 0 ? "Waktu Pembayaran Habis" : "Bayar Sekarang"}
      </button>

      <button
        className="back-payment-btn"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} />
        Kembali
      </button>

      {/* Note */}
      <div className="payment-terms">
        <p>
          Dengan melanjutkan pembayaran, Anda menyetujui syarat dan ketentuan KostIn.
        </p>
      </div>
    </aside>
  );
}