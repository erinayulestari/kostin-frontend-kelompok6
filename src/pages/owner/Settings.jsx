import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import SettingsCard from '../../components/owner/SettingsCard';
import ToggleSwitch from '../../components/owner/ToggleSwitch';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';

import { 
  CalendarCheck, 
  Wallet, 
  XCircle, 
  Megaphone, 
  User,
  Save,
  CheckCircle2
} from 'lucide-react';

import '../../styles/owner/dashboard.css';
import '../../styles/owner/settings.css';

const Settings = () => {
  const { user, updateProfile } = useAuth();

  const [nama, setNama] = useState(user?.nama || '');
  const [noHp, setNoHp] = useState(user?.no_hp || '');
  const [namaBank, setNamaBank] = useState(user?.nama_bank || '');
  const [nomorRekening, setNomorRekening] = useState(user?.nomor_rekening || '');
  const [namaPemilikRekening, setNamaPemilikRekening] = useState(user?.nama_pemilik_rekening || '');
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [notifications, setNotifications] = useState({
    bookingBaru: true,
    pembayaranBerhasil: true,
    bookingDibatalkan: false,
    promoInformasi: true,
  });

  useEffect(() => {
    if (user) {
      setNama(user.nama || '');
      setNoHp(user.no_hp || '');
      setNamaBank(user.nama_bank || '');
      setNomorRekening(user.nomor_rekening || '');
      setNamaPemilikRekening(user.nama_pemilik_rekening || '');
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await api.put('/profile', {
        nama,
        no_hp: noHp,
        nama_bank: namaBank,
        nomor_rekening: nomorRekening,
        nama_pemilik_rekening: namaPemilikRekening,
      });

      if (res.success && res.data) {
        updateProfile(res.data);
        setMessage('Profil berhasil diperbarui!');
      } else {
        setMessage('Profil berhasil diperbarui!');
      }
    } catch (err) {
      console.error('Gagal update profile:', err);
      setError(err.message || 'Gagal memperbarui profil');
    } finally {
      setSaving(false);
    }
  };

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
          subtitle="Kelola profil, pencairan dana, dan preferensi akun Anda."
          showProfile={false}
        />

        <div className="settings-wrapper">
          {/* 1. Informasi Profil & Rekening */}
          <SettingsCard 
            title="Informasi Profil & Rekening" 
            subtitle="Kelola nama, kontak, dan informasi rekening pencairan dana sewa."
          >
            <form onSubmit={handleSaveProfile} className="s-card-body">
              {message && (
                <div style={{ color: '#16a34a', backgroundColor: '#dcfce7', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} /> {message}
                </div>
              )}
              {error && (
                <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
                  {error}
                </div>
              )}

              <div className="s-row">
                <div className="s-label">Email</div>
                <div className="s-value" style={{ fontWeight: 600, color: '#334155' }}>{user?.email || 'owner@email.com'}</div>
              </div>

              <div className="s-row">
                <div className="s-label">Nama Lengkap</div>
                <input 
                  type="text" 
                  value={nama} 
                  onChange={(e) => setNama(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div className="s-row">
                <div className="s-label">Nomor Telepon</div>
                <input 
                  type="text" 
                  value={noHp} 
                  onChange={(e) => setNoHp(e.target.value)} 
                  placeholder="08xxxxxxxxxx"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div className="s-row">
                <div className="s-label">Nama Bank</div>
                <input 
                  type="text" 
                  value={namaBank} 
                  onChange={(e) => setNamaBank(e.target.value)} 
                  placeholder="BCA, Mandiri, BRI, dll."
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div className="s-row">
                <div className="s-label">Nomor Rekening</div>
                <input 
                  type="text" 
                  value={nomorRekening} 
                  onChange={(e) => setNomorRekening(e.target.value)} 
                  placeholder="Masukkan nomor rekening"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div className="s-row">
                <div className="s-label">Nama Pemilik Rekening</div>
                <input 
                  type="text" 
                  value={namaPemilikRekening} 
                  onChange={(e) => setNamaPemilikRekening(e.target.value)} 
                  placeholder="Nama sesuai buku tabungan"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div style={{ textAlign: 'right', marginTop: '12px' }}>
                <button type="submit" className="btn-primary-add" style={{ padding: '8px 20px' }} disabled={saving}>
                  <Save size={16} /> {saving ? 'Simpan...' : 'Simpan Profil'}
                </button>
              </div>
            </form>
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
        </div>
      </main>
    </div>
  );
};

export default Settings;