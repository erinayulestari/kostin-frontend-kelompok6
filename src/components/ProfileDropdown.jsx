import {
  User,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileDropdown({ onClose }) {
  const navigate = useNavigate();
  const { logout, role } = useAuth();

  const handleLogout = async () => {
    if (onClose) onClose();
    await logout();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    if (onClose) onClose();
    navigate(path);
  };

  return (
    <div className="profile-dropdown">
      <button
        className="dropdown-item"
        onClick={() => handleNavigate("/profile")}
      >
        <User size={18} />
        <span>Profil Saya</span>
      </button>

      <button
        className="dropdown-item"
        onClick={() => handleNavigate("/booking")}
      >
        <CalendarDays size={18} />
        <span>Booking Saya</span>
      </button>

      {role === "pemilik" && (
        <button
          className="dropdown-item"
          onClick={() => handleNavigate("/owner/dashboard")}
        >
          <Settings size={18} />
          <span>Dashboard Pemilik</span>
        </button>
      )}

      {role === "admin" && (
        <button
          className="dropdown-item"
          onClick={() => handleNavigate("/admin/dashboard")}
        >
          <Settings size={18} />
          <span>Dashboard Admin</span>
        </button>
      )}

      <div className="dropdown-divider"></div>

      <button
        className="dropdown-item logout"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Keluar</span>
      </button>
    </div>
  );
}