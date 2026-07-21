import React, { useState } from 'react';
import { 
  MoreVertical, 
  MapPin, 
  Eye as EyeIcon,
  Edit,
  Grid,
  Calendar,
  Power,
  Trash2,
  Users,
  Bed,
  DoorOpen
} from 'lucide-react';

const KostCardDetailed = ({ 
  title, 
  location, 
  price, 
  totalRooms, 
  filledRooms, 
  emptyRooms, 
  status, 
  image 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="kost-detailed-card">
      <div className="kost-card-image-container">
        <img src={image} alt={title} className="kost-card-img" />
        <span className={`kost-status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
        
        {/* Button Dropdown 3 Titik */}
        <button 
          className="more-options-btn"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <MoreVertical size={16} color="#1e293b" />
        </button>

        {/* Menu Dropdown */}
        {showDropdown && (
          <div className="card-dropdown-menu">
            <div className="dropdown-item"><EyeIcon size={14} /> Lihat Detail</div>
            <div className="dropdown-item"><Edit size={14} /> Edit Kost</div>
            <div className="dropdown-item"><Grid size={14} /> Kelola Kamar</div>
            <div className="dropdown-item"><Calendar size={14} /> Lihat Booking</div>
            <div className="dropdown-item"><Power size={14} /> Nonaktifkan Kost</div>
            <div className="dropdown-item danger"><Trash2 size={14} /> Hapus Kost</div>
          </div>
        )}
      </div>

      <div className="kost-card-body">
        <h3 className="kost-title">{title}</h3>
        <p className="kost-location">
          <MapPin size={14} />
          <span>{location}</span>
        </p>
        <p className="kost-price">
          {formatRupiah(price)} <span>/ bulan</span>
        </p>

        {/* Grid Info Kamar */}
        <div className="room-info-grid">
          <div className="room-info-item">
            <Bed size={16} color="#64748b" />
            <div>
              <strong>{totalRooms} kamar</strong>
              <span>Total</span>
            </div>
          </div>
          <div className="room-info-item">
            <Users size={16} color="#64748b" />
            <div>
              <strong>{filledRooms} terisi</strong>
              <span>Terisi</span>
            </div>
          </div>
          <div className="room-info-item">
            <DoorOpen size={16} color="#64748b" />
            <div>
              <strong>{emptyRooms} kosong</strong>
              <span>Kosong</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KostCardDetailed;