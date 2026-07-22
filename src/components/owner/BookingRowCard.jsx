import React, { useState } from 'react';
import { 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  Eye, 
  Ban,
  Clock,
  CheckCircle2
} from 'lucide-react';
import defaultAvatar from '../../assets/avatar.jpg';
import defaultKostImg from '../../assets/harmoni.jpeg';
import { useNavigate } from 'react-router-dom';

const BookingRowCard = ({ booking, onComplete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number || 0);
  };

  const user = booking.user || {};
  const kos = booking.kos || {};

  const tenantName = user.nama || booking.tenantName || "Penyewa";
  const tenantPhone = user.no_hp || booking.tenantPhone || "-";
  const tenantAvatar = user.foto_profil_url || booking.tenantAvatar || defaultAvatar;

  const kosName = kos.nama_kos || booking.kostName || "Properti Kost";
  const kosLocation = kos.kota || kos.alamat || booking.kostLocation || "Indonesia";
  const kosImage = kos.foto_utama_url || kos.foto_utama || booking.kostImage || defaultKostImg;

  const createdDate = booking.created_at ? new Date(booking.created_at).toLocaleDateString('id-ID') : booking.createdDate || "-";
  const checkInDate = booking.tanggal_masuk || booking.checkInDate || "-";
  const duration = booking.durasi_bulan ? `${booking.durasi_bulan} Bulan` : booking.duration || "1 Bulan";
  const totalPrice = parseFloat(booking.total_harga) || booking.totalPrice || 0;

  const renderStatusBadge = (statusStr) => {
    const s = (statusStr || '').toLowerCase();
    if (s.includes('menunggu') || s === 'pending') {
      return (
        <span className="status-badge warning">
          <Clock size={12} /> Menunggu Konfirmasi
        </span>
      );
    } else if (s === 'aktif' || s === 'active' || s === 'sedang berjalan') {
      return (
        <span className="status-badge info">
          <Clock size={12} /> Sedang Berjalan
        </span>
      );
    } else if (s === 'selesai' || s === 'confirmed' || s === 'dikonfirmasi') {
      return (
        <span className="status-badge success">
          <CheckCircle2 size={12} /> Selesai
        </span>
      );
    } else if (s === 'dibatalkan' || s === 'cancelled') {
      return (
        <span className="status-badge danger">
          <XCircle size={12} /> Dibatalkan
        </span>
      );
    }
    return <span className="status-badge gray">{statusStr}</span>;
  };

  return (
    <div className="booking-row-card">
      {/* 1. Tenant Info */}
      <div className="tenant-info">
        <img src={tenantAvatar} alt={tenantName} className="tenant-avatar" onError={(e) => { e.target.src = defaultAvatar; }} />
        <div>
          <h4 className="tenant-name">{tenantName}</h4>
          <span className="tenant-phone">{tenantPhone}</span>
        </div>
      </div>

      {/* 2. Kost Info */}
      <div className="kost-info">
        <img src={kosImage} alt={kosName} className="kost-thumb" onError={(e) => { e.target.src = defaultKostImg; }} />
        <div>
          <h4 className="kost-name">{kosName}</h4>
          <span className="kost-location">{kosLocation}</span>
        </div>
      </div>

      {/* 3. Dates & Duration */}
      <div className="booking-dates">
        <div className="date-item">
          <span className="label">Booking Dibuat</span>
          <span className="val">{createdDate}</span>
        </div>
        <div className="date-item">
          <span className="label">Check-in</span>
          <span className="val">{checkInDate}</span>
        </div>
        <div className="date-item">
          <span className="label">Durasi</span>
          <span className="val">{duration}</span>
        </div>
      </div>

      {/* 4. Payment Info */}
      <div className="payment-info">
        <span className="label">Total Pembayaran</span>
        <span className="val-price">{formatRupiah(totalPrice)}</span>
      </div>

      {/* 5. Status Badge */}
      <div className="status-container">
        {renderStatusBadge(booking.status)}
      </div>

      {/* 6. Action Button & Dropdown */}
      <div className="action-container">
        <button
          className="btn-outline-detail"
          onClick={() => navigate(booking.id ? `/detail-booking/${booking.id}` : "/detail-booking")}
        >
          Lihat Detail
        </button>

        <div className="more-dropdown-wrapper">
          <button 
            className="icon-more-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreVertical size={16} />
          </button>

          {showDropdown && (
            <div className="dropdown-action-menu">
              {onComplete && booking.status !== 'selesai' && (
                <div className="menu-item green" onClick={() => { setShowDropdown(false); onComplete(booking.id); }}>
                  <CheckCircle size={14} /> Selesaikan Booking
                </div>
              )}
              <div className="menu-item" onClick={() => { setShowDropdown(false); if (kos.id) navigate(`/kost/${kos.id}`); }}>
                <Eye size={14} /> Lihat Detail Kost
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRowCard;