import React, { useState } from "react";
import Sidebar from "../../components/admin/SidebarAdmin";
import "../../styles/admin/pengaturan.css";

export default function Pengaturan() {
  // State untuk Notifikasi Switch
  const [notifVerifikasi, setNotifVerifikasi] = useState(true);
  const [notifPenggunaBaru, setNotifPenggunaBaru] = useState(true);

  // Handlers Dummy
  const handleUbahPassword = () => {
    alert("Fitur ubah password dipanggil.");
  };

  const handleKeluar = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      alert("Proses logout berhasil.");
    }
  };

  const handleHapusAkun = () => {
    if (window.confirm("Tindakan ini tidak dapat dibatalkan. Yakin ingin menghapus akun?")) {
      alert("Akun berhasil dihapus.");
    }
  };

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Container */}
      <div
        className="pengaturan-container"
        style={{ flex: 1, minWidth: 0, marginLeft: "250px" }}
      >
        {/* Header */}
        <div className="page-header-row">
          <h1>Pengaturan</h1>
          <p>Kelola informasi akun dan keamanan administrator.</p>
        </div>

        <div className="settings-content-wrapper">
          {/* 1. Informasi Akun */}
          <div className="settings-card">
            <h2 className="card-section-title">1. Informasi Akun</h2>
            <div className="account-info-grid">
              <div className="avatar-large-box">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
                  alt="Rizky Pratama"
                />
              </div>

              <div className="info-details-list">
                <div className="info-item">
                  <div className="info-label-group">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Nama Admin</span>
                  </div>
                  <div className="info-value text-bold">Rizky Pratama</div>
                </div>

                <div className="info-item">
                  <div className="info-label-group">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>Email</span>
                  </div>
                  <div className="info-value">rizky.pratama@kostin.com</div>
                </div>

                <div className="info-item">
                  <div className="info-label-group">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>Role</span>
                  </div>
                  <div className="info-value">
                    <span className="role-badge">Super Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Keamanan Akun */}
          <div className="settings-card">
            <h2 className="card-section-title">2. Keamanan Akun</h2>
            <div className="security-section">
              <div className="security-left">
                <div className="icon-badge-box blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="security-text-box">
                  <span className="security-title">Password</span>
                  <span className="security-dots">••••••••••••</span>
                  <p className="security-desc">Gunakan password yang kuat untuk menjaga keamanan akun.</p>
                </div>
              </div>

              <button className="btn-outline-primary" onClick={handleUbahPassword}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Ubah Password
              </button>
            </div>
          </div>

          {/* 3. Notifikasi */}
          <div className="settings-card">
            <h2 className="card-section-title">3. Notifikasi</h2>
            <div className="notification-section">
              <div className="icon-badge-box blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>

              <div className="notification-options">
                <div className="notif-row">
                  <span>Notifikasi pengajuan verifikasi pemilik kost</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifVerifikasi}
                      onChange={(e) => setNotifVerifikasi(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notif-row">
                  <span>Notifikasi pengguna baru</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifPenggunaBaru}
                      onChange={(e) => setNotifPenggunaBaru(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Akun */}
          <div className="settings-card">
            <h2 className="card-section-title">4. Akun</h2>
            <div className="account-actions-section">
              <div className="icon-badge-box red-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              <div className="action-buttons-group">
                <button className="btn-outline-dark" onClick={handleKeluar}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Keluar
                </button>

                <button className="btn-outline-danger" onClick={handleHapusAkun}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Hapus Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}