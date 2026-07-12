import { SlidersHorizontal, RotateCcw } from "lucide-react";

export default function SidebarFilter() {

    const jenis = [
        "Semua",
        "Putra",
        "Putri",
        "Campur"
    ];

    const fasilitasList = [
        "WiFi",
        "AC",
        "Kamar Mandi Dalam",
        "Parkir",
        "Laundry",
        "Dapur",
        "CCTV"
    ];

    return (

        <aside className="sidebar-filter">

            <div className="sidebar-head">

                <div className="sidebar-title">

                    <SlidersHorizontal size={20} />

                    <h3>Filter</h3>

                </div>

                <button type="button">

                    <RotateCcw size={16} />

                    Reset

                </button>

            </div>

            <div className="filter-section">

                <h4>Jenis Kost</h4>

                {jenis.map((item) => (

                    <label
                        key={item}
                        className="checkbox-item"
                    >

                        <input
                            type="radio"
                            name="jenis"
                        />

                        <span>{item}</span>

                    </label>

                ))}

            </div>

            <div className="filter-section">

                <h4>Fasilitas</h4>

                {fasilitasList.map((item) => (

                    <label
                        key={item}
                        className="checkbox-item"
                    >

                        <input
                            type="checkbox"
                        />

                        <span>{item}</span>

                    </label>

                ))}

            </div>

            <button
                type="button"
                className="apply-filter"
            >

                Terapkan Filter

            </button>

        </aside>

    );

}