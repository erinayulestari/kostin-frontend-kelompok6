import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import FilterBar from "../../components/admin/FilterBar";
import VerificationCard from "../../components/admin/VerificationCard";
import Pagination from "../../components/admin/Pagination";
import api from "../../api/api";
import "../../styles/admin/admin-dashboard.css";
import "../../styles/admin/verifikasi-pemilik.css";

export default function VerifikasiPemilik() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortOrder, setSortOrder] = useState("Terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const [kosList, setKosList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminKos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/kos');
      if (res.data) {
        setKosList(res.data);
      }
    } catch (err) {
      console.error("Gagal memuat daftar kos admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminKos();
  }, []);

  const handleUpdateStatus = async (kosId, newStatus) => {
    try {
      await api.put(`/admin/kos/${kosId}/status`, { status: newStatus });
      alert(`Status kos berhasil diperbarui menjadi ${newStatus}.`);
      fetchAdminKos();
    } catch (err) {
      console.error("Gagal mengubah status kos:", err);
      alert(err.message || "Gagal mengubah status kos.");
    }
  };

  const filteredKos = kosList.filter((item) => {
    const name = item.nama_kos || "";
    const ownerName = item.pemilik?.nama || "";
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const status = item.status || "pending";
    const matchesStatus = statusFilter === "Semua" || status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main-content">
        <HeaderAdmin 
          title="Verifikasi Pemilik Kost" 
          subtitle="Kelola seluruh pengajuan verifikasi dari pemilik kost." 
        />

        <FilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat daftar verifikasi...</p>
        ) : filteredKos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", backgroundColor: "#fff", borderRadius: "12px" }}>
            <h3>Tidak ada data verifikasi kos yang ditemukan</h3>
          </div>
        ) : (
          <div className="verification-card-list">
            {filteredKos.map((item) => {
              const formattedData = {
                id: item.id,
                owner: {
                  name: item.pemilik?.nama || "Pemilik Kost",
                  email: item.pemilik?.email || "-",
                  phone: item.pemilik?.no_hp || "-",
                  avatar: item.pemilik?.foto_profil_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
                },
                kost: {
                  name: item.nama_kos,
                  type: item.tipe ? item.tipe.toUpperCase() : "KOST",
                  rooms: `${item.jumlah_kamar || 0} Kamar`,
                  image: item.foto_utama_url || item.foto_utama
                },
                location: item.kota || item.alamat || "Indonesia",
                date: item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID") : "Baru saja",
                status: item.status === "aktif" ? "Disetujui" : item.status === "pending" ? "Menunggu Verifikasi" : "Ditolak",
                statusKey: item.status === "aktif" ? "approved" : item.status === "pending" ? "pending" : "rejected"
              };

              return (
                <VerificationCard 
                  key={item.id} 
                  data={formattedData}
                  onUpdateStatus={handleUpdateStatus}
                />
              );
            })}
          </div>
        )}

        <Pagination 
          currentPage={currentPage}
          totalPages={1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}