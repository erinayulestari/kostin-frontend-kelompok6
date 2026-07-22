import { useState } from "react";
import {
  Eye,
  EyeOff,
  UserRound,
  House,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState("pencari");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    if (!agreed) {
      setError("Anda harus menyetujui Syarat & Ketentuan.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await register({
        nama,
        email,
        password,
        role,
        no_hp: noHp,
      });

      const userRole = res.data?.user?.role || role;

      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "pemilik") {
        navigate("/owner/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Gagal melakukan pendaftaran.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-right">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Buat Akun Baru 🚀</h2>
        <p>
          Bergabung sekarang dan temukan kost impianmu
          dengan pengalaman yang lebih mudah.
        </p>

        {error && (
          <div style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem", backgroundColor: "#fee2e2", padding: "0.5rem 0.75rem", borderRadius: "0.375rem" }}>
            {error}
          </div>
        )}

        {/* ROLE */}
        <div className="role-select">
          <div
            className={
              role === "pencari"
                ? "role-option active"
                : "role-option"
            }
            onClick={() => setRole("pencari")}
          >
            <UserRound size={20} />
            <span>Pencari Kost</span>
          </div>

          <div
            className={
              role === "pemilik"
                ? "role-option active"
                : "role-option"
            }
            onClick={() => setRole("pemilik")}
          >
            <House size={20} />
            <span>Pemilik Kost</span>
          </div>
        </div>

        {/* NAMA */}
        <label>Nama Lengkap</label>
        <input
          type="text"
          placeholder="Masukkan nama lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        {/* EMAIL */}
        <label>Email</label>
        <input
          type="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* TELEPON */}
        <label>Nomor Telepon</label>
        <input
          type="text"
          placeholder="08xxxxxxxxxx"
          value={noHp}
          onChange={(e) => setNoHp(e.target.value)}
        />

        {/* PASSWORD */}
        <label>Password</label>
        <div className="password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password (min. 8 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* KONFIRMASI */}
        <label style={{ marginTop: "18px" }}>Konfirmasi Password</label>
        <div className="password-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Masukkan ulang password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* CHECKBOX */}
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms">
            Saya menyetujui <a href="#">Syarat & Ketentuan</a> dan{" "}
            <a href="#">Kebijakan Privasi</a>
          </label>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="register-submit"
          disabled={submitting}
        >
          {submitting ? "Memproses..." : "Daftar"}
        </button>

        {/* FOOTER */}
        <div className="register-footer">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </div>
      </form>
    </div>
  );
}