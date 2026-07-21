import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import avatarImg from '../../assets/avatar.jpg';

const Header = ({ title = "Dashboard", subtitle = "Kelola kost dan pantau aktivitas penyewa.", actionButton }) => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} color="#64748b" />
          <span className="badge">3</span>
        </button>

        <div className="user-profile-small" style={{ cursor: 'pointer' }}>
          <img 
            src={avatarImg} 
            alt="Budi Santoso" 
            className="avatar" 
          />
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Budi Santoso</span>
          <ChevronDown size={16} color="#64748b" />
        </div>

        {actionButton && actionButton}
      </div>
    </header>
  );
};

export default Header;