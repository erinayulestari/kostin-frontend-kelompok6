import React, { useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import FilterBar from "../../components/admin/FilterBar";
import VerificationCard from "../../components/admin/VerificationCard";
import Pagination from "../../components/admin/Pagination";
import "../../styles/admin/admin-dashboard.css";
import "../../styles/admin/verifikasi-pemilik.css";

export default function VerifikasiPemilik() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortOrder, setSortOrder] = useState("Terbaru");
  const [currentPage, setCurrentPage] = useState(1);

  // Data Dummy
  const verificationData = [
    {
      id: 1,
      owner: {
        name: "Siti Aisyah",
        email: "siti.aisyah@email.com",
        phone: "0813 9876 5432",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
      },
      kost: {
        name: "Kost Putri Alifia",
        type: "Kost Putri",
        rooms: "12 Kamar",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=150"
      },
      location: "Depok",
      date: "15 Juni 2024",
      status: "Menunggu Verifikasi",
      statusKey: "pending"
    },
    {
      id: 2,
      owner: {
        name: "Budi Santoso",
        email: "budi.santoso@email.com",
        phone: "0821 2345 6789",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
      },
      kost: {
        name: "Kost Harmoni",
        type: "Kost Campur",
        rooms: "20 Kamar",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150"
      },
      location: "Bandung",
      date: "10 Juni 2024",
      status: "Disetujui",
      statusKey: "approved"
    },
    {
      id: 3,
      owner: {
        name: "Dewi Lestari",
        email: "dewi.lestari@email.com",
        phone: "0812 3456 7890",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
      },
      kost: {
        name: "Kost Mawar Indah",
        type: "Kost Putri",
        rooms: "15 Kamar",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=150"
      },
      location: "Yogyakarta",
      date: "8 Juni 2024",
      status: "Ditolak",
      statusKey: "rejected"
    },
    {
      id: 4,
      owner: {
        name: "Rahmat Hidayat",
        email: "rahmat.hidayat@email.com",
        phone: "0852 1122 3344",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
      },
      kost: {
        name: "Kost Griya Asri",
        type: "Kost Putra",
        rooms: "18 Kamar",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=150"
      },
      location: "Malang",
      date: "5 Juni 2024",
      status: "Menunggu Verifikasi",
      statusKey: "pending"
    },
    {
      id: 5,
      owner: {
        name: "Anita Putri",
        email: "anita.putri@email.com",
        phone: "0819 8765 4321",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
      },
      kost: {
        name: "Kost Melati",
        type: "Kost Putri",
        rooms: "10 Kamar",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=150"
      },
      location: "Surabaya",
      date: "3 Juni 2024",
      status: "Disetujui",
      statusKey: "approved"
    }
  ];

  const handleDetailClick = (id) => {
    console.log("Navigasi ke detail id:", id);
  };

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main-content">
        <HeaderAdmin 
          title="Verifikasi Pemilik Kost" 
          subtitle="Kelola seluruh pengajuan verifikasi dari pemilik kost." 
        />

        {/* Filter Bar Component */}
        <FilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* Verification Cards List */}
        <div className="verification-card-list">
          {verificationData.map((item) => (
            <VerificationCard 
              key={item.id} 
              data={item} 
              onDetailClick={handleDetailClick}
            />
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination 
          currentPage={currentPage}
          totalPages={4}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}