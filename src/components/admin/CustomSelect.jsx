import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({ value, onChange, options = [], placeholder = "Pilih...", width, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || { label: value || placeholder };

  return (
    <div
      ref={dropdownRef}
      className={`custom-admin-select-wrapper ${className}`}
      style={{ position: "relative", width: width || "100%", minWidth: "140px" }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className={`custom-select-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="select-selected-text">{selectedOption.label}</span>
        <ChevronDown size={16} className={`select-arrow-icon ${isOpen ? "rotate" : ""}`} />
      </button>

      {/* Options Popup Menu */}
      {isOpen && (
        <div className="custom-select-options-menu">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                className={`custom-select-option-item ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} className="check-icon" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
