import { useState } from "react";
import { Eye, EyeOff, UserRound, House, ShieldAlert, Lock, Mail } from "lucide-react";
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
      const userRole = res.data?.user?.role;

      // 1. Validasi khusus jika sedang berada di halaman Login Super Admin
      if (isAdminLogin && userRole !== "admin") {
        await logout();
        setError("Akses Ditolak: Akun Anda bukan akun Super Admin.");
        return;
      }

      // 2. Validasi Ketat (Option 1): Cocokkan role pilihan user dengan role asli di DB
      if (!isAdminLogin && userRole !== role) {
        await logout();
        const expectedRoleName = userRole === "pemilik" ? "Pemilik Kost" : userRole === "admin" ? "Super Admin" : "Pencari Kost";
        setError(`Akses Ditolak: Akun Anda terdaftar sebagai ${expectedRoleName}. Silakan pilih opsi "${expectedRoleName}" untuk masuk.`);
        return;
      }

      // 3. Pengarahan rute jika role sesuai
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
          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>
            Login Admin
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Masukkan email dan password admin Anda.
          </p>
        </div>
      ) : (
        <>
          <h2>Selamat datang kembali! 👋</h2>
          <p>Masuk untuk melanjutkan pencarian kost terbaikmu.</p>
        </>
      )}

      {error && (
        <div style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1.25rem", backgroundColor: "#fee2e2", padding: "0.75rem 1rem", borderRadius: "0.5rem", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #fca5a5" }}>
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

      {!isAdminLogin && (
        <a href="#" className="forgot" onClick={(e) => e.preventDefault()}>
          Lupa password?
        </a>
      )}

      <button
        type="submit"
        className={`btn-submit-form ${isAdminLogin ? "admin-btn" : ""}`}
        disabled={submitting}
      >
        {submitting ? "Memproses..." : "Masuk"}
      </button>

      {isAdminLogin ? (
        <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "24px", margin: "24px 0 0 0" }}>
          🛡️ Hak Akses Khusus Super Admin Kostin
        </p>
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