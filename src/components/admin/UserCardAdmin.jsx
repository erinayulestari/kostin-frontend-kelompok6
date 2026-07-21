import React from "react";

export default function UserCardAdmin({ user, onToggleStatus }) {
  const isAktif = user.status === "Aktif";

  return (
    <div className="user-card-admin">
      {/* Avatar / Foto Profil */}
      <div className="user-card-avatar-box">
        <img src={user.avatar} alt={user.nama} />
      </div>

      {/* Detail Pengguna (Nama & Email) */}
      <div className="user-info-box">
        <h3 className="user-name">{user.nama}</h3>
        <span className="user-email">{user.email}</span>
      </div>

      {/* Role Badge */}
      <div className="user-role-box">
        <span className="role-label">Role</span>
        <span className={`role-pill ${user.role.toLowerCase().replace(/\s+/g, '-')}`}>
          {user.role}
        </span>
      </div>

      {/* Status Pill */}
      <div className="user-status-box">
        <span className="status-label">Status</span>
        <span className={`status-pill ${isAktif ? "aktif" : "nonaktif"}`}>
          <span className="status-dot"></span>
          {user.status}
        </span>
      </div>

      {/* Action Button: Toggle Status (Ganti Lihat Detail) */}
      <div className="user-card-action-box">
        <button
          onClick={() => onToggleStatus(user.id)}
          className={`btn-action-status ${isAktif ? "btn-deactivate" : "btn-activate"}`}
        >
          {isAktif ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
              Nonaktifkan
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Aktifkan
            </>
          )}
        </button>
      </div>
    </div>
  );
}