import React from "react";
import { MapPin, Calendar, Clock, CheckCircle2, XCircle, ChevronRight } from "lucide-react";

export default function VerificationCard({ data, onDetailClick }) {
  const renderStatusBadge = (statusKey, statusText) => {
    switch (statusKey) {
      case "pending":
        return (
          <span className="v-status-badge pending">
            <Clock size={14} />
            <span>{statusText}</span>
          </span>
        );
      case "approved":
        return (
          <span className="v-status-badge approved">
            <CheckCircle2 size={14} />
            <span>{statusText}</span>
          </span>
        );
      case "rejected":
        return (
          <span className="v-status-badge rejected">
            <XCircle size={14} />
            <span>{statusText}</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="v-card">
      {/* Col 1: Owner Info */}
      <div className="v-owner-col">
        <img src={data.owner.avatar} alt={data.owner.name} className="v-owner-avatar" />
        <div>
          <h3 className="v-owner-name">{data.owner.name}</h3>
          <p className="v-owner-email">{data.owner.email}</p>
          <p className="v-owner-phone">{data.owner.phone}</p>
        </div>
      </div>

      {/* Col 2: Kost Info */}
      <div className="v-kost-col">
        <img src={data.kost.image} alt={data.kost.name} className="v-kost-img" />
        <div>
          <h3 className="v-kost-title">{data.kost.name}</h3>
          <p className="v-kost-type">{data.kost.type}</p>
          <p className="v-kost-rooms">{data.kost.rooms}</p>
        </div>
      </div>

      {/* Col 3: Meta Info */}
      <div className="v-meta-col">
        <div className="v-meta-item">
          <MapPin size={14} color="#64748b" />
          <span>{data.location}</span>
        </div>
        <div className="v-meta-item">
          <Calendar size={14} color="#64748b" />
          <span>{data.date}</span>
        </div>
      </div>

      {/* Col 4: Status & Action */}
      <div className="v-action-col">
        {renderStatusBadge(data.statusKey, data.status)}
        <button 
          type="button" 
          className="btn-detail-outline"
          onClick={() => onDetailClick && onDetailClick(data.id)}
        >
          <span>Lihat Detail</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}