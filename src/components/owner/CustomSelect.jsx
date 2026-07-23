import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ label, value, onChange, options, style }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0] || { label: value, value };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block', ...style }}>
      {/* Pill Container - Seluruh area tombol dari pinggir ke pinggir dapat diklik */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#ffffff',
          border: isOpen ? '1.5px solid #0066ff' : '1px solid #cbd5e1',
          borderRadius: '10px',
          padding: '0 14px',
          height: '40px',
          cursor: 'pointer',
          boxShadow: isOpen ? '0 0 0 3px rgba(0, 102, 255, 0.1)' : '0 1px 3px rgba(15, 23, 42, 0.04)',
          transition: 'all 0.2s',
          outline: 'none',
          width: '100%',
          justifyContent: 'space-between',
          whiteSpace: 'nowrap'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          {label && <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>{label}</span>}
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{selectedOption.label}</span>
        </div>
        <ChevronDown 
          size={14} 
          style={{ 
            color: '#0066ff', 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            marginLeft: '6px',
            flexShrink: 0
          }} 
        />
      </button>

      {/* Floating Dropdown Menu Card */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '46px',
          right: 0,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
          border: '1px solid #e2e8f0',
          padding: '6px',
          minWidth: '170px',
          maxHeight: '260px',
          overflowY: 'auto',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isSelected ? '#eff6ff' : 'transparent',
                  color: isSelected ? '#0066ff' : '#0f172a',
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.15s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={14} color="#0066ff" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
