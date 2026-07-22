import { MapPin, Star, Users } from "lucide-react";

export default function DetailInfo({ kos }) {
  if (!kos) return null;

  const nama = kos.nama_kos || "Kost";
  const tipe = kos.tipe ? kos.tipe.toUpperCase() : "PUTRI";
  const isAvailable = kos.jumlah_kamar > kos.kamar_terisi;
  const sisaKamar = kos.sisa_kamar !== undefined
    ? kos.sisa_kamar
    : (kos.kamar_tersedia !== undefined
        ? kos.kamar_tersedia
        : (kos.jumlah_kamar !== undefined && kos.kamar_terisi !== undefined
            ? Math.max(0, kos.jumlah_kamar - kos.kamar_terisi)
            : 3));
  const alamat = [kos.alamat, kos.kecamatan, kos.kota, kos.provinsi]
    .filter(Boolean)
    .join(", ") || "Lokasi Kost";
  const reviews = Array.isArray(kos.reviews) ? kos.reviews : [];
  const reviewCount = reviews.length;
  
  let ratingVal = 0;
  if (reviews.length > 0) {
    const sum = reviews.reduce((acc, r) => acc + (parseFloat(r.rating) || 0), 0);
    ratingVal = (sum / reviews.length);
  } else if (kos.rating !== undefined && kos.rating !== null && Number(kos.rating) > 0) {
    ratingVal = Number(kos.rating);
  } else if (kos.reviews_avg_rating !== undefined && kos.reviews_avg_rating !== null && Number(kos.reviews_avg_rating) > 0) {
    ratingVal = Number(kos.reviews_avg_rating);
  }

  const ratingText = ratingVal > 0 ? Number(ratingVal).toFixed(1) : "0.0";
  const penyewaCount = kos.kamar_terisi || 0;
  const deskripsi = kos.deskripsi || "Kost nyaman dengan fasilitas lengkap.";

  return (
    <section className="detail-info">
      <div className="detail-left">
        <div className="title-row">
          <h1>{nama}</h1>
          <span className="badge premium">{tipe}</span>
          <span className={`badge ${isAvailable ? "available" : "unavailable"}`}>
            {isAvailable ? `Sisa ${sisaKamar} Kamar` : "Penuh"}
          </span>
        </div>

        <div className="address">
          <MapPin size={17} />
          <span>{alamat}</span>
        </div>

        <div className="rating-row">
          <Star size={18} fill={ratingVal > 0 ? "#FACC15" : "#CBD5E1"} color={ratingVal > 0 ? "#FACC15" : "#CBD5E1"} />
          <strong>{ratingText}</strong>
          <span>({reviewCount} Review)</span>
          <Users size={17} />
          <span>Sisa {sisaKamar} Kamar ({penyewaCount} Terisi)</span>
        </div>

        <p className="description">{deskripsi}</p>
      </div>
    </section>
  );
}