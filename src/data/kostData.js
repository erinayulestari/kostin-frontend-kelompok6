import kost1 from "../assets/premium.jpeg";
import kost2 from "../assets/melati.jpeg";
import kost3 from "../assets/kost1.jpg";
import kost4 from "../assets/harmoni.jpeg";

const kostData = [

    {
        id: 1,
        nama: "Kost Matahari",
        lokasi: "Jakarta Selatan",
        jenis: "Putri",
        harga: "Rp2.500.000",
        rating: 4.9,
        premium: true,
        fasilitas: [
            "WiFi",
            "AC",
            "Parkir",
            "Laundry",
            "CCTV"
        ],
        image: kost1
    },

    {
        id: 2,
        nama: "Kost Nusantara",
        lokasi: "Bandung",
        jenis: "Putra",
        harga: "Rp1.800.000",
        rating: 4.8,
        premium: false,
        fasilitas: [
            "WiFi",
            "Parkir",
            "Dapur"
        ],
        image: kost2
    },

    {
        id: 3,
        nama: "Kost Sky",
        lokasi: "Yogyakarta",
        jenis: "Campur",
        harga: "Rp2.200.000",
        rating: 4.7,
        premium: true,
        fasilitas: [
            "WiFi",
            "AC",
            "Parkir",
            "Laundry"
        ],
        image: kost3
    },

    {
        id: 4,
        nama: "Urban Kost",
        lokasi: "Makassar",
        jenis: "Putra",
        harga: "Rp1.500.000",
        rating: 4.6,
        premium: false,
        fasilitas: [
            "WiFi",
            "Parkir"
        ],
        image: kost4
    }

];

export default kostData;