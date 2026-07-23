import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, unit, icon: Icon, iconBg, iconColor, linkText, to = "#" }) => {
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
      <Link to={to} className="stat-link">
        {linkText} <ChevronRight size={14} />
      </Link>
    </div>
  );
};

export default StatCard;