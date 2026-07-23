import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, FileText, Download, MessageSquare } from 'lucide-react';

const TransactionRowCard = ({ transaction, onViewDetail, onViewInvoice, onDownloadReceipt }) => {
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

  const handleContactTenant = () => {
    setShowDropdown(false);
    const phone = transaction.tenantPhone || '';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone) {
      const formatted = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
      window.open(`https://wa.me/${formatted}`, '_blank');
    } else {
      alert(`Nomor telepon penyewa (${transaction.tenantName}): ${phone || 'Tidak tersedia'}`);
    }
  };

  // Format ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number || 0);
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

      {/* 6. Status Badge & Disbursement Badge */}
      <div className="status-container" style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
        {renderStatusBadge(transaction.status)}
        {transaction.status === 'Berhasil' && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600',
              backgroundColor:
                transaction.statusDisbursement === 'selesai'
                  ? '#dcfce7'
                  : transaction.statusDisbursement === 'diproses'
                  ? '#e0f2fe'
                  : '#fef3c7',
              color:
                transaction.statusDisbursement === 'selesai'
                  ? '#16a34a'
                  : transaction.statusDisbursement === 'diproses'
                  ? '#0284c7'
                  : '#d97706',
            }}
          >
            {transaction.statusDisbursement === 'selesai'
              ? '✓ Ditransfer Admin'
              : transaction.statusDisbursement === 'diproses'
              ? '🔄 Diproses Admin'
              : '🕒 Pending Transfer'}
          </span>
        )}
      </div>

      {/* 7. Action Buttons & Dropdown */}
      <div className="action-container" ref={dropdownRef}>
        <button 
          className="btn-outline-detail"
          onClick={() => {
            if (onViewDetail) onViewDetail(transaction);
            else if (onViewInvoice) onViewInvoice(transaction);
          }}
        >
          Lihat Detail
        </button>

        <div className="more-dropdown-wrapper">
          <button 
            className="icon-more-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreVertical size={18} />
          </button>

          {showDropdown && (
            <div className="dropdown-action-menu">
              <div className="menu-item" onClick={() => { setShowDropdown(false); if (onViewInvoice) onViewInvoice(transaction); }}>
                <FileText size={14} />
                <span>Lihat Invoice</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionRowCard;