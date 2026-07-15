import { ArrowRight } from "lucide-react";
import logo from "../assets/logo kostin.png";

export default function AboutCTA() {
  return (
    <section className="cta">

      <div className="cta-container">

        <div className="cta-left">

          <span className="cta-tag">
            Mulai Sekarang
          </span>

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

          <button className="cta-btn">
            Cari Kost
            <ArrowRight size={18}/>
          </button>

        </div>

        <div className="cta-right">

          <img
            src={logo}
            alt="Logo Kostin"
          />

        </div>

      </div>

    </section>
  );
}