import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";

export default function HeaderAdmin({ title, subtitle }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown saat klik di luar elemen
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="admin-header-bar">
      <div className="header-title-area">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        {/* Notifikasi */}
        <button className="notification-btn" type="button" aria-label="Notifikasi">
          <Bell size={20} />
          <span className="badge-count">3</span>
        </button>

        {/* Profile Dropdown Container */}
        <div className="profile-dropdown-wrapper" ref={dropdownRef}>
          <button 
            type="button" 
            className="profile-trigger-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" 
              alt="Rizky Pratama" 
              className="header-avatar"
            />
            <ChevronDown 
              size={16} 
              color="#64748b" 
              className={`arrow-icon ${isDropdownOpen ? "open" : ""}`}
            />
          </button>

          {/* Menu Dropdown Popup */}
          {isDropdownOpen && (
            <div className="profile-dropdown-menu">
              <div className="dropdown-header-info">
                <span className="user-name">Rizky Pratama</span>
                <span className="user-role">Super Admin</span>
              </div>
              <div className="dropdown-divider" />
              <Link to="/admin/profil" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                <User size={16} />
                <span>Profil Saya</span>
              </Link>
              <Link to="/admin/pengaturan" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                <Settings size={16} />
                <span>Pengaturan</span>
              </Link>
              <div className="dropdown-divider" />
              <button type="button" className="dropdown-item logout" onClick={() => setIsDropdownOpen(false)}>
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}