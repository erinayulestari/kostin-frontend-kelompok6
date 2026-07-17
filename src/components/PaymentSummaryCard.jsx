import {
  ReceiptText,
  Clock3,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function PaymentSummaryCard({ payment }) {

  const navigate = useNavigate();

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

          <strong>{payment.subtotal}</strong>

        </div>

        <div className="summary-item">

          <span>Biaya Admin</span>

          <strong>{payment.admin}</strong>

        </div>

        <div className="summary-item">

          <span>Diskon</span>

          <strong className="discount">
            {payment.discount}
          </strong>

        </div>

      </div>

      <hr />

      {/* Total */}

      <div className="summary-total">

        <span>Total Pembayaran</span>

        <h2>{payment.total}</h2>

      </div>

      {/* Countdown */}

      <div className="payment-countdown">

        <Clock3 size={18} />

        <div>

          <span>Selesaikan pembayaran dalam</span>

          <strong>{payment.countdown}</strong>

        </div>

      </div>

      {/* Button */}

      <button className="pay-now-btn">

        <CreditCard size={20} />

        Bayar Sekarang

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

          Dengan melanjutkan pembayaran,
          Anda menyetujui syarat dan ketentuan
          KostIn.

        </p>

      </div>

    </aside>

  );

}