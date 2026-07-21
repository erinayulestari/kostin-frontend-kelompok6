import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import "../../styles/admin/admin-dashboard.css";
import { 
  Users, 
  Store, 
  Home, 
  CalendarCheck, 
  UserPlus, 
  PlusCircle, 
  CheckCircle2, 
  ChevronRight, 
  Shield 
} from "lucide-react";

export default function AdminDashboard() {
  // Data dummy sesuai mockup gambar
  const activities = [
    {
      id: 1,
      title: "Pemilik baru mengajukan verifikasi",
      desc: "Siti Aisyah mengajukan verifikasi untuk Kost Putri Alifia",
      time: "10 menit yang lalu",
      icon: UserPlus,
      iconBg: "#dcfce7",
      iconColor: "#16a34a"
    },
    {
      id: 2,
      title: "Booking baru dibuat",
      desc: "Booking baru di Kost Melati oleh Andi Wijaya",
      time: "25 menit yang lalu",
      icon: CalendarCheck,
      iconBg: "#e0f2fe",
      iconColor: "#0284c7"
    },
    {
      id: 3,
      title: "Kost baru ditambahkan",
      desc: "Kost Green House ditambahkan oleh Andi Wijaya",
      time: "1 jam yang lalu",
      icon: PlusCircle,
      iconBg: "#fef3c7",
      iconColor: "#d97706"
    },
    {
      id: 4,
      title: "Pengguna baru mendaftar",
      desc: "Dewi Lestari mendaftar sebagai pencari kost",
      time: "2 jam yang lalu",
      icon: UserPlus,
      iconBg: "#f3e8ff",
      iconColor: "#9333ea"
    },
    {
      id: 5,
      title: "Pemilik berhasil diverifikasi",
      desc: "Rizky Pratama telah diverifikasi oleh admin",
      time: "3 jam yang lalu",
      icon: CheckCircle2,
      iconBg: "#dcfce7",
      iconColor: "#16a34a"
    },
  ];

  const verifications = [
    {
      id: 1,
      name: "Siti Aisyah",
      kost: "Kost Putri Alifia",
      date: "14 Mei 2024",
      status: "Menunggu",
      statusClass: "menunggu",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
    },
    {
      id: 2,
      name: "Rizky Pratama",
      kost: "Kost Harmoni Residence",
      date: "14 Mei 2024",
      status: "Menunggu",
      statusClass: "menunggu",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100"
    },
    {
      id: 3,
      name: "Dewi Lestari",
      kost: "Kost Melati",
      date: "13 Mei 2024",
      status: "Dalam Proses",
      statusClass: "proses",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
    },
    {
      id: 4,
      name: "Andi Wijaya",
      kost: "Kost Green House",
      date: "13 Mei 2024",
      status: "Menunggu",
      statusClass: "menunggu",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
    },
    {
      id: 5,
      name: "Budi Santoso",
      kost: "Kost Kenanga",
      date: "12 Mei 2024",
      status: "Disetujui",
      statusClass: "disetujui",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
  ];

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main-content">
        <HeaderAdmin 
          title="Dashboard" 
          subtitle="Kelola seluruh data dan aktivitas pada platform Kostin." 
        />

        {/* 1. Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box">
              <Users size={24} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Pengguna</span>
              <span className="metric-value">2.450</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <Store size={24} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Pemilik Kost</span>
              <span className="metric-value">320</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <Home size={24} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Kost</span>
              <span className="metric-value">1.120</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <CalendarCheck size={24} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Booking Hari Ini</span>
              <span className="metric-value">48</span>
            </div>
          </div>
        </div>

        {/* 2. Dashboard Widgets 2 Columns */}
        <div className="dashboard-grid-2col">
          {/* Kolom Kiri: Aktivitas Terbaru */}
          <div className="widget-card">
            <div className="widget-header">
              <h2 className="widget-title">Aktivitas Terbaru</h2>
            </div>

            <div className="activity-list">
              {activities.map((act) => {
                const IconComponent = act.icon;
                return (
                  <div key={act.id} className="activity-item">
                    <div 
                      className="activity-icon" 
                      style={{ backgroundColor: act.iconBg, color: act.iconColor }}
                    >
                      <IconComponent size={18} />
                    </div>
                    <div className="activity-content">
                      <h3 className="activity-title">{act.title}</h3>
                      <p className="activity-desc">{act.desc}</p>
                    </div>
                    <span className="activity-time">{act.time}</span>
                  </div>
                );
              })}
            </div>

            <button type="button" className="btn-all-activities">
              <span>Lihat Semua Aktivitas</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Kolom Kanan: Verifikasi Terbaru */}
          <div className="widget-card">
            <div className="widget-header">
              <h2 className="widget-title">Verifikasi Terbaru</h2>
              <a href="/admin/verifikasi" className="widget-link">Lihat Semua</a>
            </div>

            <div className="verification-list">
              {verifications.map((v) => (
                <div key={v.id} className="verification-item">
                  <div className="verification-user">
                    <img src={v.avatar} alt={v.name} className="user-avatar" />
                    <div>
                      <h3 className="user-name">{v.name}</h3>
                      <p className="user-kost">{v.kost}</p>
                    </div>
                  </div>

                  <div className="verification-meta">
                    <span className="verification-date">{v.date}</span>
                    <span className={`status-badge ${v.statusClass}`}>
                      {v.status}
                    </span>
                    <button type="button" className="btn-detail">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Banner Pusat Kontrol */}
        <div className="control-banner">
          <div className="banner-content">
            <div className="banner-icon-bg">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="banner-title">Pusat Kontrol Sistem Kostin</h3>
              <p className="banner-desc">
                Kelola seluruh platform Kostin, mulai dari verifikasi pemilik, data kost, pengguna, hingga transaksi.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}