import { useState } from "react";
import {
  Eye,
  EyeOff,
  UserRound,
  House,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [role, setRole] = useState("pencari");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register-right">

      <div className="register-form">

        <h2>Buat Akun Baru 🚀</h2>

        <p>
          Bergabung sekarang dan temukan kost impianmu
          dengan pengalaman yang lebih mudah.
        </p>

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
        />

        {/* EMAIL */}

        <label>Email</label>

        <input
          type="email"
          placeholder="Masukkan email"
        />

        {/* TELEPON */}

        <label>Nomor Telepon</label>

        <input
          type="text"
          placeholder="08xxxxxxxxxx"
        />

        {/* PASSWORD */}

        <label>Password</label>

        <div className="password-group">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {/* KONFIRMASI */}

        <label
          style={{ marginTop: "18px" }}
        >
          Konfirmasi Password
        </label>

        <div className="password-group">

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Masukkan ulang password"
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        {/* CHECKBOX */}

        <div className="checkbox-group">

          <input type="checkbox" />

          <label>

            Saya menyetujui{" "}

            <a href="#">
              Syarat & Ketentuan
            </a>

            {" "}dan{" "}

            <a href="#">
              Kebijakan Privasi
            </a>

          </label>

        </div>

        {/* BUTTON */}

        <button
          className="register-submit"
          onClick={() => navigate("/")}
        >
          Daftar
        </button>

        {/* FOOTER */}

        <div className="register-footer">

          Sudah punya akun?

          <Link to="/login">
            Masuk
          </Link>

        </div>

      </div>

    </div>
  );
}