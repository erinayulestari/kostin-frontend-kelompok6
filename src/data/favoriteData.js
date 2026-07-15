import kost1 from "../assets/premium.jpeg";
import kost2 from "../assets/melati.jpeg";
import kost3 from "../assets/kost1.jpg";

const favoriteData = [
  {
    id: 1,
    nama: "Kost Melati Premium",
    lokasi: "Makassar",
    harga: "Rp1.800.000",
    rating: 4.9,
    image: kost1,
    premium: true,
  },

  {
    id: 2,
    nama: "Kost Matahari Residence",
    lokasi: "Makassar",
    harga: "Rp2.100.000",
    rating: 4.8,
    image: kost2,
    premium: false,
  },

  {
    id: 3,
    nama: "Kost Nusantara",
    lokasi: "Jakarta Selatan",
    harga: "Rp2.600.000",
    rating: 4.9,
    image: kost3,
    premium: true,
  },

  {
    id: 4,
    nama: "Kost Sakura",
    lokasi: "Bandung",
    harga: "Rp1.550.000",
    rating: 4.7,
    image: kost2,
    premium: false,
  },

  {
    id: 5,
    nama: "Kost Harmoni",
    lokasi: "Yogyakarta",
    harga: "Rp1.950.000",
    rating: 4.8,
    image: kost1,
    premium: true,
  },

  {
    id: 6,
    nama: "Kost Lavender",
    lokasi: "Surabaya",
    harga: "Rp1.700.000",
    rating: 4.6,
    image: kost3,
    premium: false,
  },
];

export default favoriteData;