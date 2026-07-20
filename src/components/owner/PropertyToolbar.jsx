import {
  Search,
  ArrowUpDown,
} from "lucide-react";

export default function PropertyToolbar() {

  return (

    <section className="property-toolbar">

      <div className="toolbar-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Cari nama kost..."
        />

      </div>

      <div className="toolbar-filter">

        <select>

          <option>Semua Status</option>
          <option>Aktif</option>
          <option>Penuh</option>
          <option>Nonaktif</option>

        </select>

        <button>

          <ArrowUpDown size={18} />

          Terbaru

        </button>

      </div>

    </section>

  );

}