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

const BookingRowCard = ({ booking, onComplete, onViewDetail }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number || 0);
  };

  const user = booking.penyewa || booking.user || {};
  const kos = booking.kos || {};

  const tenantName = user.nama || user.email || booking.tenantName || "Penyewa";
  const tenantPhone = user.no_hp || booking.tenantPhone || "-";
  const tenantAvatar = user.foto_profil_url || booking.tenantAvatar || defaultAvatar;

  const kosName = kos.nama_kos || booking.kostName || "Properti Kost";
  const kosLocation = kos.kota || kos.alamat || booking.kostLocation || "Indonesia";
  const kosImage = kos.foto_utama_url || kos.foto_utama || booking.kostImage || defaultKostImg;

  const formatDateStr = (dStr) => {
    if (!dStr || dStr === '-') return '-';
    const clean = dStr.includes('T') ? dStr.split('T')[0] : dStr;
    try {
      const d = new Date(clean);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      }
    } catch (e) {}
    return clean;
  };

  const createdDate = formatDateStr(booking.created_at || booking.createdDate);
  const checkInDate = formatDateStr(booking.tanggal_masuk || booking.checkInDate);
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

  const statusLower = (booking.status || '').toLowerCase();
  const isBookingActive = statusLower === 'aktif' || statusLower === 'active' || statusLower.includes('berjalan');

  return (
    <div className="booking-row-card">
      {/* 1. Tenant Info */}
      <div className="tenant-info">
        <img 
          src={tenantAvatar} 
          alt={tenantName} 
          className="tenant-avatar"
          onError={(e) => { e.target.src = defaultAvatar; }} 
        />
        <div>
          <h4 className="tenant-name">{tenantName}</h4>
          <p className="tenant-phone">{tenantPhone}</p>
        </div>
      </div>

      {/* 2. Kost Info */}
      <div className="kost-info">
        <img 
          src={kosImage} 
          alt={kosName} 
          className="kost-thumb"
          onError={(e) => { e.target.src = defaultKostImg; }} 
        />
        <div>
          <h4 className="kost-name">{kosName}</h4>
          <p className="kost-location">{kosLocation}</p>
        </div>
      </div>

      {/* 3. Date Info */}
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
          onClick={() => {
            if (onViewDetail) onViewDetail(booking);
            else if (booking.id) navigate(`/owner/booking`);
          }}
        >
          Lihat Detail
        </button>

        {onComplete && isBookingActive ? (
          <div className="more-dropdown-wrapper">
            <button 
              className="icon-more-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreVertical size={16} />
            </button>

            {showDropdown && (
              <div className="dropdown-action-menu">
                <div className="menu-item green" onClick={() => { setShowDropdown(false); onComplete(booking.id); }}>
                  <CheckCircle size={14} /> Selesaikan Booking
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ width: '24px', flexShrink: 0 }}></div>
        )}
      </div>
    </div>
  );
};

export default BookingRowCard;