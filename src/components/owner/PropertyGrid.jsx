import PropertyCard from "./PropertyCard";

export default function PropertyGrid() {

  const properties = [
    {
      id: 1,
      image: "/images/kost1.jpg",
      name: "Kost Mawar Residence",
      location: "Makassar",
      price: "Rp1.500.000",
      room: "18 Kamar",
      available: "4 Kosong",
      status: "Aktif",
    },
    {
      id: 2,
      image: "/images/kost2.jpg",
      name: "Kost Harmoni",
      location: "Gowa",
      price: "Rp1.250.000",
      room: "12 Kamar",
      available: "Penuh",
      status: "Penuh",
    },
    {
      id: 3,
      image: "/images/kost3.jpg",
      name: "Kost Lavender",
      location: "Makassar",
      price: "Rp950.000",
      room: "10 Kamar",
      available: "2 Kosong",
      status: "Aktif",
    },
    {
      id: 4,
      image: "/images/kost4.jpg",
      name: "Kost Anggrek",
      location: "Maros",
      price: "Rp1.800.000",
      room: "20 Kamar",
      available: "6 Kosong",
      status: "Aktif",
    },
  ];

  return (

    <section className="property-grid">

      {properties.map((item) => (

        <PropertyCard
          key={item.id}
          property={item}
        />

      ))}

    </section>

  );

}