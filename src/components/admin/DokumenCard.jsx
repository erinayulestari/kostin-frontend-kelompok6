import React from "react";
import { FiMaximize2 } from "react-icons/fi";

export default function DokumenCard({ title, fileName, fileSize, imgSrc, onZoom }) {
  return (
    <div className="dokumen-item-card">
      <div className="dokumen-img-wrapper">
        <img src={imgSrc} alt={title} />
        <button type="button" className="dokumen-zoom-btn" title="Zoom" onClick={onZoom}>
          <FiMaximize2 />
        </button>
      </div>
      <p className="dokumen-meta-title">{title}</p>
      <p className="dokumen-meta-sub">
        {fileName} ({fileSize})
      </p>
    </div>
  );
}