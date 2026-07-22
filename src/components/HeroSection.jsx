import kost from "../assets/kost.jpg";
import { Home, ShieldCheck } from "lucide-react";

export default function HeroSection({ isAdminLogin = false }) {
  return (
    <div className="hero" style={isAdminLogin ? { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" } : {}}>
      <div className="brand">
        <div className="logo">
          {isAdminLogin ? (
            <ShieldCheck size={26} strokeWidth={2.5} color="#3b82f6" />
          ) : (
            <Home size={26} strokeWidth={2.5} />
          )}

          <span>{isAdminLogin ? "KostIn Admin" : "KostIn"}</span>
        </div>

        {isAdminLogin ? (
          <>
            <div style={{ display: "inline-block", background: "rgba(59, 130, 246, 0.2)", color: "#60a5fa", border: "1px solid rgba(96, 165, 250, 0.3)", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", marginBottom: "16px" }}>
              🛡️ Super Admin Access Portal
            </div>
            <h1 style={{ color: "#ffffff" }}>
              Pusat Kontrol <br />
              <span style={{ color: "#60a5fa" }}>Manajemen Kostin</span>
            </h1>
            <p style={{ color: "#94a3b8" }}>
              Sistem manajemen terpusat untuk verifikasi pemilik, monitoring properti, kelola pengguna, dan pengawasan platform.
            </p>
          </>
        ) : (
          <>
            <h1>
              Cari kost <br />
              jadi <span>lebih mudah</span>
            </h1>
            <p>
              Temukan berbagai pilihan kost terbaik <br />
              di seluruh Indonesia sesuai kebutuhanmu
            </p>
          </>
        )}
      </div>

      <img src={kost} className="hero-image" alt="kost" />
    </div>
  );
}