import React from "react";
import { UploadCloud } from "lucide-react";

export default function FileUploader({ label, sublabel, formatText = "JPG, PNG. Maks. 5MB" }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#334155" }}>{label}</label>}
      {sublabel && <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginBottom: "6px" }}>{sublabel}</span>}
      
      <div className="uploader-box">
        <UploadCloud size={20} color="#0066ff" style={{ marginBottom: "4px" }} />
        <p style={{ margin: 0, fontSize: "11px", color: "#0066ff", fontWeight: "600" }}>
          Klik atau drag & drop file di sini
        </p>
        <span style={{ fontSize: "10px", color: "#94a3b8" }}>{formatText}</span>
      </div>
    </div>
  );
}