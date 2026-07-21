import React, { useState } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import SettingsCard from '../../components/owner/SettingsCard';
import ToggleSwitch from '../../components/owner/ToggleSwitch';

import { 
  CalendarCheck, 
  Wallet, 
  XCircle, 
  Megaphone, 
  Sun, 
  ChevronDown 
} from 'lucide-react';

import '../../styles/owner/dashboard.css';
import '../../styles/owner/settings.css';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    bookingBaru: true,
    pembayaranBerhasil: true,
    bookingDibatalkan: false,
    promoInformasi: true,
  });

  const [language, setLanguage] = useState('Indonesia');
  const [theme, setTheme] = useState('Light');

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Header 
          title="Pengaturan" 
          subtitle="Kelola keamanan akun dan preferensi dashboard Anda."
          showProfile={false}
        />

        <div className="settings-wrapper">
          {/* 1. Keamanan Akun */}
          <SettingsCard 
            title="Keamanan Akun" 
            subtitle="Kelola informasi login akun Anda."
          >
            <div className="s-card-body">
              <div className="s-row">
                <div className="s-label">Email</div>
                <div className="s-value">owner@email.com</div>
              </div>

              <div className="s-row align-center">
                <div className="s-label">Password</div>
                <div className="s-value-group">
                  <span className="dots-password">••••••••••••••</span>
                  <p className="s-hint">
                    Gunakan password yang kuat dan ubah secara berkala untuk menjaga keamanan akun.
                  </p>
                </div>
                <button className="btn-outline-blue">
                  Ubah Password
                </button>
              </div>
            </div>
          </SettingsCard>

          {/* 2. Notifikasi */}
          <SettingsCard 
            title="Notifikasi" 
            subtitle="Pilih notifikasi yang ingin Anda terima."
          >
            <div className="s-card-body list-body">
              <div className="notif-item">
                <div className="n-icon-bg blue">
                  <CalendarCheck size={18} color="#0066ff" />
                </div>
                <div className="n-info">
                  <h4>Booking Baru</h4>
                  <p>Terima notifikasi saat ada booking baru.</p>
                </div>
                <ToggleSwitch 
                  checked={notifications.bookingBaru} 
                  onChange={() => handleToggle('bookingBaru')} 
                />
              </div>

              <div className="notif-item">
                <div className="n-icon-bg green">
                  <Wallet size={18} color="#10b981" />
                </div>
                <div className="n-info">
                  <h4>Pembayaran Berhasil</h4>
                  <p>Notifikasi ketika pembayaran berhasil.</p>
                </div>
                <ToggleSwitch 
                  checked={notifications.pembayaranBerhasil} 
                  onChange={() => handleToggle('pembayaranBerhasil')} 
                />
              </div>

              <div className="notif-item">
                <div className="n-icon-bg orange">
                  <XCircle size={18} color="#f59e0b" />
                </div>
                <div className="n-info">
                  <h4>Booking Dibatalkan</h4>
                  <p>Notifikasi jika penyewa membatalkan booking.</p>
                </div>
                <ToggleSwitch 
                  checked={notifications.bookingDibatalkan} 
                  onChange={() => handleToggle('bookingDibatalkan')} 
                />
              </div>

              <div className="notif-item">
                <div className="n-icon-bg purple">
                  <Megaphone size={18} color="#8b5cf6" />
                </div>
                <div className="n-info">
                  <h4>Promo & Informasi Kostin</h4>
                  <p>Terima informasi produk terbaru.</p>
                </div>
                <ToggleSwitch 
                  checked={notifications.promoInformasi} 
                  onChange={() => handleToggle('promoInformasi')} 
                />
              </div>
            </div>
          </SettingsCard>

          {/* 3. Preferensi Dashboard */}
          <SettingsCard title="Preferensi Dashboard">
            <div className="s-card-body">
              <div className="s-row align-center border-bottom">
                <div className="s-label">Bahasa</div>
                <div className="s-select-box">
                  <span className="flag-icon">🇮🇩</span>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="Indonesia">Indonesia</option>
                    <option value="English">English</option>
                  </select>
                  <ChevronDown size={14} className="arrow" />
                </div>
              </div>

              <div className="s-row align-center">
                <div className="s-label">Tema</div>
                <div className="s-value-group">
                  <div className="s-select-box">
                    <Sun size={15} color="#64748b" />
                    <select 
                      value={theme} 
                      onChange={(e) => setTheme(e.target.value)}
                    >
                      <option value="Light">Light</option>
                      <option value="Dark">Dark</option>
                    </select>
                    <ChevronDown size={14} className="arrow" />
                  </div>
                  <p className="s-hint mt-2">
                    Tema akan diterapkan pada seluruh dashboard.
                  </p>
                </div>
              </div>
            </div>
          </SettingsCard>
        </div>
      </main>
    </div>
  );
};

export default Settings;