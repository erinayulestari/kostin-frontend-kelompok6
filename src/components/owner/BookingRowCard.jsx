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

const BookingRowCard = ({ booking }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Menunggu Konfirmasi':
        return (
          <span className="status-badge warning">
            <Clock size={12} /> Menunggu Konfirmasi
          </span>
        );
      case 'Menunggu Pembayaran':
        return (
          <span className="status-badge orange">
            <Clock size={12} /> Menunggu Pembayaran
          </span>
        );
      case 'Dikonfirmasi':
        return (
          <span className="status-badge success">
            <CheckCircle2 size={12} /> Dikonfirmasi
          </span>
        );
      case 'Sedang Berjalan':
        return (
          <span className="status-badge info">
            <Clock size={12} /> Sedang Berjalan
          </span>
        );
      case 'Selesai':
        return (
          <span className="status-badge gray">
            <CheckCircle2 size={12} /> Selesai
          </span>
        );
      case 'Dibatalkan':
        return (
          <span className="status-badge danger">
            <XCircle size={12} /> Dibatalkan
          </span>
        );
      default:
        return <span className="status-badge gray">{status}</span>;
    }
  };

  return (
    <div className="booking-row-card">
      {/* 1. Tenant Info */}
      <div className="tenant-info">
        <img src={booking.tenantAvatar} alt={booking.tenantName} className="tenant-avatar" />
        <div>
          <h4 className="tenant-name">{booking.tenantName}</h4>
          <span className="tenant-phone">{booking.tenantPhone}</span>
        </div>
      </div>

      {/* 2. Kost Info */}
      <div className="kost-info">
        <img src={booking.kostImage} alt={booking.kostName} className="kost-thumb" />
        <div>
          <h4 className="kost-name">{booking.kostName}</h4>
          <span className="kost-location">{booking.kostLocation}</span>
        </div>
      </div>

      {/* 3. Dates & Duration */}
      <div className="booking-dates">
        <div className="date-item">
          <span className="label">Booking Dibuat</span>
          <span className="val">{booking.createdDate}</span>
        </div>
        <div className="date-item">
          <span className="label">Check-in</span>
          <span className="val">{booking.checkInDate}</span>
        </div>
        <div className="date-item">
          <span className="label">Durasi</span>
          <span className="val">{booking.duration}</span>
        </div>
      </div>

      {/* 4. Payment Info */}
      <div className="payment-info">
        <span className="label">Total Pembayaran</span>
        <span className="val-price">{formatRupiah(booking.totalPrice)}</span>
      </div>

      {/* 5. Status Badge */}
      <div className="status-container">
        {renderStatusBadge(booking.status)}
      </div>

      {/* 6. Action Button & Dropdown */}
      <div className="action-container">
        <button className="btn-outline-detail">Lihat Detail</button>

        <div className="more-dropdown-wrapper">
          <button 
            className="icon-more-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreVertical size={16} />
          </button>

          {showDropdown && (
            <div className="dropdown-action-menu">
              <div className="menu-item green">
                <CheckCircle size={14} /> Konfirmasi Booking
              </div>
              <div className="menu-item red">
                <XCircle size={14} /> Tolak Booking
              </div>
              <div className="menu-item">
                <MessageSquare size={14} /> Hubungi Penyewa
              </div>
              <div className="menu-item">
                <Eye size={14} /> Lihat Detail Kost
              </div>
              <div className="menu-item danger">
                <Ban size={14} /> Batalkan Booking
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRowCard;