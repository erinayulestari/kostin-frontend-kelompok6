import BookingCard from "./BookingCard";

export default function BookingSection() {

  const bookings = [
    {
      id: 1,
      tenant: "Andi Saputra",
      kost: "Kost Mawar Residence",
      date: "20 Juli 2026",
      duration: "12 Bulan",
      status: "pending",
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 2,
      tenant: "Siti Aisyah",
      kost: "Kost Harmoni",
      date: "22 Juli 2026",
      duration: "6 Bulan",
      status: "success",
      image: "https://i.pravatar.cc/100?img=32",
    },
    {
      id: 3,
      tenant: "Rizky Pratama",
      kost: "Kost Putra Makassar",
      date: "25 Juli 2026",
      duration: "1 Tahun",
      status: "pending",
      image: "https://i.pravatar.cc/100?img=15",
    },
  ];

  return (

    <section className="booking-section">

      <div className="section-title">

        <div>

          <h2>Booking Terbaru</h2>

          <p>
            Penyewa yang baru melakukan reservasi.
          </p>

        </div>

        <button>

          Lihat Semua Booking

        </button>

      </div>

      <div className="booking-list">

        {bookings.map((booking) => (

          <BookingCard
            key={booking.id}
            booking={booking}
          />

        ))}

      </div>

    </section>

  );

}