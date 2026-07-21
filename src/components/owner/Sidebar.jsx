import React from 'react';
import { 
  Home, 
  Building2, 
  CalendarCheck, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <Home className="sidebar-logo-icon" size={28} />
          <span>Kostin</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <Home size={18} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item">
            <Building2 size={18} />
            <span>Kost Saya</span>
          </a>
          <a href="#" className="nav-item">
            <CalendarCheck size={18} />
            <span>Booking Masuk</span>
          </a>
          <a href="#" className="nav-item">
            <Wallet size={18} />
            <span>Pendapatan</span>
          </a>
          <a href="#" className="nav-item">
            <BarChart3 size={18} />
            <span>Laporan</span>
          </a>
          <a href="#" className="nav-item">
            <Settings size={18} />
            <span>Pengaturan</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="btn-logout">
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;