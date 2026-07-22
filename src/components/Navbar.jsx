import { useState } from "react";
import { Home, ChevronDown } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import avatar from "../assets/avatar.jpg";
import ProfileDropdown from "./ProfileDropdown";

import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);

  const displayUser = {
    isLogin: isAuthenticated,
    name: user?.nama || user?.email || "User",
    avatar: user?.foto_profil_url || avatar,
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo-home">
        <Home size={25} />
        <span>KostIn</span>
      </Link>

      {/* Menu */}
      <div className="menu">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/carikost" className={({ isActive }) => (isActive ? "active" : "")}>
          Cari Kost
        </NavLink>
        <NavLink to="/favorit" className={({ isActive }) => (isActive ? "active" : "")}>
          Favorit
        </NavLink>
        <NavLink to="/tentang-kami" className={({ isActive }) => (isActive ? "active" : "")}>
          Tentang Kami
        </NavLink>
      </div>

      {/* Right */}
      <div className="nav-btn">
        {!displayUser.isLogin ? (
          <>
            <button onClick={() => navigate("/login")}>Masuk</button>
            <button className="register" onClick={() => navigate("/register")}>
              Daftar
            </button>
          </>
        ) : (
          <div className="profile-wrapper">
            <button
              className="profile-btn"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <img src={displayUser.avatar} alt={displayUser.name} />
              <span>{displayUser.name}</span>
              <ChevronDown
                size={18}
                className={openDropdown ? "rotate" : ""}
              />
            </button>

            {openDropdown && <ProfileDropdown onClose={() => setOpenDropdown(false)} />}
          </div>
        )}
      </div>
    </nav>
  );
}