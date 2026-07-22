import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import defaultImg from "../assets/kost1.jpg";
import "../styles/compare-kost-modal.css";

export default function CompareKostModal({ isOpen, onClose, currentKos }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState([]);
  const [selectedKostIds, setSelectedKostIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompareOptions() {
      if (!isOpen) return;
      setLoading(true);
      try {
        const res = await api.get("/kos");
        const list = res.data || [];
        const currentId = currentKos?.id;
        const filtered = list.filter((item) => Number(item.id) !== Number(currentId));
        setOptions(filtered);
        if (filtered.length > 0) {
          setSelectedKostIds([filtered[0].id]);
        } else {
          setSelectedKostIds([]);
        }
      } catch (err) {
        console.error("Gagal memuat opsi perbandingan kos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCompareOptions();
  }, [isOpen, currentKos?.id]);

  if (!isOpen) return null;

  const currentFormatted = {
    id: currentKos?.id || 0,
    namaKost: currentKos?.nama_kos || "Kost Saat Ini",
    lokasi: [currentKos?.kecamatan, currentKos?.kota].filter(Boolean).join(", ") || "Lokasi",
    harga: currentKos?.harga_per_bulan
      ? `Rp${Number(currentKos.harga_per_bulan).toLocaleString("id-ID")}/bulan`
      : "Rp0",
    rating: currentKos?.rating > 0 ? Number(currentKos.rating).toFixed(1) : "0.0",
    image: currentKos?.foto_utama_url || currentKos?.foto_utama || defaultImg,
    jenisKost: currentKos?.tipe ? currentKos.tipe.toUpperCase() : "CAMPUR",
    ukuranKamar: "Standard",
    wifi: Boolean(currentKos?.wifi),
    ac: Boolean(currentKos?.ac),
    kamarMandiDalam: Boolean(currentKos?.kamar_mandi_dalam),
    parkir: Boolean(currentKos?.parkir),
    kamarTersedia: `${currentKos?.sisa_kamar !== undefined ? currentKos.sisa_kamar : Math.max(0, (currentKos?.jumlah_kamar || 0) - (currentKos?.kamar_terisi || 0))} Kamar`,
  };

  const selectedKosts = options.filter((item) => selectedKostIds.includes(item.id));

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleGoToDetail = (id) => {
    handleClose();
    navigate(`/kost/${id}`);
  };

  const toggleSelectKost = (id) => {
    if (selectedKostIds.includes(id)) {
      setSelectedKostIds(selectedKostIds.filter((item) => item !== id));
    } else {
      if (selectedKostIds.length >= 2) {
        alert("Maksimal 2 kos tambahan (total 3 kos) yang dapat dibandingkan secara bersamaan.");
        return;
      }
      setSelectedKostIds([...selectedKostIds, id]);
    }
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
                ? "Pilih hingga 2 kos lain dari database untuk dibandingkan (maksimal 3 kos sekaligus)."
                : "Perbandingan informasi kos."}
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
            {loading ? (
              <p style={{ textAlign: "center", padding: "40px 0" }}>Memuat daftar kos dari database...</p>
            ) : options.length === 0 ? (
              <p style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>
                Belum ada properti kos lain di database untuk dibandingkan.
              </p>
            ) : (
              <div className="kost-selection-grid">
                {options.map((item) => {
                  const isSelected = selectedKostIds.includes(item.id);
                  const priceStr = item.harga_per_bulan
                    ? `Rp${Number(item.harga_per_bulan).toLocaleString("id-ID")}/bulan`
                    : "Rp0";
                  const ratingStr = item.rating > 0 ? Number(item.rating).toFixed(1) : "0.0";
                  const imgUrl = item.foto_utama_url || item.foto_utama || defaultImg;

                  return (
                    <div
                      key={item.id}
                      className={`pick-card ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleSelectKost(item.id)}
                    >
                      {isSelected && (
                        <div className="selected-badge">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                      <div className="pick-card-img">
                        <img src={imgUrl} alt={item.nama_kos} onError={(e) => { e.target.src = defaultImg; }} />
                      </div>
                      <div className="pick-card-info">
                        <h3>{item.nama_kos}</h3>
                        <p className="loc">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {item.kota || "Indonesia"}
                        </p>
                        <p className="price">{priceStr}</p>
                        <p className="rating">★ {ratingStr}</p>
                      </div>
                      <button className={`btn-pick-action ${isSelected ? "active" : ""}`}>
                        {isSelected ? "Terpilih" : "Pilih"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="compare-modal-footer">
              <button className="btn-modal-cancel" onClick={handleClose}>
                Batal
              </button>
              <button
                className="btn-modal-submit"
                disabled={selectedKostIds.length === 0}
                onClick={() => setStep(2)}
              >
                Bandingkan ({selectedKostIds.length + 1} Kos)
              </button>
            </div>
          </div>
        )}

        {/* Content Step 2: Comparison Table */}
        {step === 2 && selectedKosts.length > 0 && (
          <div className="compare-modal-body step-2-body">
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="col-feature"></th>
                    <th className="col-kost">
                      <span className="col-label">Kos Saat Ini</span>
                      <div className="header-kost-card">
                        <img src={currentFormatted.image} alt={currentFormatted.namaKost} onError={(e) => { e.target.src = defaultImg; }} />
                        <div>
                          <h4>{currentFormatted.namaKost}</h4>
                          <p>{currentFormatted.lokasi}</p>
                        </div>
                      </div>
                    </th>
                    {selectedKosts.map((item, idx) => {
                      const imgUrl = item.foto_utama_url || item.foto_utama || defaultImg;
                      return (
                        <th key={item.id} className="col-kost">
                          <span className="col-label">Pilihan {idx + 1}</span>
                          <div
                            className="header-kost-card"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleGoToDetail(item.id)}
                            title="Klik untuk membuka detail kos ini"
                          >
                            <img src={imgUrl} alt={item.nama_kos} onError={(e) => { e.target.src = defaultImg; }} />
                            <div>
                              <h4 style={{ color: "#2563EB" }}>{item.nama_kos}</h4>
                              <p>{item.kota || "Indonesia"}</p>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="feature-title">🏷️ Harga</td>
                    <td>{currentFormatted.harga}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>
                        Rp {Number(item.harga_per_bulan || 0).toLocaleString("id-ID")}/bulan
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">📍 Lokasi</td>
                    <td>{currentFormatted.lokasi}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>{item.kota || "-"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">⭐ Rating</td>
                    <td>★ {currentFormatted.rating}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>★ {item.rating > 0 ? Number(item.rating).toFixed(1) : "0.0"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">👤 Jenis Kost</td>
                    <td>{currentFormatted.jenisKost}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>{item.tipe ? item.tipe.toUpperCase() : "CAMPUR"}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">📶 WiFi</td>
                    <td>{renderCheckIcon(currentFormatted.wifi)}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>{renderCheckIcon(Boolean(item.wifi))}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">❄️ AC</td>
                    <td>{renderCheckIcon(currentFormatted.ac)}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>{renderCheckIcon(Boolean(item.ac))}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">🚿 Kamar Mandi Dalam</td>
                    <td>{renderCheckIcon(currentFormatted.kamarMandiDalam)}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>{renderCheckIcon(Boolean(item.kamar_mandi_dalam))}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">🚗 Parkir</td>
                    <td>{renderCheckIcon(currentFormatted.parkir)}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>{renderCheckIcon(Boolean(item.parkir))}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">🛏️ Sisa Kamar</td>
                    <td>{currentFormatted.kamarTersedia}</td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>
                        {item.sisa_kamar !== undefined
                          ? item.sisa_kamar
                          : Math.max(0, (item.jumlah_kamar || 0) - (item.kamar_terisi || 0))} Kamar
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="feature-title">🔗 Akses Detail</td>
                    <td>
                      <span style={{ color: "#94A3B8", fontSize: "13px" }}>Sedang Dilihat</span>
                    </td>
                    {selectedKosts.map((item) => (
                      <td key={item.id}>
                        <button
                          onClick={() => handleGoToDetail(item.id)}
                          style={{
                            width: "100%",
                            maxWidth: "140px",
                            background: "#2563EB",
                            color: "#FFFFFF",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                            boxShadow: "0 2px 6px rgba(37, 99, 235, 0.2)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Lihat Detail ➔
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="compare-modal-footer">
              <button className="btn-modal-cancel" onClick={handleClose}>
                Tutup
              </button>
              <button className="btn-modal-submit" onClick={handleClose}>
                Selesai Membandingkan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}