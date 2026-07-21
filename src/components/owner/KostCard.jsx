import React, { useState } from 'react';
import { MapPin, BedDouble, MoreVertical, Eye, Edit, EyeOff, Trash2 } from 'lucide-react';

const KostCard = ({ title, location, price, roomAvailable, image, status, showDropdownMock }) => {
  const [showDropdown, setShowDropdown] = useState(showDropdownMock || false);

  const getStatusClass = (s) => {
    if (s === 'Aktif') return 'aktif';
    if (s === 'Penuh') return 'penuh';
    return 'nonaktif';
  };

  return (
    <div className="kost-card">
      <div className="kost-img-wrapper">
        <img src={image} alt={title} className="kost-img" />
        <span className={`kost-status ${getStatusClass(status)}`}>{status}</span>
        
        <button className="action-menu-btn" onClick={() => setShowDropdown(!showDropdown)}>
          <MoreVertical size={16} />
        </button>

        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-item"><Eye size={14} /> Detail</div>
            <div className="dropdown-item"><Edit size={14} /> Edit</div>
            <div className="dropdown-item"><EyeOff size={14} /> Nonaktifkan</div>
            <div className="dropdown-item danger"><Trash2 size={14} /> Hapus</div>
          </div>
        )}
      </div>

      <div className="kost-content">
        <h3 className="kost-title">{title}</h3>
        <p className="kost-address">
          <MapPin size={14} /> {location}
        </p>
        <p className="kost-price">
          Rp{price.toLocaleString('id-ID')} <span>/ bulan</span>
        </p>
        <div className="kost-footer">
          <BedDouble size={16} />
          <span>{roomAvailable} kamar tersedia</span>
        </div>
      </div>
    </div>
  );
};

export default KostCard;