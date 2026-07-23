import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import api from "../../api/api";
import "../../styles/admin/admin-dashboard.css";
import { 
  Users, 
  Home, 
  Clock, 
  CalendarCheck, 
  CheckCircle2, 
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/avatar.jpg";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pendingKos, setPendingKos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        const [dashRes, kosRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/admin/kos')
        ]);

        if (dashRes.data) {
          setStats(dashRes.data);
        }

        if (kosRes.data && Array.isArray(kosRes.data)) {
          const pendingList = kosRes.data.filter((item) => item.status === 'pending');
          setPendingKos(pendingList.slice(0, 5));
        }
      } catch (err) {
        console.error("Gagal mengambil data dashboard admin:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const totalUser = stats?.total_users ?? 0;
  const totalKos = stats?.total_kos ?? 0;
  const totalKosPending = stats?.total_kos_pending ?? 0;
  const totalTransaksi = stats?.total_booking_sukses ?? 0;

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main-content">
        <HeaderAdmin 
          title="Dashboard Ringkasan Admin" 
          subtitle="Kelola seluruh statistik, verifikasi pemilik, dan pengguna platform Kostin." 
        />

        {/* 1. Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon-box">
              <Users size={24} color="#0066ff" />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total User</span>
              <span className="metric-value">{loading ? "..." : totalUser}</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <Home size={24} color="#10b981" />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Kos</span>
              <span className="metric-value">{loading ? "..." : totalKos}</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <Clock size={24} color="#f59e0b" />
            </div>
            <div className="metric-data">
              <span className="metric-label">Kos Pending</span>
              <span className="metric-value">{loading ? "..." : totalKosPending}</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon-box">
              <CalendarCheck size={24} color="#6366f1" />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Transaksi</span>
              <span className="metric-value">{loading ? "..." : totalTransaksi}</span>
            </div>
          </div>
        </div>

        {/* 2. Dashboard Widgets 2 Columns */}
        <div className="dashboard-grid-2col">
          {/* Kolom Kiri: Ringkasan Sistem */}
          <div className="widget-card">
            <div className="widget-header">
              <h2 className="widget-title">Aktivitas & Status Sistem</h2>
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                  <CheckCircle2 size={18} />
                </div>
                <div className="activity-content">
                  <h3 className="activity-title">Layanan Backend API (v1)</h3>
                  <p className="activity-desc">Terhubung dan berjalan normal.</p>
                </div>
                <span className="activity-time">Aktif</span>
              </div>

              <div className="activity-item">
                <div className="activity-icon" style={{ backgroundColor: "#e0f2fe", color: "#0284c7" }}>
                  <Users size={18} />
                </div>
                <div className="activity-content">
                  <h3 className="activity-title">Pengguna Terdaftar</h3>
                  <p className="activity-desc">{totalUser} pengguna aktif & pemilik kos.</p>
                </div>
                <span className="activity-time">Real-time</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Verifikasi Pemilik Terbaru */}
          <div className="widget-card">
            <div className="widget-header">
              <h2 className="widget-title">Antrean Verifikasi Pemilik</h2>
              <Link to="/admin/verifikasi-pemilik" className="widget-link">Lihat Semua</Link>
            </div>

            <div className="verification-list">
              {loading ? (
                <p style={{ color: "#64748b", padding: "12px 0" }}>Memuat antrean...</p>
              ) : pendingKos.length === 0 ? (
                <p style={{ color: "#64748b", padding: "12px 0" }}>Tidak ada antrean verifikasi kos pending saat ini.</p>
              ) : (
                pendingKos.map((item) => (
                  <div key={item.id} className="verification-item">
                    <div className="verification-user">
                      <img 
                        src={item.pemilik?.foto_profil_url || defaultAvatar} 
                        alt={item.nama_kos} 
                        className="user-avatar" 
                        onError={(e) => { e.target.src = defaultAvatar; }}
                      />
                      <div>
                        <h3 className="user-name">{item.pemilik?.nama || "Pemilik Kost"}</h3>
                        <p className="user-kost">{item.nama_kos}</p>
                      </div>
                    </div>

                    <div className="verification-meta">
                      <span className="status-badge menunggu">Pending</span>
                      <Link to={`/admin/detail-verifikasi-pemilik/${item.id}`} className="btn-detail" style={{ textDecoration: 'none' }}>
                        Detail
                      </Link>
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
                Kelola seluruh platform Kostin, mulai dari verifikasi pemilik, data kos, pengguna, moderasi ulasan, hingga pencairan dana.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}