import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import avatarImg from '../../assets/avatar.jpg';

const Header = ({ 
  title, 
  subtitle, 
  actionButton, 
  showProfile = true // default true, bisa di-set false dari parent
}) => {
  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>

      <div className="header-right">
        {/* Render tombol statistik / aksi custom jika ada */}
        {actionButton && <div className="header-action-slot">{actionButton}</div>}

        {/* Notifikasi & Profile (Hanya tampil jika showProfile = true) */}
        {showProfile && (
          <div className="header-user-profile-group">
            <button className="notification-btn">
              <Bell size={18} color="#64748b" />
              <span className="badge">3</span>
            </button>

            <div className="user-profile">
              <img src={avatarImg} alt="Budi Santoso" className="user-avatar" />
              <span className="user-name">Budi Santoso</span>
              <ChevronDown size={14} color="#64748b" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;