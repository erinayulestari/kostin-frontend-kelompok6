import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

const BookingCard = ({ name, kostName, avatar, checkIn, duration, status, statusText, actionText, onClickAction }) => {
  const renderStatusBadge = () => {
    const s = (status || '').toLowerCase();
    if (s.includes('menunggu') || s === 'pending') {
      return (
        <span style={{ backgroundColor: '#fffbe6', color: '#d97706', border: '1px solid #fef08a', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {statusText || 'Menunggu Konfirmasi'}
        </span>
      );
    } else if (s === 'aktif' || s === 'active') {
      return (
        <span style={{ backgroundColor: '#eff6ff', color: '#0066ff', border: '1px solid #bfdbfe', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} /> {statusText || 'Sedang Berjalan'}
        </span>
      );
    } else if (s === 'selesai' || s === 'confirmed') {
      return (
        <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', border: '1px solid #bbf7d0', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={12} /> {statusText || 'Selesai'}
        </span>
      );
    } else if (s === 'dibatalkan' || s === 'cancelled') {
      return (
        <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <XCircle size={12} /> {statusText || 'Dibatalkan'}
        </span>
      );
    }
    return <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, backgroundColor: '#f1f5f9', color: '#64748b' }}>{statusText || status}</span>;
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '16px 18px',
      borderRadius: '14px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '14px'
    }}>
      {/* 1. Header Penyewa & Kos */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src={avatar} 
          alt={name} 
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '1px solid #cbd5e1',
            flexShrink: 0
          }} 
        />
        <div style={{ minWidth: 0 }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {name}
          </h4>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {kostName}
          </p>
        </div>
      </div>

      {/* 2. Grid Tanggal & Durasi */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8fafc',
        padding: '10px 14px',
        borderRadius: '10px',
        border: '1px solid #f1f5f9'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 500 }}>Check-in</span>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: '2px 0 0 0' }}>{checkIn}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#64748b', display: 'block', fontWeight: 500 }}>Durasi</span>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: '2px 0 0 0' }}>{duration}</p>
        </div>
      </div>

      {/* 3. Footer Status & Action */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '8px',
        borderTop: '1px solid #f1f5f9'
      }}>
        {renderStatusBadge()}
        {actionText && (
          <button 
            type="button"
            onClick={onClickAction}
            style={{
              padding: '5px 12px',
              borderRadius: '8px',
              border: '1px solid #0066ff',
              backgroundColor: '#ffffff',
              color: '#0066ff',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;