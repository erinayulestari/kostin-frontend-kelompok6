import React from 'react';
import { X, Printer, Download, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ModalInvoiceOwner({ transaction, onClose }) {
  if (!transaction) return null;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
  };

  const grossAmount = transaction.grossAmount || transaction.amount || 0;
  const platformFee = grossAmount * 0.03;
  const netAmount = transaction.amount || (grossAmount - platformFee);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '32px',
        position: 'relative'
      }}>
        {/* Header Modal & Print Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '2px dashed #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: '#0066ff', color: '#ffffff', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, fontSize: '18px' }}>
              KOSTIN
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>INVOICE PEMBAYARAN</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>{transaction.invoiceCode || 'INV-000000'}</span>
            </div>
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

        {/* Status Invoice Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>TANGGAL TRANSAKSI</span>
            <strong style={{ fontSize: '13px', color: '#0f172a' }}>{transaction.date || '-'}</strong>
          </div>
          <span style={{
            backgroundColor: transaction.status === 'Berhasil' ? '#dcfce7' : '#fef3c7',
            color: transaction.status === 'Berhasil' ? '#15803d' : '#b45309',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <CheckCircle2 size={14} /> {transaction.status || 'Berhasil'}
          </span>
        </div>

        {/* Pihak Terlibat (Penyewa & Pemilik) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px', fontSize: '13px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', padding: '14px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>DIBAYAR OLEH (PENYEWA):</span>
            <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>{transaction.tenantName || 'Penyewa'}</strong>
            <span style={{ color: '#64748b', fontSize: '12px' }}>{transaction.tenantPhone || '-'}</span>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #f1f5f9', padding: '14px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>PROPERTI KOST:</span>
            <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block' }}>{transaction.kostName || 'Kost'}</strong>
            <span style={{ color: '#64748b', fontSize: '12px' }}>{transaction.kostLocation || 'Indonesia'}</span>
          </div>
        </div>

        {/* Tabel Rincian Biaya */}
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>RINCIAN PEMBAYARAN</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                <th style={{ padding: '8px 0', fontWeight: 600 }}>Deskripsi</th>
                <th style={{ padding: '8px 0', fontWeight: 600, textAlign: 'right' }}>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 0', color: '#0f172a', fontWeight: 600 }}>Total Harga Sewa Bruto</td>
                <td style={{ padding: '12px 0', textAlign: 'right', color: '#0f172a', fontWeight: 600 }}>{formatRupiah(grossAmount)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 0', color: '#ef4444' }}>Potongan Platform (3%)</td>
                <td style={{ padding: '12px 0', textAlign: 'right', color: '#ef4444' }}>-{formatRupiah(platformFee)}</td>
              </tr>
              <tr style={{ borderBottom: '2px solid #0f172a' }}>
                <td style={{ padding: '14px 0', color: '#0066ff', fontWeight: 800, fontSize: '15px' }}>Pendapatan Bersih Pemilik (97%)</td>
                <td style={{ padding: '14px 0', textAlign: 'right', color: '#0066ff', fontWeight: 800, fontSize: '16px' }}>{formatRupiah(netAmount)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Info Metode Pembayaran */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b' }}>
          <span>Metode Pembayaran: <strong>{transaction.paymentMethod || 'Midtrans Gateway'}</strong></span>
          <span>Status Sistem: <strong style={{ color: '#16a34a' }}>Terverifikasi Otomatis</strong></span>
        </div>

        {/* Footer Actions */}
        <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              backgroundColor: '#0066ff',
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
            <Printer size={16} /> Cetak / Simpan PDF
          </button>
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
