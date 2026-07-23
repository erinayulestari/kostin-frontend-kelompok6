import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import KostCardDetailed from '../../components/owner/KostCardDetailed';
import ModalDetailKostOwner from '../../components/owner/ModalDetailKostOwner';
import CustomStatusSelect from '../../components/owner/CustomStatusSelect';
import api from '../../api/api';

import { Plus, Search, Building2, ChevronDown } from 'lucide-react';
import '../../styles/owner/dashboard.css';
import '../../styles/owner/mykosts.css';

const MyKosts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [myKostsData, setMyKostsData] = useState([]);
  const [selectedKosId, setSelectedKosId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOwnerKosts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/owner/kos');
      if (res.data) {
        setMyKostsData(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil daftar kos pemilik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerKosts();
  }, []);

  const handleDeleteKost = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus properti kos ini?")) return;
    try {
      await api.delete(`/owner/kos/${id}`);
      alert("Properti kos berhasil dihapus.");
      fetchOwnerKosts();
    } catch (err) {
      console.error("Gagal menghapus kos:", err);
      alert(err.message || "Gagal menghapus kos.");
    }
  };

  const filteredKosts = myKostsData.filter(kost => {
    const title = kost.nama_kos || kost.title || "";
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const status = kost.status || "aktif";
    const matchesStatus = statusFilter === 'Semua' || status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const AddKostButton = (
    <button className="btn-primary-add" onClick={() => navigate('/owner/tambah-kost')}>
      <Plus size={18} />
      <span>Tambah Kost</span>
    </button>
  );

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <Header 
          title="Kost Saya" 
          subtitle="Kelola seluruh properti kost yang Anda miliki."
          actionButton={AddKostButton}
        />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            Memuat daftar kos Anda...
          </div>
        ) : myKostsData.length > 0 ? (
          <>
            {/* Bar Filter Status Custom */}
            <div className="filter-bar" style={{ justifyContent: 'flex-end', marginBottom: '24px' }}>
              <CustomStatusSelect
                value={statusFilter}
                onChange={(val) => setStatusFilter(val)}
                options={[
                  { label: 'Semua', value: 'Semua' },
                  { label: 'Aktif', value: 'aktif' },
                  { label: 'Pending', value: 'pending' },
                  { label: 'Penuh', value: 'penuh' },
                ]}
              />
            </div>

            {/* List Properti / Hasil Filter */}
            {filteredKosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                Kost dengan kata kunci atau filter tersebut tidak ditemukan.
              </div>
            ) : (
              <div className="my-kosts-grid">
                {filteredKosts.map(kost => {
                  const total = kost.jumlah_kamar || 0;
                  const terisi = kost.kamar_terisi || 0;
                  const kosong = Math.max(0, total - terisi);
                  return (
                    <KostCardDetailed
                      key={kost.id}
                      id={kost.id}
                      title={kost.nama_kos}
                      location={`${kost.alamat || ''}, ${kost.kota || ''}`}
                      price={parseFloat(kost.harga_per_bulan) || 0}
                      totalRooms={total}
                      filledRooms={terisi}
                      emptyRooms={kosong}
                      status={kost.status}
                      image={kost.foto_utama_url || kost.foto_utama}
                      onDelete={handleDeleteKost}
                      onViewDetail={(id) => setSelectedKosId(id)}
                    />
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* Tampilan Empty State */
          <div className="empty-kost-state">
            <div className="empty-icon-wrapper">
              <Building2 size={48} color="#0066ff" />
            </div>
            <h3>Belum Ada Kost yang Didaftarkan</h3>
            <p>Anda belum memiliki properti kost. Mulai tambahkan properti kost pertama Anda untuk mengelola kamar dan booking.</p>
            <button className="btn-primary-add" style={{ padding: '12px 24px' }} onClick={() => navigate('/owner/tambah-kost')}>
              <Plus size={18} />
              <span>Tambah Kost Sekarang</span>
            </button>
          </div>
        )}

        {/* Modal Detail Kost Owner */}
        {selectedKosId && (
          <ModalDetailKostOwner 
            kosId={selectedKosId} 
            onClose={() => setSelectedKosId(null)} 
          />
        )}
      </main>
    </div>
  );
};

export default MyKosts;