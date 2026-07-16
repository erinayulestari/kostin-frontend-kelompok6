import { useState } from "react";
import { Home, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import avatar from "../assets/avatar.jpg";
import ProfileDropdown from "./ProfileDropdown";

import "../styles/navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);

  // ===========================
  // Dummy User
  // Nanti diganti backend
  // ===========================

  const user = {
    isLogin: true,
    name: "erintooo",
    avatar: avatar,
  };

  return (
    <nav className="navbar">

      {/* Logo */}

      <Link
        to="/"
        className="logo-home"
      >
        <Home size={25} />

        <span>KostIn</span>

      </Link>

      {/* Menu */}

      <div className="menu">

        <Link to="/">Home</Link>

        <Link to="/carikost">Cari Kost</Link>

        <Link to="/favorit">Favorit</Link>

        <Link to="/tentang-kami">
          Tentang Kami
        </Link>

      </div>

      {/* Right */}

      <div className="nav-btn">

        {!user.isLogin ? (

          <>

            <button
              onClick={() => navigate("/login")}
            >
              Masuk
            </button>

            <button
              className="register"
              onClick={() => navigate("/login")}
            >
              Daftar
            </button>

          </>

        ) : (

          <div className="profile-wrapper">

            <button
              className="profile-btn"
              onClick={() => setOpenDropdown(!openDropdown)}
            >

              <img
                src={user.avatar}
                alt={user.name}
              />

              <span>{user.name}</span>

              <ChevronDown
                size={18}
                className={openDropdown ? "rotate" : ""}
              />

            </button>

            {openDropdown && <ProfileDropdown />}

          </div>

        )}

      </div>

    </nav>
  );
}