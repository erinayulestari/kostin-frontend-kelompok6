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
  CheckCircle2,
  CreditCard,
  Upload,
  AlertCircle,
  FileImage
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
  const [nik, setNik] = useState(user?.nik || '');
  
  const [saving, setSaving] = useState(false);
  const [ktpUploading, setKtpUploading] = useState(false);
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
      setNik(user.nik || '');
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
        nik,
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

  const handleKtpUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setKtpUploading(true);
    setMessage('');
    setError('');

    const data = new FormData();
    data.append('foto_ktp', file);

    try {
      const res = await api.post('/profile/ktp', data);
      const updatedUser = res.data !== undefined ? res.data : res;
      if (updatedUser) {
        updateProfile(updatedUser);
      }
      setMessage('Foto KTP berhasil diunggah!');
    } catch (err) {
      console.error('Gagal mengunggah foto KTP:', err);
      setError(err.message || 'Gagal mengunggah foto KTP.');
    } finally {
      setKtpUploading(false);
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
                <div className="s-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CreditCard size={14} color="#64748b" /> Nomor KTP / NIK
                </div>
                <input 
                  type="text" 
                  value={nik} 
                  onChange={(e) => setNik(e.target.value)} 
                  placeholder="Masukkan 16 digit NIK"
                  maxLength={16}
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

          {/* 2. Dokumen KTP */}
          <SettingsCard
            title="Dokumen Verifikasi KTP"
            subtitle="Upload foto KTP Anda untuk proses verifikasi pemilik kost."
          >
            <div className="s-card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <FileImage size={18} color="#0066ff" />
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Foto KTP</span>
                {user?.foto_ktp_url ? (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '11px', fontWeight: '600', color: '#16a34a',
                    backgroundColor: '#f0fdf4', padding: '3px 10px', borderRadius: '20px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <CheckCircle2 size={12} /> Sudah Diunggah
                  </span>
                ) : (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    fontSize: '11px', fontWeight: '600', color: '#ea580c',
                    backgroundColor: '#fff7ed', padding: '3px 10px', borderRadius: '20px',
                    border: '1px solid #fed7aa'
                  }}>
                    <AlertCircle size={12} /> Belum Diunggah
                  </span>
                )}
              </div>

              {/* Preview KTP */}
              {user?.foto_ktp_url && (
                <div style={{
                  marginBottom: '16px', borderRadius: '12px', overflow: 'hidden',
                  border: '1px solid #e2e8f0', maxWidth: '420px'
                }}>
                  <img
                    src={user.foto_ktp_url}
                    alt="Foto KTP"
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}

              {/* Upload Button */}
              <label style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px', borderRadius: '10px', cursor: ktpUploading ? 'not-allowed' : 'pointer',
                backgroundColor: '#eff6ff', border: '1.5px dashed #93c5fd',
                color: '#2563eb', fontSize: '13px', fontWeight: '600',
                transition: 'all 0.2s ease',
                opacity: ktpUploading ? 0.6 : 1,
              }}>
                <Upload size={16} />
                {ktpUploading ? 'Mengunggah...' : user?.foto_ktp_url ? 'Ganti Foto KTP' : 'Upload Foto KTP'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleKtpUpload}
                  disabled={ktpUploading}
                  style={{ display: 'none' }}
                />
              </label>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>
                Format: JPG, PNG. Maksimal 5MB. Pastikan foto jelas dan tidak buram.
              </p>
            </div>
          </SettingsCard>

          {/* 3. Notifikasi */}
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