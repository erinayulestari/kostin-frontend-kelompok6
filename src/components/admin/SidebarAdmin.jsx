import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  ShieldCheck,
  Users,
  MessageSquare,
  DollarSign,
} from "lucide-react";

export default function SidebarAdmin() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "Verifikasi Pemilik",
      path: "/admin/verifikasi-pemilik",
      icon: ShieldCheck,
    },
    {
      name: "Data Pengguna",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Moderasi Ulasan",
      path: "/admin/moderasi-ulasan",
      icon: MessageSquare,
    },
    {
      name: "Pencairan Dana",
      path: "/admin/pencairan-dana",
      icon: DollarSign,
    },
  ];

  return (
    <aside className="sidebar-admin">
      <div>
        {/* Logo */}
        <Link
          to="/admin/dashboard"
          style={{ textDecoration: "none" }}
        >
          <div className="sidebar-logo">
            <Home size={26} color="#0066ff" />
            <span>Kostin</span>
          </div>
        </Link>

        {/* Menu */}
        <nav className="sidebar-menu">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive =
              location.pathname === menu.path ||
              (menu.path === "/admin/users" && location.pathname === "/admin/data-pengguna");

            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`admin-menu-item ${
                  isActive ? "active" : ""
                }`}
              >
                <Icon size={18} />
                <span>{menu.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}