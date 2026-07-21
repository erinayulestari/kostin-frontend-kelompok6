import React from 'react';

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange} 
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;