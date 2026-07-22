import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import StatCard from '../../components/owner/StatCard';
import BookingCard from '../../components/owner/BookingCard';
import KostCard from '../../components/owner/KostCard';
import api from '../../api/api';

import { Home, Calendar, BedDouble, Wallet, ChevronRight } from 'lucide-react';
import '../../styles/owner/dashboard.css';

import avatarImg from '../../assets/avatar.jpg';
import defaultKostImg from '../../assets/harmoni.jpeg';

const OwnerDashboard = () => {
  const [ownerKosts, setOwnerKosts] = useState([]);
  const [ownerBookings, setOwnerBookings] = useState([]);
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
  const bookingAktif = ownerBookings.filter(b => b.status === 'aktif' || b.status === 'active' || b.status === 'pending').length;
  const totalKamar = ownerKosts.reduce((acc, k) => acc + (parseInt(k.jumlah_kamar) || 0), 0);
  const kamarTerisi = ownerKosts.reduce((acc, k) => acc + (parseInt(k.kamar_terisi) || 0), 0);
  const kamarKosong = Math.max(0, totalKamar - kamarTerisi);

  const statsData = [
    { title: 'Total Kost', value: `${totalKost}`, unit: 'Kost', icon: Home, iconBg: '#e6f0ff', iconColor: '#0066ff', linkText: 'Lihat semua kost' },
    { title: 'Booking Aktif', value: `${bookingAktif}`, unit: 'Booking', icon: Calendar, iconBg: '#dcfce7', iconColor: '#16a34a', linkText: 'Lihat semua booking' },
    { title: 'Kamar Kosong', value: `${kamarKosong}`, unit: 'Kamar', icon: BedDouble, iconBg: '#fef3c7', iconColor: '#d97706', linkText: 'Lihat semua kamar' },
    { title: 'Pendapatan Bulan Ini', value: `Rp ${(kamarTerisi * 1200000).toLocaleString('id-ID')}`, unit: '', icon: Wallet, iconBg: '#f3e8ff', iconColor: '#9333ea', linkText: 'Lihat laporan' },
  ];

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
            <a href="/owner/booking" className="see-all">Lihat Semua Booking <ChevronRight size={14} /></a>
          </div>
          <div className="booking-grid">
            {loading ? (
              <p>Memuat data booking...</p>
            ) : ownerBookings.length === 0 ? (
              <p style={{ color: "#64748b" }}>Belum ada booking masuk.</p>
            ) : (
              ownerBookings.slice(0, 4).map((b, idx) => {
                const userObj = b.user || {};
                const kosObj = b.kos || {};
                return (
                  <BookingCard
                    key={b.id || idx}
                    name={userObj.nama || "Penyewa"}
                    kostName={kosObj.nama_kos || "Properti Kost"}
                    avatar={userObj.foto_profil_url || avatarImg}
                    checkIn={b.tanggal_masuk || "-"}
                    duration={`${b.durasi_bulan || 1} Bulan`}
                    status={b.status === 'pending' ? 'pending' : 'active'}
                    statusText={b.status === 'pending' ? 'Menunggu Konfirmasi' : 'Sedang Berjalan'}
                    actionText="Lihat Detail"
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
            <a href="/owner/kost-saya" className="see-all">Lihat Semua Kost <ChevronRight size={14} /></a>
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
                    title={k.nama_kos}
                    location={`${k.alamat || ''}, ${k.kota || ''}`}
                    price={parseFloat(k.harga_per_bulan) || 0}
                    roomAvailable={kosong}
                    status={k.status || 'Aktif'}
                    image={k.foto_utama_url || k.foto_utama || defaultKostImg}
                  />
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OwnerDashboard;