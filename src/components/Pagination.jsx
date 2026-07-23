import React from "react";

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  // Sembunyikan pagination jika data <= limit (totalPages <= 1)
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "30px" }}>
      <button
        type="button"
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`page-number ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange && onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1 }}
      >
        →
      </button>
    </div>
  );
}