import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, FileText, Download, MessageSquare } from 'lucide-react';

const TransactionRowCard = ({ transaction }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  // Status Badge Mapper
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Berhasil':
        return <span className="status-badge success">✓ Berhasil</span>;
      case 'Menunggu Pembayaran':
        return <span className="status-badge warning">🕒 Menunggu Pembayaran</span>;
      case 'Gagal':
        return <span className="status-badge danger">✕ Gagal</span>;
      case 'Refund':
        return <span className="status-badge gray">↺ Refund</span>;
      default:
        return <span className="status-badge gray">{status}</span>;
    }
  };

  return (
    <div className="transaction-row-card">
      {/* 1. Tenant Info */}
      <div className="tenant-info">
        <img src={transaction.tenantAvatar} alt={transaction.tenantName} className="tenant-avatar" />
        <div>
          <h4 className="tenant-name">{transaction.tenantName}</h4>
          <span className="tenant-phone">{transaction.tenantPhone}</span>
        </div>
      </div>

      {/* 2. Kost Info */}
      <div className="kost-info">
        <img src={transaction.kostImage} alt={transaction.kostName} className="kost-thumb" />
        <div>
          <h4 className="kost-name">{transaction.kostName}</h4>
          <span className="kost-location">{transaction.kostLocation}</span>
        </div>
      </div>

      {/* 3. Invoice & Date */}
      <div className="invoice-info">
        <span className="inv-code">{transaction.invoiceCode}</span>
        <span className="inv-date">{transaction.date}</span>
      </div>

      {/* 4. Payment Method */}
      <div className="method-info">
        <span className="label">Metode</span>
        <span className="val">{transaction.paymentMethod}</span>
      </div>

      {/* 5. Price Nominal */}
      <div className="price-info">
        <span className="label">Nominal</span>
        <span className="val-price">{formatRupiah(transaction.amount)}</span>
      </div>

      {/* 6. Status Badge */}
      <div className="status-container">
        {renderStatusBadge(transaction.status)}
      </div>

      {/* 7. Action Buttons & Dropdown */}
      <div className="action-container" ref={dropdownRef}>
        <button className="btn-outline-detail">Lihat Detail</button>

        <div className="more-dropdown-wrapper">
          <button 
            className="icon-more-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreVertical size={18} />
          </button>

          {showDropdown && (
            <div className="dropdown-action-menu">
              <div className="menu-item" onClick={() => setShowDropdown(false)}>
                <FileText size={14} />
                <span>Lihat Invoice</span>
              </div>
              <div className="menu-item" onClick={() => setShowDropdown(false)}>
                <Download size={14} />
                <span>Unduh Bukti Pembayaran</span>
              </div>
              <div className="menu-item" onClick={() => setShowDropdown(false)}>
                <MessageSquare size={14} />
                <span>Hubungi Penyewa</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionRowCard;