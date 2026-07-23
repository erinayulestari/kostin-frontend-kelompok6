import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  CalendarCheck, 
  Wallet, 
  BarChart3,
  PlusCircle 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/owner/dashboard', icon: Home },
    { name: 'Kost Saya', path: '/owner/kost-saya', icon: Building2 },
    { name: 'Booking Masuk', path: '/owner/booking', icon: CalendarCheck },
    { name: 'Keuangan', path: '/owner/keuangan', icon: Wallet },
    { name: 'Laporan', path: '/owner/laporan', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar">
      <div>
        <Link to="/owner/dashboard" className="sidebar-logo-link" style={{ textDecoration: 'none' }}>
          <div className="sidebar-logo">
            <Home className="sidebar-logo-icon" size={28} />
            <span>Kostin</span>
          </div>
        </Link>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Tombol Tambah Kos */}
        <div style={{ padding: '16px 16px 0' }}>
          <Link
            to="/owner/tambah-kost"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#0066ff',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)'
            }}
          >
            <PlusCircle size={16} />
            <span>Tambah Kos</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;