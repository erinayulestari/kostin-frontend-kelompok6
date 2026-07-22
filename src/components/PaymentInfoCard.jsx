import { CreditCard, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import bca from "../assets/payment/bca.png";
import bni from "../assets/payment/bni.png";
import bri from "../assets/payment/bri.png";
import mandiri from "../assets/payment/mandiri.png";
import gopay from "../assets/payment/gopay.png";
import shopeepay from "../assets/payment/shopeepay.png";
import qris from "../assets/payment/qris.png";
import dana from "../assets/payment/dana.png";
import ovo from "../assets/payment/ovo.png";

export default function PaymentInfoCard({ booking }) {
  const statusRaw = (booking?.rawStatus || booking?.status || "").toLowerCase();
  const paymentType = (booking?.paymentType || booking?.payment_type || "").toLowerCase();
  const metodePembayaran = (booking?.metodePembayaran || booking?.metode_pembayaran || "").toLowerCase();

  // Helper mapping logo & nama metode pembayaran
  const getPaymentDetails = () => {
    if (paymentType.includes("bca") || metodePembayaran.includes("bca")) return { name: "Transfer Bank - BCA", logo: bca };
    if (paymentType.includes("bni") || metodePembayaran.includes("bni")) return { name: "Transfer Bank - BNI", logo: bni };
    if (paymentType.includes("bri") || metodePembayaran.includes("bri")) return { name: "Transfer Bank - BRI", logo: bri };
    if (paymentType.includes("mandiri") || metodePembayaran.includes("mandiri")) return { name: "Transfer Bank - Mandiri", logo: mandiri };
    if (paymentType.includes("gopay") || metodePembayaran.includes("gopay")) return { name: "E-Wallet - GoPay", logo: gopay };
    if (paymentType.includes("shopeepay") || metodePembayaran.includes("shopeepay")) return { name: "E-Wallet - ShopeePay", logo: shopeepay };
    if (paymentType.includes("qris") || metodePembayaran.includes("qris")) return { name: "QRIS Payment", logo: qris };
    if (paymentType.includes("dana") || metodePembayaran.includes("dana")) return { name: "E-Wallet - DANA", logo: dana };
    if (paymentType.includes("ovo") || metodePembayaran.includes("ovo")) return { name: "E-Wallet - OVO", logo: ovo };

    if (metodePembayaran === "ewallet") return { name: "E-Wallet Payment", logo: gopay };
    if (metodePembayaran === "qris") return { name: "QRIS Payment", logo: qris };

    return { name: booking?.paymentMethod || "Midtrans Payment Gateway", logo: bca };
  };

  const paymentDetails = getPaymentDetails();

  // Helper status badge & note
  const isPaid = statusRaw === "aktif" || statusRaw === "selesai" || statusRaw === "dibayar";
  const isCancelled = statusRaw === "dibatalkan" || statusRaw === "ditolak";

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
          <h4>{paymentDetails.name}</h4>
          {paymentDetails.logo && (
            <img src={paymentDetails.logo} alt={paymentDetails.name} style={{ height: "26px", objectFit: "contain" }} />
          )}
        </div>
      </div>

      <div className="payment-item">
        <span>Status Pembayaran</span>
        <div className={`status ${isPaid ? "success" : isCancelled ? "cancel" : "waiting"}`}>
          <div className="status-dot"></div>
          {isPaid ? "Lunas" : isCancelled ? "Dibatalkan" : "Menunggu Pembayaran"}
        </div>
      </div>

      <div className="payment-item">
        <span>Tanggal Pembayaran</span>
        <h4>{booking?.paymentDate || "-"}</h4>
      </div>

      <div className="payment-item">
        <span>Nominal Pembayaran</span>
        <h4>{booking?.amount}</h4>
      </div>

      <div className="payment-item">
        <span>Nomor Transaksi</span>
        <h4>{booking?.transaction || "-"}</h4>
      </div>

      {/* Gelembung Catatan Dinamis */}
      <div
        className="payment-note"
        style={{
          background: isPaid ? "#DCFCE7" : isCancelled ? "#FEE2E2" : "#EFF6FF",
          border: `1px solid ${isPaid ? "#86EFAC" : isCancelled ? "#FCA5A5" : "#BFDBFE"}`,
          borderRadius: "14px",
          padding: "16px",
          marginTop: "20px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px"
        }}
      >
        {isPaid ? (
          <>
            <CheckCircle2 size={20} color="#16A34A" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p style={{ color: "#15803D", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
              <strong>Pembayaran Berhasil!</strong> Terima kasih telah melunasi pembayaran. Pemesanan sewa kos Anda telah aktif dan dikonfirmasi.
            </p>
          </>
        ) : isCancelled ? (
          <>
            <AlertCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p style={{ color: "#B91C1C", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
              <strong>Transaksi Dibatalkan.</strong> Pemesanan sewa kos ini telah dibatalkan. Silakan lakukan pemesanan ulang jika dibutuhkan.
            </p>
          </>
        ) : (
          <>
            <Clock size={20} color="#2563EB" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p style={{ color: "#1E40AF", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
              <strong>Selesaikan Pembayaran.</strong> Lakukan pembayaran sesuai petunjuk sebelum batas waktu berakhir untuk mengaktifkan pemesanan kos.
            </p>
          </>
        )}
      </div>
    </section>
  );
}