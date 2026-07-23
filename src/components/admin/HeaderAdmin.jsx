import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import defaultAvatar from "../../assets/avatar.jpg";

export default function HeaderAdmin({ title, subtitle }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    if (window.confirm("Apakah Anda yakin ingin keluar dari halaman Admin?")) {
      await logout();
      navigate("/superadmin/login");
    }
  };

  const adminName = user?.nama || user?.name || "Administrator";
  const adminRole = user?.role ? user.role.toUpperCase() : "ADMIN";
  const avatarUrl = user?.foto_profil_url || defaultAvatar;

  return (
    <header className="admin-header-bar">
      <div className="header-title-area">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        {/* Profile Dropdown Container */}
        <div className="profile-dropdown-wrapper" ref={dropdownRef}>
          <button 
            type="button" 
            className="profile-trigger-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img 
              src={avatarUrl} 
              alt={adminName} 
              className="header-avatar"
              onError={(e) => { e.target.src = defaultAvatar; }}
            />
            <span>{adminName}</span>
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
                <span className="user-name">{adminName}</span>
                <span className="user-role">{adminRole}</span>
              </div>
              <div className="dropdown-divider" />
              <Link to="/admin/profil" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                <User size={16} />
                <span>Profil Saya</span>
              </Link>
              <div className="dropdown-divider" />
              <button type="button" className="dropdown-item logout" onClick={handleLogout}>
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