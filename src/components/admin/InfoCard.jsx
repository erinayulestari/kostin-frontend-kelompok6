import React from "react";

export function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="detail-card">
      <h2 className="card-title">
        <span className="card-title-icon">
          <Icon />
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export function DataRow({ label, value, customRender }) {
  return (
    <div className="data-item">
      <span className="data-label">{label}</span>
      <span className="data-colon">:</span>
      <span className="data-value">
        {customRender ? customRender : value}
      </span>
    </div>
  );
}