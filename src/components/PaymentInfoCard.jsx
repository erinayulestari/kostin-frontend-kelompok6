import { CreditCard } from "lucide-react";

export default function PaymentInfoCard({ booking }) {
  return (
    <section className="payment-card">

      <div className="card-title">

        <div className="card-icon">
          <CreditCard size={22} />
        </div>

        <h3>Informasi Pembayaran</h3>

      </div>

      <div className="payment-item">

        <span>Metode Pembayaran</span>

        <div className="payment-method">

          <h4>{booking.paymentMethod}</h4>

          <img
            src={booking.bankLogo}
            alt="Bank"
          />

        </div>

      </div>

      <div className="payment-item">

        <span>Status Pembayaran</span>

        <div className="status waiting">

          <div className="status-dot"></div>

          {booking.paymentStatus}

        </div>

      </div>

      <div className="payment-item">

        <span>Tanggal Pembayaran</span>

        <h4>{booking.paymentDate}</h4>

      </div>

      <div className="payment-item">

        <span>Nominal Pembayaran</span>

        <h4>{booking.amount}</h4>

      </div>

      <div className="payment-item">

        <span>Nomor Transaksi</span>

        <h4>{booking.transaction}</h4>

      </div>

      <div className="payment-note">

        <p>
          Selesaikan pembayaran untuk
          melanjutkan proses booking.
        </p>

      </div>

    </section>
  );
}