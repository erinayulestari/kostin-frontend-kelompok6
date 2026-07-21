import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import avatarImg from '../../assets/avatar.jpg';

const Header = ({ title = "Dashboard", subtitle, showProfile = true }) => {
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

      {/* Sisi Kanan: Notifikasi & Profil */}
      {showProfile && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Tombol Lonceng Notifikasi */}
          <button 
            type="button" 
            style={{
              position: 'relative',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <Bell size={20} color="#64748b" />
            {/* Badge Angka Notifikasi */}
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 'bold',
              borderRadius: '999px',
              padding: '2px 6px',
              lineHeight: 1
            }}>
              3
            </span>
          </button>

          {/* Area Profil User */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}>
            <img 
              src={avatarImg} 
              alt="Profile Avatar" 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover'
              }} 
            />
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
              Budi Santoso
            </span>
            <ChevronDown size={16} color="#64748b" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;