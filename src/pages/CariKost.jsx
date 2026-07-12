import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import SearchFilter from "../components/SearchFilter";
import SidebarFilter from "../components/SidebarFilter";
import KostCardHorizontal from "../components/KostCardHorizontal";
import Pagination from "../components/Pagination";

import "../styles/carikost.css";
import kostData from "../data/kostData";

export default function CariKost() {

    return (

        <>

            <Navbar />

            <SearchFilter />

            <div className="search-layout">

                <SidebarFilter />

                <div className="search-result">

                    <div className="kost-header">

                        <h2>

                            <span>{kostData.length}</span> Kost Ditemukan

                        </h2>

                        <div className="sort-area">

                            <label>Urutkan :</label>

                            <select>

                                <option>Terbaru</option>
                                <option>Harga Termurah</option>
                                <option>Harga Termahal</option>

                            </select>

                        </div>

                    </div>

                    {kostData.map((kost) => (

                        <KostCardHorizontal
                            key={kost.id}
                            kost={kost}
                        />

                    ))}

                    <Pagination />

                </div>

            </div>

            <Footer />

        </>

    );

}