import React from 'react';
import { ChevronRight } from 'lucide-react';

const StatCard = ({ title, value, unit, icon: Icon, iconBg, iconColor, linkText }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon" style={{ backgroundColor: iconBg, color: iconColor }}>
          <Icon size={22} />
        </div>
        <div className="stat-info">
          <span>{title}</span>
          <h3>{value} {unit && <span style={{ fontSize: '12px', fontWeight: 400, color: '#64748b' }}>{unit}</span>}</h3>
        </div>
      </div>
      <a href="#" className="stat-link">
        {linkText} <ChevronRight size={14} />
      </a>
    </div>
  );
};

export default StatCard;