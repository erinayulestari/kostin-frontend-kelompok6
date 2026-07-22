import { useState, useEffect } from "react";
import { Star, Send, ShieldCheck } from "lucide-react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function ReviewSection({ reviews = [], kosId, onAddReview }) {
  const { isAuthenticated } = useAuth();
  const [newRating, setNewRating] = useState(5);
  const [newKomentar, setNewKomentar] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    async function checkEligibility() {
      if (!isAuthenticated || !kosId) {
        setCanReview(false);
        return;
      }
      try {
        const res = await api.get('/bookings');
        const userBookings = res.data || [];
        const eligible = userBookings.some((b) => {
          const bKosId = b.kos_id || b.kos?.id;
          const statusValid = b.status === 'selesai' || b.status === 'aktif';
          return Number(bKosId) === Number(kosId) && statusValid;
        });
        setCanReview(eligible);
      } catch (e) {
        setCanReview(false);
      }
    }
    checkEligibility();
  }, [isAuthenticated, kosId]);

  // Sync if prop updates
  const currentReviews = localReviews.length > 0 ? localReviews : reviews;

  const avgRating = currentReviews.length > 0
    ? (currentReviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 0), 0) / currentReviews.length).toFixed(1)
    : "0.0";

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  currentReviews.forEach(r => {
    const star = Math.round(r.rating || 5);
    if (counts[star] !== undefined) counts[star]++;
  });

  const total = currentReviews.length || 1;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newKomentar.trim()) {
      alert("Harap masukkan isi ulasan.");
      return;
    }
    if (!isAuthenticated) {
      alert("Silakan login terlebih dahulu untuk memberikan ulasan.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post(`/kos/${kosId}/reviews`, {
        rating: newRating,
        isi_ulasan: newKomentar,
      });

      const added = res.data || res;
      setLocalReviews((prev) => [added, ...prev]);
      setNewKomentar("");
      setNewRating(5);
      alert("Ulasan Anda berhasil ditambahkan!");
      if (onAddReview) onAddReview(added);
    } catch (err) {
      console.error("Gagal mengirim ulasan:", err);
      alert(err.message || "Gagal mengirim ulasan. Hanya penyewa yang telah memesan dan menyelesaikan pembayaran di kos ini yang dapat memberikan ulasan.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="review-section">
      <h2>Review Penghuni</h2>

      <div className="review-wrapper">
        {/* Rating Summary */}
        <div className="rating-summary">
          <h1>{avgRating} ⭐</h1>
          <p>Berdasarkan {currentReviews.length} review</p>

          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = counts[star] || 0;
              const pct = currentReviews.length > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={star} className="bar">
                  <span>{star} ★</span>
                  <div className="line">
                    <div style={{ width: `${pct}%` }}></div>
                  </div>
                  <strong>{count}</strong>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review List & Form */}
        <div className="review-right" style={{ display: "flex", flexDirection: "column", gap: "24px", flex: 1 }}>
          {/* Form Tambah Review (Hanya jika penyewa berhak/pernah sewa) */}
          {canReview ? (
            <form onSubmit={handleSubmitReview} style={{ background: "#F8FAFC", padding: "18px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
              <h4 style={{ marginBottom: "10px", fontSize: "15px", fontWeight: "600", color: "#0F172A" }}>Tulis Ulasan Anda</h4>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ fontSize: "14px", color: "#64748B" }}>Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    fill={star <= newRating ? "#FACC15" : "none"}
                    color={star <= newRating ? "#FACC15" : "#CBD5E1"}
                    style={{ cursor: "pointer" }}
                    onClick={() => setNewRating(star)}
                  />
                ))}
              </div>
              <textarea
                rows={3}
                value={newKomentar}
                onChange={(e) => setNewKomentar(e.target.value)}
                placeholder="Tulis ulasan Anda mengenai fasilitas dan pengalaman menginap..."
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px", outline: "none", marginBottom: "10px" }}
              />
              <button
                type="submit"
                disabled={submitting}
                style={{ background: "#2563EB", color: "#FFFFFF", border: "none", padding: "8px 18px", borderRadius: "10px", fontWeight: "600", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Send size={15} />
                {submitting ? "Mengirim..." : "Kirim Ulasan"}
              </button>
            </form>
          ) : (
            <div style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "14px 18px", color: "#475569", fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
              <ShieldCheck size={20} color="#2563EB" />
              <span>Fitur ulasan hanya terbuka untuk penyewa yang telah memesan dan menyelesaikan pembayaran di kos ini.</span>
            </div>
          )}

          {/* List Reviews */}
          <div className="review-list">
            {currentReviews.length === 0 ? (
              <p style={{ color: "#64748b" }}>Belum ada ulasan untuk kos ini. Jadilah yang pertama memberikan ulasan!</p>
            ) : (
              currentReviews.map((rev, index) => {
                const userName = rev.user?.nama || rev.user?.name || "Penghuni Kost";
                const initials = userName.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
                const dateStr = rev.created_at ? new Date(rev.created_at).toLocaleDateString("id-ID") : "Baru saja";
                const starCount = Math.round(rev.rating || 5);
                const reviewText = rev.isi_ulasan || rev.komentar || rev.comment || rev.judul || "Ulasan tanpa teks.";

                return (
                  <div key={rev.id || index} className="review-card">
                    <div className="review-avatar">{initials}</div>
                    <h4>{userName}</h4>
                    <small>{dateStr}</small>

                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < starCount ? "#FACC15" : "none"}
                          color={i < starCount ? "#FACC15" : "#CBD5E1"}
                        />
                      ))}
                    </div>

                    <p>{reviewText}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}