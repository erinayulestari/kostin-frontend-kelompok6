import defaultImg from "../assets/melati3.jpeg";

export default function GallerySection({ fotoUtama, fotos = [] }) {
  const mainImage = fotoUtama || (fotos[0]?.nama_file_url || fotos[0]?.nama_file) || defaultImg;
  const galleryImages = fotos.map(f => f.nama_file_url || f.nama_file || f.url || f).filter(Boolean);

  return (
    <section className="gallery">
      <div className="gallery-left">
        <img src={mainImage} alt="Kost Utama" onError={(e) => { e.target.src = defaultImg; }} />
      </div>

      <div className="gallery-right">
        {galleryImages.length > 0 ? (
          galleryImages.slice(0, 4).map((img, idx) => (
            <div key={idx} className={idx === Math.min(galleryImages.length, 4) - 1 ? "last-photo" : ""}>
              <img src={img} alt={`Galeri ${idx + 1}`} onError={(e) => { e.target.src = defaultImg; }} />
            </div>
          ))
        ) : (
          <div className="last-photo" style={{ gridColumn: "span 2", height: "100%" }}>
            <img src={mainImage} alt="Galeri Utama" style={{ width: "100%", height: "450px", objectFit: "cover", borderRadius: "16px" }} onError={(e) => { e.target.src = defaultImg; }} />
          </div>
        )}
      </div>
    </section>
  );
}