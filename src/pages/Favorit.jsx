import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import FavoriteHero from "../components/FavoriteHero";
import FavoriteCard from "../components/FavoriteCard";

import favoriteData from "../data/favoriteData";

import "../styles/favorite.css";

export default function Favorite() {
  return (
    <>
      <Navbar />

      <FavoriteHero />

      <section className="favorite-section">

        <div className="favorite-header">

          <h2>
            Kost Favorit Saya
          </h2>

          <p>
            Tersimpan {favoriteData.length} kost favorit
          </p>

        </div>

        <div className="favorite-grid">

          {favoriteData.map((kost) => (

            <FavoriteCard
              key={kost.id}
              kost={kost}
            />

          ))}

        </div>

      </section>

      <Footer />
    </>
  );
}