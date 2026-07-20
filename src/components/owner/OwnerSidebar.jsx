import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Wallet,
  BarChart3,
  Settings,
  Plus,
  LogOut,
  House,
} from "lucide-react";

import avatar from "../../assets/avatar.jpg";

export default function OwnerSidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <House size={28} />

        <h2>Kostin</h2>

      </div>

      {/* Menu */}

      <nav className="sidebar-menu">

        <a href="#" className="active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>

        <a href="#">
          <Building2 size={20} />
          <span>Kost Saya</span>
        </a>

        <a href="#">
          <CalendarCheck size={20} />
          <span>Booking</span>
        </a>

        <a href="#">
          <Wallet size={20} />
          <span>Pendapatan</span>
        </a>

        <a href="#">
          <BarChart3 size={20} />
          <span>Laporan</span>
        </a>

        <a href="#">
          <Settings size={20} />
          <span>Pengaturan</span>
        </a>

      </nav>

      {/* Button */}

      <button className="sidebar-add">

        <Plus size={18} />

        Tambah Kost

      </button>

      <div className="sidebar-spacer"></div>

      {/* Profile */}

      <div className="sidebar-profile">

        <img
          src={avatar}
          alt="Owner"
        />

        <div>

          <h4>Budi Santoso</h4>

          <p>Pemilik Kost</p>

        </div>

      </div>

      {/* Logout */}

      <button className="sidebar-logout">

        <LogOut size={18} />

        Keluar

      </button>

    </aside>
  );
}