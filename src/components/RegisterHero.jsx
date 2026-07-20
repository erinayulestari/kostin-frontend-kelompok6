import { Home, ShieldCheck } from "lucide-react";
import heroImage from "../assets/hero.jpg";

export default function RegisterHero() {
  return (
    <div className="register-left">

      <img
        src={heroImage}
        alt="Hero"
      />

      <div className="register-overlay"></div>

      <div className="register-content">

        <div className="logo">
          <Home size={28} />
          <span>Kostin</span>
        </div>

        <h1 className="hero-title">
          Bergabung dengan
          <br />
          <span>Kostin</span>
        </h1>

        <p className="hero-desc">
          Temukan ribuan pilihan kost terbaik
          <br />
          di seluruh Indonesia dengan mudah,
          <br />
          cepat, dan aman.
        </p>

        <div className="security-card">

          <div className="security-icon">
            <ShieldCheck size={26} />
          </div>

          <div>

            <h4>Aman & Terpercaya</h4>

            <p>
              Data akunmu terlindungi dan proses
              pendaftaran hanya membutuhkan
              beberapa langkah.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}