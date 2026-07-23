import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Pagination from "../../components/admin/Pagination";
import api from "../../api/api";
import { Trash2, Star, User, Home, AlertCircle } from "lucide-react";
import "../../styles/admin/admin-dashboard.css";

export default function ModerasiUlasan() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/reviews");
      if (res.data) {
        setReviews(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data ulasan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) return;

    try {
      await api.delete(`/admin/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      alert("Ulasan berhasil dihapus.");
    } catch (err) {
      console.error("Gagal menghapus ulasan:", err);
      alert(err.message || "Gagal menghapus ulasan.");
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const userName = r.user?.nama || r.user?.name || "";
    const kosName = r.kos?.nama_kos || "";
    const comment = r.isi_ulasan || r.komentar || r.comment || r.judul || "";
    const query = search.toLowerCase();

    return (
      userName.toLowerCase().includes(query) ||
      kosName.toLowerCase().includes(query) ||
      comment.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="admin-layout">
      <SidebarAdmin />

      <main className="admin-main-content">
        <HeaderAdmin
          title="Moderasi Ulasan"
          subtitle="Tinjau dan hapus ulasan tidak pantas atau spam dari pengguna."
        />

        {/* Search & Filter */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Cari ulasan, pengulas, atau nama kos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "14px",
            }}
          />
        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat ulasan...</p>
        ) : filteredReviews.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              color: "#64748b",
            }}
          >
            <AlertCircle size={40} style={{ marginBottom: "12px", color: "#94a3b8" }} />
            <h3>Tidak ada ulasan ditemukan</h3>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {currentReviews.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: "600",
                        color: "#1e293b",
                        fontSize: "15px",
                      }}
                    >
                      <User size={16} color="#0066ff" />
                      <span>{item.user?.nama || item.user?.name || "Pengguna"}</span>
                    </div>

                    <span style={{ color: "#94a3b8", fontSize: "13px" }}>•</span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "#64748b",
                        fontSize: "13px",
                      }}
                    >
                      <Home size={14} />
                      <span>{item.kos?.nama_kos || "Kost"}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginBottom: "10px",
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < (item.rating || 5) ? "#f59e0b" : "none"}
                        color={i < (item.rating || 5) ? "#f59e0b" : "#cbd5e1"}
                      />
                    ))}
                    <span
                      style={{
                        marginLeft: "6px",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#475569",
                      }}
                    >
                      {item.rating || 5}.0
                    </span>
                  </div>

                  {/* Judul & Isi Ulasan */}
                  {item.judul && (
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "600" }}>
                      {item.judul}
                    </h4>
                  )}
                  <p style={{ color: "#334155", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
                    "{item.isi_ulasan || item.komentar || item.comment || "Tidak ada teks ulasan."}"
                  </p>

                  <span
                    style={{
                      display: "block",
                      marginTop: "8px",
                      fontSize: "12px",
                      color: "#94a3b8",
                    }}
                  >
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Baru saja"}
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDeleteReview(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#fef2f2",
                    color: "#ef4444",
                    border: "1px solid #fca5a5",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <Trash2 size={15} />
                  Hapus Ulasan
                </button>
              </div>
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
