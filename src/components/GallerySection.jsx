import premium from "../assets/melati3.jpeg";
import melati from "../assets/melati1.jpeg";
import kost1 from "../assets/melati2.jpeg";
import kost from "../assets/melati4.jpeg";
import harmoni from "../assets/melati3.jpeg";

export default function GallerySection() {
  return (
    <section className="gallery">

      <div className="gallery-left">
        <img src={premium} alt="Kost Premium" />
      </div>

      <div className="gallery-right">

        <img src={melati} alt="Melati" />

        <img src={kost1} alt="Kost 1" />

        <img src={kost} alt="Kost" />

        <div className="last-photo">

          <img src={harmoni} alt="Harmoni" />

          <button>
            Lihat Semua Foto
          </button>

        </div>

      </div>

    </section>
  );
}