import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  // Jika data belum terlalu banyak (data <= 5 atau totalPages <= 1), jangan munculkan pagination
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
      <button 
        type="button" 
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`page-btn ${currentPage === page ? "active" : ""}`}
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
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}