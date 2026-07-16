import {
  User,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

export default function ProfileDropdown() {
  return (
    <div className="profile-dropdown">

      <button className="dropdown-item">

        <User size={18} />

        <span>Profil Saya</span>

      </button>

      <button className="dropdown-item">

        <CalendarDays size={18} />

        <span>Booking Saya</span>

      </button>

      <button className="dropdown-item">

        <Settings size={18} />

        <span>Pengaturan</span>

      </button>

      <div className="dropdown-divider"></div>

      <button className="dropdown-item logout">

        <LogOut size={18} />

        <span>Keluar</span>

      </button>

    </div>
  );
}