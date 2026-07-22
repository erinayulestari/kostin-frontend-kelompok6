import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import api from "../../api/api";
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
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        const res = await api.get('/admin/dashboard');
        if (res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data dashboard admin:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const totalPengguna = stats?.total_pengguna ?? 0;
  const totalPemilik = stats?.total_pemilik ?? 0;
  const totalKos = stats?.total_kos ?? 0;
  const bookingHariIni = stats?.booking_hari_ini ?? 0;

  const activities = stats?.aktivitas_terbaru || [
    {
      id: 1,
      title: "Sistem Aktif",
      desc: "Platform Kostin siap digunakan.",
      time: "Baru saja",
      icon: CheckCircle2,
      iconBg: "#dcfce7",
      iconColor: "#16a34a"
    }
  ];

  const verifications = stats?.verifikasi_terbaru || [];

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
              <span className="metric-value">{loading ? "..." : totalPengguna}</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <Store size={24} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Pemilik Kost</span>
              <span className="metric-value">{loading ? "..." : totalPemilik}</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <Home size={24} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Kost</span>
              <span className="metric-value">{loading ? "..." : totalKos}</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <CalendarCheck size={24} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Booking Hari Ini</span>
              <span className="metric-value">{loading ? "..." : bookingHariIni}</span>
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
              {activities.map((act, index) => (
                <div key={act.id || index} className="activity-item">
                  <div 
                    className="activity-icon" 
                    style={{ backgroundColor: act.iconBg || "#e0f2fe", color: act.iconColor || "#0284c7" }}
                  >
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="activity-content">
                    <h3 className="activity-title">{act.title || "Aktivitas Sistem"}</h3>
                    <p className="activity-desc">{act.desc || act.deskripsi || ""}</p>
                  </div>
                  <span className="activity-time">{act.time || "Hari ini"}</span>
                </div>
              ))}
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
              <a href="/admin/verifikasi-pemilik" className="widget-link">Lihat Semua</a>
            </div>

            <div className="verification-list">
              {verifications.length === 0 ? (
                <p style={{ color: "#64748b", padding: "12px 0" }}>Tidak ada antrean verifikasi baru.</p>
              ) : (
                verifications.map((v) => (
                  <div key={v.id} className="verification-item">
                    <div className="verification-user">
                      <img src={v.pemilik?.foto_profil_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"} alt={v.nama_kos} className="user-avatar" />
                      <div>
                        <h3 className="user-name">{v.pemilik?.nama || "Pemilik Kost"}</h3>
                        <p className="user-kost">{v.nama_kos}</p>
                      </div>
                    </div>

                    <div className="verification-meta">
                      <span className="verification-date">{v.created_at ? new Date(v.created_at).toLocaleDateString("id-ID") : "Baru"}</span>
                      <span className={`status-badge ${v.status === 'pending' ? 'menunggu' : 'disetujui'}`}>
                        {v.status}
                      </span>
                      <a href="/admin/verifikasi-pemilik" className="btn-detail" style={{ textDecoration: 'none' }}>
                        Lihat Detail
                      </a>
                    </div>
                  </div>
                ))
              )}
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