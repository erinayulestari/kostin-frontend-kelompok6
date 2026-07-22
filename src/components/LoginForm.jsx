import { useState } from "react";
import { Eye, EyeOff, UserRound, House, ShieldAlert, ShieldCheck, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm({ isAdminLogin = false }) {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("pencari");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await login(email, password);
      const userRole = res.data?.user?.role || role;

      if (isAdminLogin && userRole !== "admin") {
        await logout();
        setError("Akses Ditolak: Akun Anda bukan akun Super Admin.");
        return;
      }

      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "pemilik") {
        navigate("/owner/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Gagal masuk. Periksa email dan password Anda.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {isAdminLogin ? (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "6px 12px", borderRadius: "8px", color: "#1d4ed8", fontSize: "13px", fontWeight: "700", marginBottom: "12px" }}>
            <ShieldCheck size={18} color="#2563eb" />
            <span>Administrator Portal</span>
          </div>
          <h2 style={{ fontSize: "24px", color: "#0f172a", margin: "0 0 6px 0" }}>
            Login Control Panel 🛡️
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Masukkan kredensial Super Admin untuk mengelola seluruh data platform.
          </p>
        </div>
      ) : (
        <>
          <h2>Selamat datang kembali! 👋</h2>
          <p>Masuk untuk melanjutkan pencarian kost terbaikmu.</p>
        </>
      )}

      {error && (
        <div style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem", backgroundColor: "#fee2e2", padding: "0.75rem 1rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #fca5a5" }}>
          <ShieldAlert size={20} color="#ef4444" style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {isAdminLogin && <Mail size={14} color="#64748b" />} Email
      </label>
      <input
        type="email"
        placeholder={isAdminLogin ? "admin@gmail.com" : "Masukkan email kamu"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {isAdminLogin && <Lock size={14} color="#64748b" />} Password
      </label>
      <div className="password">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan password"
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
        disabled={submitting}
        style={isAdminLogin ? { backgroundColor: "#1e40af", fontWeight: "700" } : {}}
      >
        {submitting ? "Memproses..." : isAdminLogin ? "Masuk ke Control Panel 🚀" : "Masuk"}
      </button>

      {isAdminLogin ? (
        <div style={{ marginTop: "24px", padding: "12px 14px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", lineHeight: "1.5", textAlign: "center" }}>
          ⚠️ <strong>Area Terbatas:</strong> Halaman ini khusus diproteksi untuk Super Admin Kostin. Seluruh aktivitas login diawasi oleh sistem keamanan.
        </div>
      ) : (
        <div className="role-box">
          <div className="role-title">
            <h4>Mau masuk sebagai siapa?</h4>
            <p>Pilih sesuai kebutuhanmu</p>
          </div>
          <div
            onClick={() => setRole("pencari")}
            className={role === "pencari" ? "role-card active" : "role-card"}
          >
            <UserRound size={22} />
            <strong>Pencari Kost</strong>
          </div>
          <div
            onClick={() => setRole("pemilik")}
            className={role === "pemilik" ? "role-card active" : "role-card"}
          >
            <House size={22} />
            <strong>Pemilik Kost</strong>
          </div>
        </div>
      )}
    </form>
  );
}