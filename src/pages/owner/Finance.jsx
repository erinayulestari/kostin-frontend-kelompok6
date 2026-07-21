import React, { useState } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import TransactionRowCard from '../../components/owner/TransactionRowCard';

import { 
  Search, 
  ChevronDown, 
  Filter, 
  Wallet, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  Inbox
} from 'lucide-react';

import '../../styles/owner/dashboard.css';
import '../../styles/owner/finance.css';

// Import Gambar Local
import avatarImg from '../../assets/avatar.jpg';
import harmoniImg from '../../assets/harmoni.jpeg';
import melatiImg from '../../assets/melati.jpeg';
import melati1Img from '../../assets/melati1.jpeg';
import melati2Img from '../../assets/melati2.jpeg';

const Finance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [kostFilter, setKostFilter] = useState('Semua Kost');
  const [periodFilter, setPeriodFilter] = useState('Bulan Ini');

  // Master Data Transaksi Keuangan
  const [transactionsData] = useState([
    {
      id: 1,
      tenantName: 'Siti Aisyah',
      tenantPhone: '0813 9876 5432',
      tenantAvatar: avatarImg,
      kostName: 'Kost Putri Alifia',
      kostLocation: 'Jl. Seturan Raya No. 12, Depok',
      kostImage: melati1Img,
      invoiceCode: 'INV-2505-00125',
      date: '25 Mei 2024',
      paymentMethod: 'Transfer Bank BCA',
      amount: 1300000,
      status: 'Berhasil'
    },
    {
      id: 2,
      tenantName: 'Rizky Pratama',
      tenantPhone: '0812 3456 7890',
      tenantAvatar: avatarImg,
      kostName: 'Kost Harmoni Residence',
      kostLocation: 'Jl. Kaliurang Km 5, Sleman',
      kostImage: harmoniImg,
      invoiceCode: 'INV-2505-00124',
      date: '24 Mei 2024',
      paymentMethod: 'Virtual Account BRI',
      amount: 1500000,
      status: 'Menunggu Pembayaran'
    },
    {
      id: 3,
      tenantName: 'Andi Wijaya',
      tenantPhone: '0857 1122 3344',
      tenantAvatar: avatarImg,
      kostName: 'Kost Green House',
      kostLocation: 'Jl. Gejayan No. 45, Sleman',
      kostImage: melati2Img,
      invoiceCode: 'INV-2505-00123',
      date: '22 Mei 2024',
      paymentMethod: 'Transfer Bank Mandiri',
      amount: 1200000,
      status: 'Berhasil'
    },
    {
      id: 4,
      tenantName: 'Nadia Putri',
      tenantPhone: '0896 5566 7788',
      tenantAvatar: avatarImg,
      kostName: 'Kost Melati',
      kostLocation: 'Jl. Palagan Tentara Pelajar No. 88, Sleman',
      kostImage: melatiImg,
      invoiceCode: 'INV-2505-00122',
      date: '20 Mei 2024',
      paymentMethod: 'E-Wallet OVO',
      amount: 950000,
      status: 'Gagal'
    },
    {
      id: 5,
      tenantName: 'Dimas Saputra',
      tenantPhone: '0812 7788 9900',
      tenantAvatar: avatarImg,
      kostName: 'Kost Kencana',
      kostLocation: 'Jl. Magelang Km 7, Sleman',
      kostImage: harmoniImg,
      invoiceCode: 'INV-2505-00121',
      date: '19 Mei 2024',
      paymentMethod: 'Transfer Bank BCA',
      amount: 1100000,
      status: 'Refund'
    }
  ]);

  // Logika Filter Data
  const filteredTransactions = transactionsData.filter(item => {
    const matchesSearch = item.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || item.status === statusFilter;
    const matchesKost = kostFilter === 'Semua Kost' || item.kostName === kostFilter;
    return matchesSearch && matchesStatus && matchesKost;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Header 
          title="Keuangan" 
          subtitle="Pantau pemasukan dan transaksi seluruh kost Anda."
          showProfile={false}
        />

        {/* 4 Cards Summary Stat Keuangan */}
        <div className="finance-summary-grid">
          <div className="finance-card">
            <div className="f-icon-bg blue">
              <Wallet size={20} color="#0066ff" />
            </div>
            <div className="f-info">
              <span className="f-title">Total Pendapatan Bulan Ini</span>
              <h3 className="f-value">Rp18.500.000</h3>
              <span className="f-sub">Dari semua kost Anda</span>
            </div>
          </div>

          <div className="finance-card">
            <div className="f-icon-bg green">
              <Receipt size={20} color="#10b981" />
            </div>
            <div className="f-info">
              <span className="f-title">Total Transaksi</span>
              <h3 className="f-value">25 Transaksi</h3>
              <span className="f-sub">Semua transaksi</span>
            </div>
          </div>

          <div className="finance-card">
            <div className="f-icon-bg orange">
              <Clock size={20} color="#f59e0b" />
            </div>
            <div className="f-info">
              <span className="f-title">Menunggu Pembayaran</span>
              <h3 className="f-value">Rp3.200.000</h3>
              <span className="f-sub">Perlu ditindaklanjuti</span>
            </div>
          </div>

          <div className="finance-card">
            <div className="f-icon-bg emerald">
              <CheckCircle2 size={20} color="#059669" />
            </div>
            <div className="f-info">
              <span className="f-title">Pembayaran Berhasil</span>
              <h3 className="f-value">22 Transaksi</h3>
              <span className="f-sub">Transaksi berhasil</span>
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

          <div className="finance-filter-options">
            <div className="f-select-wrapper">
              <span className="label">Status Pembayaran</span>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="Semua">Semua</option>
                <option value="Berhasil">Berhasil</option>
                <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                <option value="Gagal">Gagal</option>
                <option value="Refund">Refund</option>
              </select>
              <ChevronDown size={14} className="arrow" />
            </div>

            <div className="f-select-wrapper">
              <span className="label">Filter Kost</span>
              <select value={kostFilter} onChange={(e) => setKostFilter(e.target.value)}>
                <option value="Semua Kost">Semua Kost</option>
                <option value="Kost Putri Alifia">Kost Putri Alifia</option>
                <option value="Kost Harmoni Residence">Kost Harmoni Residence</option>
                <option value="Kost Green House">Kost Green House</option>
                <option value="Kost Melati">Kost Melati</option>
              </select>
              <ChevronDown size={14} className="arrow" />
            </div>

            <div className="f-select-wrapper">
              <span className="label">Periode</span>
              <select value={periodFilter} onChange={(e) => setPeriodFilter(e.target.value)}>
                <option value="Bulan Ini">Bulan Ini</option>
                <option value="Bulan Lalu">Bulan Lalu</option>
                <option value="Tahun Ini">Tahun Ini</option>
              </select>
              <ChevronDown size={14} className="arrow" />
            </div>

            <button className="icon-filter-btn">
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
              {filteredTransactions.map(item => (
                <TransactionRowCard key={item.id} transaction={item} />
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper">
              <button className="page-btn page-btn-text">&lt;</button>
              <button className="page-btn page-btn-num active">1</button>
              <button className="page-btn page-btn-num">2</button>
              <button className="page-btn page-btn-num">3</button>
              <span className="page-dots">...</span>
              <button className="page-btn page-btn-num">8</button>
              <button className="page-btn page-btn-text">&gt;</button>
            </div>
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
      </main>
    </div>
  );
};

export default Finance;