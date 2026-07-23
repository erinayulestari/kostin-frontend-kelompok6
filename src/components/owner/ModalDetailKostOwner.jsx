import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  BedDouble, 
  DoorOpen, 
  Users, 
  Edit, 
  Wifi, 
  Tv, 
  ShieldCheck, 
  Car, 
  Utensils, 
  Shirt, 
  Camera,
  Building2,
  Tag
} from 'lucide-react';
import defaultKostImg from '../../assets/harmoni.jpeg';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

export default function ModalDetailKostOwner({ kosId, initialData, onClose }) {
  const navigate = useNavigate();
  const [kosData, setKosData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    async function fetchKosDetail() {
      if (!kosId) return;
      setLoading(true);
      try {
        const res = await api.get(`/kos/${kosId}`);
        if (res.data) {
          setKosData(res.data);
        }
      } catch (err) {
        console.error("Gagal memuat detail kos owner:", err);
      } finally {
        setLoading(false);
      }
    }
    if (kosId && (!initialData || !initialData.fotos)) {
      fetchKosDetail();
    }
  }, [kosId, initialData]);

  if (!kosId && !initialData) return null;

  const data = kosData || initialData || {};

  const totalKamar = parseInt(data.jumlah_kamar) || 0;
  const kamarTerisi = parseInt(data.kamar_terisi) || 0;
  const kamarKosong = Math.max(0, totalKamar - kamarTerisi);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
  };

  const mainImage = data.foto_utama_url || data.foto_utama || defaultKostImg;
  const gallery = data.fotos || data.kos_foto || [];

  const facilitiesList = [
    { key: 'wifi', label: 'Wi-Fi Gratis', icon: Wifi },
    { key: 'ac', label: 'Pendingin AC', icon: Tv },
    { key: 'kamar_mandi_dalam', label: 'Kamar Mandi Dalam', icon: DoorOpen },
    { key: 'parkir', label: 'Area Parkir', icon: Car },
    { key: 'dapur', label: 'Dapur Bersama', icon: Utensils },
    { key: 'laundry', label: 'Layanan Laundry', icon: Shirt },
    { key: 'security', label: 'Satpam / Security', icon: ShieldCheck },
    { key: 'cctv', label: 'Pengawasan CCTV 24/7', icon: Camera },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        maxWidth: '640px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        padding: '28px',
        position: 'relative'
      }}>
        {/* Header Modal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#0066ff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              DETAIL PROPERTI KOST (PEMILIK)
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
              {data.nama_kos || 'Properti Kost'}
            </h3>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Memuat detail properti...
          </div>
        ) : (
          <>
            {/* Foto Utama */}
            <div style={{ marginTop: '16px', position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '220px' }}>
              <img 
                src={mainImage} 
                alt={data.nama_kos} 
                onError={(e) => { e.target.src = defaultKostImg; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: (data.status || 'aktif').toLowerCase() === 'aktif' ? '#dcfce7' : '#fee2e2',
                color: (data.status || 'aktif').toLowerCase() === 'aktif' ? '#15803d' : '#b91c1c',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700
              }}>
                {data.status || 'Aktif'}
              </span>
            </div>

            {/* Galeri Foto Tambahan */}
            {gallery.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                {gallery.map((f, i) => (
                  <img 
                    key={i} 
                    src={f.nama_file_url || f.nama_file} 
                    alt={`Galeri ${i}`}
                    style={{ width: '70px', height: '50px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                  />
                ))}
              </div>
            )}

            {/* Informasi Alamat & Harga */}
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 6px 0' }}>
                <MapPin size={16} color="#0066ff" />
                {[data.alamat, data.kecamatan, data.kota].filter(Boolean).join(', ') || 'Lokasi Kos'}
              </p>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0066ff', margin: 0 }}>
                {formatRupiah(data.harga_per_bulan)} <span style={{ fontSize: '13px', fontWeight: 400, color: '#64748b' }}>/ bulan</span>
              </h3>
            </div>

            {/* Grid Status Kamar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginTop: '20px',
              backgroundColor: '#f8fafc',
              padding: '14px',
              borderRadius: '14px',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Total Kamar</span>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>{totalKamar} kamar</h4>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Terisi</span>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#16a34a', margin: '2px 0 0 0' }}>{kamarTerisi} kamar</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Tersedia</span>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#d97706', margin: '2px 0 0 0' }}>{kamarKosong} kamar</h4>
              </div>
            </div>

            {/* Fasilitas */}
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                Fasilitas Properti
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {facilitiesList.map(f => {
                  const hasFacility = Boolean(data[f.key]);
                  const Icon = f.icon;
                  return (
                    <div 
                      key={f.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: hasFacility ? '#0f172a' : '#94a3b8',
                        textDecoration: hasFacility ? 'none' : 'line-through'
                      }}
                    >
                      <Icon size={16} color={hasFacility ? '#0066ff' : '#cbd5e1'} />
                      <span>{f.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/owner/tambah-kost?edit=${data.id || kosId}`);
                }}
                style={{
                  backgroundColor: '#0066ff',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Edit size={16} /> Edit Properti Kos
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Tutup
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
