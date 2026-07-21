import React from 'react';

import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import StatCard from '../../components/owner/StatCard';
import BookingCard from '../../components/owner/BookingCard';
import KostCard from '../../components/owner/KostCard';

import { Home, Calendar, BedDouble, Wallet, ChevronRight } from 'lucide-react';
import '../../styles/owner/dashboard.css';

// Import aset gambar dari src/assets/
import avatarImg from '../../assets/avatar.jpg';
import harmoniImg from '../../assets/harmoni.jpeg';
import melatiImg from '../../assets/melati.jpeg';
import melati1Img from '../../assets/melati1.jpeg';
import melati2Img from '../../assets/melati2.jpeg';

const OwnerDashboard = () => {
  const statsData = [
    { title: 'Total Kost', value: '5', unit: 'Kost', icon: Home, iconBg: '#e6f0ff', iconColor: '#0066ff', linkText: 'Lihat semua kost' },
    { title: 'Booking Aktif', value: '12', unit: 'Booking', icon: Calendar, iconBg: '#dcfce7', iconColor: '#16a34a', linkText: 'Lihat semua booking' },
    { title: 'Kamar Kosong', value: '8', unit: 'Kamar', icon: BedDouble, iconBg: '#fef3c7', iconColor: '#d97706', linkText: 'Lihat semua kamar' },
    { title: 'Pendapatan Bulan Ini', value: 'Rp18.500.000', unit: '', icon: Wallet, iconBg: '#f3e8ff', iconColor: '#9333ea', linkText: 'Lihat laporan' },
  ];

  const bookingsData = [
    {
      name: 'Rizky Pratama',
      kostName: 'Kost Harmoni Residence',
      avatar: avatarImg,
      checkIn: '20 Mei 2024',
      duration: '6 Bulan',
      status: 'active',
      statusText: 'Sedang Berjalan',
      actionText: 'Lihat Detail'
    },
    {
      name: 'Siti Aisyah',
      kostName: 'Kost Putri Alifia',
      avatar: avatarImg,
      checkIn: '25 Mei 2024',
      duration: '3 Bulan',
      status: 'pending',
      statusText: 'Menunggu Konfirmasi',
      actionText: 'Lihat Detail'
    },
    {
      name: 'Andi Wijaya',
      kostName: 'Kost Green House',
      avatar: avatarImg,
      checkIn: '01 Juni 2024',
      duration: '12 Bulan',
      status: 'active',
      statusText: 'Dikonfirmasi',
      actionText: 'Lihat Detail'
    },
    {
      name: 'Nadia Putri',
      kostName: 'Kost Melati',
      avatar: avatarImg,
      checkIn: '05 Juni 2024',
      duration: '6 Bulan',
      status: 'completed',
      statusText: 'Selesai',
      actionText: 'Lihat Detail'
    },
  ];

  const kostsData = [
    {
      title: 'Kost Harmoni Residence',
      location: 'Jl. Kaliurang Km 5, Sleman, Yogyakarta',
      price: 1500000,
      roomAvailable: 3,
      status: 'Aktif',
      image: harmoniImg
    },
    {
      title: 'Kost Putri Alifia',
      location: 'Jl. Seturan Raya No. 12, Depok, Sleman',
      price: 1300000,
      roomAvailable: 0,
      status: 'Aktif',
      image: melati1Img
    },
    {
      title: 'Kost Green House',
      location: 'Jl. Gejayan No. 45, Sleman, Yogyakarta',
      price: 1200000,
      roomAvailable: 0,
      status: 'Penuh',
      image: melati2Img
    },
    {
      title: 'Kost Melati',
      location: 'Jl. Palagan Tentara Pelajar No...',
      price: 950000,
      roomAvailable: 2,
      status: 'Nonaktif',
      showDropdownMock: true,
      image: melatiImg
    },
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
            {bookingsData.map((booking, idx) => (
              <BookingCard key={idx} {...booking} />
            ))}
          </div>
        </section>

        {/* Section Kost Saya */}
        <section>
          <div className="section-header">
            <h2>Kost Saya</h2>
            <a href="/owner/kost-saya" className="see-all">Lihat Semua Kost <ChevronRight size={14} /></a>
          </div>
          <div className="kost-grid">
            {kostsData.map((kost, idx) => (
              <KostCard key={idx} {...kost} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default OwnerDashboard;