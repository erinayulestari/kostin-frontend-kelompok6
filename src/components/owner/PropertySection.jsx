import PropertyCard from "./PropertyCard";

export default function PropertySection() {

  const properties = [
    {
      id: 1,
      name: "Kost Mawar Residence",
      location: "Makassar",
      price: "Rp1.500.000",
      room: "18 Kamar",
      empty: "6 Kosong",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Kost Harmoni",
      location: "Gowa",
      price: "Rp1.250.000",
      room: "12 Kamar",
      empty: "2 Kosong",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Kost Lavender",
      location: "Makassar",
      price: "Rp1.800.000",
      room: "20 Kamar",
      empty: "Penuh",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      status: "Penuh",
    },
    {
      id: 4,
      name: "Kost Sakura",
      location: "Maros",
      price: "Rp950.000",
      room: "8 Kamar",
      empty: "3 Kosong",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      status: "Aktif",
    },
  ];

  return (

    <section className="property-section">

      <div className="section-title">

        <div>

          <h2>Kost Saya</h2>

          <p>Kelola seluruh properti kost milikmu.</p>

        </div>

        <button>Lihat Semua Kost</button>

      </div>

      <div className="property-grid">

        {properties.map((property) => (

          <PropertyCard
            key={property.id}
            property={property}
          />

        ))}

      </div>

    </section>

  );

}