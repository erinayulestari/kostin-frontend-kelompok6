import { MapPin, Search } from "lucide-react";

export default function SearchFilter() {

    return (

        <section className="search-filter">

            <div className="search-container">

                <div className="filter-item">

                    <label>

                        <MapPin size={18} />

                        Lokasi / Kota

                    </label>

                    <input
                        type="text"
                        placeholder="Cari lokasi..."
                    />

                </div>

                <div className="filter-item">

                    <label>Tipe Kost</label>

                    <select defaultValue="">

                        <option value="" disabled>
                            Pilih Tipe Kost
                        </option>

                        <option>Putra</option>
                        <option>Putri</option>
                        <option>Campur</option>

                    </select>

                </div>

                <div className="filter-item">

                    <label>Fasilitas</label>

                    <select defaultValue="">

                        <option value="" disabled>
                            Pilih Fasilitas
                        </option>

                        <option>WiFi</option>
                        <option>AC</option>
                        <option>Parkir</option>

                    </select>

                </div>

                <button type="button">

                    <Search size={20} />

                    Cari

                </button>

            </div>

            <div className="popular-search">

                <span>Pencarian populer :</span>

                <button type="button">Jakarta</button>
                <button type="button">Bandung</button>
                <button type="button">Yogyakarta</button>
                <button type="button">Makassar</button>
                <button type="button">Surabaya</button>

            </div>

        </section>

    );

}