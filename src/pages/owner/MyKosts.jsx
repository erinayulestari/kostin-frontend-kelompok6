import React, { useState } from 'react';
import Sidebar from '../../components/owner/Sidebar';
import Header from '../../components/owner/Header';
import KostCardDetailed from '../../components/owner/KostCardDetailed';

import { Plus, Search, Building2, ChevronDown } from 'lucide-react';
import '../../styles/owner/dashboard.css';
import '../../styles/owner/mykosts.css';

// Import Gambar Local
import harmoniImg from '../../assets/harmoni.jpeg';
import melatiImg from '../../assets/melati.jpeg';
import melati1Img from '../../assets/melati1.jpeg';
import melati2Img from '../../assets/melati2.jpeg';

const MyKosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Mengisi array data kost secara default
  const [myKostsData, setMyKostsData] = useState([
    {
      id: 1,
      title: 'Kost Harmoni Residence',
      location: 'Jl. Kaliurang Km 5, Sleman, Yogyakarta',
      price: 1500000,
      totalRooms: 8,
      filledRooms: 6,
      emptyRooms: 2,
      views: 1248,
      favorites: 256,
      activeBookings: 12,
      status: 'Aktif',
      image: harmoniImg
    },
    {
      id: 2,
      title: 'Kost Putri Alifia',
      location: 'Jl. Seturan Raya No. 12, Depok, Sleman',
      price: 1300000,
      totalRooms: 12,
      filledRooms: 12,
      emptyRooms: 0,
      views: 2035,
      favorites: 412,
      activeBookings: 18,
      status: 'Penuh',
      image: melati1Img
    },
    {
      id: 3,
      title: 'Kost Green House',
      location: 'Jl. Gejayan No. 45, Sleman, Yogyakarta',
      price: 1200000,
      totalRooms: 10,
      filledRooms: 6,
      emptyRooms: 4,
      views: 856,
      favorites: 132,
      activeBookings: 5,
      status: 'Nonaktif',
      image: melati2Img
    },
    {
      id: 4,
      title: 'Kost Melati',
      location: 'Jl. Palagan Tentara Pelajar No. 88, Sleman',
      price: 950000,
      totalRooms: 6,
      filledRooms: 4,
      emptyRooms: 2,
      views: 642,
      favorites: 98,
      activeBookings: 6,
      status: 'Aktif',
      image: melatiImg
    },
    {
      id: 5,
      title: 'Kost Kencana',
      location: 'Jl. Magelang Km 7, Sleman, Yogyakarta',
      price: 1100000,
      totalRooms: 7,
      filledRooms: 5,
      emptyRooms: 2,
      views: 911,
      favorites: 143,
      activeBookings: 8,
      status: 'Aktif',
      image: harmoniImg
    },
    {
      id: 6,
      title: 'Kost Cendana',
      location: 'Jl. Affandi No. 20, Sleman, Yogyakarta',
      price: 1400000,
      totalRooms: 9,
      filledRooms: 9,
      emptyRooms: 0,
      views: 1105,
      favorites: 211,
      activeBookings: 14,
      status: 'Penuh',
      image: melati1Img
    }
  ]);

  const filteredKosts = myKostsData.filter(kost => {
    const matchesSearch = kost.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || kost.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const AddKostButton = (
    <button className="btn-primary-add">
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

        {/* Tampilan jika ADA data kost */}
        {myKostsData.length > 0 ? (
          <>
            {/* Bar Filter & Search */}
            <div className="filter-bar">
              <div className="search-input-wrapper">
                <Search size={18} color="#94a3b8" />
                <input 
                  type="text" 
                  placeholder="Cari nama kost..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-actions-group">
                <div className="select-wrapper">
                  <span className="select-label">Status</span>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="Semua">Semua</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Penuh">Penuh</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                  <ChevronDown size={14} className="select-arrow" />
                </div>

                <div className="select-wrapper">
                  <span className="select-label">Urutkan</span>
                  <select defaultValue="Terbaru">
                    <option value="Terbaru">Terbaru</option>
                    <option value="Harga Dp">Harga Terendah</option>
                    <option value="Harga Tg">Harga Tertinggi</option>
                  </select>
                  <ChevronDown size={14} className="select-arrow" />
                </div>
              </div>
            </div>

            {/* List Properti / Hasil Filter */}
            {filteredKosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                Kost dengan kata kunci atau filter tersebut tidak ditemukan.
              </div>
            ) : (
              <div className="my-kosts-grid">
                {filteredKosts.map(kost => (
                  <KostCardDetailed key={kost.id} {...kost} />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Tampilan Empty State jika myKostsData = [] */
          <div className="empty-kost-state">
            <div className="empty-icon-wrapper">
              <Building2 size={48} color="#0066ff" />
            </div>
            <h3>Belum Ada Kost yang Didaftarkan</h3>
            <p>Anda belum memiliki properti kost. Mulai tambahkan properti kost pertama Anda untuk mengelola kamar dan booking.</p>
            <button className="btn-primary-add" style={{ padding: '12px 24px' }}>
              <Plus size={18} />
              <span>Tambah Kost Sekarang</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyKosts;