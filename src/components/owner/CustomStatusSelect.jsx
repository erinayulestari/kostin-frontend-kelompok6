import React from 'react';
import CustomSelect from './CustomSelect';

export default function CustomStatusSelect({ value, onChange, options, label = "Status" }) {
  return (
    <CustomSelect 
      label={label} 
      value={value} 
      onChange={onChange} 
      options={options} 
    />
  );
}
