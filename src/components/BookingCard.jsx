import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/kost1.jpg";
import api from "../api/api";

export default function BookingCard({ booking, onCancel }) {
  const navigate = useNavigate();

  const statusMap = {
    pending: { text: "Menunggu Konfirmasi", className: "status-pending" },
    menunggu_pembayaran: { text: "Menunggu Pembayaran", className: "status-pending" },
    confirmed: { text: "Dikonfirmasi", className: "status-confirmed" },
    aktif: { text: "Sedang Berjalan", className: "status-active" },
    active: { text: "Sedang Berjalan", className: "status-active" },
    selesai: { text: "Selesai", className: "status-confirmed" },
    dibatalkan: { text: "Dibatalkan", className: "status-pending" },
  };

  const formattedStatusText = booking.status
    ? booking.status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Menunggu Pembayaran";

  const currentStatus = statusMap[booking.status] || {
    text: formattedStatusText,
    className: "status-pending",
  };

  const kos = booking.kos || {};
  const name = kos.nama_kos || booking.name || "Booking Kost";
  const location = kos.kota || kos.alamat || booking.location || "Indonesia";
  const image = kos.foto_utama_url || kos.foto_utama || booking.image || defaultImg;

  const totalHarga = booking.total_harga
    ? `Rp ${parseFloat(booking.total_harga).toLocaleString("id-ID")}`
    : booking.price || "Rp 0";

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

  const bookingDate = formatTanggal(booking.created_at || booking.bookingDate);
  const checkIn = formatTanggal(booking.tanggal_masuk || booking.checkIn);
  const duration = booking.durasi_bulan ? `${booking.durasi_bulan} Bulan` : booking.duration || "1 Bulan";

  const handleChatOwner = async () => {
    const kosId = booking.kos_id || booking.kos?.id;
    if (!kosId) {
      alert("Informasi kos tidak ditemukan.");
      return;
    }
    try {
      const res = await api.post(`/kos/${kosId}/tanya`, {
        pesan: `Halo, saya penyewa dengan ID Booking #${booking.id || ""}. Saya ingin bertanya mengenai pemesanan kos ${name}.`,
      });
      if (res.data && res.data.wa_link) {
        window.open(res.data.wa_link, "_blank");
      } else {
        alert("Gagal mendapatkan kontak WhatsApp pemilik kos.");
      }
    } catch (err) {
      console.error("Gagal menghubungkan ke WhatsApp pemilik:", err);
      alert(err.message || "Gagal menghubungkan ke WhatsApp pemilik.");
    }
  };

  return (
    <div className="booking-card">
      <div className="booking-image">
        <img src={image} alt={name} onError={(e) => { e.target.src = defaultImg; }} />
      </div>

      <div className="booking-content">
        <div className="booking-top">
          <div>
            <h2>{name}</h2>
            <p className="booking-location">
              <MapPin size={16} />
              {location}
            </p>
            <h3>{totalHarga}</h3>
          </div>

          <span className={currentStatus.className}>
            {currentStatus.text}
          </span>
        </div>

        <hr />

        <div className="booking-bottom">
          <div className="booking-info">
            <div>
              <small>Tanggal Booking</small>
              <strong>{bookingDate}</strong>
            </div>

            <div>
              <small>Tanggal Masuk</small>
              <strong>{checkIn}</strong>
            </div>

            <div>
              <small>Durasi Sewa</small>
              <strong>{duration}</strong>
            </div>
          </div>

          <div className="booking-action">
            <button
              className="detail-btn"
              onClick={() => navigate(booking.id ? `/detail-booking/${booking.id}` : "/detail-booking")}
            >
              Lihat Detail
            </button>

            {(booking.status === "pending" || booking.status === "menunggu_pembayaran") && onCancel ? (
              <button
                className="contact-btn"
                style={{ backgroundColor: "#ef4444", color: "#fff", borderColor: "#ef4444" }}
                onClick={() => onCancel(booking.id)}
              >
                Batalkan
              </button>
            ) : null}

            <button className="contact-btn" onClick={handleChatOwner}>
              Hubungi Pemilik
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}