import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import BookingRowCard from '../../components/owner/BookingRowCard';
import ModalDetailBookingOwner from '../../components/owner/ModalDetailBookingOwner';
import CustomStatusSelect from '../../components/owner/CustomStatusSelect';
import Pagination from '../../components/Pagination';
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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, kostFilter]);

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
    const status = (item.status || "").toLowerCase();
    const filter = statusFilter.toLowerCase();
    
    let matchesStatus = filter === 'semua';
    if (!matchesStatus) {
      if (filter === 'pending') matchesStatus = status === 'pending' || status.includes('menunggu');
      else if (filter === 'aktif') matchesStatus = status === 'aktif' || status === 'active';
      else if (filter === 'selesai') matchesStatus = status === 'selesai' || status === 'confirmed';
      else if (filter === 'dibatalkan') matchesStatus = status === 'dibatalkan' || status === 'cancelled';
      else matchesStatus = status === filter;
    }
    
    const kosName = item.kos?.nama_kos || item.kostName || "";
    const matchesKost = kostFilter === 'Semua Kost' || kosName === kostFilter;
    return matchesSearch && matchesStatus && matchesKost;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

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
          showProfile={true}
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
                <CustomStatusSelect
                  value={statusFilter}
                  onChange={(val) => setStatusFilter(val)}
                  options={[
                    { label: 'Semua', value: 'Semua' },
                    { label: 'Menunggu Konfirmasi', value: 'pending' },
                    { label: 'Sedang Berjalan', value: 'aktif' },
                    { label: 'Selesai', value: 'selesai' },
                    { label: 'Dibatalkan', value: 'dibatalkan' },
                  ]}
                />

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
              <>
                <div className="bookings-list">
                  {currentBookings.map(item => (
                    <BookingRowCard
                      key={item.id}
                      booking={item}
                      onComplete={handleCompleteBooking}
                      onViewDetail={(b) => setSelectedBooking(b)}
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

        {/* Modal Detail Booking Owner */}
        {selectedBooking && (
          <ModalDetailBookingOwner 
            booking={selectedBooking} 
            onClose={() => setSelectedBooking(null)} 
            onComplete={handleCompleteBooking} 
          />
        )}
      </main>
    </div>
  );
};

export default Bookings;