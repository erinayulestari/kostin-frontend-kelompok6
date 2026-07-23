import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  LayoutDashboard, 
  Building2, 
  CalendarCheck, 
  Wallet, 
  BarChart3, 
  Plus 
} from "lucide-react";

export default function SidebarOwner() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/owner/dashboard", icon: LayoutDashboard },
    { name: "Kost Saya", path: "/owner/kost-saya", icon: Building2 },
    { name: "Booking Masuk", path: "/owner/booking", icon: CalendarCheck },
    { name: "Keuangan", path: "/owner/keuangan", icon: Wallet },
    { name: "Laporan", path: "/owner/laporan", icon: BarChart3 },
  ];

  const isTambahKostActive = location.pathname === "/owner/tambah-kost";

  return (
    <aside className="sidebar-owner">
      <div>
        {/* Brand Logo */}
        <Link to="/owner/dashboard" className="sidebar-logo-link" style={{ textDecoration: "none" }}>
          <div className="sidebar-logo">
            <Home size={26} color="#0066ff" />
            <span>Kostin</span>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="sidebar-menu" aria-label="Navigasi Utama Owner">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = location.pathname === menu.path;
            
            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`menu-item ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={18} />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Tambah Kost */}
        <Link 
          to="/owner/tambah-kost" 
          className={`btn-add-sidebar ${isTambahKostActive ? "active" : ""}`}
          style={{ textDecoration: "none" }}
        >
          <Plus size={18} />
          <span>Tambah Kost</span>
        </Link>
      </div>
    </aside>
  );
}