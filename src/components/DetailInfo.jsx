import {
  MapPin,
  Star,
  Users
} from "lucide-react";

export default function DetailInfo() {
  return (

    <section className="detail-info">

      <div className="detail-left">

        <div className="title-row">

          <h1>Kost Melati</h1>

          <span className="badge premium">
            Premium
          </span>

          <span className="badge available">
            Tersedia
          </span>

        </div>

        <div className="address">

          <MapPin size={17} />

          <span>
            Jl. Melati No.45,
            Kel. Tamalate,
            Kec. Rappocini,
            Makassar,
            Sulawesi Selatan
          </span>

        </div>

        <div className="rating-row">

          <Star
            size={18}
            fill="#FACC15"
            color="#FACC15"
          />

          <strong>4.8</strong>

          <span>(128 Review)</span>

          <Users size={17} />

          <span>56 Penyewa</span>

        </div>

        <p className="description">

          Kost modern dengan fasilitas lengkap,
          lingkungan nyaman,
          dekat kampus,
          minimarket,
          dan halte.

          Cocok untuk mahasiswa maupun karyawan.

        </p>

      </div>

    </section>

  );
}