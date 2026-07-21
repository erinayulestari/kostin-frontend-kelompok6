import React from 'react';

const BookingCard = ({ name, kostName, avatar, checkIn, duration, status, statusText, actionText }) => {
  return (
    <div className="booking-card">
      <div className="booking-user">
        <img src={avatar} alt={name} className="avatar" />
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{name}</h4>
          <p style={{ fontSize: '12px', color: '#64748b' }}>{kostName}</p>
        </div>
      </div>

      <div className="booking-details">
        <div className="detail-item">
          <span>Check-in</span>
          <p>{checkIn}</p>
        </div>
        <div className="detail-item">
          <span>Durasi</span>
          <p>{duration}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className={`status-badge ${status}`}>{statusText}</span>
        {actionText && <button className="btn-outline">{actionText}</button>}
      </div>
    </div>
  );
};

export default BookingCard;