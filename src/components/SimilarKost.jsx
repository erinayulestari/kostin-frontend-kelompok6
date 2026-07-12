import { Star, MapPin } from "lucide-react";

import kost1 from "../assets/premium.jpeg";
import kost2 from "../assets/melati.jpeg";
import kost3 from "../assets/kost1.jpg";

const data = [

    {
        nama:"Kost Mawar Residence",
        lokasi:"Makassar",
        harga:"Rp1.800.000",
        rating:"4.9",
        image:kost1
    },

    {
        nama:"Kost Sakura",
        lokasi:"Makassar",
        harga:"Rp2.100.000",
        rating:"4.8",
        image:kost2
    },

    {
        nama:"Kost Dahlia",
        lokasi:"Makassar",
        harga:"Rp2.300.000",
        rating:"4.7",
        image:kost3
    }

];

export default function SimilarKost(){

    return(

        <section className="similar-section">

            <h2>Kost Serupa</h2>

            <div className="similar-grid">

                {

                    data.map((item,index)=>(

                        <div
                            className="similar-card"
                            key={index}
                        >

                            <img
                                src={item.image}
                                alt=""
                            />

                            <div className="similar-content">

                                <h3>{item.nama}</h3>

                                <p>

                                    <MapPin size={15}/>

                                    {item.lokasi}

                                </p>

                                <div className="similar-bottom">

                                    <div>

                                        <strong>

                                            {item.harga}

                                        </strong>

                                        <small>

                                            /bulan

                                        </small>

                                    </div>

                                    <span>

                                        <Star
                                            size={15}
                                            fill="#FACC15"
                                            color="#FACC15"
                                        />

                                        {item.rating}

                                    </span>

                                </div>

                                <button>

                                    Lihat Detail

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}