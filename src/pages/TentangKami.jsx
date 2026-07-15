import { useNavigate } from "react-router-dom";
import {
  Info,
  MapPin,
  ShieldCheck,
  Heart,
  Search,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/tentangkami.css";

const FEATURES = [
  {
    icon: Search,
    title: "Pencarian Mudah",
    text: "Filter kost berdasarkan lokasi, harga, dan fasilitas dalam hitungan detik.",
  },
  {
    icon: ShieldCheck,
    title: "Aman & Terpercaya",
    text: "Data kost terverifikasi dan proses booking yang transparan tanpa biaya tersembunyi.",
  },
  {
    icon: Heart,
    title: "Favorit & Simpan",
    text: "Simpan kost impianmu dan bandingkan sebelum mengambil keputusan.",
  },
];

const STATS = [
  { value: "1.200+", label: "Kost Terdaftar" },
  { value: "35", label: "Kota Terjangkau" },
  { value: "98%", label: "Penyewa Puas" },
];

export default function TentangKami() {
  const navigate = useNavigate();

  return (
    <div className="tk-page">
      <Navbar />

      <header className="tk-hero">
        <div className="tk-hero-inner">
          <span className="tk-badge">
            <Info size={16} /> Tentang KostIn
          </span>
          <h1>
            Temukan rumah kedua yang
            <span className="tk-accent"> tepat untukmu</span>
          </h1>
          <p>
            KostIn adalah platform pencari dan booking kost yang membantu
            mahasiswa serta pekerja mudah menemukan hunian nyaman, aman, dan
            sesuai budget — tanpa ribet.
          </p>
        </div>
      </header>

      <section className="tk-stats">
        {STATS.map((s) => (
          <div className="tk-stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="tk-features">
        <h2>Kenapa memilih KostIn?</h2>
        <div className="tk-feature-grid">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <article className="tk-card" key={f.title}>
                <span className="tk-card-icon">
                  <Icon size={24} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="tk-mission">
        <div className="tk-mission-text">
          <h2>
            <Users size={20} className="tk-inline-icon" /> Misi kami
          </h2>
          <p>
            Kami percaya setiap orang berhak mendapat hunian yang layak dan
            terjangkau. KostIn hadir untuk menyederhanakan proses mencari kost
            lewat teknologi yang ramah pengguna dan informasi yang jujur.
          </p>
          <ul className="tk-list">
            <li>
              <MapPin size={16} /> Jangkauan luas di puluhan kota besar.
            </li>
            <li>
              <ShieldCheck size={16} /> Verifikasi kost untuk keamanan penyewa.
            </li>
            <li>
              <Heart size={16} /> Antarmuka yang menyenangkan dan mudah.
            </li>
          </ul>
          <button
            className="tk-cta"
            onClick={() => navigate("/carikost")}
          >
            Mulai cari kost
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
