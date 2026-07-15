import { Heart } from "lucide-react";

export default function FavoriteHero() {
  return (
    <section className="favorite-hero">

      <div className="favorite-hero-content">

        <div className="favorite-badge">

          <Heart
            size={18}
            fill="#EF4444"
            color="#EF4444"
          />

          <span>Kost Favorit</span>

        </div>

        <h1>
          Temukan kembali kost yang <br />
          <span>kamu sukai.</span>
        </h1>

        <p>
          Semua kost yang telah kamu simpan akan muncul di sini.
          Bandingkan, lihat kembali detailnya, dan pilih kost
          terbaik dengan lebih mudah.
        </p>

      </div>

    </section>
  );
}