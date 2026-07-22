import defaultImg from "../assets/melati3.jpeg";

export default function GallerySection({ fotoUtama, fotos = [] }) {
  const mainImage = fotoUtama || (fotos[0]?.nama_file_url || fotos[0]?.nama_file) || defaultImg;
  const galleryImages = fotos.slice(0, 4).map(f => f.nama_file_url || f.nama_file);

  return (
    <section className="gallery">
      <div className="gallery-left">
        <img src={mainImage} alt="Kost Utama" onError={(e) => { e.target.src = defaultImg; }} />
      </div>

      <div className="gallery-right">
        {galleryImages.length > 0 ? (
          galleryImages.map((img, idx) => (
            <div key={idx} className={idx === galleryImages.length - 1 ? "last-photo" : ""}>
              <img src={img} alt={`Galeri ${idx + 1}`} onError={(e) => { e.target.src = defaultImg; }} />
              {idx === galleryImages.length - 1 && (
                <button>Lihat Semua Foto</button>
              )}
            </div>
          ))
        ) : (
          <>
            <img src={defaultImg} alt="Galeri 1" />
            <img src={defaultImg} alt="Galeri 2" />
            <img src={defaultImg} alt="Galeri 3" />
            <div className="last-photo">
              <img src={defaultImg} alt="Galeri 4" />
              <button>Lihat Semua Foto</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}