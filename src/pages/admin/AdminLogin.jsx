import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, ShieldAlert, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HeroSection from "../../components/HeroSection";
import "../../styles/login.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await login(email, password);
      const userRole = res.data?.user?.role;

      if (userRole !== "admin") {
        await logout();
        setError("Akses Ditolak: Akun Anda bukan akun Super Admin.");
        return;
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Gagal masuk. Periksa email dan password Anda.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="login-container">
        {/* Sisi kiri: sama persis dengan login biasa */}
        <HeroSection isAdminLogin={false} />

        {/* Sisi kanan: form khusus admin */}
        <form className="form" onSubmit={handleSubmit}>
          {/* Badge admin */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "6px 12px", borderRadius: "8px", color: "#1d4ed8", fontSize: "13px", fontWeight: "700", marginBottom: "12px" }}>
            <ShieldCheck size={18} color="#2563eb" />
            <span>Administrator Portal</span>
          </div>

          <h2>Login Control Panel 🛡️</h2>
          <p>Masukkan kredensial Super Admin untuk mengelola seluruh data platform.</p>

          {/* Error */}
          {error && (
            <div style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem", backgroundColor: "#fee2e2", padding: "0.75rem 1rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #fca5a5" }}>
              <ShieldAlert size={20} color="#ef4444" style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Email */}
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Mail size={14} color="#64748b" /> Email
          </label>
          <input
            id="admin-email"
            type="email"
            placeholder="admin@kostin.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Lock size={14} color="#64748b" /> Password
          </label>
          <div className="password">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>
            Lupa password?
          </a>

          <button
            type="submit"
            id="admin-login-submit"
            disabled={submitting}
            style={{ backgroundColor: "#1e40af", fontWeight: "700" }}
          >
            {submitting ? "Memproses..." : "Masuk ke Control Panel 🚀"}
          </button>

          {/* Keterangan area terbatas (pengganti role-box) */}
          <div style={{ marginTop: "24px", padding: "12px 14px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", lineHeight: "1.5", textAlign: "center" }}>
            ⚠️ <strong>Area Terbatas:</strong> Halaman ini khusus diproteksi untuk Super Admin Kostin. Seluruh aktivitas login diawasi oleh sistem keamanan.
          </div>
        </form>
      </div>
    </div>
  );
}
