import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo kostin.png";

export default function AboutCTA() {
  const navigate = useNavigate();

  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-left">
          <span className="cta-tag">Mulai Sekarang</span>

          <h2>
            Temukan Kost Impianmu
            <br />
            Bersama <span>Kostin</span>
          </h2>

          <p>
            Jelajahi ribuan pilihan kost terbaik di berbagai kota di
            Indonesia. Temukan tempat tinggal yang nyaman, aman,
            dan sesuai kebutuhanmu bersama Kostin.
          </p>

          <button className="cta-btn" onClick={() => navigate("/carikost")}>
            Cari Kost
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="cta-right">
          <img src={logo} alt="Logo Kostin" />
        </div>
      </div>
    </section>
  );
}