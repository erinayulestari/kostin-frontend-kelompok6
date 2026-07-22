import { SlidersHorizontal, RotateCcw } from "lucide-react";

export default function SidebarFilter({ filters, onChangeFilter, onApply, onReset }) {
  const jenis = [
    { label: "Semua", value: "" },
    { label: "Putra", value: "putra" },
    { label: "Putri", value: "putri" },
    { label: "Campur", value: "campur" }
  ];

  const fasilitasList = [
    { key: "wifi", label: "WiFi" },
    { key: "ac", label: "AC" },
    { key: "kamar_mandi_dalam", label: "Kamar Mandi Dalam" },
    { key: "parkir", label: "Parkir" },
    { key: "laundry", label: "Laundry" },
    { key: "dapur", label: "Dapur" },
    { key: "cctv", label: "CCTV" }
  ];

  return (
    <aside className="sidebar-filter">
      <div className="sidebar-head">
        <div className="sidebar-title">
          <SlidersHorizontal size={20} />
          <h3>Filter</h3>
        </div>

        <button type="button" onClick={() => onReset && onReset()}>
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="filter-section">
        <h4>Jenis Kost</h4>
        {jenis.map((item) => (
          <label key={item.label} className="checkbox-item">
            <input
              type="radio"
              name="jenis"
              checked={(filters?.tipe || "") === item.value}
              onChange={() => onChangeFilter && onChangeFilter("tipe", item.value)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Fasilitas</h4>
        {fasilitasList.map((item) => (
          <label key={item.key} className="checkbox-item">
            <input
              type="checkbox"
              checked={!!filters?.[item.key]}
              onChange={(e) => onChangeFilter && onChangeFilter(item.key, e.target.checked)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        className="apply-filter"
        onClick={() => onApply && onApply()}
      >
        Terapkan Filter
      </button>
    </aside>
  );
}