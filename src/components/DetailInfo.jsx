import { MapPin, Star, Users } from "lucide-react";

export default function DetailInfo({ kos }) {
  if (!kos) return null;

  const nama = kos.nama_kos || "Kost";
  const tipe = kos.tipe ? kos.tipe.toUpperCase() : "PUTRI";
  const isAvailable = kos.jumlah_kamar > kos.kamar_terisi;
  const alamat = [kos.alamat, kos.kecamatan, kos.kota, kos.provinsi]
    .filter(Boolean)
    .join(", ") || "Lokasi Kost";
  const rating = kos.rating || kos.reviews_avg_rating || "4.8";
  const reviewCount = kos.reviews ? kos.reviews.length : 128;
  const penyewaCount = kos.kamar_terisi || 0;
  const deskripsi = kos.deskripsi || "Kost nyaman dengan fasilitas lengkap.";

  return (
    <section className="detail-info">
      <div className="detail-left">
        <div className="title-row">
          <h1>{nama}</h1>
          <span className="badge premium">{tipe}</span>
          <span className={`badge ${isAvailable ? "available" : "unavailable"}`}>
            {isAvailable ? "Tersedia" : "Penuh"}
          </span>
        </div>

        <div className="address">
          <MapPin size={17} />
          <span>{alamat}</span>
        </div>

        <div className="rating-row">
          <Star size={18} fill="#FACC15" color="#FACC15" />
          <strong>{rating}</strong>
          <span>({reviewCount} Review)</span>
          <Users size={17} />
          <span>{penyewaCount} Kamar Terisi</span>
        </div>

        <p className="description">{deskripsi}</p>
      </div>
    </section>
  );
}