import { ArrowRight } from "lucide-react";
import logo from "../assets/logo kostin.png";

export default function AboutHero() {
  return (
    <section className="about-hero">

      <div className="about-hero-content">

        <div className="about-hero-text">

          <span className="about-hero-tag">
            Tentang Kami
          </span>

          <h1>
            Tentang
            <br />
            <span>Kostin</span>
          </h1>

          <p>
            Kostin hadir untuk membantu mahasiswa,
            pekerja, dan masyarakat menemukan
            tempat tinggal yang nyaman,
            aman, dan terpercaya di seluruh Indonesia.
          </p>

          <button className="about-hero-btn">
            Cari Kost
            <ArrowRight size={18} />
          </button>

        </div>

        <div className="about-hero-image">

          <img
            src={logo}
            alt="Logo Kostin"
          />

        </div>

      </div>

    </section>
  );
}