import React from 'react';

const SettingsCard = ({ title, subtitle, children }) => {
  return (
    <div className="settings-card">
      <div className="s-card-header">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default SettingsCard;