import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import BookingRowCard from '../../components/owner/BookingRowCard';
import api from '../../api/api';

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

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [kostFilter, setKostFilter] = useState('Semua Kost');
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOwnerBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings');
      if (res.data) {
        setBookingsData(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil booking masuk pemilik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const handleCompleteBooking = async (bookingId) => {
    if (!window.confirm("Tandai sewa booking ini sebagai Selesai?")) return;
    try {
      await api.post(`/bookings/${bookingId}/complete`);
      alert("Sewa booking berhasil diselesaikan!");
      fetchOwnerBookings();
    } catch (err) {
      console.error("Gagal menyelesikan booking:", err);
      alert(err.message || "Gagal menyelesikan sewa booking.");
    }
  };

  const filteredBookings = bookingsData.filter(item => {
    const tenantName = item.user?.nama || item.tenantName || "";
    const matchesSearch = tenantName.toLowerCase().includes(searchTerm.toLowerCase());
    const status = item.status || "";
    const matchesStatus = statusFilter === 'Semua' || status.toLowerCase() === statusFilter.toLowerCase();
    const kosName = item.kos?.nama_kos || item.kostName || "";
    const matchesKost = kostFilter === 'Semua Kost' || kosName === kostFilter;
    return matchesSearch && matchesStatus && matchesKost;
  });

  const StatsHeaderGroup = (
    <div className="header-stats-group">
      <div className="header-stat-card">
        <div className="stat-icon-bg blue">
          <CalendarCheck size={18} color="#0066ff" />
        </div>
        <div>
          <span className="stat-value">{bookingsData.length} <span className="stat-unit">booking</span></span>
          <span className="stat-title">Total Booking</span>
        </div>
      </div>

      <div className="header-stat-card">
        <div className="stat-icon-bg green">
          <CalendarPlus size={18} color="#10b981" />
        </div>
        <div>
          <span className="stat-value">
            {bookingsData.filter(b => b.status === 'pending' || b.status === 'Menunggu Konfirmasi').length}{' '}
            <span className="stat-unit">booking</span>
          </span>
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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            Memuat data booking masuk...
          </div>
        ) : bookingsData.length > 0 ? (
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
                    <option value="pending">Menunggu Konfirmasi</option>
                    <option value="aktif">Sedang Berjalan</option>
                    <option value="selesai">Selesai</option>
                    <option value="dibatalkan">Dibatalkan</option>
                  </select>
                  <ChevronDown size={14} className="arrow" />
                </div>

                <button 
                  className="icon-filter-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('Semua');
                    setKostFilter('Semua Kost');
                  }}
                >
                  <Filter size={16} color="#64748b" />
                </button>
              </div>
            </div>

            {/* Render List atau Empty Search State */}
            {filteredBookings.length > 0 ? (
              <div className="bookings-list">
                {filteredBookings.map(item => (
                  <BookingRowCard
                    key={item.id}
                    booking={item}
                    onComplete={handleCompleteBooking}
                  />
                ))}
              </div>
            ) : (
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