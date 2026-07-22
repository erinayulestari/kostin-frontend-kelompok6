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
import defaultImg from '../../assets/harmoni.jpeg';
import { useNavigate } from 'react-router-dom';

const KostCardDetailed = ({ 
  id,
  title, 
  location, 
  price, 
  totalRooms, 
  filledRooms, 
  emptyRooms, 
  status, 
  image,
  onDelete
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number || 0);
  };

  const handleAction = (action) => {
    setShowDropdown(false);
    if (action === 'detail' && id) {
      navigate(`/kost/${id}`);
    } else if (action === 'delete' && onDelete && id) {
      onDelete(id);
    }
  };

  const displayImg = image || defaultImg;

  return (
    <div className="kost-detailed-card">
      <div className="kost-card-image-container">
        <img src={displayImg} alt={title} className="kost-card-img" onError={(e) => { e.target.src = defaultImg; }} />
        <span className={`kost-status-badge ${status?.toLowerCase() || 'aktif'}`}>
          {status || 'Aktif'}
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
            <div className="dropdown-item" onClick={() => handleAction('detail')}><EyeIcon size={14} /> Lihat Detail</div>
            <div className="dropdown-item danger" onClick={() => handleAction('delete')}><Trash2 size={14} /> Hapus Kost</div>
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