import {
  User,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {

  const navigate = useNavigate();

  return (
    <div className="profile-dropdown">

      <button
        className="dropdown-item"
        onClick={() => navigate("/profile")}
      >

        <User size={18} />

        <span>Profil Saya</span>

      </button>

      <button
        className="dropdown-item"
        onClick={() => navigate("/booking")}
      >

        <CalendarDays size={18} />

        <span>Booking Saya</span>

      </button>

      <button
        className="dropdown-item"
      >

        <Settings size={18} />

        <span>Pengaturan</span>

      </button>

      <div className="dropdown-divider"></div>

      <button
        className="dropdown-item logout"
      >

        <LogOut size={18} />

        <span>Keluar</span>

      </button>

    </div>
  );
}