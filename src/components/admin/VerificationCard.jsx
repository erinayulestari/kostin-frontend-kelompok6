import React from "react";
import { MapPin, Calendar, Clock, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import defaultAvatar from "../../assets/avatar.jpg";
import defaultKostImg from "../../assets/harmoni.jpeg";

export default function VerificationCard({ data, onDetailClick, onUpdateStatus }) {
  const statusKey = data.statusKey || (data.status === 'aktif' ? 'approved' : data.status === 'pending' ? 'pending' : 'rejected');
  const statusText = data.status || "Pending";

  const renderStatusBadge = (sKey, sText) => {
    switch (sKey) {
      case "pending":
        return (
          <span className="v-status-badge pending">
            <Clock size={14} />
            <span>Menunggu Verifikasi</span>
          </span>
        );
      case "approved":
        return (
          <span className="v-status-badge approved">
            <CheckCircle2 size={14} />
            <span>Disetujui</span>
          </span>
        );
      case "rejected":
        return (
          <span className="v-status-badge rejected">
            <XCircle size={14} />
            <span>Ditolak</span>
          </span>
        );
      default:
        return <span className="v-status-badge pending">{sText}</span>;
    }
  };

  const ownerAvatar = data.owner?.avatar || defaultAvatar;
  const ownerName = data.owner?.name || "Pemilik Kost";
  const ownerEmail = data.owner?.email || "-";
  const ownerPhone = data.owner?.phone || "-";

  const kostImage = data.kost?.image || defaultKostImg;
  const kostName = data.kost?.name || "Nama Kost";
  const kostType = data.kost?.type || "Kost";
  const kostRooms = data.kost?.rooms || "0 Kamar";

  return (
    <div className="v-card">
      {/* Col 1: Owner Info */}
      <div className="v-owner-col">
        <img src={ownerAvatar} alt={ownerName} className="v-owner-avatar" onError={(e) => { e.target.src = defaultAvatar; }} />
        <div>
          <h3 className="v-owner-name">{ownerName}</h3>
          <p className="v-owner-email">{ownerEmail}</p>
          <p className="v-owner-phone">{ownerPhone}</p>
        </div>
      </div>

      {/* Col 2: Kost Info */}
      <div className="v-kost-col">
        <img src={kostImage} alt={kostName} className="v-kost-img" onError={(e) => { e.target.src = defaultKostImg; }} />
        <div>
          <h3 className="v-kost-title">{kostName}</h3>
          <p className="v-kost-type">{kostType}</p>
          <p className="v-kost-rooms">{kostRooms}</p>
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
        {renderStatusBadge(statusKey, statusText)}
        <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
          {statusKey !== "approved" && (
            <button
              type="button"
              className="btn-detail-outline"
              style={{ backgroundColor: "#10b981", color: "#fff", borderColor: "#10b981", padding: "4px 8px", fontSize: "12px" }}
              onClick={() => onUpdateStatus && onUpdateStatus(data.id, "aktif")}
            >
              Setujui
            </button>
          )}
          {statusKey !== "rejected" && (
            <button
              type="button"
              className="btn-detail-outline"
              style={{ backgroundColor: "#ef4444", color: "#fff", borderColor: "#ef4444", padding: "4px 8px", fontSize: "12px" }}
              onClick={() => onUpdateStatus && onUpdateStatus(data.id, "nonaktif")}
            >
              Tolak
            </button>
          )}
        </div>
      </div>
    </div>
  );
}