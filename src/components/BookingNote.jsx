import { Info } from "lucide-react";

export default function BookingNote() {
  return (
    <section className="booking-note">

      <div className="card-title">

        <div className="card-icon">
          <Info size={22} />
        </div>

        <h3>Catatan Penting</h3>

      </div>

      <ul className="note-list">

        <li>
          Check-in dilakukan sesuai tanggal masuk yang telah dipilih saat booking.
        </li>

        <li>
          Harap membawa kartu identitas (KTP/KTM/Paspor) saat proses check-in.
        </li>

        <li>
          Jika terdapat perubahan jadwal atau kendala, segera hubungi pemilik kost.
        </li>

        <li>
          Pastikan pembayaran telah berhasil diverifikasi sebelum tanggal check-in.
        </li>

        <li>
          Simpan bukti pembayaran hingga proses booking selesai.
        </li>

      </ul>

    </section>
  );
}