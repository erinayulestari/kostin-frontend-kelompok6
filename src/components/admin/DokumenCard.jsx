import React from "react";
import { Maximize2 } from "lucide-react";

export default function DokumenCard({ title, fileName, fileSize, imgSrc, onZoom }) {
  return (
    <div className="dokumen-item-card">
      <div className="dokumen-img-wrapper">
        <img src={imgSrc} alt={title} />
        <button type="button" className="dokumen-zoom-btn" title="Zoom" onClick={onZoom}>
          <Maximize2 size={16} />
        </button>
      </div>
      <p className="dokumen-meta-title">{title}</p>
      <p className="dokumen-meta-sub">
        {fileName} ({fileSize})
      </p>
    </div>
  );
}