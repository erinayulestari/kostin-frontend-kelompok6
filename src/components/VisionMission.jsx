import { Eye, Target } from "lucide-react";

export default function VisionMission() {
  return (
    <section className="vision">

      <div className="vision-title">

        <span className="vision-tag">
          Visi & Misi
        </span>

        <h2>
          Komitmen <span>Kami</span>
        </h2>

        <p>
          Kami ingin menghadirkan pengalaman terbaik dalam mencari kost
          melalui teknologi yang sederhana, modern, dan terpercaya.
        </p>

      </div>

      <div className="vision-wrapper">

        {/* VISI */}

        <div className="vision-box">

          <div className="vision-icon">

            <Eye size={30} />

          </div>

          <h3>Visi</h3>

          <p>
            Menjadi platform pencarian kost terbaik di Indonesia yang
            memudahkan setiap orang menemukan tempat tinggal yang nyaman,
            aman, dan terpercaya.
          </p>

        </div>

        {/* MISI */}

        <div className="vision-box">

          <div className="vision-icon">

            <Target size={30} />

          </div>

          <h3>Misi</h3>

          <ul>

            <li>Menyediakan informasi kost yang lengkap.</li>

            <li>Mempermudah proses pencarian kost.</li>

            <li>Menghubungkan pencari dan pemilik kost.</li>

            <li>Memberikan pengalaman pengguna terbaik.</li>

          </ul>

        </div>

      </div>

    </section>
  );
}