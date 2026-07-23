import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import TransactionRowCard from '../../components/owner/TransactionRowCard';
import CustomSelect from '../../components/owner/CustomSelect';
import ModalInvoiceOwner from '../../components/owner/ModalInvoiceOwner';
import ModalDetailBookingOwner from '../../components/owner/ModalDetailBookingOwner';
import Pagination from '../../components/Pagination';
import api from '../../api/api';

import { 
  Search, 
  ChevronDown, 
  Filter, 
  Wallet, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  Inbox,
  Info
} from 'lucide-react';

import '../../styles/owner/dashboard.css';
import '../../styles/owner/finance.css';

// Import Gambar Local
import avatarImg from '../../assets/avatar.jpg';
import harmoniImg from '../../assets/harmoni.jpeg';

const Finance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [kostFilter, setKostFilter] = useState('Semua Kost');
  const [periodFilter, setPeriodFilter] = useState('Bulan Ini');
  const [rawBookings, setRawBookings] = useState([]);
  const [ownerKosts, setOwnerKosts] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    async function loadFinanceData() {
      setLoading(true);
      try {
        const [resBookings, resKosts] = await Promise.allSettled([
          api.get('/bookings'),
          api.get('/owner/kos')
        ]);
        if (resBookings.status === 'fulfilled' && resBookings.value.data) {
          setRawBookings(resBookings.value.data);
        }
        if (resKosts.status === 'fulfilled' && resKosts.value.data) {
          setOwnerKosts(resKosts.value.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data keuangan:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFinanceData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, kostFilter, periodFilter]);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
  };

  const transactionsData = rawBookings.map(b => {
    const user = b.penyewa || b.user || {};
    const kos = b.kos || {};
    const statusLower = (b.status || '').toLowerCase();
    
    let mappedStatus = 'Berhasil';
    if (statusLower === 'pending' || statusLower.includes('menunggu')) {
      mappedStatus = 'Menunggu Pembayaran';
    } else if (statusLower === 'dibatalkan' || statusLower === 'cancelled') {
      mappedStatus = 'Gagal';
    } else if (statusLower === 'refund') {
      mappedStatus = 'Refund';
    }

    const gross = parseFloat(b.total_harga) || 0;
    const pd = b.pembagian_dana || b.pembagianDana || {};
    const jatahPemilik = pd.jatah_pemilik !== undefined ? parseFloat(pd.jatah_pemilik) : (b.jatah_pemilik !== undefined ? parseFloat(b.jatah_pemilik) : gross * 0.97);
    const statusDisbursement = (pd.status_disbursement || b.status_disbursement || 'pending').toLowerCase();
    const statusTransfer = statusDisbursement === 'selesai' ? 'Sudah Ditransfer' : statusDisbursement === 'diproses' ? 'Diproses Admin' : 'Belum Ditransfer';

    return {
      id: b.id,
      tenantName: user.nama || user.email || b.tenantName || 'Penyewa',
      tenantPhone: user.no_hp || b.tenantPhone || '-',
      tenantAvatar: user.foto_profil_url || b.tenantAvatar || avatarImg,
      kostName: kos.nama_kos || b.kostName || 'Properti Kost',
      kostLocation: kos.kota || kos.alamat || b.kostLocation || 'Indonesia',
      kostImage: kos.foto_utama_url || kos.foto_utama || b.kostImage || harmoniImg,
      invoiceCode: b.kode_booking || `INV-${b.id}`,
      date: b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID') : '-',
      paymentMethod: b.metode_pembayaran || 'Transfer Bank',
      amount: jatahPemilik,
      grossAmount: gross,
      status: mappedStatus,
      statusDisbursement: statusDisbursement,
      statusTransfer: statusTransfer,
      rawBooking: b
    };
  });

  const totalPendapatan = transactionsData
    .filter(t => t.status === 'Berhasil')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTransaksi = transactionsData.length;

  const totalSudahDitransferAdmin = transactionsData
    .filter(t => t.status === 'Berhasil' && (t.statusDisbursement === 'selesai' || t.statusTransfer === 'Sudah Ditransfer'))
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBerhasilCount = transactionsData
    .filter(t => t.status === 'Berhasil').length;

  // Logika Filter Data
  const filteredTransactions = transactionsData.filter(item => {
    const matchesSearch = item.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || item.status === statusFilter;
    const matchesKost = kostFilter === 'Semua Kost' || item.kostName === kostFilter;
    return matchesSearch && matchesStatus && matchesKost;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Header 
          title="Keuangan" 
          subtitle="Pantau pemasukan dan transaksi seluruh kost Anda."
          showProfile={true}
        />

        {/* Info Banner Alur Distribusi Manual Admin */}
        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '13px',
          color: '#1e40af'
        }}>
          <Info size={20} color="#0066ff" style={{ flexShrink: 0 }} />
          <div>
            <strong>Alur Distribusi Keuangan:</strong> Seluruh pembayaran penyewa masuk ke sistem Admin Kostin. Admin memotong biaya platform <strong>3%</strong> dan mentransfer jatah bersih <strong>97%</strong> secara manual ke rekening bank Anda yang terdaftar di Pengaturan Profil.
          </div>
        </div>

        {/* 4 Cards Summary Stat Keuangan */}
        <div className="finance-summary-grid">
          <div className="finance-card">
            <div className="f-icon-bg blue">
              <Wallet size={20} color="#0066ff" />
            </div>
            <div className="f-info">
              <span className="f-title">Total Pendapatan (97%)</span>
              <h3 className="f-value">{formatRupiah(totalPendapatan)}</h3>
              <span className="f-sub">Jatah bersih milik Anda</span>
            </div>
          </div>

          <div className="finance-card">
            <div className="f-icon-bg green">
              <Receipt size={20} color="#10b981" />
            </div>
            <div className="f-info">
              <span className="f-title">Total Transaksi</span>
              <h3 className="f-value">{totalTransaksi} Transaksi</h3>
              <span className="f-sub">Semua transaksi</span>
            </div>
          </div>

          <div className="finance-card">
            <div className="f-icon-bg emerald">
              <CheckCircle2 size={20} color="#059669" />
            </div>
            <div className="f-info">
              <span className="f-title">Telah Ditransfer Admin</span>
              <h3 className="f-value">{formatRupiah(totalSudahDitransferAdmin)}</h3>
              <span className="f-sub">Sudah masuk ke rekening Anda</span>
            </div>
          </div>

          <div className="finance-card">
            <div className="f-icon-bg emerald">
              <CheckCircle2 size={20} color="#059669" />
            </div>
            <div className="f-info">
              <span className="f-title">Pembayaran Berhasil</span>
              <h3 className="f-value">{totalBerhasilCount} Transaksi</h3>
              <span className="f-sub">Telah diterima Admin</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="finance-filter-bar">
          <div className="finance-search-input">
            <Search size={18} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Cari nama penyewa..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="finance-filter-options" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <CustomSelect
              label="Status Pembayaran"
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={[
                { label: 'Semua', value: 'Semua' },
                { label: 'Berhasil', value: 'Berhasil' },
                { label: 'Menunggu Pembayaran', value: 'Menunggu Pembayaran' },
                { label: 'Gagal', value: 'Gagal' },
                { label: 'Refund', value: 'Refund' },
              ]}
            />

            <CustomSelect
              label="Filter Kost"
              value={kostFilter}
              onChange={(val) => setKostFilter(val)}
              options={[
                { label: 'Semua Kost', value: 'Semua Kost' },
                ...ownerKosts.map(k => ({ label: k.nama_kos, value: k.nama_kos }))
              ]}
            />

            <CustomSelect
              label="Periode"
              value={periodFilter}
              onChange={(val) => setPeriodFilter(val)}
              options={[
                { label: 'Bulan Ini', value: 'Bulan Ini' },
                { label: 'Bulan Lalu', value: 'Bulan Lalu' },
                { label: 'Tahun Ini', value: 'Tahun Ini' },
              ]}
            />

            <button 
              type="button"
              className="icon-filter-btn" 
              onClick={() => { setSearchTerm(''); setStatusFilter('Semua'); setKostFilter('Semua Kost'); setPeriodFilter('Bulan Ini'); }}
              title="Reset Filter"
            >
              <Filter size={16} color="#64748b" />
            </button>
          </div>
        </div>

        {/* Section Riwayat Transaksi */}
        <div className="section-title-bar">
          <h3>Riwayat Transaksi</h3>
        </div>

        {/* List Transaksi */}
        {filteredTransactions.length > 0 ? (
          <>
            <div className="transactions-list">
              {currentTransactions.map(item => (
                <TransactionRowCard 
                  key={item.id} 
                  transaction={item} 
                  onViewDetail={(t) => setSelectedBooking(t.rawBooking || t)}
                  onViewInvoice={(t) => setSelectedInvoice(t)}
                  onDownloadReceipt={(t) => setSelectedInvoice(t)}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <div className="empty-finance-state">
            <div className="empty-icon-box">
              <Inbox size={40} color="#0066ff" />
            </div>
            <h3>Transaksi Tidak Ditemukan</h3>
            <p>Tidak ada riwayat transaksi yang sesuai dengan filter atau kata kunci Anda.</p>
            <button 
              className="btn-reset-filter"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('Semua');
                setKostFilter('Semua Kost');
              }}
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Modal Invoice Owner */}
        {selectedInvoice && (
          <ModalInvoiceOwner 
            transaction={selectedInvoice} 
            onClose={() => setSelectedInvoice(null)} 
          />
        )}

        {/* Modal Detail Booking Owner */}
        {selectedBooking && (
          <ModalDetailBookingOwner 
            booking={selectedBooking} 
            onClose={() => setSelectedBooking(null)} 
          />
        )}
      </main>
    </div>
  );
};

export default Finance;