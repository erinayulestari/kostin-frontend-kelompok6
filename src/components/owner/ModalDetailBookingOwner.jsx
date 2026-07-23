import React from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  MessageCircle,
  FileText
} from 'lucide-react';
import defaultAvatar from '../../assets/avatar.jpg';

export default function ModalDetailBookingOwner({ booking, onClose, onComplete }) {
  if (!booking) return null;

  const tenant = booking.penyewa || booking.user || {};
  const kos = booking.kos || {};

  const tenantName = tenant.nama || tenant.email || booking.tenantName || "Penyewa";
  const tenantPhone = tenant.no_hp || booking.tenantPhone || "-";
  const tenantEmail = tenant.email || "-";
  const tenantAvatar = tenant.foto_profil_url || booking.tenantAvatar || defaultAvatar;

  const kosName = kos.nama_kos || booking.kostName || "Properti Kost";
  const kosAddress = [kos.alamat, kos.kota].filter(Boolean).join(", ") || "Indonesia";

  const totalHarga = parseFloat(booking.total_harga) || 0;
  const biayaPlatform = totalHarga * 0.03;
  const jatahPemilik = booking.jatah_pemilik !== undefined 
    ? parseFloat(booking.jatah_pemilik) 
    : (totalHarga - biayaPlatform);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
  };

  const formatDateStr = (dStr) => {
    if (!dStr || dStr === '-') return '-';
    const clean = dStr.includes('T') ? dStr.split('T')[0] : dStr;
    try {
      const d = new Date(clean);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      }
    } catch (e) {}
    return clean;
  };

  const s = (booking.status || '').toLowerCase();
  let statusBadgeBg = '#eff6ff';
  let statusBadgeColor = '#0066ff';
  let statusText = 'Sedang Berjalan';

  if (s.includes('menunggu') || s === 'pending') {
    statusBadgeBg = '#fffbe6';
    statusBadgeColor = '#d97706';
    statusText = 'Menunggu Konfirmasi';
  } else if (s === 'selesai' || s === 'confirmed') {
    statusBadgeBg = '#dcfce7';
    statusBadgeColor = '#16a34a';
    statusText = 'Selesai';
  } else if (s === 'dibatalkan' || s === 'cancelled') {
    statusBadgeBg = '#fee2e2';
    statusBadgeColor = '#ef4444';
    statusText = 'Dibatalkan';
  }

  const waPhoneClean = tenantPhone.replace(/[^0-9]/g, '');
  const waUrl = waPhoneClean ? `https://wa.me/${waPhoneClean.startsWith('0') ? '62' + waPhoneClean.slice(1) : waPhoneClean}` : null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        padding: '28px',
        position: 'relative'
      }}>
        {/* Header Modal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
              KODE BOOKING: #{booking.id ? `KB-${booking.id}` : 'KB-000'}
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
              Detail Transaksi Penyewa
            </h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Badge */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Status Booking:</span>
          <span style={{
            backgroundColor: statusBadgeBg,
            color: statusBadgeColor,
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 600
          }}>
            {statusText}
          </span>
        </div>

        {/* Informas Penyewa Card */}
        <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '14px', marginTop: '16px', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <img src={tenantAvatar} alt={tenantName} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #2563eb' }} />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{tenantName}</h4>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Penyewa Kos</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#334155' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} color="#64748b" />
              <span>{tenantPhone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color="#64748b" />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tenantEmail}</span>
            </div>
          </div>
          {waUrl && (
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                marginTop: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#25d366',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={16} /> Hubungi via WhatsApp
            </a>
          )}
        </div>

        {/* Detail Properti & Sewa */}
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={16} color="#0066ff" /> Properti & Masa Sewa
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Nama Kost:</span>
              <strong style={{ color: '#0f172a' }}>{kosName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Alamat:</span>
              <span>{kosAddress}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Tanggal Check-in:</span>
              <strong>{formatDateStr(booking.tanggal_masuk)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Durasi Sewa:</span>
              <strong>{booking.durasi_bulan || 1} Bulan</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Tanggal Keluar:</span>
              <strong>{formatDateStr(booking.tanggal_keluar)}</strong>
            </div>
          </div>
        </div>

        {/* Breakdown Keuangan Bagi Hasil */}
        <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wallet size={16} color="#10b981" /> Rincian Pendapatan Pemilik
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
              <span>Total Sewa Bruto:</span>
              <span>{formatRupiah(totalHarga)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444' }}>
              <span>Potongan Biaya Platform (3%):</span>
              <span>-{formatRupiah(biayaPlatform)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f1f5f9', fontWeight: 700, fontSize: '14px', color: '#0066ff' }}>
              <span>Pendapatan Bersih Pemilik (97%):</span>
              <span>{formatRupiah(jatahPemilik)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          {onComplete && s !== 'selesai' && s !== 'dibatalkan' && (
            <button
              type="button"
              onClick={() => {
                onComplete(booking.id);
                onClose();
              }}
              style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <CheckCircle2 size={16} /> Tandai Selesai
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: '#f1f5f9',
              color: '#334155',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
