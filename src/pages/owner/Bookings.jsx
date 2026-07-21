import React, { useState } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import BookingRowCard from '../../components/owner/BookingRowCard';

import { 
  Search, 
  ChevronDown, 
  Filter, 
  CalendarCheck, 
  CalendarPlus,
  Inbox
} from 'lucide-react';

import '../../styles/owner/dashboard.css';
import '../../styles/owner/bookings.css';

// Import Gambar Local
import avatarImg from '../../assets/avatar.jpg';
import harmoniImg from '../../assets/harmoni.jpeg';
import melatiImg from '../../assets/melati.jpeg';
import melati1Img from '../../assets/melati1.jpeg';
import melati2Img from '../../assets/melati2.jpeg';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [kostFilter, setKostFilter] = useState('Semua Kost');

  // Master Data Booking
  const [bookingsData, setBookingsData] = useState([
    {
      id: 1,
      tenantName: 'Rizky Pratama',
      tenantPhone: '0812 3456 7890',
      tenantAvatar: avatarImg,
      kostName: 'Kost Harmoni Residence',
      kostLocation: 'Jl. Kaliurang Km 5, Sleman',
      kostImage: harmoniImg,
      createdDate: '20 Mei 2024',
      checkInDate: '25 Mei 2024',
      duration: '6 Bulan',
      totalPrice: 7200000,
      status: 'Menunggu Konfirmasi'
    },
    {
      id: 2,
      tenantName: 'Siti Aisyah',
      tenantPhone: '0813 9876 5432',
      tenantAvatar: avatarImg,
      kostName: 'Kost Putri Alifia',
      kostLocation: 'Jl. Seturan Raya No. 12, Depok',
      kostImage: melati1Img,
      createdDate: '19 Mei 2024',
      checkInDate: '24 Mei 2024',
      duration: '3 Bulan',
      totalPrice: 3600000,
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
      createdDate: '18 Mei 2024',
      checkInDate: '01 Juni 2024',
      duration: '12 Bulan',
      totalPrice: 14400000,
      status: 'Dikonfirmasi'
    },
    {
      id: 4,
      tenantName: 'Nadia Putri',
      tenantPhone: '0896 5566 7788',
      tenantAvatar: avatarImg,
      kostName: 'Kost Melati',
      kostLocation: 'Jl. Palagan Tentara Pelajar No. 88, Sleman',
      kostImage: melatiImg,
      createdDate: '17 Mei 2024',
      checkInDate: '05 Juni 2024',
      duration: '6 Bulan',
      totalPrice: 5700000,
      status: 'Sedang Berjalan'
    },
    {
      id: 5,
      tenantName: 'Dimas Saputra',
      tenantPhone: '0812 7788 9900',
      tenantAvatar: avatarImg,
      kostName: 'Kost Kencana',
      kostLocation: 'Jl. Magelang Km 7, Sleman',
      kostImage: harmoniImg,
      createdDate: '10 Mei 2024',
      checkInDate: '01 Mei 2024',
      duration: '3 Bulan',
      totalPrice: 3300000,
      status: 'Selesai'
    },
    {
      id: 6,
      tenantName: 'Putri Amelia',
      tenantPhone: '0822 3344 5566',
      tenantAvatar: avatarImg,
      kostName: 'Kost Cendana',
      kostLocation: 'Jl. Affandi No. 20, Sleman',
      kostImage: melati1Img,
      createdDate: '08 Mei 2024',
      checkInDate: '15 Mei 2024',
      duration: '1 Bulan',
      totalPrice: 1500000,
      status: 'Dibatalkan'
    }
  ]);

  // Logika Filter Data
  const filteredBookings = bookingsData.filter(item => {
    const matchesSearch = item.tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || item.status === statusFilter;
    const matchesKost = kostFilter === 'Semua Kost' || item.kostName === kostFilter;
    return matchesSearch && matchesStatus && matchesKost;
  });

  // Header Stats Component
  const StatsHeaderGroup = (
    <div className="header-stats-group">
      <div className="header-stat-card">
        <div className="stat-icon-bg blue">
          <CalendarCheck size={18} color="#0066ff" />
        </div>
        <div>
          <span className="stat-value">4 <span className="stat-unit">booking</span></span>
          <span className="stat-title">Booking Hari Ini</span>
        </div>
      </div>

      <div className="header-stat-card">
        <div className="stat-icon-bg green">
          <CalendarPlus size={18} color="#10b981" />
        </div>
        <div>
          <span className="stat-value">2 <span className="stat-unit">booking</span></span>
          <span className="stat-title">Booking Baru</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Header 
          title="Booking Masuk" 
          subtitle="Lihat dan kelola seluruh permintaan booking dari calon penyewa."
          actionButton={StatsHeaderGroup}
          showProfile={false}
        />

        {/* Jika ada data booking secara umum */}
        {bookingsData.length > 0 ? (
          <>
            {/* Filter Bar */}
            <div className="bookings-filter-bar">
              <div className="booking-search-input">
                <Search size={18} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="Cari nama penyewa..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="booking-filter-options">
                <div className="b-select-wrapper">
                  <span className="label">Status</span>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="Semua">Semua</option>
                    <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                    <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                    <option value="Dikonfirmasi">Dikonfirmasi</option>
                    <option value="Sedang Berjalan">Sedang Berjalan</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                  <ChevronDown size={14} className="arrow" />
                </div>

                <div className="b-select-wrapper">
                  <span className="label">Kost</span>
                  <select value={kostFilter} onChange={(e) => setKostFilter(e.target.value)}>
                    <option value="Semua Kost">Semua Kost</option>
                    <option value="Kost Harmoni Residence">Kost Harmoni Residence</option>
                    <option value="Kost Putri Alifia">Kost Putri Alifia</option>
                    <option value="Kost Green House">Kost Green House</option>
                  </select>
                  <ChevronDown size={14} className="arrow" />
                </div>

                <div className="b-select-wrapper">
                  <span className="label">Urutkan</span>
                  <select defaultValue="Terbaru">
                    <option value="Terbaru">Terbaru</option>
                    <option value="Terlama">Terlama</option>
                  </select>
                  <ChevronDown size={14} className="arrow" />
                </div>

                <button className="icon-filter-btn">
                  <Filter size={16} color="#64748b" />
                </button>
              </div>
            </div>

            {/* Render List atau Empty Search State */}
            {filteredBookings.length > 0 ? (
              <>
                <div className="bookings-list">
                  {filteredBookings.map(item => (
                    <BookingRowCard key={item.id} booking={item} />
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
              /* Empty State jika Filter / Search Tidak Ditemukan */
              <div className="empty-booking-state">
                <div className="empty-icon-box">
                  <Inbox size={40} color="#0066ff" />
                </div>
                <h3>Pencarian Tidak Ditemukan</h3>
                <p>Tidak ada booking yang sesuai dengan kata kunci atau filter yang Anda pilih.</p>
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
          </>
        ) : (
          /* Empty State Jika Belum Ada Booking Sama Sekali */
          <div className="empty-booking-state">
            <div className="empty-icon-box">
              <Inbox size={44} color="#0066ff" />
            </div>
            <h3>Belum Ada Booking Masuk</h3>
            <p>Saat ini belum ada calon penyewa yang melakukan pemesanan kamar di properti kost Anda.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookings;