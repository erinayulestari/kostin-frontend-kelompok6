import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  LayoutGrid, 
  ShieldCheck, 
  Building2, 
  Users, 
  CalendarCheck, 
  Settings, 
  LogOut 
} from "lucide-react";

export default function SidebarAdmin() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutGrid },
    { name: "Verifikasi Pemilik", path: "/admin/verifikasi", icon: ShieldCheck },
    { name: "Data Kost", path: "/admin/kost", icon: Building2 },
    { name: "Data Pengguna", path: "/admin/pengguna", icon: Users },
    { name: "Booking", path: "/admin/booking", icon: CalendarCheck },
    { name: "Pengaturan", path: "/admin/pengaturan", icon: Settings },
  ];

  return (
    <aside className="sidebar-admin">
      <div>
        {/* Brand Logo */}
        <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <div className="sidebar-logo">
            <Home size={26} color="#0066ff" />
            <span>Kostin</span>
          </div>
        </Link>

        {/* Menu Navigasi Super Admin */}
        <nav className="sidebar-menu">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = location.pathname === menu.path;

            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`admin-menu-item ${isActive ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer: Langsung Tombol Keluar (Profil Dihapus) */}
      <div className="sidebar-admin-footer">
        <button type="button" className="btn-logout">
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}