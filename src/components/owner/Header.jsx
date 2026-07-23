import React, { useState } from 'react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import avatarImg from '../../assets/avatar.jpg';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/navbar.css';

const Header = ({ title = "Dashboard", subtitle, showProfile = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  const userName = user?.nama || user?.email || "Pemilik Kost";
  const userAvatar = user?.foto_profil_url || avatarImg;

  const handleLogout = async () => {
    setOpenDropdown(false);
    await logout();
    navigate('/login');
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: '20px',
      marginBottom: '24px',
      borderBottom: '1px solid #f1f5f9'
    }}>
      {/* Sisi Kiri: Judul & Subtitle */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Sisi Kanan: Profil Dropdown (Sesuai Tampilan Halaman Pencari) */}
      {showProfile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="profile-wrapper">
            <button
              className="profile-btn"
              onClick={() => setOpenDropdown(!openDropdown)}
              type="button"
            >
              <img 
                src={userAvatar} 
                alt={userName} 
                onError={(e) => { e.target.src = avatarImg; }}
              />
              <span>{userName}</span>
              <ChevronDown
                size={18}
                className={openDropdown ? "rotate" : ""}
              />
            </button>

            {openDropdown && (
              <div className="profile-dropdown">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setOpenDropdown(false);
                    navigate('/owner/pengaturan');
                  }}
                >
                  <User size={18} />
                  <span>Pengaturan Profil</span>
                </button>

                <div className="dropdown-divider"></div>

                <button
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;