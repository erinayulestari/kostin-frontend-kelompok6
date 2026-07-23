import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import StatCard from '../../components/owner/StatCard';
import BookingCard from '../../components/owner/BookingCard';
import KostCard from '../../components/owner/KostCard';
import ModalDetailBookingOwner from '../../components/owner/ModalDetailBookingOwner';
import ModalDetailKostOwner from '../../components/owner/ModalDetailKostOwner';
import api from '../../api/api';

import { Home, Calendar, BedDouble, Wallet, ChevronRight } from 'lucide-react';
import '../../styles/owner/dashboard.css';

import avatarImg from '../../assets/avatar.jpg';
import defaultKostImg from '../../assets/harmoni.jpeg';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [ownerKosts, setOwnerKosts] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedKosId, setSelectedKosId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [resKosts, resBookings] = await Promise.allSettled([
          api.get('/owner/kos'),
          api.get('/bookings'),
        ]);

        if (resKosts.status === 'fulfilled' && resKosts.value.data) {
          setOwnerKosts(resKosts.value.data);
        }
        if (resBookings.status === 'fulfilled' && resBookings.value.data) {
          setOwnerBookings(resBookings.value.data);
        }
      } catch (err) {
        console.error("Gagal memuat data dashboard pemilik:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalKost = ownerKosts.length;
  const bookingAktif = ownerBookings.filter(b => {
    const s = (b.status || '').toLowerCase();
    return s === 'aktif' || s === 'active' || s === 'pending';
  }).length;
  const totalKamar = ownerKosts.reduce((acc, k) => acc + (parseInt(k.jumlah_kamar) || 0), 0);
  const kamarTerisi = ownerKosts.reduce((acc, k) => acc + (parseInt(k.kamar_terisi) || 0), 0);
  const kamarKosong = Math.max(0, totalKamar - kamarTerisi);

  const totalPendapatan = ownerBookings.reduce((sum, b) => {
    const s = (b.status || '').toLowerCase();
    if (s === 'selesai' || s === 'aktif' || s === 'active' || s === 'confirmed' || s === 'lunas') {
      const gross = parseFloat(b.total_harga) || 0;
      const net = b.jatah_pemilik !== undefined ? parseFloat(b.jatah_pemilik) : (b.pembagian_dana?.jatah_pemilik !== undefined ? parseFloat(b.pembagian_dana.jatah_pemilik) : gross * 0.97);
      return sum + net;
    }
    return sum;
  }, 0);

  const statsData = [
    { title: 'Total Kost', value: `${totalKost}`, unit: 'Kost', icon: Home, iconBg: '#e6f0ff', iconColor: '#0066ff', linkText: 'Lihat semua kost', to: '/owner/kost-saya' },
    { title: 'Booking Aktif', value: `${bookingAktif}`, unit: 'Booking', icon: Calendar, iconBg: '#dcfce7', iconColor: '#16a34a', linkText: 'Lihat semua booking', to: '/owner/booking' },
    { title: 'Kamar Kosong', value: `${kamarKosong}`, unit: 'Kamar', icon: BedDouble, iconBg: '#fef3c7', iconColor: '#d97706', linkText: 'Lihat semua kamar', to: '/owner/kost-saya' },
    { title: 'Pendapatan Bulan Ini', value: `Rp ${totalPendapatan.toLocaleString('id-ID')}`, unit: '', icon: Wallet, iconBg: '#f3e8ff', iconColor: '#9333ea', linkText: 'Lihat laporan', to: '/owner/laporan' },
  ];

  const handleDeleteKost = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus properti kos ini?")) return;
    try {
      await api.delete(`/owner/kos/${id}`);
      alert("Properti kos berhasil dihapus.");
      setOwnerKosts(prev => prev.filter(k => k.id !== id));
    } catch (err) {
      console.error("Gagal menghapus kos:", err);
      alert(err.message || "Gagal menghapus kos.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Header 
          title="Dashboard" 
          subtitle="Selamat datang kembali di panel kelola Kostin."
          showProfile={true} 
        />

        {/* Section Cards Stat */}
        <div className="stats-grid">
          {statsData.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Section Booking Terbaru */}
        <section style={{ marginBottom: '36px' }}>
          <div className="section-header">
            <h2>Booking Terbaru</h2>
            <Link to="/owner/booking" className="see-all">Lihat Semua Booking <ChevronRight size={14} /></Link>
          </div>
          <div className="booking-grid">
            {loading ? (
              <p>Memuat data booking...</p>
            ) : ownerBookings.length === 0 ? (
              <p style={{ color: "#64748b" }}>Belum ada booking masuk.</p>
            ) : (
              ownerBookings.slice(0, 4).map((b, idx) => {
                const userObj = b.penyewa || b.user || {};
                const kosObj = b.kos || {};
                const s = (b.status || '').toLowerCase();
                let statusText = 'Sedang Berjalan';
                if (s.includes('menunggu') || s === 'pending') statusText = 'Menunggu Konfirmasi';
                else if (s === 'selesai' || s === 'confirmed') statusText = 'Selesai';
                else if (s === 'dibatalkan' || s === 'cancelled') statusText = 'Dibatalkan';

                let formattedDate = b.tanggal_masuk || "-";
                if (formattedDate && formattedDate.includes('T')) {
                  formattedDate = formattedDate.split('T')[0];
                }
                if (formattedDate && formattedDate !== '-') {
                  try {
                    const d = new Date(formattedDate);
                    if (!isNaN(d.getTime())) {
                      formattedDate = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                    }
                  } catch (e) {}
                }

                return (
                  <BookingCard
                    key={b.id || idx}
                    name={userObj.nama || userObj.email || "Penyewa"}
                    kostName={kosObj.nama_kos || "Properti Kost"}
                    avatar={userObj.foto_profil_url || avatarImg}
                    checkIn={formattedDate}
                    duration={`${b.durasi_bulan || 1} Bulan`}
                    status={b.status || 'aktif'}
                    statusText={statusText}
                    actionText="Lihat Detail"
                    onClickAction={() => setSelectedBooking(b)}
                  />
                );
              })
            )}
          </div>
        </section>

        {/* Section Kost Saya */}
        <section>
          <div className="section-header">
            <h2>Kost Saya</h2>
            <Link to="/owner/kost-saya" className="see-all">Lihat Semua Kost <ChevronRight size={14} /></Link>
          </div>
          <div className="kost-grid">
            {loading ? (
              <p>Memuat daftar kos...</p>
            ) : ownerKosts.length === 0 ? (
              <p style={{ color: "#64748b" }}>Belum ada kos terdaftar.</p>
            ) : (
              ownerKosts.slice(0, 4).map((k, idx) => {
                const total = parseInt(k.jumlah_kamar) || 0;
                const terisi = parseInt(k.kamar_terisi) || 0;
                const kosong = Math.max(0, total - terisi);
                return (
                  <KostCard
                    key={k.id || idx}
                    id={k.id}
                    title={k.nama_kos}
                    location={`${k.alamat || ''}, ${k.kota || ''}`}
                    price={parseFloat(k.harga_per_bulan) || 0}
                    roomAvailable={kosong}
                    status={k.status || 'Aktif'}
                    image={k.foto_utama_url || k.foto_utama || defaultKostImg}
                    onDelete={handleDeleteKost}
                    onViewDetail={(id) => setSelectedKosId(id)}
                  />
                );
              })
            )}
          </div>
        </section>

        {/* Modal Detail Booking Owner */}
        {selectedBooking && (
          <ModalDetailBookingOwner 
            booking={selectedBooking} 
            onClose={() => setSelectedBooking(null)} 
          />
        )}

        {/* Modal Detail Kost Owner */}
        {selectedKosId && (
          <ModalDetailKostOwner 
            kosId={selectedKosId} 
            onClose={() => setSelectedKosId(null)} 
          />
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;