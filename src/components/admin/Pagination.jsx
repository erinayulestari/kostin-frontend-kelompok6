import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage = 1, totalPages = 4, onPageChange }) {
  return (
    <div className="pagination-wrapper">
      <button 
        type="button" 
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
        
      </button>

      {[1, 2, 3, 4].map((page) => (
        <button
          key={page}
          type="button"
          className={`page-btn ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange && onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <span className="pagination-dots">...</span>

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