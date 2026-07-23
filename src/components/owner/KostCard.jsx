import React, { useState } from 'react';
import { MapPin, BedDouble, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KostCard = ({ id, title, location, price, roomAvailable, image, status, onDelete, onViewDetail }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const getStatusClass = (s) => {
    const statusLower = (s || '').toLowerCase();
    if (statusLower === 'aktif') return 'aktif';
    if (statusLower === 'penuh') return 'penuh';
    return 'nonaktif';
  };

  const handleAction = (action) => {
    setShowDropdown(false);
    if (action === 'detail' && id) {
      if (onViewDetail) {
        onViewDetail(id);
      } else {
        navigate(`/owner/tambah-kost?edit=${id}`);
      }
    } else if (action === 'edit' && id) {
      navigate(`/owner/tambah-kost?edit=${id}`);
    } else if (action === 'delete' && onDelete && id) {
      onDelete(id);
    }
  };

  return (
    <div className="kost-card">
      <div className="kost-img-wrapper">
        <img src={image} alt={title} className="kost-img" />
        <span className={`kost-status ${getStatusClass(status)}`}>{status || 'Aktif'}</span>
        
        <button className="action-menu-btn" onClick={() => setShowDropdown(!showDropdown)}>
          <MoreVertical size={16} />
        </button>

        {showDropdown && (
          <div className="dropdown-menu" style={{ position: 'absolute', right: '10px', top: '35px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, padding: '6px' }}>
            <div className="dropdown-item" style={{ padding: '6px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => handleAction('detail')}><Eye size={14} /> Lihat Detail</div>
            <div className="dropdown-item" style={{ padding: '6px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => handleAction('edit')}><Edit size={14} /> Edit Kos</div>
            <div className="dropdown-item danger" style={{ padding: '6px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444' }} onClick={() => handleAction('delete')}><Trash2 size={14} /> Hapus Kos</div>
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