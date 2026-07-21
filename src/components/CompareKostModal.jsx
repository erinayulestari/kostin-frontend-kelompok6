import React, { useState } from "react";
import "../styles/compare-kost-modal.css";

// Data Dummy Kost saat ini (yang sedang dibuka pengguna)
const CURRENT_KOST = {
  id: 100,
  namaKost: "Kost Taman Indah",
  lokasi: "Depok, Jawa Barat",
  harga: "Rp 1.000.000 / bulan",
  rating: "4.6 (128 ulasan)",
  image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300",
  jenisKost: "Putri",
  ukuranKamar: "3 x 4 m",
  wifi: true,
  ac: true,
  kamarMandiDalam: true,
  parkir: true,
  kamarTersedia: "8 Kamar"
};

// Data Dummy List Kost Pilihan Pembandingan
const MOCK_OPTIONS = [
  {
    id: 1,
    namaKost: "Kost Melati",
    lokasi: "Depok, Jawa Barat",
    harga: "Rp 1.000.000 / bulan",
    rating: "4.6 (128 ulasan)",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300",
    jenisKost: "Putri",
    ukuranKamar: "3 x 3 m",
    wifi: true,
    ac: true,
    kamarMandiDalam: false,
    parkir: true,
    kamarTersedia: "3 Kamar"
  },
  {
    id: 2,
    namaKost: "Kost Griya Asri",
    lokasi: "Depok, Jawa Barat",
    harga: "Rp 1.100.000 / bulan",
    rating: "4.7 (156 ulasan)",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300",
    jenisKost: "Campur",
    ukuranKamar: "3.5 x 4 m",
    wifi: true,
    ac: true,
    kamarMandiDalam: true,
    parkir: true,
    kamarTersedia: "12 Kamar"
  },
  {
    id: 3,
    namaKost: "Kost Harmoni",
    lokasi: "Depok, Jawa Barat",
    harga: "Rp 950.000 / bulan",
    rating: "4.5 (112 ulasan)",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300",
    jenisKost: "Putra",
    ukuranKamar: "3 x 3 m",
    wifi: true,
    ac: false,
    kamarMandiDalam: true,
    parkir: false,
    kamarTersedia: "5 Kamar"
  },
  {
    id: 4,
    namaKost: "Kost Putri Alifia",
    lokasi: "Depok, Jawa Barat",
    harga: "Rp 1.200.000 / bulan",
    rating: "4.8 (90 ulasan)",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=300",
    jenisKost: "Putri",
    ukuranKamar: "4 x 4 m",
    wifi: true,
    ac: true,
    kamarMandiDalam: true,
    parkir: true,
    kamarTersedia: "2 Kamar"
  }
];

export default function CompareKostModal({ isOpen, onClose, currentKostData = CURRENT_KOST }) {
  const [step, setStep] = useState(1); // 1: Select Kost, 2: Comparison View
  const [selectedKostId, setSelectedKostId] = useState(2); // Default terpilih ID 2 (Kost Griya Asri)

  if (!isOpen) return null;

  const selectedKost = MOCK_OPTIONS.find((item) => item.id === selectedKostId);

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const renderCheckIcon = (isTrue) => {
    return isTrue ? (
      <span className="icon-check-success">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" fill="#dcfce7" stroke="none" />
          <polyline points="20 6 9 17 4 12" transform="scale(0.6) translate(8, 8)" />
        </svg>
      </span>
    ) : (
      <span className="icon-cross-danger">-</span>
    );
  };

  return (
    <div className="compare-modal-backdrop">
      <div className={`compare-modal-box ${step === 2 ? "wide-modal" : ""}`}>
        {/* Header Modal */}
        <div className="compare-modal-header">
          <div>
            <h2>Bandingkan Kost</h2>
            <p>
              {step === 1
                ? "Pilih satu kost lain untuk dibandingkan."
                : "Perbandingan informasi kost."}
            </p>
          </div>
          <button className="btn-close-modal" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content Step 1: Choosing Kost */}
        {step === 1 && (
          <div className="compare-modal-body step-1-body">
            <div className="kost-selection-grid">
              {MOCK_OPTIONS.map((item) => {
                const isSelected = item.id === selectedKostId;
                return (
                  <div
                    key={item.id}
                    className={`pick-card ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedKostId(item.id)}
                  >
                    {isSelected && (
                      <div className="selected-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                    <div className="pick-card-img">
                      <img src={item.image} alt={item.namaKost} />
                    </div>
                    <div className="pick-card-info">
                      <h3>{item.namaKost}</h3>
                      <p className="loc">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {item.lokasi}
                      </p>
                      <p className="price">{item.harga}</p>
                      <p className="rating">★ {item.rating}</p>
                    </div>
                    <button className={`btn-pick-action ${isSelected ? "active" : ""}`}>
                      Pilih
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="compare-modal-footer">
              <button className="btn-modal-cancel" onClick={handleClose}>
                Batal
              </button>
              <button
                className="btn-modal-submit"
                disabled={!selectedKostId}
                onClick={() => setStep(2)}
              >
                Bandingkan
              </button>
            </div>
          </div>
        )}

        {/* Content Step 2: Comparison Table */}
        {step === 2 && selectedKost && (
          <div className="compare-modal-body step-2-body">
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="col-feature"></th>
                    <th className="col-kost">
                      <span className="col-label">Kost yang Anda lihat</span>
                      <div className="header-kost-card">
                        <img src={currentKostData.image} alt={currentKostData.namaKost} />
                        <div>
                          <h4>{currentKostData.namaKost}</h4>
                          <p>{currentKostData.lokasi}</p>
                        </div>
                      </div>
                    </th>
                    <th className="col-kost">
                      <span className="col-label">Kost yang dipilih</span>
                      <div className="header-kost-card">
                        <img src={selectedKost.image} alt={selectedKost.namaKost} />
                        <div>
                          <h4>{selectedKost.namaKost}</h4>
                          <p>{selectedKost.lokasi}</p>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="feature-title">🏷️ Harga</td>
                    <td>{currentKostData.harga}</td>
                    <td>{selectedKost.harga}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">📍 Lokasi</td>
                    <td>{currentKostData.lokasi}</td>
                    <td>{selectedKost.lokasi}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">⭐ Rating</td>
                    <td>★ {currentKostData.rating}</td>
                    <td>★ {selectedKost.rating}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">👤 Jenis Kost</td>
                    <td>{currentKostData.jenisKost}</td>
                    <td>{selectedKost.jenisKost}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">📐 Ukuran Kamar</td>
                    <td>{currentKostData.ukuranKamar}</td>
                    <td>{selectedKost.ukuranKamar}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">📶 WiFi</td>
                    <td>{renderCheckIcon(currentKostData.wifi)}</td>
                    <td>{renderCheckIcon(selectedKost.wifi)}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">❄️ AC</td>
                    <td>{renderCheckIcon(currentKostData.ac)}</td>
                    <td>{renderCheckIcon(selectedKost.ac)}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">🚿 Kamar Mandi Dalam</td>
                    <td>{renderCheckIcon(currentKostData.kamarMandiDalam)}</td>
                    <td>{renderCheckIcon(selectedKost.kamarMandiDalam)}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">🚗 Parkir</td>
                    <td>{renderCheckIcon(currentKostData.parkir)}</td>
                    <td>{renderCheckIcon(selectedKost.parkir)}</td>
                  </tr>
                  <tr>
                    <td className="feature-title">🛏️ Jumlah Kamar Tersedia</td>
                    <td>{currentKostData.kamarTersedia}</td>
                    <td>{selectedKost.kamarTersedia}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="compare-modal-footer">
              <button className="btn-modal-cancel" onClick={handleClose}>
                Tutup
              </button>
              <button
                className="btn-modal-submit"
                onClick={() => {
                  alert(`Navigasi ke detail kost: ${selectedKost.namaKost}`);
                  handleClose();
                }}
              >
                Lihat Detail Kost
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}