import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewSection({ reviews = [], kosId, onAddReview }) {
  const [newRating, setNewRating] = useState(5);
  const [newKomentar, setNewKomentar] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 0), 0) / reviews.length).toFixed(1)
    : "4.8";

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const star = Math.round(r.rating || 5);
    if (counts[star] !== undefined) counts[star]++;
  });

  const total = reviews.length || 1;

  return (
    <section className="review-section">
      <h2>Review Penghuni</h2>

      <div className="review-wrapper">
        {/* Rating Summary */}
        <div className="rating-summary">
          <h1>{avgRating} ⭐</h1>
          <p>Berdasarkan {reviews.length} review</p>

          <div className="rating-bars">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = counts[star] || 0;
              const pct = Math.round((count / total) * 100);
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

        {/* Review List */}
        <div className="review-list">
          {reviews.length === 0 ? (
            <p style={{ color: "#64748b" }}>Belum ada ulasan untuk kos ini. Jadilah yang pertama memberikan ulasan!</p>
          ) : (
            reviews.map((rev, index) => {
              const userName = rev.user?.nama || rev.user?.name || "Penghuni Kost";
              const initials = userName.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
              const dateStr = rev.created_at ? new Date(rev.created_at).toLocaleDateString("id-ID") : "Baru saja";
              const starCount = Math.round(rev.rating || 5);

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

                  <p>{rev.komentar || rev.comment || "Fasilitas bersih dan sangat nyaman."}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}