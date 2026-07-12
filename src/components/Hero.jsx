import kost from "../assets/hero.jpg";
import {useNavigate} from "react-router-dom";

import {
Search,
Plus,
ShieldCheck
} from "lucide-react";


export default function Hero(){
const navigate = useNavigate();
return(

<section className="hero-home">


<div className="hero-text">


<div className="badge">

<ShieldCheck size={16}/>

Platform Pencarian Kost Terpercaya

</div>



<h1>

Temukan Kost
<br/>
Impianmu di
<br/>

<span>
Seluruh Indonesia
</span>

<br/>

Lebih Mudah

</h1>



<p>

Jelajahi berbagai pilihan kost dengan lokasi,
harga, dan fasilitas yang sesuai kebutuhanmu.

</p>



<div className="hero-button">


<button

onClick={()=>navigate("/login")}

>

<Search size={18}/>

Cari Kost Sekarang

</button>



<button

className="outline"

onClick={()=>navigate("/login")}

>

<Plus size={18}/>

Tambah Kost

</button>


</div>


</div>




<div className="hero-image">

<img src={kost}/>

</div>


</section>

)

}