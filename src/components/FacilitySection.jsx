import {
  Wifi,
  Monitor,
  Bath,
  CookingPot,
  CircleParking,
  WashingMachine,
  ShieldCheck,
  Zap,
  Wallet,
  Bed,
  Layers,
  Tag,
  Hash
} from "lucide-react";

export default function FacilitySection({ kos }) {
  if (!kos) return null;

  const facilities = [];
  if (kos.wifi) facilities.push({ label: "WiFi Gratis", icon: <Wifi size={22} /> });
  if (kos.ac) facilities.push({ label: "Pendingin Ruangan (AC)", icon: <Monitor size={22} /> });
  if (kos.kamar_mandi_dalam) facilities.push({ label: "Kamar Mandi Dalam", icon: <Bath size={22} /> });
  if (kos.dapur) facilities.push({ label: "Dapur Bersama", icon: <CookingPot size={22} /> });
  if (kos.parkir) facilities.push({ label: "Area Parkir", icon: <CircleParking size={22} /> });
  if (kos.laundry) facilities.push({ label: "Layanan Laundry", icon: <WashingMachine size={22} /> });
  if (kos.security) facilities.push({ label: "Keamanan / Satpam", icon: <ShieldCheck size={22} /> });
  if (kos.cctv) facilities.push({ label: "Kamera CCTV 24 Jam", icon: <Zap size={22} /> });

  const rawHarga = kos.harga_per_bulan || 0;
  const hargaFormatted = typeof rawHarga === "number"
    ? `Rp${rawHarga.toLocaleString("id-ID")}/bulan`
    : `Rp${rawHarga}/bulan`;

  const sisaKamar = kos.sisa_kamar !== undefined
    ? kos.sisa_kamar
    : (kos.kamar_tersedia !== undefined
        ? kos.kamar_tersedia
        : Math.max(0, (kos.jumlah_kamar || 0) - (kos.kamar_terisi || 0)));

  return (
    <section className="facility-section">
      <h2>Fasilitas Properti</h2>

      <div className="facility-grid">
        {facilities.length > 0 ? (
          facilities.map((item, idx) => (
            <div key={idx} className="facility-card">
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))
        ) : (
          <p style={{ color: "#64748b", gridColumn: "span 4" }}>Belum ada informasi fasilitas tambahan yang diset.</p>
        )}
      </div>

      <h2 className="room-title">Informasi Properti & Kamar</h2>

      <div className="room-grid">
        <div className="room-item">
          <Wallet color="#2563EB" />
          <div>
            <small>Harga Per Bulan</small>
            <strong>{hargaFormatted}</strong>
          </div>
        </div>

        <div className="room-item">
          <Bed color="#2563EB" />
          <div>
            <small>Kapasitas Sisa Kamar</small>
            <strong>{sisaKamar} Kamar Kosong</strong>
          </div>
        </div>

        <div className="room-item">
          <Layers color="#2563EB" />
          <div>
            <small>Total Jumlah Kamar</small>
            <strong>{kos.jumlah_kamar || "-"} Kamar</strong>
          </div>
        </div>

        <div className="room-item">
          <Tag color="#2563EB" />
          <div>
            <small>Tipe Penghuni</small>
            <strong>{kos.tipe ? kos.tipe.toUpperCase() : "Campur"}</strong>
          </div>
        </div>

        <div className="room-item">
          <Hash color="#2563EB" />
          <div>
            <small>Nomor Kamar Spesifik</small>
            <strong>{kos.ada_nomor_kamar ? "Tersedia" : "Tanpa Nomor"}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}