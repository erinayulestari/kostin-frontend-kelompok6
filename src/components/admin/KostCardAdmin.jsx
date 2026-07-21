import React from "react";

export default function KostCardAdmin({ kost, onToggleStatus }) {
  const isAktif = kost.status === "Aktif";

  return (
    <div className="kost-card-admin">
      <div className="kost-card-image-box">
        <img src={kost.image} alt={kost.namaKost} />
      </div>

      <div className="kost-card-main-info">
        <h3 className="kost-title">{kost.namaKost}</h3>
        <div className="kost-meta">
          <span className="meta-item">
            {/* User Icon SVG */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {kost.pemilik}
          </span>
          <span className="meta-item">
            {/* Pin Icon SVG */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {kost.lokasi}
          </span>
        </div>
      </div>

      <div className="kost-card-price-box">
        <span className="price-label">Harga Mulai</span>
        <span className="price-value">Rp {kost.harga.toLocaleString("id-ID")} / bulan</span>
      </div>

      <div className="kost-card-status-box">
        <span className={`status-pill ${isAktif ? "aktif" : "nonaktif"}`}>
          <span className="status-dot"></span>
          {kost.status}
        </span>
      </div>

      <div className="kost-card-action-box">
        <button
          type="button"
          className={`btn-action-status ${isAktif ? "btn-deactivate" : "btn-activate"}`}
          onClick={() => onToggleStatus(kost.id)}
        >
          {isAktif ? (
            <>
              {/* Power / Off Icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                <line x1="12" y1="2" x2="12" y2="12"/>
              </svg>
              Nonaktifkan
            </>
          ) : (
            <>
              {/* Check Circle Icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Aktifkan
            </>
          )}
        </button>
      </div>
    </div>
  );
}