import { Bell, Search } from "lucide-react";
import avatar from "../../assets/avatar.jpg";

export default function OwnerHeader() {
  return (
    <header className="owner-header">

      {/* LEFT */}

      <div className="header-left">

        <h1>Dashboard</h1>

        <p>
          Selamat datang kembali 👋 Kelola seluruh kost milikmu di sini.
        </p>

      </div>

      {/* RIGHT */}

      <div className="header-right">

        {/* Search */}

        <div className="header-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Cari..."
          />

        </div>

        {/* Notification */}

        <button className="notification-btn">

          <Bell size={21} />

          <span>3</span>

        </button>

        {/* Profile */}

        <div className="header-profile">

          <img
            src={avatar}
            alt="Owner"
          />

          <div>

            <h4>Budi Santoso</h4>

            <p>Pemilik Kost</p>

          </div>

        </div>

      </div>

    </header>
  );
}