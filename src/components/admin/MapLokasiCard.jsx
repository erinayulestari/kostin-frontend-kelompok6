import React from "react";
import { FiMapPin } from "react-icons/fi";

export default function MapLokasiCard({ lat, lng }) {
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="detail-card">
      <h2 className="card-title">
        <span className="card-title-icon">
          <FiMapPin />
        </span>
        Lokasi Kost
      </h2>

      <div className="map-preview-box">
        <iframe title="Lokasi Kost" src={mapUrl} loading="lazy"></iframe>
      </div>

      <div className="lat-long-grid">
        <div className="lat-long-field">
          <label>Latitude</label>
          <input type="text" value={lat} readOnly />
        </div>
        <div className="lat-long-field">
          <label>Longitude</label>
          <input type="text" value={lng} readOnly />
        </div>
      </div>
    </div>
  );
}