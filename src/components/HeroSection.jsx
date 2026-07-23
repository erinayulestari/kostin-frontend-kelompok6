import React from "react";
import heroBg from "../assets/hero.jpg";
import { Home, ShieldCheck } from "lucide-react";

export default function HeroSection({ isAdminLogin = false }) {
  return (
    <div
      className={`hero ${isAdminLogin ? 'admin-hero' : ''}`}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay" />

      <div className="brand">
        <div className="logo">
          {isAdminLogin ? (
            <ShieldCheck size={26} strokeWidth={2.5} color="#60a5fa" />
          ) : (
            <Home size={26} strokeWidth={2.5} color="#0066ff" />
          )}

          <span>{isAdminLogin ? "Kostin Admin" : "Kostin"}</span>
        </div>

        {isAdminLogin ? (
          <>
            <h1>
              Pusat Kontrol <br />
              <span className="blue-text">Super Admin</span>
            </h1>
            <p className="hero-subtitle">
              Kelola seluruh sistem, pengguna, properti, dan transaksi Kostin secara terpusat.
            </p>
          </>
        ) : (
          <>
            <h1>
              Cari kost <br />
              jadi <span className="blue-text">lebih mudah</span>
            </h1>
            <p className="hero-subtitle">
              Temukan berbagai pilihan kost terbaik di seluruh Indonesia sesuai kebutuhanmu.
            </p>
          </>
        )}
      </div>
    </div>
  );
}