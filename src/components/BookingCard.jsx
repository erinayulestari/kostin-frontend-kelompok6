export default function BookingCard() {

  return (

    <aside className="booking-card">

      <h5>Harga</h5>

      <h2>
        Rp850.000
        <span>/bulan</span>
      </h2>

      <label>Tanggal Masuk</label>

      <input
        type="date"
      />

      <label>Durasi Sewa</label>

      <select>

        <option>1 Bulan</option>

        <option>3 Bulan</option>

        <option>6 Bulan</option>

      </select>

      <div className="total-box">

        <span>Total Harga</span>

        <strong>Rp850.000</strong>

      </div>

      <button className="booking-btn">

        Booking Sekarang

      </button>

      <button className="chat-btn">

        Chat Pemilik

      </button>

    </aside>

  );

}